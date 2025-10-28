// ====================================
// ZENIT ASTRO SHOP - MOCK DATA
// ====================================

// Estructura de cada producto:
// {
//   id: número único (clave primaria)
//   name: string (nombre del producto)
//   description: string (descripción detallada)
//   price: number (precio en pesos argentinos)
//   category: string (categoría para filtrado)
//   image: string (URL de imagen - usaremos URLs de ejemplo)
//   stock: number (unidades disponibles)
//   featured: boolean (producto destacado para home)
// }

export const categories = [
  { id: "lamps", name: "Lámparas Cósmicas", icon: "🌙" },
  { id: "books", name: "Biblioteca Estelar", icon: "📚" },
  { id: "telescopes", name: "Observación", icon: "🔭" },
  { id: "clothing", name: "Cosmic Wear", icon: "👕" },
  { id: "posters", name: "Arte Espacial", icon: "🖼️" },
];

export const products = [
  // ========== LÁMPARAS CÓSMICAS ==========
  {
    id: 1,
    name: "Lámpara Luna 3D",
    description:
      "Réplica exacta de la Luna con impresión 3D de alta resolución. Incluye 16 colores LED ajustables con control remoto. Recargable vía USB.",
    price: 12500,
    category: "lamps",
    image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=500",
    stock: 15,
    featured: true,
  },
  {
    id: 2,
    name: "Lámpara Astronauta Flotante",
    description:
      "Astronauta LED con base magnética que simula gravedad cero. Luz cálida regulable perfecta para escritorios y mesitas de noche.",
    price: 18900,
    category: "lamps",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=500",
    stock: 8,
    featured: true,
  },
  {
    id: 3,
    name: "Proyector Galaxia",
    description:
      "Proyecta nebulosas y estrellas en tu techo. 8 modos de color, temporizador automático y control por app. Perfecto para meditación y descanso.",
    price: 15300,
    category: "lamps",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500",
    stock: 12,
    featured: true,
  },
  {
    id: 4,
    name: "Lámpara Sistema Solar",
    description:
      "Los 8 planetas iluminados en órbita. Diseño minimalista de metal con acabado dorado. Funciona con pilas o USB.",
    price: 22400,
    category: "lamps",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=500",
    stock: 6,
    featured: true,
  },

  // ========== BIBLIOTECA ESTELAR ==========
  {
    id: 5,
    name: "Cosmos - Carl Sagan",
    description:
      "El clásico que cambió la divulgación científica. Edición ilustrada con fotografías del Hubble. Tapa dura de colección.",
    price: 8900,
    category: "books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
    stock: 20,
    featured: true,
  },
  {
    id: 6,
    name: "Astrofísica para Apurados",
    description:
      "Neil deGrasse Tyson explica el universo en píldoras de conocimiento. Perfecto para lectores curiosos sin formación científica.",
    price: 6500,
    category: "books",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
    stock: 25,
    featured: false,
  },
  {
    id: 7,
    name: "Atlas del Cielo Nocturno",
    description:
      "Guía completa con mapas estelares mes a mes. Incluye coordenadas, magnitudes y consejos para observación amateur.",
    price: 11200,
    category: "books",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500",
    stock: 10,
    featured: false,
  },
  {
    id: 8,
    name: "El Universo en tu Mano",
    description:
      "Christophe Galfard hace accesible la física cuántica y la relatividad. Bestseller internacional con más de 1 millón de copias vendidas.",
    price: 7800,
    category: "books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
    stock: 18,
    featured: false,
  },

  // ========== OBSERVACIÓN ==========
  {
    id: 9,
    name: "Telescopio Refractor 70mm",
    description:
      "Ideal para principiantes. Apertura de 70mm, distancia focal 400mm. Incluye 2 oculares, buscador y trípode de aluminio ajustable.",
    price: 45000,
    category: "telescopes",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500",
    stock: 5,
    featured: true,
  },
  {
    id: 10,
    name: "Binoculares Astronómicos 15x70",
    description:
      "Gran apertura para observación de cielo profundo. Prismas BAK4, lentes multicapa. Incluye adaptador para trípode y estuche rígido.",
    price: 32000,
    category: "telescopes",
    image: "https://images.unsplash.com/photo-1591768575585-a50c30fcd3f5?w=500",
    stock: 7,
    featured: false,
  },
  {
    id: 11,
    name: "Telescopio Reflector 130mm",
    description:
      "Avanzado con montura ecuatorial. Apertura 130mm, focal 650mm. Perfecto para astrofotografía lunar y planetaria.",
    price: 89000,
    category: "telescopes",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500",
    stock: 3,
    featured: false,
  },
  {
    id: 12,
    name: "Filtro Lunar y Planetario",
    description:
      'Set de 5 filtros de 1.25" para reducir brillo lunar y mejorar contraste planetario. Colores: neutro, amarillo, verde, azul y rojo.',
    price: 8500,
    category: "telescopes",
    image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=500",
    stock: 15,
    featured: false,
  },

  // ========== COSMIC WEAR ==========
  {
    id: 13,
    name: "Remera NASA Vintage",
    description:
      "Algodón 100% premium. Diseño retro del logo NASA estilo años 70. Tallas: S, M, L, XL. Unisex.",
    price: 5200,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 30,
    featured: true,
  },
  {
    id: 14,
    name: "Hoodie Nebulosa",
    description:
      "Buzo canguro con capucha. Estampado all-over de la Nebulosa de Orión. Felpa interior suave. Bolsillo frontal amplio.",
    price: 12800,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    stock: 20,
    featured: false,
  },
  {
    id: 15,
    name: "Medias Planetas",
    description:
      "Pack x3 pares. Cada par representa un planeta: Marte, Júpiter y Saturno. Algodón con elastano. Talla única 38-45.",
    price: 2400,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500",
    stock: 50,
    featured: false,
  },
  {
    id: 16,
    name: "Gorra Astronauta",
    description:
      "Snapback bordado. Diseño de casco de astronauta en 3D. Visera plana, ajustable. 100% algodón.",
    price: 4500,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500",
    stock: 25,
    featured: false,
  },

  // ========== ARTE ESPACIAL ==========
  {
    id: 17,
    name: "Poster Nebulosa del Cangrejo",
    description:
      "Impresión de alta calidad del Telescopio Hubble. 50x70cm, papel fotográfico mate 250gr. Sin marco.",
    price: 3200,
    category: "posters",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500",
    stock: 40,
    featured: false,
  },
  {
    id: 18,
    name: "Mapa Estelar Personalizado",
    description:
      "El cielo de tu fecha especial impreso. Incluye coordenadas, constelaciones y mensaje personalizado. Marco negro incluido.",
    price: 6800,
    category: "posters",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500",
    stock: 100,
    featured: true,
  },
  {
    id: 19,
    name: "Set 4 Láminas Planetas",
    description:
      "Mercurio, Venus, Marte y Júpiter en ilustración minimalista. 30x40cm cada una. Papel ecológico mate.",
    price: 4900,
    category: "posters",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=500",
    stock: 35,
    featured: false,
  },
  {
    id: 20,
    name: "Poster Vintage Misiones Apollo",
    description:
      "Collage retro de las misiones Apollo 11-17. Estilo propaganda años 60. 70x100cm, laminado brillante.",
    price: 5500,
    category: "posters",
    image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500",
    stock: 22,
    featured: false,
  },
];

// Función helper para obtener productos destacados
export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

// Función helper para obtener productos por categoría
export const getProductsByCategory = (categoryId) => {
  return products.filter((product) => product.category === categoryId);
};

// Función helper para obtener un producto por ID
export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id));
};

// Función helper para obtener el nombre de la categoría
export const getCategoryName = (categoryId) => {
  const category = categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Todas las categorías";
};
