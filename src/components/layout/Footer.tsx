'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const common = useTranslations('common');

  const footerLinks = {
    shop: [
      { href: '/products', label: common('products') },
      { href: '/products?category=new', label: 'New Arrivals' },
      { href: '/products?category=sale', label: 'Sale' },
    ],
    company: [
      { href: '/about', label: t('about') },
      { href: '/contact', label: t('contact') },
    ],
    legal: [
      { href: '/terms', label: t('terms') },
      { href: '/privacy', label: t('privacy') },
    ],
  };

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo gradient-text">
              {common('siteName')}
            </Link>
            <p>{t('subscribeText')}</p>
          </div>

          <div>
            <h4 className="footer-title">{common('products')}</h4>
            <ul className="footer-links">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-title">{t('about')}</h4>
            <ul className="footer-links">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </motion.footer>
  );
}
