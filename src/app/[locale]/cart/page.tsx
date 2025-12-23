'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { Link } from '@/i18n/navigation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedCard';

export default function CartPage() {
  const t = useTranslations('cart');
  const common = useTranslations('common');
  const { items, removeFromCart, addToCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <div className="container">
          <AnimatedContainer className="glass-card text-center" style={{ padding: 'var(--spacing-3xl)' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>🛒</div>
              <h1 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-md)' }}>{t('empty')}</h1>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
                Explorez nos produits pour trouver votre bonheur.
              </p>
              <Link href="/products">
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
    <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: 'var(--spacing-3xl)' }}>
      <div className="container">
        <motion.h1 
          className="mb-xl gradient-text"
          style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {t('title')}
        </motion.h1>

        <div className="grid grid-3" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
          {/* Items List */}
          <StaggerContainer className="flex flex-col gap-md">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <StaggerItem key={item.id}>
                  <motion.div 
                    className="glass-card flex flex-between"
                    style={{ padding: 'var(--spacing-md)', gap: 'var(--spacing-lg)' }}
                    layout
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <div className="flex gap-md" style={{ alignItems: 'center' }}>
                      <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        background: 'var(--color-bg-secondary)', 
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem'
                      }}>
                        {/* Since we don't have images in context yet, use a fallback emoji or item icon */}
                        📦
                      </div>
                      <div>
                        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>{item.name}</h3>
                        <p style={{ color: 'var(--color-accent-secondary)', fontWeight: 600 }}>${item.price}</p>
                      </div>
                    </div>

                    <div className="flex gap-lg" style={{ alignItems: 'center' }}>
                      <div className="flex" style={{ background: 'rgba(0,0,0,0.05)', borderRadius: 'var(--radius-sm)' }}>
                        <button 
                          onClick={() => addToCart(item, -1)}
                          style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                          −
                        </button>
                        <span style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => addToCart(item, 1)}
                          style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#ff6b6b', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                        title={t('remove')}
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerContainer>

          {/* Summary */}
          <motion.div 
            className="glass-card"
            style={{ padding: 'var(--spacing-xl)', position: 'sticky', top: '120px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-lg)' }}>Résumé</h2>
            <div className="flex flex-between mb-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <span>{t('subtotal')}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex flex-between mb-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <span>{t('shipping')}</span>
              <span>Gratuit</span>
            </div>
            <div style={{ margin: 'var(--spacing-md) 0', borderTop: '1px solid var(--border-light)' }}></div>
            <div className="flex flex-between mb-xl" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>
              <span>{t('total')}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <AnimatedButton variant="primary" style={{ width: '100%' }}>
              {t('checkout')}
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
