'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getYouTubeEmbedUrl, type ProductGalleryImage, type ProductGalleryVideo } from '@/lib/productGalleryContent'

type EnglishProductGalleryProps = {
  title: string
  initialImages: ProductGalleryImage[]
  video?: ProductGalleryVideo
}

export default function EnglishProductGallery({ title, initialImages, video }: EnglishProductGalleryProps) {
  const [images] = useState<ProductGalleryImage[]>(initialImages)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    if (!lightboxOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [lightboxOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowLeft') setSelectedIndex((index) => (index - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight') setSelectedIndex((index) => (index + 1) % images.length)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [images.length, lightboxOpen])

  const previous = () => setSelectedIndex((index) => (index - 1 + images.length) % images.length)
  const next = () => setSelectedIndex((index) => (index + 1) % images.length)
  const selectedImage = images[selectedIndex] || images[0]
  const videoEmbedUrl = video ? getYouTubeEmbedUrl(video.youtubeUrl) : ''

  return (
    <>
    {video?.enabled !== false && videoEmbedUrl && (
      <section className="border-t border-white/10 px-6 py-16 md:py-24" aria-labelledby="english-product-video-title">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[.25em] text-gray-500">Product video</p>
          <h2 id="english-product-video-title" className="text-3xl font-extralight text-white md:text-4xl">{video.title}</h2>
          {video.description && <p className="mx-auto mb-10 mt-5 max-w-2xl font-light leading-7 text-gray-400">{video.description}</p>}
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
            <iframe src={videoEmbedUrl} title={video.title} className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
          </div>
        </div>
      </section>
    )}
    <section className="border-t border-white/10 px-6 py-16 md:py-24" aria-labelledby="english-product-gallery-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs uppercase tracking-[.25em] text-gray-500">Product gallery</p>
          <h2 id="english-product-gallery-title" className="text-3xl font-extralight text-white md:text-4xl">{title} Gallery</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <button
              key={`${image.id}-${image.src}`}
              type="button"
              onClick={() => { setSelectedIndex(index); setLightboxOpen(true) }}
              className="group relative aspect-[4/3] w-full touch-manipulation overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Open ${image.alt}`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-95" />
              <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm" aria-hidden="true">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-md sm:p-6"
            onClick={() => setLightboxOpen(false)}
            role="dialog" aria-modal="true" aria-label={`${title} image gallery`}
          >
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} className="relative h-[min(82vh,900px)] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
              <button type="button" onClick={() => setLightboxOpen(false)} className="absolute right-0 top-0 z-20 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-black/60 text-white" aria-label="Close gallery">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <button type="button" onClick={previous} className="absolute left-1 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-black/60 text-white sm:left-4" aria-label="Previous image">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button type="button" onClick={next} className="absolute right-1 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-black/60 text-white sm:right-4" aria-label="Next image">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="100vw" className="object-contain" priority />
              </div>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm text-white">{selectedIndex + 1} / {images.length}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>
  )
}
