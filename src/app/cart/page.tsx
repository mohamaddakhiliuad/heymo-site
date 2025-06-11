'use client'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || ''

export default function CartPage() {
  const { cart, removeItem, clearCart } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  )

  // 🔗 Create the Shopify Cart URL
  const checkoutUrl = `${shopifyDomain}/cart/${cart
    .map(item => `${item.variantId?.split('/').pop()}:${item.quantity}`)
    .join(',')}`

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-[#5e4033] font-serif">
      <h1 className="text-3xl font-semibold mb-10">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-lg">Your cart is currently empty.</p>
      ) : (
        <>
          <ul className="space-y-6 mb-10">
            {cart.map(item => (
              <li
                key={item.variantId}
                className="flex items-start gap-6 border-b pb-6"
              >
                {item.imageSrc && (
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                )}
                <div className="flex-1">
                  <Link
                    href={item.productUrl || '/'}
                    className="text-lg font-semibold hover:underline"
                  >
                    {item.title}
                  </Link>
                  {item.color && (
                    <p className="text-sm text-[#4e3a2f] italic">{item.color}</p>
                  )}
                  <p className="text-sm mt-1">
                    {item.currency} ${Number(item.price).toLocaleString()} × {item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-xs text-[#aa6c3c] mt-2 underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* ✅ Cart Summary */}
          <div className="border-t pt-6 flex justify-between items-center text-lg">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">CAD ${total.toLocaleString()}</span>
          </div>

          {/* ✅ Proceed to Checkout */}
          <div className="mt-8">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'bg-[#5e4033] text-white px-6 py-3 rounded-xl text-base hover:bg-[#4a322a]',
                'inline-block transition font-medium'
              )}
            >
              Proceed to Checkout
            </a>
            <button
              onClick={clearCart}
              className="ml-6 text-sm text-[#aa6c3c] underline"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </section>
  )
}
