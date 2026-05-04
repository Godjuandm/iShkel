import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify';

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json({
      products: products.map((product) => ({
        id: product.id,
        title: product.title,
        handle: product.handle,
        price: product.priceRange.minVariantPrice,
        image: product.images?.nodes?.[0],
      })),
    });
  } catch (error) {
    console.error('Upsells API error:', error);
    return NextResponse.json({ products: [] });
  }
}
