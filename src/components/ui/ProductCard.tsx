'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import { AnimatedCard } from './AnimatedCard';
import { AnimatedButton } from './AnimatedButton';
import { useCart } from '@/context/CartContext';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const locale = useLocale();

  const hasDiscount = product.comparePrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) 
    : 0;

  const mainImage = product.images[0] || {
    sm: '',
    md: '',
    lg: ''
  };

  return (
    <AnimatedCard className="product-card p-md">
      <div className="product-image-container" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1', background: 'var(--color-bg-tertiary)' }}>
        <Link href={`/products/${product._id}`} style={{ display: 'block', height: '100%' }}>
          <Image
            src={mainImage.md || mainImage.lg || mainImage.sm}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
            className="product-img-hover"
          />
        </Link>
        
        {hasDiscount && (
          <div className="ribbon-container">
            <div className="ribbon-text">
              -{discountPercentage}%
            </div>
          </div>
        )}
      </div>

      <div className="product-info">
        <Link href={`/products/${product._id}`}>
          <h3 
            className="product-name" 
            title={product.name}
            style={{ 
              fontSize: 'var(--font-size-base)', 
              fontWeight: 600, 
              margin: 'var(--spacing-xs) 0',
              height: '3.6em', // increased height for 3 lines
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.2em'
            }}
          >
            {product.name}
          </h3>
        </Link>
        
        <div className="flex flex-between" style={{ alignItems: 'center', marginTop: 'var(--spacing-md)' }}>
          <div className="price-container" style={{ display: 'flex', flexDirection: 'column' }}>
            {hasDiscount && (
              <span className="compare-price" style={{ 
                fontSize: 'var(--font-size-xs)', 
                color: 'var(--color-text-muted)', 
                textDecoration: 'line-through' 
              }}>
                {product.comparePrice} TND
              </span>
            )}
            <span className="product-price" style={{ 
              fontSize: 'var(--font-size-lg)', 
              fontWeight: 700, 
              color: 'var(--color-accent-secondary)' 
            }}>
              {product.price} TND
            </span>
          </div>

          <AnimatedButton 
            variant="secondary" 
            style={{ padding: 'var(--spacing-xs)', minWidth: '40px', borderRadius: 'var(--radius-md)' }}
            onClick={() => addToCart({ id: product._id, name: product.name, price: product.price })}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.1rem', height: '1.1rem' }}>
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </AnimatedButton>
        </div>
      </div>

      <style jsx>{`
        .product-img-hover {
          transition: transform var(--transition-slow);
        }
        .product-card:hover .product-img-hover {
          transform: scale(1.05);
        }
        .ribbon-container {
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          overflow: hidden;
          z-index: 5;
          pointer-events: none;
        }
        .ribbon-text {
          position: absolute;
          top: 15px;
          right: -25px;
          width: 120px;
          padding: 8px 0;
          background: var(--color-accent-primary);
          color: #000;
          font-weight: 800;
          font-size: 0.75rem;
          text-align: center;
          transform: rotate(45deg);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          letter-spacing: 0.5px;
        }
      `}</style>
    </AnimatedCard>
  );
}
