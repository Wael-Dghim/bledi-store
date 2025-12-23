/**
 * API Configuration for Third-Party Services
 * 
 * This file contains all configuration for external API endpoints.
 * Update these values based on your third-party API provider.
 */

export const apiConfig = {
    // Base URL for the third-party API
    baseUrl: process.env.EXTERNAL_API_URL || 'https://api.example.com/v1',

    // Authentication configuration - Disabled for now
    auth: {
        type: 'none' as const,
    },

    // Request timeout in milliseconds
    timeout: 30000,

    // Retry configuration
    retry: {
        maxRetries: 3,
        retryDelay: 1000, // Base delay in ms (exponential backoff)
        retryStatusCodes: [408, 429, 500, 502, 503, 504],
    },

    // Rate limiting (requests per minute)
    rateLimit: {
        maxRequests: 100,
        windowMs: 60000,
    },

    // Endpoints configuration
    endpoints: {
        products: {
            list: '/products',
            single: '/products/:id',
        },
        orders: {
            create: '/orders',
        },
    },
};

export type ApiConfig = typeof apiConfig;
