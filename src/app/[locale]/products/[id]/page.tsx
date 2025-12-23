'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, use } from 'react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ProductImageShuffle } from '@/components/ui/ProductImageShuffle';
import { useCart } from '@/context/CartContext';

// Mock product data
const products: Record<string, {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  details: string[];
  stock: number;
}> = {
  '1': { id: '1', name: 'Premium Headphones', category: 'Electronics', price: 299.99, images: ['🎧', '🎵', '🎼', '🔊', '📀'], description: 'High-quality wireless headphones with active noise cancellation. Experience crystal-clear audio with deep bass and immersive sound.', details: ['40-hour battery life', 'Active Noise Cancellation', 'Bluetooth 5.0', 'Foldable design', 'Built-in microphone'], stock: 15 },
  '2': { id: '2', name: 'Leather Backpack', category: 'Accessories', price: 189.99, images: ['🎒', '👜', '💼', '👝', '⛺'], description: 'Handcrafted genuine leather backpack perfect for work or travel. Features multiple compartments and padded laptop sleeve.', details: ['Genuine leather', '15" laptop compartment', 'Water-resistant', 'Adjustable straps', 'Multiple pockets'], stock: 8 },
  '3': { id: '3', name: 'Smart Watch', category: 'Electronics', price: 449.99, images: ['⌚', '📱', '⏱️', '🏃', '💓'], description: 'Advanced smartwatch with comprehensive health monitoring. Track your fitness, receive notifications, and stay connected.', details: ['Heart rate monitor', 'GPS tracking', '5ATM water resistant', '7-day battery', 'AMOLED display'], stock: 23 },
  '4': { id: '4', name: 'Designer Sunglasses', category: 'Accessories', price: 159.99, images: ['🕶️', '👓', '😎', '🏖️', '☀️'], description: 'Premium UV-protected designer sunglasses with polarized lenses. Stylish and functional for any occasion.', details: ['100% UV protection', 'Polarized lenses', 'Titanium frame', 'Includes case', 'Scratch-resistant'], stock: 12 },
  '5': { id: '5', name: 'Wireless Speaker', category: 'Electronics', price: 129.99, images: ['🔊', '📻', '🎙️', '🔉', '🎶'], description: 'Portable Bluetooth speaker with 360° immersive sound. Perfect for parties, outdoor adventures, or relaxing at home.', details: ['360° sound', '24-hour battery', 'IPX7 waterproof', 'Party mode', 'Built-in microphone'], stock: 30 },
  '6': { id: '6', name: 'Leather Wallet', category: 'Accessories', price: 79.99, images: ['👝', '💳', '💵', '💰', '🏦'], description: 'Slim RFID-blocking leather wallet with modern design. Keep your cards and cash secure in style.', details: ['RFID blocking', 'Genuine leather', '8 card slots', 'Bill compartment', 'Minimalist design'], stock: 45 },
};

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const t = useTranslations('products');
  const cartT = useTranslations('cart');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details'>('description');

  const product = products[id];

  if (!product) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container text-center" style={{ paddingTop: 'var(--spacing-3xl)' }}>
          <h1 style={{ fontSize: 'var(--font-size-3xl)' }}>{t('noProducts')}</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 'var(--spacing-3xl)',
          alignItems: 'start'
        }}>
          {/* Product Image */}
          <motion.div
            className="glass-card"
            style={{
              aspectRatio: '1',
              position: 'relative',
              overflow: 'hidden'
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductImageShuffle 
              images={product.images} 
              className="w-full h-full"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="product-category" style={{ marginBottom: 'var(--spacing-sm)', display: 'inline-block' }}>
              {product.category}
            </span>
            
            <h1 style={{ 
              fontSize: 'var(--font-size-4xl)', 
              fontWeight: 700, 
              marginBottom: 'var(--spacing-md)',
              lineHeight: 1.2
            }}>
              {product.name}
            </h1>

            <p style={{ 
              fontSize: 'var(--font-size-2xl)', 
              fontWeight: 700, 
              color: 'var(--color-accent-secondary)',
              marginBottom: 'var(--spacing-xl)'
            }}>
              ${product.price}
            </p>

            {/* Tabs */}
            <div className="flex gap-md mb-lg">
              <motion.button
                className={`btn ${activeTab === 'description' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: 'var(--spacing-sm) var(--spacing-lg)' }}
                onClick={() => setActiveTab('description')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('description')}
              </motion.button>
              <motion.button
                className={`btn ${activeTab === 'details' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: 'var(--spacing-sm) var(--spacing-lg)' }}
                onClick={() => setActiveTab('details')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('details')}
              </motion.button>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: 'var(--spacing-xl)', minHeight: '150px' }}
            >
              {activeTab === 'description' ? (
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: 1.8,
                  fontSize: 'var(--font-size-lg)'
                }}>
                  {product.description}
                </p>
              ) : (
                <ul style={{ 
                  listStyle: 'none', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 'var(--spacing-sm)' 
                }}>
                  {product.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 'var(--spacing-sm)',
                        color: 'var(--color-text-secondary)'
                      }}
                    >
                      <span style={{ color: 'var(--color-accent-primary)' }}>✓</span>
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Stock */}
            <p style={{ 
              marginBottom: 'var(--spacing-lg)',
              color: product.stock > 10 ? 'var(--color-success)' : 'var(--color-warning)'
            }}>
              {product.stock > 10 ? `✓ In Stock (${product.stock} available)` : `⚠ Only ${product.stock} left!`}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-lg" style={{ alignItems: 'center' }}>
              <div 
                className="flex"
                style={{ 
                  background: 'var(--glass-bg)', 
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <motion.button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ 
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    fontSize: 'var(--font-size-xl)',
                    color: 'var(--color-text-primary)'
                  }}
                  whileHover={{ background: 'var(--color-bg-glass-hover)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  −
                </motion.button>
                <span style={{ 
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  fontSize: 'var(--font-size-lg)',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <motion.button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  style={{ 
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    fontSize: 'var(--font-size-xl)',
                    color: 'var(--color-text-primary)'
                  }}
                  whileHover={{ background: 'var(--color-bg-glass-hover)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  +
                </motion.button>
              </div>

              <AnimatedButton 
                variant="primary" 
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', padding: 'var(--spacing-md) var(--spacing-xl)' }}
                onClick={() => addToCart({ id: product.id, name: product.name, price: product.price }, quantity)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.4rem', height: '1.4rem' }}>
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span style={{ fontWeight: 600 }}>${(product.price * quantity).toFixed(2)}</span>
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
