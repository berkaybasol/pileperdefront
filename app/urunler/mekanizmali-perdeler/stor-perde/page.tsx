'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Stor Perde', url: '/urunler/mekanizmali-perdeler/stor-perde' },
]

const storTypes = [
  {
    id: 1,
    title: 'Screen Perde',
    description: 'Güneş ışınlarını filtreleyen, dışarıyı görebilen modern perde sistemleri',
    image: '/api/public/media/images/6e5c0949-ce5c-4c80-a59c-7ab427f6a7d6/file',
    href: '/urunler/mekanizmali-perdeler/stor-perde/screen-perde'
  },
  {
    id: 2,
    title: 'Tül Stor Perde',
    description: 'Şık ve zarif tül stor perde modelleri, hafif ve estetik görünüm',
    image: '/api/public/media/images/f7e4e8a9-159e-40ab-a96d-11c0ffbc9119/file',
    href: '/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde'
  },
  {
    id: 3,
    title: 'Karartma (Blackout) Stor Perde',
    description: 'Işık geçirmeyen, tam karartma sağlayan stor perde sistemleri',
    image: '/api/public/media/images/3527def1-7573-4032-99f9-edb5082959eb/file',
    href: '/urunler/mekanizmali-perdeler/stor-perde/karartma-stor-perde'
  },
  {
    id: 4,
    title: 'Desenli Stor Perde',
    description: 'Dijital baskı ve özel desenli stor perde modelleri',
    image: '/api/public/media/images/139c5f34-0287-4d29-b06a-e26d459e1758/file',
    href: '/urunler/mekanizmali-perdeler/stor-perde/desenli-stor-perde'
  }
]

// Daha iyi animasyon ayarları
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export default function StorPerdePage() {
  return (
    <>
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      <main className="bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="relative container mx-auto px-6 py-20">
          <motion.div
            className="text-center max-w-3xl mx-auto"
          >
            <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-8" />
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">Stor Perde Sistemleri</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6">
              Stor
              <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                Perde Koleksiyonu
              </span>
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed">
              Stor perde, mekanik sistem perdeler içerisinde kullanım şeklinin pratikliği ve ürün çeşitliliği nedeniyle
              en çok tercih edilen iç cephe ve dış cephe perde sistemidir. Yüzlerce desen, doku ve renk seçeneği ile
              birçok çeşit seçeneği vardır.
            </p>
          </motion.div>
        </div>
      </section>

      <ProductNavigationPilot>
      {/* Categories Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
          >
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Stor Perde Çeşitleri</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">
              Ürün Gruplarımız
            </h2>
          </motion.div>

          {/* Cards Grid - 4 columns for stor perde */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
          >
            {storTypes.map((type) => (
              <motion.div
                key={type.id}
                variants={staggerItem}
                className="group"
              >
                <Link href={type.href}>
                  <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={type.image}
                        alt={type.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      {/* Title & Description with Arrow */}
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-2xl font-light text-white mb-2 group-hover:-translate-y-1 transition-transform duration-300">
                            {type.title}
                          </h3>
                          <p className="text-gray-400 font-light text-sm">
                            {type.description}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 flex-shrink-0 ml-4">
                          <svg
                            className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
          >
            <h3 className="text-2xl md:text-3xl font-extralight text-white mb-4">
              Fiyat Bilgisi ve Teklif
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
              Stor perde fiyatları, ürün cinsine ve türüne göre değişiklik göstermektedir.
              Pile Perde rekabetçi fiyatları ile projelerinizi sorunsuz şekilde tamamlamanızı sağlar.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="tel:+903122417272"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300 hover:gap-4"
              >
                <span className="relative z-10 font-medium">Hemen Arayın</span>
                <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                İletişim Formu
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Video Anlatım</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">
                Motorlu Screen Perde
              </h2>
              <p className="text-gray-400 font-light max-w-2xl mx-auto">
                Stor perdelerde tercih edilen motorlu mekanizmalar nasıl çalışır?
              </p>
            </div>

            {/* YouTube Video Embed */}
            <motion.div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/W8rh9V6R7Cw"
                title="Motorlu Screen Perde"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      </ProductNavigationPilot>
      </main>
    </>
  )
}
