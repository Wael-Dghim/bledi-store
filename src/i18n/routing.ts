import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // Supported locales
    locales: ['fr', 'ar'],

    // Default locale (French)
    defaultLocale: 'fr',

    // Locale prefix strategy
    localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];
