import axios from 'axios'
import { Product } from '@/types/product'
import { RELATED_PRODUCT_STRATEGY, RELATED_LIMIT } from '@/config/settings'


const fallbackImage = '/fallback.jpg'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const shopifyUrl = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!


/**
 * getProductByHandle
 * ---------------------------------------------------
 * Fetches a full product by its handle from the internal API.
 * Includes title, description, tags, category, variants, and metafields.
 */
export async function getProductByHandle(handle: string): Promise<Product> {
  const res = await fetch(`${siteUrl}/api/products?handle=${handle}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`)
  }

  const data = await res.json()
  const node = data.product

  if (!node) {
    throw new Error(`Product not found: ${handle}`)
  }

  // ✅ Extract metafields directly (no edges)
  const metafieldsRaw = node.metafields || []
  const specs: Record<string, string> = {}

  metafieldsRaw.forEach((field: any) => {
    specs[field.key] = field.value
  })

  // ✅ Extract variant data
  const variants = node.variants?.edges.map((edge: any) => {
    const variantNode = edge.node
    const selectedColor = variantNode.selectedOptions?.find(
      (opt: any) => opt.name === 'Color'
    )?.value

    return {
      id: variantNode.id,
      title: variantNode.title,
      color: selectedColor || variantNode.title,
      image: variantNode.image?.url || node.featuredImage?.url || fallbackImage,
    }
  }) || []

  const product: Product = {
    id: node.id,
    title: node.title,
    description: node.description,
    imageSrc: node.featuredImage?.url || fallbackImage,
    price: node.priceRange?.minVariantPrice?.amount || '0.00',
    currency: node.priceRange?.minVariantPrice?.currencyCode || 'USD',
    handle: node.handle,
    url: shopifyUrl,
    tags: node.tags || [],
    category: node.productType || '',
    variantId: variants[0]?.id || '',
    variants,

    // ✅ Add extracted metafields
    size: specs.size || '',
    medium: specs.medium || '',
    availability: specs.availability || '',
    signedBy: specs.signed_by || '',
    yearCreated: specs.year_created || ''
  }

  // ✅ Debug log for visual inspection
  console.log('[DEBUG] Final product with specs:', product)

  return product
}

/**
 * getProducts
 * ---------------------------------------------------
 * Fetches a basic list of products from internal API.
 * Use for homepage, collections, or related suggestions.
 */
export async function getProducts(count: number = 3): Promise<Product[]> {
  const res = await axios.get(`/api/products?count=${count}`)
  const nodes = res.data.products?.edges || []

  return nodes.map((edge: any) => {
    const node = edge.node

    return {
      id: node.id,
      title: node.title,
      description: node.description,
      imageSrc: node.featuredImage?.url || fallbackImage,
      price: node.priceRange?.minVariantPrice?.amount || '0.00',
      currency: node.priceRange?.minVariantPrice?.currencyCode || 'USD',
      handle: node.handle,
      url: shopifyUrl,
      tags: node.tags || [],
      category: node.productType || '',
      variantId: node.variants?.edges?.[0]?.node?.id || '',
      variants: [],
    }
  })
}

/**
 * getProductsByTag
 * ---------------------------------------------------
 * Fetches products that match a specific tag (for related suggestions).
 */
export async function getProductsByTag(tag: string): Promise<Product[]> {
  const res = await axios.get(`/api/products?tag=${tag}`)
  const nodes = res.data.products?.edges || []

  return nodes.map((edge: any) => {
    const node = edge.node

    return {
      id: node.id,
      title: node.title,
      description: node.description,
      imageSrc: node.featuredImage?.url || fallbackImage,
      price: node.priceRange?.minVariantPrice?.amount || '0.00',
      currency: node.priceRange?.minVariantPrice?.currencyCode || 'USD',
      handle: node.handle,
      url: shopifyUrl,
      tags: node.tags || [],
      category: node.productType || '',
      variantId: node.variants?.edges?.[0]?.node?.id || '',
      variants: [],
    }
  })
}

/**
 * getRelatedProductsByCategory
 * ---------------------------------------------------
 * Fetches products by shared category (productType),
 * excluding the current product by handle.
 */
export async function getRelatedProductsByCategory(category: string, excludeHandle: string, limit = 4): Promise<Product[]> {
  const res = await axios.get(`/api/products?category=${category}`)
  const nodes = res.data.products?.edges || []

  return nodes
    .map((edge: any) => edge.node)
    .filter((node: any) => node.handle !== excludeHandle)
    .slice(0, limit)
    .map((node: any) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      imageSrc: node.featuredImage?.url || fallbackImage,
      price: node.priceRange?.minVariantPrice?.amount || '0.00',
      currency: node.priceRange?.minVariantPrice?.currencyCode || 'USD',
      handle: node.handle,
      url: shopifyUrl,
      tags: node.tags || [],
      category: node.productType || '',
      variantId: node.variants?.edges?.[0]?.node?.id || '',
      variants: [],
    }))
}
export async function getRelatedProductsDynamic(product: Product): Promise<Product[]> {
  const exclude = product.handle

  if (RELATED_PRODUCT_STRATEGY === 'tag' && product.tags?.[0]) {
    return getRelatedProductsByTag(product.tags[0], exclude, RELATED_LIMIT)
  }

  if (RELATED_PRODUCT_STRATEGY === 'category' && product.category) {
    return getRelatedProductsByCategory(product.category, exclude, RELATED_LIMIT)
  }

  // fallback: latest products
  return getProducts(RELATED_LIMIT)
}

/**
 * getRelatedProductsByTag
 * ---------------------------------------------------
 * Fetches products with a matching tag (excluding current product).
 */
export async function getRelatedProductsByTag(tag: string, excludeHandle: string, limit = 4): Promise<Product[]> {
  const res = await axios.get(`/api/products?tag=${tag}`)
  const nodes = res.data.products?.edges || []

  return nodes
    .map((edge: any) => edge.node)
    .filter((node: any) => node.handle !== excludeHandle)
    .slice(0, limit)
    .map((node: any) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      imageSrc: node.featuredImage?.url || fallbackImage,
      price: node.priceRange?.minVariantPrice?.amount || '0.00',
      currency: node.priceRange?.minVariantPrice?.currencyCode || 'USD',
      handle: node.handle,
      url: shopifyUrl,
      tags: node.tags || [],
      category: node.productType || '',
      variantId: node.variants?.edges?.[0]?.node?.id || '',
      variants: [],
    }))
}
export async function getAllProductsPaginated(page: number = 1): Promise<Product[]> {
  const PAGE_SIZE = 12
  const res = await axios.get(`/api/products?count=${PAGE_SIZE}`)
  const nodes = res.data.products?.edges || []

  return nodes.map((edge: any) => {
    const node = edge.node

    return {
      id: node.id,
      title: node.title,
      description: node.description,
      imageSrc: node.featuredImage?.url || '/fallback.jpg',
      price: node.priceRange?.minVariantPrice?.amount || '0.00',
      currency: node.priceRange?.minVariantPrice?.currencyCode || 'CAD',
      handle: node.handle,
      category: node.productType || '',
      tags: node.tags || [],
      variantId: node.variants?.edges?.[0]?.node?.id || '',
    }
  })
}