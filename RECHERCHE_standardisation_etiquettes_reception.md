# Recherche — standardisation étiquettes réception fournisseur/client

## Contexte

Flux actuel :
1. Réception camion → comptage contenants/palettes
2. Réception informatique X3 → comptage cartons/pièces vs bon de livraison
3. Création réception X3 → statut qualité Q
4. Contrôle qualité (interne ou service dédié) → passage statut A
5. Sortie stock → impression étiquette manuelle (article, lot, indice, qté) → collage palette

Problème : chaque fournisseur a son propre format d'étiquette, aucune donnée commune exploitable automatiquement. Objectif recherche :
- Étape 1 : benchmark standards existants pour uniformiser données/étiquette fournisseur→client
- Étape 2 : exploiter ces données pour automatiser la réception X3 (sans repasser par saisie écran)

## État de l'art

### Standard générique dominant : GS1-128 / GS1 DataMatrix

Application Identifiers (AI) encodent données structurées dans un seul code-barres :

| AI | Donnée |
|----|--------|
| 00 | SSCC (identifiant unique colis/palette, "licence plate") |
| 01 | GTIN (article) |
| 10 | Lot |
| 17 | DLUO / péremption |
| 21 | N° série |
| 30 | Quantité variable |

Couvre exactement les 4 champs de l'étiquette manuelle actuelle (réf article, lot, indice → AI 21, qté).

### Standard automobile convergé : GTL (Global Transport Label)

- Fusion Odette + AIAG (B-10, USA) + JAMA/JAPIA (Japon) + VDA 4994 (Allemagne) → standard mondial unique
- Remplace anciens VDA 4902 / Odette OTL / AIAG B-10 (obsolètes, plus appliqués)
- Contient SSCC + DataMatrix / Code128 / QR / PDF417
- Fournisseurs équipés auto/industriel probablement déjà compatibles GTL

### Levier réel : ASN (Advance Shipping Notice) — EDI 856 (X12) / DESADV (EDIFACT)

- Fournisseur envoie message électronique avant arrivée camion : SSCC, contenu, qté, lot par colis
- SSCC label physique = clé de rapprochement avec l'ASN → réception = scan + rapprochement, pas comptage manuel
- C'est ce levier — pas seulement l'étiquette — qui élimine le comptage carton/pièce

## Constat côté Sage X3

Transaction **Mobile Automation (ADC) "Purchase receipt"** (GESAOE) supporte nativement le scan composite GS1 :
- AI reconnus : 01 (GTIN), 10 (lot), 17 (péremption), 21 (série)
- Scan → lot/DLUO/série auto-remplis, plus de saisie écran

Le socle technique existe déjà côté X3, sans développement supplémentaire pour la lecture. Le gap n'est pas technique X3, il est fournisseur (étiquettes non standardisées, pas de flux EDI/ASN).

## Plan en 2 étapes

### Étape 1 — Benchmark fournisseurs

Classer fournisseurs :
- Déjà GS1-128/DataMatrix ou GTL ? → activer scan ADC directement
- Étiquette maison non standard ? → à convertir, prioriser les gros volumes en premier (effort de négociation fournisseur > effort technique)

### Étape 2 — Réception sans repasser par PC

1. **Court terme** : douchette + transaction ADC Purchase receipt au quai → scan SSCC/GTIN/lot → réception créée directement, sans PC
2. **Moyen terme** : import ASN (DESADV) avant camion → attendu pré-chargé dans X3 → réception quai = simple confirmation d'écart (fini le comptage pièce par pièce)
3. **Lien contrôle qualité** : transaction contrôle réception mobile (même appli ADC) pour lier Q→A sans second aller-retour PC

## Prochaine action

Lister les 10-15 plus gros fournisseurs (volume), vérifier leur format d'étiquette actuel → point de départ concret du benchmark.

## Sources

- [GS1 Logistic Label Guideline](https://www.gs1.org/standards/gs1-logistic-label-guideline/current-standard)
- [GS1 Application Identifiers](https://www.gs1.org/gs1-application-identifiers)
- [Global Transport Label — Odette](https://www.odette.org/uploads/resources/document/LL07_Global_Transport_Label.pdf)
- [GTL Odette Profile v2.3 2025](https://www.odette.org/uploads/resources/document/LL08_GTL-Odette-Profile_v2.3-2025.pdf)
- [EDI 856 / ASN — TrueCommerce](https://www.truecommerce.com/edi-transaction-codes/edi-856/)
- [Sage X3 Mobile Automation ADC](https://online-help.sagex3.com/erp/12/howtoguides/en-US/negoce/ADC/Default.htm)
- [Sage X3 Purchase receipt ADC](https://online-help.sagex3.com/erp/12/howtoguides/en-US/negoce/ADC/Content/How-to%20guides/Distribution/ADC/Purchase%20receipt.htm)
