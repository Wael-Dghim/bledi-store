'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfiguratorProvider, useConfigurator } from '@/context/ConfiguratorContext';
import { ConfiguratorProgress } from './ConfiguratorProgress';
import { TemplateSelectionStep } from './steps/TemplateSelectionStep';
import { ResinRatioStep } from './steps/ResinRatioStep';
import { ColorPaletteStep } from './steps/ColorPaletteStep';
import { PersonalizationStep } from './steps/PersonalizationStep';
import { LivePreview } from './LivePreview';
import { PriceSummary } from './PriceSummary';
import { ConfirmationGate } from './ConfirmationGate';
import styles from './configurator.module.css';

interface ProductConfiguratorProps {
  locale?: string;
}

// Step animation variants
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

function ConfiguratorContent({ locale = 'en' }: ProductConfiguratorProps) {
  const { state, nextStep, prevStep, canProceedToNext, canGoBack } = useConfigurator();
  const { currentStep } = state;
  const [direction, setDirection] = React.useState(0);

  const handleNext = () => {
    if (canProceedToNext && currentStep < 4) {
      setDirection(1);
      nextStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (canGoBack) {
      setDirection(-1);
      prevStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TemplateSelectionStep locale={locale} />;
      case 2:
        return <ResinRatioStep locale={locale} />;
      case 3:
        return <ColorPaletteStep locale={locale} />;
      case 4:
        return <PersonalizationStep locale={locale} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = {
      1: { en: 'Select Your Wood Style', ar: 'اختر نمط الخشب', fr: 'Choisissez Votre Style de Bois' },
      2: { en: 'Choose Resin Coverage', ar: 'اختر تغطية الراتنج', fr: 'Choisissez la Couverture de Résine' },
      3: { en: 'Pick Your Color', ar: 'اختر لونك', fr: 'Choisissez Votre Couleur' },
      4: { en: 'Add Personalization', ar: 'أضف التخصيص', fr: 'Ajoutez une Personnalisation' },
    };
    const key = locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr' : 'en';
    return titles[currentStep as keyof typeof titles][key];
  };

  return (
    <div className={styles.productConfigurator}>
      <ConfiguratorProgress locale={locale} />

      <div className={styles.configuratorLayout}>
        <div className={styles.configuratorMain}>
          <h2 className={styles.stepHeading}>{getStepTitle()}</h2>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={styles.stepContent}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className={styles.stepNavigation}>
            <motion.button
              className={`${styles.navBtn} ${styles.navBtnSecondary}`}
              onClick={handlePrev}
              disabled={!canGoBack}
              whileHover={{ scale: canGoBack ? 1.02 : 1 }}
              whileTap={{ scale: canGoBack ? 0.98 : 1 }}
            >
              {locale === 'ar' ? 'السابق' : locale === 'fr' ? 'Précédent' : 'Previous'}
            </motion.button>

            {currentStep < 4 ? (
              <motion.button
                className={`${styles.navBtn} ${styles.navBtnPrimary}`}
                onClick={handleNext}
                disabled={!canProceedToNext}
                whileHover={{ scale: canProceedToNext ? 1.02 : 1 }}
                whileTap={{ scale: canProceedToNext ? 0.98 : 1 }}
              >
                {locale === 'ar' ? 'التالي' : locale === 'fr' ? 'Suivant' : 'Next'}
              </motion.button>
            ) : (
              <ConfirmationGate locale={locale} />
            )}
          </div>
        </div>

        <aside className={styles.configuratorSidebar}>
          <LivePreview locale={locale} />
          <PriceSummary locale={locale} />
        </aside>
      </div>
    </div>
  );
}

// Main export with provider wrapper
export function ProductConfigurator({ locale = 'en' }: ProductConfiguratorProps) {
  return (
    <ConfiguratorProvider>
      <ConfiguratorContent locale={locale} />
    </ConfiguratorProvider>
  );
}

export default ProductConfigurator;
