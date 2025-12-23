import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { apiConfig } from '@/lib/api-config';
import type { Product } from '@/lib/types';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/products/[id]
 * 
 * Fetches a single product by ID from the third-party API
 */
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required', code: 'MISSING_PRODUCT_ID' },
                { status: 400 }
            );
        }

        // Fetch single product from third-party API
        const response = await apiClient.get<Product>(
            apiConfig.endpoints.products.single,
            { pathParams: { id } }
        );

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching product:', error);

        const apiError = error as { message?: string; status?: number };

        // Handle 404 specifically
        if (apiError.status === 404) {
            return NextResponse.json(
                { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                error: apiError.message || 'Failed to fetch product',
                code: 'PRODUCT_FETCH_ERROR'
            },
            { status: apiError.status || 500 }
        );
    }
}
