'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { WoodTemplate, ProductSize } from '@/types/configurator';
import styles from '../configurator.module.css';

interface TemplateSelectionStepProps {
  locale?: string;
}

const woodTypeImages: Record<string, string> = {
  'olive-burl': '🌳',
  'olive-live-edge': '🪵',
  'olive-root': '🌿',
  'olive-classic': '🫒',
};

export function TemplateSelectionStep({ locale = 'en' }: TemplateSelectionStepProps) {
  const { state, selectTemplate, selectSize } = useConfigurator();
  const { availableTemplates, selectedTemplateId, selectedSizeId, configuration } = state;

  const getName = (template: WoodTemplate) => {
    if (locale === 'ar') return template.nameAr;
    if (locale === 'fr') return template.nameFr;
    return template.name;
  };

  const getDescription = (template: WoodTemplate) => {
    if (locale === 'ar') return template.descriptionAr;
    if (locale === 'fr') return template.descriptionFr;
    return template.description;
  };

  const getSizeLabel = (size: ProductSize) => {
    if (locale === 'ar') return size.labelAr;
    if (locale === 'fr') return size.labelFr;
    return size.label;
  };

  const handleTemplateSelect = (template: WoodTemplate) => {
    selectTemplate(template);
  };

  const handleSizeSelect = (size: ProductSize) => {
    selectSize(size);
  };

  const templatesByCategory = availableTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, WoodTemplate[]>);

  const categoryLabels: Record<string, { en: string; ar: string; fr: string }> = {
    'serving-board': { en: 'Serving Boards', ar: 'ألواح التقديم', fr: 'Planches de Service' },
    'coaster': { en: 'Coasters', ar: 'قواعد الأكواب', fr: 'Sous-verres' },
    'table': { en: 'Tables', ar: 'الطاولات', fr: 'Tables' },
    'clock': { en: 'Wall Clocks', ar: 'ساعات الحائط', fr: 'Horloges Murales' },
    'tray': { en: 'Decorative Trays', ar: 'صواني ديكور', fr: 'Plateaux Décoratifs' },
  };

  const getCategoryLabel = (category: string) => {
    const labels = categoryLabels[category];
    if (!labels) return category;
    if (locale === 'ar') return labels.ar;
    if (locale === 'fr') return labels.fr;
    return labels.en;
  };

  return (
    <div className={styles.templateSelection}>
      {Object.entries(templatesByCategory).map(([category, templates]) => (
        <div key={category} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>{getCategoryLabel(category)}</h3>

          <div className={styles.templatesGrid}>
            {templates.map((template, index) => (
              <motion.button
                key={template.id}
                className={`${styles.templateCard} ${selectedTemplateId === template.id ? styles.selected : ''}`}
                onClick={() => handleTemplateSelect(template)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.templateImage}>
                  <span className={styles.placeholderEmoji}>{woodTypeImages[template.woodType] || '🪵'}</span>
                </div>
                <div className={styles.templateInfo}>
                  <h4 className={styles.templateName}>{getName(template)}</h4>
                  <p className={styles.templateDescription}>{getDescription(template)}</p>
                  <div className={styles.templatePrice}>
                    {locale === 'ar' ? 'يبدأ من' : locale === 'fr' ? 'À partir de' : 'From'}{' '}
                    <span className={styles.priceValue}>${template.basePrice}</span>
                  </div>
                </div>
                {selectedTemplateId === template.id && (
                  <motion.div
                    className={styles.selectedIndicator}
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
            ))}
          </div>
        </div>
      ))}

      {configuration.template && (
        <motion.div
          className={styles.sizeSelection}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <h3 className={styles.sizeTitle}>
            {locale === 'ar' ? 'اختر الحجم' : locale === 'fr' ? 'Choisissez la Taille' : 'Select Size'}
          </h3>

          <div className={styles.sizesGrid}>
            {configuration.template.sizes.map((size) => (
              <motion.button
                key={size.id}
                className={`${styles.sizeCard} ${selectedSizeId === size.id ? styles.selected : ''} ${size.stock === 0 ? styles.outOfStock : ''}`}
                onClick={() => size.stock > 0 && handleSizeSelect(size)}
                disabled={size.stock === 0}
                whileHover={size.stock > 0 ? { scale: 1.02 } : undefined}
                whileTap={size.stock > 0 ? { scale: 0.98 } : undefined}
              >
                <span className={styles.sizeLabel}>{getSizeLabel(size)}</span>
                <span className={styles.sizeDimensions}>
                  {size.dimensions.width}×{size.dimensions.height}×{size.dimensions.thickness}cm
                </span>
                <span className={styles.sizePrice}>
                  {size.priceModifier > 0 ? `+$${size.priceModifier}` : locale === 'ar' ? 'مشمول' : locale === 'fr' ? 'Inclus' : 'Included'}
                </span>
                <span className={`${styles.sizeStock} ${size.stock <= 5 ? styles.lowStock : ''}`}>
                  {size.stock === 0
                    ? (locale === 'ar' ? 'نفذ' : locale === 'fr' ? 'Épuisé' : 'Out of stock')
                    : size.stock <= 5
                    ? `${size.stock} ${locale === 'ar' ? 'متبقي' : locale === 'fr' ? 'restants' : 'left'}`
                    : `${size.stock} ${locale === 'ar' ? 'متاح' : locale === 'fr' ? 'disponibles' : 'available'}`
                  }
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default TemplateSelectionStep;
