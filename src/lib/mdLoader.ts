import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// مسیر محتوای بلاگ
function resolvePostsDirectory() {
  const possiblePaths = [
    path.join(process.cwd(), 'src', 'content', 'blog'),
    path.join(process.cwd(), 'content', 'blog'),
  ]

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p
  }

  throw new Error('❌ Blog content folder not found. Checked: ' + possiblePaths.join(', '))
}

const postsDirectory = resolvePostsDirectory()

// گرفتن لیست همه پست‌ها
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  //console.log("[🧩 Files in blog folder]", fileNames)

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      if (!data.title || !data.date) {
        console.warn(`⚠️ Skipping post "${fileName}" — missing title or date`)
        return null
      }

      const postData = {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt ?? '',
        coverImage: data.coverImage ?? '',
      }

      //console.log("[✅ Post loaded]", postData)

      return postData
    })
    .filter(Boolean)

  return posts.sort((a, b) => (a!.date < b!.date ? 1 : -1))
}

// گرفتن یک پست بر اساس slug
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  // بررسی وجود فایل
  if (!fs.existsSync(fullPath)) {
    throw new Error(`❌ Post not found: ${slug}.md`)
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
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
