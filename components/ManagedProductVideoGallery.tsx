'use client'

import { useEffect, useMemo, useState } from 'react'
import ProductVideoGallery from '@/components/ProductVideoGallery'
import {
  defaultProductVideoGallery,
  getPublicProductVideoGallery,
  parseProductVideoGallery,
  type ProductVideoGallery as ProductVideoGalleryData,
} from '@/lib/productGalleryContent'
import { isProductVideoGalleryEnabled } from '@/lib/productVideoGalleryPilot'

type ManagedProductVideoGalleryProps = {
  pageKey: string
  initialContentJson?: string | null
}

export default function ManagedProductVideoGallery({
  pageKey,
  initialContentJson,
}: ManagedProductVideoGalleryProps) {
  const enabled = isProductVideoGalleryEnabled(pageKey)
  const initialGallery = useMemo(
    () => enabled
      ? parseProductVideoGallery(initialContentJson, defaultProductVideoGallery)
      : defaultProductVideoGallery,
    [enabled, initialContentJson],
  )
  const [gallery, setGallery] = useState<ProductVideoGalleryData>(initialGallery)

  useEffect(() => {
    let isMounted = true
    setGallery(initialGallery)

    if (enabled) {
      getPublicProductVideoGallery(pageKey, defaultProductVideoGallery).then((nextGallery) => {
        if (isMounted) {
          setGallery(nextGallery)
        }
      })
    }

    return () => {
      isMounted = false
    }
  }, [enabled, initialGallery, pageKey])

  if (!enabled) {
    return null
  }

  return <ProductVideoGallery gallery={gallery} />
}
