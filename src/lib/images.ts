export interface PlaceholderImage {
  src: string;
  alt: string;
}
export const properties = {
  villaCotedazur: {
    src: "/assets/images/properties/villa-cotedazur.jpg",
    alt: "Villa contemporaine avec piscine à débordement, Côte d'Azur",
  },
  penthouseParis: {
    src: "/assets/images/properties/penthouse-paris.jpg",
    alt: "Salon design d'un penthouse parisien",
  },
  maisonDusk: {
    src: "/assets/images/properties/maison-dusk.jpg",
    alt: "Maison d'architecte illuminée au crépuscule, bord de piscine",
  },
  facadeModerne: {
    src: "/assets/images/properties/facade-moderne.jpg",
    alt: "Façade moderne aux lignes épurées",
  },
  chambreSuite: {
    src: "/assets/images/properties/chambre-suite.jpg",
    alt: "Suite parentale minimaliste baignée de lumière",
  },
  cuisineIlot: {
    src: "/assets/images/properties/cuisine-ilot.jpg",
    alt: "Cuisine ouverte avec îlot central en marbre",
  },
  villaPiscine: {
    src: "/assets/images/properties/villa-piscine.jpg",
    alt: "Villa de prestige, jardin et piscine privée",
  },
  facadePierre: {
    src: "/assets/images/properties/facade-pierre.jpg",
    alt: "Demeure en pierre au style intemporel",
  },
  maisonVegetation: {
    src: "/assets/images/properties/maison-vegetation.jpg",
    alt: "Maison contemporaine entourée de végétation",
  },
  villaNuit: {
    src: "/assets/images/properties/villa-nuit.jpg",
    alt: "Villa avec piscine éclairée à la tombée de la nuit",
  },
  architectureLignes: {
    src: "/assets/images/properties/architecture-lignes.jpg",
    alt: "Architecture contemporaine aux lignes géométriques",
  },
  maisonAngle: {
    src: "/assets/images/properties/maison-angle.jpg",
    alt: "Maison d'architecte vue d'angle",
  },
  interieurLumineux: {
    src: "/assets/images/properties/interieur-lumineux.jpg",
    alt: "Intérieur lumineux au design épuré",
  },
  salonCosy: {
    src: "/assets/images/properties/salon-cosy.jpg",
    alt: "Salon chaleureux aux matières nobles",
  },
  salleDeBain: {
    src: "/assets/images/properties/salle-de-bain.jpg",
    alt: "Salle de bain en marbre, style spa",
  },
  interieurLuxe: {
    src: "/assets/images/properties/interieur-luxe.jpg",
    alt: "Intérieur d'exception aux finitions haut de gamme",
  },
  salonLumiere: {
    src: "/assets/images/properties/salon-lumiere.jpg",
    alt: "Salon baigné de lumière naturelle",
  },
  maisonJardin: {
    src: "/assets/images/properties/maison-jardin.jpg",
    alt: "Maison familiale avec grand jardin",
  },
  chambreDouce: {
    src: "/assets/images/properties/chambre-douce.jpg",
    alt: "Chambre aux tons doux et naturels",
  },
  cuisineBois: {
    src: "/assets/images/properties/cuisine-bois.jpg",
    alt: "Cuisine en bois massif et pierre naturelle",
  },
} as const satisfies Record<string, PlaceholderImage>;

export const portraits = {
  agentClaire: {
    src: "/assets/images/team/claire-fontaine.jpg",
    alt: "Claire Fontaine, fondatrice de YourHome",
  },
  agentMarc: {
    src: "/assets/images/team/christian-emmanuel.jpg",
    alt: "Christian Emmanuel, directeur des transactions",
  },
  agentNoah: {
    src: "/assets/images/team/noah-bertrand.jpg",
    alt: "Noah Bertrand, expert biens de prestige",
  },
  agentSofia: {
    src: "/assets/images/team/fadimata-diallo.jpg",
    alt: "Fadimata Diallo, responsable relation clients",
  },
  clientHenri: {
    src: "/assets/images/clients/henri-d.jpg",
    alt: "Henri D., propriétaire accompagné par YourHome",
  },
  clientElena: {
    src: "/assets/images/clients/elena-m.jpg",
    alt: "Elena M., acquéreuse d'un bien de prestige",
  },
  clientYanis: {
    src: "/assets/images/clients/yanis-k.jpg",
    alt: "Yanis K., investisseur immobilier",
  },
  clientAmelie: {
    src: "/assets/images/clients/amelie-r.jpg",
    alt: "Amélie R., cliente satisfaite",
  },
} as const satisfies Record<string, PlaceholderImage>;
