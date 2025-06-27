import { getProductByHandle } from '@/components/services/shopify'
import { Product } from '@/types/product'
import ProductDetail from '@/components/product/ProductDetail'
import type { Metadata } from 'next'

export const runtime = 'nodejs'

/**
 * ✅ تعریف درست Props بدون نیاز به constraint عجیب PageProps
 */
type Props = {
  params: {
    handle: string
  }
}

/**
 * ✅ generateMetadata
 * -- پارامترها کاملاً طبق استاندارد Next.js 13+/14/15 تعریف شده‌اند
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product: Product = await getProductByHandle(params.handle)

  return {
    title: `${product.title} | Noura Gallery`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160),
      images: product.imageSrc ? [product.imageSrc] : [],
    },
    keywords: product.tags,
  }
}

/**
 * ✅ Page Component
 */
export default async function ProductPage({ params }: Props) {
  const product: Product = await getProductByHandle(params.handle)
  return <ProductDetail product={product} />
}
