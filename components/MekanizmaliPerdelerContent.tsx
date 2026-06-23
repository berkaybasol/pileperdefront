'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  defaultMekanizmaliPerdelerContent,
  getProductDetailContent,
  type ProductDetailContent,
} from '@/lib/productDetailContent'

type ManagedProductDetailProps = {
  pageKey?: string
  fallbackContent?: ProductDetailContent
}

export default function MekanizmaliPerdelerContent({
  pageKey = 'product-mekanizmali-perdeler',
  fallbackContent = defaultMekanizmaliPerdelerContent,
}: ManagedProductDetailProps) {
  const [content, setContent] = useState<ProductDetailContent>(fallbackContent)

  useEffect(() => {
    let isMounted = true

    getProductDetailContent(pageKey).then((nextContent) => {
      if (isMounted) {
        setContent(nextContent)
      }
    })

    return () => {
      isMounted = false
    }
  }, [pageKey])

  return (
    <main className="bg-black">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container relative mx-auto px-6 py-20">
          <motion.div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs uppercase tracking-wider text-gray-400">{content.heroEyebrow}</span>
            </div>

            <h1 className="mb-6 text-5xl font-extralight text-white md:text-6xl lg:text-7xl">
              {content.heroTitle}
              <span className="block bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text font-thin text-transparent">
                {content.heroHighlight}
              </span>
            </h1>

            <p className="text-lg font-light leading-relaxed text-gray-400">
              {content.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">{content.categoryEyebrow}</p>
            <h2 className="text-3xl font-extralight text-white md:text-4xl">
              {content.categoryTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.categories.map((category) => (
              <motion.div key={category.id} className="group">
                <Link href={category.href}>
                  <div className="relative h-[600px] overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 transition-all duration-500 hover:border-white/20">
                    <div className="absolute inset-0">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="mb-2 text-2xl font-light text-white transition-transform duration-300 group-hover:-translate-y-1">
                            {category.title}
                          </h3>
                          <p className="text-sm font-light text-gray-400">
                            {category.description}
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
        </div>
      </section>

      <section className="relative border-t border-white/5 py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div>
            <h3 className="mb-4 text-2xl font-extralight text-white md:text-3xl">
              {content.ctaTitle}
            </h3>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-400">
              {content.ctaDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={content.primaryCtaHref}
                className="group relative inline-flex items-center gap-2 overflow-hidden bg-white px-8 py-4 text-black transition-all duration-300 hover:gap-4"
              >
                <span className="relative z-10 font-medium">{content.primaryCtaLabel}</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 translate-x-full bg-gradient-to-r from-gray-100 to-gray-200 transition-transform duration-300 group-hover:translate-x-0" />
              </Link>
              <Link
                href={content.secondaryCtaHref}
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                {content.secondaryCtaLabel}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10m-7 5h4" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
