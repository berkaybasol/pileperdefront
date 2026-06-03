'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface MekanizmaliPerdeTemplateProps {
  title: string
  subtitle: string
  description: string
  image: string
  mainTitle: string
  mainContent: string
  features: string[]
  usageAreas: string
  additionalInfo: {
    title: string
    content: string
  }
  benefits: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
}

export default function MekanizmaliPerdeTemplate({
  title,
  subtitle,
  description,
  image,
  mainTitle,
  mainContent,
  features,
  usageAreas,
  additionalInfo,
  benefits
}: MekanizmaliPerdeTemplateProps) {
  return (
    <main>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-16 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
              <Link href="/urunler" className="hover:text-white transition-colors">Ürünler</Link>
              <span>/</span>
              <Link href="/urunler/mekanizmali-perdeler" className="hover:text-white transition-colors">Mekanizmalı Perdeler</Link>
              <span>/</span>
              <span className="text-white">{title}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extralight text-white">
              {title}
            </h1>
            <p className="text-gray-400 mt-4 text-lg font-light max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 bg-[#0f0f11]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-96 lg:h-full min-h-[500px]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-light text-white mb-6">
                {mainTitle}
              </h2>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 font-light mb-4">
                  {mainContent}
                </p>

                <h3 className="text-xl font-light text-white mt-6 mb-3">Özellikler</h3>
                <ul className="space-y-2 text-gray-300 font-light">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-light text-white mt-6 mb-3">Kullanım Alanları</h3>
                <p className="text-gray-300 font-light mb-4">
                  {usageAreas}
                </p>

                <h3 className="text-xl font-light text-white mt-6 mb-3">{additionalInfo.title}</h3>
                <p className="text-gray-300 font-light">
                  {additionalInfo.content}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-100 transition-colors"
                >
                  Fiyat Teklifi Al
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/urunler/mekanizmali-perdeler"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Diğer Modeller
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-[#141416]">
        <div className="container mx-auto px-6 lg:px-12">
          <h3 className="text-2xl font-light text-white text-center mb-12">Neden {title}?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-light text-white mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-400 font-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}