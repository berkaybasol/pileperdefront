'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'
import ProductContactCta from '@/components/ProductContactCta'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

const canonicalUrl = 'https://pileperde.com.tr/kurumsal-urunler/ozel-proje-perdeleri'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Kurumsal Ürünler', url: '/kurumsal-urunler' },
  { name: 'Özel Proje Perdeleri', url: '/kurumsal-urunler/ozel-proje-perdeleri' },
]

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/cddc7f70-53b5-4df0-bd2e-1a8511c17fd7/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 1' },
  { id: 2, src: '/api/public/media/images/45b17424-186c-499f-8095-6e12e571df3e/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 2' },
  { id: 3, src: '/api/public/media/images/f303d14a-fc6c-4cab-b6a3-36bb7d088fee/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 3' },
  { id: 4, src: '/api/public/media/images/47193a7d-7d07-469a-8463-af5fae2180e0/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 4' },
  { id: 5, src: '/api/public/media/images/0cd2d023-a2fc-4e8a-b512-1a70e6ef1375/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 5' },
  { id: 6, src: '/api/public/media/images/082e181d-fc28-46fc-81b9-36e38bfb7f86/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 6' },
  { id: 7, src: '/api/public/media/images/d6ed4177-2323-4e13-bf82-1773c28da22a/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 7' },
  { id: 8, src: '/api/public/media/images/10a402b7-6718-4cb6-8ded-e72e8a8a1039/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 8' },
  { id: 9, src: '/api/public/media/images/d6c04ffe-4134-4e8c-93df-67a045bb0ca3/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 9' },
  { id: 10, src: '/api/public/media/images/3c5decdf-6775-48ee-abfb-4cd14c1886dc/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 10' },
  { id: 11, src: '/api/public/media/images/b1ca2e5d-374c-4930-a5d3-1f0ac4cd77e3/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 11' },
  { id: 12, src: '/api/public/media/images/700a25fa-1a86-445b-9f36-21094d3dffa5/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 12' },
  { id: 13, src: '/api/public/media/images/8d026c77-4768-46a6-8f9b-4c10a5671760/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 13' },
  { id: 14, src: '/api/public/media/images/2304df44-6d42-4e43-95eb-a51861715c2a/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 14' },
  { id: 15, src: '/api/public/media/images/79ee61e4-69da-47d8-b969-550cb0a0ebee/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 15' },
  { id: 16, src: '/api/public/media/images/77994720-d401-493d-aa08-ae6e158b5ca8/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 16' },
  { id: 17, src: '/api/public/media/images/e9b65721-f969-4dfb-b603-e66a763f1688/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 17' },
  { id: 18, src: '/api/public/media/images/5d3f19fd-d904-46c8-a773-6eedf072e228/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 18' },
  { id: 19, src: '/api/public/media/images/403ed954-3f75-4945-9983-c22900838832/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 19' },
  { id: 20, src: '/api/public/media/images/ca17427a-c5a3-4b99-9cd9-5f8559725dfd/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 20' },
  { id: 21, src: '/api/public/media/images/39a6b298-c4b8-4fa5-a6ab-a4059c87e166/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 21' },
  { id: 22, src: '/api/public/media/images/786d28a0-499f-4561-b0c6-340342453ef8/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 22' },
  { id: 23, src: '/api/public/media/images/f30dcc03-9d18-4694-8cfe-f32c850d1495/file', alt: 'Özel Proje Perdeleri Ankara', title: 'Özel Proje Perde 23' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-kurumsal-urunler-ozel-proje-perdeleri'

const defaultHeroCopy = {
  breadcrumbLabel: "Özel Proje Perdeleri",
  eyebrow: "Kurumsal Çözümler",
  title: "Özel Proje",
  highlightedTitle: "Perdeleri",
  description: "Kurumsal projeleriniz için özel tasarım ve üretim hizmetleri. Profesyonel ekibimiz ile otel, hastane, ofis ve tüm kurumsal mekanlarınız için en uygun perde çözümlerini sunuyoruz.",
}

const productAdvantages = [
  'Kurumsal ihtiyaçlara özel tasarım ve üretim',
  'Profesyonel ekip ile proje danışmanlığı',
  'Toplu iş teslim garantisi ve zamanında teslimat',
  'Yüksek kalite standartlarında üretim',
  'Özel ölçü ve tasarımlar',
  'Kurumsal fiyat avantajları',
  'Montaj ve garanti sonrası servis',
  '3D görselleştirme ve proje sunumu',
  'Geniş kumaş ve renk seçenekleri',
  'Alev almaz ve yanmaz kumaş sertifikaları'
]

const usageAreas = [
  'Otel ve oteller',
  'Hastane ve sağlık tesisleri',
  'Ofis ve iş merkezleri',
  'Restoran ve cafe',
  'Eğitim kurumları',
  'Kamu binaları',
  'Kongre ve toplantı salonları',
  'AVM ve alışveriş merkezleri'
]

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
}

const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function ModernPerdePage() {
  const [galleryImages, setGalleryImages] = useState<ProductGalleryImage[]>(productImages)
  const [selectedImage, setSelectedImage] = useState<ProductGalleryImage>(productImages[0])
  const initialHeroCopy = parseProductGalleryHeroCopy(
    useCmsSectionJson(PRODUCT_GALLERY_PAGE_KEY, 'product.gallery'),
    defaultHeroCopy,
  )
  const [heroCopy, setHeroCopy] = useState(initialHeroCopy)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    getPublicProductGallery(PRODUCT_GALLERY_PAGE_KEY, productImages).then((images) => {
      if (isMounted && images.length > 0) {
        setGalleryImages(images)
        setSelectedImage(images[0])
      }
    })

    getPublicProductGalleryHeroCopy(PRODUCT_GALLERY_PAGE_KEY, defaultHeroCopy).then((copy) => {
      if (!isMounted) {
        return
      }

      setHeroCopy(copy)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const currentImageIndex = galleryImages.findIndex(img => img.id === selectedImage.id)

  const goToPrevious = () => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1
    setSelectedImage(galleryImages[prevIndex])
  }

  const goToNext = () => {
    const nextIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0
    setSelectedImage(galleryImages[nextIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      }
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          goToPrevious()
        }
        if (e.key === 'ArrowRight') {
          goToNext()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentImageIndex])

  return (
    <>
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      <main className="bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-8" />

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">{heroCopy.eyebrow}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6">
              {heroCopy.title}
              {heroCopy.highlightedTitle && (
                <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                  {heroCopy.highlightedTitle}
                </span>
              )}
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              {heroCopy.description}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <ProductGalleryHeading
            fallbackEyebrow="Ürün Galerisi"
            fallbackTitle="Özel Proje Perde Modelleri"
            className="text-center mb-16"
            eyebrowClassName="text-sm text-gray-500 uppercase tracking-[0.3em]"
            eyebrowTitleSpacingClassName="mb-4"
            titleClassName="text-3xl md:text-4xl font-extralight text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group"
              >
                <div
                  className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image)
                    setLightboxOpen(true)
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between">
                      <div></div>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 flex-shrink-0 ml-4">
                        <svg
                          className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300 group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">

            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10">
              <h2 className="text-xl font-light text-white mb-4 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Ürün Özellikleri
              </h2>

              <div className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Özel proje perdeleri, kurumsal mekanların ihtiyaçlarına özel olarak tasarlanan ve üretilen perde sistemleridir.
                  Otel, hastane, ofis, restoran ve diğer ticari alanlarda kullanılmak üzere profesyonel ekibimizle birlikte
                  her projeye özel çözümler sunuyoruz.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Kurumsal projelerinizde estetik ve fonksiyonelliği bir araya getiren perde sistemlerimiz, geniş kumaş ve renk seçenekleri
                  ile mekanınıza değer katarken, enerji verimliliği, ışık kontrolü ve gürültü azaltma gibi pratik faydalar da sağlar.
                  Alev almaz ve yanmaz sertifikalı kumaşlarımız ile güvenlik standartlarını karşılıyoruz.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Toplu iş garantisi ile zamanında teslimat sağlayan firmamız, montaj öncesi 3D görselleştirme hizmeti ile projenizi
                  hayata geçirmeden önce görmenizi sağlar. Motorlu, manuel veya zincirli sistemler arasından seçim yapabilir,
                  mekanınıza en uygun perde çözümünü profesyonel danışmanlarımızla birlikte belirleyebilirsiniz.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Kurumsal fiyat avantajları ve garanti sonrası servis desteğimizle projelerinizi ekonomik ve güvenilir bir şekilde
                  tamamlamanızı sağlıyoruz. Her ölçü ve tasarımda üretim yapabilme kapasitemiz sayesinde en karmaşık projelere bile
                  kolayca çözüm üretiyoruz.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Kurumsal', 'Otel', 'Hastane', 'Ofis', 'Restoran', 'Toplu İş', 'Sertifikalı', '3D Görselleştirme'].map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 backdrop-blur-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/20">
              <h3 className="text-xl font-light text-white mb-4 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Fiyat Bilgisi
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Özel proje perde fiyatları, proje büyüklüğü, kumaş seçimi ve sistem türüne göre değişiklik göstermektedir.
                Pile Perde, kurumsal fiyat avantajları ile büyük projelerde ekonomik çözümler sunar. Dikiş, montaj, garanti ve
                garanti sonrası servis hizmetlerimizle projelerinizi güvenle tamamlayabilirsiniz. Profesyonel ekibimiz, toplu iş
                garantisi ile zamanında teslimat sağlar.
              </p>

            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/20">
              <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Ürünün Avantajları
              </h3>

              <ul className="space-y-4">
                {productAdvantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 font-light">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/20">
              <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Kullanım Alanları
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Özel proje perdelerimiz, oteller, hastaneler, ofisler, restoranlar, eğitim kurumları ve diğer kurumsal mekanlar için
                özel olarak tasarlanmıştır. Her projenin kendine özgü ihtiyaçlarını göz önünde bulundurarak, estetik ve fonksiyonel
                çözümler sunuyoruz. Alev almaz sertifikalarımız ile güvenlik standartlarınızı karşılıyoruz.
              </p>

              <ul className="space-y-4">
                {usageAreas.map((area, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 font-light">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      <ProductContactCta />

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
          <motion.div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative h-[80vh] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </>
  )
}
