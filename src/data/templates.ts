import { WoodTemplate } from '@/types/configurator';

// Placeholder images - replace with actual product photography
const PLACEHOLDER_IMAGES = {
  oliveBurl: {
    sm: '/images/products/olive-burl-sm.jpg',
    md: '/images/products/olive-burl-md.jpg',
    lg: '/images/products/olive-burl-lg.jpg',
  },
  oliveLiveEdge: {
    sm: '/images/products/olive-live-edge-sm.jpg',
    md: '/images/products/olive-live-edge-md.jpg',
    lg: '/images/products/olive-live-edge-lg.jpg',
  },
  oliveRoot: {
    sm: '/images/products/olive-root-sm.jpg',
    md: '/images/products/olive-root-md.jpg',
    lg: '/images/products/olive-root-lg.jpg',
  },
  oliveClassic: {
    sm: '/images/products/olive-classic-sm.jpg',
    md: '/images/products/olive-classic-md.jpg',
    lg: '/images/products/olive-classic-lg.jpg',
  },
};

export const woodTemplates: WoodTemplate[] = [
  // Serving Boards
  {
    id: 'olive-burl-serving',
    name: 'Olive Burl Serving Board',
    nameAr: 'لوح تقديم خشب الزيتون المعرج',
    nameFr: 'Planche de Service en Loupe d\'Olivier',
    woodType: 'olive-burl',
    category: 'serving-board',
    sizes: [
      {
        id: 'small',
        label: 'Small (25×15cm)',
        labelAr: 'صغير (25×15 سم)',
        labelFr: 'Petit (25×15cm)',
        dimensions: { width: 25, height: 15, thickness: 2 },
        priceModifier: 0,
        stock: 15,
      },
      {
        id: 'medium',
        label: 'Medium (35×20cm)',
        labelAr: 'متوسط (35×20 سم)',
        labelFr: 'Moyen (35×20cm)',
        dimensions: { width: 35, height: 20, thickness: 2.5 },
        priceModifier: 35,
        stock: 12,
      },
      {
        id: 'large',
        label: 'Large (45×25cm)',
        labelAr: 'كبير (45×25 سم)',
        labelFr: 'Grand (45×25cm)',
        dimensions: { width: 45, height: 25, thickness: 3 },
        priceModifier: 70,
        stock: 8,
      },
    ],
    representativeImages: [PLACEHOLDER_IMAGES.oliveBurl],
    basePrice: 89,
    description: 'Stunning burl patterns with natural swirls and knots. Each piece showcases the unique character of olive wood.',
    descriptionAr: 'أنماط معرجة مذهلة مع دوامات وعقد طبيعية. كل قطعة تعرض الطابع الفريد لخشب الزيتون.',
    descriptionFr: 'Motifs de loupe époustouflants avec des tourbillons et des nœuds naturels. Chaque pièce met en valeur le caractère unique du bois d\'olivier.',
    grainNote: 'Wood grain patterns are natural and will vary from the preview.',
    grainNoteAr: 'أنماط حبيبات الخشب طبيعية وستختلف عن المعاينة.',
    grainNoteFr: 'Les motifs du grain du bois sont naturels et varieront de l\'aperçu.',
  },
  {
    id: 'olive-live-edge-serving',
    name: 'Live Edge Serving Board',
    nameAr: 'لوح تقديم بحافة طبيعية',
    nameFr: 'Planche de Service Bord Naturel',
    woodType: 'olive-live-edge',
    category: 'serving-board',
    sizes: [
      {
        id: 'small',
        label: 'Small (30×18cm)',
        labelAr: 'صغير (30×18 سم)',
        labelFr: 'Petit (30×18cm)',
        dimensions: { width: 30, height: 18, thickness: 2.5 },
        priceModifier: 0,
        stock: 10,
      },
      {
        id: 'medium',
        label: 'Medium (40×22cm)',
        labelAr: 'متوسط (40×22 سم)',
        labelFr: 'Moyen (40×22cm)',
        dimensions: { width: 40, height: 22, thickness: 3 },
        priceModifier: 45,
        stock: 8,
      },
      {
        id: 'large',
        label: 'Large (50×28cm)',
        labelAr: 'كبير (50×28 سم)',
        labelFr: 'Grand (50×28cm)',
        dimensions: { width: 50, height: 28, thickness: 3.5 },
        priceModifier: 90,
        stock: 5,
      },
    ],
    representativeImages: [PLACEHOLDER_IMAGES.oliveLiveEdge],
    basePrice: 119,
    description: 'Natural bark edge preserved for an organic, rustic aesthetic. Perfect for charcuterie and cheese boards.',
    descriptionAr: 'حافة اللحاء الطبيعية محفوظة لجمالية عضوية وريفية. مثالية لألواح اللحوم المقددة والجبن.',
    descriptionFr: 'Bord d\'écorce naturel préservé pour une esthétique organique et rustique. Parfait pour les planches de charcuterie et de fromages.',
    grainNote: 'Each live edge piece has a unique natural contour.',
    grainNoteAr: 'كل قطعة بحافة طبيعية لها محيط طبيعي فريد.',
    grainNoteFr: 'Chaque pièce à bord naturel a un contour naturel unique.',
  },
  // Coasters
  {
    id: 'olive-classic-coaster',
    name: 'Classic Olive Coaster Set',
    nameAr: 'مجموعة قواعد أكواب زيتون كلاسيكية',
    nameFr: 'Set de Sous-verres Olivier Classique',
    woodType: 'olive-classic',
    category: 'coaster',
    sizes: [
      {
        id: 'set-4',
        label: 'Set of 4',
        labelAr: 'مجموعة من 4',
        labelFr: 'Lot de 4',
        dimensions: { width: 10, height: 10, thickness: 1 },
        priceModifier: 0,
        stock: 25,
      },
      {
        id: 'set-6',
        label: 'Set of 6',
        labelAr: 'مجموعة من 6',
        labelFr: 'Lot de 6',
        dimensions: { width: 10, height: 10, thickness: 1 },
        priceModifier: 20,
        stock: 18,
      },
    ],
    representativeImages: [PLACEHOLDER_IMAGES.oliveClassic],
    basePrice: 45,
    description: 'Elegant round coasters with refined grain patterns. Protects surfaces while adding natural warmth.',
    descriptionAr: 'قواعد أكواب دائرية أنيقة مع أنماط حبيبات مصقولة. تحمي الأسطح مع إضافة دفء طبيعي.',
    descriptionFr: 'Sous-verres ronds élégants avec des motifs de grain raffinés. Protège les surfaces tout en ajoutant une chaleur naturelle.',
    grainNote: 'Grain patterns vary naturally between coasters in the set.',
    grainNoteAr: 'تختلف أنماط الحبيبات طبيعياً بين القواعد في المجموعة.',
    grainNoteFr: 'Les motifs du grain varient naturellement entre les sous-verres du lot.',
  },
  // Wall Clocks
  {
    id: 'olive-root-clock',
    name: 'Root Wood Wall Clock',
    nameAr: 'ساعة حائط من خشب الجذر',
    nameFr: 'Horloge Murale Bois de Racine',
    woodType: 'olive-root',
    category: 'clock',
    sizes: [
      {
        id: 'medium',
        label: 'Medium (30cm diameter)',
        labelAr: 'متوسط (قطر 30 سم)',
        labelFr: 'Moyen (30cm diamètre)',
        dimensions: { width: 30, height: 30, thickness: 3 },
        priceModifier: 0,
        stock: 6,
      },
      {
        id: 'large',
        label: 'Large (40cm diameter)',
        labelAr: 'كبير (قطر 40 سم)',
        labelFr: 'Grand (40cm diamètre)',
        dimensions: { width: 40, height: 40, thickness: 4 },
        priceModifier: 60,
        stock: 4,
      },
    ],
    representativeImages: [PLACEHOLDER_IMAGES.oliveRoot],
    basePrice: 149,
    description: 'Dramatic root wood patterns create a striking centerpiece. Silent quartz movement included.',
    descriptionAr: 'أنماط خشب الجذر الدراماتيكية تخلق قطعة مركزية مذهلة. تشمل حركة كوارتز صامتة.',
    descriptionFr: 'Les motifs dramatiques du bois de racine créent une pièce maîtresse saisissante. Mouvement quartz silencieux inclus.',
    grainNote: 'Root patterns are highly unique - expect dramatic variations.',
    grainNoteAr: 'أنماط الجذور فريدة للغاية - توقع اختلافات دراماتيكية.',
    grainNoteFr: 'Les motifs de racine sont très uniques - attendez-vous à des variations dramatiques.',
  },
  // Decorative Trays
  {
    id: 'olive-burl-tray',
    name: 'Burl Wood Decorative Tray',
    nameAr: 'صينية ديكور من خشب معرج',
    nameFr: 'Plateau Décoratif en Loupe',
    woodType: 'olive-burl',
    category: 'tray',
    sizes: [
      {
        id: 'small',
        label: 'Small (25×18cm)',
        labelAr: 'صغير (25×18 سم)',
        labelFr: 'Petit (25×18cm)',
        dimensions: { width: 25, height: 18, thickness: 3 },
        priceModifier: 0,
        stock: 10,
      },
      {
        id: 'medium',
        label: 'Medium (35×25cm)',
        labelAr: 'متوسط (35×25 سم)',
        labelFr: 'Moyen (35×25cm)',
        dimensions: { width: 35, height: 25, thickness: 3.5 },
        priceModifier: 50,
        stock: 7,
      },
      {
        id: 'large',
        label: 'Large (45×30cm)',
        labelAr: 'كبير (45×30 سم)',
        labelFr: 'Grand (45×30cm)',
        dimensions: { width: 45, height: 30, thickness: 4 },
        priceModifier: 95,
        stock: 4,
      },
    ],
    representativeImages: [PLACEHOLDER_IMAGES.oliveBurl],
    basePrice: 129,
    description: 'Elegant serving tray with raised edges and handles. Combines functionality with artistic beauty.',
    descriptionAr: 'صينية تقديم أنيقة بحواف مرتفعة ومقابض. تجمع بين الوظيفة والجمال الفني.',
    descriptionFr: 'Plateau de service élégant avec bords surélevés et poignées. Combine fonctionnalité et beauté artistique.',
    grainNote: 'Burl patterns create unique artistic swirls in each piece.',
    grainNoteAr: 'أنماط الخشب المعرج تخلق دوامات فنية فريدة في كل قطعة.',
    grainNoteFr: 'Les motifs de loupe créent des tourbillons artistiques uniques dans chaque pièce.',
  },
];

// Helper function to get template by ID
export function getTemplateById(id: string): WoodTemplate | undefined {
  return woodTemplates.find(template => template.id === id);
}

// Helper function to get templates by category
export function getTemplatesByCategory(category: string): WoodTemplate[] {
  return woodTemplates.filter(template => template.category === category);
}

// Helper function to get templates by wood type
export function getTemplatesByWoodType(woodType: string): WoodTemplate[] {
  return woodTemplates.filter(template => template.woodType === woodType);
}

// Alias for convenience
export const templates = woodTemplates;

export default woodTemplates;
