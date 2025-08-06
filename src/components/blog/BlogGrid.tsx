import BlogCard from './BlogCard'

type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt?: string
  coverImage?: string
}

type BlogGridProps = {
  posts: BlogPost[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-brown text-lg">
        No blog posts available at this time.
      </p>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => {
        if (!post.slug || !post.title || !post.date) {
          console.warn("⚠️ Skipping invalid post in BlogGrid:", post)
          return null
        }

        return (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            coverImage={post.coverImage}
          />
        )
      })}
    </section>
  )
}
