'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import {
  defaultModelCatalogText,
  getPublicModelCatalogContent,
  type CatalogItem,
} from '@/lib/catalogContent'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface ModelsProps {
  showSwiper?: boolean;
  showCTA?: boolean;
}

const Models = ({ showSwiper = true, showCTA = true }: ModelsProps) => {
  const models = [
    {
      id: 1,
      title: 'Klasik ve Avangart',
      image: '/api/public/media/images/df6a191d-3db6-4645-a083-f71422f49200/file',
      href: '/model-perdeler/klasik-ve-avangart-perde',
      description: 'Zamansız elegans ve sofistike tasarımlar'
    },
    {
      id: 2,
      title: 'Modern Perde',
      image: '/api/public/media/images/d70ef178-4553-4734-b023-80b297f1e695/file',
      href: '/model-perdeler/modern-perde',
      description: 'Minimalist ve çağdaş perde modelleri'
    },
    {
      id: 3,
      title: 'Rustikli Perde',
      image: '/api/public/media/images/4b0f28ee-b79d-44e0-880d-5aec64bb13e3/file',
      href: '/model-perdeler/rustikli-perde',
      description: 'Doğal ve sıcak atmosfer yaratan tasarımlar'
    },
    {
      id: 4,
      title: 'Kruvaze Perde',
      image: '/api/public/media/images/fa4be5de-409b-407c-adc6-44df3d5c712b/file',
      href: '/model-perdeler/kruvaze-perde',
      description: 'Zarif ve estetik perde tasarımları'
    },
    {
      id: 5,
      title: 'Balon Perde',
      image: '/api/public/media/images/0d960ab5-7767-41f7-86e2-674315fa8cfd/file',
      href: '/model-perdeler/balon-perde',
      description: 'Şık ve gösterişli tasarımlar'
    },
    {
      id: 6,
      title: 'Katlamalı Perde',
      image: '/api/public/media/images/2e01e3a6-79a2-4b09-87f3-48350370e150/file',
      href: '/model-perdeler/katlamali-perde',
      description: 'Fonksiyonel ve şık tasarımlar'
    },
    {
      id: 7,
      title: 'Yüksek Tavanlı Galeri',
      image: '/api/public/media/images/334ad8c7-98e2-411c-98e9-d3c74c5a8973/file',
      href: '/model-perdeler/yuksek-tavanli-galeri-perde',
      description: 'İhtişamlı yüksek tavan çözümleri'
    },
    {
      id: 8,
      title: 'İp Perde',
      image: '/api/public/media/images/10c446e9-acdc-487b-8f12-2f962c3b5e37/file',
      href: '/model-perdeler/ip-perde',
      description: 'Modern ve dekoratif tasarımlar'
    },
    {
      id: 9,
      title: 'Çocuk Perde',
      image: '/api/public/media/images/92d067f9-f14e-45da-89fb-901f775d61b3/file',
      href: '/model-perdeler/cocuk-perde',
      description: 'Renkli ve eğlenceli desenler'
    },
    {
      id: 10,
      title: 'Cibinlik Perde',
      image: '/api/public/media/images/66a8d307-6542-437e-9781-8626f3f2067e/file',
      href: '/model-perdeler/cibinlik-perde',
      description: 'Romantik ve zarif yatak odası'
    },
    {
      id: 11,
      title: 'Çatı Katı Perde',
      image: '/api/public/media/images/9bfdadba-520b-43d8-8ccb-c9256523b8a9/file',
      href: '/model-perdeler/cati-kati-perde',
      description: 'Eğimli pencere özel çözümleri'
    },
    {
      id: 12,
      title: 'Kış Bahçesi Perde',
      image: '/api/public/media/images/3f3e07b0-8d36-4b49-8b21-1f0f4d439d90/file',
      href: '/model-perdeler/kis-bahcesi-perde',
      description: 'Cam balkon ve kış bahçesi için'
    },
  ]

  const [cmsModels, setCmsModels] = useState<CatalogItem[] | null>(null)
  const [intro, setIntro] = useState(defaultModelCatalogText)
  const displayedModels = cmsModels || models

  useEffect(() => {
    let isMounted = true

    getPublicModelCatalogContent().then((content) => {
      if (isMounted) {
        setIntro({
          eyebrow: content.eyebrow,
          title: content.title,
          description: content.description,
        })
        setCmsModels(content.items)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="relative py-12 lg:py-32 bg-gradient-to-b from-neutral-950 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neutral-900/25 via-neutral-950 to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header - Only show on homepage */}
        {showCTA && (
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
                <span className="uppercase tracking-[0.2em] font-light">{intro.eyebrow}</span>
                <span className="w-12 h-[1px] bg-gray-700"></span>
              </div>
            </div>
            <h2 className="text-3xl lg:text-5xl font-extralight text-white mb-4">
              {intro.title}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light">
              {intro.description}
            </p>
          </motion.div>
        )}

        {/* Desktop Grid */}
        <div className={`${showSwiper ? 'hidden md:grid' : 'grid'} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {displayedModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={model.href}>
                <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <Image
                      src={model.image}
                      alt={model.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    {/* Title & Description with Arrow */}
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-2xl font-light text-white mb-2 group-hover:-translate-y-1 transition-transform duration-300">
                          {model.title}
                        </h3>
                        <p className="text-gray-400 font-light text-sm">
                          {model.description}
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

        {/* Mobile Swiper - Only show on homepage */}
        {showSwiper && (
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1.1}
              centeredSlides={false}
              pagination={{
                clickable: true,
                dynamicBullets: true
              }}
              className="models-swiper pb-12"
            >
              {displayedModels.map((model, index) => (
                <SwiperSlide key={model.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={model.href}>
                      <div className="relative h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                          <Image
                            src={model.image}
                            alt={model.title}
                            fill
                            className="object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          {/* Title & Description with Arrow */}
                          <div className="flex items-end justify-between">
                            <div>
                              <h3 className="text-xl font-light text-white mb-1">
                                {model.title}
                              </h3>
                              <p className="text-gray-400 font-light text-xs">
                                {model.description}
                              </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0 ml-3">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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

        {/* CTA Button - Only show on homepage */}
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/perde-modelleri"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#0f0f11] text-sm font-normal transition-all duration-300 hover:bg-gray-100"
            >
              Tüm Modelleri Görüntüle
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Custom Pagination Styles */}
      {showSwiper && (
        <style jsx global>{`
          .models-swiper .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
          }

          .models-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            opacity: 1;
          }

          .models-swiper .swiper-pagination-bullet-active {
            background: #ffffff;
            width: 24px;
            border-radius: 4px;
          }

          @media (max-width: 640px) {
            .models-swiper {
              margin-left: -1.5rem;
              margin-right: -1.5rem;
              padding-left: 1.5rem;
              padding-right: 1.5rem;
            }
          }
        `}</style>
      )}
    </section>
  )
}

export default Models
