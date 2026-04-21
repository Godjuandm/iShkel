const domain = process.env.SHOPIFY_DOMAIN!;
const adminAccessToken = process.env.SHOPIFY_ADMIN_TOKEN!;

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

async function shopifyFetch<T>({ query, variables = {} }: ShopifyFetchParams): Promise<T> {
  const endpoint = `https://${domain}/admin/api/2024-01/graphql.json`;

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!result.ok) {
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
          images(first: 1) {
            nodes {
              url
              altText
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
