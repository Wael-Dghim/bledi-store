import {
  ProductConfiguration,
  PriceBreakdown,
  ResinConfig,
  RESIN_RATIO_MODIFIERS,
  PERSONALIZATION_FEE,
  EMPTY_PRICE_BREAKDOWN,
} from '@/types/configurator';

/**
 * Get price modifier based on resin ratio
 */
export function getResinPriceModifier(resin: ResinConfig | null): number {
  if (!resin) return 0;
  return RESIN_RATIO_MODIFIERS[resin.ratio] || 0;
}

/**
 * Calculate the complete price breakdown for a configuration
 */
export function calculateConfiguredPrice(config: ProductConfiguration): PriceBreakdown {
  // If no template selected, return empty breakdown
  if (!config.template) {
    return EMPTY_PRICE_BREAKDOWN;
  }

  const basePrice = config.template.basePrice;
  const sizeModifier = config.selectedSize?.priceModifier ?? 0;
  const resinModifier = getResinPriceModifier(config.resin);
  const colorModifier = config.resin?.color?.priceModifier ?? 0;
  const personalizationFee = config.personalization?.text ? PERSONALIZATION_FEE : 0;

  const total = basePrice + sizeModifier + resinModifier + colorModifier + personalizationFee;

  return {
    basePrice,
    sizeModifier,
    resinModifier,
    colorModifier,
    personalizationFee,
    total,
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = '$'): string {
  return `${currency}${price.toFixed(2)}`;
}

/**
 * Check if configuration is complete and ready for cart
 */
export function isConfigurationComplete(config: ProductConfiguration): boolean {
  return (
    config.template !== null &&
    config.selectedSize !== null &&
    config.resin !== null &&
    config.confirmedVariation === true
  );
}

/**
 * Validate personalization text
 */
export function validatePersonalizationText(text: string): { valid: boolean; error?: string } {
  if (text.length === 0) {
    return { valid: true }; // Empty is valid (personalization is optional)
  }

  if (text.length > 50) {
    return { valid: false, error: 'Text must be 50 characters or less' };
  }

  // Allow letters, numbers, spaces, and common punctuation
  const validPattern = /^[a-zA-Z0-9\s\-'.,!?&]+$/;
  if (!validPattern.test(text)) {
    return { valid: false, error: 'Only letters, numbers, and basic punctuation allowed' };
  }

  return { valid: true };
}

export default {
  calculateConfiguredPrice,
  formatPrice,
  isConfigurationComplete,
  validatePersonalizationText,
  getResinPriceModifier,
};
