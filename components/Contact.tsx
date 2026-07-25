'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  getCountries,
  getCountryCallingCode,
  type Country,
} from 'react-phone-number-input'
import {
  fallbackSiteSettings,
  getPublicSiteSettings,
  normalizePhoneHref,
  normalizeWhatsAppNumber,
} from '@/lib/siteSettings'
import {
  EMAIL_ERROR_MESSAGE,
  normalizeContactEmail,
  normalizeContactPhone,
  PHONE_ERROR_MESSAGE,
} from '@/lib/contactValidation'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          action: string
          theme: 'light' | 'dark' | 'auto'
          size: 'invisible'
          callback: (token: string) => void
          'expired-callback': () => void
          'error-callback': () => void
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId: string) => void
    }
  }
}

type SubmitStatus = 'success' | 'error' | 'rate-limit' | 'security' | null

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''
const TURNSTILE_ENABLED =
  process.env.NEXT_PUBLIC_CONTACT_TURNSTILE_ENABLED === 'true'

const countryDisplayNames = new Intl.DisplayNames(['tr'], { type: 'region' })

type FieldErrors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>

const Contact = ({ locale = 'tr' }: { locale?: 'tr' | 'en' }) => {
  const isEnglish = locale === 'en'
  const [settings, setSettings] = useState<Record<string, string>>(fallbackSiteSettings)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    website: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [phoneCountry, setPhoneCountry] = useState<Country>('TR')
  const [countrySearch, setCountrySearch] = useState('')
  const [countryMenuOpen, setCountryMenuOpen] = useState(false)
  const [turnstileReady, setTurnstileReady] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const idempotencyKey = useRef<string | null>(null)
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetIdRef = useRef<string | null>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const loadSettings = async () => {
      setSettings(await getPublicSiteSettings())
    }
    void loadSettings()
  }, [])

  useEffect(() => {
    if (
      !TURNSTILE_ENABLED ||
      !TURNSTILE_SITE_KEY ||
      !turnstileReady ||
      !window.turnstile ||
      !turnstileContainerRef.current ||
      turnstileWidgetIdRef.current
    ) {
      return
    }

    turnstileWidgetIdRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: TURNSTILE_SITE_KEY,
        action: 'contact',
        theme: 'dark',
        size: 'invisible',
        callback: (token) => {
          setTurnstileToken(token)
          setSubmitStatus(null)
        },
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      }
    )

    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
        turnstileWidgetIdRef.current = null
      }
    }
  }, [turnstileReady])

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLocaleLowerCase('tr')
    return getCountries().filter((country) => {
      const name = countryDisplayNames.of(country) || country
      const callingCode = `+${getCountryCallingCode(country)}`
      return (
        !query ||
        name.toLocaleLowerCase('tr').includes(query) ||
        country.toLocaleLowerCase('tr').includes(query) ||
        callingCode.includes(query)
      )
    })
  }, [countrySearch])

  const contactSettings = useMemo(() => {
    const phone = settings['company.phone.primary']
    const whatsapp = settings['company.whatsapp.primary']
    return {
      phone,
      phoneHref: `tel:${normalizePhoneHref(phone)}`,
      whatsapp,
      whatsappUrl: `https://wa.me/${normalizeWhatsAppNumber(whatsapp)}`,
      email: 'info@pileperde.com.tr',
      addressLines: settings['company.address.showroom'].split(/\r?\n/).filter(Boolean),
      mapsUrl: settings['company.maps.url'],
      weekdayHours: settings['company.hours.weekday'],
      sundayHours: settings['company.hours.sunday'],
    }
  }, [settings])

  const resetTurnstile = () => {
    if (turnstileWidgetIdRef.current) {
      window.turnstile?.reset(turnstileWidgetIdRef.current)
    }
    setTurnstileToken('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) {
      return
    }

    const normalizedPhone = normalizeContactPhone(formData.phone, phoneCountry)
    const normalizedEmail = normalizeContactEmail(formData.email)
    const errors: FieldErrors = {}
    if (formData.name.trim().length < 2) {
      errors.name = 'Ad ve soyad alanını doldurunuz.'
    }
    if (!normalizedPhone) {
      errors.phone = PHONE_ERROR_MESSAGE
    }
    if (!normalizedEmail) {
      errors.email = EMAIL_ERROR_MESSAGE
    }
    if (formData.message.trim().length < 10) {
      errors.message = 'Mesajınızı en az 10 karakter olarak yazınız.'
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      const firstInvalidField = (['name', 'phone', 'email', 'message'] as const)
        .find((field) => errors[field])
      const refs = {
        name: nameInputRef,
        phone: phoneInputRef,
        email: emailInputRef,
        message: messageInputRef,
      }
      refs[firstInvalidField || 'name'].current?.focus()
      return
    }

    if (TURNSTILE_ENABLED && !turnstileToken) {
      setSubmitStatus('security')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    idempotencyKey.current ||= crypto.randomUUID()

    try {
      const response = await fetch('/api/public/contact-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: normalizedPhone,
          email: normalizedEmail,
          message: formData.message,
          sourcePage: window.location.pathname,
          turnstileToken: TURNSTILE_ENABLED ? turnstileToken : '',
          idempotencyKey: idempotencyKey.current,
          website: formData.website,
        }),
      })

      if (response.status === 429) {
        setSubmitStatus('rate-limit')
        return
      }
      if (response.status === 403) {
        setSubmitStatus('security')
        return
      }
      if (!response.ok) {
        setSubmitStatus('error')
        return
      }

      setSubmitStatus('success')
      setFormData({ name: '', phone: '', email: '', message: '', website: '' })
      setPhoneCountry('TR')
      setFieldErrors({})
      idempotencyKey.current = null
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      if (TURNSTILE_ENABLED) {
        resetTurnstile()
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
    if (submitStatus) {
      setSubmitStatus(null)
    }
    if (event.target.name in fieldErrors) {
      setFieldErrors((current) => ({
        ...current,
        [event.target.name]: undefined,
      }))
    }
  }

  return (
    <section className="relative bg-gradient-to-b from-black to-gray-950 py-16 lg:py-24">
      {TURNSTILE_ENABLED && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
        />
      )}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="mb-5 text-center text-sm font-light text-gray-300">
            {isEnglish
              ? 'Choose the contact method that suits you.'
              : 'Size uygun iletişim yöntemini seçin.'}
          </p>
          <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
            <a
              href={contactSettings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-700/50 bg-emerald-950/70 px-5 py-3 text-sm font-medium text-emerald-50 transition-colors hover:bg-emerald-900/80"
            >
              <span aria-hidden="true">◉</span>
              {isEnglish ? 'Contact us on WhatsApp' : 'WhatsApp’tan İletişim Kurun'}
            </a>
            <a
              href="mailto:info@pileperde.com.tr"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
            >
              <span aria-hidden="true">✉</span>
              {isEnglish ? 'Send an email' : 'E-posta Gönderin'}
            </a>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500">info@pileperde.com.tr</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="mb-4 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-6 backdrop-blur-md transition-all hover:border-white/20 lg:mb-6 lg:p-8">
              <h3 className="mb-3 text-lg font-extralight uppercase tracking-wider text-white lg:text-xl">Showroom</h3>
              <p className="mb-4 text-sm font-light text-gray-400 lg:text-base">
                {contactSettings.addressLines.map((line) => (
                  <span key={line}>{line}<br /></span>
                ))}
              </p>
              <Link
                href={contactSettings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 transition-colors hover:text-white lg:text-sm"
              >
                {isEnglish ? 'View on Google Maps' : 'Google Maps’te Görüntüle'}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {[
                {
                  title: isEnglish ? 'Telephone' : 'Telefon',
                  value: contactSettings.phone,
                  href: contactSettings.phoneHref,
                },
                {
                  title: 'WhatsApp',
                  value: contactSettings.whatsapp,
                  href: contactSettings.whatsappUrl,
                },
                {
                  title: isEnglish ? 'Email' : 'E-posta',
                  value: contactSettings.email,
                  href: `mailto:${contactSettings.email}`,
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-4 backdrop-blur-md sm:p-6 lg:p-8">
                  <h3 className="mb-3 text-sm font-extralight uppercase tracking-wider text-white sm:text-base lg:text-lg">{item.title}</h3>
                  <a href={item.href} className="break-all text-xs text-gray-400 transition-colors hover:text-white sm:text-sm lg:text-base">
                    {item.value}
                  </a>
                </div>
              ))}
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-4 backdrop-blur-md sm:p-6 lg:p-8">
                <h3 className="mb-3 text-sm font-extralight uppercase tracking-wider text-white sm:text-base lg:text-lg">
                  {isEnglish ? 'Opening Hours' : 'Çalışma Saatleri'}
                </h3>
                <p className="text-xs text-gray-400 sm:text-sm">{contactSettings.weekdayHours}</p>
                <p className="text-xs text-gray-400 sm:text-sm">{contactSettings.sundayHours}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-6 backdrop-blur-md sm:p-8 lg:p-10">
              <h3 className="mb-6 text-xl font-extralight uppercase tracking-wider text-white sm:text-2xl">
                {isEnglish ? 'Send an Enquiry' : 'Mesaj Gönderin'}
              </h3>

              {submitStatus === 'success' ? (
                <div role="status" className="rounded-xl border border-emerald-700/40 bg-emerald-950/30 p-5">
                  <p className="text-sm leading-6 text-emerald-100">
                    Mesajınız başarıyla alınmıştır. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                  </p>
                  <a
                    href={contactSettings.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-emerald-950 px-4 py-2 text-sm font-medium text-white"
                  >
                    Görüşmeyi WhatsApp’tan Sürdürün
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <input
                    ref={nameInputRef}
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute h-px w-px overflow-hidden opacity-0"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={isEnglish ? 'Full name' : 'Ad ve soyad'}
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-white placeholder:text-gray-600 focus:border-white/40 focus:outline-none"
                    required
                  />
                  {fieldErrors.name && (
                    <p className="-mt-4 text-xs text-red-400">{fieldErrors.name}</p>
                  )}
                  <div>
                    <div className="relative flex items-stretch border-b border-white/20 focus-within:border-white/40">
                      <button
                        type="button"
                        aria-label="Ülke kodu seçin"
                        aria-expanded={countryMenuOpen}
                        onClick={() => setCountryMenuOpen((current) => !current)}
                        className="flex min-w-24 items-center justify-center gap-2 border-r border-white/10 px-2 text-sm text-gray-300"
                      >
                        <span>{phoneCountry}</span>
                        <span>+{getCountryCallingCode(phoneCountry)}</span>
                        <span aria-hidden="true">⌄</span>
                      </button>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        inputMode="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={isEnglish ? 'Telephone' : 'Telefon'}
                        maxLength={32}
                        autoComplete="tel"
                        aria-invalid={Boolean(fieldErrors.phone)}
                        className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-white placeholder:text-gray-600 focus:outline-none"
                        required
                      />
                      {countryMenuOpen && (
                        <div className="absolute left-0 top-full z-30 mt-2 w-full max-w-sm rounded-xl border border-white/15 bg-gray-950 p-2 shadow-2xl">
                          <input
                            type="search"
                            value={countrySearch}
                            onChange={(event) => setCountrySearch(event.target.value)}
                            placeholder="Ülke veya kod ara"
                            className="mb-2 w-full rounded-lg border border-white/15 bg-black px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                            autoFocus
                          />
                          <div className="max-h-52 overflow-y-auto">
                            {filteredCountries.map((country) => (
                              <button
                                key={country}
                                type="button"
                                onClick={() => {
                                  setPhoneCountry(country)
                                  setCountryMenuOpen(false)
                                  setCountrySearch('')
                                  setFieldErrors((current) => ({
                                    ...current,
                                    phone: undefined,
                                  }))
                                  phoneInputRef.current?.focus()
                                }}
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                              >
                                <span>{countryDisplayNames.of(country) || country}</span>
                                <span className="text-gray-500">+{getCountryCallingCode(country)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {fieldErrors.phone && (
                      <p className="mt-2 text-xs text-red-400">{fieldErrors.phone}</p>
                    )}
                  </div>
                  <input
                    ref={emailInputRef}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={isEnglish ? 'Email' : 'E-posta'}
                    maxLength={160}
                    autoComplete="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-white placeholder:text-gray-600 focus:border-white/40 focus:outline-none"
                    required
                  />
                  {fieldErrors.email && (
                    <p className="-mt-4 text-xs text-red-400">{fieldErrors.email}</p>
                  )}
                  <textarea
                    ref={messageInputRef}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={isEnglish ? 'Your message' : 'Mesajınız'}
                    minLength={10}
                    maxLength={3000}
                    rows={5}
                    className="w-full resize-none border-0 border-b border-white/20 bg-transparent px-0 py-3 text-white placeholder:text-gray-600 focus:border-white/40 focus:outline-none"
                    required
                  />
                  {fieldErrors.message && (
                    <p className="-mt-4 text-xs text-red-400">{fieldErrors.message}</p>
                  )}

                  {TURNSTILE_ENABLED && (
                    <div
                      ref={turnstileContainerRef}
                      className="absolute h-px w-px overflow-hidden opacity-0"
                      aria-hidden="true"
                    />
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || (TURNSTILE_ENABLED && !turnstileToken)}
                    className="min-h-14 w-full bg-white px-5 py-4 font-medium text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting
                      ? (isEnglish ? 'Sending…' : 'Gönderiliyor…')
                      : (isEnglish ? 'Send message' : 'Mesajı Gönder')}
                  </button>

                  {submitStatus === 'rate-limit' && (
                    <p role="alert" className="text-center text-xs text-amber-300">
                      Kısa süre içinde çok fazla talep gönderdiniz. Lütfen biraz sonra tekrar deneyin.
                    </p>
                  )}
                  {submitStatus === 'security' && (
                    <p role="alert" className="text-center text-xs text-amber-300">
                      Güvenlik doğrulaması tamamlanamadı. Lütfen tekrar deneyin.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p role="alert" className="text-center text-xs text-red-400">
                      Mesajınız gönderilemedi. Lütfen biraz sonra tekrar deneyin.
                    </p>
                  )}

                  <p className="text-center text-xs leading-5 text-gray-500">
                    Formu göndererek iletişim talebinizin yanıtlanması amacıyla işlenmesini kabul etmiş olursunuz.{' '}
                    <Link href="/gizlilik-politikasi" className="underline hover:text-gray-300">
                      Gizlilik Politikası
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
