import { getAllPosts } from '@/lib/mdLoader'
import type { Metadata } from 'next'
import BlogCard from '@/components/blog/BlogCard'

// ✅ سئو: متادیتای صفحه اصلی بلاگ
export const metadata: Metadata = {
  title: "Blog – Insights from Master Alijanpour",
  description: "Explore stories, interviews, and philosophies behind the artworks of Master Alijan Alijanpour.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="bg-cream min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-serif text-brown font-bold mb-4">Blog</h1>
          <p className="text-gray-600 text-lg">
            Stories, interviews, and thoughts from Master Alijanpour’s world of miniature art.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              coverImage={post.coverImage}
            />
          ))}
        </section>
      </div>
    </main>
  )
}
