import { NextRequest, NextResponse } from 'next/server';
import { createCart, addToCart, getCart } from '@/lib/shopify';
import { cookies } from 'next/headers';

const CART_COOKIE = 'ishkel_cart_id';

// ─── Helper: normalize cart lines (nodes → array with images) ───────────────
function normalizeCart(cart: any) {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity ?? cart.lines?.nodes?.reduce(
      (acc: number, l: any) => acc + l.quantity, 0
    ) ?? 0,
    cost: cart.cost,
    lines: cart.lines?.nodes || [],
  };
}

// ─── POST: Add to cart ───────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const existingCartId = cookieStore.get(CART_COOKIE)?.value;

    // ✅ Handle quantity update (called by CartDrawer +/- buttons)
    if (body.action === 'update') {
      const { lineId, quantity } = body;
      if (!existingCartId) {
        return NextResponse.json({ error: 'No cart found' }, { status: 400 });
      }

      const { updateCartLine } = await import('@/lib/shopify');
      const cart = await updateCartLine(existingCartId, lineId, quantity);

      if (!cart) {
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
      }

      return NextResponse.json({ success: true, cart: normalizeCart(cart) });
    }

    // ✅ Handle add to cart
    const { variantId, quantity = 1 } = body;
    if (!variantId) {
      return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
    }

    let cart;
    if (existingCartId) {
      const existing = await getCart(existingCartId);
      cart = existing
        ? await addToCart(existingCartId, variantId, quantity)
        : await createCart(variantId, quantity);
    } else {
      cart = await createCart(variantId, quantity);
    }

    if (!cart) {
      return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
    }

    // ✅ After mutation, re-fetch with getCart so images are included
    const fullCart = await getCart(cart.id);

    const response = NextResponse.json({
      success: true,
      cart: normalizeCart(fullCart ?? cart),
    });

    response.cookies.set(CART_COOKIE, cart.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── GET: Fetch cart ─────────────────────────────────────────────────────────
export async function GET() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE)?.value;

    if (!cartId) return NextResponse.json({ cart: null });

    const cart = await getCart(cartId);
    if (!cart) return NextResponse.json({ cart: null });

    return NextResponse.json({ cart: normalizeCart(cart) });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json({ cart: null });
  }
}