'use client'

import { useCart } from '@/context/CartContext'
import { showAddToCartToast } from '@/utils/toastUtils'

interface Props {
  variantId: string // ممکنه global ID باشه
  title: string
  price: string
  currency: string
  quantity: number
  color?: string
  imageSrc?: string
  productUrl?: string
}

export default function AddToCartButton({
  variantId,
  title,
  price,
  currency,
  quantity,
  color,
  imageSrc,
  productUrl,
}: Props) {
  const { addItem } = useCart()

  const handleClick = () => {
    // ✅ Extract numeric ID for Shopify Checkout
    const numericVariantId = variantId.split('/').pop() || variantId

    // ✅ Add to cart
    addItem({
      variantId: numericVariantId,
      title,
      price,
      currency,
      quantity,
      color,
      imageSrc,
      productUrl,
    })

    // ✅ Show custom toast
    showAddToCartToast({
      title,
      quantity,
      color,
    })
  }

  return (
    <button
      onClick={handleClick}
      className="bg-[#5e4033] text-white px-5 py-2 rounded-full text-sm hover:bg-[#4a322a] transition"
    >
      Add to Cart
    </button>
  )
}
