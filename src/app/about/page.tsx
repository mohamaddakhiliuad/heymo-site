// Alijanpour Artist Page Entry – React + Tailwind + Next.js structure (App Router)

'use client'

import { useState } from 'react'
import Tabs from '@/components/artist/Tabs'
import TabContent from '@/components/artist/TabContent'
import { sectionWrapper } from '@/styles/formStyles'

// ⬇️ Organize tab components under /components/artist/tabs/
// Example: LifeAndLight.tsx, SacredWorks.tsx, etc.

const tabs = [
  'Life & Light',
  'Sacred Works',
  'Witnesses',
  'Stage & Story',
  'Legacy'
]

export default function ArtistPage() {
  const [activeTab, setActiveTab] = useState('Life & Light')

  return (
    <main className="bg-[#fff8f2] text-[#5e4033] min-h-screen">
      {/* 1️⃣ Hero Section with portrait and quote */}
   

      {/* 2️⃣ Tab Navigation */}
      <div className={sectionWrapper}>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 3️⃣ Active Tab Content – dynamically loads content per section */}
      <section className="pb-24">
        <TabContent activeTab={activeTab} />
      </section>
    </main>
  )
}
