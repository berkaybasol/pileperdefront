import Link from 'next/link'

import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

const canonicalUrl = 'https://pileperde.com.tr/perde-modelleri/villa-perde-modelleri'

const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
  { name: 'Villa Perde Modelleri', url: '/perde-modelleri/villa-perde-modelleri' },
]

const solutions = [
  {
    title: 'Villa salonu tül ve fon perdeleri',
    description: 'Salonun mimarisi, gün ışığı ve mobilya dili birlikte değerlendirilerek dökümlü tüller, katmanlı fonlar ve özel dikim detayları planlanır.',
    href: '/urunler/tul-fon-perde',
    linkLabel: 'Tül ve fon perde seçenekleri',
  },
  {
    title: 'Yüksek tavan ve galeri perde çözümleri',
    description: 'Geniş cam yüzeylerde doğru kumaş gramajı, güvenli ray sistemi ve kusursuz pile oranıyla mekânın yüksekliği dengelenir.',
    href: '/model-perdeler/yuksek-tavanli-galeri-perde',
    linkLabel: 'Yüksek tavan perde çözümleri',
  },
  {
    title: 'Motorlu perde sistemleri',
    description: 'Ulaşılması güç pencereler için uzaktan kumanda ve akıllı ev senaryolarına uygun sessiz motorlu villa perdesi sistemleri uygulanır.',
    href: '/urunler/motorlu-perdeler',
    linkLabel: 'Motorlu perde sistemleri',
  },
  {
    title: 'Blackout ve güneş kontrolü',
    description: 'Yatak odası, sinema odası ve yoğun güneş alan cephelerde karartma, ısı ve parlamayı kontrol eden katmanlı çözümler geliştirilir.',
    href: '/urunler/mekanizmali-perdeler/stor-perde/karartma-stor-perde',
    linkLabel: 'Karartma stor perdeler',
  },
]

const projectAreas = [
  'Salon ve yaşam alanı',
  'Galeri ve yüksek tavan',
  'Yatak odası ve blackout',
  'Motorlu perde uygulaması',
]

const processSteps = [
  ['01', 'Keşif ve ihtiyaç analizi', 'Pencere ölçüleri, tavan yapısı, cephe yönü ve kullanım alışkanlıkları yerinde değerlendirilir.'],
  ['02', 'Villa perde tasarımı', 'Kumaş, renk, pile, ray ve otomasyon seçenekleri iç mimariyle birlikte kurgulanır.'],
  ['03', 'Ölçüye özel üretim', 'Onaylanan özel tasarım perde, her açıklığa uygun ölçülerle kontrollü olarak hazırlanır.'],
  ['04', 'Profesyonel uygulama', 'Montaj, motor ayarları ve son kontroller uzman ekip tarafından tamamlanır.'],
]

function ImagePlaceholder({ label, fileName }: { label: string; fileName: string }) {
  return (
    <div className="group relative flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-800/60 via-neutral-900 to-black p-8 text-center">
      <div className="absolute inset-5 rounded-xl border border-dashed border-white/15" />
      <div className="relative">
        <svg className="mx-auto mb-5 h-10 w-10 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M6.75 21h10.5A2.25 2.25 0 0 0 19.5 18.75V5.25A2.25 2.25 0 0 0 17.25 3H6.75A2.25 2.25 0 0 0 4.5 5.25v13.5A2.25 2.25 0 0 0 6.75 21Z" />
        </svg>
        <p className="text-sm font-light text-neutral-300">{label}</p>
        <p className="mt-2 text-xs tracking-wide text-neutral-600">Önerilen dosya: {fileName}</p>
      </div>
    </div>
  )
}

export default function VillaPerdeModelleriPage() {
  return (
    <main className="overflow-hidden bg-black text-white">
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />

      <section className="relative border-b border-white/5 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/35 via-black to-black" />
        <div className="container relative mx-auto px-6 lg:px-12">
          <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-10" />
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-neutral-400">Villalara özel perde tasarımı</p>
            <h1 className="text-4xl font-extralight leading-tight md:text-5xl lg:text-6xl">
              Villa Perde Modelleri ve Özel Tasarım Çözümleri
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base font-light leading-8 text-neutral-400 md:text-lg">
              Ankara’daki villalar için estetik, ışık kontrolü ve kullanım konforunu aynı projede birleştiren ölçüye özel perde çözümleri tasarlıyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto grid items-center gap-10 px-6 lg:grid-cols-2 lg:px-12">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">Mimariye göre tasarım</p>
            <h2 className="text-3xl font-extralight md:text-4xl">Her villaya özel, bütüncül perde planlaması</h2>
            <div className="mt-6 space-y-5 font-light leading-8 text-neutral-400">
              <p>
                Villa perde modelleri seçilirken yalnızca kumaşa değil; tavan yüksekliğine, cam oranına, gün ışığına ve mekânın dekorasyon çizgisine birlikte bakılır. Böylece tül, fon, blackout ve mekanizma katmanları birbiriyle uyumlu çalışır.
              </p>
              <p>
                Çayyolu, Beytepe ve İncek’te çağdaş villa projelerine; Bilkent ve Gölbaşı çevresindeki farklı mimari yapılara yerinde keşif ve ölçülendirme desteği sunuyoruz. Her Ankara villa perdesi projesini kendi ihtiyaçlarına göre ele alıyoruz.
              </p>
            </div>
          </div>
          <ImagePlaceholder label="Villa salonu ana proje görseli" fileName="villa-perde-modelleri-ankara-hero.webp" />
        </div>
      </section>

      <section className="border-y border-white/5 bg-neutral-950/70 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">Villa perde çözümleri</p>
            <h2 className="text-3xl font-extralight md:text-4xl">Konfor, ışık kontrolü ve tasarım bir arada</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {solutions.map((solution) => (
              <article key={solution.title} className="rounded-2xl border border-white/10 bg-black/40 p-7 md:p-9">
                <h3 className="text-xl font-light md:text-2xl">{solution.title}</h3>
                <p className="mt-4 font-light leading-7 text-neutral-400">{solution.description}</p>
                <Link href={solution.href} className="mt-6 inline-flex min-h-11 items-center text-sm text-neutral-200 underline decoration-neutral-600 underline-offset-8 transition-colors hover:text-white">
                  {solution.linkLabel}
                  <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">Uçtan uca hizmet</p>
              <h2 className="text-3xl font-extralight md:text-4xl">Ölçüye özel üretim ve profesyonel uygulama</h2>
              <p className="mt-6 font-light leading-8 text-neutral-400">
                Tek bir salon penceresinden tüm villanın perde planlamasına kadar süreç; tasarım, ölçü, üretim ve montaj adımlarıyla kontrollü biçimde yürütülür.
              </p>
              <Link href="#villa-projeleri" className="mt-7 inline-flex min-h-11 items-center rounded-full border border-white/20 px-6 text-sm transition-colors hover:bg-white hover:text-black">
                Villa projelerimizi inceleyin
              </Link>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {processSteps.map(([number, title, description]) => (
                <li key={number} className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <span className="text-xs tracking-[0.2em] text-neutral-600">{number}</span>
                  <h3 className="mt-5 text-lg font-light">{title}</h3>
                  <p className="mt-3 text-sm font-light leading-6 text-neutral-400">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="villa-projeleri" className="scroll-mt-20 border-y border-white/5 bg-neutral-950/70 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">Proje galerisi</p>
              <h2 className="text-3xl font-extralight md:text-4xl">Gerçek villa projelerinden örnekler</h2>
            </div>
            <p className="max-w-lg text-sm font-light leading-7 text-neutral-500">
              Bu alanlar Pile Perde tarafından tamamlanan ve yayın izni alınan villa proje fotoğrafları için hazırlandı.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {projectAreas.map((area, index) => (
              <ImagePlaceholder key={area} label={area} fileName={`villa-perde-projesi-${index + 1}.webp`} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 text-center lg:px-12">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black px-6 py-12 md:px-12 md:py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Villa projenizi konuşalım</p>
            <h2 className="mt-5 text-3xl font-extralight md:text-4xl">Mekânınıza uygun perde çözümünü birlikte tasarlayalım</h2>
            <p className="mx-auto mt-5 max-w-2xl font-light leading-8 text-neutral-400">
              Ankara ve çevresinde keşif, özel tasarım, üretim ve profesyonel uygulama için Pile Perde ekibiyle iletişime geçin.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/iletisim" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-sm text-black transition-colors hover:bg-neutral-200">
                İletişime geçin
              </Link>
              <Link href="/perde-modelleri" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-8 text-sm transition-colors hover:border-white">
                Tüm perde modelleri
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
