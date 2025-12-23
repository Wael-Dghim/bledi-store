'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const localeNames: Record<Locale, string> = {
  fr: 'FR',
  ar: 'عربي'
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    // next-intl v3 router.replace should handle stripping the locale, 
    // but we use currentPathname from usePathname which is already stripped.
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="lang-switcher">
      {routing.locales.map((loc) => (
        <motion.button
          key={loc}
          className={`lang-btn ${locale === loc ? 'active' : ''}`}
          onClick={() => switchLocale(loc)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {localeNames[loc]}
        </motion.button>
      ))}
    </div>
  );
}
