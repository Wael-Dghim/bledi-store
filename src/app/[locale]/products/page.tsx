'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedCard, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedCard';
import { Link } from '@/i18n/navigation';
import { ProductImageShuffle } from '@/components/ui/ProductImageShuffle';
import { useCart } from '@/context/CartContext';

// Mock product data
const allProducts = [
  { id: '1', name: 'Premium Headphones', category: 'Electronics', price: 299.99, images: ['🎧', '🎵', '🎼', '🔊', '📀'], description: 'High-quality wireless headphones with noise cancellation' },
  { id: '2', name: 'Leather Backpack', category: 'Accessories', price: 189.99, images: ['🎒', '👜', '💼', '👝', '⛺'], description: 'Handcrafted genuine leather backpack' },
  { id: '3', name: 'Smart Watch', category: 'Electronics', price: 449.99, images: ['⌚', '📱', '⏱️', '🏃', '💓'], description: 'Advanced smartwatch with health monitoring' },
  { id: '4', name: 'Designer Sunglasses', category: 'Accessories', price: 159.99, images: ['🕶️', '👓', '😎', '🏖️', '☀️'], description: 'UV-protected designer sunglasses' },
  { id: '5', name: 'Wireless Speaker', category: 'Electronics', price: 129.99, images: ['🔊', '📻', '🎙️', '🔉', '🎶'], description: 'Portable Bluetooth speaker with 360° sound' },
  { id: '6', name: 'Leather Wallet', category: 'Accessories', price: 79.99, images: ['👝', '💳', '💵', '💰', '🏦'], description: 'Slim RFID-blocking leather wallet' },
  { id: '7', name: 'Mechanical Keyboard', category: 'Electronics', price: 199.99, images: ['⌨️', '🖱️', '🕹️', '💻', '💡'], description: 'RGB mechanical gaming keyboard' },
  { id: '8', name: 'Canvas Sneakers', category: 'Clothing', price: 89.99, images: ['👟', '👞', '🥾', '🏃‍♂️', '💨'], description: 'Classic canvas sneakers' },
  { id: '9', name: 'Fitness Tracker', category: 'Electronics', price: 99.99, images: ['📱', '⌚', '🔋', '📈', '🏇'], description: 'Waterproof fitness activity tracker' },
  { id: '10', name: 'Silk Scarf', category: 'Accessories', price: 69.99, images: ['🧣', '🎀', '👗', '🦢', '🧶'], description: 'Luxurious silk scarf' },
  { id: '11', name: 'Vintage Camera', category: 'Electronics', price: 599.99, images: ['📷', '🎞️', '🖼️', '📸', '🔦'], description: 'Retro-style digital camera' },
  { id: '12', name: 'Leather Belt', category: 'Accessories', price: 59.99, images: ['👔', '👖', '👞', '💼', '🧱'], description: 'Premium leather dress belt' },
];

const categories = ['All', 'Electronics', 'Accessories', 'Clothing'];

export default function ProductsPage() {
  const t = useTranslations('products');
  const { addToCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = allProducts
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

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

        {/* Filters */}
        <motion.div
          className="flex flex-between gap-lg mb-xl"
          style={{ flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: 'var(--spacing-sm) var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(`categories.${category}`)}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-sm" style={{ alignItems: 'center' }}>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {t('sortBy')}:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-sm)',
                cursor: 'pointer'
              }}
            >
              <option value="name">Name</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <StaggerContainer className="grid grid-4" staggerDelay={0.1}>
          {filteredProducts.map((product) => (
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
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)', 
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-md)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.description}
                  </p>
                  <div className="flex flex-between" style={{ alignItems: 'center' }}>
                    <span className="product-price">${product.price}</span>
                    <AnimatedButton 
                      variant="secondary" 
                      style={{ padding: 'var(--spacing-sm)', minWidth: '44px', borderRadius: 'var(--radius-md)' }}
                      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
                    >
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.25rem', height: '1.25rem' }}>
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

        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center"
            style={{ padding: 'var(--spacing-3xl)', color: 'var(--color-text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p style={{ fontSize: 'var(--font-size-xl)' }}>{t('noProducts')}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
