'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getLocaleAlternative } from '@/lib/siteLocales'

export default function LanguageSwitcher() {
  const pathname = usePathname() || '/'
  const alternative = getLocaleAlternative(pathname)
  const isEnglish = alternative.locale === 'en'
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={isEnglish ? 'Choose language' : 'Dil seçimi'}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-11 min-w-12 items-center justify-center gap-1.5 px-2 text-xs font-medium tracking-[0.12em] text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <span>{isEnglish ? 'EN' : 'TR'}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div role="menu" aria-label={isEnglish ? 'Language options' : 'Dil seçenekleri'} className="absolute right-0 top-full z-[110] mt-2 w-36 overflow-hidden rounded-lg border border-white/10 bg-[#111113]/95 p-1.5 shadow-2xl backdrop-blur-xl">
          <Link
            role="menuitem"
            href={isEnglish ? alternative.href : pathname}
            lang="tr"
            hrefLang="tr-TR"
            onClick={() => setOpen(false)}
            className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${!isEnglish ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/[0.06] hover:text-white'}`}
          >
            {isEnglish ? 'Turkish' : 'Türkçe'}
          </Link>
          {isEnglish || alternative.available ? (
            <Link
              role="menuitem"
              href={isEnglish ? pathname : alternative.href}
              lang="en"
              hrefLang="en"
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${isEnglish ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/[0.06] hover:text-white'}`}
            >
              English
            </Link>
          ) : (
            <span role="menuitem" aria-disabled="true" lang="en" className="block cursor-not-allowed rounded-md px-3 py-2.5 text-sm text-gray-600">
              English
            </span>
          )}
        </div>
      )}
    </div>
  )
}
