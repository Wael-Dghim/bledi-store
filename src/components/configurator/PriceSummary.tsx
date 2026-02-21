'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { formatPrice } from '@/lib/pricing';
import styles from './configurator.module.css';

interface PriceSummaryProps {
  locale?: string;
}

export function PriceSummary({ locale = 'en' }: PriceSummaryProps) {
  const { state } = useConfigurator();
  const { priceBreakdown, calculatedPrice } = state;

  const labels = {
    basePrice: { en: 'Base Price', ar: 'السعر الأساسي', fr: 'Prix de Base' },
    size: { en: 'Size', ar: 'الحجم', fr: 'Taille' },
    resinCoverage: { en: 'Resin Coverage', ar: 'تغطية الراتنج', fr: 'Couverture Résine' },
    premiumColor: { en: 'Premium Color', ar: 'لون مميز', fr: 'Couleur Premium' },
    personalization: { en: 'Personalization', ar: 'التخصيص', fr: 'Personnalisation' },
    total: { en: 'Total', ar: 'المجموع', fr: 'Total' },
    included: { en: 'Included', ar: 'مشمول', fr: 'Inclus' },
  };

  const getLabel = (key: keyof typeof labels) => {
    if (locale === 'ar') return labels[key].ar;
    if (locale === 'fr') return labels[key].fr;
    return labels[key].en;
  };

  if (!priceBreakdown) {
    return (
      <div className={`${styles.priceSummary} ${styles.empty}`}>
        <p className={styles.emptyMessage}>
          {locale === 'ar'
            ? 'اختر منتجاً لرؤية السعر'
            : locale === 'fr'
            ? 'Sélectionnez un produit pour voir le prix'
            : 'Select a product to see pricing'}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.priceSummary}>
      <h3 className={styles.priceSummaryTitle}>
        {locale === 'ar' ? 'ملخص السعر' : locale === 'fr' ? 'Résumé du Prix' : 'Price Summary'}
      </h3>

      <div className={styles.priceLines}>
        <motion.div
          className={styles.priceLine}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.lineLabel}>{getLabel('basePrice')}</span>
          <span className={styles.lineValue}>{formatPrice(priceBreakdown.basePrice)}</span>
        </motion.div>

        <AnimatePresence>
          {priceBreakdown.sizeModifier > 0 && (
            <motion.div
              className={styles.priceLine}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className={styles.lineLabel}>{getLabel('size')}</span>
              <span className={`${styles.lineValue} ${styles.modifier}`}>+{formatPrice(priceBreakdown.sizeModifier)}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={styles.priceLine}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className={styles.lineLabel}>{getLabel('resinCoverage')}</span>
          <span className={`${styles.lineValue} ${priceBreakdown.resinModifier > 0 ? styles.modifier : styles.included}`}>
            {priceBreakdown.resinModifier > 0
              ? `+${formatPrice(priceBreakdown.resinModifier)}`
              : getLabel('included')}
          </span>
        </motion.div>

        <AnimatePresence>
          {priceBreakdown.colorModifier > 0 && (
            <motion.div
              className={styles.priceLine}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className={styles.lineLabel}>{getLabel('premiumColor')}</span>
              <span className={`${styles.lineValue} ${styles.modifier}`}>+{formatPrice(priceBreakdown.colorModifier)}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {priceBreakdown.personalizationFee > 0 && (
            <motion.div
              className={styles.priceLine}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className={styles.lineLabel}>{getLabel('personalization')}</span>
              <span className={`${styles.lineValue} ${styles.modifier}`}>+{formatPrice(priceBreakdown.personalizationFee)}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className={styles.priceTotal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={calculatedPrice}
      >
        <span className={styles.totalLabel}>{getLabel('total')}</span>
        <motion.span
          className={styles.totalValue}
          key={calculatedPrice}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {formatPrice(calculatedPrice)}
        </motion.span>
      </motion.div>
    </div>
  );
}

export default PriceSummary;
