# 0002 — [M:] vs [F:] (écran vs base)

**Date** : 2026-06-25
**Leçon** : `lessons/0002-masque-vs-record.html`

## Enseigné
- `[F:ABV]` = buffer enregistrement base ; `[M:MSK]` = buffer masque écran.
- Transfert record↔masque par `=`, sens selon le côté gauche.
- Ancrage YNAVETTE : `$LIENS` ([M]=[F] + Affzo + Grizo), `$INICRE` ([F]=[M]).
- Pièges : écrire [F:] n'affiche rien ; écrire [M:] ne sauve rien.
- Distinction blocs YNV0 (en-tête) / YNV1 (grille).

## Premier rappel espacé introduit
- Footer : re-questionne « qui remplit ACTION ? » (leçon 1).

## Zone proximale — suite
1. `fstat` + pattern `Read … If fstat` ← suivant (leçon 3)
2. Boucle `For/Next` + accès grille `(I)` / `NBYNV` (leçon 4)
3. Transactions (leçon 5)
4. Fichiers séquentiels Openo/Wrseq (leçon 6)

## À surveiller
- Rétention du sens du transfert (gauche=cible). Re-tester en leçon 4 quand on
  remplira la grille `[M:YNV1]…(I)` depuis le stock.
