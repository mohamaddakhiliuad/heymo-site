'use client'

import Link from 'next/link'
import Image from 'next/image' // ✅ Import Image

interface MasterQuoteProps {
  text: string
  author: string
  authorUrl?: string
  subtitle?: string
  avatarUrl?: string
}

export default function MasterQuote({
  text,
  author,
  authorUrl,
  subtitle,
  avatarUrl,
}: MasterQuoteProps) {
  return (
    <div className="border-l-4 pl-4 py-4 bg-[#f9f6f1] rounded-md shadow-sm text-[#4e3a2f]">
      {/* Quote text */}
      <blockquote className="italic text-lg leading-relaxed mb-4">“{text}”</blockquote>

      {/* Author section */}
      <div className="flex items-center gap-3">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={author}
            width={40}
            height={40}
            className="rounded-full border border-[#e2d7c6] shadow object-cover"
          />
        )}

        {authorUrl ? (
          <Link
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#5e4033] hover:underline"
          >
            {author}
          </Link>
        ) : (
          <p className="text-sm font-semibold text-[#5e4033]">{author}</p>
        )}
      </div>

      {subtitle && <p className="text-sm text-[#9a8c7d] mt-1">{subtitle}</p>}
    </div>
  )
}
