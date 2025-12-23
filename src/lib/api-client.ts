/**
 * API Client for Third-Party Services
 * 
 * A robust HTTP client with:
 * - Automatic authentication
 * - Request/response interceptors
 * - Retry logic with exponential backoff
 * - Error handling and logging
 */

import { apiConfig } from './api-config';

// Types
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export interface ApiError {
    message: string;
    status: number;
    code?: string;
    details?: Record<string, unknown>;
}

export interface RequestOptions {
    headers?: Record<string, string>;
    timeout?: number;
    retries?: number;
    cache?: RequestCache;
}

// Sleep utility for retry delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Build authentication headers based on config
 * Disabled for now as per user request
 */
function getAuthHeaders(): Record<string, string> {
    return {};
}

/**
 * Build full URL from endpoint path
 */
function buildUrl(path: string, params?: Record<string, string>): string {
    let url = `${apiConfig.baseUrl}${path}`;

    // Replace path parameters
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`:${key}`, encodeURIComponent(value));
        });
    }

    return url;
}

/**
 * Parse API error response
 */
async function parseError(response: Response): Promise<ApiError> {
    try {
        const data = await response.json();
        return {
            message: data.message || data.error || 'An error occurred',
            status: response.status,
            code: data.code,
            details: data.details,
        };
    } catch {
        return {
            message: response.statusText || 'An error occurred',
            status: response.status,
        };
    }
}

/**
 * Main API request function with retry logic
 */
async function request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    options: RequestOptions & {
        body?: unknown;
        pathParams?: Record<string, string>;
        queryParams?: Record<string, string>;
    } = {}
): Promise<ApiResponse<T>> {
    const {
        headers = {},
        timeout = apiConfig.timeout,
        retries = apiConfig.retry.maxRetries,
        cache = 'no-store',
        body,
        pathParams,
        queryParams,
    } = options;

    let url = buildUrl(path, pathParams);

    // Add query parameters
    if (queryParams) {
        const searchParams = new URLSearchParams(queryParams);
        url += `?${searchParams.toString()}`;
    }

    const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...getAuthHeaders(),
        ...headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let lastError: ApiError | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, {
                method,
                headers: requestHeaders,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
                cache,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const error = await parseError(response);

                // Check if we should retry
                if (
                    attempt < retries &&
                    apiConfig.retry.retryStatusCodes.includes(response.status)
                ) {
                    lastError = error;
                    const delay = apiConfig.retry.retryDelay * Math.pow(2, attempt);
                    console.log(`Retrying request (attempt ${attempt + 1}/${retries}) after ${delay}ms`);
                    await sleep(delay);
                    continue;
                }

                throw error;
            }

            const data = await response.json();
            return {
                data,
                status: response.status,
            };
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof Error && error.name === 'AbortError') {
                throw {
                    message: 'Request timeout',
                    status: 408,
                    code: 'TIMEOUT',
                } as ApiError;
            }

            // If it's already an ApiError, throw it
            if ((error as ApiError).status) {
                throw error;
            }

            // Network or other error
            if (attempt < retries) {
                lastError = {
                    message: (error as Error).message || 'Network error',
                    status: 0,
                    code: 'NETWORK_ERROR',
                };
                const delay = apiConfig.retry.retryDelay * Math.pow(2, attempt);
                await sleep(delay);
                continue;
            }

            throw lastError || {
                message: (error as Error).message || 'An error occurred',
                status: 0,
                code: 'UNKNOWN_ERROR',
            };
        }
    }

    throw lastError || {
        message: 'Max retries exceeded',
        status: 0,
        code: 'MAX_RETRIES',
    };
}

/**
 * API Client with typed methods
 */
export const apiClient = {
    /**
     * GET request
     */
    get: <T>(path: string, options?: RequestOptions & {
        pathParams?: Record<string, string>;
        queryParams?: Record<string, string>;
    }) => request<T>('GET', path, options),

    /**
     * POST request
     */
    post: <T>(path: string, body?: unknown, options?: RequestOptions & {
        pathParams?: Record<string, string>;
        queryParams?: Record<string, string>;
    }) => request<T>('POST', path, { ...options, body }),

    /**
     * PUT request
     */
    put: <T>(path: string, body?: unknown, options?: RequestOptions & {
        pathParams?: Record<string, string>;
    }) => request<T>('PUT', path, { ...options, body }),

    /**
     * PATCH request
     */
    patch: <T>(path: string, body?: unknown, options?: RequestOptions & {
        pathParams?: Record<string, string>;
    }) => request<T>('PATCH', path, { ...options, body }),

    /**
     * DELETE request
     */
    delete: <T>(path: string, options?: RequestOptions & {
        pathParams?: Record<string, string>;
    }) => request<T>('DELETE', path, options),
};

export default apiClient;
