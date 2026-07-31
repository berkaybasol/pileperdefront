'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useId, useRef, useState } from 'react'
import ProductContactCta from './ProductContactCta'
import styles from './ProductNavigationPilot.module.css'

type NavigationItem = {
  label: string
  href: string
  children?: NavigationItem[]
}

const navigation: NavigationItem[] = [
  {
    label: 'Mekanizmalı Perdeler',
    href: '/urunler/mekanizmali-perdeler',
    children: [
      {
        label: 'Jaluzi Perde',
        href: '/urunler/mekanizmali-perdeler/jaluzi-perde',
        children: [
          { label: 'Alüminyum Jaluzi Perde', href: '/urunler/mekanizmali-perdeler/jaluzi-perde/aluminyum-jaluzi-perde' },
          { label: 'Ahşap Jaluzi Perde', href: '/urunler/mekanizmali-perdeler/jaluzi-perde/ahsap-jaluzi-perde' },
          { label: 'Deri Jaluzi Perde', href: '/urunler/mekanizmali-perdeler/jaluzi-perde/deri-jaluzi-perde' },
        ],
      },
      {
        label: 'Stor Perde',
        href: '/urunler/mekanizmali-perdeler/stor-perde',
        children: [
          { label: 'Screen Perde', href: '/urunler/mekanizmali-perdeler/stor-perde/screen-perde' },
          { label: 'Tül Stor Perde', href: '/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde' },
          { label: 'Karartma Stor Perde', href: '/urunler/mekanizmali-perdeler/stor-perde/karartma-stor-perde' },
          { label: 'Desenli Stor Perde', href: '/urunler/mekanizmali-perdeler/stor-perde/desenli-stor-perde' },
        ],
      },
      { label: 'Dikey Perde', href: '/urunler/mekanizmali-perdeler/dikey-perde' },
      { label: 'Zebra Perde', href: '/urunler/mekanizmali-perdeler/zebra-perde' },
      { label: 'Cam Balkon Perdeleri', href: '/urunler/mekanizmali-perdeler/cam-balkon-perdeleri' },
      { label: 'Plise Perde', href: '/urunler/mekanizmali-perdeler/plise-perde' },
      { label: 'Bambu Perde', href: '/urunler/mekanizmali-perdeler/bambu-perde' },
      { label: 'Silhouette Vision Perde', href: '/urunler/mekanizmali-perdeler/silhouette-vision-perde' },
    ],
  },
  {
    label: 'Tül ve Fon Perdeler',
    href: '/urunler/tul-fon-perde',
    children: [
      { label: 'Modern Fon Perde', href: '/urunler/tul-fon-perde/modern-fon-perde' },
      { label: 'Klasik Fon Perde', href: '/urunler/tul-fon-perde/klasik-fon-perde' },
      { label: 'Keten Fon Perde', href: '/urunler/tul-fon-perde/keten-fon-perde' },
      { label: 'Kadife Fon Perde', href: '/urunler/tul-fon-perde/kadife-fon-perde' },
      { label: 'Desenli Fon Perde', href: '/urunler/tul-fon-perde/desenli-fon-perde' },
      { label: 'Tasarım Fon Perdeler', href: '/urunler/tul-fon-perde/tasarim-fon-perdeler' },
      { label: 'Keten Tül Perdeler', href: '/urunler/tul-fon-perde/keten-tul-perdeler' },
      { label: 'Baskılı Fon Perdeler', href: '/urunler/tul-fon-perde/baskili-fon-perdeler' },
    ],
  },
  {
    label: 'Döşemelik Kumaş',
    href: '/urunler/dosemelik-kumas',
    children: [
      { label: 'Dokulu Kumaş', href: '/urunler/dosemelik-kumas/dokulu-kumas' },
      { label: 'Kadife Kumaş', href: '/urunler/dosemelik-kumas/kadife-kumas' },
      { label: 'Desenli Kumaş', href: '/urunler/dosemelik-kumas/desenli-kumas' },
      { label: 'Outdoor Kumaş', href: '/urunler/dosemelik-kumas/outdoor-kumas' },
      { label: 'Deri Kumaş', href: '/urunler/dosemelik-kumas/deri-kumas' },
      { label: 'Leopar Desenli Döşemelik Kumaşlar', href: '/urunler/dosemelik-kumas/leopar-desenli-dosemelik-kumaslar' },
    ],
  },
  {
    label: 'Motorlu Perdeler',
    href: '/urunler/motorlu-perdeler',
    children: [
      { label: 'Motorlu Tül ve Kumaş Perdeler', href: '/urunler/motorlu-tul-ve-kumas-perdeler' },
      { label: 'Motorlu Ahşap Jaluziler', href: '/urunler/motorlu-perdeler/ahsap-jaluzi' },
      { label: 'Motorlu Stor Perdeler', href: '/urunler/motorlu-perdeler/motorlu-stor-perdeler' },
      { label: 'Motorlu Dikey Perdeler', href: '/urunler/motorlu-perdeler/motorlu-dikey-perdeler' },
      { label: 'Zip Perde', href: '/urunler/motorlu-perdeler/zip-perde' },
      { label: 'Dış Cephe Jaluzi', href: '/urunler/motorlu-perdeler/dis-cephe-jaluzi' },
    ],
  },
  {
    label: 'Perde Aksesuarları',
    href: '/urunler/perde-aksesuarlari',
    children: [
      { label: 'Rustik Takımları', href: '/urunler/perde-aksesuarlari/rustik-takimlari' },
      { label: 'Fon Perde Bağları', href: '/urunler/perde-aksesuarlari/kol-bagi' },
      { label: 'Perde Püskülleri ve Saçakları', href: '/urunler/perde-aksesuarlari/bracol' },
      { label: 'Perde Bordürleri', href: '/urunler/perde-aksesuarlari/perde-bordurleri' },
    ],
  },
  {
    label: 'Metal Zincir Perdeler',
    href: '/urunler/metal-zincir-perde',
    children: [
      { label: 'Metal Zincir Perde', href: '/urunler/metal-zincir-perde/metal-zincir-perde' },
      { label: 'Metal Zincir Seperatör', href: '/urunler/metal-zincir-perde/metal-zincir-seperator' },
    ],
  },
]

const categoryLandingPaths = new Set([
  '/urunler/mekanizmali-perdeler',
  '/urunler/tul-fon-perde',
  '/urunler/dosemelik-kumas',
  '/urunler/motorlu-perdeler',
  '/urunler/perde-aksesuarlari',
  '/urunler/metal-zincir-perde',
])

const isWithin = (activePath: string, item: NavigationItem): boolean =>
  activePath === item.href ||
  activePath.startsWith(`${item.href}/`) ||
  Boolean(item.children?.some((child) => isWithin(activePath, child)))

function initialOpenGroups(activePath: string) {
  const groups: Record<number, string> = {}
  const visit = (items: NavigationItem[], depth: number) => {
    const activeItem = items.find((item) => item.children && isWithin(activePath, item))
    if (!activeItem) return
    groups[depth] = activeItem.href
    visit(activeItem.children ?? [], depth + 1)
  }
  visit(navigation, 0)
  return groups
}

function ProductSideNavigation({ activePath, onNavigate }: { activePath: string; onNavigate?: () => void }) {
  const [openGroups, setOpenGroups] = useState<Record<number, string>>(() => initialOpenGroups(activePath))
  const id = useId()

  useEffect(() => {
    setOpenGroups(initialOpenGroups(activePath))
  }, [activePath])

  const renderItems = (items: NavigationItem[], depth = 0): ReactNode => (
    <ul className={depth === 0 ? styles.navList : styles.children}>
      {items.map((item, index) => {
        const isOpen = openGroups[depth] === item.href
        const controlsId = `${id}-${depth}-${index}`
        return (
          <li key={item.href}>
            <div className={styles.row}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={activePath === item.href ? 'page' : undefined}
                className={`${styles.navLink} ${activePath === item.href ? styles.active : ''}`}
                style={{ paddingLeft: `${0.65 + depth * 0.6}rem` }}
              >
                {item.label}
              </Link>
              {item.children && (
                <button
                  type="button"
                  className={styles.toggle}
                  aria-label={`${item.label} alt kategorilerini ${isOpen ? 'kapat' : 'aç'}`}
                  aria-expanded={isOpen}
                  aria-controls={controlsId}
                  onClick={() => setOpenGroups((current) => ({
                    ...current,
                    [depth]: isOpen ? '' : item.href,
                  }))}
                >
                  <svg
                    aria-hidden="true"
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="m7.5 4.75 5.25 5.25-5.25 5.25"
                      stroke="currentColor"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
            {item.children && isOpen && <div id={controlsId}>{renderItems(item.children, depth + 1)}</div>}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav className={styles.navCard} aria-label="Ürünler navigasyonu">
      <Link href="/urunler" onClick={onNavigate} className={styles.navTitle}>Ürünler</Link>
      {renderItems(navigation)}
    </nav>
  )
}

function ProductNavigationDrawer({ activePath }: { activePath: string }) {
  const [open, setOpen] = useState(false)
  const openerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const headingId = useId()

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const opener = openerRef.current
    document.body.style.overflow = 'hidden'
    const focusable = () => Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    focusable()[0]?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const items = focusable()
      if (!items.length) return
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault()
        items[items.length - 1].focus()
      } else if (!event.shiftKey && document.activeElement === items[items.length - 1]) {
        event.preventDefault()
        items[0].focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      opener?.focus()
    }
  }, [open])

  return (
    <>
      <button ref={openerRef} type="button" className={styles.drawerButton} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
        <span aria-hidden="true">☰</span>Ürün Grupları
      </button>
      {open && (
        <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <div ref={drawerRef} className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby={headingId}>
            <div className={styles.drawerHeader}>
              <h2 id={headingId} className={styles.drawerHeading}>Ürün Grupları</h2>
              <button type="button" className={styles.closeButton} aria-label="Ürün grupları panelini kapat" onClick={() => setOpen(false)}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <ProductSideNavigation activePath={activePath} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export default function ProductNavigationPilot({ activePath, children }: { activePath?: string; children: ReactNode }) {
  const pathname = usePathname()
  const resolvedPath = activePath ?? pathname
  const normalizedPath = resolvedPath.replace(/\/+$/, '') || '/'
  const isRootLanding = normalizedPath === '/urunler'
  const isDetailPage = normalizedPath.startsWith('/urunler/') && !categoryLandingPaths.has(normalizedPath)
  return (
    <>
      {isDetailPage && <ProductContactCta />}
      <div className={`${styles.shell} ${isRootLanding ? styles.rootLanding : ''} ${isDetailPage ? styles.detailShell : ''}`}>
        <ProductNavigationDrawer activePath={resolvedPath} />
        <div className={styles.desktopGrid}>
          <aside className={styles.desktopNav}><ProductSideNavigation activePath={resolvedPath} /></aside>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  )
}
