// components/artist/tabs/Legacy.tsx
'use client'

import { alijanpour } from '@/data/artists/alijanpour'
import FormWrapper from '@/components/ui/FormWrapper'

/**
 * Legacy Tab
 * ------------------------------------------------------
 * Displays affiliations, influence, and the continuing legacy of Alijanpour's work
 */
export default function Legacy() {
  return (
    <FormWrapper
      title="Legacy"
      description="Organizations, values, and ongoing influence shaped by Alijanpour’s lifelong commitment to art."
    >
      {/* Affiliations */}
      <div className="space-y-6 text-[#4e3a2f] text-base">
        <h3 className="text-lg font-semibold">Professional Affiliations:</h3>
        <ul className="list-disc pl-5">
          {alijanpour.affiliations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Impact */}
      <div className="mt-10 space-y-4 text-sm italic text-[#7c6f63]">
        <p>
          Alijanpour’s work has influenced a new generation of artists blending classical Persian styles with spiritual exploration. His mentorship and exhibitions continue to shape cultural discourse across continents.
        </p>
        <p>
          His presence in major museums and lasting connection to Rumi and other mystical traditions reinforce his position not just as a painter, but as a spiritual visual storyteller.
        </p>
      </div>
    </FormWrapper>
  )
}
