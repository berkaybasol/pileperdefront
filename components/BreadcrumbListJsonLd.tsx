import {
  buildBreadcrumbListSchema,
  type BreadcrumbItem,
} from '@/lib/breadcrumbs'

type BreadcrumbListJsonLdProps = {
  items: BreadcrumbItem[]
  canonicalUrl: string
}

export function BreadcrumbListJsonLd({
  items,
  canonicalUrl,
}: BreadcrumbListJsonLdProps) {
  const schema = buildBreadcrumbListSchema(items, canonicalUrl)

  return (
    <script
      id="breadcrumb-list-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  )
}