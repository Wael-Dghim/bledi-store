'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { fontOptions, getAllFontsUrl, getFontById } from '@/data/fonts';
import { FontSize, TextPosition, PERSONALIZATION_FEE } from '@/types/configurator';
import { validatePersonalizationText } from '@/lib/pricing';
import styles from '../configurator.module.css';

interface PersonalizationStepProps {
  locale?: string;
}

const fontSizeOptions: { value: FontSize; label: { en: string; ar: string; fr: string }; cssSize: string }[] = [
  { value: 'small', label: { en: 'Small', ar: 'صغير', fr: 'Petit' }, cssSize: '14px' },
  { value: 'medium', label: { en: 'Medium', ar: 'متوسط', fr: 'Moyen' }, cssSize: '18px' },
  { value: 'large', label: { en: 'Large', ar: 'كبير', fr: 'Grand' }, cssSize: '24px' },
];

const positionOptions: { value: TextPosition; label: { en: string; ar: string; fr: string } }[] = [
  { value: 'center', label: { en: 'Center', ar: 'وسط', fr: 'Centre' } },
  { value: 'bottom-right', label: { en: 'Bottom Right', ar: 'أسفل يمين', fr: 'Bas Droite' } },
  { value: 'top-left', label: { en: 'Top Left', ar: 'أعلى يسار', fr: 'Haut Gauche' } },
  { value: 'bottom-left', label: { en: 'Bottom Left', ar: 'أسفل يسار', fr: 'Bas Gauche' } },
];

export function PersonalizationStep({ locale = 'en' }: PersonalizationStepProps) {
  const { state, setPersonalization } = useConfigurator();
  const currentPersonalization = state.configuration.personalization;

  const [text, setText] = useState(currentPersonalization?.text || '');
  const [selectedFontId, setSelectedFontId] = useState(currentPersonalization?.fontFamily || fontOptions[0].id);
  const [fontSize, setFontSize] = useState<FontSize>(currentPersonalization?.fontSize || 'medium');
  const [position, setPosition] = useState<TextPosition>(currentPersonalization?.position || 'center');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Load Google Fonts
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

  // Update personalization in context when values change
  useEffect(() => {
    const validation = validatePersonalizationText(text);

    if (!validation.valid) {
      setValidationError(validation.error || null);
      return;
    }

    setValidationError(null);

    if (text.trim()) {
      const font = getFontById(selectedFontId);
      setPersonalization({
        text: text.trim(),
        fontFamily: font?.family || fontOptions[0].family,
        fontSize,
        position,
      });
    } else {
      setPersonalization(null);
    }
  }, [text, selectedFontId, fontSize, position, setPersonalization]);

  const selectedFont = getFontById(selectedFontId);
  const selectedFontSize = fontSizeOptions.find(f => f.value === fontSize);

  const getLabel = (option: { label: { en: string; ar: string; fr: string } }) => {
    if (locale === 'ar') return option.label.ar;
    if (locale === 'fr') return option.label.fr;
    return option.label.en;
  };

  // Map position value to CSS class name (convert bottom-right to bottomRight)
  const getPositionClassName = (pos: TextPosition): string => {
    switch (pos) {
      case 'bottom-right': return styles.bottomRight;
      case 'top-left': return styles.topLeft;
      case 'bottom-left': return styles.bottomLeft;
      case 'center': return styles.center;
      default: return styles.center;
    }
  };

  return (
    <div className={styles.personalizationStep}>
      <div className={styles.stepHeader}>
        <p className={styles.stepDescription}>
          {locale === 'ar'
            ? 'أضف لمسة شخصية مع نص مخصص منقوش على قطعتك. هذه الخطوة اختيارية.'
            : locale === 'fr'
            ? 'Ajoutez une touche personnelle avec un texte personnalisé gravé sur votre pièce. Cette étape est optionnelle.'
            : 'Add a personal touch with custom text engraved on your piece. This step is optional.'}
        </p>
        <div className={styles.personalizationFee}>
          <span className={styles.feeLabel}>
            {locale === 'ar' ? 'رسوم التخصيص:' : locale === 'fr' ? 'Frais de personnalisation:' : 'Personalization fee:'}
          </span>
          <span className={styles.feeAmount}>+${PERSONALIZATION_FEE}</span>
        </div>
      </div>

      {/* Text Input */}
      <div className={styles.inputSection}>
        <label className={styles.inputLabel}>
          {locale === 'ar' ? 'النص المخصص' : locale === 'fr' ? 'Texte Personnalisé' : 'Custom Text'}
        </label>
        <input
          type="text"
          className={`${styles.textInput} ${validationError ? styles.error : ''}`}
          placeholder={locale === 'ar' ? 'أدخل النص الخاص بك...' : locale === 'fr' ? 'Entrez votre texte...' : 'Enter your text...'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={50}
        />
        <div className={styles.inputFooter}>
          {validationError ? (
            <span className={styles.errorMessage}>{validationError}</span>
          ) : (
            <span className={styles.charCount}>{text.length}/50</span>
          )}
        </div>
      </div>

      {/* Font Selection */}
      <div className={styles.inputSection}>
        <label className={styles.inputLabel}>
          {locale === 'ar' ? 'نمط الخط' : locale === 'fr' ? 'Style de Police' : 'Font Style'}
        </label>
        <div className={styles.fontOptions}>
          {fontOptions.map((font) => (
            <motion.button
              key={font.id}
              className={`${styles.fontOption} ${selectedFontId === font.id ? styles.selected : ''}`}
              onClick={() => setSelectedFontId(font.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ fontFamily: fontsLoaded ? font.family : 'inherit' }}
            >
              <span className={styles.fontPreview}>{font.previewText}</span>
              <span className={styles.fontName}>{font.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Font Size Selection */}
      <div className={styles.inputSection}>
        <label className={styles.inputLabel}>
          {locale === 'ar' ? 'حجم الخط' : locale === 'fr' ? 'Taille de Police' : 'Font Size'}
        </label>
        <div className={styles.sizeOptions}>
          {fontSizeOptions.map((size) => (
            <motion.button
              key={size.value}
              className={`${styles.sizeOption} ${fontSize === size.value ? styles.selected : ''}`}
              onClick={() => setFontSize(size.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={styles.sizePreview} style={{ fontSize: size.cssSize }}>Aa</span>
              <span className={styles.positionLabel}>{getLabel(size)}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Position Selection */}
      <div className={styles.inputSection}>
        <label className={styles.inputLabel}>
          {locale === 'ar' ? 'موضع النص' : locale === 'fr' ? 'Position du Texte' : 'Text Position'}
        </label>
        <div className={styles.positionOptions}>
          {positionOptions.map((pos) => (
            <motion.button
              key={pos.value}
              className={`${styles.positionOption} ${position === pos.value ? styles.selected : ''}`}
              onClick={() => setPosition(pos.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.positionPreview}>
                <div className={`${styles.positionDot} ${getPositionClassName(pos.value)}`} />
              </div>
              <span className={styles.positionLabel}>{getLabel(pos)}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Live Text Preview */}
      {text.trim() && !validationError && (
        <motion.div
          className={styles.textPreviewSection}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <label className={styles.inputLabel}>
            {locale === 'ar' ? 'معاينة' : locale === 'fr' ? 'Aperçu' : 'Preview'}
          </label>
          <div className={styles.textPreviewContainer}>
            <div
              className={`${styles.textPreviewText} ${getPositionClassName(position)}`}
              style={{
                fontFamily: fontsLoaded && selectedFont ? selectedFont.family : 'inherit',
                fontSize: selectedFontSize?.cssSize || '18px',
              }}
            >
              {text}
            </div>
          </div>
        </motion.div>
      )}

      {/* Skip Personalization */}
      {text.trim() && (
        <motion.button
          className={styles.skipBtn}
          onClick={() => {
            setText('');
            setPersonalization(null);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {locale === 'ar' ? 'مسح النص' : locale === 'fr' ? 'Effacer le Texte' : 'Clear Text'}
        </motion.button>
      )}
    </div>
  );
}

export default PersonalizationStep;
