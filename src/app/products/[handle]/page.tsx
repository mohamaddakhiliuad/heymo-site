export const runtime = 'nodejs'

import { getProductByHandle } from '@/components/services/shopify'
import { Product } from '@/types/product'
import ProductDetail from '@/components/product/ProductDetail'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { handle: string }
}

// ✅ SEO Metadata
export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
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

// ✅ Page Component
export default async function ProductPage({ params }: Props) {
  const product: Product = await getProductByHandle(params.handle)
  return <ProductDetail product={product} />
}
