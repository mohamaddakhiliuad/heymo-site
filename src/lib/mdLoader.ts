import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import externalLinks from 'remark-external-links' // 🧩 For auto external <a target="_blank">
 
// 🗂️ Resolve the blog content directory (flexible for dev/prod)
function resolvePostsDirectory() {
  const possiblePaths = [
    path.join(process.cwd(), 'src', 'content', 'blog'),  // typical src/ structure
    path.join(process.cwd(), 'content', 'blog'),         // flat root structure (fallback)
  ]

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p
  }

  throw new Error(
    '❌ Blog content folder not found. Checked: ' + possiblePaths.join(', ')
  )
}

const postsDirectory = resolvePostsDirectory()

// 📥 Load all valid blog posts (with title + date)
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // only .md files
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      // ⛔ skip if required metadata is missing
      if (!data.title || !data.date) {
        console.warn(`⚠️ Skipping "${fileName}" – missing title or date`)
        return null
      }

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt ?? '',
        coverImage: data.coverImage ?? '',
      }
    })
    .filter(Boolean) // remove nulls

  // 📅 Sort by date (newest first)
  return posts.sort((a, b) => (a!.date < b!.date ? 1 : -1))
}

// 📄 Load a single post by slug
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  // 🚨 File not found
  if (!fs.existsSync(fullPath)) {
    throw new Error(`❌ Post not found: ${slug}.md`)
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // 🧠 Convert markdown to HTML + auto external link attributes
  const processedContent = await remark()
    .use(externalLinks, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    })
    .use(html)
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt ?? '',
    coverImage: data.coverImage ?? '',
    contentHtml,
  }
}
