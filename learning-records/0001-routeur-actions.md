# 0001 — Le routeur d'actions ($ACTION)

**Date** : 2026-06-25
**Leçon** : `lessons/0001-le-routeur-d-actions.html`

## Contexte
Première leçon. Mission = montée en compétence métier X3. Profil = débutant L4G
mais dev solide (concepts de prog acquis). Ancrage = script réel YNAVETTE.

## Enseigné
- `$ACTION` comme point d'entrée unique d'un objet X3.
- `Case ACTION / When "X" : Gosub X / Endcase` comme dispatcher.
- `ACTION` rempli par le superviseur (pas par le dev).
- `:` = séparateur d'instructions, pas fin de ligne.
- Lecture du routeur comme « table des matières des gestes métier ».

## Calibrage observé
- Dev solide → analogie event-loop/dispatcher posée d'emblée, pas de ré-explication
  des concepts de base. L'effort porte sur le vocabulaire X3 spécifique.

## Zone proximale — prochaines étapes
1. **`[M:]` vs `[F:]`** : écran vs base, transfert `[M:YNV0]=[F:YNV]` (`$LIENS`). ← suivant
2. `fstat` et le pattern `Read … If fstat`.
3. `For … Where … Next` + accès grille `[M:YNV1]xxx(I)` / `NBYNV`.
4. Transactions `Trbegin/Commit/Rollback` (via VALIDE_NAVETTE).
5. Fichiers séquentiels Openo/Wrseq (via GENERE_BL).

## À surveiller
- Vérifier la rétention du sens de `:` et de « qui remplit ACTION » à la leçon 3
  (retrieval espacé).
