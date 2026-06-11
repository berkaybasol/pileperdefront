'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import {
  defaultProductItems,
  defaultProductSectionCopy,
  getPublicProductsPageContent,
  type CatalogItem,
  type ProductSectionCopy,
} from '@/lib/catalogContent'

import 'swiper/css'
import 'swiper/css/pagination'

interface ProductsProps {
  showSwiper?: boolean
  initialItems?: CatalogItem[]
  initialCopy?: ProductSectionCopy
}

const Products = ({
  showSwiper = true,
  initialItems = defaultProductItems,
  initialCopy = defaultProductSectionCopy,
}: ProductsProps) => {
  const [products, setProducts] = useState(initialItems)
  const [copy, setCopy] = useState(initialCopy)

  useEffect(() => {
    let isMounted = true

    getPublicProductsPageContent().then((content) => {
      if (isMounted) {
        setProducts(content.items)
        setCopy({
          heroTitle: content.heroTitle,
          heroSubtitle: content.heroSubtitle,
          sectionEyebrow: content.sectionEyebrow,
          sectionTitle: content.sectionTitle,
          sectionDescription: content.sectionDescription,
        })
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="relative bg-gradient-to-b from-zinc-950 to-black py-12 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/30 via-zinc-950 to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center lg:mb-16"
        >
          <div className="mb-4 inline-block">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span className="h-[1px] w-12 bg-gray-700" />
              <span className="font-light uppercase tracking-[0.2em]">{copy.sectionEyebrow}</span>
              <span className="h-[1px] w-12 bg-gray-700" />
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-extralight text-white lg:text-5xl">
            {copy.sectionTitle}
          </h2>
          <p className="mx-auto max-w-2xl font-light text-gray-400">
            {copy.sectionDescription}
          </p>
        </motion.div>

        <div className={`${showSwiper ? 'hidden md:grid' : 'grid'} grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={product.href}>
                <div className="relative h-[600px] overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 transition-all duration-500 hover:border-white/20">
                  <div className="absolute inset-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="mb-2 text-2xl font-light text-white transition-transform duration-300 group-hover:-translate-y-1">
                          {product.title}
                        </h3>
                        <p className="text-sm font-light text-gray-400">
                          {product.description}
                        </p>
                      </div>
                      <div className="ml-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white group-hover:bg-white">
                        <svg
                          className="h-5 w-5 text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {showSwiper && (
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1.1}
              centeredSlides={false}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="products-swiper pb-12"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={product.href}>
                      <div className="relative h-[500px] overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                        <div className="absolute inset-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <div className="flex items-end justify-between">
                            <div>
                              <h3 className="mb-1 text-xl font-light text-white">
                                {product.title}
                              </h3>
                              <p className="text-xs font-light text-gray-400">
                                {product.description}
                              </p>
                            </div>
                            <div className="ml-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                              <svg
                                className="h-4 w-4 text-white"
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
      </div>

      {showSwiper && (
        <style jsx global>{`
          .products-swiper .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
          }

          .products-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            opacity: 1;
          }

          .products-swiper .swiper-pagination-bullet-active {
            background: #ffffff;
            width: 24px;
            border-radius: 4px;
          }

          @media (max-width: 640px) {
            .products-swiper {
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

export default Products
