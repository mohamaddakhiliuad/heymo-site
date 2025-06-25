// components/services/ServiceCard.tsx
'use client'

import Link from 'next/link'

interface Props {
  title: string
  description: string
  icon: string
}

export default function ServiceCard({ title, description, icon }: Props) {
  return (
    <Link
      href={{ pathname: '/connect', query: { type: title } }}
      className="block"
    >
      <div className="bg-white border border-[#ddd0c2] rounded-xl p-6 shadow hover:shadow-md transition text-[#5e4033] hover:bg-[#f7f0ea] cursor-pointer">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 font-serif">{title}</h3>
        <p className="text-sm text-[#7c6f63] leading-relaxed">{description}</p>
      </div>
    </Link>
  )
}
