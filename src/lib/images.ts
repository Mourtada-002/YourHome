/**
 * Central catalogue of placeholder visuals (Unsplash, free license).
 * Swap the `src` values for real property/team photos when available —
 * every component reads from here, so there is a single place to update.
 */

export interface PlaceholderImage {
  src: string;
  alt: string;
}

function unsplash(id: string, params = "w=1600&q=80&auto=format&fit=crop") {
  return `https://images.unsplash.com/photo-${id}?${params}`;
}

export const properties = {
  villaCotedazur: {
    src: unsplash("1512917774080-9991f1c4c750"),
    alt: "Villa contemporaine avec piscine à débordement, Côte d'Azur",
  },
  penthouseParis: {
    src: unsplash("1600596542815-ffad4c1539a9"),
    alt: "Salon design d'un penthouse parisien",
  },
  maisonDusk: {
    src: unsplash("1600585154340-be6161a56a0c"),
    alt: "Maison d'architecte illuminée au crépuscule, bord de piscine",
  },
  facadeModerne: {
    src: unsplash("1600607687939-ce8a6c25118c"),
    alt: "Façade moderne aux lignes épurées",
  },
  chambreSuite: {
    src: unsplash("1600585152220-90363fe7e115"),
    alt: "Suite parentale minimaliste baignée de lumière",
  },
  cuisineIlot: {
    src: unsplash("1600210492486-724fe5c67fb0"),
    alt: "Cuisine ouverte avec îlot central en marbre",
  },
  villaPiscine: {
    src: unsplash("1613977257363-707ba9348227"),
    alt: "Villa de prestige, jardin et piscine privée",
  },
  facadePierre: {
    src: unsplash("1560448204-e02f11c3d0e2"),
    alt: "Demeure en pierre au style intemporel",
  },
  maisonVegetation: {
    src: unsplash("1568605114967-8130f3a36994"),
    alt: "Maison contemporaine entourée de végétation",
  },
  villaNuit: {
    src: unsplash("1570129477492-45c003edd2be"),
    alt: "Villa avec piscine éclairée à la tombée de la nuit",
  },
  architectureLignes: {
    src: unsplash("1502005229762-cf1b2da7c5d6"),
    alt: "Architecture contemporaine aux lignes géométriques",
  },
  maisonAngle: {
    src: unsplash("1493809842364-78817add7ffb"),
    alt: "Maison d'architecte vue d'angle",
  },
  interieurLumineux: {
    src: unsplash("1524758631624-e2822e304c36"),
    alt: "Intérieur lumineux au design épuré",
  },
  salonCosy: {
    src: unsplash("1523217582562-09d0def993a6"),
    alt: "Salon chaleureux aux matières nobles",
  },
  salleDeBain: {
    src: unsplash("1505873242700-f289a29e1e0f"),
    alt: "Salle de bain en marbre, style spa",
  },
  interieurLuxe: {
    src: unsplash("1544984243-ec57ea16fe25"),
    alt: "Intérieur d'exception aux finitions haut de gamme",
  },
  salonLumiere: {
    src: unsplash("1522708323590-d24dbb6b0267"),
    alt: "Salon baigné de lumière naturelle",
  },
  maisonJardin: {
    src: unsplash("1484154218962-a197022b5858"),
    alt: "Maison familiale avec grand jardin",
  },
  chambreDouce: {
    src: unsplash("1600566753086-00f18fb6b3ea"),
    alt: "Chambre aux tons doux et naturels",
  },
  cuisineBois: {
    src: unsplash("1615873968403-89e068629265"),
    alt: "Cuisine en bois massif et pierre naturelle",
  },
} as const satisfies Record<string, PlaceholderImage>;

export const portraits = {
  agentClaire: {
    src: unsplash("1573496359142-b8d87734a5a2", "w=800&q=80&auto=format&fit=crop"),
    alt: "Claire Fontaine, fondatrice de YourHome",
  },
  agentMarc: {
    src: "https://images.pexels.com/photos/13801497/pexels-photo-13801497.jpeg",
    alt: "Christian Emmanuel, directeur des transactions",
  },
  agentNoah: {
    src: "https://images.pexels.com/photos/19428367/pexels-photo-19428367.jpeg",
    alt: "Noah Bertrand, expert biens de prestige",
  },
  agentSofia: {
    src: "https://images.pexels.com/photos/12898977/pexels-photo-12898977.jpeg",
    alt: "Fadimata Diallo, responsable relation clients",
  },
  clientHenri: {
    src: unsplash("1519085360753-af0119f7cbe7", "w=400&q=80&auto=format&fit=crop"),
    alt: "Henri D., propriétaire accompagné par YourHome",
  },
  clientElena: {
    src: unsplash("1544005313-94ddf0286df2", "w=400&q=80&auto=format&fit=crop"),
    alt: "Elena M., acquéreuse d'un bien de prestige",
  },
  clientYanis: {
    src: unsplash("1531123897727-8f129e1688ce", "w=400&q=80&auto=format&fit=crop"),
    alt: "Yanis K., investisseur immobilier",
  },
  clientAmelie: {
    src: unsplash("1580489944761-15a19d654956", "w=400&q=80&auto=format&fit=crop"),
    alt: "Amélie R., cliente satisfaite",
  },
} as const satisfies Record<string, PlaceholderImage>;
