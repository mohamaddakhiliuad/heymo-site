'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Artwork } from '@/types/artwork'
import ArtworkLightbox from '@/components/ui/SimpleArtworkLightbox'

interface ArtworkCardProps {
  artwork: Artwork
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="bg-white rounded-2xl overflow-hidden border border-[#ddd0c2] shadow-sm hover:shadow-md transition flex flex-col h-full cursor-pointer"
        itemScope
        itemType="https://schema.org/CreativeWork"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={artwork.imageSrc}
            alt={artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover rounded-t-2xl"
            priority
          />
        </div>

        <div className="p-4 flex-grow text-[#4e3a2f]">
          <h3 className="text-md font-semibold mb-2" itemProp="name">
            {artwork.title}
          </h3>
          <p className="text-sm text-[#7c6f63]">
            {artwork.location}{artwork.year ? ` — ${artwork.year}` : ''}
          </p>
        </div>
      </div>

      <ArtworkLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        image={artwork.imageSrc}
        title={artwork.title}
      />
    </>
  )
}
