// components/artist/tabs/LifeAndLight.tsx
'use client'

import Image from 'next/image'
import FormWrapper from '@/components/ui/FormWrapper'
import Link from 'next/link'
import MasterQuote from '@/components/artist/shared/MasterQuote'
/**
 * LifeAndLight Tab
 * ------------------------------------------------
 * Hero-style intro section for Master Alijanpour's biography & philosophy
 */
export default function LifeAndLight() {
  return (
    <FormWrapper
      title="Life & Light"
      description="A journey through spirit, tradition, and transformation."
    >
      {/* Portrait + Quote */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden">
          <Image
            src="/artworks/hero-alijanpour.jpg"
            alt="Master Alijan Alijanpour Portrait"
            fill
            className="object-cover"
            priority
          />
        </div>
        <blockquote className="text-[#4e3a2f] text-lg leading-relaxed italic">
          “Throughout my career, I have journeyed with intention to push beyond the traditions of Persian Miniature to expand upon it — shifting its emphasis from the physical world unto that of the spiritual world.”
        </blockquote>
      </div>

      {/* Quote from Rumi */}
      <p className="italic text-sm text-[#7c6f63] mt-4">
        “درونِ من تویی، بیرون من تویی، چو جان اندر میانِ من تویی” — مولانا
      </p>



      {/* Biography paragraph */}
      <div className="mt-10 space-y-6 text-base text-[#4e3a2f] leading-relaxed">
        <p>
          Born in 1956 in Fereydunkenar, Iran, Master Alijanpour discovered his passion for art at the age of seven and has never stopped creating since. In 2000, he immigrated to Canada and opened Irena Art Gallery & School in Toronto, where he continues to mentor students and develop his unique style.
        </p>
        <p>
          Deeply influenced by poets like Rumi, Hafez, and Shams, his work blends divine femininity, cosmic symbolism, and classical miniature with contemporary expression. Each brushstroke is a call to spiritual reflection.
        </p>
      </div>
      <MasterQuote
        text="Mr. Alijanpour is a painter who has a curious vision, and through his innovative works..."
        author="Mahmoud Farshchian"
        subtitle="Master of Persian Miniature"
        authorUrl='https://en.wikipedia.org/wiki/Mahmoud_Farshchian'
        avatarUrl="/avatars/farshchian.jpg"
      />
      <MasterQuote
  text="Thank you very much for your beautiful book with its lovely artistry. I greatly appreciate your kindness. I congratulate you as well on your lifetime of devotion to your art. You are making a magnificent contribution to our rich quality of life in Ontario."
  author="Dalton McGuinty"
  authorUrl="https://en.wikipedia.org/wiki/Dalton_McGuinty"
  subtitle="Premier of Ontario, Canada – Nov 2009"
  avatarUrl="/avatars/mcguinty.jpg"
/>


      {/* Artistic Philosophy */}
      <div className="mt-10 space-y-4 text-base text-[#4e3a2f]">
        <h3 className="text-lg font-semibold">Artistic Philosophy</h3>
        <p>
          Master Alijanpour's artistic philosophy is rooted in the sacred transformation of classical miniature into a spiritual practice. He does not aim to replicate tradition but to transcend it. His brush reveals the invisible — the longing for unity, the silent presence of the divine feminine, and the cosmic dance between shadow and light.
        </p>
        <p className="italic text-sm text-[#7c6f63]">
          “Painting is not what I do — it's how I breathe the light in darkness.”
        </p>
      </div>

      {/* CV download */}
      <div className="mt-8">
        <Link
          href="/docs/Alijanpour_CV.pdf"
          className="inline-block border border-[#4e3a2f] text-[#4e3a2f] px-4 py-2 rounded hover:bg-[#4e3a2f] hover:text-white transition"
        >
          Download Full CV
        </Link>
      </div>
    </FormWrapper>
  )
}
