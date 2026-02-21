'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { getStandardColors, getPremiumColors } from '@/data/resin-colors';
import { ResinColor, ResinTransparency } from '@/types/configurator';
import styles from '../configurator.module.css';

interface ColorPaletteStepProps {
  locale?: string;
}

const transparencyOptions: { value: ResinTransparency; label: { en: string; ar: string; fr: string }; opacity: number }[] = [
  { value: 'opaque', label: { en: 'Opaque', ar: 'معتم', fr: 'Opaque' }, opacity: 0.9 },
  { value: 'translucent', label: { en: 'Translucent', ar: 'شبه شفاف', fr: 'Translucide' }, opacity: 0.6 },
  { value: 'transparent', label: { en: 'Transparent', ar: 'شفاف', fr: 'Transparent' }, opacity: 0.3 },
];

export function ColorPaletteStep({ locale = 'en' }: ColorPaletteStepProps) {
  const { state, setResinColor, setResinTransparency } = useConfigurator();
  const currentColorId = state.configuration.resin?.color?.id;
  const currentTransparency = state.configuration.resin?.transparency || 'translucent';

  const standardColors = getStandardColors();
  const premiumColors = getPremiumColors();

  const getColorName = (color: ResinColor) => {
    if (locale === 'ar') return color.nameAr;
    if (locale === 'fr') return color.nameFr;
    return color.name;
  };

  const getTransparencyLabel = (option: typeof transparencyOptions[0]) => {
    if (locale === 'ar') return option.label.ar;
    if (locale === 'fr') return option.label.fr;
    return option.label.en;
  };

  return (
    <div className={styles.colorPaletteStep}>
      <p className={styles.stepDescription}>
        {locale === 'ar'
          ? 'اختر لون الراتنج المثالي لقطعتك. الألوان المميزة تضيف تأثيرات خاصة مثل اللمعان المعدني.'
          : locale === 'fr'
          ? 'Choisissez la couleur de résine parfaite pour votre pièce. Les couleurs premium ajoutent des effets spéciaux comme une brillance métallique.'
          : 'Choose the perfect resin color for your piece. Premium colors add special effects like metallic shimmer.'}
      </p>

      {/* Standard Colors */}
      <div className={styles.colorSection}>
        <h4 className={styles.sectionTitle}>
          {locale === 'ar' ? 'الألوان القياسية' : locale === 'fr' ? 'Couleurs Standard' : 'Standard Colors'}
        </h4>
        <div className={styles.colorsGrid}>
          {standardColors.map((color, index) => (
            <motion.button
              key={color.id}
              className={`${styles.colorSwatch} ${currentColorId === color.id ? styles.selected : ''}`}
              onClick={() => setResinColor(color.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: color.hex }}
              title={getColorName(color)}
            >
              {currentColorId === color.id && (
                <motion.div
                  className={styles.swatchCheck}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Premium Colors */}
      <div className={`${styles.colorSection} ${styles.premiumSection}`}>
        <h4 className={styles.sectionTitle}>
          <span>{locale === 'ar' ? 'الألوان المميزة' : locale === 'fr' ? 'Couleurs Premium' : 'Premium Colors'}</span>
          <span className={styles.premiumBadge}>
            {locale === 'ar' ? 'مميز' : locale === 'fr' ? 'Premium' : 'Premium'}
          </span>
        </h4>
        <div className={styles.colorsGrid}>
          {premiumColors.map((color, index) => (
            <motion.button
              key={color.id}
              className={`${styles.colorSwatch} ${styles.premium} ${currentColorId === color.id ? styles.selected : ''}`}
              onClick={() => setResinColor(color.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: color.hex }}
              title={`${getColorName(color)} (+$${color.priceModifier})`}
            >
              <span className={styles.premiumPrice}>+${color.priceModifier}</span>
              {currentColorId === color.id && (
                <motion.div
                  className={styles.swatchCheck}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Color Display */}
      {state.configuration.resin?.color && (
        <motion.div
          className={styles.selectedColorDisplay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className={styles.selectedColorPreview}
            style={{ backgroundColor: state.configuration.resin.color.hex }}
          />
          <div className={styles.selectedColorInfo}>
            <span className={styles.selectedColorName}>
              {getColorName(state.configuration.resin.color)}
            </span>
            <span className={styles.selectedColorHex}>
              {state.configuration.resin.color.hex}
            </span>
          </div>
        </motion.div>
      )}

      {/* Transparency Options */}
      <div className={styles.transparencySection}>
        <h4 className={styles.sectionTitle}>
          {locale === 'ar' ? 'مستوى الشفافية' : locale === 'fr' ? 'Niveau de Transparence' : 'Transparency Level'}
        </h4>
        <div className={styles.transparencyOptions}>
          {transparencyOptions.map((option) => (
            <motion.button
              key={option.value}
              className={`${styles.transparencyOption} ${currentTransparency === option.value ? styles.selected : ''}`}
              onClick={() => setResinTransparency(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={styles.transparencyPreview}
                style={{
                  backgroundColor: state.configuration.resin?.color?.hex || '#1E90FF',
                  opacity: option.opacity,
                }}
              />
              <span className={styles.transparencyLabel}>{getTransparencyLabel(option)}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorPaletteStep;
