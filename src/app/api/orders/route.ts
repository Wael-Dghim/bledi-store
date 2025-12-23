import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { apiConfig } from '@/lib/api-config';
import type { CreateOrderRequest, CreateOrderResponse } from '@/lib/types';

/**
 * POST /api/orders
 * 
 * Creates a new order via the third-party API
 */
export async function POST(request: Request) {
    try {
        const body = await request.json() as CreateOrderRequest;

        // Validate required fields
        if (!body.items || body.items.length === 0) {
            return NextResponse.json(
                { error: 'Order must contain at least one item', code: 'EMPTY_ORDER' },
                { status: 400 }
            );
        }

        if (!body.shippingAddress) {
            return NextResponse.json(
                { error: 'Shipping address is required', code: 'MISSING_SHIPPING_ADDRESS' },
                { status: 400 }
            );
        }

        if (!body.customerEmail) {
            return NextResponse.json(
                { error: 'Customer email is required', code: 'MISSING_CUSTOMER_EMAIL' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.customerEmail)) {
            return NextResponse.json(
                { error: 'Invalid email format', code: 'INVALID_EMAIL' },
                { status: 400 }
            );
        }

        // Validate order items
        for (const item of body.items) {
            if (!item.productId || item.quantity <= 0) {
                return NextResponse.json(
                    { error: 'Invalid order item', code: 'INVALID_ORDER_ITEM' },
                    { status: 400 }
                );
            }
        }

        // Create order via third-party API
        const response = await apiClient.post<CreateOrderResponse>(
            apiConfig.endpoints.orders.create,
            body
        );

        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);

        const apiError = error as { message?: string; status?: number; code?: string };

        // Handle specific error cases
        if (apiError.code === 'INSUFFICIENT_STOCK') {
            return NextResponse.json(
                { error: 'One or more items are out of stock', code: 'INSUFFICIENT_STOCK' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                error: apiError.message || 'Failed to create order',
                code: 'ORDER_CREATE_ERROR'
            },
            { status: apiError.status || 500 }
        );
    }
}
