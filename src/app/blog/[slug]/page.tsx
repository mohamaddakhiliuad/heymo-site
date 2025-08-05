import { getAllPosts, getPostBySlug } from "@/lib/mdLoader"
import Image from "next/image"

// ✅ حالا params رو به صورت Promise تعریف می‌کنیم
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // ✅ قبل از استفاده از slug، params رو await می‌کنیم
  const { slug } = await params

  const post = await getPostBySlug(slug)

  return (
    <div className="bg-cream min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-10">

        {/* عنوان مقاله */}
        <h1 className="text-5xl md:text-6xl font-serif text-center text-brown font-bold leading-tight mb-4">
          {post.title}
        </h1>

        {/* تاریخ */}
        <p className="text-center text-gray-500 mb-10">{post.date}</p>

        {/* تصویر کاور */}
        {post.coverImage && (
          <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* متن مقاله */}
        <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brown prose-p:text-brown prose-a:text-brown prose-a:underline prose-strong:text-brown prose-blockquote:border-l-brown prose-blockquote:text-brown prose-blockquote:bg-cream prose-blockquote:rounded-md prose-blockquote:italic leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </div>
    </div>
  )
}

// ✅ همچنان برای Static Params باید این رو داشته باشی
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
