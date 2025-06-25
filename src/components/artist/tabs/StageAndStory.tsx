'use client'

import { exhibitions } from '@/data/artists/exhibitions'
import ExhibitionCard from '@/components/artist/ExhibitionCard'
import FormWrapper from '@/components/ui/FormWrapper'

/**
 * StageAndStory
 * --------------------------------------------
 * Displays exhibitions and career milestones using ExhibitionCard.
 */
export default function StageAndStory() {
  return (
    <FormWrapper
      title="Stage & Story"
      description="Over five decades, Master Alijanpour has exhibited his work across continents — from Tehran and Toronto to Beijing, Athens, and California. Each show is a stage, each painting a story."
    >
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {exhibitions.map((item, idx) => (
          <ExhibitionCard
            key={idx}
            title={item.title}
            year={item.year}
            location={item.location}
            type={item.type}
            description={item.description}
            image={item.image}
            gallery={item.gallery} // در صورت وجود پشتیبانی از گالری
          />
        ))}
      </section>
    </FormWrapper>
  )
}
