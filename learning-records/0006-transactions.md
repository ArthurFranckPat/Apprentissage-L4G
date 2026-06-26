# 0006 — Transactions

**Date** : 2026-06-25
**Leçon** : `lessons/0006-transactions.html`

## Enseigné
- Trbegin / Commit / Rollback ; verrouillage tables.
- Règle X3 : un seul niveau de transaction -> idiome `If adxlog` + IF_TRANS.
- Subprog réutilisable n'ouvre/commit que s'il est propriétaire.
- Piège : pas d'attente user / calcul long / appel distant dans la transaction
  (ancrage : OUINON avant, transaction en fin de VALIDE_NAVETTE).
- Squelette sûr Readlock/Rewrite + Rollback sur chaque échec.

## Rappel espacé OK vs fstat
- Q4 de la leçon re-teste explicitement le point faible identifié en 0005. ✓

## Rappels espacés actifs (footer)
- Indice d'ajout grille (L4) + rôle $ACTION (L1).

## Zone proximale — suite
1. Fichiers séquentiels Openo/Wrseq/Iomode ← leçon 6 (GENERE_BL)
2. Link jointure à la volée (leçon 7, GENERE_BL)
3. Consolidation 2 (inclure OK-vs-fstat + transactions) après leçon 7

## À surveiller
- adxlog/IF_TRANS = abstrait. Vérifier compréhension via question de lecture de
  code en consolidation 2, pas juste rappel théorique.
