// src/utils/toastUtils.ts

import toast, { type Toast } from 'react-hot-toast'
import clsx from 'clsx'
import { toastBox, toastLink } from '@/styles/formStyles'

/**
 * toastBoxClass
 * -----------------------
 * Conditional wrapper for entrance animation
 * Uses centralized styles from formStyles.ts
 */
const toastBoxClass = (visible: boolean) =>
  clsx(toastBox, visible ? 'animate-enter' : 'animate-leave')

/**
 * showAddToCartToast
 * -----------------------
 * Custom toast for confirming item added to cart
 * - Displays item title, quantity, and optional color
 * - Includes links to View Cart and Continue Shopping
 */
export const showAddToCartToast = ({
  title,
  quantity,
  color,
}: {
  title: string
  quantity: number
  color?: string
}) => {
  toast.custom((t: Toast) => (
    <div className={toastBoxClass(t.visible)}>
      <div className="flex items-start">
        <div className="text-2xl mr-3">🛒</div>
        <div className="flex-1 text-sm">
          <p className="font-semibold">
            {quantity} × {title}
            {color ? ` (${color})` : ''}
          </p>
          <p className="text-[#5e4033]/70">added to your cart successfully.</p>
          <div className="mt-2 flex gap-4">
            <a href="/cart" className={toastLink}>
              View Cart
            </a>
            <button onClick={() => toast.dismiss(t.id)} className={toastLink}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  ))
}
