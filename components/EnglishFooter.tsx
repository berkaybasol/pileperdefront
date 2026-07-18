import Image from 'next/image'
import Link from 'next/link'

export default function EnglishFooter() {
  return <footer className="border-t border-white/10 bg-black px-6 py-14 text-white">
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
      <div><Image src="/pile_perde_logo-1.png" alt="Pile Perde window treatment studio" width={140} height={48} className="h-10 w-auto" /><p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">Over 35 years of expertise in bespoke curtains, blinds, motorised window treatments and interior textiles, professionally specified and installed in Ankara.</p></div>
      <div><h2 className="text-sm font-medium uppercase tracking-widest">Explore</h2><nav className="mt-5 flex flex-col gap-3 text-sm text-gray-400"><Link href="/en/about">About</Link><Link href="/en/products">Products</Link><Link href="/en/curtain-designs">Curtain Designs</Link><Link href="/en/commercial">Commercial</Link><Link href="/en/journal">Journal</Link><Link href="/en/faq">FAQ</Link><Link href="/en/contact">Contact</Link></nav></div>
      <div><h2 className="text-sm font-medium uppercase tracking-widest">Contact</h2><div className="mt-5 space-y-3 text-sm text-gray-400"><p>Prof. Dr. Ahmet Taner Kışlalı Mah., Bangabandhu Boulevard No:94 H, 06810 Çayyolu, Çankaya, Ankara</p><a className="block" href="tel:+903122417272">+90 (312) 241 72 72</a><a className="block" href="mailto:info@pileperde.com.tr">info@pileperde.com.tr</a></div></div>
    </div>
    <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Pile Perde. All rights reserved.</span><span className="flex gap-4"><Link href="/en/privacy-policy">Privacy Policy</Link><Link href="/en/terms-of-use">Terms of Use</Link></span></div>
  </footer>
}
