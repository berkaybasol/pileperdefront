'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/e6a92fda-f300-41ce-a547-47cf59cc6359/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 1' },
  { id: 2, src: '/api/public/media/images/96547de3-0b0c-49cb-8de4-e0c0964df2bf/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 2' },
  { id: 3, src: '/api/public/media/images/16097673-ac1f-4407-aa3c-aee2eb461a29/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 3' },
  { id: 4, src: '/api/public/media/images/a84ea713-782c-45fe-81e5-ff40a6c58719/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 4' },
  { id: 5, src: '/api/public/media/images/b6382ade-0230-46d8-a86b-317538b87ea9/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 5' },
  { id: 6, src: '/api/public/media/images/be0c5d67-5d67-46d2-be47-4388ffa040e2/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 6' },
  { id: 7, src: '/api/public/media/images/c5baaa1b-9846-4cfe-9d4d-22d8c4453570/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 7' },
  { id: 8, src: '/api/public/media/images/0854e426-61de-4b77-b6cf-98037d2ecad3/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 8' },
  { id: 9, src: '/api/public/media/images/eedee2c3-a096-4422-ac0e-997e0fa6b407/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 9' },
  { id: 10, src: '/api/public/media/images/0570c5c9-568b-4377-9c9a-0a73ab46e83c/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 10' },
  { id: 11, src: '/api/public/media/images/047318b6-9547-43a2-b4ff-9037e2e1956b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 11' },
  { id: 12, src: '/api/public/media/images/fc5ed7ce-eb4f-4543-b25a-6c64f53a821e/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 12' },
  { id: 13, src: '/api/public/media/images/c8e94c11-5286-428f-95fb-6e0a4a99a7e9/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 13' },
  { id: 14, src: '/api/public/media/images/d4d61389-6b99-44b6-a6fe-948a0a8d031a/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 14' },
  { id: 15, src: '/api/public/media/images/5c8be43e-75ac-4364-a338-a44e41467dfd/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 15' },
  { id: 16, src: '/api/public/media/images/e9ebea6f-3b3a-4d5a-bc8c-6146a1feacbc/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 16' },
  { id: 17, src: '/api/public/media/images/febc4132-cb38-4eb6-89ff-de7cf12fcf55/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 17' },
  { id: 18, src: '/api/public/media/images/cc1196d2-dea9-4075-b2b4-6ddd113b0062/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 18' },
  { id: 19, src: '/api/public/media/images/15d2bb89-b40e-426d-ad0f-5afced355af9/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 19' },
  { id: 20, src: '/api/public/media/images/e4c33338-5516-4c4d-9dc1-29ffcf5ac7bd/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 20' },
  { id: 21, src: '/api/public/media/images/3d0aec37-6ec5-4ce3-b697-73c459ebed10/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 21' },
  { id: 22, src: '/api/public/media/images/955e857d-4377-47e8-9f85-2d3695b138eb/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 22' },
  { id: 23, src: '/api/public/media/images/de71f671-1cad-4d32-9b67-0efc1f68e1b6/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 23' },
  { id: 24, src: '/api/public/media/images/2fcae45b-a1d1-497f-b93b-76f340471baa/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 24' },
  { id: 25, src: '/api/public/media/images/bf615641-9d3e-4168-8538-20638e03c672/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 25' },
  { id: 26, src: '/api/public/media/images/713e349a-1560-4ec8-bf26-0233c0fc2f90/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 26' },
  { id: 27, src: '/api/public/media/images/0027dd76-c362-43a2-b464-019a87f1c80a/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 27' },
  { id: 28, src: '/api/public/media/images/1f4bfff7-26d3-483f-bb86-e7a4695d69a9/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 28' },
  { id: 29, src: '/api/public/media/images/6bc298c9-dc16-4208-a8b2-fd549bfa049b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 29' },
  { id: 30, src: '/api/public/media/images/4b439fad-8b2c-42e6-9ed3-e1f50a9bbe85/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 30' },
  { id: 31, src: '/api/public/media/images/c16cf6cc-818e-4d46-a756-c87c9e72b7c8/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 31' },
  { id: 32, src: '/api/public/media/images/6bba7df3-f479-490e-a746-29a98f117600/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 32' },
  { id: 33, src: '/api/public/media/images/1b5e4367-c9e3-4cf1-9cbb-c689939b41cf/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 33' },
  { id: 34, src: '/api/public/media/images/841de610-b7b8-489f-9185-92b7ee3f64e4/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 34' },
  { id: 35, src: '/api/public/media/images/7579479d-5efb-44cb-9041-c818f7a9dd35/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 35' },
  { id: 36, src: '/api/public/media/images/787d9310-1efe-4543-8058-e524c68b7100/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 36' },
  { id: 37, src: '/api/public/media/images/04650b30-f0c3-4faa-b955-baa105d5ce29/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 37' },
  { id: 38, src: '/api/public/media/images/1ab11f65-d7e5-4bbd-a833-2f35f97ae944/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 38' },
  { id: 39, src: '/api/public/media/images/dd1ef69a-a1d0-41fc-b724-83621bcc84a7/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 39' },
  { id: 40, src: '/api/public/media/images/5d52c023-439d-4246-8eec-5083f0975beb/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 40' },
  { id: 41, src: '/api/public/media/images/28ee80f4-98b3-43a6-892c-5471fc0f002b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 41' },
  { id: 42, src: '/api/public/media/images/a0b0595a-77a4-4b30-b4c3-df206fc9443e/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 42' },
  { id: 43, src: '/api/public/media/images/b94bb474-311b-4f24-8339-a396cc2a3f45/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 43' },
  { id: 44, src: '/api/public/media/images/86b0be14-f058-4f75-aa1e-19eaedce2d56/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 44' },
  { id: 45, src: '/api/public/media/images/9f0f8bb5-4650-4e84-93a4-b546ea3280d0/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 45' },
  { id: 46, src: '/api/public/media/images/541dfdbe-1f40-4938-997d-b7e04c53fcf1/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 46' },
  { id: 47, src: '/api/public/media/images/8cf58311-cfd5-45f9-a257-d8a479e8fd69/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 47' },
  { id: 48, src: '/api/public/media/images/2735093d-0bdd-4306-a1bf-263668d8087f/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 48' },
  { id: 49, src: '/api/public/media/images/9b221f3e-1e0e-44d6-a9a8-c1ef503ea89a/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 49' },
  { id: 50, src: '/api/public/media/images/3f54a9ca-90ca-4d7a-9afb-fb12f883a4ee/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 50' },
  { id: 51, src: '/api/public/media/images/5a97b4d5-951d-4024-95be-589201e2f41b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 51' },
  { id: 52, src: '/api/public/media/images/2beb9afa-0342-4e81-81bf-124ffd287f8d/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 52' },
  { id: 53, src: '/api/public/media/images/d34f4aab-72de-44aa-9910-4cd7fdcc749b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 53' },
  { id: 54, src: '/api/public/media/images/6c1986a7-8435-4930-b77a-e13ed767daa8/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 54' },
  { id: 55, src: '/api/public/media/images/ac80b751-6570-488e-ab18-46350273ba44/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 55' },
  { id: 56, src: '/api/public/media/images/93cb20a4-4337-4ce3-98bb-6a084b36c18d/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 56' },
  { id: 57, src: '/api/public/media/images/4ec91e60-ad50-4233-9278-098e97d49e30/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 57' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-kurumsal-urunler-ofis-perdeleri'

const defaultHeroCopy = {
  breadcrumbLabel: "Ofis Perdeleri",
  eyebrow: "Kurumsal Çözümler",
  title: "Ofis",
  highlightedTitle: "Perdeleri",
  description: "Ofisler ve iş merkezleri için profesyonel perde çözümleri. Işık kontrolü, gürültü azaltma ve estetik tasarım ile çalışma verimliliğini artıran, makam odası ve bürolara özel perde sistemleri.",
}

const productAdvantages = [
  'Ofis ve iş merkezlerine özel profesyonel perde çözümleri',
  'Işık kontrolü ile çalışma verimliliği artırır',
  'Dikey perde, stor perde, jaluzi perde seçenekleri',
  'Motorlu sistemler ile kolay kullanım',
  'Blackout (karartma) kumaşlar ile toplantı odaları için ideal',
  'Alev almaz sertifikalı güvenli kumaşlar',
  'Kurumsal fiyat avantajları ve toplu iş garantisi',
  'Ses yalıtımı sağlayan özel kumaşlar',
  'Kolay temizlenebilir ve dayanıklı yapı',
  'Makam odası ve büro için özel tasarımlar'
]

const usageAreas = [
  'Ofisler ve iş merkezleri',
  'Makam odaları',
  'Toplantı odaları',
  'Çalışma alanları ve bürolar',
  'Bankalar ve finans kuruluşları',
  'Avukatlık ofisleri',
  'Muhasebe ofisleri',
  'Şirket merkezleri'
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
      <main className="bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Link href="/kurumsal-urunler" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Kurumsal Ürünler
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
                  Ofis perdeleri, çalışma ortamının verimliliğini doğrudan etkileyen önemli elemanlardır. Işık kontrolü sağlayan perde
                  sistemlerimiz ile göz yorgunluğunu azaltır, çalışma konforunu artırırız. Dikey perde, stor perde, jaluzi perde ve
                  blackout seçenekleriyle her ofis ihtiyacına uygun çözümler sunuyoruz.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Makam odaları ve toplantı odaları için özel tasarlanmış perdelerimiz, profesyonel görünüm sağlarken gürültü azaltma
                  özelliği ile konforlu çalışma ortamı yaratır. Motorlu sistemler ile uzaktan kumanda kolaylığı, blackout kumaşlar ile
                  tam karartma imkanı sunarız.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Alev almaz sertifikalı kumaşlarımız ile ofis güvenlik standartlarını karşılıyoruz. Kolay temizlenebilir ve dayanıklı
                  yapıya sahip perdelerimiz, uzun yıllar kullanılabilir. Hızlı montaj ve toplu iş garantisi ile zamanınızı koruyoruz.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Kurumsal fiyat avantajları ile ofis zincirleri ve iş merkezleri için ekonomik çözümler sunuyoruz. Profesyonel ekibimizle
                  ofisinizin mimarisine uygun perde çözümleri geliştiriyor, çalışanlarınızın verimliliğini artırıyoruz.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Ofis', 'Dikey Perde', 'Jaluzi', 'Stor Perde', 'Blackout', 'Motorlu', 'Alev Almaz', 'Ses Yalıtımı'].map((feature) => (
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
                Ofis perde fiyatları, ofis büyüklüğü, perde tipi ve sistem seçimine göre değişiklik göstermektedir.
                Pile Perde, ofis zincirleri ve iş merkezleri için kurumsal fiyat avantajları sunar. Hızlı montaj, garanti ve garanti
                sonrası servis hizmetlerimizle ofisinizi kısa sürede hazır hale getiriyoruz. Profesyonel ekibimiz size özel çözümler sunar.
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
              Ofis Perde Modelleri
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
                Ofis perdelerimiz, iş dünyasının her alanında kullanılmak üzere tasarlanmıştır. Ofisler, iş merkezleri, makam odaları,
                toplantı odaları, bankalar, avukatlık ofisleri ve şirket merkezlerinde profesyonel çözümler sunuyoruz. Işık kontrolü ve
                ses yalıtımı ile çalışma verimliliğini artırıyoruz.
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
