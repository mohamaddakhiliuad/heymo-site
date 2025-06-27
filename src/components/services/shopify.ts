import axios from 'axios'
import { Product } from '@/types/product'
import { RELATED_PRODUCT_STRATEGY, RELATED_LIMIT } from '@/config/settings'

const fallbackImage = '/fallback.jpg'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const shopifyUrl = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!

/**
 * 🔧 Helper: Map Shopify node to Product
 */
function mapNodeToProduct(node: any): Product {
  return {
    id: node.id,
    title: node.title,
    description: node.description,
    imageSrc: node.featuredImage?.url || fallbackImage,
    price: node.priceRange?.minVariantPrice?.amount || '0.00',
    currency: node.priceRange?.minVariantPrice?.currencyCode || 'CAD',
    handle: node.handle,
    url: shopifyUrl,
    tags: node.tags || [],
    category: node.productType || '',
    variantId: node.variants?.edges?.[0]?.node?.id || '',
    variants: [],
  }
}

/**
 * 🟢 getProductByHandle – fetches and transforms a single product
 */
export async function getProductByHandle(handle: string): Promise<Product> {
  const res = await fetch(`${siteUrl}/api/products?handle=${handle}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`)
  }

  const data = await res.json()

  const node = data?.product
  if (!node || typeof node !== 'object') {
    throw new Error(`Product not found or invalid: ${handle}`)
  }

  const metafieldsRaw = node.metafields || []
  const specs: Record<string, string> = {}
  metafieldsRaw.forEach((field: { key: string; value: string }) => {
    specs[field.key] = field.value
  })

  const rawVariants = node.variants || []
  const variants = rawVariants.map((variant: any) => ({
    id: variant.id,
    title: variant.title,
    color: variant.color || variant.title,
    image: node.imageSrc || fallbackImage,
    price: variant.price || '0.00',
    currency: variant.currency || 'CAD',
    show_price: variant.show_price,
    description: variant.description,
  }))

  const fallbackPrice = variants[0]?.price || node.price || '0.00'
  const fallbackCurrency = variants[0]?.currency || node.currency || 'CAD'

  return {
    id: node.id,
    title: node.title,
    description: node.description,
    imageSrc: node.imageSrc || fallbackImage,
    price: fallbackPrice,
    currency: fallbackCurrency,
    handle: node.handle,
    url: node.url || shopifyUrl,
    tags: node.tags || [],
    category: node.category || '',
    variantId: variants[0]?.id || '',
    variants,
    size: node.size || '',
    medium: node.medium || '',
    availability: node.availability || '',
    signedBy: node.signedBy || '',
    yearCreated: node.yearCreated || '',
    show_price: node.show_price,
    has_print: node.has_print,
    has_nft: node.has_nft,
  }
}

/**
 * 🔄 getProducts – fetch limited products for preview
 */
export async function getProducts(count = 3): Promise<Product[]> {
  const res = await axios.get(`/api/products?count=${count}`)
  const nodes = res.data.products?.edges || []
  return nodes.map((edge: { node: any }) => mapNodeToProduct(edge.node))
}

/**
 * 🔎 getProductsByTag
 */
export async function getProductsByTag(tag: string): Promise<Product[]> {
  const res = await axios.get(`/api/products?tag=${tag}`)
  const nodes = res.data.products?.edges || []
  return nodes.map((edge: { node: any }) => mapNodeToProduct(edge.node))
}

/**
 * 🔁 getRelatedProductsByCategory
 */
export async function getRelatedProductsByCategory(category: string, excludeHandle: string, limit = 4): Promise<Product[]> {
  const res = await axios.get(`/api/products?category=${category}`)
  const nodes = res.data.products?.edges || []
  return nodes
    .map((edge: { node: any }) => edge.node)
    .filter((node: any) => node.handle !== excludeHandle)
    .slice(0, limit)
    .map(mapNodeToProduct)
}

/**
 * 🎯 getRelatedProductsByTag
 */
export async function getRelatedProductsByTag(tag: string, excludeHandle: string, limit = 4): Promise<Product[]> {
  const res = await axios.get(`/api/products?tag=${tag}`)
  const nodes = res.data.products?.edges || []
  return nodes
    .map((edge: { node: any }) => edge.node)
    .filter((node: any) => node.handle !== excludeHandle)
    .slice(0, limit)
    .map(mapNodeToProduct)
}

/**
 * 🤖 getRelatedProductsDynamic – Chooses strategy dynamically
 */
export async function getRelatedProductsDynamic(product: Product): Promise<Product[]> {
  const exclude = product.handle
  if (RELATED_PRODUCT_STRATEGY === 'tag' && product.tags?.[0]) {
    return getRelatedProductsByTag(product.tags[0], exclude, RELATED_LIMIT)
  }
  if (RELATED_PRODUCT_STRATEGY === 'category' && product.category) {
    return getRelatedProductsByCategory(product.category, exclude, RELATED_LIMIT)
  }
  return getProducts(RELATED_LIMIT)
}

/**
 * 📄 getAllProductsPaginated – Fetches for archive or index view
 */
export async function getAllProductsPaginated(page = 1): Promise<Product[]> {
  const PAGE_SIZE = 12
  const res = await axios.get(`/api/products?count=${PAGE_SIZE}`)
  const nodes = res.data.products?.edges || []
  return nodes.map((edge: { node: any }) => mapNodeToProduct(edge.node))
}
