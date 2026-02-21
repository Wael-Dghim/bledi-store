'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ProductConfigurator } from '@/components/configurator';
import styles from './configure.module.css';

export default function ConfigurePage() {
  const locale = useLocale();

  const getPageTitle = () => {
    if (locale === 'ar') return 'صمم قطعتك الفريدة';
    if (locale === 'fr') return 'Créez Votre Pièce Unique';
    return 'Create Your Unique Piece';
  };

  const getPageSubtitle = () => {
    if (locale === 'ar') return 'صمم قطعة من خشب الزيتون والراتنج المصنوعة يدوياً وفقاً لرؤيتك';
    if (locale === 'fr') return 'Concevez une pièce artisanale en bois d\'olivier et résine selon votre vision';
    return 'Design a handcrafted olive wood and resin piece according to your vision';
  };

  return (
    <div className={styles.configurePage}>
      <section className={styles.configureHero}>
        <div className="container">
          <motion.div
            className={styles.configureHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.configureTitle}>{getPageTitle()}</h1>
            <p className={styles.configureSubtitle}>{getPageSubtitle()}</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.configureContent}>
        <ProductConfigurator locale={locale} />
      </section>
    </div>
  );
}
