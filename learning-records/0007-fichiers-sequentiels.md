# 0007 — Fichiers séquentiels (Openo/Wrseq/Iomode)

**Date** : 2026-06-26
**Leçon** : `lessons/0007-fichiers-sequentiels.html`

## Enseigné
- Openo path Using [ABV] / Wrseq Using [ABV] / fermeture = Openo Using [ABV].
- Pièges syntaxe (les vrais bugs du début de session) : Using = crochets pas n°,
  Wrseq pas Writeseq, close = Openo sans chemin.
- Iomode adxifs (champ) / adxirs (ligne CR+LF).
- Ancrage GENERE_BL réel : filpath folder-aware, format$ date horodatée,
  en-tête H une seule fois (If YFICHIER_IMPORT=""), L/S répétés.
- Fermer avant IMPORTSIL.
- Rappel : format date = format$, pas num$(date,fmt).

## Boucle pédagogique fermée
- Cette leçon explique exactement le code qui posait problème en début de session
  (Openo/Wrseq/replace$/num$). L'apprenant comprend maintenant chaque ligne.

## Rappels espacés actifs (footer)
- adxlog (L5) + timing test fstat (L3).

## Zone proximale — suite
1. Link jointure à la volée ← leçon 7 (GENERE_BL utilise Link [F:YSTA] With ... As)
2. Consolidation 2 : inclure transactions + OK/fstat + fichiers (interleaving large)
3. Candidats avancés : Filter/Order By, OUVRE_TRACE/ECR_TRACE (debug), IMPORTSIL

## À surveiller
- Beaucoup de notions denses (5,6 d'affilée). Proposer consolidation 2 après Link.
