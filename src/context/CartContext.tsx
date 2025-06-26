'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

/**
 * 🛒 CartItem Type
 */
export interface CartItem {
  variantId: string
  title: string
  price: string
  currency: string
  quantity: number
  color?: string
  imageSrc?: string
  productUrl?: string
}

/**
 * 🔄 Cart Context Type
 */
interface CartContextType {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  clearCart: () => void
}

/**
 * 🔐 Context Init
 */
const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_KEY = 'noura_cart'

/**
 * 🧠 Hook
 */
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

/**
 * 🧰 Provider Component
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // 🧠 Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY)
    if (stored) setCart(JSON.parse(stored))
  }, [])

  // 💾 Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  // ➕ Add Item (increase quantity if exists)
  const addItem = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.variantId === item.variantId)
      if (existing) {
        return prev.map(i =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prev, item]
    })
  }

  // ➖ Remove Item
  const removeItem = (variantId: string) => {
    setCart(prev => prev.filter(i => i.variantId !== variantId))
  }

  // 🧹 Clear All
  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
//export { CartProvider } 