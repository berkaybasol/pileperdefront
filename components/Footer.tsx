'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-950 pt-20 pb-8 border-t border-white/5 [&_a]:min-h-11">
      {/* Dark Glassmorphism Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900/10 via-black to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.01]" />
      </div>
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Logo & About - Larger Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/pile_perde_logo-1.png"
                alt="Pile Perde"
                width={160}
                height={55}
                className="h-12 w-auto"
              />
            </Link>

            <p className="text-gray-400 text-sm font-light leading-relaxed mb-8 max-w-md">
              35 yıllık tecrübemizle, mekanlarınız için en kaliteli ve şık perde çözümlerini sunuyoruz.
              Modern tasarımlar ve profesyonel hizmet anlayışıyla yanınızdayız.
            </p>

          </motion.div>

          {/* Quick Links & Products - Side by side on mobile, separate on desktop */}
          <div className="grid grid-cols-2 gap-8 lg:contents">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h4 className="text-white font-extralight text-sm uppercase tracking-[0.2em] mb-6">Hızlı Linkler</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                    Anasayfa
                  </Link>
                </li>
                <li>
                  <Link href="/hakkimizda" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/sss" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                    S.S.S
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                    İletişim
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h4 className="text-white font-extralight text-sm uppercase tracking-[0.2em] mb-6">Ürünler</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/urunler/mekanizmali-perdeler" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                    Mekanizmalı Perdeler
                  </Link>
                </li>
                <li>
                  <Link href="/urunler/tul-fon-perde" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                    Tül & Fon Perdeler
                  </Link>
                </li>
                <li>
                  <Link href="/urunler/motorlu-perdeler" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                    Motorlu Perdeler
                  </Link>
                </li>
                <li>
                  <Link href="/urunler/perde-aksesuarlari" className="text-sm text-gray-500 hover:text-white transition-colors font-light">
                    Perde Aksesuarları
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <h4 className="text-white font-extralight text-sm uppercase tracking-[0.2em] mb-6">İletişim</h4>

            {/* Mobile compact layout */}
            <div className="grid grid-cols-2 gap-4 lg:block lg:space-y-4">
              {/* Phone and Email column on mobile */}
              <div className="space-y-4">
                <a href="tel:+903122417272" className="flex items-start gap-2 lg:gap-3 group">
                  <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-xs lg:text-sm text-gray-500 group-hover:text-white transition-colors font-light">
                    +90 (312) 241 72 72
                  </span>
                </a>

                <a href="mailto:info@pileperde.com.tr" className="flex items-start gap-2 lg:gap-3 group">
                  <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs lg:text-sm text-gray-500 group-hover:text-white transition-colors font-light break-all">
                    info@pileperde.com.tr
                  </span>
                </a>

                {/* Working hours on mobile */}
                <div className="lg:hidden">
                  <p className="text-xs text-gray-600 font-light uppercase tracking-wider mb-2">Çalışma Saatleri</p>
                  <p className="text-xs text-gray-500 font-light">Pzt-Cmt: 10:00-19:30</p>
                  <p className="text-xs text-gray-500 font-light">Pazar: Kapalı</p>
                </div>
              </div>

              {/* Address column on mobile */}
              <div className="space-y-4">
                <div className="flex items-start gap-2 lg:gap-3">
                  <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-xs lg:text-sm text-gray-500 font-light">
                    <p>Prof. Dr. Ahmet Taner Kışlalı Mah.</p>
                    <p>Bangabandhu Bulvarı No:94 H</p>
                    <p>06810 Çayyolu / Çankaya / Ankara</p>
                  </div>
                </div>
              </div>

              {/* Working hours for desktop */}
              <div className="hidden lg:block col-span-2 pt-3 border-t border-white/10">
                <p className="text-xs text-gray-600 font-light uppercase tracking-wider mb-2">Çalışma Saatleri</p>
                <p className="text-xs text-gray-500 font-light">Pzt-Cmt: 10:00 - 19:30</p>
                <p className="text-xs text-gray-500 font-light">Pazar: Kapalı</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-12 pb-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-white text-lg font-extralight mb-2">Yeniliklerden Haberdar Olun</h3>
              <p className="text-sm text-gray-500 font-light">Kampanya ve yeni ürünlerimizden ilk siz haberdar olun</p>
            </div>

            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder:text-gray-600 font-light focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 lg:min-w-[300px]"
              />
              <button
                type="submit"
                className="group relative px-8 py-3 bg-white text-black font-medium overflow-hidden transition-all duration-300 rounded-lg"
              >
                <span className="relative z-10">Abone Ol</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-600 font-light text-center md:text-left">
              © {currentYear} Pile Perde. Tüm hakları saklıdır.
            </div>

            <div className="flex items-center gap-4 text-xs">
              <Link href="/gizlilik-politikasi" className="text-gray-600 hover:text-white transition-colors font-light">
                Gizlilik Politikası
              </Link>
              <span className="text-gray-800">•</span>
              <Link href="/kullanim-kosullari" className="text-gray-600 hover:text-white transition-colors font-light">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
