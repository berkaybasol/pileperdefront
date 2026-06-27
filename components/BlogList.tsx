'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { defaultBlogPosts, getPublicBlogPosts } from '@/lib/blogContent'

const BlogList = () => {
  const [allBlogPosts, setAllBlogPosts] = useState(defaultBlogPosts)

  const categoryColors: { [key: string]: string } = {
    'Perde Bilgisi': 'bg-blue-900/20 text-blue-400 border border-blue-800',
    'Bakım': 'bg-green-900/20 text-green-400 border border-green-800',
    'Çocuk Odası': 'bg-purple-900/20 text-purple-400 border border-purple-800',
    'Salon': 'bg-orange-900/20 text-orange-400 border border-orange-800',
    'Yatak Odası': 'bg-pink-900/20 text-pink-400 border border-pink-800',
    'Mutfak': 'bg-cyan-900/20 text-cyan-400 border border-cyan-800',
    'Perde Modelleri': 'bg-indigo-900/20 text-indigo-400 border border-indigo-800',
    'Perde Çeşitleri': 'bg-yellow-900/20 text-yellow-400 border border-yellow-800',
    'Dekorasyon': 'bg-teal-900/20 text-teal-400 border border-teal-800',
    'Renk Seçimi': 'bg-violet-900/20 text-violet-400 border border-violet-800',
    'İpuçları': 'bg-red-900/20 text-red-400 border border-red-800',
    'Kurumsal': 'bg-gray-700/20 text-gray-400 border border-gray-600'
  }

  const postsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    getPublicBlogPosts().then((posts) => {
      if (isMounted) {
        setAllBlogPosts(posts)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  // Filter posts by category
  const filteredPosts = selectedCategory
    ? allBlogPosts.filter(post => post.category === selectedCategory)
    : allBlogPosts

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Get unique categories
  const categories = Array.from(new Set(allBlogPosts.map(post => post.category)))

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <section className="py-16 lg:py-24 bg-[#0a0a0c] relative">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleCategoryFilter(null)}
              className={`px-4 py-2 text-sm transition-all ${
                selectedCategory === null
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              Tümü
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 text-sm transition-all ${
                  selectedCategory === category
                    ? categoryColors[category]
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {currentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 * (index % 10) }}
            >
              <Link href={post.href} className="group block h-full">
                <article className="relative h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 flex flex-col md:flex-row">

                  {/* Image Section */}
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0c]/80 group-hover:from-transparent group-hover:to-[#0a0a0c]/60 transition-all duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium ${categoryColors[post.category] || 'bg-gray-700/20 text-gray-400 border border-gray-600'}`}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-light text-white mb-3 group-hover:text-gray-300 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-300 font-light line-clamp-2 mb-4">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-2"
          >
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 border ${
                currentPage === 1
                  ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                  : 'border-white/20 text-white hover:bg-white hover:text-black transition-all'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1
                // Show first page, last page, current page, and pages around current page
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 border transition-all ${
                        currentPage === pageNum
                          ? 'bg-white text-black border-white'
                          : 'border-white/20 text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span key={pageNum} className="px-2 text-gray-400">
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border ${
                currentPage === totalPages
                  ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                  : 'border-white/20 text-white hover:bg-white hover:text-black transition-all'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-sm text-gray-400"
        >
          {filteredPosts.length} yazıdan {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} arası gösteriliyor
          {selectedCategory && (
            <span className="ml-2">
              ({selectedCategory} kategorisi)
            </span>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default BlogList
