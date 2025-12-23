'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ProductImageShuffleProps {
  images: string[];
  className?: string;
  fontSize?: string;
}

export function ProductImageShuffle({ images, className = '', fontSize = '6rem' }: ProductImageShuffleProps) {
  const [index, setIndex] = useState(0);

  // If only one image, just show it static
  if (!images.length) return null;
  if (images.length === 1) {
    return (
      <div 
        className={className} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: fontSize,
        }}
      >
        {images[0]}
      </div>
    );
  }

  // Auto-shuffle effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Slower interval for premium feel
    return () => clearInterval(timer);
  }, [images.length]);

  const frontImage = images[index];
  const nextImage = images[(index + 1) % images.length];
  const thirdImage = images[(index + 2) % images.length];

  return (
    <div 
      className={className} 
      style={{ 
        position: 'relative', 
        perspective: 2500,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        transformStyle: 'preserve-3d',
        width: '100%',
        height: '100%'
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <Card key={index} emoji={frontImage} index={0} fontSize={fontSize} />
        <Card key={(index + 1) % images.length} emoji={nextImage} index={1} fontSize={fontSize} />
        <Card key={(index + 2) % images.length} emoji={thirdImage} index={2} fontSize={fontSize} />
      </AnimatePresence>
    </div>
  );
}

function Card({ emoji, index, fontSize }: { emoji: string; index: number; fontSize: string }) {
  const isFront = index === 0;
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '75%',
        height: '75%',
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: fontSize,
        boxShadow: isFront ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        border: '1px solid var(--border-light)',
        zIndex: 10 - index,
      }}
      initial={{ 
        scale: 0.6,
        x: 200,
        opacity: 0,
        rotateY: 30,
        z: -300
      }}
      animate={{ 
        scale: isFront ? 1 : 0.85 - (index * 0.08),
        x: isFront ? 0 : 60 + (index * 25), 
        y: isFront ? 0 : -15 * index,
        opacity: 1 - (index * 0.3),
        rotateY: isFront ? 0 : -25,
        z: -index * 200,
      }}
      exit={{ 
        x: 0, 
        y: 40,
        z: -1000,
        opacity: 0, 
        scale: 0.4, 
        rotateY: 0,
        transition: { 
          duration: 3, 
          ease: "easeInOut"
        } 
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 1.5
      }}
    >
      <motion.span
        animate={isFront ? { 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {emoji}
      </motion.span>
    </motion.div>
  );
}
