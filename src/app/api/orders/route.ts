import { NextResponse } from 'next/server';
import { ConfigurationMeta } from '@/context/CartContext';

interface OrderItem {
  productName: string;
  price: number;
  quantity: number;
  isConfigured?: boolean;
  configuration?: ConfigurationMeta;
}

interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  customerEmail: string;
  notes?: string;
}

/**
 * POST /api/orders
 *
 * Creates a new order for bespoke configured items
 * In production, this would connect to a fulfillment system
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

    // Calculate total
    const total = body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // In production, you would:
    // 1. Save order to database
    // 2. Send confirmation email
    // 3. Notify fulfillment system
    // 4. Process payment

    // For now, return mock success response
    const orderResponse = {
      orderId,
      status: 'confirmed',
      items: body.items.map(item => ({
        ...item,
        isCustom: item.isConfigured || false,
      })),
      total,
      shippingAddress: body.shippingAddress,
      customerEmail: body.customerEmail,
      notes: body.notes,
      estimatedDelivery: '2-3 weeks (handcrafted to order)',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(orderResponse, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);

    return NextResponse.json(
      {
        error: 'Failed to create order',
        code: 'ORDER_CREATE_ERROR'
      },
      { status: 500 }
    );
  }
}
