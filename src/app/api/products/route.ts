import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { apiConfig } from '@/lib/api-config';
import type { ProductListResponse, ProductFilters } from '@/lib/types';

/**
 * GET /api/products
 * 
 * Fetches all products from the third-party API
 * Supports filtering, pagination, and sorting
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Build query parameters from request
        const queryParams: ProductFilters = {};

        const category = searchParams.get('category');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const search = searchParams.get('search');
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');
        const sort = searchParams.get('sort');

        if (category) queryParams.category = category;
        if (minPrice) queryParams.minPrice = minPrice;
        if (maxPrice) queryParams.maxPrice = maxPrice;
        if (search) queryParams.search = search;
        if (page) queryParams.page = page;
        if (limit) queryParams.limit = limit;
        if (sort) queryParams.sort = sort as ProductFilters['sort'];

        // Fetch products from third-party API
        const response = await apiClient.get<ProductListResponse>(
            apiConfig.endpoints.products.list,
            { queryParams: queryParams as Record<string, string> }
        );

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);

        const apiError = error as { message?: string; status?: number };

        return NextResponse.json(
            {
                error: apiError.message || 'Failed to fetch products',
                code: 'PRODUCTS_FETCH_ERROR'
            },
            { status: apiError.status || 500 }
        );
    }
}
