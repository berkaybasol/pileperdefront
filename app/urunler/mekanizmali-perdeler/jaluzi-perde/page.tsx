'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/jaluzi-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Jaluzi Perde', url: '/urunler/mekanizmali-perdeler/jaluzi-perde' },
]

const jaluziTypes = [
  {
    id: 1,
    title: 'Alüminyum Jaluzi Perde',
    description: 'Dayanıklı alüminyum yapısı ile ekonomik ve pratik çözümler',
    image: '/api/public/media/images/5b85af2f-2127-4028-9eab-cc9c75005ba4/file',
    href: '/urunler/mekanizmali-perdeler/jaluzi-perde/aluminyum-jaluzi-perde'
  },
  {
    id: 2,
    title: 'Ahşap Jaluzi Perde',
    description: 'Doğal ahşap dokularıyla sıcak ve şık ambiyans',
    image: '/api/public/media/images/e1446473-f10c-449c-8e90-98f44fa11966/file',
    href: '/urunler/mekanizmali-perdeler/jaluzi-perde/ahsap-jaluzi-perde'
  },
  {
    id: 3,
    title: 'Deri Jaluzi Perde',
    description: 'Premium deri kaplama ile lüks ve zarif görünüm',
    image: '/api/public/media/images/8d3779a1-8291-44fe-833d-b3572cacce66/file',
    href: '/urunler/mekanizmali-perdeler/jaluzi-perde/deri-jaluzi-perde'
  }
]

export default function JaluziPerdePage() {
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
              <span className="text-xs text-gray-400 uppercase tracking-wider">Jaluzi Sistemleri</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6">
              Jaluzi
              <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                Perde Koleksiyonu
              </span>
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed">
              Jaluzi Perde sistemleri, yatay sistemde çalışan birbirine paralel bantlardan oluşan mekanik sistemli perde çeşitlerindendir.
              Alüminyum Jaluzi, Ahşap Jaluzi ve Deri Jaluzi olmak üzere 3 ayrı çeşit ve Pile Perde garantisiyle, sizlerin beğenisine sunulmaktadır.
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
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Jaluzi Çeşitleri</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">
              Ürün Gruplarımız
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jaluziTypes.map((type, index) => (
              <motion.div
                key={type.id}
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
          </div>
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
              Jaluzi fiyatları, ürün cinsine ve türüne göre değişiklik göstermektedir.
              Pile perde Rekabetçi fiyatları ile projelerinizi sorunsuz şekilde tamamlamanızı sağlar.
            </p>
          </motion.div>
        </div>
      </section>
      </ProductNavigationPilot>
      </main>
    </>
  )
}
