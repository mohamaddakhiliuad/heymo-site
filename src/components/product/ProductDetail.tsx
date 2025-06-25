'use client'

/**
 * ProductDetail.tsx
 * ------------------------------------------------------------
 * 📦 Product Detail Page for Noura Art Gallery
 *
 * This component is responsible for:
 * - Showing product artwork with zoom support
 * - Presenting product title, description, and metadata
 * - Delegating variant selection logic (price, add-to-cart, contact)
 *   to the GalleryVariantSelector component
 *
 * 🎯 Important:
 * This file avoids any variant-level logic (like price visibility or cart),
 * and keeps its responsibility focused on layout, structure, and metadata.
 *
 * All smart UX logic about variants lives inside GalleryVariantSelector.tsx
 */

import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import clsx from 'clsx'

import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductGrid from '@/components/product/ProductGrid'
import ArtworkLightbox from '@/components/ui/ArtworkLightbox'
import GalleryVariantSelector from '@/components/forms/GalleryVariantSelector'
import { sectionWrapper } from '@/styles/formStyles'

interface Props {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  // ✅ Store selected variant ID
  const [selectedVariantId, setSelectedVariantId] = useState<string>(product.variantId || '')

  // ✅ Extract variant list from product
  const variantOptions = product.variants || []

  // ✅ Load related products (e.g., same category, artist, etc.)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  useEffect(() => {
    if (!product?.id) return
    import('@/components/services/shopify')
      .then(mod => mod.getRelatedProductsDynamic(product))
      .then(setRelatedProducts)
      .catch(err => console.error('Error loading related products:', err))
  }, [product?.id])

  return (
    <section className={clsx(sectionWrapper, 'bg-[#fff8f2] text-[#5e4033] font-serif')}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14 items-start">

        {/* 🎨 Left Panel – Product Image with Lightbox */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <ArtworkLightbox
            currentProduct={product}
            relatedProducts={relatedProducts}
            alt={`Miniature Painting of ${product.title}`}
          />
        </div>

        {/* 📝 Right Panel – Product Metadata & Variant Logic */}
        <article itemScope itemType="http://schema.org/Product" className="space-y-6">
          {/* Navigation Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Gallery', href: '/gallery' },
              { label: product.title },
            ]}
          />

          {/* 🖋️ Product Title */}
          <h1 itemProp="name" className="text-4xl font-semibold text-[#5e4033]">
            {product.title}
          </h1>

          {/* 📖 Product Description (first paragraph only) */}
          {product.description && (
            <p itemProp="description" className="text-base text-[#4e3a2f] leading-relaxed">
              {product.description.split('\n')[0]}
            </p>
          )}

          {/* 🎛 Variant Selector */}
          {variantOptions.length > 0 && (
            <GalleryVariantSelector
              product={product}
              variants={variantOptions} // ✅ Full variant data passed down
              selectedId={selectedVariantId}
              onSelect={setSelectedVariantId}
            />
          )}

          {/* 📋 Structured Metadata Block */}
          <div className="mt-10 border-t pt-8">
            <h2 className="text-lg font-semibold mb-6">Details</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm text-[#4e3a2f]">
              {product.size && (<><dt className="font-medium">Size</dt><dd>{product.size}</dd></>)}
              {product.medium && (<><dt className="font-medium">Medium</dt><dd>{product.medium}</dd></>)}
              {product.availability && (<><dt className="font-medium">Availability</dt><dd>{product.availability}</dd></>)}
              {product.signedBy && (<><dt className="font-medium">Signed by</dt><dd>{product.signedBy}</dd></>)}
              {product.yearCreated && (<><dt className="font-medium">Year created</dt><dd>{product.yearCreated}</dd></>)}
              {product.tags?.length > 0 && (
                <>
                  <dt className="font-medium">Tags</dt>
                  <dd>{product.tags.join(' · ')}</dd>
                </>
              )}
            </dl>
          </div>
        </article>
      </div>

      {/* 🔁 Recommended Artworks */}
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
