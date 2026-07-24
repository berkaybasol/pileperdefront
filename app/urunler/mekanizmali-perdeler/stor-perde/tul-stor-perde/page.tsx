'use client'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import Link from 'next/link'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Stor Perde', url: '/urunler/mekanizmali-perdeler/stor-perde' },
  { name: 'Tül Stor Perde', url: '/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde' },
]
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/f7e4e8a9-159e-40ab-a96d-11c0ffbc9119/file', alt: 'Çalışma odası perde', title: 'Çalışma Odası Perde' },
  { id: 2, src: '/api/public/media/images/323dc45f-74b1-4318-ad3b-a3a30878134d/file', alt: 'Tül stor perde', title: 'Tül Stor Perde' },
  { id: 3, src: '/api/public/media/images/1a9d54d5-4aeb-49a7-babc-5a711ee4cafb/file', alt: 'Kanepe tül stor', title: 'Kanepe Tül Stor' },
  { id: 4, src: '/api/public/media/images/d01bdd17-10bd-4fa3-bd05-af2c5df8eb80/file', alt: 'Salon tül stor', title: 'Salon Tül Stor' },
  { id: 5, src: '/api/public/media/images/6561542d-a695-4a7e-8ea1-660fd6b81a32/file', alt: 'Tül stor yakın', title: 'Tül Stor Yakın' },
  { id: 6, src: '/api/public/media/images/636d9dac-10bc-4cca-abf9-8dd1a1dada82/file', alt: 'Beyaz tül stor', title: 'Beyaz Tül Stor' },
  { id: 7, src: '/api/public/media/images/1ca7a7a2-92b0-44a2-a554-36e5386ba501/file', alt: 'Tül stor yemek odası', title: 'Tül Stor Yemek Odası' },
  { id: 8, src: '/api/public/media/images/57a3356a-436c-41e9-90d7-0ab49d31ac06/file', alt: 'Mutfak tül stor', title: 'Mutfak Tül Stor' },
  { id: 9, src: '/api/public/media/images/e3e4578b-d5cf-489d-b1cc-54fb6b481e7b/file', alt: 'Kumandalı ofis perde', title: 'Kumandalı Ofis Perde' },
  { id: 10, src: '/api/public/media/images/d284e146-e14c-4fc8-a3ff-9aa4063c5f52/file', alt: 'Motorlu perde', title: 'Motorlu Perde' },
  { id: 11, src: '/api/public/media/images/9ee28e4c-1d94-4c76-8c56-40b32119ca4a/file', alt: 'Ofis gri tül stor perde', title: 'Ofis Gri Tül Stor Perde' },
  { id: 12, src: '/api/public/media/images/33629c79-b72c-4a2e-9012-3c28a6a67d50/file', alt: 'Ofis perde', title: 'Ofis Perde' },
  { id: 13, src: '/api/public/media/images/baea04eb-f875-488b-afb9-71be481424a4/file', alt: 'Ofis perdesi', title: 'Ofis Perdesi' },
  { id: 14, src: '/api/public/media/images/858dcd5a-40d7-4168-9bfc-e985035fd213/file', alt: 'Ofis tül stor perde', title: 'Ofis Tül Stor Perde' },
  { id: 15, src: '/api/public/media/images/d3d2d8fd-b2f6-4840-a77c-ab02c2eca464/file', alt: 'Tül stor perde görsel', title: 'Tül Stor Perde Görsel' },
  { id: 16, src: '/api/public/media/images/1f7582c8-26df-48c2-bf4b-1b47212872ef/file', alt: 'Tül stor model', title: 'Tül Stor Model' },
  { id: 17, src: '/api/public/media/images/d835676c-9b4f-47c7-acdd-b3cc0ce5c2d7/file', alt: 'Siyah tül stor', title: 'Siyah Tül Stor' },
  { id: 18, src: '/api/public/media/images/6a6e59f8-cc2e-4f77-b1fa-a093f8b223d7/file', alt: 'Tekli tül stor perde Çayyolu', title: 'Tekli Tül Stor Perde Çayyolu' },
  { id: 19, src: '/api/public/media/images/85360f67-d05f-43d3-abce-e283e031f62d/file', alt: 'Tekli tül stor perde', title: 'Tekli Tül Stor Perde' },
  { id: 20, src: '/api/public/media/images/63980241-d76f-460d-8d6b-23e3b4ca7c01/file', alt: 'Tül stor Ankara', title: 'Tül Stor Ankara' },
  { id: 21, src: '/api/public/media/images/be317b2c-063c-46b5-b1a2-9755ceb8151d/file', alt: 'Tül stor perde kasetli', title: 'Tül Stor Perde Kasetli' },
  { id: 22, src: '/api/public/media/images/bfa4cb33-ebcb-47b2-9b5a-d885f71f116a/file', alt: 'Tül stor perde modeli', title: 'Tül Stor Perde Modeli' },
  { id: 23, src: '/api/public/media/images/46ea2021-09e3-4934-bf02-1bd8f6c221c4/file', alt: 'Tül stor perdeler', title: 'Tül Stor Perdeler' },
  { id: 24, src: '/api/public/media/images/403baa1b-69d4-4453-82d8-11c6ca7841aa/file', alt: 'Tül stor perde İncek', title: 'Tül Stor Perde İncek' },
  { id: 25, src: '/api/public/media/images/3ea7a2b0-f44a-4ca1-b5bf-02d13baba858/file', alt: 'Modern tül stor', title: 'Modern Tül Stor' },
  { id: 26, src: '/api/public/media/images/29993d43-2383-4c52-8cd4-f9826a9619ec/file', alt: 'Ev tül stor perde', title: 'Ev Tül Stor Perde' },
  { id: 27, src: '/api/public/media/images/3f61949a-5685-4eb5-b7e7-4840b017c268/file', alt: 'Tül stor perde sistemi', title: 'Tül Stor Perde Sistemi' },
  { id: 28, src: '/api/public/media/images/555e1e4a-2402-473d-9a30-bb118aa758de/file', alt: 'Tül stor perde detay', title: 'Tül Stor Perde Detay' },
  { id: 29, src: '/api/public/media/images/aeccb26a-f573-49ce-a946-432cb9eb42d1/file', alt: 'Transparan tül stor', title: 'Transparan Tül Stor' },
  { id: 30, src: '/api/public/media/images/e3ff3f5c-4ec2-470b-ac51-1e6c523f7e12/file', alt: 'Tül stor perde motorlu', title: 'Tül Stor Perde Motorlu' },
  { id: 31, src: '/api/public/media/images/617f8cde-6dd3-4371-b288-d750017f9b36/file', alt: 'Zarif tül stor perde', title: 'Zarif Tül Stor Perde' },
  { id: 32, src: '/api/public/media/images/6244428e-cc0d-49d6-a1a0-f90a0bf13a8b/file', alt: 'İkili tül stor perde', title: 'İkili Tül Stor Perde' },
  { id: 33, src: '/api/public/media/images/e24a94df-66b8-4d62-ad81-54107dfaaf55/file', alt: 'Mutfak tül stor perde', title: 'Mutfak Tül Stor Perde' },
  { id: 34, src: '/api/public/media/images/1755b92f-2a9f-4bc9-ab0f-d6ef40941b40/file', alt: 'Siyah tül stor perde', title: 'Siyah Tül Stor Perde' },
  { id: 35, src: '/api/public/media/images/5b725082-a2cd-4491-9bf1-6ed412bbafa0/file', alt: 'Kumandalı ofis perde sistemi', title: 'Kumandalı Ofis Perde Sistemi' },
  { id: 36, src: '/api/public/media/images/e9982ea8-c68e-4994-8314-645185a3adf6/file', alt: 'Motorlu perde sistemi', title: 'Motorlu Perde Sistemi' },
  { id: 37, src: '/api/public/media/images/8878f92b-415a-4b6f-891e-447175b4cb25/file', alt: 'Ofis gri tül stor', title: 'Ofis Gri Tül Stor' },
  { id: 38, src: '/api/public/media/images/a89c2311-94ef-42e2-ac1c-774a5e05dcc8/file', alt: 'Ofis perde modeli', title: 'Ofis Perde Modeli' },
  { id: 39, src: '/api/public/media/images/2f52fb99-551c-41a2-86b2-eedf6bca47a9/file', alt: 'Ofis perdesi model', title: 'Ofis Perdesi Model' },
  { id: 40, src: '/api/public/media/images/04d45119-35ba-422f-87fe-7f288356351e/file', alt: 'Ofis tül stor', title: 'Ofis Tül Stor' },
  { id: 41, src: '/api/public/media/images/3e65be10-7400-4de3-87c3-52f44229c3d4/file', alt: 'Tül stor perde uygulaması', title: 'Tül Stor Perde Uygulaması' },
  { id: 42, src: '/api/public/media/images/97e3928f-3142-4f6b-9033-c7b7d5ddd361/file', alt: 'Tül stor perde kasetli sistem', title: 'Tül Stor Perde Kasetli Sistem' },
  { id: 43, src: '/api/public/media/images/bb357b48-9e92-4774-9ce5-dde4e91f648c/file', alt: 'Çalışma oda stor perde', title: 'Çalışma Oda Stor Perde' },
  { id: 44, src: '/api/public/media/images/4b2c8ef3-6f1e-4e3b-ade7-8b5d6a126642/file', alt: 'Çalışma odası perde modeli', title: 'Çalışma Odası Perde Modeli' },
  { id: 45, src: '/api/public/media/images/fd900bd5-b60a-41e9-800c-f1de8117a724/file', alt: 'Krem tül stor perde', title: 'Krem Tül Stor Perde' },
  { id: 46, src: '/api/public/media/images/6354c397-ac85-4124-b915-f9596fba26e8/file', alt: 'Krem tül stor', title: 'Krem Tül Stor' },
  { id: 47, src: '/api/public/media/images/ba19f384-77b6-4b8f-9070-24f70844051f/file', alt: 'İkili tül stor', title: 'İkili Tül Stor' },
  { id: 48, src: '/api/public/media/images/72030cec-bcbd-4c43-a028-8ad9267e9f44/file', alt: 'Tül stor kasetli', title: 'Tül Stor Kasetli' },
  { id: 49, src: '/api/public/media/images/fe2d6ee9-6bd0-4cb2-8295-fbaefaee9867/file', alt: 'Şık tül stor perde', title: 'Şık Tül Stor Perde' },
  { id: 50, src: '/api/public/media/images/0dde938f-4dd0-4896-a5ae-9b34eba797e1/file', alt: 'Dekoratif tül stor', title: 'Dekoratif Tül Stor' },
  { id: 51, src: '/api/public/media/images/82a046bb-eab8-422a-84b5-c7fb6231f6d4/file', alt: 'İnce tül stor perde', title: 'İnce Tül Stor Perde' },
  { id: 52, src: '/api/public/media/images/844fa8b1-1cc0-4a72-a455-7012a8bc408d/file', alt: 'Şeffaf tül stor', title: 'Şeffaf Tül Stor' },
  { id: 53, src: '/api/public/media/images/77e8cd21-800e-475c-b21a-a325d51f3bb5/file', alt: 'Tül stor perde Ankara', title: 'Tül Stor Perde Ankara' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-stor-perde-tul-stor-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Tül Stor Perde",
  eyebrow: "Stor Perde Koleksiyonu",
  title: "Tül Stor",
  highlightedTitle: "Perde",
  description: "Tül Stor Perdeler, Pile Perde garantisiyle kanserojen madde içermeyen 1.sınıf kumaş ve malzemelerden üretilmektedir. Tül Stor Perde, transparan yapısıyla iç mekanlarınızda rahatça kullanabileceğiniz bir stor perde türüdür.",
}

const productAdvantages = [
  'Tül Stor, ince transparan şeklinde dokunmuştur. Perdeniz kapalıyken bile güneş ışığını yeterince alma avantajı ve dışarıyı rahat görebilme olanağı sağlar',
  'İç mekan içinde iklim değişikliklerine uygundur, ısı ve rutubete dayanıklıdır',
  'Parlak yüzeylerin yansımasını ve göz kamaşmasını önler',
  'Temizliği çok kolaydır, kir ve koku tutmaz',
  'Anti bakteriyeldir',
  '36 ay garantilidir'
]

const usageAreas = [
  'Evinizin tüm mekanları',
  'Kış bahçeleri',
  'Makam odaları',
  'Ofisler',
  'Oteller',
  'Hastaneler',
  'Okullar'
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

export default function TulStorPerdePage() {
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
      <ProductNavigationPilot>

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
                  Diğer stor perde modellerinin aksine, şeffaf ve transparan yapıya sahip tül stor perde, kapalı konumdayken
                  dışarıya rahatça bakmayı mümkün kılar. İnce dokuma kumaş doğrudan güneş ışığını azaltır ve aynı zamanda
                  manzarayı doyasıya izlemenizi sağlar.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Dekoratif gün ışığı alan tül stor perde ile her zaman dışarıda hoş bir manzaraya sahip olacaksınız.
                  Bu nedenle, maksimum doğal ışığın istendiği tüm iç mekanlar için ideal perde sistemidir. İç mekanlarınızdan
                  dışarıya bakışlarınız neredeyse engelsiz bir şekilde dolaşabildiği gibi, dışarıdan evinize yönlendirilen
                  bakışlar da tül stor perde ile engellenir.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Şeffaf tül stor perdeler daha fazla gizlilik sağlamak için çeşitli renk ve kumaşlarla kombine edilebilir.
                  Çiftli stor perdeler hem tül stor hem de kumaş stor olarak tek kasada uygulanabilir. Şeffaf olması iç
                  mekanlarınızın tasarım stiline zahmetsizce entegre edilebilir.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Tül Stor perdeler özel kumaş yapısı sayesinde iç mekanlarda gün ışığını daha yararlı şekilde kullanabilme
                  ve kontrol edebilme konusunda oldukça başarılıdır. Bu stor perdeler özellikleri sayesinde güneş ışınlarını
                  kırarlar ve aydınlık bir ortam sağlarlar. Düz, renkli veya birçok desen çeşitleri mevcuttur.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  İç mekânlarınızda kullandığınız Tül stor perdeler yaşadığımız ortamın konforunu maksimum seviyeye çıkartır.
                  Şeffaf kumaş yapıları sayesinde, aydınlatma enerji sarfiyatı konusunda tasarrufu maksimize ederler.
                  Bu özelliği sayesinde perdeniz kapalıyken bile bulunduğunuz ortam görünmeden dışarının manzarası
                  dilediğiniz gibi seyredebilirsiniz. İsteğe göre motorlu veya zincir kontrol sistemli üretilebilir.
                </p>
              </div>

              {/* Features Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['İnce Tül Kumaş', 'Işık Geçirgen', 'Zarif Tasarım', 'Dekoratif', 'Motorlu Sistem', '36 Ay Garanti'].map((feature) => (
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
                Tül stor perde fiyatları kumaş cinsine, renk seçeneğine ve mekanizma türüne göre değişiklik göstermektedir.
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

      {/* Full Product Gallery - Dark Glassmorphism Grid */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Ürün Galerisi</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">
              Tül Stor Perde Modelleri
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
              Tül Stor Perde Hakkında Sorularınız mı var?
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
      </ProductNavigationPilot>
      </main>
    </>
  )
}
