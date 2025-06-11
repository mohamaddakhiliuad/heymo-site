// components/artist/tabs/StageAndStory.tsx
'use client'

import { alijanpour } from '@/data/artists/alijanpour'
import FormWrapper from '@/components/ui/FormWrapper'

/**
 * StageAndStory Tab
 * ------------------------------------------------------
 * Displays key milestones in Master Alijanpour's career journey
 */
export default function StageAndStory() {
  return (
    <FormWrapper
      title="Stage & Story"
      description="A chronological view of Alijanpour’s artistic evolution and major life milestones."
    >
      <div className="space-y-6 text-[#4e3a2f] text-base">
        <ul className="list-disc pl-5">
          <li><strong>1956</strong> – Born in Fereydunkenar, Iran</li>
          <li><strong>1963</strong> – Begins exploring art and Persian miniature at age 7</li>
          <li><strong>1980s–1990s</strong> – Exhibits widely in Iran and internationally</li>
          <li><strong>2000</strong> – Immigrates to Canada and establishes Irena Art Gallery & School in Toronto</li>
          <li><strong>2009</strong> – Receives the Freshness Winner Award from the Society of Canadian Artists</li>
          <li><strong>2012</strong> – Exhibits at RUM (Rome, Italy)</li>
          <li><strong>Present</strong> – Actively painting, mentoring, and exhibiting globally</li>
        </ul>
      </div>
    </FormWrapper>
  )
}
