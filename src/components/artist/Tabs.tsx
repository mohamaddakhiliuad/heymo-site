// components/artist/Tabs.tsx
'use client'

import clsx from 'clsx'

interface TabsProps {
  tabs: string[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

/**
 * Tabs Component
 * --------------------------------
 * Renders tab headers and updates active tab on click
 */
export default function Tabs({ tabs, activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={clsx(
            'px-4 py-2 rounded-full border font-serif text-sm transition',
            activeTab === tab
              ? 'bg-[#5e4033] text-white'
              : 'border-[#5e4033] text-[#5e4033] hover:bg-[#eee3da]'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}