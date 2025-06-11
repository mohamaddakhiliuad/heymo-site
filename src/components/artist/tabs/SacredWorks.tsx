'use client'

import { alijanpour } from '@/data/artists/alijanpour'
import { museumArtworks } from '@/data/artworks/museumArtworks'
import FormWrapper from '@/components/ui/FormWrapper'
import ArtworkCard from '@/components/artwork/ArtworkCard'

/**
 * SacredWorks Tab
 * ------------------------------------------------------
 * Showcases museum-held or historically significant works
 */
export default function SacredWorks() {
  return (
    <FormWrapper
      title="Sacred Works"
      description="A selection of works by Master Alijanpour currently housed in major museums and cultural institutions."
    >
      {/* Museum list */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[#4e3a2f]">Collections & Museums:</h3>
        <ul className="list-disc pl-5 text-base text-[#4e3a2f]">
          {alijanpour.highlights.museums.map((museum, index) => (
            <li key={index}>{museum}</li>
          ))}
        </ul>
      </div>

      {/* Exhibitions */}
      <div className="mt-10 space-y-6">
        <h3 className="text-lg font-semibold text-[#4e3a2f]">Selected Exhibitions:</h3>
        <ul className="list-disc pl-5 text-base text-[#4e3a2f]">
          {alijanpour.highlights.exhibitions.map((exhibit, index) => (
            <li key={index}>{exhibit}</li>
          ))}
        </ul>
      </div>

      {/* Artworks grid */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-[#4e3a2f] mb-4">Highlighted Museum Artworks:</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {museumArtworks.map((artwork, index) => (
            <ArtworkCard key={index} artwork={artwork} />
          ))}
        </div>
      </div>
    </FormWrapper>
  )
}
