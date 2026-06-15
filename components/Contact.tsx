'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { fallbackSiteSettings, getPublicSiteSettings, normalizePhoneHref, normalizeWhatsAppNumber } from '@/lib/siteSettings'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

const Contact = () => {
  const [settings, setSettings] = useState<Record<string, string>>(fallbackSiteSettings)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    const loadSettings = async () => {
      setSettings(await getPublicSiteSettings())
    }

    void loadSettings()
  }, [])

  const contactSettings = useMemo(() => {
    const phone = settings['company.phone.primary']
    const whatsapp = settings['company.whatsapp.primary']

    return {
      phone,
      phoneHref: `tel:${normalizePhoneHref(phone)}`,
      whatsapp,
      whatsappUrl: `https://wa.me/${normalizeWhatsAppNumber(whatsapp)}`,
      email: settings['company.email'],
      addressLines: settings['company.address.showroom'].split(/\r?\n/).filter(Boolean),
      mapsUrl: settings['company.maps.url'],
      weekdayHours: settings['company.hours.weekday'],
      sundayHours: settings['company.hours.sunday'],
    }
  }, [settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Format message for WhatsApp
    const whatsappMessage = `
*YENİ MESAJ - PİLE PERDE WEB SİTESİ*
━━━━━━━━━━━━━━━━━━━━
*İsim:* ${formData.name}
*Telefon:* ${formData.phone}
*E-posta:* ${formData.email}
━━━━━━━━━━━━━━━━━━━━
*Mesaj:*
${formData.message}
━━━━━━━━━━━━━━━━━━━━
_Bu mesaj web sitesi iletişim formundan gönderilmiştir._
    `.trim()

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappURL = `${contactSettings.whatsappUrl}?text=${encodedMessage}`
    const whatsappWindow = window.open('', '_blank')

    try {
      const response = await fetch(`${API_BASE_URL}/api/public/contact-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          sourcePage: window.location.pathname
        })
      })

      if (!response.ok) {
        throw new Error('Contact request could not be saved')
      }

      setSubmitStatus('success')
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappURL
      } else {
        window.location.href = whatsappURL
      }

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      })
    } catch {
      whatsappWindow?.close()
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-black to-gray-950">
      {/* Dark Glassmorphism Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* Address Section - Moved to top */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10 p-6 lg:p-8 mb-4 lg:mb-6 group hover:border-white/20 transition-all duration-500">
              <div className="flex items-start gap-3 lg:gap-4">
                <svg className="w-6 lg:w-8 h-6 lg:h-8 text-white/20 flex-shrink-0 mt-0.5 lg:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="text-white font-extralight text-lg lg:text-xl mb-2 lg:mb-3 uppercase tracking-wider">Showroom</h3>
                  <p className="text-gray-400 text-sm lg:text-base mb-3 lg:mb-4 font-light">
                    {contactSettings.addressLines.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <Link
                    href={contactSettings.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group/link"
                  >
                    <span className="text-xs lg:text-sm">Google Maps&apos;te Görüntüle</span>
                    <svg className="w-3 lg:w-4 h-3 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">

              {/* Phone */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10 p-4 sm:p-6 lg:p-8 group hover:border-white/20 transition-all duration-500">
                <div className="mb-3 lg:mb-4">
                  <svg className="w-6 lg:w-8 h-6 lg:h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-white font-extralight text-sm sm:text-base lg:text-lg mb-2 lg:mb-3 uppercase tracking-wider">Telefon</h3>
                <a href={contactSettings.phoneHref} className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm lg:text-base break-all">
                  {contactSettings.phone}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10 p-4 sm:p-6 lg:p-8 group hover:border-white/20 transition-all duration-500">
                <div className="mb-3 lg:mb-4">
                  <svg className="w-6 lg:w-8 h-6 lg:h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <h3 className="text-white font-extralight text-sm sm:text-base lg:text-lg mb-2 lg:mb-3 uppercase tracking-wider">WhatsApp</h3>
                <a href={contactSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm lg:text-base break-all">
                  {contactSettings.whatsapp}
                </a>
              </div>

              {/* Email */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10 p-4 sm:p-6 lg:p-8 group hover:border-white/20 transition-all duration-500">
                <div className="mb-3 lg:mb-4">
                  <svg className="w-6 lg:w-8 h-6 lg:h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-extralight text-sm sm:text-base lg:text-lg mb-2 lg:mb-3 uppercase tracking-wider">E-posta</h3>
                <a href={`mailto:${contactSettings.email}`} className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm lg:text-base break-all">
                  {contactSettings.email}
                </a>
              </div>

              {/* Working Hours */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10 p-4 sm:p-6 lg:p-8 group hover:border-white/20 transition-all duration-500">
                <div className="mb-3 lg:mb-4">
                  <svg className="w-6 lg:w-8 h-6 lg:h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-extralight text-sm sm:text-base lg:text-lg mb-2 lg:mb-3 uppercase tracking-wider">Çalışma Saatleri</h3>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="text-gray-400">{contactSettings.weekdayHours}</p>
                  <p className="text-gray-400">{contactSettings.sundayHours}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10 p-6 sm:p-8 lg:p-10 h-full">
              <h3 className="text-xl sm:text-2xl font-extralight text-white mb-6 lg:mb-8 uppercase tracking-wider">Mesaj Gönderin</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="İsim Soyisim"
                    autoComplete="name"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 transition-colors"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Telefon"
                    autoComplete="tel"
                    pattern="[0-9+ ()-]*"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 transition-colors"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-posta"
                    autoComplete="email"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 transition-colors"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mesajınız"
                    autoComplete="off"
                    rows={5}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-4 bg-white text-black overflow-hidden transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>{isSubmitting ? 'Kaydediliyor...' : 'WhatsApp ile Gönder'}</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button>

                {submitStatus === 'success' && (
                  <p className="text-xs text-green-400 text-center mt-3">
                    Talebiniz kaydedildi. WhatsApp penceresi aciliyor.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-xs text-red-400 text-center mt-3">
                    Talep kaydedilemedi. Lutfen backend&apos;in calistigini kontrol edip tekrar deneyin.
                  </p>
                )}

                <p className="text-xs text-gray-500 text-center mt-3">
                  Form doldurulduğunda WhatsApp üzerinden mesajınız iletilecektir.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
