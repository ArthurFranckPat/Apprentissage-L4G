# 0004 — La grille (masque multi-lignes)

**Date** : 2026-06-25
**Leçon** : `lessons/0004-la-grille.html`

## Enseigné
- Grille `[M:YNV1]` = colonnes-tableaux, accès `champ(I)`.
- Compteur `NBYNV` : lignes valides 0..NBYNV-1, 1re libre = NBYNV.
- Parcours `For I=0 To NBYNV-1` (ancrage $LIENS2).
- Ajout à l'indice NBYNV puis `NBYNV += 1` (ancrage $PICKE).
- Anti-doublon + OK=0 (rappel : OK=0 bloque l'action).
- Piège suppression milieu + I-=1 ($DEPICK / Dela).

## Premier interleaving
- Combine explicitement : boucle (neuf) + fstat (L3) + transfert base→écran (L2)
  dans le même bloc $LIENS2. Test storage strength.

## Rappels espacés actifs
- Footer : fstat succès (L3) + sens transfert [F]=[M] (L2).

## Zone proximale — suite
1. Transactions Trbegin/Commit/Rollback + If adxlog ← leçon 5 (via VALIDE_NAVETTE)
2. Fichiers séquentiels Openo/Wrseq/Iomode (leçon 6, via GENERE_BL)
3. Link (jointure à la volée) — vu dans GENERE_BL, candidat leçon 7

## À surveiller
- 4 leçons faites d'un coup aujourd'hui. Surveiller fatigue : proposer pause /
  une session de pur retrieval (quiz mixés) avant d'attaquer les transactions.
