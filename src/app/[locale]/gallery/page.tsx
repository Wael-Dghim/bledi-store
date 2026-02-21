'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedCard, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedCard';
import { Link } from '@/i18n/navigation';
import { templates, getTemplatesByCategory } from '@/data/templates';
import { resinColors, getStandardColors, getPremiumColors } from '@/data/resin-colors';

export default function GalleryPage() {
  const locale = useLocale();

  const content = {
    title: {
      en: 'Inspiration Gallery',
      ar: 'معرض الإلهام',
      fr: 'Galerie d\'Inspiration',
    },
    subtitle: {
      en: 'Explore our handcrafted olive wood and resin creations. Each piece is unique - use these as inspiration for your own custom design.',
      ar: 'استكشف إبداعاتنا من خشب الزيتون والراتنج المصنوعة يدوياً. كل قطعة فريدة - استخدم هذه كإلهام لتصميمك المخصص.',
      fr: 'Explorez nos créations artisanales en bois d\'olivier et résine. Chaque pièce est unique - utilisez-les comme inspiration pour votre design personnalisé.',
    },
    templates: {
      en: 'Wood Templates',
      ar: 'قوالب الخشب',
      fr: 'Modèles de Bois',
    },
    colors: {
      en: 'Resin Colors',
      ar: 'ألوان الراتنج',
      fr: 'Couleurs de Résine',
    },
    standardColors: {
      en: 'Standard Collection',
      ar: 'المجموعة القياسية',
      fr: 'Collection Standard',
    },
    premiumColors: {
      en: 'Premium Collection',
      ar: 'المجموعة المميزة',
      fr: 'Collection Premium',
    },
    startingAt: {
      en: 'Starting at',
      ar: 'يبدأ من',
      fr: 'À partir de',
    },
    sizes: {
      en: 'sizes',
      ar: 'أحجام',
      fr: 'tailles',
    },
    customize: {
      en: 'Customize This',
      ar: 'خصص هذا',
      fr: 'Personnaliser',
    },
    ctaTitle: {
      en: 'Ready to Create Your Own?',
      ar: 'مستعد لإنشاء قطعتك الخاصة؟',
      fr: 'Prêt à Créer le Vôtre?',
    },
    ctaButton: {
      en: 'Start Designing',
      ar: 'ابدأ التصميم',
      fr: 'Commencer',
    },
  };

  const getText = <T extends Record<string, string>>(obj: T): string => {
    return obj[locale as keyof T] || obj['en' as keyof T];
  };

  const getTemplateName = (template: typeof templates[0]) => {
    if (locale === 'ar') return template.nameAr;
    if (locale === 'fr') return template.nameFr;
    return template.name;
  };

  const getTemplateDesc = (template: typeof templates[0]) => {
    if (locale === 'ar') return template.descriptionAr;
    if (locale === 'fr') return template.descriptionFr;
    return template.description;
  };

  const getColorName = (color: typeof resinColors[0]) => {
    if (locale === 'ar') return color.nameAr;
    if (locale === 'fr') return color.nameFr;
    return color.name;
  };

  const categoryEmojis: Record<string, string> = {
    'serving-board': '🍽️',
    'coaster': '☕',
    'clock': '🕐',
    'tray': '🫖',
  };

  const standardColors = getStandardColors();
  const premiumColors = getPremiumColors();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      {/* Hero */}
      <section style={{
        padding: 'calc(80px + var(--spacing-2xl)) 0 var(--spacing-2xl)',
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%)',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '0 var(--spacing-sm)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{
              fontSize: 'clamp(1.75rem, 5vw, var(--font-size-4xl))',
              fontWeight: 700,
              marginBottom: 'var(--spacing-md)',
            }}>
              <span className="gradient-text">{getText(content.title)}</span>
            </h1>
            <p style={{
              fontSize: 'clamp(var(--font-size-base), 2vw, var(--font-size-lg))',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}>
              {getText(content.subtitle)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="section">
        <div className="container">
          <motion.h2
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 700,
              marginBottom: 'var(--spacing-xl)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span>🪵</span>
            <span className="gradient-text">{getText(content.templates)}</span>
          </motion.h2>

          <StaggerContainer
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: 'var(--spacing-lg)',
            }}
            staggerDelay={0.1}
          >
            {templates.map((template) => {
              const minPrice = template.basePrice;

              return (
                <StaggerItem key={template.id}>
                  <AnimatedCard style={{ height: '100%', overflow: 'hidden' }}>
                    {/* Image placeholder with emoji */}
                    <div style={{
                      height: '200px',
                      background: 'linear-gradient(135deg, #8B7355, #A0826D, #6B5344)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <span style={{ fontSize: '72px', opacity: 0.8 }}>
                        {categoryEmojis[template.category] || '🪵'}
                      </span>
                      {/* Simulated resin overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '40%',
                        background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.6), rgba(0, 191, 255, 0.4))',
                        mixBlendMode: 'multiply',
                      }} />
                    </div>

                    <div style={{ padding: 'var(--spacing-lg)' }}>
                      <h3 style={{
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}>
                        {getTemplateName(template)}
                      </h3>

                      <p style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.5,
                        marginBottom: 'var(--spacing-md)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {getTemplateDesc(template)}
                      </p>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-md)',
                      }}>
                        <div>
                          <span style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-tertiary)',
                          }}>
                            {getText(content.startingAt)}
                          </span>
                          <span style={{
                            fontSize: 'var(--font-size-xl)',
                            fontWeight: 700,
                            color: 'var(--color-accent-primary)',
                            marginLeft: 'var(--spacing-xs)',
                          }}>
                            ${minPrice}
                          </span>
                        </div>
                        <span style={{
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-tertiary)',
                          background: 'var(--color-bg-tertiary)',
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                        }}>
                          {template.sizes.length} {getText(content.sizes)}
                        </span>
                      </div>

                      <Link href="/configure" style={{ display: 'block' }}>
                        <AnimatedButton
                          variant="secondary"
                          style={{
                            width: '100%',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                          }}
                        >
                          {getText(content.customize)}
                        </AnimatedButton>
                      </Link>
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Colors Section */}
      <section className="section" style={{
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <div className="container">
          <motion.h2
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 700,
              marginBottom: 'var(--spacing-xl)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span>🎨</span>
            <span className="gradient-text">{getText(content.colors)}</span>
          </motion.h2>

          {/* Standard Colors */}
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h3 style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-lg)',
            }}>
              {getText(content.standardColors)}
            </h3>

            <motion.div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--spacing-lg)',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {standardColors.map((color, index) => (
                <motion.div
                  key={color.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)',
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                      border: '4px solid var(--color-bg-primary)',
                    }}
                    whileHover={{ scale: 1.15, y: -5 }}
                  />
                  <span style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center',
                    maxWidth: '70px',
                  }}>
                    {getColorName(color)}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Premium Colors */}
          <div>
            <h3 style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
            }}>
              {getText(content.premiumColors)}
              <span style={{
                fontSize: 'var(--font-size-xs)',
                padding: '2px 8px',
                background: 'linear-gradient(135deg, var(--color-accent-primary), #e5c76b)',
                color: 'var(--color-bg-primary)',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
              }}>
                Premium
              </span>
            </h3>
            <p style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-tertiary)',
              marginBottom: 'var(--spacing-lg)',
            }}>
              {locale === 'ar'
                ? 'ألوان مميزة مع تأثيرات معدنية ولؤلؤية'
                : locale === 'fr'
                ? 'Couleurs premium avec effets métalliques et nacrés'
                : 'Premium colors with metallic and pearlescent effects'}
            </p>

            <motion.div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--spacing-lg)',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {premiumColors.map((color, index) => (
                <motion.div
                  key={color.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)',
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                >
                  <motion.div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                      border: '3px dashed var(--color-accent-primary)',
                      position: 'relative',
                    }}
                    whileHover={{ scale: 1.15, y: -5 }}
                  >
                    <span style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: 'var(--color-accent-primary)',
                      background: 'var(--color-bg-primary)',
                      padding: '1px 4px',
                      borderRadius: 'var(--radius-sm)',
                      whiteSpace: 'nowrap',
                    }}>
                      +${color.priceModifier}
                    </span>
                  </motion.div>
                  <span style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center',
                    maxWidth: '70px',
                  }}>
                    {getColorName(color)}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ padding: 'var(--spacing-3xl) 0' }}>
        <div className="container">
          <motion.div
            style={{
              textAlign: 'center',
              maxWidth: '600px',
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
            <h2 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 700,
              marginBottom: 'var(--spacing-lg)',
            }}>
              <span className="gradient-text">{getText(content.ctaTitle)}</span>
            </h2>

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
                {getText(content.ctaButton)}
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
