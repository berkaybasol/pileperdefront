import Script from 'next/script'

interface LocalBusinessSchemaProps {
  name?: string
  description?: string
  telephone?: string
  address?: {
    streetAddress?: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
  }
}

export function LocalBusinessSchema({
  name = 'Pile Perde',
  description = 'Ankara\'da jaluzi perde, stor perde ve tüm perde sistemleri',
  telephone = '+90-312-241-72-72',
  address = {
    addressLocality: 'Ankara',
    addressRegion: 'Ankara',
  }
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url: 'https://pileperde.com.tr',
    telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '39.9334',
      longitude: '32.8597'
    },
    openingHours: 'Mo-Sa 09:00-18:00',
    priceRange: '$$'
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
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

interface OrganizationSchemaProps {
  name?: string
  description?: string
}

export function OrganizationSchema({
  name = 'Pile Perde',
  description = 'Ankara\'da 20+ yıllık tecrübe ile perde ve jaluzi sistemleri'
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url: 'https://pileperde.com.tr',
    logo: 'https://pileperde.com.tr/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-312-241-72-72',
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: 'Turkish'
    },
    sameAs: [
      // Sosyal medya linkleri buraya eklenebilir
      // 'https://www.facebook.com/pileperde',
      // 'https://www.instagram.com/pileperde',
    ]
  }

  return (
    <Script
      id="organization-schema"
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
