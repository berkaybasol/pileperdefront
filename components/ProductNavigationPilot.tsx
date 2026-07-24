'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Children, type ReactNode, useEffect, useId, useRef, useState } from 'react'
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

const legacyDetailPaths = new Set([
  '/urunler/mekanizmali-perdeler/cam-balkon-perdeleri',
  '/urunler/mekanizmali-perdeler/dikey-perde',
  '/urunler/mekanizmali-perdeler/jaluzi-perde/ahsap-jaluzi-perde',
  '/urunler/mekanizmali-perdeler/jaluzi-perde/aluminyum-jaluzi-perde',
  '/urunler/mekanizmali-perdeler/jaluzi-perde/deri-jaluzi-perde',
  '/urunler/mekanizmali-perdeler/plise-perde',
  '/urunler/mekanizmali-perdeler/silhouette-vision-perde',
  '/urunler/mekanizmali-perdeler/stor-perde/desenli-stor-perde',
  '/urunler/mekanizmali-perdeler/stor-perde/karartma-stor-perde',
  '/urunler/mekanizmali-perdeler/stor-perde/screen-perde',
  '/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde',
  '/urunler/mekanizmali-perdeler/zebra-perde',
  '/urunler/motorlu-perdeler/dis-cephe-jaluzi',
  '/urunler/motorlu-perdeler/projeksiyon-perde',
  '/urunler/motorlu-perdeler/zip-perde',
])

function ProductQuickActions() {
  return (
    <section className={styles.quickActions} aria-label="Ürün iletişim seçenekleri">
      <Link href="tel:+903122417272" className={styles.callAction}>
        <span>Hemen Arayın</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </Link>
      <Link
        href="https://wa.me/905335127272"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappAction}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span>WhatsApp&apos;tan Yazın</span>
      </Link>
    </section>
  )
}

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
  const isDetailPage = normalizedPath.startsWith('/urunler/') && !categoryLandingPaths.has(normalizedPath)
  const isLegacyDetail = legacyDetailPaths.has(normalizedPath)
  const childArray = Children.toArray(children)
  const arrangedChildren = isLegacyDetail && childArray.length >= 2 ? (
    <>
      <ProductQuickActions />
      {childArray[1]}
      <div className={styles.legacyInfo}>{childArray[0]}</div>
      {childArray.slice(2)}
    </>
  ) : (
    <>
      {isDetailPage && <ProductQuickActions />}
      {children}
    </>
  )
  return (
    <div className={styles.shell}>
      <ProductNavigationDrawer activePath={resolvedPath} />
      <div className={styles.desktopGrid}>
        <aside className={styles.desktopNav}><ProductSideNavigation activePath={resolvedPath} /></aside>
        <div className={styles.content}>{arrangedChildren}</div>
      </div>
    </div>
  )
}
