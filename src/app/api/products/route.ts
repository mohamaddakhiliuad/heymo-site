export const runtime = 'edge'

export async function GET(request: Request) {
  const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN!
  const STOREFRONT_TOKEN = process.env.SHOPIFY_TOKEN!

  const { searchParams } = new URL(request.url)
  const handle = searchParams.get('handle')
  const count = searchParams.get('count') || '3'

  console.log('[INFO] Request params:', { handle, count })

  let query = ''

  if (handle) {
    query = `
      {
        productByHandle(handle: "${handle}") {
          id
          title
          description
          handle
          productType
          tags
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          metafields(identifiers: [
            { namespace: "custom", key: "size" },
            { namespace: "custom", key: "medium" },
            { namespace: "custom", key: "signed_by" },
            { namespace: "custom", key: "availability" },
            { namespace: "custom", key: "year_created" }
          ]) {
            namespace
            key
            value
          }
        }
      }
    `
  } else {
    query = `
      {
        products(first: ${count}) {
          edges {
            node {
              id
              title
              description
              handle
              productType
              tags
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  }

  try {
    const response = await fetch(`${SHOPIFY_DOMAIN}/api/2023-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    })

    const json = await response.json()
    //
    // console.log('[DEBUG] Shopify GraphQL response:', JSON.stringify(json, null, 2))

    if (handle) {
      const product = json?.data?.productByHandle

      if (!product) {
        console.warn('[WARN] Product not found for handle:', handle)
        return new Response(JSON.stringify({ error: 'Product not found' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 404,
        })
      }

      return new Response(JSON.stringify({ product }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    return new Response(JSON.stringify(json.data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('[ERROR] Shopify API fetch failed:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data from Shopify' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
}
