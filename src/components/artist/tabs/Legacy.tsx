'use client'

import FormWrapper from '@/components/ui/FormWrapper'

/**
 * Legacy Tab
 * ------------------------------------------------
 * Highlights the long-term impact and cultural footprint of Master Alijanpour.
 */
export default function Legacy() {
  return (
    <FormWrapper
      title="Legacy"
      description="A reflection on Master Alijanpour’s lasting influence through art, education, and cultural contribution."
    >
      <section className="space-y-10 text-[#4e3a2f] leading-relaxed text-base">
        {/* 1. Educational Legacy */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Educational Legacy</h3>
          <p>
            Master Alijanpour founded Irena Art Gallery & School in Toronto in 2000, where he has taught
            hundreds of students for over two decades. His teaching philosophy combines classical Persian
            techniques with spiritual and poetic reflection, nurturing not only technical skill but artistic soul.
          </p>
          <p className="mt-2">
            Through workshops, mentorship, and public lectures, he has helped transmit the delicate art
            of miniature painting to a new generation in Canada and beyond.
          </p>
        </div>

        {/* 2. Artistic Influence */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Artistic Influence</h3>
          <p>
            As a contemporary master, Alijanpour has redefined Persian miniature by infusing it with cosmic
            abstraction and the divine feminine. His works reflect an inner mystical journey inspired by poets
            such as Rumi, Hafez, and Shams.
          </p>
          <p className="mt-2">
            By blending classical tradition with symbolic modern expression, he has influenced a wave of artists
            in Iran, Canada, and the Middle East who seek to bridge heritage with higher consciousness.
          </p>
        </div>

        {/* 3. Permanent Collections */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Permanent Collections</h3>
          <p>
            Selected works by Master Alijanpour are held in prestigious collections, including the Tehran Museum
            of Contemporary Art, royal foundations in the UAE, and the Khawla Art Foundation.
          </p>
          <p className="mt-2">
            His paintings have also been gifted to world leaders and cultural institutions, affirming their status
            as both diplomatic and artistic treasures.
          </p>
        </div>

        {/* 4. Cultural Contribution */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Cultural Contribution</h3>
          <p>
            Through art donations addressing global crises, public speaking, and cultural engagement, Master
            Alijanpour has become a soft ambassador of Persian aesthetics and spiritual thought.
          </p>
          <p className="mt-2">
            He has been officially recognized by Canadian leaders, including a Premier, Governor General, and
            multiple MPPs, for his role in enriching the cultural landscape of Ontario and Canada.
          </p>
        </div>
      </section>
    </FormWrapper>
  )
}
