'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { ConfiguratorStep, StepInfo } from '@/types/configurator';
import styles from './configurator.module.css';

const steps: StepInfo[] = [
  {
    number: 1,
    title: 'Select Style',
    titleAr: 'اختر النمط',
    titleFr: 'Choisir le Style',
    description: 'Choose wood type and size',
    descriptionAr: 'اختر نوع الخشب والحجم',
    descriptionFr: 'Choisissez le type de bois et la taille',
  },
  {
    number: 2,
    title: 'Resin Coverage',
    titleAr: 'تغطية الراتنج',
    titleFr: 'Couverture Résine',
    description: 'Set resin ratio',
    descriptionAr: 'حدد نسبة الراتنج',
    descriptionFr: 'Définir le ratio de résine',
  },
  {
    number: 3,
    title: 'Color Palette',
    titleAr: 'لوحة الألوان',
    titleFr: 'Palette de Couleurs',
    description: 'Choose resin color',
    descriptionAr: 'اختر لون الراتنج',
    descriptionFr: 'Choisir la couleur de la résine',
  },
  {
    number: 4,
    title: 'Personalize',
    titleAr: 'التخصيص',
    titleFr: 'Personnaliser',
    description: 'Add custom text',
    descriptionAr: 'أضف نصاً مخصصاً',
    descriptionFr: 'Ajouter du texte personnalisé',
  },
];

interface ConfiguratorProgressProps {
  locale?: string;
}

export function ConfiguratorProgress({ locale = 'en' }: ConfiguratorProgressProps) {
  const { state, setStep } = useConfigurator();
  const { currentStep } = state;

  const getTitle = (step: StepInfo) => {
    if (locale === 'ar') return step.titleAr;
    if (locale === 'fr') return step.titleFr;
    return step.title;
  };

  const handleStepClick = (stepNumber: ConfiguratorStep) => {
    if (stepNumber < currentStep) {
      setStep(stepNumber);
    }
  };

  return (
    <div className={styles.configuratorProgress}>
      <div className={styles.progressTrack}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className={styles.progressSteps}>
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isClickable = step.number < currentStep;

          return (
            <motion.button
              key={step.number}
              className={`${styles.progressStep} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
              onClick={() => handleStepClick(step.number)}
              disabled={!isClickable}
              whileHover={isClickable ? { scale: 1.05 } : undefined}
              whileTap={isClickable ? { scale: 0.95 } : undefined}
            >
              <motion.div
                className={styles.stepCircle}
                initial={false}
                animate={{
                  backgroundColor: isActive || isCompleted ? 'var(--color-accent-primary, #D4AF37)' : 'var(--color-bg-tertiary)',
                  borderColor: isActive ? 'var(--color-accent-primary, #D4AF37)' : 'transparent',
                }}
                transition={{ duration: 0.2 }}
              >
                {isCompleted ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={styles.checkIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  <span>{step.number}</span>
                )}
              </motion.div>
              <span className={styles.stepTitle}>{getTitle(step)}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default ConfiguratorProgress;
