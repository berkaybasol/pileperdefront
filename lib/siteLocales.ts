export const SITE_URL = 'https://pileperde.com.tr'

const routePairs: Array<[string, string]> = [
  ['/', '/en'],
  ['/hakkimizda', '/en/about'],
  ['/iletisim', '/en/contact'],
  ['/urunler', '/en/products'],
  ['/urunler/mekanizmali-perdeler', '/en/products/blinds-and-shades'],
  ['/urunler/tul-fon-perde', '/en/products/sheer-and-drapery'],
  ['/urunler/dosemelik-kumas', '/en/products/upholstery-fabrics'],
  ['/urunler/motorlu-perdeler', '/en/products/motorised-window-treatments'],
  ['/urunler/perde-aksesuarlari', '/en/products/curtain-accessories'],
  ['/urunler/metal-zincir-perde', '/en/products/metal-chain-curtains'],
  ['/blog', '/en/blog'],
  ['/blog/ahsap-jaluzi-perde-nedir-avantajlari-ve-kullanim-alanlari', '/en/blog/wooden-venetian-blinds-guide'],
  ['/blog/motorlu-ve-elektrikli-perde-sistemleri', '/en/blog/motorised-window-treatments-guide'],
  ['/blog/salon-perde-secimi-nasil-yapilir', '/en/blog/how-to-choose-living-room-curtains'],
]

export const localeRoutePairs = new Map(routePairs)
export const reverseLocaleRoutePairs = new Map(routePairs.map(([tr, en]) => [en, tr]))

export function getLocaleAlternative(pathname: string) {
  const normalized = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname
  const isEnglish = normalized === '/en' || normalized.startsWith('/en/')

  if (isEnglish) {
    return { locale: 'en' as const, href: reverseLocaleRoutePairs.get(normalized) || '/' }
  }

  return { locale: 'tr' as const, href: localeRoutePairs.get(normalized) || '/en' }
}

export function localeAlternates(turkishPath: string, englishPath: string) {
  return {
    canonical: `${SITE_URL}${englishPath}`,
    languages: {
      'tr-TR': `${SITE_URL}${turkishPath}`,
      'en': `${SITE_URL}${englishPath}`,
      'x-default': `${SITE_URL}${turkishPath}`,
    },
  }
}

export function turkishLocaleAlternates(turkishPath: string, englishPath: string) {
  return {
    canonical: `${SITE_URL}${turkishPath}`,
    languages: {
      'tr-TR': `${SITE_URL}${turkishPath}`,
      en: `${SITE_URL}${englishPath}`,
      'x-default': `${SITE_URL}${turkishPath}`,
    },
  }
}
