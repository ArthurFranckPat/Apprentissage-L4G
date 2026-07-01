# [RÉSOLU 01/07/2026] Import SCS via IMPORTSIL rejette systématiquement `IPTDAT` ("Période non définie") alors que la saisie manuelle fonctionne pour le même site/date

## Résolution

**Cause racine : `right$(chaine, n)` est POSITIONNEL en L4G** (sous-chaîne de la position n à la fin, pas "les n derniers caractères"). `right$("20260701", 6)` = `"701"` → IPTDAT recevait une date tronquée depuis le premier test, quel que soit le format ou le quoting essayé. Preuve obtenue par relecture du `.dat` généré + dump ASCII dans la trace avant `IMPORTSIL`. Fix : `YDATE = mid$(format$("YYYYMMDD", date$), 3, 6)`.

Deuxième bug masqué derrière : `TRA` (code flux, table diverse **14**) envoyé dans `TRSFAM` (famille de mouvement, contrôlée table diverse **9**) → "Fiche inexistante". Fix : TRSFAM vide (optionnel).

**Résultat : mouvement QUAI5 → NAV5 réalisé et vérifié dans X3.** `GERRTRACE` reste à -1 même en cas de succès → le verdict du script est désormais une relecture du STOCK (palette sur l'emplacement destination). Détail complet des pièges dans la mémoire projet.

## Environnement

- Sage X3 V12, dossier `CLTEST` (training)
- Site `AE1`, société `AER`
- Script : `TEST_SCS_NAV.src` (déployé côté X3 sous l'objet Traitements `TEST_NAV_STCK`, dossier `CLTEST` — nom historique jamais renommé, le contenu correspond au fichier `.src` actuel)
- Mécanisme : génération fichier `.dat` (lignes E/L/S) + `Call IMPORTSIL("SCS", fichier) From GIMPOBJ`

## Symptôme

Chaque import échoue avec, dans la trace `OUVRE_TRACE`/`LEC_TRACE`/`FERME_TRACE` (From `LECFIC`) :

```
Zone IPTDAT : Site AE1 / Date 31/12/69 : Période non définie ou traitement interdit à cette date
```

`31/12/69` = sentinelle X3 de date nulle/invalide. Aucun mouvement de stock n'est réalisé.

## Ce qui a été éliminé (avec preuve, pas supposition)

1. **Config période/calendrier** — reproduit la même erreur en saisie **manuelle** X3 sur site AE1 avec une vieille date, PUIS reproduit un **succès** en manuel sur AE1 avec la date du jour ("Fin normale de trace", stock mis à jour). Donc le calendrier/période du site est valide pour aujourd'hui — la piste période est fausse.
2. **Format de date** — testé `AAMMJJ` (6 chiffres, confirmé correct par export réel du modèle GESAOE : `OPTDAT=3`, `LIBDAT="AAMMJJ"`), `AAAAMMJJ` (8 chiffres), `JJ/MM/AAAA` avec séparateurs — les trois donnent soit la sentinelle `31/12/69`, soit un champ carrément vide. Aucun ne passe.
3. **Guillemets / délimiteur de champ** — le modèle déclare `FLDLIM='"'` mais aucun script du dossier ne l'utilisait. Ajouté (`chr$(34)` autour de chaque valeur texte) via `Wrseq` multi-arguments `;` — **même erreur, inchangée au caractère près.**
4. **Bug séparé, résolu en cours de route** : un `Wrseq` avec un seul argument pré-concaténé (au lieu du format classique `;`-séparé) plante avec `Erreur 50 : Fonction indéfinie pour la valeur donnée`. Corrigé (retour au multi-arguments `;`), sans impact sur le symptôme `IPTDAT` ci-dessus.

## Contradiction centrale non résolue

Le même site, la même date, réussissent en saisie manuelle standard X3 mais échouent systématiquement via l'import SCS/IMPORTSIL, quel que soit le format ou le guillemetage testé sur `IPTDAT`.

## Piste non testée à explorer en priorité

Le modèle GESAOE (export réel, onglet Champs) marque `IPTDAT` comme **"Non saisie"** — jamais pris au sens littéral jusqu'ici. `VCRNUM` est déjà laissé vide pour numérotation auto ; personne n'a testé laisser `IPTDAT` **complètement vide** dans la ligne E pour laisser l'objet SCS le déduire côté serveur, au lieu de toujours lui fournir une valeur (bonne ou mauvaise). À tester en premier. **→ Implémenté dans `TEST_SCS_NAV.src` (ligne E, IPTDAT vide), en attente de test X3.**

### Précisions issues de la doc officielle (recherche 01/07/2026)

- **Correction d'interprétation** : dans la doc GESAOE, le flag "Saisie / Non saisie / Non transféré" de l'onglet Champs concerne les **bornes début/fin proposées au lancement de l'export** — ce n'est PAS "champ ignoré à l'import". L'hypothèse "IPTDAT vide" reste à tester, mais pas pour cette raison-là.
- **Mécanisme réel qui colle aux symptômes** : l'import objet est une **simulation de saisie écran** ("processes all the fields on the screen by carrying out the same checks as an interactive entry") et **« les champs non saisissables à l'écran ne sont pas importés »** (doc GESAOE). Or GESSCS est **piloté par transaction de saisie** : la transaction décide champ par champ saisi/affiché/caché. Si la transaction SCS que l'import utilise (défaut/première du dossier) a la date de mouvement en "affiché" ou "caché", la valeur du fichier est jetée quelle que soit sa forme — exactement le comportement observé (immunité totale au format et au quoting). La saisie manuelle marche parce qu'elle passe par une transaction où la date est saisissable + défaut écran (doc GESSCS : date "initialisée avec la date du jour").
- **À vérifier côté X3 si IPTDAT vide échoue encore** : (1) lister les transactions de changement de stock (GESSCS) du dossier CLTEST, identifier celle que l'import prend, contrôler le statut du champ date dedans ; (2) comparer avec la transaction utilisée lors du test manuel réussi ; (3) vérifier si l'en-tête du modèle GESAOE porte un code transaction.
- **Décalage de colonnes possible** : fil communityhub — en V11+ le modèle SCS livré a dû être complété de champs supplémentaires (`SGHTYP` sur SCHGH, `LBENBR`/`LBEFMT` sur STOJOU, `QTYPCU`, `STADESH`). Si le modèle du dossier contient un champ de plus dans la ligne E avant IPTDAT, la date atterrit dans la mauvaise colonne → même immunité au format. À recouper avec le CSV `F724472_OAOE_2863AD38.csv` (bloc AOE2, ordre exact des champs niveau E).

## Pistes secondaires si la précédente échoue

- Dump hexadécimal du fichier `.dat` généré pour vérifier l'encodage réel (`OPTCHA=ISO-8859-1` déclaré dans le modèle) contre ce que `Openo`/`Wrseq` écrit vraiment.
- Vérifier si `TRSFAM="TRA"` est bien un code valide/lié à un `TRSTYP` cohérent — un code mouvement mal lié pourrait fausser la résolution de période/date en amont du contrôle `IPTDAT` lui-même.
- Comparer un import SCS **standard** réussi (si un jeu de données de référence existe dans le dossier) octet pour octet avec le fichier généré par ce script.

## Fichiers concernés

- `TEST_SCS_NAV.src` (racine du repo) — script actuel, guillemets + Wrseq multi-arguments, fonctionnel jusqu'au contrôle `IPTDAT`.
- `F724472_OAOE_2863AD38.csv` — export réel de la config GESAOE modèle SCS (colonnes, format, délimiteurs). Référence de vérité pour toute nouvelle hypothèse.
