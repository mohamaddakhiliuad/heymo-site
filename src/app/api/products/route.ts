export const runtime = 'edge'

export async function GET(request: Request) {
  const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN!
  const STOREFRONT_TOKEN = process.env.SHOPIFY_TOKEN!

  const { searchParams } = new URL(request.url)
  const handle = searchParams.get('handle')
  const count = searchParams.get('count') || '3'

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
                image { url altText }
                price { amount currencyCode }
                selectedOptions { name value }
                metafields(identifiers: [
                  { namespace: "custom", key: "show_price" },
                  { namespace: "custom", key: "description" }
                ]) {
                  key
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
            { namespace: "custom", key: "year_created" },
            { namespace: "custom", key: "show_price" },
            { namespace: "custom", key: "has_print" },
            { namespace: "custom", key: "has_nft" }
          ]) {
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
                    image { url altText }
                    selectedOptions { name value }
                    price { amount currencyCode }
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

    if (handle) {
      const rawProduct = json?.data?.productByHandle
      if (!rawProduct) {
        return new Response(JSON.stringify({ error: 'Product not found' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 404,
        })
      }

      // ⛑️ Parse product-level metafields
      const baseSpecs = Object.fromEntries(
        (rawProduct.metafields || []).map(f => [f.key, f.value])
      )

      // 🎯 Parse variants with safe metafields
      const variants = (rawProduct.variants?.edges || []).map(edge => {
        const v = edge.node

        const metafields = Array.isArray(v.metafields)
          ? Object.fromEntries(v.metafields.map(f => [f.key, f.value]))
          : {}

        return {
          id: v.id,
          title: v.title,
          price: v.price?.amount || '0.00',
          currency: v.price?.currencyCode || 'USD',
          image: v.image?.url,
          color: v.selectedOptions?.[0]?.value || v.title,
          show_price: metafields.show_price === 'true',
          description: metafields.description || '',
        }
      })

      const finalProduct = {
        id: rawProduct.id,
        title: rawProduct.title,
        description: rawProduct.description,
        handle: rawProduct.handle,
        tags: rawProduct.tags || [],
        category: rawProduct.productType || '',
        imageSrc: rawProduct.featuredImage?.url || '',
        price: rawProduct.priceRange?.minVariantPrice?.amount || '0.00',
        currency: rawProduct.priceRange?.minVariantPrice?.currencyCode || 'USD',
        variantId: variants[0]?.id || '',
        variants,
        size: baseSpecs.size || '',
        medium: baseSpecs.medium || '',
        availability: baseSpecs.availability || '',
        signedBy: baseSpecs.signed_by || '',
        yearCreated: baseSpecs.year_created || '',
        show_price: baseSpecs.show_price === 'true',
        has_print: baseSpecs.has_print === 'true',
        has_nft: baseSpecs.has_nft === 'true',
        url: `https://${SHOPIFY_DOMAIN}`
      }

      console.log('[DEBUG] Final product with specs:', finalProduct)

      return new Response(JSON.stringify({ product: finalProduct }), {
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
