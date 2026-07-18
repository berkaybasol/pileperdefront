import { MetadataRoute } from 'next'
import { getIndexableBlogPosts } from '@/lib/blogContent'

type SitemapEntry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const baseUrl = 'https://pileperde.com.tr'

const sitemapEntries: SitemapEntry[] = [
  { path: '/en', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/en/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/en/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/en/products', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/en/products/blinds-and-shades', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/en/products/sheer-and-drapery', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/en/products/upholstery-fabrics', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/en/products/motorised-window-treatments', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/en/products/curtain-accessories', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/en/products/metal-chain-curtains', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/en/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/en/blog/wooden-venetian-blinds-guide', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/en/blog/motorised-window-treatments-guide', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/en/blog/how-to-choose-living-room-curtains', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/', changeFrequency: 'yearly', priority: 1 },
  { path: '/hakkimizda', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/iletisim', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kurumsal', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/urunler', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/urunler/mekanizmali-perdeler', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/mekanizmali-perdeler/jaluzi-perde', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/urunler/mekanizmali-perdeler/jaluzi-perde/aluminyum-jaluzi-perde', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/urunler/mekanizmali-perdeler/jaluzi-perde/ahsap-jaluzi-perde', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/urunler/mekanizmali-perdeler/jaluzi-perde/deri-jaluzi-perde', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/mekanizmali-perdeler/stor-perde', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/mekanizmali-perdeler/stor-perde/screen-perde', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/mekanizmali-perdeler/stor-perde/karartma-stor-perde', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/mekanizmali-perdeler/stor-perde/desenli-stor-perde', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/mekanizmali-perdeler/dikey-perde', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/mekanizmali-perdeler/zebra-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/mekanizmali-perdeler/cam-balkon-perdeleri', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/mekanizmali-perdeler/plise-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/mekanizmali-perdeler/bambu-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/mekanizmali-perdeler/silhouette-vision-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/tul-fon-perde', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/tul-fon-perde/modern-fon-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/tul-fon-perde/klasik-fon-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/tul-fon-perde/keten-fon-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/tul-fon-perde/kadife-fon-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/tul-fon-perde/desenli-fon-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/tul-fon-perde/tasarim-fon-perdeler', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/tul-fon-perde/keten-tul-perdeler', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/tul-fon-perde/baskili-fon-perdeler', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/dosemelik-kumas', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/urunler/dosemelik-kumas/dokulu-kumas', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/dosemelik-kumas/kadife-kumas', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/dosemelik-kumas/desenli-kumas', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/dosemelik-kumas/outdoor-kumas', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/dosemelik-kumas/deri-kumas', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/dosemelik-kumas/leopar-desenli-dosemelik-kumaslar', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/motorlu-perdeler', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/urunler/motorlu-tul-ve-kumas-perdeler', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/motorlu-perdeler/ahsap-jaluzi', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/motorlu-perdeler/motorlu-stor-perdeler', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/motorlu-perdeler/motorlu-dikey-perdeler', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/motorlu-perdeler/zip-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/motorlu-perdeler/dis-cephe-jaluzi', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/motorlu-perdeler/projeksiyon-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/urunler/perde-aksesuarlari', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/urunler/perde-aksesuarlari/rustik-takimlari', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/perde-aksesuarlari/kol-bagi', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/perde-aksesuarlari/bracol', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/metal-zincir-perde', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/urunler/metal-zincir-perde/metal-zincir-seperator', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/urunler/metal-zincir-perde/pro-collection', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/perde-modelleri', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/model-perdeler/klasik-ve-avangart-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/modern-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/rustikli-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/kruvaze-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/balon-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/katlamali-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/yuksek-tavanli-galeri-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/ip-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/cocuk-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/cibinlik-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/cati-kati-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/model-perdeler/kis-bahcesi-perde', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/kurumsal-urunler', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/kurumsal-urunler/ozel-proje-perdeleri', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/kurumsal-urunler/cafe-restoran-perdeleri', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/kurumsal-urunler/hastane-perdeleri', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/kurumsal-urunler/ofis-perdeleri', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/kurumsal-urunler/otel-perdeleri', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
]

const turkishMonthNumbers: Record<string, number> = {
  ocak: 1,
  subat: 2,
  mart: 3,
  nisan: 4,
  mayis: 5,
  haziran: 6,
  temmuz: 7,
  agustos: 8,
  eylul: 9,
  ekim: 10,
  kasim: 11,
  aralik: 12,
}

const normalizeTurkishDate = (value: string) => value
  .toLocaleLowerCase('tr-TR')
  .replaceAll('ı', 'i')
  .replaceAll('ş', 's')
  .replaceAll('ğ', 'g')
  .replaceAll('ç', 'c')
  .replaceAll('ö', 'o')
  .replaceAll('ü', 'u')
  .trim()

const createValidatedDate = (year: number, month: number, day: number) => {
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day
    ? date
    : undefined
}

const parseReliableDate = (value: string) => {
  const normalized = normalizeTurkishDate(value)
  const namedDate = normalized.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/)
  if (namedDate) {
    const month = turkishMonthNumbers[namedDate[2]]
    return month
      ? createValidatedDate(Number(namedDate[3]), month, Number(namedDate[1]))
      : undefined
  }

  const numericDate = normalized.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/)
  if (numericDate) {
    return createValidatedDate(
      Number(numericDate[3]),
      Number(numericDate[2]),
      Number(numericDate[1]),
    )
  }

  const isoDate = normalized.match(/^(\d{4})-(\d{2})-(\d{2})(?:t.*)?$/)
  return isoDate
    ? createValidatedDate(Number(isoDate[1]), Number(isoDate[2]), Number(isoDate[3]))
    : undefined
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getIndexableBlogPosts()
  const staticEntries: MetadataRoute.Sitemap = sitemapEntries.map((entry) => ({
    url: entry.path === '/' ? baseUrl : `${baseUrl}${entry.path}`,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const lastModified = parseReliableDate(post.date)
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'weekly',
      priority: 0.65,
    }
  })

  return [...staticEntries, ...blogEntries]
}
