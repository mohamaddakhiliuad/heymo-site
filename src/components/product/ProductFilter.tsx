'use client'

import { ChangeEvent } from 'react'

interface ProductFilterProps {
  categories: string[]
  tags: string[]
  selectedCategory: string | null
  selectedTag: string | null
  onCategoryChange: (category: string | null) => void
  onTagChange: (tag: string | null) => void
}

/**
 * ProductFilter – Category as soft buttons + Tag dropdown styled cleanly
 */
export default function ProductFilter({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange,
}: ProductFilterProps) {
  const handleTagChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    onTagChange(value === '' ? null : value)
  }

  return (
    <div className="mb-10">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-1 rounded-full border transition ${
            selectedCategory === null
              ? 'bg-[#5e4033] text-white'
              : 'border-[#d9cfc3] text-[#5e4033] hover:bg-[#f7f3ee]'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-1 rounded-full border transition ${
              selectedCategory === cat
                ? 'bg-[#5e4033] text-white'
                : 'border-[#d9cfc3] text-[#5e4033] hover:bg-[#f7f3ee]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tag Dropdown */}
      {tags.length > 0 && (
        <div className="flex justify-center items-center gap-2">
          <label className="text-sm font-serif text-[#5e4033]">Filter by Tag:</label>
          <select
            value={selectedTag || ''}
            onChange={handleTagChange}
            className="border border-[#d9cfc3] rounded-full px-4 py-2 text-sm bg-white text-[#4e3a2f] shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
