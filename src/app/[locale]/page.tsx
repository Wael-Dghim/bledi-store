'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedCard, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedCard';
import { Link } from '@/i18n/navigation';
import { ProductImageShuffle } from '@/components/ui/ProductImageShuffle';
import { useCart } from '@/context/CartContext';

// Mock product data for demonstration
const mockProducts = [
  { id: '1', name: 'Premium Headphones', category: 'Electronics', price: 299.99, images: ['🎧', '🎵', '🎼', '🔊', '📀'] },
  { id: '2', name: 'Leather Backpack', category: 'Accessories', price: 189.99, images: ['🎒', '👜', '💼', '👝', '⛺'] },
  { id: '3', name: 'Smart Watch', category: 'Electronics', price: 449.99, images: ['⌚', '📱', '⏱️', '🏃', '💓'] },
  { id: '4', name: 'Designer Sunglasses', category: 'Accessories', price: 159.99, images: ['🕶️', '👓', '😎', '🏖️', '☀️'] },
];

export default function HomePage() {
  const t = useTranslations('hero');
  const products = useTranslations('products');
  const { addToCart } = useCart();
  const locale = useLocale();

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="gradient-text">{t('title')}</span>
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {t('subtitle')}
          </motion.p>
          
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <Link href="/products">
              <AnimatedButton variant="primary">
                {t('cta')}
              </AnimatedButton>
            </Link>
            <Link href="/products">
              <AnimatedButton variant="secondary">
                {t('ctaSecondary')}
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: -1,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: -1,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </section>

      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <motion.h2
            className="text-center mb-xl"
            style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">{products('featured')}</span>
          </motion.h2>

          <StaggerContainer className="grid grid-4" staggerDelay={0.15}>
            {mockProducts.map((product) => (
              <StaggerItem key={product.id}>
                <AnimatedCard>
                  <Link href={`/products/${product.id}`} style={{ display: 'block' }}>
                    <div className="product-image" style={{ 
                      position: 'relative',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)',
                      height: '260px',
                      width: '100%',
                      overflow: 'hidden'
                    }}>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ProductImageShuffle images={product.images} fontSize="4rem" />
                      </div>
                    </div>
                  </Link>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="product-name">{product.name}</h3>
                    </Link>
                    <div className="flex flex-between" style={{ alignItems: 'center', marginTop: 'var(--spacing-md)' }}>
                      <span className="product-price">${product.price}</span>
                      <AnimatedButton 
                        variant="secondary" 
                        style={{ padding: 'var(--spacing-xs)', minWidth: '40px', borderRadius: 'var(--radius-md)' }}
                        onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.1rem', height: '1.1rem' }}>
                          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                      </AnimatedButton>
                    </div>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
