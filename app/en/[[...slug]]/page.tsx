import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import EnglishProductGallery from '@/components/EnglishProductGallery'
import EnglishHome from '@/components/EnglishHome'
import About from '@/components/About'
import AboutPageHero from '@/components/AboutPageHero'
import { englishArticles, englishPages, englishProductCards, getEnglishChildPages, getEnglishParentKey } from '@/lib/englishContent'
import { getPublicProductGallery, getPublicProductGalleryVideo, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { localeAlternates, SITE_URL } from '@/lib/siteLocales'

type Params = { slug?: string[] }
const keyFrom = (params: Params) => params.slug?.join('/') || ''
const SOCIAL_IMAGE = '/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file'

const schemaTypeFor = (key: string) => {
  if (key === 'about') return 'AboutPage'
  if (key === 'contact') return 'ContactPage'
  if (key === 'products' || key.startsWith('products/')) return 'CollectionPage'
  return 'WebPage'
}

const breadcrumbsFor = (key: string, title: string) => {
  const keys: string[] = []
  let current = getEnglishParentKey(key)
  while (current) {
    keys.unshift(current)
    current = getEnglishParentKey(current)
  }

  return [
    { name: 'Home', item: `${SITE_URL}/en` },
    ...keys.map((parentKey) => ({
      name: englishPages[parentKey].title,
      item: `${SITE_URL}/en/${parentKey}`,
    })),
    ...(key ? [{ name: title, item: `${SITE_URL}/en/${key}` }] : []),
  ]
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const key = keyFrom(await params)
  const article = key.startsWith('blog/') ? englishArticles[key.slice(5)] : undefined
  const page = englishPages[key]
  const isBlogIndex = key === 'journal'
  const content = article || page
  if (!content && !isBlogIndex) return {}

  const englishPath = `/en${key ? `/${key}` : ''}`
  const turkishPath = content?.turkishPath || '/blog'
  const title = isBlogIndex
    ? 'Curtains, Blinds & Interior Design Journal'
    : content!.seoTitle.replace(/\s*\|\s*Pile Perde\s*$/i, '')
  const description = isBlogIndex
    ? 'Explore expert guidance on curtains, blinds, motorisation, upholstery fabrics and thoughtful interior detailing from the Pile Perde design team.'
    : content!.description

  return {
    title,
    description,
    other: {
      google: 'notranslate',
    },
    alternates: localeAlternates(turkishPath, englishPath),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${englishPath}`,
      siteName: 'Pile Perde',
      locale: 'en_GB',
      alternateLocale: ['tr_TR'],
      type: article ? 'article' : 'website',
      images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: `${title} | Pile Perde` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  }
}

function JsonLd({ value }: { value: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, '\\u003c') }} />
}

export default async function EnglishPage({ params }: { params: Promise<Params> }) {
  const key = keyFrom(await params)

  if (key === 'blog') permanentRedirect('/en/journal')

  if (key === 'journal') {
    const breadcrumbs = [
      { name: 'Home', item: `${SITE_URL}/en` },
      { name: 'Journal', item: `${SITE_URL}/en/journal` },
    ]
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <JsonLd value={{ '@context': 'https://schema.org', '@type': 'Blog', '@id': `${SITE_URL}/en/journal#blog`, url: `${SITE_URL}/en/journal`, name: 'Pile Perde Journal', description: 'Explore expert guidance on curtains, blinds, motorisation, upholstery fabrics and thoughtful interior detailing from the Pile Perde design team.', inLanguage: 'en-GB', publisher: { '@id': `${SITE_URL}/#organization` } }} />
        <JsonLd value={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${SITE_URL}/en/journal#breadcrumb`, itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) }} />
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap gap-2 text-xs text-gray-500">
            {breadcrumbs.map((crumb, index) => <span key={crumb.item}>{index > 0 && <span className="mr-2">/</span>}<Link href={crumb.item.replace(SITE_URL, '')}>{crumb.name}</Link></span>)}
          </nav>
          <p className="mb-4 text-xs tracking-[.25em] text-gray-500">PILE PERDE JOURNAL</p>
          <h1 className="mb-5 text-4xl font-extralight md:text-6xl">Curtains, Blinds & Interior Design</h1>
          <p className="mb-12 max-w-2xl text-gray-400">Thoughtful guidance on materials, motorisation and beautifully resolved window treatments.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {Object.entries(englishArticles).map(([slug, article]) => (
              <Link key={slug} href={`/en/blog/${slug}`} className="rounded-2xl border border-white/10 bg-white/[.04] p-7 transition hover:bg-white/[.08]">
                <span className="text-xs uppercase tracking-widest text-blue-300">{article.category}</span>
                <h2 className="my-4 text-2xl font-light">{article.title}</h2>
                <p className="text-sm leading-6 text-gray-400">{article.description}</p>
                <span className="mt-6 block text-sm">Read the article →</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    )
  }

  const article = key.startsWith('blog/') ? englishArticles[key.slice(5)] : undefined
  const content = article || englishPages[key]
  if (!content) notFound()

  if (key === '') return <EnglishHome />

  const englishPath = `/en${key ? `/${key}` : ''}`
  const breadcrumbs = article
    ? [
        { name: 'Home', item: `${SITE_URL}/en` },
        { name: 'Journal', item: `${SITE_URL}/en/journal` },
        { name: content.title, item: `${SITE_URL}${englishPath}` },
      ]
    : breadcrumbsFor(key, content.title)
  if (key === 'about') {
    const aboutBreadcrumbs = breadcrumbs.map((item) => ({
      name: item.name,
      url: item.item.replace(SITE_URL, ''),
    }))
    return (
      <main className="min-h-screen bg-black text-white overflow-x-clip">
        <JsonLd value={{ '@context': 'https://schema.org', '@type': 'AboutPage', '@id': `${SITE_URL}${englishPath}#primary`, url: `${SITE_URL}${englishPath}`, name: content.title, description: content.description, inLanguage: 'en-GB', isPartOf: { '@id': `${SITE_URL}/#website` } }} />
        <JsonLd value={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${SITE_URL}${englishPath}#breadcrumb`, itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) }} />
        <AboutPageHero breadcrumbItems={aboutBreadcrumbs} canonicalUrl={`${SITE_URL}${englishPath}`} locale="en" />
        <About locale="en" showCta={false} />
      </main>
    )
  }
  const childPages = article ? [] : getEnglishChildPages(key)
  const galleryCategoryKeys = new Set([
    'products/blinds-and-shades',
    'products/sheer-and-drapery',
    'products/upholstery-fabrics',
    'products/motorised-window-treatments',
    'products/curtain-accessories',
    'products/metal-chain-curtains',
  ])
  const hasProductGallery = !article
    && (content.turkishPath.startsWith('/model-perdeler/')
      || content.turkishPath.startsWith('/kurumsal-urunler/')
      || (content.turkishPath.startsWith('/urunler/') && !galleryCategoryKeys.has(key)))
  const productGalleryPageKey = `product-gallery-${content.turkishPath.replace(/^\/+|\/+$/g, '').replaceAll('/', '-')}`
  const productGalleryFallback: ProductGalleryImage[] = [{
    id: 1,
    src: content.image || SOCIAL_IMAGE,
    alt: `${content.title} gallery image 1`,
    title: `${content.title} 1`,
  }]
  const productGalleryImages = hasProductGallery
    ? (await getPublicProductGallery(productGalleryPageKey, productGalleryFallback)).map((image, index) => ({
        ...image,
        alt: `${content.title} gallery image ${index + 1}`,
        title: `${content.title} ${index + 1}`,
      }))
    : []
  const productGalleryVideo = hasProductGallery
    ? await getPublicProductGalleryVideo(productGalleryPageKey)
    : undefined
  const englishProductGalleryVideo = productGalleryVideo?.enabled !== false && productGalleryVideo?.youtubeUrl
    ? {
        ...productGalleryVideo,
        title: `How ${content.title} Operate`,
        description: `Watch how this ${content.title.toLowerCase()} solution operates and see the principal specification details.`,
      }
    : undefined

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">
      <JsonLd value={{
        '@context': 'https://schema.org',
        '@type': article ? 'BlogPosting' : schemaTypeFor(key),
        '@id': `${SITE_URL}${englishPath}#primary`,
        url: `${SITE_URL}${englishPath}`,
        name: content.title,
        headline: content.title,
        description: content.description,
        inLanguage: 'en-GB',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        ...(article ? {
          datePublished: article.datePublished,
          articleSection: article.category,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${englishPath}` },
          image: `${SITE_URL}${SOCIAL_IMAGE}`,
          author: { '@id': `${SITE_URL}/#organization` },
          publisher: { '@id': `${SITE_URL}/#organization` },
        } : {}),
      }} />
      {key && <JsonLd value={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${SITE_URL}${englishPath}#breadcrumb`, itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) }} />}

      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          {key && <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap gap-2 text-xs text-gray-500">
            {breadcrumbs.map((crumb, index) => <span key={crumb.item}>{index > 0 && <span className="mr-2">/</span>}<Link href={crumb.item.replace(SITE_URL, '')}>{crumb.name}</Link></span>)}
          </nav>}
          <p className="mb-5 text-xs uppercase tracking-[.25em] text-gray-500">{content.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-extralight leading-tight md:text-7xl">{content.title}</h1>
          <p className="mt-8 max-w-3xl text-lg font-light leading-8 text-gray-300 md:text-xl">{content.lead}</p>
          {article && <p className="mt-5 text-sm text-gray-500">{article.displayDate} · {article.category}</p>}
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_.7fr]">
          <article className="space-y-7 text-lg font-light leading-8 text-gray-300">
            {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {key === 'contact' && <Link href="mailto:info@pileperde.com.tr?subject=Project%20consultation" className="inline-block border border-white px-6 py-3 text-sm text-white">Arrange a consultation</Link>}
          </article>
          {content.image && <div className="relative min-h-80 overflow-hidden rounded-2xl"><Image src={content.image} alt={content.title} fill className="object-cover" /></div>}
        </div>
      </section>

      {hasProductGallery && (
        <EnglishProductGallery key={productGalleryPageKey} title={content.title} initialImages={productGalleryImages} video={englishProductGalleryVideo} />
      )}

      {(key === '' || key === 'products') && (
        <section className="border-t border-white/10 px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {englishProductCards.map(([title, href, description, image]) => <Link key={href} href={href} className="rounded-2xl border border-white/10 p-7 transition hover:bg-white/[.05]"><div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl"><Image src={image} alt={title} fill className="object-cover" /></div><h2 className="text-xl font-light">{title}</h2><p className="mt-3 text-sm leading-6 text-gray-400">{description}</p></Link>)}
          </div>
        </section>
      )}

      {key !== '' && key !== 'products' && childPages.length > 0 && (
        <section className="border-t border-white/10 px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {childPages.map((child) => (
              <Link key={child.key} href={`/en/${child.key}`} className="rounded-2xl border border-white/10 p-7 transition hover:bg-white/[.05]">
                {child.image && <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl"><Image src={child.image} alt={child.title} fill className="object-cover" /></div>}
                <h2 className="text-xl font-light">{child.title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-400">{child.lead}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {article && <div className="mx-auto max-w-6xl px-6 pb-20"><Link href="/en/journal" className="text-sm text-gray-300">← Back to the journal</Link></div>}
    </main>
  )
}
