'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, getProductGalleryDefaultHeroCopy } from '@/lib/productGalleryContent'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-cati-kati-perde'

const defaultHeroCopy = getProductGalleryDefaultHeroCopy(PRODUCT_GALLERY_PAGE_KEY)

const productImages = [
  { id: 1, src: '/api/public/media/images/a45da14d-05a8-4732-9bdb-ccd38d587dda/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 1' },
  { id: 2, src: '/api/public/media/images/1dd0d174-fe4e-4753-bbe9-84914638fd7a/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 2' },
  { id: 3, src: '/api/public/media/images/4b177d76-2f73-4c45-9718-91bd8e5bced5/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 3' },
  { id: 4, src: '/api/public/media/images/04d28f56-e08c-4446-9b93-6eebdc1ee282/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 4' },
  { id: 5, src: '/api/public/media/images/f3569438-802d-4ad8-a9b2-2677bef96502/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 5' },
  { id: 6, src: '/api/public/media/images/3bd281c0-5c69-4b27-83fa-fc93726e6021/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 6' },
  { id: 7, src: '/api/public/media/images/4eff0c2f-f273-4594-b600-35de8521fee1/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 7' },
  { id: 8, src: '/api/public/media/images/9bfdadba-520b-43d8-8ccb-c9256523b8a9/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 8' },
  { id: 9, src: '/api/public/media/images/7b070f1f-0ab8-43b1-8e2c-00fa0b20f731/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 9' },
  { id: 10, src: '/api/public/media/images/81b54737-1d04-446f-98e4-5ba385e72b92/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 10' },
  { id: 11, src: '/api/public/media/images/1cb7bd52-c31a-4b82-841a-381240c82692/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 11' },
  { id: 12, src: '/api/public/media/images/c44112c2-4e76-4c02-8899-5cd9fcc5c444/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 12' },
  { id: 13, src: '/api/public/media/images/defa2db2-74cb-4f1c-9840-66af2f0770bf/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 13' },
  { id: 14, src: '/api/public/media/images/3abce1b1-daa4-43f5-90a7-ff8486d7a776/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 14' },
  { id: 15, src: '/api/public/media/images/c65a71ef-c918-4f11-b1db-08902d4554f6/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 15' },
  { id: 16, src: '/api/public/media/images/966a774b-d0fc-427a-943d-b75ed7fffdac/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 16' },
  { id: 17, src: '/api/public/media/images/246bc7eb-e112-4abc-a7e7-ca13a7570f89/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 17' },
  { id: 18, src: '/api/public/media/images/47d35d1b-0d11-4250-b535-b7c07421407b/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 18' },
  { id: 19, src: '/api/public/media/images/d58692c8-4c03-41ab-9117-82fa8806f6ab/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 19' },
  { id: 20, src: '/api/public/media/images/95cd0fc1-e002-46c3-b0ed-e093771fa033/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 20' },
  { id: 21, src: '/api/public/media/images/b1686e24-08bb-4d36-92d7-daa02a20b121/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 21' },
  { id: 22, src: '/api/public/media/images/9ffd8187-16ab-4962-a6e4-03be0361f1cd/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 22' },
  { id: 23, src: '/api/public/media/images/7c400aea-98b5-4594-be9d-df931f0adaa9/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 23' },
  { id: 24, src: '/api/public/media/images/7257efa8-b4a9-411d-a079-852219934d56/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 24' },
  { id: 25, src: '/api/public/media/images/bb943278-4462-4dd6-86d2-290de1c00e2a/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 25' },
  { id: 26, src: '/api/public/media/images/ea86db1c-a6ae-4547-aa80-a393dd280365/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 26' },
  { id: 27, src: '/api/public/media/images/669f3fd5-457c-4915-8b81-a5a052c25687/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 27' },
  { id: 28, src: '/api/public/media/images/2f32ed01-bc81-4c45-8f2a-d243d20d2d68/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 28' },
  { id: 29, src: '/api/public/media/images/edf4d046-b51b-4c29-82c4-5864b31ccf88/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 29' },
  { id: 30, src: '/api/public/media/images/09831c95-2f38-4160-8323-61b66ab3b358/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 30' },
  { id: 31, src: '/api/public/media/images/46de7e6b-63d6-47b5-a894-3e2f9454fe3b/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 31' },
  { id: 32, src: '/api/public/media/images/c89d6f15-87a1-4893-b255-ba20f46172e7/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 32' },
  { id: 33, src: '/api/public/media/images/b9cc663d-e367-4b0d-a53f-c2299d58d8f2/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 33' },
  { id: 34, src: '/api/public/media/images/c3093de0-d93f-4803-9f54-22b9c9af7c4d/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 34' },
  { id: 35, src: '/api/public/media/images/7910aa26-bd09-40de-a6cc-8042d18ec6e3/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 35' },
  { id: 36, src: '/api/public/media/images/205ba476-79d5-43a8-8e0e-a464453a9dd5/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 36' },
  { id: 37, src: '/api/public/media/images/60bd709c-1ca4-4ee3-98ba-549e3eee0cbc/file', alt: 'Çatı katı perde modelleri Ankara', title: 'Çatı Katı Perde 37' }
]

const productAdvantages = [
  'Üçgen ve eğimli pencerelere özel hareketli ve sabit perde çözümleri',
  'Tül, kumaş ve motorlu kontrol sistemleri ile çeşitli uygulama seçenekleri',
  'Plise perde ile tavana konumlu üçgen pencereler için mükemmel çözüm',
  'Geniş renk seçenekleri ve blackout (karartma) kumaş alternatifleri',
  'Profesyonel tasarım ekibi ile çatı katınıza özel renk ve kumaş paleti',
  'Işık ve oda ısısını düzenleyebilen konforlu perde sistemleri'
]

const usageAreas = [
  'Çatı katı evler',
  'Dubleks daireler',
  'Mansard pencereler',
  'Üçgen pencereler',
  'Eğimli pencereler',
  'Tavan pencereleri',
  'Galeri katlar',
  'Yüksek tavanlı mekanlar'
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
  const [heroCopy, setHeroCopy] = useState(defaultHeroCopy)
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
      <main className="bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Link href="/perde-modelleri" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Perde Modelleri
              </Link>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-sm text-gray-400">{heroCopy.breadcrumbLabel}</span>
            </div>

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
                  Çatı Katı Perdelerinde tül ve kumaş uygulanabileceği gibi motorlu kontrol sistemleri de bulunmaktadır.
                  Pencere yapınıza göre farklı perde sistemleri de uygulanabilir.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Tavana konumlu üçgen pencereler ya da farklı geometrik şekillere sahip pencereler için Plise Perde mükemmel
                  çözümlerden biridir. Geniş renk seçeneklerinin yanı sıra blackout (karartma) kumaşı seçenekleri de mevcuttur.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Pile Perde tasarım ekibimiz; desen, renk ya da malzeme türlerini göz önüne alarak çatı katınıza uygulanması
                  kararlaştırılan projeye göre uygun renk ve kumaş paleti oluşturarak, sizlerin beğenisine sunar.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Hem ışığı hem de oda ısısını rahatça düzenleyebileceğiniz perde sistemleri uygulanabilmektedir. Çatı katına
                  uygun perde sistemlerimiz ile doğal ışık ihtiyacını karşılayacak konforlu bir alan sağlanır.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Üçgen Pencere', 'Plise Perde', 'Motorlu', 'Tül & Kumaş', 'Blackout', 'Eğimli', 'Mansard', 'Konforlu'].map((feature) => (
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
                Çatı Katı Perde fiyatları, ürün cinsine ve türüne göre değişiklik göstermektedir. Pile Perde, rekabetçi
                fiyatları ile projelerinizi sorunsuz şekilde tamamlamanızı sağlar. Detaylı bilgi ve ücretsiz keşif için
                bizimle iletişime geçebilirsiniz.
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
                  href="https://wa.me/905325034424"
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
              Çatı Katı Perde Modelleri
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
                Çatı katı perde sistemlerimizi aşağıdaki alanlarda kullanarak mekanlarınıza konforlu ve estetik bir çözüm
                sunuyoruz. Her bir pencere tipi için özel tasarım ve profesyonel uygulama desteği sağlıyoruz.
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
              Çatı Katı Perde Modelleri Hakkında Sorularınız mı var?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
              Dilerseniz hemen <strong>0312 241 72 72</strong> no&apos;lu telefondan bize ulaşarak ihtiyacınıza
              uygun çatı katı perde modelleri hakkında bilgi alabilir ve ücretsiz keşif randevusu oluşturabilirsiniz.
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
                href="https://wa.me/905325034424"
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
