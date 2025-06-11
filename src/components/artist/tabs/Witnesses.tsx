// components/artist/tabs/Witnesses.tsx
'use client'

import { alijanpour } from '@/data/artists/alijanpour'
import FormWrapper from '@/components/ui/FormWrapper'

/**
 * Witnesses Tab
 * ------------------------------------------------------
 * Displays recognitions, letters, and awards received
 */
export default function Witnesses() {
  return (
    <FormWrapper
      title="Witnesses"
      description="Accolades, letters of recognition, and awards that celebrate the impact of Alijanpour's artistic journey."
    >
      {/* Awards */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[#4e3a2f]">Awards & Recognitions:</h3>
        <ul className="list-disc pl-5 text-base text-[#4e3a2f]">
          {alijanpour.awards.map((award, index) => (
            <li key={index}>
              <strong>{award.title}</strong> – {award.issuedBy} ({award.year})
            </li>
          ))}
        </ul>
      </div>

      {/* Letters */}
      <div className="mt-10 space-y-6">
        <h3 className="text-lg font-semibold text-[#4e3a2f]">Letters of Support:</h3>
        <p className="text-sm italic text-[#7c6f63]">
          Letters of recognition and appreciation received from institutions and individuals will be displayed here.
        </p>
      </div>
    </FormWrapper>
  )
}
