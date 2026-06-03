'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery } from '@/lib/productGalleryContent'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-yuksek-tavanli-galeri-perde'

const productImages = [
  { id: 1, src: '/api/public/media/images/334ad8c7-98e2-411c-98e9-d3c74c5a8973/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 1' },
  { id: 2, src: '/api/public/media/images/5aa3ec0e-2345-42af-8995-8f75bef6aa38/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 2' },
  { id: 3, src: '/api/public/media/images/a0fe2cf3-e260-403e-8719-8e07f0b53efe/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 3' },
  { id: 4, src: '/api/public/media/images/91052388-fe8b-4954-92dd-4bac673f3180/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 4' },
  { id: 5, src: '/api/public/media/images/e0c4a8fb-b40f-40da-992f-015e96e1a63f/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 5' },
  { id: 6, src: '/api/public/media/images/c0593653-5dc6-4a5c-93d5-58d55ae8010a/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 6' },
  { id: 7, src: '/api/public/media/images/16dbd58c-079c-49ed-9892-3efbe1154c6f/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 7' },
  { id: 8, src: '/api/public/media/images/99d1bc83-6999-48ab-b5c2-a6dc04c4c5a9/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 8' },
  { id: 9, src: '/api/public/media/images/bccd676e-9182-4a8f-9af6-7485cfb16160/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 9' },
  { id: 10, src: '/api/public/media/images/8172fab4-8043-45c4-bb4b-911a134f8a64/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 10' },
  { id: 11, src: '/api/public/media/images/cb72ed79-7b89-4417-af0e-d0d9a18f54fa/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 11' },
  { id: 12, src: '/api/public/media/images/f1755949-695c-4648-8a3b-46663346e849/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 12' },
  { id: 13, src: '/api/public/media/images/5dd1903f-aed1-4007-ab22-9f036b8f7f9b/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 13' },
  { id: 14, src: '/api/public/media/images/2a954223-bc7b-438e-bded-f05aac65a9ed/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 14' },
  { id: 15, src: '/api/public/media/images/27ac6e71-b4ba-48fa-b13f-d59c23d03512/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 15' },
  { id: 16, src: '/api/public/media/images/79d2e414-6fbe-431a-9192-67b0f604d1f6/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 16' },
  { id: 17, src: '/api/public/media/images/cb7f60ad-44a8-4021-b40f-401d5c060cac/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 17' },
  { id: 18, src: '/api/public/media/images/de7668ad-8034-4d60-a444-796376190ffa/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 18' },
  { id: 19, src: '/api/public/media/images/ef3a47cc-93f5-4289-ba30-820c8924db12/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 19' },
  { id: 20, src: '/api/public/media/images/ed46ab63-38db-4f7e-9c1d-9547de771093/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 20' },
  { id: 21, src: '/api/public/media/images/8f8e3373-8818-4e27-982e-2b0ed3f382e0/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 21' },
  { id: 22, src: '/api/public/media/images/454b66a5-0970-4c53-bbf4-444d9710399a/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 22' },
  { id: 23, src: '/api/public/media/images/abcef93f-e250-4bbd-936d-961c45ee3cbd/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 23' },
  { id: 24, src: '/api/public/media/images/a09cabee-c69a-417e-90b8-d58cb3fc62a9/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 24' },
  { id: 25, src: '/api/public/media/images/fbf794db-4fca-44ca-b1c1-51f7e617fe82/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 25' },
  { id: 26, src: '/api/public/media/images/3de3107d-4cf7-4ad6-98f5-531f94634183/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 26' },
  { id: 27, src: '/api/public/media/images/100165be-5da1-4f83-ae02-03617332a70c/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 27' },
  { id: 28, src: '/api/public/media/images/1b201122-c92a-43b7-802b-80954bf8dbd0/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 28' },
  { id: 29, src: '/api/public/media/images/67514cdf-fbba-4e29-89d5-41aefc8e222d/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 29' },
  { id: 30, src: '/api/public/media/images/741ce4e7-146f-4207-afea-bb57fcfc8bcf/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 30' },
  { id: 31, src: '/api/public/media/images/d42dd441-ebd7-4e95-ae10-ce01cd305213/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 31' },
  { id: 32, src: '/api/public/media/images/97308084-b5c2-42c9-975c-b50bcd13b3ea/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 32' },
  { id: 33, src: '/api/public/media/images/b2ad349e-b24d-42d4-8c68-51f37dad052e/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 33' },
  { id: 34, src: '/api/public/media/images/d070f0e0-132f-4f35-a906-b3fc4477ba01/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 34' },
  { id: 35, src: '/api/public/media/images/1a4c5a97-5e74-4f43-8dfa-6a23cacd3505/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 35' },
  { id: 36, src: '/api/public/media/images/7acc44f3-3c76-4691-a419-625d2e3ced13/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 36' },
  { id: 37, src: '/api/public/media/images/2178030c-f22f-469c-aeb1-b7170390af33/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 37' },
  { id: 38, src: '/api/public/media/images/d71e70f7-7f06-4cc7-a8ba-28009de72190/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 38' },
  { id: 39, src: '/api/public/media/images/fdcff8e6-f36d-4a64-8627-da4420414a24/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 39' },
  { id: 40, src: '/api/public/media/images/ea15ff26-b020-43c1-a013-dfea409b7b69/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 40' },
  { id: 41, src: '/api/public/media/images/6cc87159-bdc1-430b-976d-aed9b73099aa/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 41' },
  { id: 42, src: '/api/public/media/images/b6fa8293-e51e-4649-b57c-feeea0ab7c4e/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 42' },
  { id: 43, src: '/api/public/media/images/9e10d6b4-91b5-4b9d-9473-85faf7646de8/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 43' },
  { id: 44, src: '/api/public/media/images/67227d8b-b658-4e99-b3e2-73a35ec0fc35/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 44' },
  { id: 45, src: '/api/public/media/images/9de792d2-d038-47f2-8ad4-b4b501da8461/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 45' },
  { id: 46, src: '/api/public/media/images/27c8b308-80d1-4aba-908c-74addb078d40/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 46' },
  { id: 47, src: '/api/public/media/images/1e8b995a-2acb-4575-85bb-987b54afcbc1/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 47' },
  { id: 48, src: '/api/public/media/images/58528cb9-38e5-4ef5-b7bf-166643e58ba3/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 48' },
  { id: 49, src: '/api/public/media/images/7d50227b-ac8d-4026-aa2f-dda57fd850f8/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 49' },
  { id: 50, src: '/api/public/media/images/bbdf03d9-4ecc-4c39-a437-e8afdb57c9a9/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 50' },
  { id: 51, src: '/api/public/media/images/66fca13f-e43d-417d-863f-88d63e1e3498/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 51' },
  { id: 52, src: '/api/public/media/images/a47c31d1-21c8-4415-a163-250af828a36c/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 52' }
]

const productAdvantages = [
  'Profesyonel tasarım ve uygulamalarla mekanınıza özel çözümler',
  'Motorlu perde sistemleri ile kolay kullanım ve konfor',
  'Uzaktan kumanda veya akıllı ev entegrasyonu ile otomasyon desteği',
  'Yüksek tavanlara özel stor, tül ve fon perde seçenekleri',
  'İhtişamlı görünüm ve estetik ile mekanınıza değer katar'
]

const usageAreas = [
  'Yüksek tavanlı villalar',
  'Galeri pencereleri olan evler',
  'Dubleks ve tripleks konutlar',
  'Lüks rezidanslar',
  'Otel lobi ve balo salonları',
  'İş merkezleri ve ofisler',
  'Showroom ve sergi alanları',
  'Yüksek tavanlı restoranlar'
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
              <span className="text-sm text-gray-400">Yüksek Tavanlı Galeri Perde</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">Model Perde Koleksiyonu</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Yüksek Tavanlı Galeri
              <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                Perde Modelleri
              </span>
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              Son zamanlarda sıkça karşılaştığımız yüksek tavanlı galeri pencereleri standart pencelerden daha yüksek
              olduğundan dolayı çok daha başarılı perde modelleri ortaya çıkmaktadır. Pile Perde olarak, öncelikle
              tasarım aşamasında mekanın yüksekliğine büyüklüğüne ve sizin beklentilerinize göre çeşitli tespitler
              yapıp, profesyonel tasarım ekibimiz tarafından dekorasyonunuzun konseptine göre perde modellemesi oluştururuz.
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
                  Özellikle yüksek tavanlı villalarda veya galeri pencereleri olan evlerde, standart perde çözümlerinin ötesinde
                  profesyonel bir yaklaşım gerekmektedir. Bu tür mekanlarda ışık kontrolü, estetik görünüm ve fonksiyonellik
                  bir arada düşünülmelidir.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Yüksek tavanlı galeri perdeleri, genellikle motorlu perde sistemleri ile desteklenmektedir. Uzaktan kumanda
                  veya akıllı ev sistemleri ile entegre edilerek kullanım kolaylığı sağlanır. Böylece yüksek pencerelere
                  erişim sorunu ortadan kalkar ve konforlu bir kullanım deneyimi yaşanır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Stor perde, tül perde veya fon perde gibi farklı kumaş seçenekleri ile yüksek tavanlı galeri pencereleri
                  için özel çözümler sunuyoruz. Her bir model, mekanın ihtişamını artıracak şekilde tasarlanır ve profesyonel
                  montaj ekiplerimiz tarafından kusursuz bir şekilde uygulanır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Pile Perde olarak 30 yıllık tecrübemizle, yüksek tavanlı galeri perdelerinde en zorlu projeleri başarıyla
                  tamamlıyoruz. Tasarımdan üretime, montajdan sonrası hizmete kadar her aşamada yanınızdayız.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Yüksek Tavan', 'Galeri Pencere', 'Motorlu Sistem', 'Otomasyon', 'Uzaktan Kumanda', 'Stor Perde', 'Profesyonel', 'İhtişamlı'].map((feature) => (
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
                Yüksek tavanlı galeri perde fiyatları; pencere yüksekliğine, kumaş kalitesine, motorlu sistem seçeneklerine ve
                montaj zorluğuna göre değişiklik göstermektedir. Her proje özel olarak değerlendirilir ve size en uygun çözüm sunulur.
              </p>

              <div className="relative w-full mb-6 rounded-xl overflow-hidden border border-blue-500/30">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/YJRenaY9vKE"
                    title="Yüksek Tavanlı Galeri Perde Modelleri"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>

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
              Yüksek Tavanlı Galeri Perde Modelleri
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
                Yüksek tavanlı galeri perdelerini aşağıdaki alanlarda kullanarak mekanlarınıza görsel bir şölen yaşatabilirsiniz.
                Her bir alan için özel tasarım ve uygulama çözümleri sunuyoruz.
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
              Yüksek Tavanlı Galeri Perde Modelleri Hakkında Sorularınız mı var?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
              Dilerseniz hemen <strong>0312 241 72 72</strong> no&apos;lu telefondan bize ulaşarak ihtiyacınıza
              uygun yüksek tavanlı galeri perde modelleri hakkında bilgi alabilir ve sipariş verebilirsiniz.
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
