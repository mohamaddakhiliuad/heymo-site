export const runtime = 'nodejs'

import { getProductByHandle } from '@/services/shopify'
import { Product } from '@/types/product'
import ProductDetail from '@/components/product/ProductDetail'

interface Props {
  params: { handle: string }
}

// ✅ SEO metadata برای موتورهای جست‌وجو و شبکه‌های اجتماعی
export async function generateMetadata({ params }: Props) {
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

// ✅ صفحه محصول
export default async function ProductPage({ params }: Props) {
  const handle = params.handle
  const product: Product = await getProductByHandle(handle)

  return <ProductDetail product={product} />
}
