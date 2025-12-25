'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedCard, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedCard';
import { Link } from '@/i18n/navigation';
import { ProductImageShuffle } from '@/components/ui/ProductImageShuffle';
import { useCart } from '@/context/CartContext';

import { ProductList } from '@/components/ui/ProductList';

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
            {t('title')}
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
              <AnimatedButton 
                variant="primary" 
                style={{ 
                  background: 'white', 
                  color: 'var(--color-accent-secondary)',
                  padding: 'var(--spacing-md) var(--spacing-2xl)' 
                }}
              >
                {t('cta')}
              </AnimatedButton>
            </Link>
            <Link href="/about">
              <AnimatedButton 
                variant="secondary" 
                style={{ 
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: 'var(--spacing-md) var(--spacing-2xl)' 
                }}
              >
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
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(197, 160, 40, 0.12) 0%, transparent 70%)',
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

      {/* Features Section */}
      <section className="section bg-secondary" style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <StaggerContainer className="grid grid-3" staggerDelay={0.2}>
            {/* Security */}
            <StaggerItem>
              <AnimatedCard className="flex flex-col flex-center text-center p-xl">
                <div className="feature-icon" style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  background: 'var(--color-accent-glow)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-lg)',
                  color: 'var(--color-accent-primary)'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--spacing-sm)' }}>
                  {useTranslations('features')('security.title')}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  {useTranslations('features')('security.desc')}
                </p>
              </AnimatedCard>
            </StaggerItem>

            {/* Rapidity */}
            <StaggerItem>
              <AnimatedCard className="flex flex-col flex-center text-center p-xl">
                <div className="feature-icon" style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  background: 'var(--color-accent-glow)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-lg)',
                  color: 'var(--color-accent-primary)'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--spacing-sm)' }}>
                  {useTranslations('features')('rapidity.title')}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  {useTranslations('features')('rapidity.desc')}
                </p>
              </AnimatedCard>
            </StaggerItem>

            {/* Quality */}
            <StaggerItem>
              <AnimatedCard className="flex flex-col flex-center text-center p-xl">
                <div className="feature-icon" style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  background: 'var(--color-accent-glow)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-lg)',
                  color: 'var(--color-accent-primary)'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
                    <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--spacing-sm)' }}>
                  {useTranslations('features')('quality.title')}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  {useTranslations('features')('quality.desc')}
                </p>
              </AnimatedCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
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

          <ProductList limit={4} infinite={false} />

          <div className="flex flex-center mt-xl">
            <Link href="/products">
              <AnimatedButton variant="secondary" style={{ padding: 'var(--spacing-md) var(--spacing-2xl)' }}>
                {products('showAll')}
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
