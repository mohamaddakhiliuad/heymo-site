import Link from 'next/link'
import Image from 'next/image'

type BlogCardProps = {
  slug: string
  title: string
  date: string
  excerpt?: string
  coverImage?: string
}

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
  coverImage,
}: BlogCardProps) {
  return (
    <article className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
      <Link href={`/blog/${slug}`}>
        <div>
          {coverImage && (
            <div className="relative w-full h-60">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          )}

          <div className="p-5">
            <h2 className="text-2xl font-serif text-brown font-semibold mb-2">
              {title}
            </h2>
            <p className="text-gray-500 text-sm mb-3">{date}</p>
            {excerpt && (
              <p className="text-brown text-base line-clamp-3">{excerpt}</p>
            )}
            <p className="text-brown mt-4 underline">Read more →</p>
          </div>
        </div>
      </Link>
    </article>
  )
}
