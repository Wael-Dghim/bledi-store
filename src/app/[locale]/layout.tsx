import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SnowEffect } from '@/components/ui/SnowEffect';
import { CartProvider } from '@/context/CartContext';
import { cookies } from 'next/headers';
import '@/app/globals.css';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('siteName'),
    description: 'Modern e-commerce platform',
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';

  // Validate locale
  if (!routing.locales.includes(locale as 'fr' | 'ar')) {
    notFound();
  }

  // Get direction based on locale
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // Fetch messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir} data-theme={theme} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <NextIntlClientProvider messages={messages}>
            <SnowEffect />
            <Header />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </CartProvider>
      </body>
    </html>
  );
}
