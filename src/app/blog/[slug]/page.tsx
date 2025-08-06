import { getAllPosts, getPostBySlug } from "@/lib/mdLoader"
import Image from "next/image"
import Script from "next/script"
import type { Metadata } from "next"

// ✅ صفحه اصلی پست
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
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

        {/* Structured Data – JSON-LD */}
        <Script id="ld-json" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            image: [`https://rumilander.art${post.coverImage}`],
            author: {
              "@type": "Person",
              name: "Master Alijan Alijanpour",
            },
            publisher: {
              "@type": "Organization",
              name: "Noura Gallery",
              logo: {
                "@type": "ImageObject",
                url: "https://rumilander.art/logo.png", // ← لوگو را اصلاح کن اگر تغییر داره
              },
            },
            datePublished: post.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://rumilander.art/blog/${slug}`,
            },
          })}
        </Script>
      </div>
    </div>
  )
}

// ✅ Static Params برای SSG
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// ✅ Metadata – برای SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "",
      url: `https://rumilander.art/blog/${slug}`,
      type: "article",
      images: [
        {
          url: `https://rumilander.art${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? "",
      images: [`https://rumilander.art${post.coverImage}`],
    },
  }
}
