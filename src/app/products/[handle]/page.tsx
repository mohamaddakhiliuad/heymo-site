import { Metadata } from 'next'
import { getProductByHandle } from '@/components/services/shopify'
import { Product } from '@/types/product'
import ProductDetail from '@/components/product/ProductDetail'

/**
 * Generates SEO metadata for the product page
 * -------------------------------------------------
 * This metadata is used for browser titles and social media sharing
 */
export async function generateMetadata(
  { params }: { params: { handle: string } }
): Promise<Metadata> {
  const product: Product = await getProductByHandle(params.handle)

  return {
    title: `${product.title} | Noura Gallery`,
    description: product.description?.slice(0, 160),
    keywords: product.tags,
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160),
      images: product.imageSrc ? [product.imageSrc] : [],
    },
  }
}

/**
 * ProductPage component
 * -------------------------------------------------
 * Fetches full product data and renders the detail component
 */
export default async function ProductPage(
  { params }: { params: { handle: string } }
) {
  const product: Product = await getProductByHandle(params.handle)

  return <ProductDetail product={product} />
}
