'use client'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, getProductGalleryDefaultHeroCopy } from '@/lib/productGalleryContent'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-kis-bahcesi-perde'

const defaultHeroCopy = getProductGalleryDefaultHeroCopy(PRODUCT_GALLERY_PAGE_KEY)

const canonicalUrl = 'https://pileperde.com.tr/model-perdeler/kis-bahcesi-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
  { name: 'Kış Bahçesi Perde', url: '/model-perdeler/kis-bahcesi-perde' },
]

const productImages = [
  { id: 1, src: '/api/public/media/images/3f3e07b0-8d36-4b49-8b21-1f0f4d439d90/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 1' },
  { id: 2, src: '/api/public/media/images/cb5b6464-4146-4c7b-b51b-297c61797eb5/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 2' },
  { id: 3, src: '/api/public/media/images/f5be5a98-64e1-49d6-9caa-6a81ca502b64/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 3' },
  { id: 4, src: '/api/public/media/images/529c71b0-e8d5-4cbd-994e-18eeb7003996/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 4' },
  { id: 5, src: '/api/public/media/images/4c8466b3-4ac4-41c3-8a29-3ee2aed2d3bc/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 5' },
  { id: 6, src: '/api/public/media/images/21d2b0f9-f387-4235-841d-01e1dddbd5a6/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 6' },
  { id: 7, src: '/api/public/media/images/f20cc210-4187-4895-a954-6077cdab31ad/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 7' },
  { id: 8, src: '/api/public/media/images/2bb6f60a-03b1-4b30-80ac-a73a57d3dae3/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 8' },
  { id: 9, src: '/api/public/media/images/35fd96d5-9a31-438c-8bc2-653e1f5dca04/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 9' },
  { id: 10, src: '/api/public/media/images/5a452dc7-d4e7-459f-b8c4-dcbd686909f3/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 10' },
  { id: 11, src: '/api/public/media/images/09436260-de8e-47be-b409-a602e6e853c0/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 11' },
  { id: 12, src: '/api/public/media/images/9861df34-a2fd-418e-a5b2-8be7103491f2/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 12' },
  { id: 13, src: '/api/public/media/images/3c868179-f31f-41a3-8448-20bb14b5256c/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 13' },
  { id: 14, src: '/api/public/media/images/47e28c07-5695-477f-962c-2651b2a73490/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 14' },
  { id: 15, src: '/api/public/media/images/5ba73b96-3a9b-40e9-a1cc-4f953861f665/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 15' },
  { id: 16, src: '/api/public/media/images/79ef8a16-9987-4690-894e-26ee2e9bf568/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 16' },
  { id: 17, src: '/api/public/media/images/0e3a7aca-6d01-4b41-a5a8-3b7a5f914cbc/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 17' },
  { id: 18, src: '/api/public/media/images/4a2a2725-72ee-47db-ad0f-f15e09aa1b33/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 18' },
  { id: 19, src: '/api/public/media/images/37f44ec5-d99b-47ad-a49e-855cb85fdbd3/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 19' },
  { id: 20, src: '/api/public/media/images/19f8f50e-e591-43e9-937b-9e64ab8955d6/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 20' },
  { id: 21, src: '/api/public/media/images/cde4d597-e2f7-472f-b1c9-6421f6ace664/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 21' },
  { id: 22, src: '/api/public/media/images/008bcdae-45b5-4d93-a95b-a7b1ade72265/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 22' },
  { id: 23, src: '/api/public/media/images/50e5ee9f-9dd9-47b6-b3a8-ed56a51fc6dd/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 23' },
  { id: 24, src: '/api/public/media/images/8853bdbc-1231-4989-9da5-91d7a1c8ab68/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 24' },
  { id: 25, src: '/api/public/media/images/be83a1a9-c799-42ec-8ba6-41feecc35389/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 25' },
  { id: 26, src: '/api/public/media/images/0b72f341-3192-4033-8572-3fea12b5a505/file', alt: 'Kış Bahçesi Perde modelleri Ankara', title: 'Kış Bahçesi Perde 26' }
]

const productAdvantages = [
  'Motorlu, zincirli ve manuel uygulamalı perde sistemleri',
  'Yuvarlak, oval, çokgen gibi asimetrik alanlara uyumlu',
  'Ortam sıcaklığında denge ve enerji korunumu sağlar',
  'Mobilyaları güneşin zararlı etkilerinden korur',
  'Plise perde ve sun screen stor sistemleri',
  'Her açıya ve eğime uygulanabilme özelliği',
  'Çift renk seçenekleri ile fonksiyonellik',
  'Kolay sökülüp takılabilen, temizlenebilen yapı',
  'Alev almaz ve kir tutmaz kumaş seçenekleri',
  'Blackout (karartma) ve alev almaz kumaşlar'
]

const usageAreas = [
  'Kış bahçeleri (Winter Garden)',
  'Çatı katı mekanlar',
  'Otel lobileri ve balo salonları',
  'Nikah ve düğün salonları',
  'Restoran ve kafeler',
  'Ofis mekanları',
  'Teras ve balkonlar',
  'Cam tavanlı mekanlar'
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
  const [galleryImages, setGalleryImages] = useState(productImages)
  const [selectedImage, setSelectedImage] = useState(productImages[0])
  const initialHeroCopy = parseProductGalleryHeroCopy(
    useCmsSectionJson(PRODUCT_GALLERY_PAGE_KEY, 'product.gallery'),
    defaultHeroCopy,
  )
  const [heroCopy, setHeroCopy] = useState(initialHeroCopy)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const currentImageIndex = galleryImages.findIndex(img => img.id === selectedImage.id)

  useEffect(() => {
    let mounted = true

    getPublicProductGallery(PRODUCT_GALLERY_PAGE_KEY, productImages).then((images) => {
      if (!mounted) {
        return
      }

      setGalleryImages(images)
      setSelectedImage((current) => images.find((image) => image.id === current.id) || images[0] || current)
    })

    getPublicProductGalleryHeroCopy(PRODUCT_GALLERY_PAGE_KEY, defaultHeroCopy).then((copy) => {
      if (!mounted) {
        return
      }

      setHeroCopy(copy)
    })

    return () => {
      mounted = false
    }
  }, [])

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
              <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                {heroCopy.highlightedTitle}
              </span>
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              {heroCopy.description}
            </p>
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
                  Kış bahçeleri tavan ve yan yüzeylerinin asimetrik yapısından dolayı yuvarlak, oval, çokgen gibi alanlarda motorlu,
                  zincirli ve manuel uygulamalı perde sistemleri ile uyumlu olarak çalıştırılmaktadır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Ortam sıcaklığında denge ve enerji korunumu sağlamak ve iç mekan mobilyalarını güneşin zararlı etkilerinden sakınmakta
                  etkilidir. Aynı zamanda mekan dekoruna renk ve estetik katarlar. Genellikle motorlu sistemler (somfy motorlar) tercih edilir
                  ve uzaktan kumanda vasıtasıyla kontrol edilirler.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Plise perde ve sun screen stor perde sistemlerimiz de her koşulda iyi sonuç veren modern sistemlerimizdendir. Bu perdeler,
                  her açıya ve eğime uygulanabilme özelliği ile öne çıkar.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Çift renk olarak da düşünülebilecek kış bahçesi perde modellerimiz, bulunduğu ortamın havasını değiştirir ve fonksiyonellik
                  katarak kış bahçenizden tam faydalanabileceğiniz işlevsel bir hale getirir. İlk montajdan sonra sökülmek istendiğinde geçmeli
                  ayakları sayesinde kolayca sökülerek temizliği yapılabilen perde modellerimiz, güneş ısısına karşı üstün koruma sağlar.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Motorlu', 'Zincirli', 'Manuel', 'Plise', 'Sun Screen', 'Blackout', 'Alev Almaz', 'Somfy Motor'].map((feature) => (
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
                Kış bahçesi perde fiyatları, ürün cinsine ve türüne göre değişiklik göstermektedir. Pile Perde, rekabetçi fiyatları
                ile projelerinizi sorunsuz şekilde tamamlamanızı sağlar. Dikiş, montaj, garanti ve garanti sonrası servis alabilirsiniz.
                Profesyonel tasarım ekibimiz size daima en iyi çözümleri sunar.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="tel:+903122417272"
                  className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-black overflow-hidden transition-all duration-300 hover:gap-3 rounded-lg text-sm"
                >
                  <span className="relative z-10 font-medium">Hemen Arayın</span>
                  <svg className="relative z-10 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>

                <Link
                href="https://wa.me/905335127272"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white hover:bg-[#20BA5A] transition-all duration-300 rounded-lg text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="font-medium">WhatsApp</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Ürün Galerisi</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">
              Kış Bahçesi Perde Modelleri
            </h2>
          </div>

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
                Yalancı katlamalı perde; katlamalı perdelerin bir başka modeli de yalan katlamalı perdelerdir. Bu perdelerde tül ile 
                dikim yer almaz. Ayrıca satılır ve bunun yanında kornişe bağlı olan katlamalı perde özelliği taşır. Kış Bahçesi Perdelere 
                benziyor olsa da bu perde modelleri içerik olarak katlamalı perde değildir.
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

      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-extralight text-white mb-4">
              Kış Bahçesi Perde Modelleri Hakkında Sorularınız mı var?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
              Dilerseniz hemen <strong>0312 241 72 72</strong> no&apos;lu telefondan bize ulaşarak ihtiyacınıza
              uygun rustik perde modelleri hakkında bilgi alabilir ve sipariş verebilirsiniz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="tel:+903122417272"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300 hover:gap-4 rounded-xl"
              >
                <span className="relative z-10 font-medium">0312 241 72 72</span>
                <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
              <Link
                  href="https://wa.me/905335127272"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white hover:bg-[#20BA5A] transition-all duration-300 rounded-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="font-medium">WhatsApp ile İletişim</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
