const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, unknown>;
}

interface ShopifyImage {
  url: string;
  altText: string | null;
}

interface ShopifyPriceRange {
  minVariantPrice: {
    amount: string;
    currencyCode: string;
  };
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: ShopifyPriceRange;
  images: {
    nodes: ShopifyImage[];
  };
}

interface ShopifyProductsResponse {
  data: {
    products: {
      nodes: ShopifyProduct[];
    };
  };
  errors?: Array<{ message: string }>;
}

interface ShopifyProductResponse {
  data: {
    productByHandle: ShopifyProduct | null;
  };
  errors?: Array<{ message: string }>;
}

async function shopifyFetch<T>({ query, variables = {} }: ShopifyFetchParams): Promise<T> {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!result.ok) {
    console.error('Shopify fetch error:', result.status, result.statusText);
    throw new Error(`HTTP error! status: ${result.status}`);
  }

  return result.json();
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts {
      products(first: 10) {
        nodes {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            nodes {
              url
              altText
            }
          }
          variants(first: 5) {
            nodes {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<ShopifyProductsResponse>({ query });
    if (response.errors) {
      console.error('GraphQL errors:', response.errors);
      return [];
    }
    return response.data?.products?.nodes ?? [];
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          nodes {
            url
            altText
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<ShopifyProductResponse>({
      query,
      variables: { handle },
    });
    if (response.errors) {
      console.error('GraphQL errors:', response.errors);
      return null;
    }
    return response.data?.productByHandle ?? null;
  } catch (error) {
    console.error('Error in getProductByHandle:', error);
    return null;
  }
}

export async function getProductWithVariants(handle: string) {
  const query = `
    query getProductWithVariants($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          nodes {
            url
            altText
          }
        }
        variants(first: 10) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: { handle },
    });
    if (response.errors) {
      console.error('GraphQL errors:', response.errors);
      return null;
    }
    return response.data?.productByHandle ?? null;
  } catch (error) {
    console.error('Error in getProductWithVariants:', error);
    return null;
  }
}

export async function createCart(variantId: string, quantity: number = 1) {
  const query = `
    mutation createCart($variantId: ID!, $quantity: Int!) {
      cartCreate(input: {
        lines: [{ quantity: $quantity, merchandiseId: $variantId }]
      }) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            nodes {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: { variantId, quantity },
    });
    if (response.errors) {
      console.error('GraphQL errors:', response.errors);
      return null;
    }
    if (response.data?.cartCreate?.userErrors?.length > 0) {
      console.error('Cart errors:', response.data.cartCreate.userErrors);
      return null;
    }
    return response.data?.cartCreate?.cart ?? null;
  } catch (error) {
    console.error('Error in createCart:', error);
    return null;
  }
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const query = `
    mutation addToCart($cartId: ID!, $variantId: ID!, $quantity: Int!) {
      cartLinesAdd(cartId: $cartId, lines: [{ quantity: $quantity, merchandiseId: $variantId }]) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            nodes {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: { cartId, variantId, quantity },
    });
    if (response.errors) {
      console.error('GraphQL errors:', response.errors);
      return null;
    }
    return response.data?.cartLinesAdd?.cart ?? null;
  } catch (error) {
    console.error('Error in addToCart:', error);
    return null;
  }
}

// ✅ getCart — correctly closed, images included
export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 10) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                  images(first: 1) {
                    nodes {
                      url
                      altText
                    }
                  }
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: { cartId },
    });
    if (response.errors) {
      console.error('GraphQL errors:', response.errors);
      return null;
    }
    return response.data?.cart ?? null;
  } catch (error) {
    console.error('Error in getCart:', error);
    return null;
  }
} // ← getCart ends here

// ✅ updateCartLine — now a proper top-level export
export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  if (quantity === 0) {
    const query = `
      mutation removeCartLine($cartId: ID!, $lineId: ID!) {
        cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount { amount currencyCode }
            }
            lines(first: 10) {
              nodes {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product {
                      title
                      images(first: 1) {
                        nodes { url altText }
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors { field message }
        }
      }
    `;
    const response = await shopifyFetch<any>({ query, variables: { cartId, lineId } });
    return response.data?.cartLinesRemove?.cart ?? null;
  }

  const query = `
    mutation updateCartLine($cartId: ID!, $lineId: ID!, $quantity: Int!) {
      cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineId, quantity: $quantity }]) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount { amount currencyCode }
          }
          lines(first: 10) {
            nodes {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product {
                    title
                    images(first: 1) {
                      nodes { url altText }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `;

  const response = await shopifyFetch<any>({
    query,
    variables: { cartId, lineId, quantity },
  });
  return response.data?.cartLinesUpdate?.cart ?? null;
}