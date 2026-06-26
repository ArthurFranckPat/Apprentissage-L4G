# Mission — Maîtriser le L4G Sage X3

## Le pourquoi

Devenir **développeur/consultant Sage X3 crédible** : savoir lire, écrire, debugger
et faire évoluer le code spécifique (objets, écrans, transactions de saisie,
génération de BL, mouvements de stock) de bout en bout — du clic utilisateur
jusqu'à l'écriture en base.

## Profil

- **Niveau L4G** : débutant (la syntaxe X3 et ses idiomes déroutent).
- **Background** : développeur solide dans d'autres langages → les concepts de prog
  (boucles, scope, transactions) sont acquis. L'effort porte sur **ce qui est
  spécifique à X3**, pas sur la prog générale.
- **Angle** : métier. Chaque notion de code doit se rattacher à un geste métier
  réel (picker une palette, valider une navette, générer un BL).

## Terrain d'ancrage

Le script réel **`YNAVETTE`** (gestion des navettes de livraison) sert de fil rouge :
objet à écran en-tête + grille, picking de palettes depuis le stock, validation
qui génère un BL Sage via import. C'est le matériau de référence des leçons.

## Définition de la réussite

Pouvoir prendre un `.src` d'objet X3 inconnu et :
1. comprendre son point d'entrée et son flux d'actions,
2. tracer une donnée de l'écran à la base (et retour),
3. modifier un comportement sans casser les transactions ni les verrous.
