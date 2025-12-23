'use client';

import { motion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

export function AnimatedCard({ children, className = '', delay = 0, style }: AnimatedCardProps) {
  return (
    <motion.div
      className={`product-card ${className}`}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

export function AnimatedContainer({ children, className = '', delay = 0, style }: AnimatedContainerProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  style?: CSSProperties;
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.1, style }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function StaggerItem({ children, className = '', style }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
