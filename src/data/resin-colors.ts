import { ResinColor } from '@/types/configurator';

export const resinColors: ResinColor[] = [
  // Standard Colors (no price modifier)
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    nameAr: 'أزرق المحيط',
    nameFr: 'Bleu Océan',
    hex: '#1E90FF',
    priceModifier: 0,
    isPremium: false,
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    nameAr: 'أخضر الغابة',
    nameFr: 'Vert Forêt',
    hex: '#228B22',
    priceModifier: 0,
    isPremium: false,
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    nameAr: 'برتقالي الغروب',
    nameFr: 'Orange Coucher de Soleil',
    hex: '#FF6B35',
    priceModifier: 0,
    isPremium: false,
  },
  {
    id: 'midnight-black',
    name: 'Midnight Black',
    nameAr: 'أسود منتصف الليل',
    nameFr: 'Noir Minuit',
    hex: '#1A1A2E',
    priceModifier: 0,
    isPremium: false,
  },
  {
    id: 'arctic-white',
    name: 'Arctic White',
    nameAr: 'أبيض قطبي',
    nameFr: 'Blanc Arctique',
    hex: '#F5F5F5',
    priceModifier: 0,
    isPremium: false,
  },
  {
    id: 'ruby-red',
    name: 'Ruby Red',
    nameAr: 'أحمر ياقوتي',
    nameFr: 'Rouge Rubis',
    hex: '#E31837',
    priceModifier: 0,
    isPremium: false,
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    nameAr: 'ضباب اللافندر',
    nameFr: 'Brume Lavande',
    hex: '#E6E6FA',
    priceModifier: 0,
    isPremium: false,
  },
  {
    id: 'teal-wave',
    name: 'Teal Wave',
    nameAr: 'موجة التيل',
    nameFr: 'Vague Sarcelle',
    hex: '#008080',
    priceModifier: 0,
    isPremium: false,
  },
  // Premium Colors (with price modifier)
  {
    id: 'galaxy-purple',
    name: 'Galaxy Purple',
    nameAr: 'بنفسجي المجرة',
    nameFr: 'Violet Galaxie',
    hex: '#4B0082',
    priceModifier: 15,
    isPremium: true,
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    nameAr: 'ذهبي وردي',
    nameFr: 'Or Rose',
    hex: '#B76E79',
    priceModifier: 20,
    isPremium: true,
  },
  {
    id: 'aurora-green',
    name: 'Aurora Green',
    nameAr: 'أخضر الشفق',
    nameFr: 'Vert Aurore',
    hex: '#50C878',
    priceModifier: 15,
    isPremium: true,
  },
  {
    id: 'copper-metallic',
    name: 'Copper Metallic',
    nameAr: 'نحاسي معدني',
    nameFr: 'Cuivre Métallique',
    hex: '#B87333',
    priceModifier: 25,
    isPremium: true,
  },
  {
    id: 'sapphire-blue',
    name: 'Sapphire Blue',
    nameAr: 'أزرق ياقوتي',
    nameFr: 'Bleu Saphir',
    hex: '#0F52BA',
    priceModifier: 20,
    isPremium: true,
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    nameAr: 'ذهبي شامبانيا',
    nameFr: 'Or Champagne',
    hex: '#F7E7CE',
    priceModifier: 25,
    isPremium: true,
  },
];

// Helper function to get color by ID
export function getColorById(id: string): ResinColor | undefined {
  return resinColors.find(color => color.id === id);
}

// Helper function to get standard colors only
export function getStandardColors(): ResinColor[] {
  return resinColors.filter(color => !color.isPremium);
}

// Helper function to get premium colors only
export function getPremiumColors(): ResinColor[] {
  return resinColors.filter(color => color.isPremium);
}

// Default color (first standard color)
export const defaultResinColor = resinColors[0];

export default resinColors;
