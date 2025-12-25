'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedCard, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedCard';
import { Link } from '@/i18n/navigation';
import { ProductImageShuffle } from '@/components/ui/ProductImageShuffle';
import { useCart } from '@/context/CartContext';

import { ProductList } from '@/components/ui/ProductList';

export default function ProductsPage() {
  const t = useTranslations('products');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>
            <span className="gradient-text">{t('title')}</span>
          </h1>
        </motion.div>

        {/* Products Grid */}
        <ProductList />
      </div>
    </div>
  );
}
