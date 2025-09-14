'use client'
import { useSelectedLayoutSegments } from 'next/navigation'

/**
 * هر چیزی را که داخل <SiteChrome> بگذاری، فقط وقتی نمایش می‌دهد که
 * سگمنت اول بعد از locale جزو لیست «ممنوعه‌ها» نباشد.
 * این‌جا 'u' را مخفی می‌کنیم (یعنی روی /[locale]/u/* هدر/فوتر نیاید).
 */
const HIDE_ON_FIRST_SEGMENT = new Set(['u']) // اگر بعداً checkout هم خواستی: new Set(['u','checkout'])

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments() // سگمنت‌های بعد از [locale]
  const first = segments[0] || ''
  if (HIDE_ON_FIRST_SEGMENT.has(first)) return null
  return <>{children}</>
}
