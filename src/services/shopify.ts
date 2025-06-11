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
 * Custom logic:
 * - Extracts metafields
 * - Fetches all variants
 * - Chooses "Original" variant price as product price if show_price is true
 */
/**
 * getProductByHandle
 * ---------------------------------------------------
 * Fetches a full product by its handle from the internal API.
 * Custom logic:
 * - Extracts metafields
 * - Fetches all variants
 * - Chooses "Original" variant price as product price if show_price is true
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

  const specs: Record<string, string> = {}
  const metafieldsRaw = node.metafields || []
  metafieldsRaw.forEach((field: any) => {
    specs[field.key] = field.value
  })

  const rawVariants = node.variants || []

  const variants = rawVariants.map((variant: any) => {
    const selectedColor = variant.color || variant.title

    return {
      id: variant.id,
      title: variant.title,
      color: selectedColor,
      image: node.imageSrc || fallbackImage, // ✅ استفاده از تصویر محصول اصلی
      price: variant.price || '0.00',
      currency: variant.currency || 'CAD',
      show_price: variant.show_price,
      description: variant.description,
    }
  })

  const fallbackPrice = variants[0]?.price || node.price || '0.00'
  const fallbackCurrency = variants[0]?.currency || node.currency || 'CAD'

  const product: Product = {
    id: node.id,
    title: node.title,
    description: node.description,
    imageSrc: node.imageSrc || fallbackImage,
    price: fallbackPrice,
    currency: fallbackCurrency,
    handle: node.handle,
    url: node.url,
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

  console.log('[DEBUG] Final product with specs:', product)
  return product
}



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

  return getProducts(RELATED_LIMIT)
}

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
