// Menu content. Shaped like the documents a CMS (e.g. Sanity) will deliver later:
// section → categories → items. The visual components only read these fields.

export type Photo = {
  src: string
  /** CSS object-position — keeps the subject in frame when the image is cropped. */
  position?: string
}

export type MenuItem = {
  name: string
  description?: string
  /** Price in euros. Omitted when not yet known. */
  price?: number
  /** Small label under the name, e.g. "Favoriet". */
  label?: string
}

export type Category = {
  slug: string
  title: string
  intro: string
  /** Photo used in the category list. */
  thumb: Photo
  /** Large photo at the top of the category page. Falls back to `thumb`. */
  hero?: Photo
  items: MenuItem[]
  /** Extra info shown below the items, e.g. supplements. */
  notes?: string[]
}

export type Section = {
  slug: "eten" | "drankjes"
  title: string
  intro: string
  card: Photo
  categories: Category[]
}

const photo = (name: string, position = "50% 50%"): Photo => ({
  src: `/img/photos/${name.includes(".") ? name : `${name}.png`}`,
  position,
})

export const homeHero = photo("home-hero", "50% 62%")

export const sections: Section[] = [
  {
    slug: "eten",
    title: "Eten",
    intro: "Ontdek onze verse gerechten, bereid met de beste ingrediënten.",
    card: photo("eten-card", "50% 55%"),
    categories: [
      {
        slug: "bowls",
        title: "Bowls",
        intro: "Fris, kleurrijk en vol goede ingrediënten.",
        thumb: photo("bowls.webp", "50% 55%"),
        hero: photo("bowls.webp", "50% 40%"),
        items: [
          {
            name: "Açaí Dream Bowl",
            description: "Açaí, vers fruit, crunchy granola & pindakaas",
            price: 11.5,
          },
          {
            name: "Granola Bowl",
            description: "Magere kwark, huisgemaakte granola, vers fruit & honing",
            price: 9.5,
          },
        ],
      },
      {
        slug: "croissant",
        title: "Croissant",
        intro: "Vers afgebakken, elke ochtend tot 11:00 uur.",
        thumb: photo("croissant.webp", "40% 50%"),
        hero: photo("croissant.webp", "50% 55%"),
        items: [
          { name: "Luxe Croissant Naturel", price: 3 },
          { name: "Luxe Croissant Kaas", price: 4 },
          { name: "Luxe Croissant Nutella", price: 4.5 },
          { name: "Luxe Croissant Jam", price: 3.5 },
        ],
      },
      {
        slug: "panini",
        title: "Panini",
        intro: "Knapperig gegrild en royaal belegd.",
        thumb: photo("panini.webp", "50% 40%"),
        hero: photo("panini.webp", "50% 50%"),
        items: [
          { name: "Panini met Pittige Kip", price: 8 },
          { name: "Panini Pesto, Mozzarella & Tomaat", price: 7.5 },
          { name: "Panini Kaas", price: 7 },
        ],
      },
      {
        slug: "op-toast",
        title: "Op Toast",
        intro: "Geserveerd op een zuurdesembrood.",
        thumb: photo("op-toast.webp", "50% 50%"),
        hero: photo("op-toast.webp", "50% 45%"),
        items: [
          {
            name: "Toast met Gerookte Zalm",
            description: "Gerookte zalm, avocado, roomkaas, rucola & honingmosterdsaus",
            price: 12.5,
          },
          {
            name: "Toast Roerei en Avocado",
            description: "Roerei, avocado, feta, tomaat, rucola & bietenhummus",
            price: 11.5,
          },
          {
            name: "Toast Carpaccio",
            description: "Rucola, Parmezaanse kaas, pijnboompitten & truffelmayo",
            price: 13,
          },
          {
            name: "Toast Tunacomo",
            description: "Tonijn, jalapeños & gesmolten cheddar",
            price: 11,
          },
        ],
      },
      {
        slug: "pastas",
        title: "Pasta’s",
        intro: "Keuze uit roomsaus of tomatensaus.",
        thumb: photo("pastas.webp", "50% 50%"),
        hero: photo("pastas.webp", "50% 50%"),
        items: [
          { name: "Penne Scampi", price: 15.5 },
          { name: "Penne Chicken Royal", price: 14 },
        ],
      },
      {
        slug: "pancakes",
        title: "Pancake’s",
        intro: "Luchtige pancakes met verse ingrediënten.",
        thumb: photo("pancakes.webp", "50% 50%"),
        hero: photo("pancakes-hero.webp", "50% 40%"),
        items: [
          {
            name: "Pancake Nutella",
            description: "Nutella, vers fruit & poedersuiker",
            price: 13,
          },
          {
            name: "Como’s Speculoos Pancake",
            description: "Lotus speculoos, vers fruit & koek crumbs",
            price: 14,
          },
          {
            name: "Pancake Maple",
            description: "Maple siroop, vers fruit & poedersuiker",
            price: 12,
          },
        ],
        notes: ["+ Bolletje vanille-ijs € 1,50"],
      },
      {
        slug: "crepes",
        title: "Crêpes",
        intro: "Dun, goudbruin en rijk gevuld.",
        thumb: photo("crepes.webp", "50% 50%"),
        hero: photo("crepes.webp", "50% 40%"),
        items: [
          { name: "Crêpe Nutella", description: "Nutella", price: 9 },
          { name: "Crêpe White Chocola, Aardbei & Banaan", price: 11 },
          { name: "Crêpe Dubai", label: "Favoriet", price: 13.75 },
        ],
        notes: ["+ Bolletje vanille-ijs € 1,50"],
      },
      {
        slug: "churros",
        title: "Churros",
        intro: "Krokant van buiten, zacht van binnen.",
        thumb: photo("churros", "40% 50%"),
        items: [
          { name: "Churros Kaneelsuiker", price: 8 },
          { name: "Churros Nutella", price: 9.5 },
          { name: "Churros White Chocola", price: 9.5 },
        ],
        notes: ["+ Extra Nutella € 1,50"],
      },
    ],
  },
  {
    slug: "drankjes",
    title: "Drankjes",
    intro: "Van verse koffie tot verfrissende smoothies en mocktails.",
    card: photo("drankjes-card", "50% 60%"),
    categories: [
      {
        slug: "smoothies",
        title: "Smoothies",
        intro: "Reset your mind — vers geblend met echt fruit.",
        thumb: photo("smoothies.webp", "50% 40%"),
        hero: photo("smoothies.webp", "50% 35%"),
        items: [
          { name: "Smoothie Strawberry Banaan", price: 6.5 },
          {
            name: "Smoothie Exotic Mix",
            description: "Papaya, mango, ananas & meloen",
            price: 7.5,
          },
          {
            name: "Smoothie Berry Mix",
            description: "Zwarte bessen, rode bessen, blauwe bessen & bramen",
            price: 7.5,
          },
          { name: "Smoothie Blueberry", price: 7 },
          { name: "Smoothie Sour Cherries", price: 7 },
        ],
      },
      {
        slug: "mocktails",
        title: "Mocktails",
        intro: "Verfrissend, kleurrijk en alcoholvrij.",
        thumb: photo("mocktails.webp", "50% 40%"),
        hero: photo("mocktails.webp", "50% 35%"),
        items: [
          { name: "Mocktail Mojito", price: 7 },
          { name: "Mocktail Strawberry", price: 7 },
          {
            name: "Mocktail Tropical",
            description: "Passievruchtsap, Tropical Red Bull, munt & limoen",
            price: 8,
          },
        ],
      },
      {
        slug: "matcha-lattes",
        title: "Matcha Latte’s",
        intro: "Romige matcha, ijskoud geserveerd.",
        thumb: photo("matcha.webp", "50% 45%"),
        hero: photo("matcha.webp", "50% 45%"),
        items: [
          { name: "Iced Matcha Latte", price: 6.5 },
          { name: "Iced Matcha Strawberry", price: 7 },
          { name: "Iced Matcha Mango", price: 7 },
          { name: "Iced Matcha Passionfruit", price: 7 },
          { name: "Iced Matcha White Chocola", price: 7 },
        ],
        notes: [
          "Melk naar keuze: soja, kokos, haver, amandel, vanille of koemelk",
          "Siroop naar keuze + € 0,50",
        ],
      },
      {
        slug: "iced-coffee",
        title: "Iced Coffee",
        intro: "Onze espresso, koud en verfrissend.",
        thumb: photo("iced-coffee.webp", "50% 45%"),
        hero: photo("iced-coffee.webp", "50% 40%"),
        items: [
          { name: "Iced Latte", price: 6 },
          { name: "Iced Caramel Latte", price: 6.5 },
          { name: "Iced Vanilla Latte", price: 6.5 },
          { name: "Iced White Chocola", price: 7 },
        ],
        notes: ["Siroop naar keuze + € 0,50"],
      },
      {
        slug: "warme-dranken",
        title: "Warme Dranken",
        intro: "Van espresso tot verse muntthee.",
        thumb: photo("warme-dranken", "50% 50%"),
        // Prices not yet supplied — rows render without a price until they are.
        items: [
          { name: "Espresso" },
          { name: "Espresso Doppio" },
          { name: "Koffie" },
          { name: "Cappuccino" },
          { name: "Latte Macchiato" },
          { name: "Thee" },
          { name: "Verse Muntthee" },
          { name: "Marokkaanse Thee", description: "Kleine theepot" },
          { name: "Marokkaanse Thee To Go" },
          { name: "Verse Gemberthee" },
          { name: "Warme Chocolademelk" },
        ],
      },
      {
        slug: "koude-dranken",
        title: "Koude Dranken",
        intro: "Frisdranken, sappen en meer.",
        thumb: photo("koude-dranken", "50% 45%"),
        items: [
          { name: "Coca-Cola / Coca-Cola Zero", price: 3.25 },
          { name: "Fanta", price: 3.25 },
          { name: "Ice Tea", description: "Green of peach", price: 3.25 },
          { name: "Spa Blauw / Spa Rood", price: 3.25 },
          { name: "Ginger Ale", price: 3.25 },
          { name: "Sprite", price: 3.25 },
          { name: "Cassis", price: 3.25 },
          { name: "Bitter Lemon", price: 3.25 },
          { name: "Appelsap", price: 3.4 },
          { name: "Chocomel / Fristi", price: 3.5 },
          { name: "Red Bull", description: "Ook verkrijgbaar als light", price: 3.5 },
        ],
      },
    ],
  },
]

export const findSection = (slug: string) => sections.find((s) => s.slug === slug)

export const findCategory = (sectionSlug: string, categorySlug: string) =>
  findSection(sectionSlug)?.categories.find((c) => c.slug === categorySlug)
