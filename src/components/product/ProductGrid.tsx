'use client'

import { useState } from 'react'
import clsx from 'clsx'
import ProductCard from './ProductCard'
import ProductSkeleton from './ProductSkeleton'
import ProductFilter from './ProductFilter'
import { ProductGridProps } from '@/types/ProductGridProps'
import {
  sectionWrapper,
  sectionTitle,
} from '@/styles/formStyles'

/**
 * ProductGrid – Classic Grid Layout
 * --------------------------------------------
 * All cards have equal width & height (handled via Tailwind + CSS)
 */
export default function ProductGrid({
  title,
  products = [],
  shopUrl,
  className,
  isLoading = false,
}: ProductGridProps & { isLoading?: boolean }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Extract unique tags and categories
  const tags = Array.from(new Set(products.flatMap(p => p.tags || [])))
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))

  // Filter products
  const filteredProducts = products.filter(p =>
    (!selectedTag || (p.tags || []).includes(selectedTag)) &&
    (!selectedCategory || p.category === selectedCategory)
  )

  return (
    <section className={clsx(sectionWrapper, className)}>
      {title && <h2 className={sectionTitle}>{title}</h2>}
      <ProductFilter
        tags={tags}
        categories={categories}
        selectedTag={selectedTag}
        selectedCategory={selectedCategory}
        onTagChange={setSelectedTag}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {isLoading
          ? Array.from({ length: 8 }, (_, i) => <ProductSkeleton key={i} />)
          : filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} shopUrl={shopUrl} />
            ))}
      </div>
    </section>
  )
}
