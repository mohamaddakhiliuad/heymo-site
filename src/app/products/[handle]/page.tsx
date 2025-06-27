import { Metadata } from 'next'
import { getProductByHandle } from '@/components/services/shopify'
import { Product } from '@/types/product'
import ProductDetail from '@/components/product/ProductDetail'

type ProductPageProps = {
  params: {
    handle: string
  }
}

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
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

export default async function ProductPage({ params }: ProductPageProps) {
  const product: Product = await getProductByHandle(params.handle)

  return <ProductDetail product={product} />
}
