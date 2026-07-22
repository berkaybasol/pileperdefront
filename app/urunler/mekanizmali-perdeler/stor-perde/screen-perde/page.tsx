'use client'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import Link from 'next/link'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde/screen-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Stor Perde', url: '/urunler/mekanizmali-perdeler/stor-perde' },
  { name: 'Screen Perde', url: '/urunler/mekanizmali-perdeler/stor-perde/screen-perde' },
]
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/dc2a2786-1a14-4a03-9fff-e2ffc5820b46/file', alt: 'Screen perde modelleri', title: 'Screen Perde Modelleri' },
  { id: 2, src: '/api/public/media/images/2aebd723-c0a1-41d9-b5fc-c75834f1b8e1/file', alt: 'Stor perde Ankara', title: 'Stor Perde Ankara' },
  { id: 3, src: '/api/public/media/images/5370da64-6be5-4c5c-bbb8-bf8e430fe92c/file', alt: 'Desenli screen perde', title: 'Desenli Screen Perde' },
  { id: 4, src: '/api/public/media/images/bcc54456-ca7f-492e-abd2-e341c3089ebd/file', alt: 'Beyaz screen perde', title: 'Beyaz Screen Perde' },
  { id: 5, src: '/api/public/media/images/cedf065c-45cb-4cf9-89d8-be61cee4dd36/file', alt: 'Beyaz sun screen perde', title: 'Beyaz Sun Screen Perde' },
  { id: 6, src: '/api/public/media/images/5aa3b91f-8ba8-44db-87b0-cc482a84a05e/file', alt: 'Pile perde Ankara', title: 'Pile Perde Ankara' },
  { id: 7, src: '/api/public/media/images/86785b24-4a64-499d-bfc3-196857bb3f4b/file', alt: 'Salon stor tül fon', title: 'Salon Stor Tül Fon' },
  { id: 8, src: '/api/public/media/images/73fdce4f-2655-4e0d-ae06-51f054baddf6/file', alt: 'Modern screen perde', title: 'Modern Screen Perde' },
  { id: 9, src: '/api/public/media/images/db42a9bc-d2af-4f9f-9817-5341dea584be/file', alt: 'Makam odası perde', title: 'Makam Odası Perde' },
  { id: 10, src: '/api/public/media/images/13351f44-0cb6-44b0-84b9-20eca03ddadb/file', alt: 'Büro stor perde', title: 'Büro Stor Perde' },
  { id: 11, src: '/api/public/media/images/09fe73b0-65ab-4bbb-a8dc-2537c3c9e569/file', alt: 'Büro perde Ankara', title: 'Büro Perde Ankara' },
  { id: 12, src: '/api/public/media/images/6c50ccce-91e9-40f9-b0b4-805b3bb47834/file', alt: 'Ofis screen perde', title: 'Ofis Screen Perde' },
  { id: 13, src: '/api/public/media/images/eda90fa2-f352-4259-920d-a0a172333fd6/file', alt: 'Screen perde desenleri', title: 'Screen Perde Desenleri' },
  { id: 14, src: '/api/public/media/images/211bd722-fd8a-48f9-bbf7-fd31b5dffa15/file', alt: 'Mutfak screen stor', title: 'Mutfak Screen Stor' },
  { id: 15, src: '/api/public/media/images/8527a0c5-56ae-4f9a-8547-554ae1ad983a/file', alt: 'Duble stor perde', title: 'Duble Stor Perde' },
  { id: 16, src: '/api/public/media/images/d4bae03f-0f48-4ab9-855f-042825ceb61b/file', alt: 'Çift mekanizmalı stor', title: 'Çift Mekanizmalı Stor' },
  { id: 17, src: '/api/public/media/images/cb5d0f0c-d8a2-4c7e-a3ec-1926db9d2c44/file', alt: 'Büro perdeleri', title: 'Büro Perdeleri' },
  { id: 18, src: '/api/public/media/images/1539bb07-4fa0-4cae-b7d1-91d5ec848db9/file', alt: 'Sun screen stor perde', title: 'Sun Screen Stor Perde' },
  { id: 19, src: '/api/public/media/images/7be61591-d8a0-422e-b07a-5c04f4735ed2/file', alt: 'Kahve screen stor perde', title: 'Kahve Screen Stor Perde' },
  { id: 20, src: '/api/public/media/images/6e7b63fb-7f0e-438c-bb47-c8b67e96d436/file', alt: 'Screen perde', title: 'Screen Perde' },
  { id: 21, src: '/api/public/media/images/08fd204d-0a47-4180-9e4b-6e8f419efd91/file', alt: 'Krem screen stor perde', title: 'Krem Screen Stor Perde' },
  { id: 22, src: '/api/public/media/images/76ff9c36-1e89-4faf-a7dc-5fc7f6264e33/file', alt: 'Krem sun screen stor perde', title: 'Krem Sun Screen Stor Perde' },
  { id: 23, src: '/api/public/media/images/43f40c7d-723e-4d22-8d36-d547d4a13039/file', alt: 'Screen stor perde ofis', title: 'Screen Stor Perde Ofis' },
  { id: 24, src: '/api/public/media/images/d0de17e0-5f61-449d-98bc-80cad6465a3a/file', alt: 'Gri screen stor', title: 'Gri Screen Stor' },
  { id: 25, src: '/api/public/media/images/473932ea-48a5-4bc5-b68b-dcb439b21985/file', alt: 'Gri screen stor perde', title: 'Gri Screen Stor Perde' },
  { id: 26, src: '/api/public/media/images/8752157d-221d-4a54-bd89-842c6d7fd7dd/file', alt: 'Screen stor perde', title: 'Screen Stor Perde' },
  { id: 27, src: '/api/public/media/images/85f280c7-9d52-4ce4-873c-76655a0fb47e/file', alt: 'Sun screen perde Ankara', title: 'Sun Screen Perde Ankara' },
  { id: 28, src: '/api/public/media/images/cdd99362-2f2e-4bf3-836e-16a2c5347e50/file', alt: 'Gri screen stor model', title: 'Gri Screen Stor Model' },
  { id: 29, src: '/api/public/media/images/592e43d7-6620-47a6-89dc-4cd2398e155f/file', alt: 'Krem sun screen perde', title: 'Krem Sun Screen Perde' },
  { id: 30, src: '/api/public/media/images/694c8435-99b8-471e-988f-229ee5e482db/file', alt: 'Sun screen sayfa resmi', title: 'Sun Screen Sayfa Resmi' },
  { id: 31, src: '/api/public/media/images/b05682a3-894b-48d1-9c2e-6426e9ff0193/file', alt: 'Beyaz sun screen perde model', title: 'Beyaz Sun Screen Perde Model' },
  { id: 32, src: '/api/public/media/images/2a599b6c-553c-43a8-91dc-7bb5ddcc3893/file', alt: 'Sun screen perde görsel', title: 'Sun Screen Perde Görsel' },
  { id: 33, src: '/api/public/media/images/faedbbd7-df68-446e-ac8c-29b3b15e7c75/file', alt: 'PES screen perde', title: 'PES Screen Perde' },
  { id: 34, src: '/api/public/media/images/6e5c0949-ce5c-4c80-a59c-7ab427f6a7d6/file', alt: 'Screen perde detay', title: 'Screen Perde Detay' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-stor-perde-screen-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Screen Perde",
  eyebrow: "Stor Perde Koleksiyonu",
  title: "Screen",
  highlightedTitle: "Perde",
  description: "Sun Screen Stor Perde iki farklı kumaş türünden üretilmektedir. Birinci kumaş türü cam elyaf üzerine PVC kaplamadır. İkinci kumaş türü ise PES screen stor perdedir ve Polyester kumaşlardan üretilir.",
}

const productAdvantages = [
  'Screen kumaşlar ince file şeklinde dokunmuş cam elyafı üzerine PVC kaplamadır',
  'Perdeniz kapalıyken bile güneş ışığını yeterince alma avantajı ve dışarıyı rahat görebilme olanağı sağlar',
  'Cam elyafı sayesinde ısı yalıtımı sağlar',
  'Kumaş tüm iklim değişikliklerine uygundur, ısı ve rutubete dayanıklıdır',
  'Kumaş dış etkenlere karşı asla bozmaz ve renginde herhangi bir solma yapmaz',
  'Parlak yüzeylerin yansımasını ve göz kamaşmasını önler',
  'Temizliği çok kolaydır, kir ve koku tutmaz',
  'Alev almaz ve anti bakteriyeldir',
  '36 ay garantilidir'
]

const usageAreas = [
  'Evinizin tüm mekanları',
  'Kış bahçeleri',
  'Makam odaları',
  'Ofisler',
  'Oteller',
  'Hastaneler',
  'Restoran ve Kafeler',
  'Resmi kurumlar'
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

export default function ScreenPerdePage() {
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
  
  // Lightbox navigation functions
  const currentImageIndex = galleryImages.findIndex(img => img.id === selectedImage.id)

  const goToPrevious = () => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1
    setSelectedImage(galleryImages[prevIndex])
  }

  const goToNext = () => {
    const nextIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0
    setSelectedImage(galleryImages[nextIndex])
  }

  // ESC tuşu ile modal kapatma + arrow keys ile navigasyon
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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Hero Section */}
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

      {/* Compact Product Info Section */}
      <section className="relative py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Product Info Card - Dark Glassmorphism */}
            <div
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10">
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
                  Screen kumaşlar, ince file şeklinde dokunmuştur. Tül ve kumaş arasında ışık geçirgenliği son derece başarılı
                  gölgeleme yapan stor perde kumaşlarındandır. Ayrıca, özel üretim türleri vardır. Aşırı derecede güneş alan
                  mekanlar için kumaşın arka kısmı alüminyum kaplama olan serileri, dışarıdan içeri gelen güneş ısısını dışarı
                  iletir bu sayede mekanda ısı kontrolü yapılır ve enerji tasarrufu sağlanır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Sun Screen kumaşlardan farkı ise dışarıdan gelen ışık miktarını daha az iletirler. Buna karşılık daha fazla
                  renk seçenekleri mevcuttur. Ortamda bulunan elektronik eşyalar, tekstil ürünleri ve bizlerin UV ışınlarından
                  gördüğü zararları %100&apos;e yakın yok eder.
                </p>
              </div>

              {/* Features Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['Sun Screen', 'PES Screen', 'UV Korumalı', 'NFPA 701 Sertifikalı', 'Motorlu Sistem', '36 Ay Garanti'].map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 backdrop-blur-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing Card - Dark Glassmorphism */}
            <div
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/20">
              <h3 className="text-xl font-light text-white mb-4 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Fiyat Bilgisi
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Sun Screen, Pes Screen stor perde fiyatları ürün cinsine ve türüne göre değişiklik göstermektedir.
                Pile Perde rekabetçi fiyatları ile projelerinizi sorunsuz şekilde tamamlamanızı sağlar.
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

      {/* YouTube Video Section - Motorlu Screen Perde */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div
            className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Video Anlatım</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">
                Motorlu Screen Perde
              </h2>
              <p className="text-gray-400 font-light max-w-2xl mx-auto">
                Stor perdelerde tercih edilen motorlu mekanizmalar nasıl çalışır?
              </p>
            </div>

            {/* YouTube Video Embed */}
            <div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10"
              style={{ paddingBottom: '56.25%' }} // 16:9 Aspect Ratio}}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/W8rh9V6R7Cw"
                title="Motorlu Screen Perde"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full Product Gallery - Dark Glassmorphism Grid */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Ürün Galerisi</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">
              Screen Perde Modelleri
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group">
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

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        {/* Title hidden for UI but kept for SEO */}
                      </div>
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

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Features - Dark Glassmorphism Cards */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Advantages Card */}
            <div
              className="p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/20">
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

            {/* Usage Areas Card */}
            <div
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/20">
              <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Kullanım Alanları
              </h3>

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

      {/* Contact CTA */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div
          >
            <h3 className="text-2xl md:text-3xl font-extralight text-white mb-4">
              Screen Perde Hakkında Sorularınız mı var?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
              Dilerseniz hemen <strong>0312 241 72 72</strong> no&apos;lu telefondan bize ulaşarak uygulamak istediğiniz
              alanın ölçülerini bizimle paylaşabilir ve fiyat konusunda bilgi talep edebilirsiniz.
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
            exit={{ opacity: 0 }}
          >
          <motion.div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
            exit={{ opacity: 0, scale: 0.95 }}
          >
              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
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

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <div className="flex items-center justify-between">
                  {/* Title hidden for UI but kept for SEO */}
                  <span className="text-sm text-gray-400">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      </main>
    </>
  )
}
