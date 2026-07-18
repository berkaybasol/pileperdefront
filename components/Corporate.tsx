'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { defaultCorporateItems, getPublicCorporateItems } from '@/lib/catalogContent'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface CorporateProps {
  showSwiper?: boolean;
  initialItems?: typeof defaultCorporateItems;
  locale?: 'tr' | 'en';
  loadCms?: boolean;
}

const Corporate = ({ showSwiper = true, initialItems = defaultCorporateItems, locale = 'tr', loadCms = true }: CorporateProps) => {
  const isEnglish = locale === 'en'
  const [corporateProducts, setCorporateProducts] = useState(initialItems)

  useEffect(() => {
    if (!loadCms) return
    let isMounted = true

    getPublicCorporateItems().then((items) => {
      if (isMounted) {
        setCorporateProducts(items)
      }
    })

    return () => {
      isMounted = false
    }
  }, [loadCms])

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-stone-950 to-black relative overflow-hidden">
      {/* Background Pattern - Different from others */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1c1c12_1px,transparent_1px),linear-gradient(to_bottom,#1c1c1c12_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/15 via-black to-black" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span className="w-12 h-[1px] bg-gray-700"></span>
              <span className="uppercase tracking-[0.2em] font-light">{isEnglish ? 'COMMERCIAL SOLUTIONS' : 'KURUMSAL ÜRÜNLER'}</span>
              <span className="w-12 h-[1px] bg-gray-700"></span>
            </div>
          </div>
          <h2 className="text-3xl lg:text-5xl font-extralight text-white mb-4">
            {isEnglish ? <>Made-to-measure Solutions for <span className="text-gray-400">Professional Interiors</span></> : <>Profesyonel Mekanlar İçin <span className="text-gray-400">Özel Çözümler</span></>}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            {isEnglish ? 'Bespoke curtains, blinds and shading systems for hotels, healthcare settings, restaurants, cafés and workplaces.' : 'Otelden hastaneye, restorandan ofise kadar tüm kurumsal projeleriniz için özel üretim perde ve dekorasyon çözümleri sunuyoruz.'}
          </p>
        </motion.div>

        {/* Desktop Grid - Different layout variation */}
        <div className={`${showSwiper ? 'hidden lg:grid' : 'grid'} grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8`}>
          {/* First card spans 2 columns on xl screens */}
          {corporateProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group ${index === 0 ? 'xl:col-span-2 xl:row-span-1' : ''}`}
            >
              <Link href={product.href}>
                <div className={`relative ${index === 0 ? 'h-[600px]' : 'h-[600px]'} rounded-3xl overflow-hidden bg-gradient-to-tl from-gray-900/60 to-gray-800/40 border border-white/[0.08] hover:border-white/20 transition-all duration-700`}>
                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90 uppercase tracking-wider rounded-full">
                      {isEnglish ? 'Commercial' : product.badge || 'Kurumsal'}
                    </span>
                  </div>

                  {/* Background Image with Different Treatment */}
                  <div className="absolute inset-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-1000 group-hover:scale-105 transition-transform duration-1000"
                    />
                    {/* Different gradient direction */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/80" />
                  </div>

                  {/* Content - Different positioning */}
                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                      <h3 className="text-3xl font-extralight text-white mb-3 tracking-wide">
                        {product.title}
                      </h3>
                      <p className="text-gray-300 font-light text-base mb-6 max-w-md">
                        {product.description}
                      </p>

                      {/* Unique arrow style for corporate */}
                      <div className="flex items-center gap-3 text-white/60 group-hover:text-white transition-colors duration-300">
                        <span className="text-sm uppercase tracking-widest font-light">{isEnglish ? 'Explore' : 'Keşfet'}</span>
                        <div className="flex items-center gap-1">
                          <div className="w-8 h-[1px] bg-white/40 group-hover:w-12 transition-all duration-500" />
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unique hover effect - corner glow */}
                  <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full filter blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full filter blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swiper */}
        {showSwiper && (
          <div className="lg:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={false}
              pagination={{
                clickable: true,
                dynamicBullets: true
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              className="corporate-swiper pb-12"
            >
              {corporateProducts.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={product.href}>
                      <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-tl from-gray-900/60 to-gray-800/40 border border-white/[0.08]">
                        {/* Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90 uppercase tracking-wider rounded-full">
                            {isEnglish ? 'Commercial' : product.badge || 'Kurumsal'}
                          </span>
                        </div>

                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover opacity-70"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/80" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                          <h3 className="text-2xl font-extralight text-white mb-2">
                            {product.title}
                          </h3>
                          <p className="text-gray-300 font-light text-sm mb-4">
                            {product.description}
                          </p>

                          <div className="flex items-center gap-3 text-white/60">
                            <span className="text-xs uppercase tracking-widest font-light">{isEnglish ? 'Explore' : 'Keşfet'}</span>
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-[1px] bg-white/40" />
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Bottom CTA - Different style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <div className="inline-flex flex-col items-center">
            <p className="text-gray-400 text-sm mb-6">
              {isEnglish ? 'Discuss a tailored window-treatment package for your project.' : 'Kurumsal projeleriniz için özel çözümler sunuyoruz'}
            </p>
            <div className="flex gap-4">
              <Link
                href={isEnglish ? '/en/contact' : '/iletisim'}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 font-medium">{isEnglish ? 'Request a Quote' : 'Teklif Alın'}</span>
                <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
              <Link
                href={isEnglish ? '/en/commercial' : '/kurumsal-urunler'}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                {isEnglish ? 'View All Solutions' : 'Tüm Çözümler'}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      {showSwiper && (
        <style jsx global>{`
          .corporate-swiper .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
          }

          .corporate-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            opacity: 1;
          }

          .corporate-swiper .swiper-pagination-bullet-active {
            background: #ffffff;
            width: 24px;
            border-radius: 4px;
          }
        `}</style>
      )}
    </section>
  )
}

export default Corporate
