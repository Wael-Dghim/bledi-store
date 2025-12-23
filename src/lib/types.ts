/**
 * Type definitions for the e-commerce API
 */

// Product types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    category: string;
    stock: number;
    sku: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductListResponse {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export interface ProductFilters {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    page?: string;
    limit?: string;
    sort?: 'price_asc' | 'price_desc' | 'name' | 'created_at';
}

// Order types
export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface CreateOrderRequest {
    items: OrderItem[];
    shippingAddress: {
        firstName: string;
        lastName: string;
        address1: string;
        address2?: string;
        city: string;
        state?: string;
        postalCode: string;
        country: string;
        phone: string;
    };
    billingAddress?: {
        firstName: string;
        lastName: string;
        address1: string;
        address2?: string;
        city: string;
        state?: string;
        postalCode: string;
        country: string;
    };
    customerEmail: string;
    paymentMethod: string;
    notes?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: OrderItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    currency: string;
    shippingAddress: CreateOrderRequest['shippingAddress'];
    billingAddress?: CreateOrderRequest['billingAddress'];
    customerEmail: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderResponse {
    order: Order;
    message: string;
}
