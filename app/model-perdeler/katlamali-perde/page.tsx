'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'
import ProductContactCta from '@/components/ProductContactCta'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy, parseProductGalleryImages } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, getProductGalleryDefaultHeroCopy } from '@/lib/productGalleryContent'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import styles from './page.module.css'
import ProductEditorialSections from '@/components/ProductEditorialSections'

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
  const initialContentJson = useCmsSectionJson(PRODUCT_GALLERY_PAGE_KEY, 'product.gallery')
  const initialGalleryImages = parseProductGalleryImages(initialContentJson, productImages)
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages)
  const [selectedImage, setSelectedImage] = useState(initialGalleryImages[0])
  const initialHeroCopy = parseProductGalleryHeroCopy(
    initialContentJson,
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
      <main className={`bg-black ${styles.realPremiumPage}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <section className={`relative overflow-hidden py-20 ${styles.heroSection}`}>
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

      <ProductContactCta />

      <section className={`relative py-20 border-t border-white/5 ${styles.gallerySection}`}>
        <div className="container mx-auto px-6">
          <ProductGalleryHeading
            fallbackEyebrow="Ürün Galerisi"
            fallbackTitle="Katlamalı Perde Modelleri"
            className="text-center mb-16"
            eyebrowClassName="text-sm text-gray-500 uppercase tracking-[0.3em]"
            eyebrowTitleSpacingClassName="mb-4"
            titleClassName="text-3xl md:text-4xl font-extralight text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="group">
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
                      <div />
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 flex-shrink-0 ml-4">
                        <svg className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <ProductEditorialSections pageKey={PRODUCT_GALLERY_PAGE_KEY} />





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
                aria-label="Galeriyi kapat"
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                aria-label="Önceki görsel"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                aria-label="Sonraki görsel"
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
