# État YNAVBL — bordereau récapitulatif de navette

Réponse à l'issue GitHub #1 : document imprimable listant toutes les palettes d'une
navette (palette, article, désignation, quantité, commande, client), via la chaîne
d'impression **standard** de Sage X3 (GESARP + destinations GESADI). Remplace la
première tentative en HTML artisanal (`ZYNAVETTE_BL.src`, supprimée).

## Ce qui est déjà fait (code)

`SPEYNV.src`, `$EXEBOUT` : le bouton de code **`I`** lance l'état :

```l4g
YIPAR(1)="navdeb" : YIVAL(1)=[M:YNV0]NAVETTE
YIPAR(2)="navfin" : YIVAL(2)=[M:YNV0]NAVETTE
Call ETAT("YNAVBL","","",0,"",YIPAR,YIVAL) From AIMP3
```

Signature standard `ETAT` (traitement `AIMP3`) :
`Call ETAT(RAPPORT, DESTINATION, LANGUE, TRACE, MSG, TBPAR, TBVAL) From AIMP3`
— destination vide = destination par défaut de l'état / de l'utilisateur (GESADI),
donc l'aperçu écran / imprimante / PDF restent au choix via le mécanisme standard.

## Étapes de configuration dans le dossier CLTEST

### 1. Rapport Crystal `YNAVBL.rpt`

Requête (validée sur CLTEST) — la volumétrie reste côté serveur d'édition,
aucune jointure en 4GL :

```sql
SELECT N.NAVETTE_0, N.DAT_0, N.HOU_0, N.VALFLG_0,
       N.PALNUM_0, N.ITMREF_0, I.ITMDES1_0, N.QTY_0,
       N.SOHNUM_0, S.BPCORD_0, B.BPCNAM_0
FROM   CLTEST.YNAVETTE N
LEFT JOIN CLTEST.ITMMASTER  I ON I.ITMREF_0 = N.ITMREF_0
LEFT JOIN CLTEST.SORDER     S ON S.SOHNUM_0 = N.SOHNUM_0
LEFT JOIN CLTEST.BPCUSTOMER B ON B.BPCNUM_0 = S.BPCORD_0
WHERE  N.NAVETTE_0 BETWEEN {?navdeb} AND {?navfin}
ORDER BY N.NAVETTE_0, N.SOHNUM_0, N.PALNUM_0
```

Maquette :

- **En-tête** : n° navette, date (`DAT_0`), heure (`HOU_0`), statut
  (`VALFLG_0` : 1 = non validée, 2 = validée → formule Crystal
  `if {YNAVETTE.VALFLG_0} = 2 then "Validée" else "Non validée"`).
- **Détail** (une ligne par palette) : palette, article, désignation, quantité,
  commande, code client, raison sociale.
- **Pied** : total `QTY_0`, nombre de palettes distinctes
  (`DistinctCount({YNAVETTE.PALNUM_0})`), zone signature chauffeur/quai.
- Groupe optionnel par commande (`SOHNUM_0`) pour lisibilité côté quai.

Déposer le `.rpt` sous `<dossier>/PRT/` du serveur d'édition, puis valider
l'état dans l'éditeur (cache du `.rpt` compilé, sinon l'ancienne maquette
continue de sortir).

### 2. Dictionnaire des états (`GESARP`)

- Code état : **`YNAVBL`** (préfixe `Y`, convention dossier)
- Intitulé : « Bordereau navette »
- Paramètres :

| Code | Intitulé | Type | Défaut |
|---|---|---|---|
| `navdeb` | Navette début | Char (20) | — |
| `navfin` | Navette fin | Char (20) | — |

Les noms `navdeb`/`navfin` doivent correspondre **exactement** aux paramètres
`{?navdeb}` / `{?navfin}` du `.rpt` et aux valeurs passées par `$EXEBOUT`.

### 3. Bouton dans la fenêtre `YNAVETTE` (`GESAWI`)

- Onglet Boutons : ajouter code **`I`**, intitulé « Bordereau »
  (même mécanique que le bouton Valider `V` : le superviseur route vers
  `$EXEBOUT` de `SPEYNV.src` avec `BOUT="I"`).
- Ne **pas** le retirer dans `$SETBOUT` : le bordereau doit sortir sur une
  navette validée comme non validée (seul `VA` est retiré quand `VALFLG=2`).
- Revalider la fenêtre après modification.

### 4. Destinations (`GESADI`)

Rien de spécifique : destination vide dans l'appel → l'utilisateur garde son
choix standard (aperçu écran / imprimante / PDF). Vérifier simplement que le
poste de dev voit le serveur d'édition pour tester l'aperçu.

### 5. Optionnel — impression auto en fin de validation

Si souhaité plus tard, à la fin de `VALIDE_NAVETTE` (dans le bloc `If [L]YERR=0`,
après le `Commit`), en interactif seulement :

```l4g
If GSERVEUR=0 and GWEBSERV=0
  YIPAR(1)="navdeb" : YIVAL(1)=[L]NAVETTE
  YIPAR(2)="navfin" : YIVAL(2)=[L]NAVETTE
  Call ETAT("YNAVBL","","",0,"",YIPAR,YIVAL) From AIMP3
Endif
```

Volontairement non câblé : hors critères d'acceptation, à activer après
validation du bordereau au quai.

## Recette (critères d'acceptation de l'issue)

- [ ] Clic bouton « Bordereau » sur une fiche navette → l'état sort (aperçu ou imprimante selon destination)
- [ ] Toutes les palettes de la navette listées avec article, désignation, quantité, commande, client
- [ ] En-tête : n° navette, date, heure, statut ; pied : total quantité, nb palettes distinctes, zone signature
- [ ] Chaîne 100 % standard : GESARP + GESADI, aucun fichier écrit à la main depuis le 4GL
- [ ] Fonctionne navette validée (`VALFLG=2`) et non validée (`VALFLG=1`)
- [ ] Tout en préfixe `Y`, aucun objet standard modifié

Test rapide : navette `NAV250900015` (validée, client ALDES) existe sur CLTEST
et couvre plusieurs commandes/palettes.
