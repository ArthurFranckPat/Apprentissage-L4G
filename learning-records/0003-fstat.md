# 0003 — fstat

**Date** : 2026-06-25
**Leçon** : `lessons/0003-fstat.html`

## Enseigné
- Pas d'exceptions en L4G ; `[S]fstat` = code retour, 0 = succès.
- Réflexe : tester fstat immédiatement après chaque op DB/fichier.
- `If fstat` ≡ `If fstat = 0` inversé (entier non nul = vrai).
- Ancrage YNAVETTE `$LIENS2` : copie BPCORD seulement si fstat=0.
- Read par nom d'INDEX (SOH0, NAVETTE) pas par champ.

## Rappels espacés actifs
- Footer leçon 2 (sens du transfert [M]=[F]) re-testé.
- Footer leçon 1 (ACTION) déjà re-testé en leçon 2.

## Zone proximale — suite
1. Grille : `For/Next`, `[M:YNV1]xxx(I)`, `NBYNV`, anti-doublon PICKE ← leçon 4
2. Transactions Trbegin/Commit/Rollback + If adxlog (leçon 5)
3. Fichiers séquentiels Openo/Wrseq + Iomode (leçon 6, via GENERE_BL)

## À surveiller
- Leçon 4 = première où on INTERLEAVE : grille (neuf) + fstat + transfert (anciens).
  Bon test de storage strength.
