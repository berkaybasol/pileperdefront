'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import SiteSearch from '@/components/SiteSearch'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { englishNavigation, englishPages, englishProductCards } from '@/lib/englishContent'

const socialLinks = [
  { name: 'WhatsApp', href: 'https://wa.me/905335127272' },
  { name: 'Instagram', href: 'https://www.instagram.com/pileperdecayyolu/' },
  { name: 'Pinterest', href: 'https://tr.pinterest.com/pileperde/' },
  { name: 'Facebook', href: 'https://www.facebook.com/pileperde' },
] as const

const SocialIcon = ({ name }: { name: typeof socialLinks[number]['name'] }) => {
  if (name === 'WhatsApp') {
    return <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  }
  if (name === 'Instagram') {
    return <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zm2.162 0a4 4 0 108 0 4 4 0 00-8 0zm8.965-6.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
  }
  if (name === 'Pinterest') {
    return <path d="M12.017 0C5.396 0 0 5.396 0 12.017c0 5.08 3.158 9.424 7.621 11.174-.105-.949-.2-2.408.042-3.445.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.781c0-1.668.968-2.914 2.172-2.914 1.024 0 1.519.769 1.519 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.195.599 2.169 1.777 2.169 2.133 0 3.773-2.249 3.773-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.208 0 1.032.397 2.138.893 2.741.098.119.112.223.083.344-.091.378-.293 1.195-.333 1.362-.053.219-.174.265-.402.159-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.26 7.93-7.26 4.163 0 7.398 2.966 7.398 6.93 0 4.137-2.608 7.465-6.227 7.465-1.216 0-2.36-.632-2.752-1.378l-.748 2.848c-.271 1.042-1.002 2.349-1.492 3.146 1.124.348 2.317.538 3.554.538 6.621 0 12.017-5.396 12.017-12.017C24.034 5.396 18.638 0 12.017 0z" />
  }
  return <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.79-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.49 0-1.956.931-1.956 1.887v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isEnglish = pathname === '/en' || pathname?.startsWith('/en/')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navigation = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    {
      name: 'Ürünler',
      href: '/urunler',
      megaMenu: true,
      content: {
        categories: [
          {
            title: 'Mekanizmalı Perdeler',
            image: '/api/public/media/images/6027e2a5-c5c1-4f6a-a787-5d6498ef05fc/file',
            href: '/urunler/mekanizmali-perdeler',
            items: []
          },
          {
            title: 'Tül & Fon Perdeler',
            image: '/api/public/media/images/ac111c41-9c23-4975-94bb-cab90e242037/file',
            href: '/urunler/tul-fon-perde',
            items: []
          },
          {
            title: 'Döşemelik Kumaş',
            image: '/api/public/media/images/819c6a80-7dbe-4074-9934-dfdf8b903d8a/file',
            href: '/urunler/dosemelik-kumas',
            items: []
          },
          {
            title: 'Motorlu Perdeler',
            image: '/api/public/media/images/9ae3d120-1399-40e0-81e2-47d274e6c2b8/file',
            href: '/urunler/motorlu-perdeler',
            items: []
          },
          {
            title: 'Perde Aksesuarları',
            image: '/api/public/media/images/35d4d007-ea8e-4f37-9363-ad2ebfa75173/file',
            href: '/urunler/perde-aksesuarlari',
            items: []
          },
          {
            title: 'Metal Zincir Perde',
            image: '/api/public/media/images/690febe4-344f-42f2-a163-91dee5421a1c/file',
            href: '/urunler/metal-zincir-perde',
            items: []
          }
        ]
      }
    },
    {
      name: 'Perde Modelleri',
      href: '/perde-modelleri',
      megaMenu: true,
      content: {
        models: [
          { title: 'Klasik ve Avangart', image: '/api/public/media/images/df6a191d-3db6-4645-a083-f71422f49200/file', href: '/model-perdeler/klasik-ve-avangart-perde' },
          { title: 'Modern Perde', image: '/api/public/media/images/d70ef178-4553-4734-b023-80b297f1e695/file', href: '/model-perdeler/modern-perde' },
          { title: 'Rustikli Perde', image: '/api/public/media/images/4b0f28ee-b79d-44e0-880d-5aec64bb13e3/file', href: '/model-perdeler/rustikli-perde' },
          { title: 'Kruvaze Perde', image: '/api/public/media/images/fa4be5de-409b-407c-adc6-44df3d5c712b/file', href: '/model-perdeler/kruvaze-perde' },
          { title: 'Balon Perde', image: '/api/public/media/images/0d960ab5-7767-41f7-86e2-674315fa8cfd/file', href: '/model-perdeler/balon-perde' },
          { title: 'Katlamalı Perde', image: '/api/public/media/images/2e01e3a6-79a2-4b09-87f3-48350370e150/file', href: '/model-perdeler/katlamali-perde' },
          { title: 'Yüksek Tavanlı Galeri', image: '/api/public/media/images/334ad8c7-98e2-411c-98e9-d3c74c5a8973/file', href: '/model-perdeler/yuksek-tavanli-galeri-perde' },
          { title: 'İp Perde', image: '/api/public/media/images/10c446e9-acdc-487b-8f12-2f962c3b5e37/file', href: '/model-perdeler/ip-perde' },
          { title: 'Çocuk Perde', image: '/api/public/media/images/92d067f9-f14e-45da-89fb-901f775d61b3/file', href: '/model-perdeler/cocuk-perde' },
          { title: 'Cibinlik Perde', image: '/api/public/media/images/66a8d307-6542-437e-9781-8626f3f2067e/file', href: '/model-perdeler/cibinlik-perde' },
          { title: 'Çatı Katı Perde', image: '/api/public/media/images/9bfdadba-520b-43d8-8ccb-c9256523b8a9/file', href: '/model-perdeler/cati-kati-perde' },
          { title: 'Kış Bahçesi Perde', image: '/api/public/media/images/3f3e07b0-8d36-4b49-8b21-1f0f4d439d90/file', href: '/model-perdeler/kis-bahcesi-perde' },
        ]
      }
    },
    {
      name: 'Kurumsal Ürünler',
      href: '/kurumsal-urunler',
      megaMenu: true,
      content: {
        corporate: [
          { title: 'Özel Proje Perdeleri', image: '/api/public/media/images/e939490a-f630-474f-a048-c25558109c07/file', href: '/kurumsal-urunler/ozel-proje-perdeleri' },
          { title: 'Cafe Restoran', image: '/api/public/media/images/024932ef-a4e3-4ecd-99b7-4ae638859b49/file', href: '/kurumsal-urunler/cafe-restoran-perdeleri' },
          { title: 'Hastane Perdeleri', image: '/api/public/media/images/fa0a224a-6d56-4bc2-93f3-cdffa7563026/file', href: '/kurumsal-urunler/hastane-perdeleri' },
          { title: 'Ofis Perdeleri', image: '/api/public/media/images/47ff2c4b-2644-4628-8934-8e55b67c721e/file', href: '/kurumsal-urunler/ofis-perdeleri' },
          { title: 'Otel Perdeleri', image: '/api/public/media/images/88fba881-2e13-464e-9d80-127b267fcef3/file', href: '/kurumsal-urunler/otel-perdeleri' },
        ]
      }
    },
    { name: 'Blog', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
  ]

  const activeNavigation = isEnglish
    ? englishNavigation.map((item) => ('items' in item
      ? {
          name: item.name,
          href: item.href,
          megaMenu: true,
          content: {
            categories: item.items.map(([title, href]) => ({
              title,
              href,
              image: englishPages[href.replace(/^\/en\/?/, '')]?.image
                || englishProductCards.find(([, cardHref]) => cardHref === href)?.[3]
                || '/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file',
              items: [],
            })),
          },
        }
      : item))
    : navigation

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/10'
            : 'bg-black/90 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href={isEnglish ? '/en' : '/'} className="relative z-10">
              <Image
                src="/pile_perde_logo-1.png"
                alt="Pile Perde"
                width={140}
                height={48}
                className="h-9 lg:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-3">
              {activeNavigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.megaMenu && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.megaMenu ? (
                    <button
                      className={`text-sm font-extralight uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2 py-2 ${
                        pathname?.startsWith(item.href) ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm font-extralight uppercase tracking-[0.15em] transition-all duration-300 py-2 relative group ${
                        pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <span className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300 ${
                        pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  )}

                  {/* Mega Menu */}
                  <AnimatePresence mode="wait">
                    {item.megaMenu && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[1000px] bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
                      >
                        {/* Ürünler Mega Menu */}
                        {item.content?.categories && (
                          <div className="p-8">
                            <div className="grid grid-cols-6 gap-6 mb-6">
                              {item.content.categories.map((category) => (
                                <div key={category.title} className="group/item">
                                  <Link href={category.href} className="block">
                                    <div className="relative h-32 mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 group-hover/item:border-white/20 transition-all duration-500">
                                      <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className="object-cover opacity-80 transition-all duration-700 group-hover/item:opacity-100 group-hover/item:scale-110"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                    </div>
                                    <h3 className="text-xs font-extralight text-white mb-2 group-hover/item:text-gray-400 transition-colors uppercase tracking-wider">
                                      {category.title}
                                    </h3>
                                  </Link>
                                  {category.items && category.items.length > 0 && (
                                    <ul className="space-y-1">
                                      {category.items.map((subItem: { name: string; href: string }) => (
                                        <li key={subItem.name}>
                                          <Link
                                            href={subItem.href}
                                            className="text-xs text-gray-500 hover:text-white transition-colors"
                                          >
                                            {subItem.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                            {/* Tüm Ürünler Butonu */}
                            <div className="border-t border-white/10 pt-4">
                              <Link
                                href={item.href}
                                className="group relative inline-flex items-center justify-center w-full py-3 bg-white text-black overflow-hidden transition-all duration-300"
                              >
                                <span className="relative z-10 font-medium">{isEnglish ? `View All ${item.name === 'Commercial' ? 'Commercial Solutions' : item.name}` : 'Tüm Ürünleri Görüntüle'}</span>
                                <svg className="relative z-10 w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* Modeller Mega Menu */}
                        {item.content?.models && (
                          <div className="p-8">
                            <div className="grid grid-cols-6 gap-6 mb-6">
                              {item.content.models.map((model) => (
                                <Link key={model.title} href={model.href} className="group/item">
                                  <div className="relative h-32 mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 group-hover/item:border-white/20 transition-all duration-500">
                                    <Image
                                      src={model.image}
                                      alt={model.title}
                                      fill
                                      className="object-cover opacity-80 transition-all duration-700 group-hover/item:opacity-100 group-hover/item:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                  </div>
                                  <h3 className="text-xs font-extralight text-white group-hover/item:text-gray-400 transition-colors uppercase tracking-wider">
                                    {model.title}
                                  </h3>
                                </Link>
                              ))}
                            </div>
                            {/* Tüm Perde Modelleri Butonu */}
                            <div className="border-t border-white/10 pt-4">
                              <Link
                                href="/perde-modelleri"
                                className="group relative inline-flex items-center justify-center w-full py-3 bg-white text-black overflow-hidden transition-all duration-300"
                              >
                                <span className="relative z-10 font-medium">Tüm Perde Modellerini Görüntüle</span>
                                <svg className="relative z-10 w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* Kurumsal Mega Menu */}
                        {item.content?.corporate && (
                          <div className="p-8">
                            <div className="grid grid-cols-5 gap-6 mb-6">
                              {item.content.corporate.map((corp) => (
                                <Link key={corp.title} href={corp.href} className="group/item">
                                  <div className="relative h-36 mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 group-hover/item:border-white/20 transition-all duration-500">
                                    <Image
                                      src={corp.image}
                                      alt={corp.title}
                                      fill
                                      className="object-cover opacity-80 transition-all duration-700 group-hover/item:opacity-100 group-hover/item:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                  </div>
                                  <h3 className="text-xs font-extralight text-white group-hover/item:text-gray-400 transition-colors uppercase tracking-wider text-center">
                                    {corp.title}
                                  </h3>
                                </Link>
                              ))}
                            </div>
                            {/* Tüm Kurumsal Ürünler Butonu */}
                            <div className="border-t border-white/10 pt-4">
                              <Link
                                href="/kurumsal-urunler"
                                className="group relative inline-flex items-center justify-center w-full py-3 bg-white text-black overflow-hidden transition-all duration-300"
                              >
                                <span className="relative z-10 font-medium">Tüm Kurumsal Ürünleri Görüntüle</span>
                                <svg className="relative z-10 w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center">
              <SiteSearch />
              <LanguageSwitcher />

            <div className="hidden lg:flex items-center gap-0.5 mr-2" aria-label={isEnglish ? 'Social media links' : 'Sosyal medya bağlantıları'}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex h-9 w-9 items-center justify-center text-gray-500 transition-all duration-200 hover:text-white hover:-translate-y-px"
                >
                  <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <SocialIcon name={social.name} />
                  </svg>
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href={isEnglish ? '/en/contact' : '/iletisim'}
                className="whitespace-nowrap px-4 py-2 bg-white text-[#1d1d1f] text-sm font-normal hover:bg-gray-100 transition-all duration-300"
              >
                {isEnglish ? 'Contact Us' : 'İletişime Geç'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen
                ? (isEnglish ? 'Close mobile menu' : 'Mobil menüyü kapat')
                : (isEnglish ? 'Open mobile menu' : 'Mobil menüyü aç')}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-white"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`} />
                <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`} />
              </div>
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950 z-50 lg:hidden"
          >
            {/* Dark Glassmorphism Background Pattern */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black" />
              <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content Container */}
            <div className="h-full flex flex-col px-6 py-20 relative z-10 overflow-y-auto">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0.8, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="flex-shrink-0 mb-8"
              >
                <Image
                  src="/pile_perde_logo-1.png"
                  alt="Pile Perde"
                  width={140}
                  height={48}
                  className="h-10 w-auto opacity-80"
                />
              </motion.div>

              {/* Navigation Items */}
              <nav className="space-y-1 relative z-20 flex-1">
                {activeNavigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0.8, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.025 }}
                  >
                    {item.megaMenu ? (
                      <div>
                        <button
                          onClick={() => setMobileActiveDropdown(mobileActiveDropdown === item.name ? null : item.name)}
                          className="w-full flex items-center justify-between py-3 group"
                        >
                          <span className="text-xl font-extralight text-white/80 group-hover:text-white transition-colors uppercase tracking-wider">
                            {item.name}
                          </span>
                          <svg
                            className={`w-5 h-5 text-white/40 transition-transform ${
                              mobileActiveDropdown === item.name ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {mobileActiveDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0.8, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0.8, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-2">
                                {item.content?.categories && (
                                  <>
                                    {item.content.categories.map((category) => (
                                      <Link
                                        key={category.title}
                                        href={category.href}
                                        className="block py-2 text-base font-extralight text-white/60 hover:text-white hover:translate-x-2 transition-all uppercase tracking-wide"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {category.title}
                                      </Link>
                                    ))}
                                    <Link
                                      href={item.href}
                                      className="block py-3 mt-3 text-center bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white hover:text-black transition-all"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {isEnglish ? `View All ${item.name === 'Commercial' ? 'Commercial Solutions' : item.name} →` : 'Tüm Ürünleri Görüntüle →'}
                                    </Link>
                                  </>
                                )}
                                {item.content?.models && (
                                  <>
                                    {item.content.models.map((model) => (
                                      <Link
                                        key={model.title}
                                        href={model.href}
                                        className="block py-2 text-base font-extralight text-white/60 hover:text-white hover:translate-x-2 transition-all uppercase tracking-wide"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {model.title}
                                      </Link>
                                    ))}
                                    <Link
                                      href="/perde-modelleri"
                                      className="block py-3 mt-3 text-center bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white hover:text-black transition-all"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      Tüm Modelleri Görüntüle →
                                    </Link>
                                  </>
                                )}
                                {item.content?.corporate && (
                                  <>
                                    {item.content.corporate.map((corp) => (
                                      <Link
                                        key={corp.title}
                                        href={corp.href}
                                        className="block py-2 text-base font-extralight text-white/60 hover:text-white hover:translate-x-2 transition-all uppercase tracking-wide"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {corp.title}
                                      </Link>
                                    ))}
                                    <Link
                                      href="/kurumsal-urunler"
                                      className="block py-3 mt-3 text-center bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white hover:text-black transition-all"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      Tüm Kurumsal Ürünleri Görüntüle →
                                    </Link>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3 text-xl font-extralight text-white/80 hover:text-white hover:translate-x-2 transition-all uppercase tracking-wider"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0.8, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex-shrink-0 mt-8 z-20"
              >
                <Link
                  href={isEnglish ? '/en/contact' : '/iletisim'}
                  className="group relative block w-full py-4 bg-white text-black text-center text-sm font-medium tracking-wider uppercase overflow-hidden transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative z-10">{isEnglish ? 'Contact Us' : 'İletişime Geç'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </Link>

                {/* Social Links */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all duration-200 hover:-translate-y-px hover:border-white/25 hover:bg-white/10 hover:text-white"
                    >
                      <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <SocialIcon name={social.name} />
                      </svg>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  )
}

export default Header
