'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useCart } from '@/context/CartContext';

export function Header() {
  const locale = useLocale();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navContent = {
    siteName: {
      en: 'Olive & Resin',
      ar: 'زيتون وراتنج',
      fr: 'Olivier & Résine',
    },
    home: { en: 'Home', ar: 'الرئيسية', fr: 'Accueil' },
    create: { en: 'Create', ar: 'صمم', fr: 'Créer' },
    gallery: { en: 'Gallery', ar: 'المعرض', fr: 'Galerie' },
    cart: { en: 'Cart', ar: 'السلة', fr: 'Panier' },
  };

  const getText = (obj: Record<string, string>) => obj[locale] || obj['en'];

  const navLinks = [
    { href: '/', label: getText(navContent.home) },
    { href: '/configure', label: getText(navContent.create), highlight: true },
    { href: '/gallery', label: getText(navContent.gallery) },
    { href: '/cart', label: getText(navContent.cart), isCart: true },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
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
                {getText(navContent.siteName)}
              </Link>
            </motion.div>

            {!isMobile && (
              <nav className="nav">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    style={{ position: 'relative' }}
                  >
                    <Link
                      href={link.href}
                      className="nav-link"
                      style={link.highlight ? {
                        background: 'linear-gradient(135deg, var(--color-accent-primary), #e5c76b)',
                        color: 'var(--color-bg-primary)',
                        padding: '6px 16px',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 600,
                      } : undefined}
                    >
                      {link.label}
                      {link.isCart && totalItems > 0 && (
                        <motion.span
                          key={totalItems}
                          layout
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
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
                            border: '2px solid var(--color-bg-primary)',
                            zIndex: 10
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          {totalItems}
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            )}

            <motion.div
              className="flex flex-center gap-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {!isMobile && <ThemeToggle />}
              {!isMobile && <LanguageSwitcher />}

              {isMobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <Link href="/cart" style={{ position: 'relative', padding: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    {totalItems > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        background: '#ff6b6b',
                        color: 'white',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {totalItems}
                      </span>
                    )}
                  </Link>

                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                      padding: '8px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                    aria-label="Toggle menu"
                  >
                    <motion.span
                      style={{
                        display: 'block',
                        width: '24px',
                        height: '2px',
                        background: 'var(--color-text-primary)',
                        borderRadius: '2px',
                      }}
                      animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    />
                    <motion.span
                      style={{
                        display: 'block',
                        width: '24px',
                        height: '2px',
                        background: 'var(--color-text-primary)',
                        borderRadius: '2px',
                      }}
                      animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    />
                    <motion.span
                      style={{
                        display: 'block',
                        width: '24px',
                        height: '2px',
                        background: 'var(--color-text-primary)',
                        borderRadius: '2px',
                      }}
                      animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998,
            }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(300px, 80vw)',
              background: 'var(--color-bg-primary)',
              zIndex: 999,
              padding: 'var(--spacing-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-lg)',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={closeMenu}
                style={{
                  padding: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    padding: 'var(--spacing-md)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: link.highlight ? 600 : 500,
                    color: link.highlight ? 'var(--color-accent-primary)' : 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-md)',
                    background: link.highlight ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {link.label}
                  {link.isCart && totalItems > 0 && (
                    <span style={{
                      background: '#ff6b6b',
                      color: 'white',
                      borderRadius: 'var(--radius-full)',
                      padding: '2px 8px',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'bold',
                    }}>
                      {totalItems}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-md) 0',
                borderTop: '1px solid var(--glass-border)',
              }}>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                  {locale === 'ar' ? 'المظهر' : locale === 'fr' ? 'Thème' : 'Theme'}
                </span>
                <ThemeToggle />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-md) 0',
                borderTop: '1px solid var(--glass-border)',
              }}>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                  {locale === 'ar' ? 'اللغة' : locale === 'fr' ? 'Langue' : 'Language'}
                </span>
                <LanguageSwitcher />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
