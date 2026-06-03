'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-950 pt-20 pb-8 border-t border-white/5">
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

            {/* Social Media */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/pile.perde/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
                <span className="text-xs text-gray-400 group-hover:text-white font-light">Instagram</span>
              </a>

              <a
                href="https://wa.me/905335127272"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-xs text-gray-400 group-hover:text-white font-light">WhatsApp</span>
              </a>
            </div>
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
                  <p className="text-xs text-gray-500 font-light">Pazar: 11:30-17:30</p>
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
                    <p>Prof. Dr. A.T. Kışlalı Mah.</p>
                    <p>B.B. Şeyh M. Rahman Blv.</p>
                    <p>No:94 H, Çankaya/Ankara</p>
                  </div>
                </div>
              </div>

              {/* Working hours for desktop */}
              <div className="hidden lg:block col-span-2 pt-3 border-t border-white/10">
                <p className="text-xs text-gray-600 font-light uppercase tracking-wider mb-2">Çalışma Saatleri</p>
                <p className="text-xs text-gray-500 font-light">Pzt-Cmt: 10:00 - 19:30</p>
                <p className="text-xs text-gray-500 font-light">Pazar: 11:30 - 17:30</p>
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