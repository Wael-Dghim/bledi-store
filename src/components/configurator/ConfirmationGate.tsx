'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { useCart, ConfigurationMeta } from '@/context/CartContext';
import { formatPrice } from '@/lib/pricing';
import styles from './configurator.module.css';

interface ConfirmationGateProps {
  locale?: string;
}

export function ConfirmationGate({ locale = 'en' }: ConfirmationGateProps) {
  const { state, setConfirmedVariation, resetConfiguration } = useConfigurator();
  const { addConfiguredItem } = useCart();
  const { configuration, calculatedPrice, isComplete } = state;
  const { confirmedVariation } = configuration;
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedVariation(e.target.checked);
  };

  const handleAddToCart = () => {
    if (!isComplete || !configuration.template || !configuration.selectedSize || !configuration.resin) return;

    // Build configuration metadata
    const configMeta: ConfigurationMeta = {
      templateId: configuration.template.id,
      sizeId: configuration.selectedSize.id,
      sizeLabel: locale === 'ar'
        ? configuration.selectedSize.labelAr
        : locale === 'fr'
        ? configuration.selectedSize.labelFr
        : configuration.selectedSize.label,
      resinColor: locale === 'ar'
        ? configuration.resin.color.nameAr
        : locale === 'fr'
        ? configuration.resin.color.nameFr
        : configuration.resin.color.name,
      resinColorHex: configuration.resin.color.hex,
      resinRatio: configuration.resin.ratio,
      resinTransparency: configuration.resin.transparency,
      personalizationText: configuration.personalization?.text,
      personalizationFont: configuration.personalization?.fontFamily,
    };

    // Create cart item from configuration
    addConfiguredItem({
      name: locale === 'ar'
        ? configuration.template.nameAr
        : locale === 'fr'
        ? configuration.template.nameFr
        : configuration.template.name,
      price: calculatedPrice,
      image: configuration.template.representativeImages[0]?.md || '',
      isConfigured: true,
      configuration: configMeta,
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      resetConfiguration();
    }, 2000);
  };

  const confirmationText = {
    en: 'I understand that wood grain is natural and the final piece will vary from this digital preview.',
    ar: 'أفهم أن حبيبات الخشب طبيعية وأن القطعة النهائية ستختلف عن هذه المعاينة الرقمية.',
    fr: 'Je comprends que le grain du bois est naturel et que la pièce finale variera de cet aperçu numérique.',
  };

  const buttonText = {
    en: 'Add to Cart',
    ar: 'أضف إلى السلة',
    fr: 'Ajouter au Panier',
  };

  const successText = {
    en: 'Added to cart!',
    ar: 'تمت الإضافة إلى السلة!',
    fr: 'Ajouté au panier!',
  };

  const getText = (texts: typeof confirmationText) => {
    if (locale === 'ar') return texts.ar;
    if (locale === 'fr') return texts.fr;
    return texts.en;
  };

  return (
    <div className={styles.confirmationGate}>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className={styles.successMessage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>{getText(successText)}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={confirmedVariation}
          onChange={handleCheckboxChange}
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxCustom}>
          {confirmedVariation && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </span>
        <span className={styles.checkboxLabel}>{getText(confirmationText)}</span>
      </label>

      <motion.button
        className={`${styles.addToCartBtn} ${isComplete ? styles.enabled : styles.disabled} ${showSuccess ? styles.success : ''}`}
        onClick={handleAddToCart}
        disabled={!isComplete || showSuccess}
        whileHover={isComplete && !showSuccess ? { scale: 1.02 } : undefined}
        whileTap={isComplete && !showSuccess ? { scale: 0.98 } : undefined}
      >
        <span className={styles.btnText}>{showSuccess ? getText(successText) : getText(buttonText)}</span>
        {!showSuccess && <span className={styles.btnPrice}>{formatPrice(calculatedPrice)}</span>}
      </motion.button>
    </div>
  );
}

export default ConfirmationGate;
