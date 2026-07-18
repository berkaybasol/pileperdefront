import Script from 'next/script'
import { getPublicSiteSettings, normalizePhoneHref, normalizeWhatsAppNumber } from '@/lib/siteSettings'

const SITE_URL = 'https://pileperde.com.tr'
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`
const WEBSITE_ID = `${SITE_URL}/#website`
const LOGO_URL = `${SITE_URL}/pile_perde_logo-1.png`

const extractHours = (value: string, fallbackOpens: string, fallbackCloses: string) => {
  const match = value.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/)
  return {
    opens: match?.[1] || fallbackOpens,
    closes: match?.[2] || fallbackCloses,
  }
}

export async function BusinessStructuredData() {
  const settings = await getPublicSiteSettings()
  const telephone = normalizePhoneHref(settings['company.phone.primary'])
  const whatsappNumber = normalizeWhatsAppNumber(settings['company.whatsapp.primary'])
  const email = settings['company.email']
  const addressText = settings['company.address.showroom'].replace(/\r?\n/g, ', ')
  const postalCode = settings['company.address.showroom'].match(/\b\d{5}\b/)?.[0] || '06810'
  const weekdayHours = extractHours(settings['company.hours.weekday'], '10:00', '19:30')

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'Pile Perde',
        url: SITE_URL,
        description: 'Pile Perde, 35 yıllık tecrübesiyle Ankara’da özel ölçü perde, jaluzi, motorlu perde sistemleri ve iç mekân tekstili çözümleri sunar.',
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: LOGO_URL,
          contentUrl: LOGO_URL,
          caption: 'Pile Perde',
        },
        email,
        telephone,
        sameAs: ['https://www.instagram.com/pile.perde/'],
        location: { '@id': LOCAL_BUSINESS_ID },
      },
      {
        '@type': 'LocalBusiness',
        '@id': LOCAL_BUSINESS_ID,
        name: 'Pile Perde',
        url: SITE_URL,
        description: 'Pile Perde, 35 yıllık tecrübesiyle Ankara’da özel ölçü perde ve motorlu perde sistemleri sunan perde mağazasıdır.',
        image: LOGO_URL,
        logo: { '@id': `${SITE_URL}/#logo` },
        parentOrganization: { '@id': ORGANIZATION_ID },
        telephone,
        email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: addressText,
          addressLocality: 'Çankaya',
          addressRegion: 'Ankara',
          postalCode,
          addressCountry: 'TR',
        },
        hasMap: settings['company.maps.url'],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: weekdayHours.opens,
            closes: weekdayHours.closes,
          },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone,
            contactType: 'customer service',
            areaServed: 'TR',
            availableLanguage: ['tr', 'en'],
          },
          {
            '@type': 'ContactPoint',
            telephone: `+${whatsappNumber}`,
            contactType: 'customer service',
            areaServed: 'TR',
            availableLanguage: ['tr', 'en'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: 'Pile Perde',
        alternateName: 'Pile Perde Ankara',
        inLanguage: ['tr-TR', 'en'],
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  }

  return (
    <script
      id="business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}
interface ProductSchemaProps {
  name: string
  description: string
  image?: string
  category?: string
}

export function ProductSchema({
  name,
  description,
  image,
  category = 'Perde Sistemleri'
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name,
    image: image ? [`https://pileperde.com.tr${image}`] : [],
    description,
    category,
    brand: {
      '@type': 'Brand',
      name: 'Pile Perde'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Pile Perde'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'TRY',
      seller: {
        '@type': 'Organization',
        name: 'Pile Perde'
      }
    }
  }

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://pileperde.com.tr${item.url}`
    }))
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}
