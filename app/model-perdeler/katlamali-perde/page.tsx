'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, getProductGalleryDefaultHeroCopy } from '@/lib/productGalleryContent'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-katlamali-perde'

const defaultHeroCopy = getProductGalleryDefaultHeroCopy(PRODUCT_GALLERY_PAGE_KEY)

const canonicalUrl = 'https://pileperde.com.tr/model-perdeler/katlamali-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
  { name: 'Katlamalı Perde', url: '/model-perdeler/katlamali-perde' },
]

const productImages = [
  { id: 1, src: '/api/public/media/images/2e01e3a6-79a2-4b09-87f3-48350370e150/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 1' },
  { id: 2, src: '/api/public/media/images/849a09d1-023d-4cc5-87e4-5fc0ede1fb25/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 2' },
  { id: 3, src: '/api/public/media/images/fbddd4b9-e663-4d8e-86d2-35731e2861b6/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 3' },
  { id: 4, src: '/api/public/media/images/697594a4-a99e-4fb1-bfa4-cab53845d82e/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 4' },
  { id: 5, src: '/api/public/media/images/001cbd16-aa7a-414a-958a-e4004a485586/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 5' },
  { id: 6, src: '/api/public/media/images/c5d02850-a614-4d80-953e-f8acba72d2b8/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 6' },
  { id: 7, src: '/api/public/media/images/074abc58-d7ce-4a6f-b870-cea534b6028c/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 7' },
  { id: 8, src: '/api/public/media/images/c41ffb78-58c4-46d7-bf6b-60191cf7703e/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 8' },
  { id: 9, src: '/api/public/media/images/744f9ee2-26ff-4d1a-93fb-1a52b7b80f06/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 9' },
  { id: 10, src: '/api/public/media/images/9d9cd08a-38a4-4211-b3a2-aee4849b8956/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 10' },
  { id: 11, src: '/api/public/media/images/d737100e-5e28-4494-a81f-c85ec3b053b2/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 11' },
  { id: 12, src: '/api/public/media/images/fba26085-017f-4e06-9826-33f5f48c5d97/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 12' },
  { id: 13, src: '/api/public/media/images/185b245d-88b1-4e67-86a3-ed88191218f1/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 13' },
  { id: 14, src: '/api/public/media/images/69ea9ddd-e3fe-45e5-903a-2bcb79c8a70c/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 14' },
  { id: 15, src: '/api/public/media/images/569575b7-bc23-4af0-a021-98e0f3cbea15/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 15' },
  { id: 16, src: '/api/public/media/images/0c0c96a4-9df7-4c1c-bc9a-7d6e57f9d212/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 16' },
  { id: 17, src: '/api/public/media/images/a6a0805f-9543-4065-8b56-f88744fad759/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 17' },
  { id: 18, src: '/api/public/media/images/31fed08d-d31f-4001-ad7f-8d0dcd556e20/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 18' },
  { id: 19, src: '/api/public/media/images/687f9ef5-3f46-4326-b258-0f9d270f1b63/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 19' },
  { id: 20, src: '/api/public/media/images/83f196bb-9c3f-4570-be14-75982f1ff835/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 20' },
  { id: 21, src: '/api/public/media/images/3e11bf38-b5ef-4146-b47f-f59a0bf638b3/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 21' },
  { id: 22, src: '/api/public/media/images/09ec3c9c-e2d4-4b43-aea5-da61bda04c4f/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 22' },
  { id: 23, src: '/api/public/media/images/bee62505-968a-4745-9ae8-06fc961138c2/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 23' },
  { id: 24, src: '/api/public/media/images/23e79218-4f7e-4025-b97b-da8ee6f5c255/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 24' },
  { id: 25, src: '/api/public/media/images/503b774f-94fe-47bb-a518-853f1998a38c/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 25' },
  { id: 26, src: '/api/public/media/images/651d997d-6a7d-44f6-b7b3-fc73bce0335f/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 26' },
  { id: 27, src: '/api/public/media/images/ffc163cd-1175-4862-b3dc-05df1d3acc15/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 27' },
  { id: 28, src: '/api/public/media/images/bc2d9586-d13b-44c0-926e-119593215057/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 28' },
  { id: 29, src: '/api/public/media/images/336d7620-5f76-498e-9e6f-38abb7160e50/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 29' },
  { id: 30, src: '/api/public/media/images/84f1fa59-9a45-4a14-ab78-f1f8f978f992/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 30' },
  { id: 31, src: '/api/public/media/images/88a5b277-f03e-4e15-a3c0-0396884cf662/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 31' },
  { id: 32, src: '/api/public/media/images/4c03611a-4097-4a22-8824-65331e8e88e4/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 32' },
  { id: 33, src: '/api/public/media/images/449f483a-12ef-4da9-b63b-a41028189efa/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 33' },
  { id: 34, src: '/api/public/media/images/cd12e979-4526-4571-bbaf-cb0a9646e7d2/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 34' },
  { id: 35, src: '/api/public/media/images/b364b1c6-a7ff-4edb-bf1f-5eb22421fb56/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 35' },
  { id: 36, src: '/api/public/media/images/bea00f95-5593-4672-a1b3-fc755df9beff/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 36' },
  { id: 37, src: '/api/public/media/images/678af39f-577e-4f34-8d21-622c6681cb67/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 37' },
  { id: 38, src: '/api/public/media/images/94ab784c-9a76-48e5-8cf8-2d70a7c6c6a6/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 38' },
  { id: 39, src: '/api/public/media/images/bee22eed-95fb-4a52-8f1e-cffd04ecef53/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 39' },
  { id: 40, src: '/api/public/media/images/7fe057a1-04a5-4260-8ab1-91945dbb54c4/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 40' },
  { id: 41, src: '/api/public/media/images/3683e9c9-9a3a-4097-9718-41fa8be4c064/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 41' },
  { id: 42, src: '/api/public/media/images/c895b5f6-feb7-4d98-8ba6-a470df16051c/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 42' },
  { id: 43, src: '/api/public/media/images/18110c50-7472-484a-81c5-92132cd1f09f/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 43' },
  { id: 44, src: '/api/public/media/images/e3e5fa8a-3394-4e1e-9139-1582a4ef145b/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 44' },
  { id: 45, src: '/api/public/media/images/1473416b-0635-4bb6-9e42-e365bf74f96f/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 45' },
  { id: 46, src: '/api/public/media/images/24d7ab27-a99f-4c18-9270-b07b85856f52/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 46' },
  { id: 47, src: '/api/public/media/images/4f03ce87-ebc8-4316-aeeb-2ef2b23e1dac/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 47' },
  { id: 48, src: '/api/public/media/images/349de393-5798-4980-806c-e061925c7340/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 48' },
  { id: 49, src: '/api/public/media/images/9b7dd8f6-dc30-448a-8290-fc33be3ab86d/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 49' },
  { id: 50, src: '/api/public/media/images/fd31007e-6d63-4795-ade8-946360956e86/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 50' },
  { id: 51, src: '/api/public/media/images/a6dcbc7e-59f2-42ae-b0ff-16a4a3e59841/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 51' },
  { id: 52, src: '/api/public/media/images/bfc48e22-5489-4d5c-acde-884010fd0114/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 52' },
  { id: 53, src: '/api/public/media/images/cbe85ad8-20f1-46fa-9a2b-71f0df1ad178/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 53' },
  { id: 54, src: '/api/public/media/images/d8cf02b6-8e76-4650-a3cc-99a1ec5d0c46/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 54' },
  { id: 55, src: '/api/public/media/images/ffbbb196-99ca-4224-bb97-ad5eb96adc54/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 55' },
  { id: 56, src: '/api/public/media/images/8858aadf-3973-492b-a338-3e6af38c0bc4/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 56' },
  { id: 57, src: '/api/public/media/images/d60d970b-4991-450d-b9fb-565f8df403c1/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 57' },
  { id: 58, src: '/api/public/media/images/f4abcaad-51f5-417b-8ed6-be30c65953bd/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 58' },
  { id: 59, src: '/api/public/media/images/e6aa726a-bb18-4581-868f-1a93949ee35e/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 59' },
  { id: 60, src: '/api/public/media/images/9b656936-182d-490e-83a5-84d6fc003af0/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 60' },
  { id: 61, src: '/api/public/media/images/b16e1f47-7ed6-4017-bf03-3a9bb1ed4c28/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 61' },
  { id: 62, src: '/api/public/media/images/2530f5ea-7e7c-4ff6-a987-cfb98b11fa28/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 62' },
  { id: 63, src: '/api/public/media/images/3ae4f9ff-1ca7-4f72-a723-4bf08f75380a/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 63' },
  { id: 64, src: '/api/public/media/images/0ab36368-1fca-49a4-9a01-92a0386fd175/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 64' },
  { id: 65, src: '/api/public/media/images/1bc39088-d89b-4b67-b8c8-c6cc6b64e7bf/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 65' },
  { id: 66, src: '/api/public/media/images/ce6f9f85-cebe-4f41-b788-340380b8c7ef/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 66' },
  { id: 67, src: '/api/public/media/images/925ce8ab-51ab-4420-9412-2892120e9858/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 67' },
  { id: 68, src: '/api/public/media/images/82cf61b2-2ccb-4b5c-b037-d260306575ba/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 68' },
  { id: 69, src: '/api/public/media/images/9bafac38-eaa8-4fd4-9698-435172312901/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 69' },
  { id: 70, src: '/api/public/media/images/922b27bf-ed52-4c59-a0f1-0febe19a1be3/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 70' },
  { id: 71, src: '/api/public/media/images/facf58e4-41b2-44d2-a061-8102540f7a8f/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 71' },
  { id: 72, src: '/api/public/media/images/384df9e5-b7ee-44a9-ab91-fad74948da86/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 72' },
  { id: 73, src: '/api/public/media/images/38d57fd0-ecd8-4e7b-b99d-9b4125f673e2/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 73' },
  { id: 74, src: '/api/public/media/images/4ca61fd0-b510-467a-99e2-e9266fbda6ab/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 74' },
  { id: 75, src: '/api/public/media/images/fd740752-9b42-480a-954d-e505d4508191/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 75' },
  { id: 76, src: '/api/public/media/images/e2d3b773-a053-49c3-af88-85bccf060f24/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 76' },
  { id: 77, src: '/api/public/media/images/c8452288-f8a7-4b46-836a-547ccb99e66d/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 77' },
  { id: 78, src: '/api/public/media/images/971680af-ebfe-4476-8376-1edac1061da6/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 78' },
  { id: 79, src: '/api/public/media/images/b4bf494a-2a2a-4ad6-b8ce-77b6c954f06c/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 79' },
  { id: 80, src: '/api/public/media/images/1beb3416-af87-4481-8619-f12ad6419d7d/file', alt: 'Katlamalı perde modelleri Ankara', title: 'Katlamalı Perde 80' }
]

const productAdvantages = [
  'Manzaranız kapanmaz',
  'Mekanizmalı sistemleri kullanarak dilediğiniz boyda ayarlama yapabilirsiniz',
  'Yukarıya veya aşağıya doğru hareket ettirilebilir',
  'Çubuklu ve çubuksuz model seçenekleri',
  'Kumaş, tül, stor veya bambu ahşap seçenekleri'
]

const usageAreas = [
  'Otel lobileri ve balo salonları',
  'Nikah, düğün salonları',
  'Restoran ve kafeler',
  'Yatak odaları',
  'Mutfak',
  'Salon',
  'Ofis mekanları',
  'Evinizin tüm mekanlarında'
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
                  Salonlarda, yatak odalarında ve oturma odalarında genelde çok yaygın olarak tercih edilen katlamalı perdelerin 
                  mekanizmalı katlamalı perdeler, mekanizmasız katlamalı perdeler, yalancı katlamalı perdeler şeklinde üç farklı modeli vardır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Mekanizmalı katlamalı perde modellerinde seçmiş olduğunuz tül, düz tül olarak veya dilimli olarak dikilir ve 
                  kornişe asılan bir makara mekanizması ile istenildiğinde ipi çekilerek büzüşen bir perde modelidir.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Katlamalı perde modelleri kullanıldıkları yere zarafet kazandıran, estetik olarak göz kamaştırıcı dekorasyonlara 
                  imza atmanızı sağlayan perde modelleridir. Mobilyalar ile uyumlu renklerde seçilen katlamalı perde modelleri hem 
                  evinizin daha zarif olmasını sağlar hem de katlamalı perdenin ışıltısını evinize yansıtır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Kullanışlı katlamalı perdeler, istenilen ölçülere göre dikilebilir. Tül perde üzerinde çok şık ve estetik durur. 
                  Katlamalı perde modelleri, düz tül perdeler için de kullanılabilecek özelliktedir. Özellikle Fransız tül perdeler 
                  ya da güpür tül perdeler ile rahatlıkla kullanılabilir.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Kruvaze', 'Mekanizmalı', 'Mekanizmasız', 'Yalancı Kruvaze', 'İki Kanat', 'Estetik', 'Zarif', 'Pratik'].map((feature) => (
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
                Katlamalı perde temizliği; çamaşır makinanızın yıkama kapasitesine göre yapılabilir. Örneğin; 5-6 kg kapasiteli 
                çamaşır makinesinde katlamalı perde yıkanmaz. Minimum 8-10 kg arası olması gerekir. Katlamalı perde fiyatları, 
                model türüne, kumaş kalitesine ve metreye göre değişiklik göstermektedir.
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
              Katlamalı Perde Modelleri
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
                dikim yer almaz. Ayrıca satılır ve bunun yanında kornişe bağlı olan katlamalı perde özelliği taşır. Katlamalı perdelere 
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
              Katlamalı Perde Modelleri Hakkında Sorularınız mı var?
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
