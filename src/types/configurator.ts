// Wood & Resin Product Configurator Types

// Wood types available
export type WoodType = 'olive-burl' | 'olive-live-edge' | 'olive-root' | 'olive-classic';

// Product categories
export type ProductCategory = 'serving-board' | 'coaster' | 'table' | 'clock' | 'tray';

// Resin coverage levels
export type ResinRatio = 'low' | 'medium' | 'high';

// Resin transparency options
export type ResinTransparency = 'opaque' | 'translucent' | 'transparent';

// Font size options
export type FontSize = 'small' | 'medium' | 'large';

// Text position options
export type TextPosition = 'center' | 'bottom-right' | 'top-left' | 'bottom-left';

// Product size with dimensions and pricing
export interface ProductSize {
  id: string;
  label: string;
  labelAr: string;
  labelFr: string;
  dimensions: {
    width: number;
    height: number;
    thickness: number;
  };
  priceModifier: number;
  stock: number;
}

// Responsive image set
export interface ImageSet {
  sm: string;
  md: string;
  lg: string;
}

// Template-based product (representative sample)
export interface WoodTemplate {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  woodType: WoodType;
  category: ProductCategory;
  sizes: ProductSize[];
  representativeImages: ImageSet[];
  basePrice: number;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
  grainNote: string;
  grainNoteAr: string;
  grainNoteFr: string;
}

// Resin color preset
export interface ResinColor {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  hex: string;
  priceModifier: number;
  isPremium: boolean;
}

// Resin configuration
export interface ResinConfig {
  ratio: ResinRatio;
  color: ResinColor;
  transparency: ResinTransparency;
}

// Font option for personalization
export interface FontOption {
  id: string;
  name: string;
  family: string;
  googleFontUrl: string;
  previewText: string;
}

// Personalization configuration
export interface Personalization {
  text: string;
  fontFamily: string;
  fontSize: FontSize;
  position: TextPosition;
}

// Complete product configuration
export interface ProductConfiguration {
  template: WoodTemplate | null;
  selectedSize: ProductSize | null;
  resin: ResinConfig | null;
  personalization: Personalization | null;
  confirmedVariation: boolean;
}

// Price breakdown for display
export interface PriceBreakdown {
  basePrice: number;
  sizeModifier: number;
  resinModifier: number;
  colorModifier: number;
  personalizationFee: number;
  total: number;
}

// Configured item ready for cart
export interface ConfiguredCartItem {
  id: string;
  templateId: string;
  templateName: string;
  sizeId: string;
  sizeLabel: string;
  configuration: ProductConfiguration;
  calculatedPrice: number;
  priceBreakdown: PriceBreakdown;
  previewImageUrl: string;
  resinColorName: string;
  resinColorHex: string;
  personalizationText: string | null;
}

// Configurator step numbers
export type ConfiguratorStep = 1 | 2 | 3 | 4;

// Step information for progress display
export interface StepInfo {
  number: ConfiguratorStep;
  title: string;
  titleAr: string;
  titleFr: string;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
}

// Configurator state
export interface ConfiguratorState {
  currentStep: ConfiguratorStep;
  configuration: ProductConfiguration;
  availableTemplates: WoodTemplate[];
  selectedTemplateId: string | null;
  selectedSizeId: string | null;
  calculatedPrice: number;
  priceBreakdown: PriceBreakdown | null;
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
}

// Default resin configuration
export const DEFAULT_RESIN_CONFIG: Omit<ResinConfig, 'color'> = {
  ratio: 'medium',
  transparency: 'translucent',
};

// Default empty price breakdown
export const EMPTY_PRICE_BREAKDOWN: PriceBreakdown = {
  basePrice: 0,
  sizeModifier: 0,
  resinModifier: 0,
  colorModifier: 0,
  personalizationFee: 0,
  total: 0,
};

// Personalization fee constant
export const PERSONALIZATION_FEE = 25;

// Resin ratio price modifiers
export const RESIN_RATIO_MODIFIERS: Record<ResinRatio, number> = {
  low: 0,
  medium: 15,
  high: 30,
};

// Resin ratio coverage percentages (for display)
export const RESIN_RATIO_PERCENTAGES: Record<ResinRatio, number> = {
  low: 20,
  medium: 40,
  high: 60,
};
