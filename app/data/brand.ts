export type BrandAsset = {
  preferredSrc: string;
  fallbackSrc: string;
  src: string;
  isAvailable: boolean;
};

export type BrandConfig = {
  brand: {
    name: string;
    slogan: string;
    shortDescription: string;
    fullDescription: string;
    foundedSince: string;
    city: string;
    domain: string;
  };
  assets: {
    hero: BrandAsset;
    logo: BrandAsset;
  };
  contact: {
    whatsapp: string;
    phone: string;
    orderReceiverName: string;
    orderPhone: string;
    email: string;
    showroom: string;
    openingHours: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
  };
  delivery: {
    zones: string[];
    delays: string[];
    note: string;
    fees: string;
  };
  payments: string[];
  policies: {
    exchanges: string;
    refunds: string;
    damagedItem: string;
  };
};

const heroAssetAvailable = true;
const logoAssetAvailable = true;

const heroPreferredSrc = "/brand/sb-luxury-hero.png";
const logoPreferredSrc = "/brand/sb-luxury-logo.png";
const fallbackImageSrc = "/hero.png";

export const brandConfig: BrandConfig = {
  brand: {
    name: "SB LUXURY CASUAL",
    slogan: "L’art d’être remarquable",
    shortDescription:
      "Mode premium masculine inspirée par l’élégance moderne et l’art de vivre africain.",
    fullDescription:
      "SB LUXURY CASUAL est une marque de mode premium inspirée par l’élégance moderne et l’art de vivre africain. Depuis 2018, nous créons des pièces raffinées pour les hommes qui cultivent la distinction.",
    foundedSince: "2018",
    city: "Abidjan, Côte d’Ivoire",
    domain: "sbluxurycasual.com",
  },
  assets: {
    hero: {
      preferredSrc: heroPreferredSrc,
      fallbackSrc: fallbackImageSrc,
      src: heroAssetAvailable ? heroPreferredSrc : fallbackImageSrc,
      isAvailable: heroAssetAvailable,
    },
    logo: {
      preferredSrc: logoPreferredSrc,
      fallbackSrc: fallbackImageSrc,
      src: logoAssetAvailable ? logoPreferredSrc : fallbackImageSrc,
      isAvailable: logoAssetAvailable,
    },
  },
  contact: {
    whatsapp: "0759207059",
    phone: "0759207059",
    orderReceiverName: "Ariel Colombe",
    orderPhone: "+225 0584438215",
    email: "Pas encore disponible",
    showroom: "Riviera Faya, non loin de Génie 2000",
    openingHours: "Lundi au samedi, de 09h à 20h",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/share/198MoeMJ7U/",
    instagram: "https://www.instagram.com/sb_theluxury?igsh=MWx2aGNnMjU2OHBvaQ==",
  },
  delivery: {
    zones: [
      "Abidjan, toutes communes",
      "Intérieur de la Côte d’Ivoire",
      "Afrique de l’Ouest",
      "France",
    ],
    delays: [
      "Abidjan : 24 à 48 heures ouvrables",
      "Intérieur du pays : 2 à 5 jours ouvrables",
      "International : selon le transporteur et la destination",
    ],
    note:
      "Les délais sont donnés à titre indicatif et peuvent varier en fonction des conditions logistiques.",
    fees:
      "Les frais de livraison sont communiqués au client lors de la confirmation de la commande et varient selon la destination.",
  },
  payments: [
    "Orange Money",
    "Wave",
    "Paiement en espèces à la livraison, selon la zone",
    "Virement bancaire",
  ],
  policies: {
    exchanges:
      "Les échanges sont possibles sous réserve que l’article soit retourné dans son état d’origine, non porté et non endommagé.",
    refunds:
      "Les demandes de remboursement sont étudiées au cas par cas. Les articles personnalisés ou portés ne sont ni repris ni remboursés.",
    damagedItem:
      "Si le client reçoit un article endommagé, il doit contacter le service client dans les 24 heures suivant la réception, avec des photos du produit concerné.",
  },
};
