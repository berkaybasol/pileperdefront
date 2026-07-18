import Link from 'next/link'
import {
  normalizeBreadcrumbItems,
  type BreadcrumbItem,
} from '@/lib/breadcrumbs'

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  canonicalUrl: string
  className?: string
}

export function Breadcrumbs({ items, canonicalUrl, className = '' }: BreadcrumbsProps) {
  const normalizedItems = normalizeBreadcrumbItems(items, canonicalUrl)

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400">
        {normalizedItems.map((item, index) => {
          const isLast = index === normalizedItems.length - 1
          return (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-gray-600">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-gray-300">{item.name}</span>
              ) : (
                <Link href={item.url} className="transition-colors hover:text-white">{item.name}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}