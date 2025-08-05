import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/mdLoader'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="group border rounded-lg overflow-hidden hover:shadow-lg transition">
              {post.coverImage && (
                <div className="relative w-full h-60">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm">{post.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
