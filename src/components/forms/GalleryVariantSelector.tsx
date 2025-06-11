'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AddToCartButton from '@/components/product/AddToCartButton'
import type { Product, Variant } from '@/types/product'

interface Props {
  product: Product
  variants: Variant[]
  selectedId: string
  onSelect: (variantId: string, variant?: Variant) => void
}

export default function GalleryVariantSelector({
  product,
  variants,
  selectedId,
  onSelect,
}: Props) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)

  // ✅ Debug check
  useEffect(() => {
    console.log('[DEBUG] product passed to GalleryVariantSelector:', product)
  }, [product])

  useEffect(() => {
    const found = variants.find(v => v.id === selectedId) || variants[0] || null
    setSelectedVariant(found)
  }, [selectedId, variants])

  const handleSelect = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId)
    if (variant) {
      onSelect(variantId, variant)
      setSelectedVariant(variant)
    }
  }

  const showPrice = Boolean(selectedVariant?.show_price)
  const hasPrice = showPrice && !!selectedVariant?.price

  const title = product.title || 'Untitled Artwork'
  const imageSrc = product.imageSrc || '/fallback.jpg'
  const currency = selectedVariant?.currency || product?.currency || 'CAD'
  const handle = product.handle || ''

  return (
    <div className="space-y-4 mt-6">
      {/* 🎛 Variant Buttons */}
      {variants.length > 1 && (
        <div className="flex gap-3 flex-wrap">
          {variants.map(variant => (
            <motion.button
              key={variant.id}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleSelect(variant.id)}
              className={`px-4 py-2 border rounded-full text-sm transition duration-200 ${
                variant.id === selectedId
                  ? 'bg-[#5e4033] text-white border-[#5e4033]'
                  : 'bg-transparent text-[#5e4033] border-[#5e4033] hover:bg-[#f0e5db]'
              }`}
              title={variant.description || `This is the ${variant.title} edition.`}
            >
              {variant.title}
            </motion.button>
          ))}
        </div>
      )}

      {/* 💰 Price + Add to Cart */}
      {hasPrice ? (
        <>
          <p className="text-lg font-semibold text-[#5e4033]">
            {currency === 'CAD' ? 'CAD $' : `${currency} `}
            {Number(selectedVariant?.price || 0).toLocaleString()}
          </p>
          <AddToCartButton
            quantity={1}
            variantId={selectedVariant.id}
            title={title}
            price={selectedVariant.price || '0'}
            currency={currency}
            color={selectedVariant.color}
            imageSrc={imageSrc}
            productUrl={`/gallery/${handle}`}
          />
        </>
      ) : selectedVariant ? (
        <a
          href={`https://wa.me/+16474820073?text=Hi, I’m interested in the "${selectedVariant.title}" edition of "${title}".`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#aa6c3c] italic underline"
        >
          Contact us via WhatsApp to inquire about this artwork.
        </a>
      ) : null}

      {/* 📝 Description */}
      {selectedVariant?.description && (
        <p className="text-sm text-[#4e3a2f]">{selectedVariant.description}</p>
      )}
    </div>
  )
}
