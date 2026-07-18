'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const Testimonials = ({ locale = 'tr' }: { locale?: 'tr' | 'en' }) => {
  const isEnglish = locale === 'en'
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const turkishReviews = [
    {
      id: 1,
      name: "Züleyha Akduman",
      date: "bir hafta önce",
      rating: 5,
      comment: "Gerçekten uzun zamandır sonucun mükemmel olması için çabalayan ve her aşamada bilgi veren, ilgilenen, ölçülü saygı ve samimiyetini koruyan bir işletme görmedim. Bir aile işletmesi olan Pile Perdenin güleryüzlü sabırlı yaklaşımı, ürün teslim ve montajında gösterdiği titizliği için Burak beye çok teşekkür ederim. Zor bir alanda mükemmel malzeme ve işçilik için de ayrıca teşekkür ederim."
    },
    {
      id: 2,
      name: "Berk Ayan",
      date: "2 ay önce",
      rating: 5,
      comment: "Burak bey çok kibar, perde seçimimde ve fiyatlarda yardımcı oldu. Perdeler belirtilen sürede, dikişleri çok düzgün hazırlanmış şekilde teslim edildi. Ölçü almada ve montajda bizimle ilgilenen ve temiz çalışan Mustafa beye de ayrıca teşekkür ediyorum."
    },
    {
      id: 3,
      name: "Ayten Oz",
      date: "3 ay önce",
      rating: 5,
      comment: "Her zevke ve bütçeye uygun oldukça geniş yelpazede kaliteli perde seçenekleri sunan, profesyonel ve güvenilir bir adres. Evimizin fotoğrafları üzerinden yapılan yönlendirmeler, yerinde ölçüm ve değerlendirme süreciyle birlikte Necla Hanım ve Burak Bey'in zarif ve isabetli önerileri sayesinde seçim süreci çok kolaylaştı. Dikimlerdeki, ölçülerdeki titizlik ve zamanında teslimat da sürece ayrı bir memnuniyet kattı. Baştan sona kusursuz bir hizmet aldık, gönül rahatlığıyla tavsiye ederim."
    },
    {
      id: 4,
      name: "Ceren Fatma Köksal Algın",
      date: "6 ay önce",
      rating: 5,
      comment: "Merhabalar, Pile Perde'yi Google yorumlarını okuyarak tercih ettiğim için, ben de yorum yaparak katkı sağlamak istedim. Mağazaya ilk gittiğimizde randevu alarak gittik, Burak Bey de sağolsun ilk görüşmede bize oldukça uzun zaman ayırdı, merak ettiğim tüm perde çeşitlerine baktık ve detaycı bir insan olduğum için önceden hazırladığım soruları sordum. Ancak ben biraz daha düşünmek istediğimi siparişleri geçmemesini istedim, birkaç değişiklikle tam kararımı verdikten sonra siparişleri geçtik. Buraya kısaca yazdım ama teknik olarak da öğrenmeyi sevdiğim için perde ölçüm montaj kumaşlar vs merak ettiğim herşeyi sordum:) Karar verme aşamasında tüm sorularımı sabırla yanıtladığı için de Burak Bey'e tesekkur ederim. Ekip arkadaşlarına da isimleri yanlış hatırlamıyorsam, Mustafa, Mert, Umut tesekkur ederim, ölçü ve montaj aşamalarının hepsinde tam zamanında geldiler ve çok temiz çalıştılar. Perdeler tam istediğim gibi oldu, evin tavan yüksekliği fazla olduğu için buna yönelik çözüm üretmemiz gerekti, bu aşamalarda herşeye birlikte karar verdik ve gerçekten içimize sinen perdeler çıktı ortaya. Perdeler takılınca ev eve benzedi:) Perde yaptırmayı düşünen herkese gönül rahatlığıyla tavsiye ederim. Birkaç fotoğraf ekliyorum, telefonumun kamerasından dolayı fotoğrafların kalitesi çok iyi olmasa da fikir verecektir. Pile Perde'ye uzun yıllar sağlıkla, huzurlu kazançlı işler dileriz. Ceren&Ahmet"
    },
    {
      id: 5,
      name: "Güldalı Kılıç",
      date: "6 ay önce",
      rating: 5,
      comment: "2024 Haziran ayında kendilerinden hizmet aldım. Kendilerini google üzerinden buldum. İyi ki de yollarımız kesişmiş ve tüm evimizin perdeleriniz size yaptırmışız. Geç yorum yazdığım için affınıza sığınırız 😇🙏🏼 Burak Bey ve ekibi o kadar özverili, titiz ve tüm isteklerimizi detaylarıyla dinleyip her konuda bize yardımcı oldular. Gerek mağazalarındaki perde çeşitliliği gerekse işçilikleri mükemmel. Ayrıca evimizde bulunmayan korniş konusunda da ayrıca yardımcı olması üzerimizdeki yükü ayrıca hafifletmiş oldu. Çevremizdekilere gönül rahatlıyla tavsiyelerimizi yapıyoruz. Tüm ekibin emekleri için teşekkürler."
    },
    {
      id: 6,
      name: "Elif Özdil Pelvan",
      date: "7 ay önce",
      rating: 5,
      comment: "Evimizin balkon jaluzilerini, salon fonunu ve perdesini yaptırdık. Burak bey çok ilgiliydi tam söyleyenen sürede teslim etti tahmin ettiğimden çok daha güzel ve modern durdu. Yapılan dikişler, montaj yapan arkadaşların kibarlığı, kumaşların kalitesi çok güzeldi. Son dönemde hiç bu kadar ilgili firma görmemiştim. Çok içime sinen memnun kaldığım bir iş oldu…"
    }
  ]
  const reviews = isEnglish ? [
    { id: 1, name: 'Züleyha Akduman', date: 'a week ago', rating: 5, comment: 'The team worked tirelessly to achieve an excellent result and kept us informed throughout. Pile Perde combines warmth and courtesy with meticulous delivery and installation. My thanks to Burak and the team for the superb materials and workmanship in a particularly challenging space.' },
    { id: 2, name: 'Berk Ayan', date: '2 months ago', rating: 5, comment: 'Burak was exceptionally courteous and helped with both the curtain selection and pricing. The curtains were delivered on schedule and beautifully made. Mustafa also handled the measuring and installation with great care and worked very cleanly.' },
    { id: 3, name: 'Ayten Oz', date: '3 months ago', rating: 5, comment: 'A professional and dependable company offering an extensive range of quality curtains for different tastes and budgets. Necla and Burak made the selection process straightforward with thoughtful advice, accurate measuring and careful assessment. The making, fit and punctual delivery were all excellent.' },
    { id: 4, name: 'Ceren Fatma Köksal Algın', date: '6 months ago', rating: 5, comment: 'We chose Pile Perde after reading their Google reviews. Burak gave us generous time, answered every technical question and helped us refine the design without pressure. The measuring and installation team arrived exactly when promised and worked very cleanly. They also developed an excellent solution for our unusually high ceilings; the finished curtains made the house feel complete.' },
    { id: 5, name: 'Güldalı Kılıç', date: '6 months ago', rating: 5, comment: 'We are delighted that we entrusted the curtains throughout our home to Pile Perde. Burak and his team listened carefully to every request and approached the work with remarkable dedication. The showroom selection, workmanship and help with the missing curtain tracks were all excellent.' },
    { id: 6, name: 'Elif Özdil Pelvan', date: '7 months ago', rating: 5, comment: 'Pile Perde made the Venetian blinds for our balcony as well as the sheers and decorative curtains for our living room. Delivery was exactly on time and the result looks even more elegant and contemporary than expected. The sewing, fabrics and considerate installation team were all excellent.' },
  ] : turkishReviews

  const toggleExpand = (id: number) => {
    setExpandedReview(expandedReview === id ? null : id)
  }

  const ReviewCard = ({ review, index }: { review: typeof reviews[0], index: number }) => {
    const isLongText = review.comment.length > 200
    const isExpanded = expandedReview === review.id
    const displayText = isLongText && !isExpanded
      ? review.comment.substring(0, 200) + '...'
      : review.comment

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: !isMobile ? index * 0.1 : 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-md border border-white/10 p-6 lg:p-8 flex flex-col hover:border-white/20 transition-all duration-500 h-full group"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-white font-extralight text-lg uppercase tracking-wider">{review.name}</h4>
            <p className="text-xs text-gray-500 mt-1">{review.date}</p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? 'text-yellow-500' : 'text-gray-700'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Comment */}
        <p className="text-gray-300 font-light leading-relaxed flex-grow text-sm">
          {displayText}
        </p>

        {/* Show More/Less Button */}
        {isLongText && (
          <button
            onClick={() => toggleExpand(review.id)}
            className="mt-4 text-left text-gray-500 hover:text-white text-sm transition-colors"
          >
            {isExpanded ? (isEnglish ? 'Show less' : 'Daha az göster') : (isEnglish ? 'Read more' : 'Devamını oku')}
          </button>
        )}

        {/* Google Logo */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <svg className="w-16 h-5 opacity-30" viewBox="0 0 74 24" fill="none">
            <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4"/>
            <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335"/>
            <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.5 3.1 3.54.01 2.03-1.36 3.5-3.1 3.5z" fill="#FBBC05"/>
            <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#34A853"/>
            <path d="M58 .24h2.51v17.57H58z" fill="#4285F4"/>
            <path d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z" fill="#EA4335"/>
          </svg>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-zinc-950 via-gray-950 to-black relative overflow-hidden">
      {/* Dark Glassmorphism Background Pattern - Testimonials Unique */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-950/10 via-gray-950 to-black" />
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span className="w-12 h-[1px] bg-gray-700"></span>
              <span className="uppercase tracking-[0.2em] font-light">{isEnglish ? 'GOOGLE REVIEWS' : 'MÜŞTERİ YORUMLARI'}</span>
              <span className="w-12 h-[1px] bg-gray-700"></span>
            </div>
          </div>
          <h2 className="text-3xl lg:text-5xl font-extralight text-white mb-4">
            {isEnglish ? 'What Our Clients Say' : 'Müşterilerimizin Görüşleri'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            {isEnglish ? 'Genuine client experiences shared on Google.' : 'Google yorumlarından alınan gerçek müşteri deneyimleri'}
          </p>
        </motion.div>

        {/* Mobile Swiper */}
        {isMobile ? (
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1.1}
              centeredSlides={true}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-white/30',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-white'
              }}
              className="testimonials-swiper !pb-12"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={review.id}>
                  <ReviewCard review={review} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          /* Desktop/Tablet Grid */
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        )}

        {/* View All Reviews Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.google.com/maps/place/P%C4%B0LE+PERDE/@39.8752992,32.6844767,17z/data=!4m8!3m7!1s0x14d338c50377986b:0xd2381072f95bdeac!8m2!3d39.8752992!4d32.6870516!9m1!1b1!16s%2Fg%2F12hmslvwp"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 font-medium">{isEnglish ? 'View All Reviews on Google' : <>Tüm Yorumları Google&apos;da Görüntüle</>}</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          opacity: 1;
        }
      `}</style>
    </section>
  )
}

export default Testimonials
