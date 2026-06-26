# Ressources — L4G Sage X3

## Knowledge (références de confiance)

| Ressource | Type | Confiance | Usage |
|---|---|---|---|
| [Sage X3 Online Help — 4GL (V7DEV)](https://online-help.sagex3.com/erp/12/en-us/Content/V7DEV/) | Doc officielle | ★★★★★ | Syntaxe faisant autorité (Openo, Wrseq, format$, Read…). Toujours vérifier ici. |
| [L.V. Expertise X3](https://lvexpertisex3.com/x3help/ENG/V7DEV/) | Miroir doc + notes | ★★★★☆ | Même doc, parfois plus lisible, exemples. |
| Skill local `sage-x3-l4g` (`~/.claude/plugins/.../references/`) | Cheat-sheets | ★★★★☆ | Patterns prêts à l'emploi. ⚠️ vérifié faux sur `replace$` et `num$(date,fmt)` — recouper avec la doc officielle. |
| [Greytrix — blog Sage X3](https://www.greytrix.com/blogs/sagex3/) | Blog praticien | ★★★☆☆ | Recettes concrètes (boutons, filtres). Dater/recouper. |

## Wisdom (communautés — tester ses acquis)

| Communauté | Pourquoi |
|---|---|
| [Sage X3 Community Hub](https://communityhub.sage.com/us/sage_x3/) | Forum officiel dev/fonctionnel. Poser des questions précises, lire des cas réels. |
| MCP Sage-X3 (interne) | Explorer le vrai modèle de données prod/test (tables, jointures) — vérité terrain. |

## Leçons apprises sur les sources

- Le skill local a des erreurs ponctuelles → **la doc officielle prime** en cas de doute.
- Le validateur X3 numérote les lignes **après suppression des commentaires** → ne pas
  se fier au n° brut du fichier quand une erreur tombe.
