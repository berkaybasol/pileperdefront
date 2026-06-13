'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'

const productImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/e1446473-f10c-449c-8e90-98f44fa11966/file',
    alt: 'Ceviz renk ahşap jaluzi perde',
    title: 'Ceviz Renk Ahşap Jaluzi Perde'
  },
  {
    id: 2,
    src: '/api/public/media/images/d42b9d4a-80bc-42e6-a100-649431cd2862/file',
    alt: 'Beyaz ahşap jaluzi perde',
    title: 'Beyaz Ahşap Jaluzi Perde'
  },
  {
    id: 3,
    src: '/api/public/media/images/088dbb11-2a93-4ef7-8a32-cf61c880b00b/file',
    alt: 'Ahşap jaluzi perde 50mm',
    title: 'Ahşap Jaluzi Perde 50mm'
  },
  {
    id: 4,
    src: '/api/public/media/images/2da07056-eac2-4419-8361-942de39ec457/file',
    alt: 'Ahşap jaluzi perde',
    title: 'Ahşap Jaluzi Perde'
  },
  {
    id: 5,
    src: '/api/public/media/images/c033ef94-6cba-43b4-8364-b73aef8883e3/file',
    alt: 'Mutfak ahşap jaluzi perde',
    title: 'Mutfak Ahşap Jaluzi Perde'
  },
  {
    id: 6,
    src: '/api/public/media/images/0b7a06c5-5964-4449-948a-967fbf9bd3cb/file',
    alt: 'Amerikan ahşap jaluzi',
    title: 'Amerikan Ahşap Jaluzi'
  },
  {
    id: 7,
    src: '/api/public/media/images/1fc3f30d-440c-4151-b6c1-9c649792d001/file',
    alt: 'Antrasit ahşap jaluzi',
    title: 'Antrasit Ahşap Jaluzi'
  },
  {
    id: 8,
    src: '/api/public/media/images/c928eb26-72df-454b-82cf-0778387db499/file',
    alt: 'Beyaz ahşap jaluzi',
    title: 'Beyaz Ahşap Jaluzi'
  },
  {
    id: 9,
    src: '/api/public/media/images/e7033a2b-8d20-4a88-800c-f77e6c645ffa/file',
    alt: 'Beyaz ahşap jaluzi perde modeli',
    title: 'Beyaz Ahşap Jaluzi Perde Modeli'
  },
  {
    id: 10,
    src: '/api/public/media/images/b9849236-6dda-4246-8b25-71f181815bed/file',
    alt: 'Ceviz renk ahşap jaluzi perde',
    title: 'Ceviz Renk Ahşap Jaluzi Perde'
  },
  {
    id: 11,
    src: '/api/public/media/images/69c969f9-3809-4379-bf3f-b1a1102e9f8b/file',
    alt: 'Ceviz ahşap jaluzi',
    title: 'Ceviz Ahşap Jaluzi'
  },
  {
    id: 12,
    src: '/api/public/media/images/1a373b26-4ffd-4f0a-a5a3-97dfb939ffa4/file',
    alt: 'Ceviz jaluzi perde',
    title: 'Ceviz Jaluzi Perde'
  },
  {
    id: 13,
    src: '/api/public/media/images/94af03a1-87c8-4586-a19f-bf88dfa48297/file',
    alt: 'Kumandalı jaluzi perde',
    title: 'Kumandalı Jaluzi Perde'
  },
  {
    id: 14,
    src: '/api/public/media/images/373a5ce4-d604-4929-94d6-afd712c5e055/file',
    alt: 'Motorlu jaluzi perde',
    title: 'Motorlu Jaluzi Perde'
  },
  {
    id: 15,
    src: '/api/public/media/images/cb90f973-70ed-4104-b434-b0fc833cdb21/file',
    alt: 'Uzaktan kumandalı perde',
    title: 'Uzaktan Kumandalı Perde'
  },
  {
    id: 16,
    src: '/api/public/media/images/1e636166-fc16-4bba-b3c1-a3e3c51e2db7/file',
    alt: 'Ahşap jaluzi perde 50mm model',
    title: 'Ahşap Jaluzi Perde 50mm Model'
  },
  {
    id: 17,
    src: '/api/public/media/images/56859958-4df0-4c08-9b68-c44794452287/file',
    alt: 'Ahşap jaluzi perde çeşitleri',
    title: 'Ahşap Jaluzi Perde Çeşitleri'
  },
  {
    id: 18,
    src: '/api/public/media/images/329dc922-99f8-4d0e-9a32-fb24e28952b2/file',
    alt: 'Ahşap jaluzi fon perde',
    title: 'Ahşap Jaluzi Fon Perde'
  },
  {
    id: 19,
    src: '/api/public/media/images/015224a3-defa-435d-8215-f5dd590bfe9a/file',
    alt: 'Ofis ahşap jaluzi perde',
    title: 'Ofis Ahşap Jaluzi Perde'
  },
  {
    id: 20,
    src: '/api/public/media/images/e75058ae-c5dd-469b-ae33-615819da348d/file',
    alt: 'Yatak odası ahşap jaluzi',
    title: 'Yatak Odası Ahşap Jaluzi'
  },
  {
    id: 21,
    src: '/api/public/media/images/0baca4e2-0e0c-494c-87cb-d916e341445f/file',
    alt: 'Ahşap jaluzi perde Ankara Ostim',
    title: 'Ahşap Jaluzi Perde Ankara Ostim'
  },
  {
    id: 22,
    src: '/api/public/media/images/7361778d-4c6a-4def-9c25-262e002052a2/file',
    alt: 'Ahşap jaluzi perde Ankara',
    title: 'Ahşap Jaluzi Perde Ankara'
  },
  {
    id: 23,
    src: '/api/public/media/images/c0bc71e8-4146-4900-a1fb-bb3d700f2b01/file',
    alt: 'Beyaz ahşap jaluzi perde model',
    title: 'Beyaz Ahşap Jaluzi Perde Model'
  },
  {
    id: 24,
    src: '/api/public/media/images/ff74ace2-41f9-4db7-8286-7e241e310487/file',
    alt: 'Ahşap jaluzi perde Bilkent',
    title: 'Ahşap Jaluzi Perde Bilkent'
  },
  {
    id: 25,
    src: '/api/public/media/images/90578183-9141-4373-a0c8-92c08edda8ad/file',
    alt: 'Ahşap jaluzi perde Çayyolu',
    title: 'Ahşap Jaluzi Perde Çayyolu'
  },
  {
    id: 26,
    src: '/api/public/media/images/5d81a5f6-5b2a-42d5-8059-26c2c4f1a010/file',
    alt: 'Çocuk odası ahşap jaluzi',
    title: 'Çocuk Odası Ahşap Jaluzi'
  },
  {
    id: 27,
    src: '/api/public/media/images/95a1c095-280e-4cdf-bcf7-d6d8e9010e95/file',
    alt: 'Ahşap jaluzi sistemi',
    title: 'Ahşap Jaluzi Sistemi'
  },
  {
    id: 28,
    src: '/api/public/media/images/216b6572-0571-4d09-b2c9-c8b0efc1e0ef/file',
    alt: 'Ahşap jaluzi perde model',
    title: 'Ahşap Jaluzi Perde Model'
  },
  {
    id: 29,
    src: '/api/public/media/images/484a9a1e-7621-4287-b402-3eb89248c26b/file',
    alt: 'Motorlu ahşap jaluzi perde',
    title: 'Motorlu Ahşap Jaluzi Perde'
  },
  {
    id: 30,
    src: '/api/public/media/images/17123504-b7e2-4290-83b9-35143c4433b6/file',
    alt: 'Ahşap jaluzi ofis Ankara',
    title: 'Ahşap Jaluzi Ofis Ankara'
  },
  {
    id: 31,
    src: '/api/public/media/images/c222a99d-5cbe-40ca-859b-7c2af284b947/file',
    alt: 'Ofis ahşap jaluzi model',
    title: 'Ofis Ahşap Jaluzi Model'
  },
  {
    id: 32,
    src: '/api/public/media/images/3ba1c693-4373-4de4-ad1e-c271a986d31a/file',
    alt: 'Ahşap jaluzi ölçüleri',
    title: 'Ahşap Jaluzi Ölçüleri'
  },
  {
    id: 33,
    src: '/api/public/media/images/df724c77-e492-4eb0-931f-626d5abc36d8/file',
    alt: 'Ahşap jaluzi perde Ankara model',
    title: 'Ahşap Jaluzi Perde Ankara Model'
  },
  {
    id: 34,
    src: '/api/public/media/images/e86de83d-c262-40dc-81b0-551a8d97428a/file',
    alt: 'Ahşap jaluzi perde Ümitköy',
    title: 'Ahşap Jaluzi Perde Ümitköy'
  },
  {
    id: 35,
    src: '/api/public/media/images/08010395-5e7a-4f60-94c0-50fcebd87887/file',
    alt: 'Ahşap jaluzi üreticiler',
    title: 'Ahşap Jaluzi Üreticiler'
  },
  {
    id: 36,
    src: '/api/public/media/images/c0454896-212f-4fde-a6e0-aa2585cc2a65/file',
    alt: 'Ahşap jaluzi perde Yaşamkent',
    title: 'Ahşap Jaluzi Perde Yaşamkent'
  },
  {
    id: 36,
    src: '/api/public/media/images/a8dc4b7a-d96c-4b98-be61-04eb9f00c660/file',
    alt: 'Ahşap jaluzi yorumlar',
    title: 'Ahşap Jaluzi Yorumlar'
  }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-ahsap-jaluzi-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Ahşap Jaluzi Perde",
  eyebrow: "Ahşap Jaluzi Koleksiyonu",
  title: "Ahşap",
  highlightedTitle: "Jaluzi Perde",
  description: "Ahşap Jaluzi Perde, ince şerit bantlarından oluşan ve şeritlerin birbiriyle senkronize hareket etmesini sağlayan bir perde sistemidir. 25 mm, 35 mm, 50 mm ve 63 mm olarak üretilmektedir. 60 adet değişik renk ve dokuda geniş ürün yelpazesine sahiptir.",
}

const productAdvantages = [
  'Ahşap Jaluzi perde sistemleri; kalitesi, sağlamlığı ve kullanım kolaylığı ile kullanıcıya avantaj sağlamaktadır.',
  '60 adet değişik renk ve dokuda geniş ürün yelpazesine sahiptir.',
  'Manuel ipli sistem, zincirli sistem ve motorlu uzaktan kumandalı sistemler mevcuttur.',
  'Gün ışığının miktarını dilediğiniz gibi kontrol edebilmenizi sağlar.',
  '25 mm, 35 mm, 50 mm ve 63 mm olarak üretilmektedir.',
  '36 ay garanti ve sonrasında servis hizmeti sunulmaktadır.'
]

const usageAreas = [
  'Evinizin tüm mekanları',
  'Kış bahçeleri',
  'Makam odaları',
  'Ofisler',
  'Oteller',
  'Hastaneler',
  'Restoran ve Kafeler',
  'Resmî Kurumlarda kullanıma uygundur'
]

export default function AluminyumJaluziPerdePage() {
  const [galleryImages, setGalleryImages] = useState<ProductGalleryImage[]>(productImages)
  const [selectedImage, setSelectedImage] = useState<ProductGalleryImage>(productImages[0])
  const [heroCopy, setHeroCopy] = useState(defaultHeroCopy)
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
    <main className="bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div
            className="text-center max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Link href="/urunler" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Ürünler
              </Link>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/urunler/mekanizmali-perdeler" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Mekanizmalı Perdeler
              </Link>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/urunler/mekanizmali-perdeler/jaluzi-perde" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Jaluzi Perde
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
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10"
            >
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
                  Ahşap Jaluzi Perde mekanizmaları, manuel zincirli mekanik sistem ve uzaktan kumandalı sistemler
                  olarak istediğiniz ölçüde uygulanabilmektedir. Hareket mekanizması sayesindeki işlevselliği ile
                  dışarıdan gelen gün ışığına yön kazandırabilirsiniz.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Ahşap Jaluzi Perde, suya ve neme dayanıklıdır. Kapalı havuz gibi tesislerde ve banyolarda da
                  sorunsuz kullanılabilmektedir.
                </p>
              </div>

              {/* Features Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['25mm', '35mm', '50mm', '63mm', '60 Farklı Renk', 'Motorlu Sistem', '36 Ay Garanti'].map((feature) => (
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
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/20"
            >
              <h3 className="text-xl font-light text-white mb-4 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Fiyat Bilgisi
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Ahşap Jaluzi Perde fiyatları, ürün cinsine ve türüne göre değişiklik göstermektedir.
                Pile Perde, rekabetçi fiyatları ile projelerinizi sorunsuz şekilde tamamlamanızı sağlar.
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

      {/* YouTube Video Section - How It Works */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Video Anlatım</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">
                Nasıl Çalışır?
              </h2>
              <p className="text-gray-400 font-light max-w-2xl mx-auto">
                Ahşap jaluzi perde sistemimizin çalışma prensibini ve montaj detaylarını videomuzda izleyebilirsiniz.
              </p>
            </div>

            {/* YouTube Video Embed */}
            <div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10"
              style={{ paddingBottom: '56.25%' }} // 16:9 Aspect Ratio
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/VTjS0mSOoQ8"
                title="Ahşap Jaluzi Perde - Nasıl Çalışır?"
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
          <div
            className="text-center mb-16"
          >
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Ürün Galerisi</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">
              Ahşap Jaluzi Modelleri
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
              className="p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/20"
            >
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
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/20"
            >
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
              Ahşap Jaluzi Perde Hakkında Sorularınız mı var?
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
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
  )
}