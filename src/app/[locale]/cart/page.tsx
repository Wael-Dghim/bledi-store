'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { Link } from '@/i18n/navigation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedCard';
import styles from './cart.module.css';

export default function CartPage() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const emptyCartText = {
    en: 'Explore our configurator to create your unique piece.',
    ar: 'استكشف أداة التصميم لإنشاء قطعتك الفريدة.',
    fr: 'Explorez notre configurateur pour créer votre pièce unique.',
  };

  const summaryText = {
    en: 'Summary',
    ar: 'الملخص',
    fr: 'Résumé',
  };

  const freeText = {
    en: 'Free',
    ar: 'مجاني',
    fr: 'Gratuit',
  };

  const customizedText = {
    en: 'Customized',
    ar: 'مخصص',
    fr: 'Personnalisé',
  };

  const getText = (obj: Record<string, string>) => obj[locale] || obj['en'];

  if (items.length === 0) {
    return (
      <div className={styles.cartPageEmpty}>
        <div className="container">
          <AnimatedContainer className="glass-card text-center" style={{ padding: 'var(--spacing-2xl)' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.emptyCartIcon}>🛒</div>
              <h1 className={styles.emptyCartTitle}>{t('empty')}</h1>
              <p className={styles.emptyCartText}>
                {getText(emptyCartText)}
              </p>
              <Link href="/configure">
                <AnimatedButton variant="primary">
                  {t('continueShopping')}
                </AnimatedButton>
              </Link>
            </motion.div>
          </AnimatedContainer>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <motion.h1
          className={`${styles.cartTitle} gradient-text`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {t('title')}
        </motion.h1>

        <div className={styles.cartGrid}>
          <StaggerContainer className="flex flex-col gap-md">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <StaggerItem key={item.id}>
                  <motion.div
                    className={`glass-card ${styles.cartItem}`}
                    layout
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <div className={styles.cartItemInner}>
                      <div className={styles.itemDetails}>
                        <div
                          className={item.isConfigured ? styles.itemImageConfigured : styles.itemImageDefault}
                          style={item.isConfigured ? {
                            background: `linear-gradient(135deg, #8B7355, ${item.configuration?.resinColorHex || '#1E90FF'})`
                          } : undefined}
                        >
                          {item.isConfigured ? '🎨' : '📦'}
                        </div>
                        <div className={styles.itemInfo}>
                          <h3 className={styles.itemName}>{item.name}</h3>
                          {item.isConfigured && item.configuration && (
                            <p className={styles.itemConfig}>
                              {item.configuration.sizeLabel} • {item.configuration.resinColor}
                            </p>
                          )}
                          {item.isConfigured && (
                            <span className={styles.customBadge}>
                              {getText(customizedText)}
                            </span>
                          )}
                          <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className={styles.itemActions}>
                        <div className={styles.quantityControls}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={styles.quantityBtn}
                          >
                            −
                          </button>
                          <span className={styles.quantityValue}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={styles.quantityBtn}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className={styles.removeBtn}
                          title={t('remove')}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerContainer>

          <motion.div
            className={`glass-card ${styles.cartSummary}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={styles.summaryTitle}>
              {getText(summaryText)}
            </h2>
            <div className={`flex flex-between mb-sm ${styles.summaryRow}`}>
              <span>{t('subtotal')} ({totalItems})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className={`flex flex-between mb-sm ${styles.summaryRow}`}>
              <span>{t('shipping')}</span>
              <span style={{ color: 'var(--color-success)' }}>{getText(freeText)}</span>
            </div>
            <div className={styles.summaryDivider}></div>
            <div className={`flex flex-between mb-lg ${styles.summaryTotal}`}>
              <span>{t('total')}</span>
              <span className="gradient-text">${totalPrice.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className={styles.checkoutLink}>
              <AnimatedButton variant="primary" style={{ width: '100%' }}>
                {t('checkout')}
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
