'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { defaultBlogPosts, getPublicBlogPosts } from '@/lib/blogContent'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Blog = () => {
  const [latestPosts, setLatestPosts] = useState(defaultBlogPosts.slice(0, 3))

  useEffect(() => {
    let isMounted = true

    getPublicBlogPosts().then((posts) => {
      if (isMounted) {
        setLatestPosts(posts.slice(0, 3))
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-black via-gray-950 to-zinc-950 relative overflow-hidden">
      {/* Dark Glassmorphism Background Pattern - Blog Unique */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,_var(--tw-gradient-stops))] from-gray-900/10 via-black via-black to-gray-900/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1c1c08_1px,transparent_1px),linear-gradient(to_bottom,#1c1c1c08_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span className="w-12 h-[1px] bg-gray-700"></span>
              <span className="uppercase tracking-[0.2em] font-light">BLOG</span>
              <span className="w-12 h-[1px] bg-gray-700"></span>
            </div>
          </div>
          <h2 className="text-3xl lg:text-5xl font-extralight text-white mb-4">
            Dekorasyon <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Önerileri</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Perde seçimi, bakımı ve dekorasyon trendleri hakkında
            uzman önerilerimizi keşfedin.
          </p>
        </motion.div>

        {/* Desktop Grid - Sadece 3 yazı göster */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 * index }}
              viewport={{ once: true }}
            >
              <Link href={post.href} className="group block h-full">
                <article className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90 uppercase tracking-wider rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-extralight text-white mb-3 group-hover:text-gray-300 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-400 font-light line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center text-sm text-white font-medium group-hover:text-gray-300 transition-colors">
                      <span>Devamını Oku</span>
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="lg:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.blog-swiper-prev',
              nextEl: '.blog-swiper-next',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
            }}
            className="blog-swiper pb-12"
          >
            {latestPosts.map((post, index) => (
              <SwiperSlide key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 * index }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Link href={post.href} className="group block h-full">
                    <article className="relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90 uppercase tracking-wider rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-lg font-extralight text-white mb-3 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-gray-400 font-light line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center text-sm text-white font-medium">
                          <span>Devamını Oku</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="blog-swiper-prev w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-[#141416] hover:border-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="blog-swiper-next w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-[#141416] hover:border-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 font-medium">Tüm Yazıları Görüntüle</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .blog-swiper .swiper-pagination {
          position: relative;
          margin-top: 1.5rem;
        }

        .blog-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
        }

        .blog-swiper .swiper-pagination-bullet-active {
          background: #ffffff;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}

export default Blog
