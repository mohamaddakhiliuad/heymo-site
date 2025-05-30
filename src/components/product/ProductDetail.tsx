'use client'
import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import clsx from 'clsx'

import Breadcrumb from '@/components/ui/Breadcrumb'
import AddToCartButton from '@/components/product/AddToCartButton'
import ProductGrid from '@/components/product/ProductGrid'
import ArtworkLightbox from '@/components/ui/ArtworkLightbox'

import { buttonOutline, sectionWrapper } from '@/styles/formStyles'

interface Props {
  product: Product
}

/**
 * ProductDetail – Clean Version Without Redundant Metadata
 * --------------------------------------------------------
 */
export default function ProductDetail({ product }: Props) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

 useEffect(() => {
  if (!product?.id) return;

  import('@/services/shopify')
    .then(mod => mod.getRelatedProductsDynamic(product))
    .then(setRelatedProducts)
    .catch(err => console.error('Error loading related products:', err))
}, [product?.id])


  return (
    <section className={clsx(sectionWrapper, 'bg-[#fff8f2] text-[#5e4033] font-serif')}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14 items-start">

        {/* Artwork Preview with Lightbox */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <ArtworkLightbox
            currentProduct={product}
            relatedProducts={relatedProducts}
            alt={`Miniature Painting of ${product.title}`}
          />
        </div>

        {/* Product Info */}
        <article itemScope itemType="http://schema.org/Product" className="space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Gallery', href: '/gallery' },
              { label: product.title },
            ]}
          />

          <h1 itemProp="name" className="text-4xl leading-tight font-semibold text-[#5e4033]">
            {product.title}
          </h1>

          {product.isLimitedEdition && (
            <p className="text-sm italic text-amber-700">Limited Edition Print</p>
          )}

          {product.description && (
            <p itemProp="description" className="text-base text-[#4e3a2f] leading-relaxed">
              {product.description.split('\n')[0]}
            </p>
          )}

          {/* Add to Cart Button Only */}
          <div>
            <AddToCartButton
              quantity={1}
              variantId={product.variantId}
              productTitle={product.title}
              productUrl={product.url}
              color={product.variants?.[0]?.color}
            />
          </div>

          {/* Metafields Section - Grid Format */}
          <div className="mt-10 border-t pt-8">
            <h2 className="text-lg font-semibold mb-6 text-[#5e4033]">Details</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm text-[#4e3a2f]">
              {product.size && (<><dt className="font-medium">Size</dt><dd>{product.size}</dd></>)}
              {product.medium && (<><dt className="font-medium">Medium</dt><dd>{product.medium}</dd></>)}
              {product.availability && (<><dt className="font-medium">Availability</dt><dd>{product.availability}</dd></>)}
              {product.signedBy && (<><dt className="font-medium">Signed by</dt><dd>{product.signedBy}</dd></>)}
              {product.yearCreated && (<><dt className="font-medium">Year created</dt><dd>{product.yearCreated}</dd></>)}
              {product.tags?.length > 0 && (<><dt className="font-medium">Tags</dt><dd>{product.tags.join(' · ')}</dd></>)}
            </dl>
          </div>
        </article>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <ProductGrid
            title="You may also like"
            products={relatedProducts}
            shopUrl={product.url || ''}
            columns={3}
          />
        </div>
      )}
    </section>
  )
}
