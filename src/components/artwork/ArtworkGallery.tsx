'use client'

import Masonry from 'react-masonry-css'
import { artworks } from '@/data/artworks'
import ArtworkCard from './ArtworkCard'
import { sectionWrapper, sectionTitle } from '@/styles/formStyles'

/**
 * ArtworkGallery
 * ------------------------------------------------
 * Displays all artworks in a responsive Masonry layout
 * - Uses react-masonry-css for column-based layout
 * - Responsive across breakpoints
 * - Uses centralized styles from formStyles.ts
 * - Wraps section with semantic tags for SEO
 */

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1,
}

export default function ArtworkGallery() {
  return (
    <section
      className={sectionWrapper}
      aria-label="Artwork Gallery"
    >
      {/* Section Title */}
      <h2 className={sectionTitle}>Artworks by Master Alijanpour</h2>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {artworks.map((artwork) => (
          <article
            key={artwork.id}
            itemScope
            itemType="https://schema.org/VisualArtwork"
          >
            <ArtworkCard artwork={artwork} />
          </article>
        ))}
      </Masonry>
    </section>
  )
}
