import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const { variantId, quantity = 1 } = await request.json();

    if (!variantId) {
      return NextResponse.json(
        { error: 'Variant ID is required' },
        { status: 400 }
      );
    }

    const cart = await createCart(variantId, quantity);

    if (!cart) {
      return NextResponse.json(
        { error: 'Failed to create cart' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: cart.checkoutUrl,
      cartId: cart.id,
    });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}