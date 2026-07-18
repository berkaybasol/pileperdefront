import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { englishArticles, englishPages, englishProductCards } from '@/lib/englishContent'
import { localeAlternates, SITE_URL } from '@/lib/siteLocales'

type Params = { slug?: string[] }
const keyFrom = (params: Params) => params.slug?.join('/') || ''

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const key = keyFrom(await params)
  const article = key.startsWith('blog/') ? englishArticles[key.slice(5)] : undefined
  const page = englishPages[key]
  const isBlogIndex = key === 'blog'
  const content = article || page
  if (!content && !isBlogIndex) return {}

  const englishPath = `/en${key ? `/${key}` : ''}`
  const turkishPath = content?.turkishPath || '/blog'
  const title = isBlogIndex ? 'Journal — Curtains, Blinds & Interior Design' : content!.title
  const description = isBlogIndex
    ? 'Expert guidance on curtains, blinds, motorisation, textiles and refined interior detailing from Pile Perde.'
    : content!.description

  return {
    title,
    description,
    alternates: localeAlternates(turkishPath, englishPath),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${englishPath}`,
      siteName: 'Pile Perde',
      locale: 'en_GB',
      alternateLocale: ['tr_TR'],
      type: article ? 'article' : 'website',
    },
  }
}

function JsonLd({ value }: { value: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, '\\u003c') }} />
}

export default async function EnglishPage({ params }: { params: Promise<Params> }) {
  const key = keyFrom(await params)

  if (key === 'blog') {
    const breadcrumbs = [
      { name: 'Home', item: `${SITE_URL}/en` },
      { name: 'Journal', item: `${SITE_URL}/en/blog` },
    ]
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <JsonLd value={{ '@context': 'https://schema.org', '@type': 'Blog', '@id': `${SITE_URL}/en/blog#blog`, url: `${SITE_URL}/en/blog`, name: 'Pile Perde Journal', inLanguage: 'en' }} />
        <JsonLd value={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${SITE_URL}/en/blog#breadcrumb`, itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) }} />
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
                <span className="mt-6 block text-sm">Read article →</span>
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

  const englishPath = `/en${key ? `/${key}` : ''}`
  const breadcrumbs = [
    { name: 'Home', item: `${SITE_URL}/en` },
    ...(article ? [{ name: 'Journal', item: `${SITE_URL}/en/blog` }] : []),
    ...(key ? [{ name: content.title, item: `${SITE_URL}${englishPath}` }] : []),
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">
      <JsonLd value={{
        '@context': 'https://schema.org',
        '@type': article ? 'BlogPosting' : 'WebPage',
        '@id': `${SITE_URL}${englishPath}#primary`,
        url: `${SITE_URL}${englishPath}`,
        name: content.title,
        headline: content.title,
        description: content.description,
        inLanguage: 'en',
        ...(article ? {
          datePublished: article.datePublished,
          articleSection: article.category,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${englishPath}` },
          author: { '@type': 'Organization', name: 'Pile Perde', url: SITE_URL },
          publisher: { '@type': 'Organization', name: 'Pile Perde', url: SITE_URL },
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
            {key === 'contact' && <Link href="mailto:info@pileperde.com.tr" className="inline-block border border-white px-6 py-3 text-sm text-white">Request a consultation</Link>}
          </article>
          {content.image && <div className="relative min-h-80 overflow-hidden rounded-2xl"><Image src={content.image} alt={content.title} fill className="object-cover" /></div>}
        </div>
      </section>

      {(key === '' || key === 'products') && (
        <section className="border-t border-white/10 px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {englishProductCards.map(([title, href, description]) => <Link key={href} href={href} className="rounded-2xl border border-white/10 p-7 transition hover:bg-white/[.05]"><h2 className="text-xl font-light">{title}</h2><p className="mt-3 text-sm leading-6 text-gray-400">{description}</p></Link>)}
          </div>
        </section>
      )}

      {article && <div className="mx-auto max-w-6xl px-6 pb-20"><Link href="/en/blog" className="text-sm text-gray-300">← Back to the journal</Link></div>}
    </main>
  )
}
