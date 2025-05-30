import { notFound } from 'next/navigation'
import { artworks } from '@/data/artworks'
import { Metadata } from 'next'
import Image from 'next/image'

interface Props {
  params: {
    id: string
  }
}

/**
 * Artwork Detail Page
 * -----------------------------------
 * Displays full details for a single artwork
 * - Based on dynamic route from ID
 * - Pulls data from artworks.ts
 */
export default function ArtworkDetailPage({ params }: Props) {
  const artwork = artworks.find((item) => item.id === params.id)

  if (!artwork) return notFound()

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif text-[#5e4033] mb-4">{artwork.title}</h1>

      {/* Gallery */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {artwork.media.map((item, index) =>
          item.type === 'image' ? (
            <img
              key={index}
              src={item.src}
              alt={`${artwork.title} - ${index + 1}`}
              className="rounded-xl object-contain w-full"
            />
          ) : (
            <video
              key={index}
              controls
              src={item.src}
              className="rounded-xl w-full"
            />
          )
        )}
      </div>

      {/* Description */}
      {artwork.description && (
        <p className="text-sm text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
          {artwork.description}
        </p>
      )}

      {/* Sale Status */}
      <div className="text-sm text-gray-600 mb-4 italic">
        {artwork.isSold
          ? 'This artwork has been sold.'
          : artwork.isForSale
          ? artwork.hasOriginal && artwork.hasPrint
            ? 'Available as print and original'
            : artwork.hasPrint
            ? 'Available as print'
            : 'Original available'
          : 'Not for sale'}
      </div>

      {/* Price + Buy */}
      {artwork.isForSale && artwork.price && !artwork.isSold && artwork.shopifyHandle && (
        <a
          href={`https://your-shopify-url.com/products/${artwork.shopifyHandle}`}
          className="inline-block bg-[#5e4033] text-white px-6 py-2 rounded-full text-sm hover:bg-[#3e2e24] transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Now – ${artwork.price} {artwork.currency}
        </a>
      )}
    </section>
  )
}
