'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useCart } from '@/context/CartContext';

export function Header() {
  const t = useTranslations('common');
  const { totalItems } = useCart();

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/products', label: t('products') },
    { href: '/cart', label: t('cart'), isCart: true },
  ];

  return (
    <motion.header
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="header-inner">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="logo gradient-text">
              {t('siteName')}
            </Link>
          </motion.div>

          <nav className="nav">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                style={{ position: 'relative' }}
              >
                <Link href={link.href} className="nav-link">
                  {link.label}
                  {link.isCart && totalItems >= 0 && (
                    <motion.span
                      key={totalItems}
                      layout
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="cart-badge"
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-14px',
                        background: '#ff6b6b',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 6px rgba(255,107,107,0.3)',
                        border: '2px solid white',
                        zIndex: 10
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                      }}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <LanguageSwitcher />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
