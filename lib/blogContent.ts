import blogData from '../blog_posts.json'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string | null
  timestamp: string
}

type CmsSection = {
  sectionKey: string
  contentJson: string | null
  enabled: boolean
}

type CmsPage = {
  sections: CmsSection[]
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  image: string
  readTime: string
  href: string
  slug: string
  enabled?: boolean
}

const data = blogData as BlogPost[] | { posts?: BlogPost[] }

export const defaultBlogPosts: BlogPost[] = Array.isArray(data) ? data : data.posts || []

export const parseBlogPosts = (
  contentJson: string | null | undefined,
  fallbackPosts: BlogPost[] = defaultBlogPosts,
) => {
  if (!contentJson) {
    return fallbackPosts
  }

  try {
    const parsed = JSON.parse(contentJson) as { posts?: Partial<BlogPost>[] }
    if (!Array.isArray(parsed.posts) || parsed.posts.length === 0) {
      return fallbackPosts
    }

    return parsed.posts.map((post, index) => {
      const fallback = fallbackPosts[index]
      const slug = post.slug || fallback?.slug || `blog-yazisi-${index + 1}`
      return {
        id: Number(post.id) || fallback?.id || index + 1,
        title: post.title || fallback?.title || '',
        excerpt: post.excerpt || fallback?.excerpt || '',
        content: post.content || fallback?.content || '',
        category: post.category || fallback?.category || 'Blog',
        date: post.date || fallback?.date || '',
        image: post.image || fallback?.image || '/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file',
        readTime: post.readTime || fallback?.readTime || '1 dk okuma',
        href: post.href || fallback?.href || `/blog/${slug}`,
        slug,
        enabled: post.enabled !== false,
      }
    })
  } catch {
    return fallbackPosts
  }
}

export const buildBlogContentJson = (posts: BlogPost[]) => JSON.stringify({ posts }, null, 2)

export const getAllBlogPosts = () => defaultBlogPosts

export const getBlogPostBySlug = (slug: string) =>
  defaultBlogPosts.find((post) => post.slug === slug)

export const getAllCategories = () =>
  Array.from(new Set(defaultBlogPosts.map((post) => post.category)))

export const getPublicBlogPosts = async () => {
  const previewJson = readLocalPreviewSectionJson('blog', 'blog.list')
  if (previewJson) return parseBlogPosts(previewJson).filter((post) => post.enabled !== false)
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/blog`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return defaultBlogPosts.filter((post) => post.enabled !== false)
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === 'blog.list')
    if (!section || !section.enabled) {
      return defaultBlogPosts.filter((post) => post.enabled !== false)
    }

    return parseBlogPosts(section.contentJson).filter((post) => post.enabled !== false)
  } catch {
    return defaultBlogPosts.filter((post) => post.enabled !== false)
  }
}

export const getPublicBlogPostBySlug = async (slug: string) => {
  const posts = await getPublicBlogPosts()
  return posts.find((post) => post.slug === slug) || getBlogPostBySlug(slug)
}

const activeLegacyBlogSlugs = new Set([
  'rustik-perde-sevenler-buraya',
  'zebra-perdeler-nasil-temizlenir',
  'perdelerde-dogru-renk-secimi',
  'perdeler-ve-mobilyalarin-uyumu',
  'perdeler-hakkinda-en-cok-sorulan-sorular',
  'perde-beyazlatma-yontemleri',
  'olcuye-gore-perdeler-alirken-dikkat-edilmesi-gerekenler',
  'is-yerleri-icin-perde-tercihi',
  'ic-mekanlarda-kirmizi-perde-kullanimi',
])

export const getIndexableBlogPosts = async () => {
  const publicPosts = await getPublicBlogPosts()
  const legacyPosts = defaultBlogPosts.filter(
    (post) => post.enabled !== false && activeLegacyBlogSlugs.has(post.slug),
  )
  const postsByUrl = new Map<string, BlogPost>()

  for (const post of [...publicPosts, ...legacyPosts]) {
    if (!post.slug || post.enabled === false) continue
    postsByUrl.set(`/blog/${post.slug}`, post)
  }

  return Array.from(postsByUrl.values())
}
import { readLocalPreviewSectionJson } from '@/lib/localCmsPreview'
