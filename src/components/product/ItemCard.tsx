'use client'

import Link from 'next/link'
import { Product } from '@/types/product'

import {
  cardBase,
  productImage,
  productTitleInsidGrid,
  productDescription,
  productPrice,
  cardButtonGroup,
  buttonPrimary,
  buttonOutline,
} from '@/styles/formStyles'

interface Props extends Product {
  onAddToCartClick?: (variantId: string) => void
  shopUrl?: string
}

export default function ItemCard({
  title,
  description,
  imageSrc,
  price,
  currency,
  handle,
  variantId,
  onAddToCartClick,
  shopUrl,
}: Props) {
  const baseUrl = shopUrl || 'https://xrxnq7-16.myshopify.com'

  return (
    <div className={cardBase}>
      {/* Product image */}
      <img src={imageSrc} alt={title} className={productImage} />

      {/* Product info block */}
      <div>
        <h3 className={productTitleInsidGrid}>{title}</h3>
        <p className={productDescription}>{description}</p>
        {price && (
          <p className={productPrice}>
            ${price} {currency}
          </p>
        )}
      </div>

      {/* Button group */}
      {handle && (
        <div className={cardButtonGroup}>
          {onAddToCartClick ? (
            <button
              onClick={() => onAddToCartClick(variantId || '')}
              className={`${buttonPrimary} text-sm`}
            >
              Add to Cart
            </button>
          ) : (
            <a
              href={`${baseUrl}/cart/add?id=${variantId}`}
              className={`${buttonPrimary} text-sm`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to Cart
            </a>
          )}

          <Link
            href={`/products/${handle}`}
            className={`${buttonOutline} text-sm text-center`}
          >
            Read More
          </Link>
        </div>
      )}
    </div>
  )
}
