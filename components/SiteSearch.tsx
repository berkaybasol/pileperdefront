'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  searchSiteDocuments,
  type SearchContentType,
  type SearchDocument,
} from '@/lib/siteSearch'

const typeLabels: Record<SearchContentType, string> = {
  product: 'Ürün',
  'product-category': 'Kategori',
  'curtain-model': 'Perde Modeli',
  'corporate-solution': 'Kurumsal Çözüm',
  blog: 'Blog Yazısı',
  'project-story': 'Proje Hikâyesi',
}

const SiteSearch = () => {
  const router = useRouter()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [documents, setDocuments] = useState<SearchDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const results = useMemo(
    () => searchSiteDocuments(documents, query, 10),
    [documents, query],
  )

  const closeSearch = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const openSearch = () => {
    setOpen(true)

    if (documents.length === 0 && !loading) {
      setLoading(true)
      fetch('/api/search-index')
        .then((response) => {
          if (!response.ok) throw new Error('Arama indeksi yüklenemedi.')
          return response.json() as Promise<SearchDocument[]>
        })
        .then(setDocuments)
        .catch(() => setDocuments([]))
        .finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => inputRef.current?.focus())

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSearch()
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [closeSearch, open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const navigateToResult = (href: string) => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
    router.push(href)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const selectedResult = results[activeIndex]
      if (selectedResult) navigateToResult(selectedResult.href)
    }
  }

  const normalizedQueryLength = query.trim().length
  const showEmptyState = normalizedQueryLength >= 2 && !loading && results.length === 0

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openSearch}
        aria-label="Site içinde ara"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center text-gray-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 px-4 pt-20 backdrop-blur-sm sm:pt-28"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch()
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
            className="flex max-h-[calc(100dvh-6rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101012] shadow-2xl sm:max-h-[calc(100dvh-9rem)]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-6">
              <svg aria-hidden="true" className="h-5 w-5 flex-none text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              <label id="site-search-title" htmlFor="site-search-input" className="sr-only">
                Site içi arama
              </label>
              <input
                ref={inputRef}
                id="site-search-input"
                type="search"
                role="combobox"
                aria-autocomplete="list"
                aria-controls="site-search-results"
                aria-expanded={results.length > 0}
                aria-activedescendant={results[activeIndex] ? `site-search-result-${activeIndex}` : undefined}
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Perde modeli, ürün veya proje ara"
                className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-gray-500 sm:text-lg"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Aramayı kapat"
                className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto px-3 py-3 sm:px-5 sm:py-5">
              {loading && (
                <p role="status" className="px-3 py-8 text-center text-sm text-gray-400">
                  Arama içeriği hazırlanıyor…
                </p>
              )}

              {!loading && normalizedQueryLength < 2 && (
                <p className="px-3 py-8 text-center text-sm text-gray-500">
                  Aramak için en az 2 karakter yazın.
                </p>
              )}

              {!loading && results.length > 0 && (
                <ul id="site-search-results" role="listbox" aria-label="Arama sonuçları" className="space-y-1">
                  {results.map((result, index) => (
                    <li key={result.href} role="presentation">
                      <button
                        id={`site-search-result-${index}`}
                        type="button"
                        role="option"
                        aria-selected={activeIndex === index}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => navigateToResult(result.href)}
                        className={`w-full rounded-xl px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                          activeIndex === index ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-blue-300">
                          {typeLabels[result.type]}
                        </span>
                        <span className="block text-base font-medium text-white">{result.title}</span>
                        <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-gray-400">
                          {result.description}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {showEmptyState && (
                <div role="status" className="px-4 py-10 text-center">
                  <p className="text-base font-medium text-white">Aramanızla eşleşen bir sonuç bulunamadı.</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    Farklı bir ürün adı, perde modeli veya proje konumu deneyebilirsiniz.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default SiteSearch
