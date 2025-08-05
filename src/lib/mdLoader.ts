import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// تابعی که مسیر صحیح فولدر بلاگ را پیدا می‌کند
function resolvePostsDirectory() {
  const possiblePaths = [
    path.join(process.cwd(), 'src', 'content', 'blog'), // ساختار داخل src
    path.join(process.cwd(), 'content', 'blog'),        // ساختار مستقیم در روت
  ]

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p
    }
  }

  throw new Error('❌ Blog content folder not found. Checked: ' + possiblePaths.join(', '))
}

const postsDirectory = resolvePostsDirectory()

// گرفتن همه پست‌ها برای صفحه آرشیو
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data } = matter(fileContents)

    return {
      slug,
      ...(data as { title: string; date: string; coverImage?: string })
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// گرفتن یک پست بر اساس slug
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    ...(data as { title: string; date: string; coverImage?: string }),
    contentHtml
  }
}
