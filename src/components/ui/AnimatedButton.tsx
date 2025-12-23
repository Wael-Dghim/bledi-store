'use client';

import { motion } from 'framer-motion';
import { ReactNode, MouseEvent, useState } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function AnimatedButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  style = {}
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);

    onClick?.();
  };

  return (
    <motion.button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.4)',
            pointerEvents: 'none'
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {children}
    </motion.button>
  );
}

interface AnimatedLinkButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function AnimatedLinkButton({
  children,
  href,
  className = '',
  variant = 'primary'
}: AnimatedLinkButtonProps) {
  return (
    <motion.a
      href={href}
      className={`btn btn-${variant} ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
}
