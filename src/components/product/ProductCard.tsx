'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  shopUrl: string
}

/**
 * ProductCard (Optimized with next/image)
 * ----------------------------------------
 * Features:
 * - Fixed aspect ratio (3/4) with Image optimization
 * - Title always visible under image
 * - "View Details" button
 * - Prevents image blurriness in grid
 */
export default function ProductCard({ product }: ProductCardProps) {
  const productLink = `/products/${product.handle}`
  const imageSrc = product.imageSrc

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-[#ddd0c2] shadow-sm hover:shadow-md transition flex flex-col h-full"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* ✅ Image container with aspect ratio */}
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover rounded-t-2xl"
          priority
        />
      </div>

      {/* ✅ Title + Button */}
      <div className="flex flex-col justify-between p-4 flex-grow">
        <h3
          className="text-md font-serif text-[#5e4033] mb-4 line-clamp-2"
          itemProp="name"
        >
          {product.title}
        </h3>
        <Link
          href={productLink}
          className="inline-block text-center bg-[#5e4033] text-white text-sm px-4 py-2 rounded-full hover:bg-[#3d2b23] transition"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}
