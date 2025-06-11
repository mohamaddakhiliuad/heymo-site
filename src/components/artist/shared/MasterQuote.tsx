'use client'

import Link from 'next/link'

interface MasterQuoteProps {
  text: string
  author: string
  authorUrl?: string // ✅ لینک اختیاری به صفحه استاد
  subtitle?: string
  avatarUrl?: string
}

/**
 * MasterQuote Component
 * --------------------------------------------------
 * Displays a highlighted quote with author name,
 * optional avatar and subtitle. Supports linking
 * the author's name and aligning avatar inline.
 */
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

      {/* Author section with optional avatar and link */}
      <div className="flex items-center gap-3">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={author}
            className="w-10 h-10 rounded-full border border-[#e2d7c6] shadow"
          />
        )}

        {/* Linked or plain author name */}
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

      {/* Optional subtitle below */}
      {subtitle && <p className="text-sm text-[#9a8c7d] mt-1">{subtitle}</p>}
    </div>
  )
}
