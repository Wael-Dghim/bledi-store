'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { getAllFontsUrl } from '@/data/fonts';
import styles from './configurator.module.css';

interface LivePreviewProps {
  locale?: string;
}

export function LivePreview({ locale = 'en' }: LivePreviewProps) {
  const { state } = useConfigurator();
  const { configuration } = state;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = getAllFontsUrl();
    link.rel = 'stylesheet';
    link.onload = () => setFontsLoaded(true);
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const getTemplateName = () => {
    if (!configuration.template) return '';
    if (locale === 'ar') return configuration.template.nameAr;
    if (locale === 'fr') return configuration.template.nameFr;
    return configuration.template.name;
  };

  const getSizeLabel = () => {
    if (!configuration.selectedSize) return '';
    if (locale === 'ar') return configuration.selectedSize.labelAr;
    if (locale === 'fr') return configuration.selectedSize.labelFr;
    return configuration.selectedSize.label;
  };

  const getResinColorName = () => {
    if (!configuration.resin?.color) return '';
    if (locale === 'ar') return configuration.resin.color.nameAr;
    if (locale === 'fr') return configuration.resin.color.nameFr;
    return configuration.resin.color.name;
  };

  const getResinOpacity = () => {
    switch (configuration.resin?.transparency) {
      case 'opaque': return 0.85;
      case 'translucent': return 0.55;
      case 'transparent': return 0.25;
      default: return 0.55;
    }
  };

  const getResinWidth = () => {
    switch (configuration.resin?.ratio) {
      case 'low': return '25%';
      case 'medium': return '45%';
      case 'high': return '65%';
      default: return '45%';
    }
  };

  const getPersonalizationFont = () => {
    if (!configuration.personalization?.fontFamily) return 'inherit';
    return configuration.personalization.fontFamily;
  };

  const getPersonalizationFontSize = () => {
    switch (configuration.personalization?.fontSize) {
      case 'small': return '12px';
      case 'medium': return '16px';
      case 'large': return '22px';
      default: return '16px';
    }
  };

  const getTextPositionStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      color: 'white',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
      fontFamily: fontsLoaded ? getPersonalizationFont() : 'inherit',
      fontSize: getPersonalizationFontSize(),
      padding: '8px',
      maxWidth: '80%',
      wordBreak: 'break-word',
      zIndex: 10,
    };

    switch (configuration.personalization?.position) {
      case 'center':
        return { ...baseStyle, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' };
      case 'bottom-right':
        return { ...baseStyle, bottom: '12px', right: '12px', textAlign: 'right' };
      case 'top-left':
        return { ...baseStyle, top: '12px', left: '12px', textAlign: 'left' };
      case 'bottom-left':
        return { ...baseStyle, bottom: '12px', left: '12px', textAlign: 'left' };
      default:
        return { ...baseStyle, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' };
    }
  };

  return (
    <div className={styles.livePreview}>
      <h3 className={styles.livePreviewTitle}>
        {locale === 'ar' ? 'معاينة مباشرة' : locale === 'fr' ? 'Aperçu en Direct' : 'Live Preview'}
      </h3>

      <div className={styles.livePreviewContainer}>
        <div className={styles.livePreviewWood}>
          <span className={styles.woodEmoji}>
            {configuration.template?.woodType === 'olive-burl' ? '🌳' :
             configuration.template?.woodType === 'olive-live-edge' ? '🪵' :
             configuration.template?.woodType === 'olive-root' ? '🌿' : '🫒'}
          </span>
        </div>

        <AnimatePresence>
          {configuration.resin?.color && (
            <motion.div
              className={styles.livePreviewResin}
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: getResinWidth(),
                opacity: getResinOpacity(),
              }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                backgroundColor: configuration.resin.color.hex,
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {configuration.personalization?.text && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={getTextPositionStyle()}
            >
              {configuration.personalization.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.previewSummary}>
        <AnimatePresence mode="wait">
          {configuration.template && (
            <motion.div
              key="template"
              className={styles.summaryItem}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <span className={styles.summaryLabel}>
                {locale === 'ar' ? 'المنتج' : locale === 'fr' ? 'Produit' : 'Product'}
              </span>
              <span className={styles.summaryValue}>{getTemplateName()}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {configuration.selectedSize && (
            <motion.div
              key="size"
              className={styles.summaryItem}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <span className={styles.summaryLabel}>
                {locale === 'ar' ? 'الحجم' : locale === 'fr' ? 'Taille' : 'Size'}
              </span>
              <span className={styles.summaryValue}>{getSizeLabel()}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {configuration.resin?.color && (
            <motion.div
              key="color"
              className={styles.summaryItem}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <span className={styles.summaryLabel}>
                {locale === 'ar' ? 'اللون' : locale === 'fr' ? 'Couleur' : 'Color'}
              </span>
              <span className={styles.summaryValue}>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: configuration.resin.color.hex }}
                />
                {getResinColorName()}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {configuration.personalization?.text && (
            <motion.div
              key="text"
              className={styles.summaryItem}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <span className={styles.summaryLabel}>
                {locale === 'ar' ? 'النص' : locale === 'fr' ? 'Texte' : 'Text'}
              </span>
              <span className={`${styles.summaryValue} ${styles.textValue}`}>
                "{configuration.personalization.text}"
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default LivePreview;
