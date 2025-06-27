// ✅ Correct typing for Next.js App Router
import { Metadata } from 'next'
import { getProductByHandle } from '@/components/services/shopify'
import { Product } from '@/types/product'
import ProductDetail from '@/components/product/ProductDetail'

type Props = {
  params: {
    handle: string
  }
}

// ✅ Dynamic metadata generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductByHandle(params.handle)

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

// ✅ Dynamic route page function (server component)
export default async function ProductPage({ params }: Props) {
  const product = await getProductByHandle(params.handle)

  return <ProductDetail product={product} />
}
