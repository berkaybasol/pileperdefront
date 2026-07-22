'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useCmsPage } from '@/components/CmsPageProvider'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string | null
  timestamp: string
}

type CmsSection = {
  sectionKey: string
  sectionType?: string
  title: string | null
  subtitle: string | null
  body: string | null
  contentJson: string | null
  enabled: boolean
}

type CmsPage = {
  sections: CmsSection[]
}

type AboutTab = {
  key: string
  title: string
  content: string
}

type AboutStat = {
  number: string
  label: string
  suffix: string
}

type AboutContent = {
  eyebrow: string
  title: string
  lead: string
  image: string
  imageAlt: string
  experienceLabel: string
  ctaLabel: string
  ctaHref: string
  tabs: AboutTab[]
  services: string[]
  stats: AboutStat[]
}

const fallbackAboutContent: AboutContent = {
  eyebrow: 'HAKKIMIZDA',
  title: '35 Yıllık Dekorasyon Deneyimi',
  lead: 'Pile Perde olarak, perde ve döşemelik kumaş alanında Türkiye ve Avrupa\'nın önde gelen tekstil firmaları ile çalışarak, müşterilerimize en kaliteli ürünleri sunuyoruz.',
  image: '/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file',
  imageAlt: 'Pile Perde Mağaza',
  experienceLabel: 'Yıl Deneyim',
  ctaLabel: 'Daha Fazla Bilgi',
  ctaHref: '/hakkimizda',
  tabs: [
    {
      key: 'mission',
      title: 'Misyonumuz',
      content: 'Ev, ofis, otel, restoran, kafe ve resmi kurumlar için özel tasarım perde ve döşemelik kumaş çözümleri sunarak, müşterilerimizin yaşam alanlarını güzelleştirmek ve fonksiyonel hale getirmek.',
    },
    {
      key: 'vision',
      title: 'Vizyonumuz',
      content: '35 yıllık deneyimimizle Türkiye\'nin lider dekorasyon markası olarak, klasik, yarı klasik, modern, country ve avangard tarzlarda sunduğumuz çözümlerle sektörde öncü olmaya devam etmek.',
    },
    {
      key: 'values',
      title: 'Değerlerimiz',
      content: 'Kaliteli ürün, zamanında teslimat, uzman ekip ve %100 müşteri memnuniyeti ilkeleriyle, iç mimarların güvenilir çözüm ortağı olmak.',
    },
  ],
  services: [
    'Ücretsiz keşif hizmeti',
    'Kusursuz montaj garantisi',
    'İç mimarların çözüm ortağı',
  ],
  stats: [
    { number: '35', label: 'Yıllık Deneyim', suffix: '' },
    { number: '5000', label: 'Tamamlanan Proje', suffix: '+' },
    { number: '15', label: 'Mutlu Müşteri', suffix: 'K+' },
    { number: '99', label: 'Müşteri Memnuniyeti', suffix: '%' },
  ],
}

const englishAboutContent: AboutContent = {
  eyebrow: 'ABOUT PILE PERDE',
  title: '35 Years of Expertise in Curtains and Interior Textiles',
  lead: 'At Pile Perde, we work with leading textile houses in Türkiye and Europe to offer our clients the highest-quality curtains and upholstery fabrics.',
  image: fallbackAboutContent.image,
  imageAlt: 'Pile Perde showroom in Ankara',
  experienceLabel: 'Years of Experience',
  ctaLabel: 'Learn More About Us',
  ctaHref: '/en/about',
  tabs: [
    { key: 'mission', title: 'Our Mission', content: 'To enhance our clients’ living and working spaces, making them more beautiful and functional through bespoke curtains and upholstery fabrics for homes, offices, hotels, restaurants, cafés and public institutions.' },
    { key: 'vision', title: 'Our Vision', content: 'Drawing on 35 years of experience, our vision is to remain at the forefront of the sector as Türkiye’s leading interiors brand, offering solutions in classic, semi-classic, modern, country and avant-garde styles.' },
    { key: 'values', title: 'Our Values', content: 'To be a trusted partner to interior designers, guided by quality products, punctual delivery, an expert team and a commitment to 100% customer satisfaction.' },
  ],
  services: ['Complimentary site survey', 'Guaranteed flawless installation', 'A trusted partner to interior designers'],
  stats: [
    { number: '35', label: 'Years of Experience', suffix: '' },
    { number: '5000', label: 'Completed Projects', suffix: '+' },
    { number: '15', label: 'Happy Clients', suffix: 'K+' },
    { number: '99', label: 'Client Satisfaction', suffix: '%' },
  ],
}

const parseAboutContent = (section: CmsSection | null): AboutContent => {
  if (!section) {
    return fallbackAboutContent
  }

  try {
    const parsed = section.contentJson ? JSON.parse(section.contentJson) as Partial<AboutContent> & {
      hero?: {
        eyebrow?: string
        title?: string
        description?: string
      }
    } : {}

    return {
      ...fallbackAboutContent,
      eyebrow: section.subtitle || parsed.hero?.eyebrow || fallbackAboutContent.eyebrow,
      title: section.title || fallbackAboutContent.title,
      lead: section.body || fallbackAboutContent.lead,
      image: parsed.image || fallbackAboutContent.image,
      imageAlt: parsed.imageAlt || fallbackAboutContent.imageAlt,
      experienceLabel: parsed.experienceLabel || fallbackAboutContent.experienceLabel,
      ctaLabel: parsed.ctaLabel || fallbackAboutContent.ctaLabel,
      ctaHref: parsed.ctaHref || fallbackAboutContent.ctaHref,
      tabs: Array.isArray(parsed.tabs) && parsed.tabs.length > 0 ? parsed.tabs : fallbackAboutContent.tabs,
      services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : fallbackAboutContent.services,
      stats: Array.isArray(parsed.stats) && parsed.stats.length > 0 ? parsed.stats : fallbackAboutContent.stats,
    }
  } catch {
    return {
      ...fallbackAboutContent,
      eyebrow: section.subtitle || fallbackAboutContent.eyebrow,
      title: section.title || fallbackAboutContent.title,
      lead: section.body || fallbackAboutContent.lead,
    }
  }
}

const About = ({ locale = 'tr', showCta = true }: { locale?: 'tr' | 'en', showCta?: boolean }) => {
  const isEnglish = locale === 'en'
  const cmsPage = useCmsPage()
  const initialCmsSection = cmsPage?.pageKey === 'about'
    ? cmsPage.sections.find((item) => item.sectionKey === 'about.main' && item.enabled) || null
    : null
  const initialCmsContent = parseAboutContent(initialCmsSection)
  const initialContent = isEnglish
    ? {
        ...englishAboutContent,
        image: initialCmsContent.image,
        stats: englishAboutContent.stats.map((stat, index) => ({
          ...stat,
          number: initialCmsContent.stats[index]?.number || stat.number,
          suffix: initialCmsContent.stats[index]?.suffix ?? stat.suffix,
        })),
      }
    : initialCmsContent
  const [activeTab, setActiveTab] = useState(initialContent.tabs[0].key)
  const [aboutContent, setAboutContent] = useState(initialContent)

  useEffect(() => {
    if (cmsPage?.localPreview) return
    const loadAboutContent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/about`)
        if (!response.ok) {
          return
        }

        const body = await response.json() as ApiResponse<CmsPage>
        const section = body.data.sections.find((item) => item.sectionKey === 'about.main' && item.enabled) || null
        const cmsContent = parseAboutContent(section)
        const nextContent = isEnglish
          ? {
              ...englishAboutContent,
              image: cmsContent.image,
              stats: englishAboutContent.stats.map((stat, index) => ({
                ...stat,
                number: cmsContent.stats[index]?.number || stat.number,
                suffix: cmsContent.stats[index]?.suffix ?? stat.suffix,
              })),
            }
          : cmsContent
        setAboutContent(nextContent)
        setActiveTab(nextContent.tabs[0]?.key || fallbackAboutContent.tabs[0].key)
      } catch {
      }
    }

    void loadAboutContent()
  }, [cmsPage?.localPreview, isEnglish])

  const selectedTab = useMemo(
    () => aboutContent.tabs.find((tab) => tab.key === activeTab) || aboutContent.tabs[0],
    [aboutContent.tabs, activeTab]
  )

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-950 via-black to-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-6">
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span className="w-12 h-[1px] bg-gray-700"></span>
                <span className="uppercase tracking-[0.2em] font-light">{aboutContent.eyebrow}</span>
                <span className="w-12 h-[1px] bg-gray-700"></span>
              </div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-extralight text-white mb-6">
              {aboutContent.title}
            </h2>

            <p className="text-gray-400 font-light mb-8 text-base lg:text-lg leading-relaxed">
              {aboutContent.lead}
            </p>

            <div className="mb-8">
              <div className="grid grid-cols-3 mb-6 border-b border-white/10">
                {aboutContent.tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`min-h-12 px-1.5 sm:px-3 lg:px-6 py-3 text-[10px] sm:text-xs lg:text-sm font-light uppercase tracking-[0.08em] sm:tracking-wider transition-all duration-300 relative break-words ${
                      activeTab === tab.key
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-400'
                    }`}
                  >
                    {tab.title}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
                      />
                    )}
                  </button>
                ))}
              </div>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-400 font-light leading-relaxed">
                  {selectedTab?.content}
                </p>
              </motion.div>
            </div>

            <div className="space-y-3 mb-8">
              {aboutContent.services.map((service) => (
                <div key={service} className="group flex items-start gap-3 transition-all duration-300 hover:translate-x-2">
                  <div className="w-5 h-5 mt-0.5 shrink-0 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/10">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-400 font-light group-hover:text-white">{service}</span>
                </div>
              ))}
            </div>

            {showCta && (
              <Link
                href={aboutContent.ctaHref}
                className="group relative inline-flex min-h-12 max-w-full items-center gap-3 px-6 sm:px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 font-medium">{aboutContent.ctaLabel}</span>
                <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 group">
              <Image
                src={aboutContent.image}
                alt={aboutContent.imageAlt}
                fill
                className="object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
              </div>

              <div className="absolute top-4 right-4 lg:top-8 lg:right-8 bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/20">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-extralight text-white mb-1">{aboutContent.stats[0]?.number || '35'}</div>
                  <div className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-[0.2em] font-light">{aboutContent.experienceLabel}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-8 mt-16 lg:mt-20 pt-16 lg:pt-20 border-t border-white/10"
        >
          {aboutContent.stats.map((stat, index) => (
            <div key={`${stat.label}-${index}`} className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white mb-2 transition-colors duration-300 group-hover:text-gray-400">
                {stat.number}
                <span className="text-2xl lg:text-3xl text-gray-500">{stat.suffix}</span>
              </div>
              <div className="px-1 text-[10px] sm:text-xs lg:text-sm text-gray-500 font-light uppercase leading-relaxed tracking-[0.08em] sm:tracking-[0.15em] break-words">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
