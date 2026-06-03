'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      question: "Ölçü alma ve montaj ücreti var mı?",
      answer: "Ankara içi ölçü alma ve montaj hizmetlerimiz ücretsizdir. Profesyonel ekibimiz evinize gelerek hassas ölçüm yapar ve perdelerinizi titizlikle monte eder."
    },
    {
      id: 2,
      question: "Sipariş teslim süresi ne kadar?",
      answer: "Standart siparişler için teslim süremiz 7-10 iş günüdür. Özel tasarım ve büyük projeler için bu süre değişkenlik gösterebilir. Size en başında net bir teslim tarihi verilir."
    },
    {
      id: 3,
      question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      answer: "Nakit, kredi kartı (tek çekim ve taksitli), havale/EFT ve kapıda ödeme seçeneklerimiz mevcuttur. Taksitli ödemede 12 aya kadar vade imkanı sunuyoruz."
    },
    {
      id: 4,
      question: "Kumaş ve model seçiminde yardım alabilir miyim?",
      answer: "Elbette! Uzman ekibimiz evinizin dekorasyonuna, kullanım alanına ve bütçenize uygun en doğru kumaş ve model seçiminde size rehberlik eder. Showroom'umuzda 500'den fazla kumaş çeşidimiz bulunmaktadır."
    },
    {
      id: 5,
      question: "Garanti koşullarınız nedir?",
      answer: "Tüm ürünlerimizde 2 yıl kumaş ve işçilik garantisi sunuyoruz. Motor ve mekanizma sistemlerinde bu süre 5 yıla kadar çıkmaktadır. Garanti kapsamı dışındaki durumlarda da uygun fiyatlarla servis hizmeti veriyoruz."
    },
    {
      id: 6,
      question: "Online sipariş verebilir miyim?",
      answer: "WhatsApp hattımızdan fotoğraf ve ölçü paylaşarak ön sipariş oluşturabilirsiniz. Ancak en doğru sonuç için showroom ziyareti veya evde ölçü hizmetimizi öneriyoruz. Kumaş numunelerini evinize getirebiliriz."
    },
    {
      id: 7,
      question: "Eski perdelerimi yenileyebilir misiniz?",
      answer: "Eski perdelerinizin durumuna göre tadilat, temizleme veya yeniden dikimi yapabiliyoruz. Ayrıca eski perdelerinizi değerlendirme ve yenisi ile değiştirme kampanyalarımız da mevcuttur."
    },
    {
      id: 8,
      question: "Kurumsal projeler için hizmet veriyor musunuz?",
      answer: "Evet, otel, hastane, okul, ofis gibi kurumsal projelere özel çözümler sunuyoruz. Toplu alımlarda özel fiyatlandırma, proje bazlı üretim ve profesyonel proje yönetimi hizmetlerimiz mevcuttur."
    }
  ]

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id)
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-950 via-black to-gray-950 relative overflow-hidden">
      {/* Dark Glassmorphism Background Pattern - FAQ Unique */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-950/5 via-gray-950 to-black" />
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.01) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255,255,255,0.01) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0.8, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: false, amount: 0.1 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span className="w-12 h-[1px] bg-gray-700"></span>
              <span className="uppercase tracking-[0.2em] font-light">SIKÇA SORULAN SORULAR</span>
              <span className="w-12 h-[1px] bg-gray-700"></span>
            </div>
          </div>
          <h2 className="text-3xl lg:text-5xl font-extralight text-white mb-4">
            Merak <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Edilenler</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Sizden gelen soruları yanıtladık
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: false, amount: 0.1 }}
              className="mb-4"
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 group">
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-6 lg:px-8 py-5 lg:py-6 text-left flex items-center justify-between hover:bg-white/[0.05] transition-colors duration-300"
                >
                  <h3 className="text-white font-extralight text-lg pr-4 uppercase tracking-wider">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ${
                      openQuestion === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openQuestion === faq.id ? 'auto' : 0,
                    opacity: openQuestion === faq.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 lg:px-8 pb-5 lg:pb-6">
                    <p className="text-gray-400 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0.8, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: false, amount: 0.1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">Başka sorularınız mı var?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905335127272"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-black overflow-hidden transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="relative z-10 font-medium">WhatsApp&apos;tan Sor</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </a>
            <a
              href="tel:+903122417272"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Hemen Ara</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ