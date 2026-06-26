# 0005 — Consolidation 1 + point faible OK vs fstat

**Date** : 2026-06-25
**Leçon** : `lessons/0005-consolidation-1.html`

## Résultat
- Score 9/10. Seule erreur : Q6 = rôle de `OK = 0`.
- Lecture de code (Q7–10) : toutes justes -> bonne storage strength sur grille/fstat/transfert.

## Point faible identifié : OK vs fstat
- Confusion classique. Clarifié en chat :
  - `fstat` = moteur -> toi, code retour, 0 = succès.
  - `OK` = toi -> moteur, verdict, 0 = bloque l'action.
  - Mémo : "moteur→toi = fstat ; toi→moteur = OK".
- **À re-tester** explicitement dans la prochaine consolidation (rappel espacé).

## Zone proximale — suite
1. Transactions Trbegin/Commit/Rollback + If adxlog ← leçon 5 (VALIDE_NAVETTE)
2. Fichiers séquentiels (leçon 6, GENERE_BL)
3. Link jointure à la volée (leçon 7)

## À surveiller
- Glisser une question OK-vs-fstat dans la consolidation 2.
