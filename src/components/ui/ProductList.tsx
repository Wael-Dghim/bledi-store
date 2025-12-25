'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Product, ApiResponse } from '@/types/product';
import { ProductCard } from './ProductCard';
import { StaggerContainer, StaggerItem } from './AnimatedCard';
import { motion } from 'framer-motion';

// Simple in-memory cache
const productCache: Record<number, Product[]> = {};

interface ProductListProps {
  limit?: number;
  infinite?: boolean;
}

export function ProductList({ limit = 10, infinite = true }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const isInitialFetch = useRef(true);

  const fetchProducts = useCallback(async (pageNum: number) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await fetch(`https://bledistore.converty.shop/api/v1/products?page=${pageNum}&limit=${limit}`);
      const data: ApiResponse = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p._id));
          const newProducts = data.data.filter(p => !existingIds.has(p._id));
          
          const combined = [...prev, ...newProducts];
          // If not infinite, strictly respect the limit
          if (!infinite) {
            return combined.slice(0, limit);
          }
          return combined;
        });
        
        // If not infinite, we never have more
        setHasMore(infinite && data.data.length === limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, limit, infinite]);

  // Initial fetch
  useEffect(() => {
    if (isInitialFetch.current) {
      fetchProducts(1);
      isInitialFetch.current = false;
    }
  }, [fetchProducts]);

  // Observer for infinite scroll
  const lastProductRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || !infinite) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage(prev => {
          const next = prev + 1;
          fetchProducts(next);
          return next;
        });
      }
    }, {
      rootMargin: '100px'
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, infinite, fetchProducts]);

  return (
    <div className="product-list-container">
      <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-xl)' }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {loading && (
        <div className="flex flex-center mt-xl" style={{ width: '100%', minHeight: '100px' }}>
          <div className="loader" style={{
            width: "40px",
            height: "40px",
            border: "3px solid var(--color-bg-tertiary)",
            borderTop: "3px solid var(--color-accent-primary)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      {infinite && (
        <div 
          ref={lastProductRef} 
          style={{ 
            height: '10px', 
            margin: '10px 0',
            opacity: 0
          }} 
        />
      )}

      {infinite && !hasMore && products.length > 0 && (
        <div className="text-center mt-xl p-lg color-muted" style={{ opacity: 0.6 }}>
          You've reached the end of our collection
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
