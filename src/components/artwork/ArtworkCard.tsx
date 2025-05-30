'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from 'yet-another-react-lightbox/plugins/captions'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

import { Artwork } from '@/data/artworks'
import Link from 'next/link'
import {
  artworkImage,
  artworkVideo,
  artworkTitle,
  artworkBuyButton,
  artworkViewLink,
} from '@/styles/formStyles'

interface Props {
  artwork: Artwork
}

/**
 * ArtworkCard with Lightbox
 * ----------------------------------
 * - Shows media preview (first image/video)
 * - On click, opens full Lightbox with all artwork.media[]
 * - Uses centralized styles
 */
export default function ArtworkCard({ artwork }: Props) {
  const [open, setOpen] = useState(false)
  const firstMedia = artwork.media[0]

  const saleLabel = artwork.isSold
    ? 'Sold'
    : artwork.isForSale
    ? artwork.hasPrint && !artwork.hasOriginal
      ? 'Print Only'
      : !artwork.hasPrint && artwork.hasOriginal
      ? 'Original Only'
      : 'For Sale'
    : 'Not for Sale'

  const formattedPrice = artwork.price?.toLocaleString('en-US')

  const slides = artwork.media.map((m) => ({
    src: m.src,
    type: m.type === 'video' ? 'video' : undefined,
  }))

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col space-y-3 group">
      
      {/* Clickable Media Preview */}
      <div className="overflow-hidden rounded-md cursor-zoom-in" onClick={() => setOpen(true)}>
        {firstMedia.type === 'image' ? (
          <img
            src={firstMedia.src}
            alt={artwork.title}
            className={artworkImage}
          />
        ) : (
          <video
            src={firstMedia.src}
            controls
            className={artworkVideo}
          />
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Zoom, Captions]}
      />

      {/* Title */}
      <h3 className={artworkTitle}>{artwork.title}</h3>

      {/* Sale status */}
      <p className="text-xs text-gray-500 italic">{saleLabel}</p>

      {/* Price */}
      {artwork.price && artwork.isForSale && (
        <p className="text-sm font-semibold text-[#5e4033]">
          ${formattedPrice} {artwork.currency}
        </p>
      )}

      {/* Action Button */}
      <div className="mt-auto">
        {artwork.isForSale && artwork.shopifyHandle ? (
          <a
            href={`https://your-shopify-url.com/products/${artwork.shopifyHandle}`}
            className={artworkBuyButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Now
          </a>
        ) : (
          <Link href={`/artworks/${artwork.id}`} className={artworkViewLink}>
            View Details →
          </Link>
        )}
      </div>
    </div>
  )
}
