'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { ResinRatio, RESIN_RATIO_PERCENTAGES, RESIN_RATIO_MODIFIERS } from '@/types/configurator';
import styles from '../configurator.module.css';

interface ResinRatioStepProps {
  locale?: string;
}

const ratioOptions: { value: ResinRatio; label: { en: string; ar: string; fr: string }; description: { en: string; ar: string; fr: string } }[] = [
  {
    value: 'low',
    label: { en: 'Light Touch', ar: 'لمسة خفيفة', fr: 'Touche Légère' },
    description: {
      en: 'Subtle resin accents highlighting natural wood grain',
      ar: 'لمسات راتنج خفيفة تبرز حبيبات الخشب الطبيعية',
      fr: 'Accents de résine subtils mettant en valeur le grain naturel du bois',
    },
  },
  {
    value: 'medium',
    label: { en: 'Balanced Blend', ar: 'مزيج متوازن', fr: 'Mélange Équilibré' },
    description: {
      en: 'Perfect harmony between wood and resin',
      ar: 'تناغم مثالي بين الخشب والراتنج',
      fr: 'Harmonie parfaite entre le bois et la résine',
    },
  },
  {
    value: 'high',
    label: { en: 'Bold Statement', ar: 'بيان جريء', fr: 'Déclaration Audacieuse' },
    description: {
      en: 'Dramatic resin presence for a striking effect',
      ar: 'حضور راتنج دراماتيكي لتأثير مذهل',
      fr: 'Présence de résine dramatique pour un effet saisissant',
    },
  },
];

export function ResinRatioStep({ locale = 'en' }: ResinRatioStepProps) {
  const { state, setResinRatio } = useConfigurator();
  const currentRatio = state.configuration.resin?.ratio || 'medium';

  const getLabel = (option: typeof ratioOptions[0]) => {
    if (locale === 'ar') return option.label.ar;
    if (locale === 'fr') return option.label.fr;
    return option.label.en;
  };

  const getDescription = (option: typeof ratioOptions[0]) => {
    if (locale === 'ar') return option.description.ar;
    if (locale === 'fr') return option.description.fr;
    return option.description.en;
  };

  return (
    <div className={styles.resinRatioStep}>
      <p className={styles.stepDescription}>
        {locale === 'ar'
          ? 'اختر مقدار الراتنج الذي تريده على قطعتك. الراتنج يحمي الخشب ويضيف لوناً وتألقاً.'
          : locale === 'fr'
          ? 'Choisissez la quantité de résine que vous souhaitez sur votre pièce. La résine protège le bois et ajoute couleur et éclat.'
          : 'Choose how much resin coverage you want on your piece. Resin protects the wood and adds color and shine.'}
      </p>

      <div className={styles.ratioOptions}>
        {ratioOptions.map((option) => {
          const isSelected = currentRatio === option.value;
          const percentage = RESIN_RATIO_PERCENTAGES[option.value];
          const priceModifier = RESIN_RATIO_MODIFIERS[option.value];

          return (
            <motion.button
              key={option.value}
              className={`${styles.ratioOption} ${isSelected ? styles.selected : ''}`}
              onClick={() => setResinRatio(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.ratioVisual}>
                <div className={styles.ratioBarContainer}>
                  <motion.div
                    className={styles.ratioBarFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className={styles.ratioPercentage}>{percentage}%</span>
              </div>

              <div className={styles.ratioInfo}>
                <h4 className={styles.ratioLabel}>{getLabel(option)}</h4>
                <p className={styles.ratioDescription}>{getDescription(option)}</p>
              </div>

              <div className={styles.ratioPrice}>
                {priceModifier > 0 ? (
                  <span className={styles.priceModifier}>+${priceModifier}</span>
                ) : (
                  <span className={styles.priceIncluded}>
                    {locale === 'ar' ? 'مشمول' : locale === 'fr' ? 'Inclus' : 'Included'}
                  </span>
                )}
              </div>

              {isSelected && (
                <motion.div
                  className={styles.selectedCheck}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Visual Preview */}
      <div className={styles.ratioPreview}>
        <h4 className={styles.previewTitle}>
          {locale === 'ar' ? 'معاينة التغطية' : locale === 'fr' ? 'Aperçu de la Couverture' : 'Coverage Preview'}
        </h4>
        <div className={styles.previewContainer}>
          <div className={styles.previewWood} />
          <motion.div
            className={styles.previewResin}
            initial={{ width: '40%' }}
            animate={{ width: `${RESIN_RATIO_PERCENTAGES[currentRatio]}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              backgroundColor: state.configuration.resin?.color?.hex || '#1E90FF',
              opacity: state.configuration.resin?.transparency === 'opaque' ? 0.9 : state.configuration.resin?.transparency === 'translucent' ? 0.6 : 0.3,
            }}
          />
        </div>
        <div className={styles.previewLabels}>
          <span>
            {locale === 'ar' ? 'خشب' : locale === 'fr' ? 'Bois' : 'Wood'}
          </span>
          <span>
            {locale === 'ar' ? 'راتنج' : locale === 'fr' ? 'Résine' : 'Resin'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ResinRatioStep;
