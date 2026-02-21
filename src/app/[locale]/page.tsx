'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedCard, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedCard';
import { Link } from '@/i18n/navigation';
import { templates } from '@/data/templates';
import { resinColors } from '@/data/resin-colors';

export default function HomePage() {
  const locale = useLocale();

  // Localized content
  const content = {
    hero: {
      title: {
        en: 'Artisan Olive Wood & Resin',
        ar: 'خشب الزيتون والراتنج الحرفي',
        fr: 'Bois d\'Olivier & Résine Artisanal',
      },
      subtitle: {
        en: 'Create your own unique piece. Each item is handcrafted to your exact specifications, blending natural olive wood grain with custom resin art.',
        ar: 'أنشئ قطعتك الفريدة الخاصة. كل قطعة مصنوعة يدوياً وفقاً لمواصفاتك الدقيقة، تجمع بين حبيبات خشب الزيتون الطبيعية وفن الراتنج المخصص.',
        fr: 'Créez votre pièce unique. Chaque article est fabriqué à la main selon vos spécifications exactes, alliant le grain naturel du bois d\'olivier à l\'art de la résine personnalisée.',
      },
      cta: {
        en: 'Design Your Piece',
        ar: 'صمم قطعتك',
        fr: 'Créez Votre Pièce',
      },
      ctaSecondary: {
        en: 'View Gallery',
        ar: 'عرض المعرض',
        fr: 'Voir la Galerie',
      },
    },
    process: {
      title: {
        en: 'The Bespoke Process',
        ar: 'عملية التصميم المخصص',
        fr: 'Le Processus Sur Mesure',
      },
      steps: [
        {
          icon: '🪵',
          title: { en: 'Choose Your Wood', ar: 'اختر خشبك', fr: 'Choisissez Votre Bois' },
          desc: {
            en: 'Select from our curated olive wood templates, each with unique grain patterns',
            ar: 'اختر من قوالب خشب الزيتون المختارة، كل منها بأنماط حبيبات فريدة',
            fr: 'Sélectionnez parmi nos modèles de bois d\'olivier, chacun avec des motifs de grain uniques',
          },
        },
        {
          icon: '🎨',
          title: { en: 'Design Your Resin', ar: 'صمم راتنجك', fr: 'Concevez Votre Résine' },
          desc: {
            en: 'Pick colors, coverage ratio, and transparency for your custom resin river',
            ar: 'اختر الألوان ونسبة التغطية والشفافية لنهر الراتنج المخصص',
            fr: 'Choisissez les couleurs, le ratio de couverture et la transparence pour votre rivière de résine',
          },
        },
        {
          icon: '✍️',
          title: { en: 'Add Personalization', ar: 'أضف التخصيص', fr: 'Ajoutez une Personnalisation' },
          desc: {
            en: 'Engrave your name, date, or message with elegant typography',
            ar: 'انقش اسمك أو تاريخك أو رسالتك بطباعة أنيقة',
            fr: 'Gravez votre nom, date ou message avec une typographie élégante',
          },
        },
        {
          icon: '📦',
          title: { en: 'Crafted & Delivered', ar: 'مصنوعة ومُسلّمة', fr: 'Fabriqué & Livré' },
          desc: {
            en: 'Your unique piece is handcrafted and delivered to your door',
            ar: 'قطعتك الفريدة مصنوعة يدوياً ومُسلّمة إلى بابك',
            fr: 'Votre pièce unique est fabriquée à la main et livrée à votre porte',
          },
        },
      ],
    },
    categories: {
      title: {
        en: 'What Will You Create?',
        ar: 'ماذا ستصنع؟',
        fr: 'Que Créerez-Vous?',
      },
    },
    colors: {
      title: {
        en: 'Explore Our Resin Palette',
        ar: 'استكشف لوحة الراتنج لدينا',
        fr: 'Explorez Notre Palette de Résine',
      },
      subtitle: {
        en: 'From ocean blues to forest greens, find the perfect color for your creation',
        ar: 'من الأزرق المحيطي إلى الأخضر الغابوي، اعثر على اللون المثالي لإبداعك',
        fr: 'Du bleu océan au vert forêt, trouvez la couleur parfaite pour votre création',
      },
    },
    cta: {
      title: {
        en: 'Ready to Create Something Unique?',
        ar: 'مستعد لإنشاء شيء فريد؟',
        fr: 'Prêt à Créer Quelque Chose d\'Unique?',
      },
      subtitle: {
        en: 'Start designing your custom olive wood and resin piece today',
        ar: 'ابدأ تصميم قطعة خشب الزيتون والراتنج المخصصة اليوم',
        fr: 'Commencez à concevoir votre pièce personnalisée en bois d\'olivier et résine aujourd\'hui',
      },
      button: {
        en: 'Start Designing',
        ar: 'ابدأ التصميم',
        fr: 'Commencer la Conception',
      },
    },
  };

  const getText = <T extends Record<string, string>>(obj: T): string => {
    const key = locale as keyof T;
    return obj[key] || obj['en' as keyof T];
  };

  // Get unique categories from templates
  const categories = Array.from(new Set(templates.map(t => t.category)));
  const categoryInfo: Record<string, { emoji: string; name: { en: string; ar: string; fr: string } }> = {
    'serving-board': { emoji: '🍽️', name: { en: 'Serving Boards', ar: 'ألواح التقديم', fr: 'Planches de Service' } },
    'coaster': { emoji: '☕', name: { en: 'Coaster Sets', ar: 'مجموعات القواعد', fr: 'Ensembles de Sous-verres' } },
    'clock': { emoji: '🕐', name: { en: 'Wall Clocks', ar: 'ساعات الحائط', fr: 'Horloges Murales' } },
    'tray': { emoji: '🫖', name: { en: 'Serving Trays', ar: 'صواني التقديم', fr: 'Plateaux de Service' } },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-content" style={{ maxWidth: '800px' }}>
          <motion.span
            style={{
              display: 'inline-block',
              padding: 'var(--spacing-xs) var(--spacing-md)',
              background: 'rgba(212, 175, 55, 0.2)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-accent-primary)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              marginBottom: 'var(--spacing-lg)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {locale === 'ar' ? '🎨 أتيليه حرفي' : locale === 'fr' ? '🎨 Atelier Artisanal' : '🎨 Bespoke Atelier'}
          </motion.span>

          <motion.h1
            className="hero-title"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {getText(content.hero.title)}
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            style={{ fontSize: 'var(--font-size-lg)', maxWidth: '600px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {getText(content.hero.subtitle)}
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/configure">
              <AnimatedButton
                variant="primary"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent-primary), #e5c76b)',
                  color: 'var(--color-bg-primary)',
                  padding: 'var(--spacing-md) var(--spacing-2xl)',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 600,
                }}
              >
                {getText(content.hero.cta)}
              </AnimatedButton>
            </Link>
            <Link href="/gallery">
              <AnimatedButton
                variant="secondary"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: 'var(--spacing-md) var(--spacing-2xl)',
                }}
              >
                {getText(content.hero.ctaSecondary)}
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: -1,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 115, 85, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
            zIndex: -1,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </section>

      {/* Process Section */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <motion.h2
            className="text-center mb-xl"
            style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">{getText(content.process.title)}</span>
          </motion.h2>

          <StaggerContainer className="grid grid-4" staggerDelay={0.15}>
            {content.process.steps.map((step, index) => (
              <StaggerItem key={index}>
                <AnimatedCard className="flex flex-col flex-center text-center p-xl" style={{ height: '100%' }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: 'var(--spacing-md)',
                  }}>
                    {step.icon}
                  </div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--color-accent-primary)',
                    color: 'var(--color-bg-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--spacing-md)',
                  }}>
                    {index + 1}
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--spacing-sm)' }}>
                    {getText(step.title)}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
                    {getText(step.desc)}
                  </p>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <motion.h2
            className="text-center mb-xl"
            style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">{getText(content.categories.title)}</span>
          </motion.h2>

          <StaggerContainer className="grid grid-4" staggerDelay={0.1}>
            {categories.map((category) => {
              const info = categoryInfo[category];
              const categoryTemplates = templates.filter(t => t.category === category);
              const startingPrice = Math.min(...categoryTemplates.map(t => t.basePrice));

              return (
                <StaggerItem key={category}>
                  <Link href="/configure" style={{ textDecoration: 'none' }}>
                    <AnimatedCard
                      className="p-xl"
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>
                        {info.emoji}
                      </div>
                      <h3 style={{
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}>
                        {getText(info.name)}
                      </h3>
                      <p style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-tertiary)',
                        marginBottom: 'var(--spacing-sm)',
                      }}>
                        {categoryTemplates.length} {locale === 'ar' ? 'تصميم' : locale === 'fr' ? 'modèles' : 'designs'}
                      </p>
                      <p style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-accent-primary)',
                        fontWeight: 600,
                      }}>
                        {locale === 'ar' ? 'يبدأ من' : locale === 'fr' ? 'À partir de' : 'Starting at'} ${startingPrice}
                      </p>
                    </AnimatedCard>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Color Palette Preview */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <motion.div
            className="text-center mb-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, marginBottom: 'var(--spacing-sm)' }}>
              <span className="gradient-text">{getText(content.colors.title)}</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
              {getText(content.colors.subtitle)}
            </p>
          </motion.div>

          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--spacing-md)',
              flexWrap: 'wrap',
              marginBottom: 'var(--spacing-xl)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {resinColors.slice(0, 10).map((color, index) => (
              <motion.div
                key={color.id}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  border: '3px solid var(--color-bg-primary)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.15, y: -5 }}
              />
            ))}
            <motion.div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary))',
                border: '3px dashed var(--color-text-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-tertiary)',
                fontSize: 'var(--font-size-lg)',
              }}
              whileHover={{ scale: 1.1 }}
            >
              +{resinColors.length - 10}
            </motion.div>
          </motion.div>

          <div className="flex flex-center">
            <Link href="/configure">
              <AnimatedButton variant="secondary" style={{ padding: 'var(--spacing-md) var(--spacing-2xl)' }}>
                {locale === 'ar' ? 'استكشف جميع الألوان' : locale === 'fr' ? 'Explorer Toutes les Couleurs' : 'Explore All Colors'}
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" style={{ paddingTop: 'var(--spacing-3xl)', paddingBottom: 'var(--spacing-3xl)' }}>
        <div className="container">
          <motion.div
            style={{
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
              padding: 'var(--spacing-2xl)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--glass-border)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>
              <span className="gradient-text">{getText(content.cta.title)}</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)', fontSize: 'var(--font-size-base)' }}>
              {getText(content.cta.subtitle)}
            </p>
            <Link href="/configure">
              <AnimatedButton
                variant="primary"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent-primary), #e5c76b)',
                  color: 'var(--color-bg-primary)',
                  padding: 'var(--spacing-md) var(--spacing-3xl)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 600,
                }}
              >
                {getText(content.cta.button)}
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
