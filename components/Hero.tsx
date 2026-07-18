'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

type CmsPageResponse = {
  success: boolean
  data: {
    sections: Array<{
      sectionKey: string
      title: string | null
      subtitle: string | null
      body: string | null
      contentJson: string | null
      enabled: boolean
    }>
  }
}

type HeroCmsContent = {
  title?: string
  subtitle?: string
  description?: string
  primaryCtaHref?: string
  stats?: HeroStat[]
  slides?: HeroSlide[]
}

type HeroStat = {
  number: string
  label: string
  suffix: string
}

type HeroSlide = {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  link: string
  enabled?: boolean
}

const fallbackStats: HeroStat[] = [
  { number: '500', suffix: '+', label: 'Proje' },
  { number: '35', suffix: '+', label: 'Yıl Deneyim' },
  { number: '100', suffix: '%', label: 'Memnuniyet' },
]

const normalizeVerifiedStats = (stats: HeroStat[]) => stats.map((stat) =>
  /deneyim|experience/i.test(stat.label)
    ? { ...stat, number: '35', suffix: '+' }
    : stat
)

const Hero = ({ locale = 'tr' }: { locale?: 'tr' | 'en' }) => {
  const isEnglish = locale === 'en'
  const [heroContent, setHeroContent] = useState<HeroCmsContent | null>(null)

  useEffect(() => {
    if (isEnglish) return
    const loadHeroContent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/home`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          return
        }

        const body = await response.json() as CmsPageResponse
        const heroSection = body.data.sections.find((section) => section.sectionKey === 'home.hero' && section.enabled)

        if (!heroSection) {
          return
        }

        let contentJson: { primaryCtaHref?: string; stats?: HeroStat[]; slides?: HeroSlide[] } = {}
        if (heroSection.contentJson) {
          try {
            contentJson = JSON.parse(heroSection.contentJson)
          } catch {
            contentJson = {}
          }
        }

        setHeroContent({
          title: heroSection.title || undefined,
          subtitle: heroSection.subtitle || undefined,
          description: heroSection.body || undefined,
          primaryCtaHref: contentJson.primaryCtaHref,
          stats: Array.isArray(contentJson.stats) && contentJson.stats.length > 0
            ? normalizeVerifiedStats(contentJson.stats)
            : undefined,
          slides: Array.isArray(contentJson.slides)
            ? contentJson.slides.filter((slide) => slide.enabled !== false)
            : undefined,
        })
      } catch {
        setHeroContent(null)
      }
    }

    void loadHeroContent()
  }, [isEnglish])

  const fallbackSlides = useMemo(() => isEnglish ? [
    {
      id: 1,
      title: 'Contemporary Curtain Designs',
      subtitle: 'Considered Modern Interiors',
      description: 'Curtains are the defining final layer of an interior. Our contemporary schemes balance proportion, fabric and daylight to create calm, beautifully resolved rooms.',
      image: '/api/public/media/images/2ec18b59-7848-4fcf-9b14-e72e00850a47/file',
      link: '/en/curtain-designs/contemporary',
    },
    {
      id: 2,
      title: 'Classic & Ornate Curtain Designs',
      subtitle: 'Timeless Elegance',
      description: 'Carefully judged classical details bring depth and individuality to an interior while retaining a refined, balanced character.',
      image: '/api/public/media/images/1257dce8-6141-47d9-8d0b-b3f4337daf65/file',
      link: '/en/curtain-designs/classic-and-ornate',
    },
    {
      id: 3,
      title: 'Made-to-Measure Roller Blinds',
      subtitle: 'Practical Shading Solutions',
      description: 'Roller blinds offer precise light control, straightforward operation and an extensive choice of technical and decorative fabrics for residential and commercial interiors.',
      image: '/api/public/media/images/fba75649-b296-4612-af5b-a2e4feff19d7/file',
      link: '/en/products/blinds/roller-blinds',
    },
    {
      id: 4,
      title: 'Cross-over Curtain Designs',
      subtitle: 'Graceful Decorative Drapery',
      description: 'Cross-over curtains create an elegant, softly gathered composition with a distinctive decorative presence at the window.',
      image: '/api/public/media/images/f3dd50c6-fc26-4672-9666-1b1504fb1982/file',
      link: '/en/curtain-designs/cross-over',
    },
  ] : [
    {
      id: 1,
      title: heroContent?.title || 'Modern Perde',
      subtitle: heroContent?.subtitle || 'Yeni Nesil Tasarım',
      description: heroContent?.description || 'Bir mekana modern veya klasik perde yapma kararı dekorasyondaki en kritik kararlardan biridir. Çünkü perde dekorasyonun karakterini değiştirebilecek güce sahip olan son dokunuştur.',
      image: '/api/public/media/images/2ec18b59-7848-4fcf-9b14-e72e00850a47/file',
      link: heroContent?.primaryCtaHref || '/model-perdeler/modern-perde/'
    },
    {
      id: 2,
      title: 'Klasik Perde Modelleri',
      subtitle: 'Zamansız Elegans',
      description: 'Modern bir dekorasyona perdede yapacağınız birkaç klasik dokunuş dekorasyonun kimliğini salt modernden çıkarır ve sizi dekorasyonda kullanacağınız aksesuarlarda özgürleştirir.',
      image: '/api/public/media/images/1257dce8-6141-47d9-8d0b-b3f4337daf65/file',
      link: '/model-perdeler/klasik-ve-avangart-perde/'
    },
    {
      id: 3,
      title: 'Stor Perdeler',
      subtitle: 'Pratik Çözümler',
      description: 'Stor perde, mekanik sistem perdeler içerisinde kullanım şeklinin pratikliği ve ürün çeşitliliği nedeniyle en çok tercih edilen iç cephe ve dış cebe perde sistemidir.',
      image: '/api/public/media/images/fba75649-b296-4612-af5b-a2e4feff19d7/file',
      link: '/urunler/mekanizmali-perdeler/stor-perde'
    },
    {
      id: 4,
      title: 'Kruvaze Perde',
      subtitle: 'Gösterişli Model',
      description: 'Son dönemlerde perde modelleri arasında önemli bir konumda yer alan ve yoğun bir ilgi gören kruvaze perdeler, şık, gösterişli bir modeldir.',
      image: '/api/public/media/images/f3dd50c6-fc26-4672-9666-1b1504fb1982/file',
      link: '/model-perdeler/kruvaze-perde/'
    }
  ], [heroContent, isEnglish])

  const slides = heroContent?.slides?.length ? heroContent.slides : fallbackSlides
  const stats = isEnglish
    ? [{ number: '500', suffix: '+', label: 'Projects' }, { number: '35', suffix: '+', label: 'Years of Experience' }, { number: '100', suffix: '%', label: 'Satisfaction' }]
    : heroContent?.stats?.length ? heroContent.stats : fallbackStats

  return (
    <>
      <h1 className="sr-only">{isEnglish ? 'Made-to-measure curtains, blinds and motorised window treatments in Ankara' : 'Ankara’da Özel Ölçü Perde ve Motorlu Perde Sistemleri'}</h1>

      {/* Desktop Hero */}
      <section className="hidden lg:block relative w-full h-[85vh] bg-gradient-to-b from-gray-950 to-black overflow-hidden">
        {/* Dark Glassmorphism Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-gray-950 to-black" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
        </div>

        <div className="container mx-auto h-full px-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}"><span class="inner"></span></span>`;
              },
            }}
            loop={true}
            className="h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full flex items-center">
                  <div className="grid grid-cols-2 gap-16 items-center w-full">

                    {/* Left Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="space-y-8"
                    >
                      {/* Badge */}
                      <div className="inline-block">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="w-12 h-[1px] bg-gray-700"></span>
                          <span className="uppercase tracking-[0.2em] font-light">{slide.subtitle}</span>
                          <span className="w-12 h-[1px] bg-gray-700"></span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-5xl xl:text-6xl font-extralight text-white">
                        {slide.title}
                        <span className="text-gray-400">.</span>
                      </h2>

                      {/* Description */}
                      <p className="text-lg text-gray-400 font-light leading-relaxed max-w-xl">
                        {slide.description}
                      </p>

                      {/* CTAs */}
                      <div className="flex flex-row gap-4">
                        <Link
                          href={slide.link}
                          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300"
                        >
                          <span className="relative z-10 font-medium">{isEnglish ? 'View Details' : 'Detayları İncele'}</span>
                          <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        </Link>

                        <Link
                          href={isEnglish ? '/en/contact' : '/iletisim'}
                          className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                          {isEnglish ? 'Contact Us' : 'İletişime Geç'}
                        </Link>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-8 pt-8">
                        {stats.slice(0, 3).map((stat, index) => (
                          <div key={`${stat.label}-${index}`} className="group">
                            <div className="text-3xl font-extralight text-white group-hover:text-gray-400 transition-colors duration-300">
                              {stat.number}
                              {stat.suffix}
                            </div>
                            <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2 font-light">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Right Image - Dark Glassmorphism Style */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 group"
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          sizes="50vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
                      </div>

                      {/* Slide Number */}
                      <div className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-md px-6 py-3 border-l border-t border-white/20">
                        <span className="text-2xl font-extralight text-white">0{slide.id}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Mobile Hero */}
      <section className="lg:hidden relative w-full bg-gradient-to-b from-gray-950 to-black overflow-hidden">
        {/* Dark Glassmorphism Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-gray-950 to-black" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
        </div>
        <div className="container mx-auto px-6 pt-8 relative z-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}"><span class="inner"></span></span>`;
              },
            }}
            loop={true}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="py-4 pb-12">
                  <div className="grid gap-4">

                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative h-[250px] sm:h-[350px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 group"
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>

                      {/* Slide Number */}
                      <div className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-md px-4 py-2 border-l border-t border-white/20">
                        <span className="text-lg font-extralight text-white">0{slide.id}</span>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="space-y-3"
                    >
                      {/* Badge */}
                      <div className="inline-block">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span className="w-8 h-[1px] bg-gray-700"></span>
                          <span className="uppercase tracking-[0.15em] font-light">{slide.subtitle}</span>
                          <span className="w-8 h-[1px] bg-gray-700"></span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl font-extralight text-white">
                        {slide.title}
                        <span className="text-gray-400">.</span>
                      </h2>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed line-clamp-2">
                        {slide.description}
                      </p>

                      {/* CTAs */}
                      <div className="flex flex-row gap-2">
                        <Link
                          href={slide.link}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs bg-white text-black font-medium transition-all duration-300"
                        >
                          {isEnglish ? 'View Details' : 'Detaylar'}
                        </Link>

                        <Link
                          href={isEnglish ? '/en/contact' : '/iletisim'}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs border border-white/20 text-white font-medium transition-all duration-300"
                        >
                          {isEnglish ? 'Contact Us' : 'İletişim'}
                        </Link>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 pt-3">
                        {stats.slice(0, 3).map((stat, index) => (
                          <div key={`${stat.label}-${index}`}>
                            <div className="text-lg font-extralight text-white">
                              {stat.number}
                              {stat.suffix}
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mt-0.5 font-light">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
          left: 50% !important;
          transform: translateX(-50%);
          width: auto !important;
        }

        .swiper-pagination-bullet {
          width: 40px;
          height: 2px;
          background: rgba(255,255,255,0.2);
          border-radius: 0;
          opacity: 1;
          margin: 0 4px !important;
          position: relative;
          overflow: hidden;
        }

        .swiper-pagination-bullet .inner {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #ffffff;
          width: 0;
          transition: width 5s linear;
        }

        .swiper-pagination-bullet-active .inner {
          width: 100%;
        }

        @media (max-width: 768px) {
          .swiper-pagination {
            bottom: 10px !important;
          }
          .swiper-pagination-bullet {
            width: 30px;
            margin: 0 3px !important;
          }
        }
      `}</style>
    </>
  )
}

export default Hero
