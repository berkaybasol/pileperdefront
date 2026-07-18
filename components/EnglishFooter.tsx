import Image from 'next/image'
import Link from 'next/link'

const footerLinkClass = 'flex min-h-11 items-center text-sm font-light text-gray-500 transition-colors hover:text-white'

export default function EnglishFooter() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-black to-gray-950 pb-8 pt-20 text-white [&_a]:min-h-11">
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/en" className="inline-block"><Image src="/pile_perde_logo-1.png" alt="Pile Perde" width={160} height={55} className="h-12 w-auto" /></Link>
            <p className="mb-8 mt-6 max-w-md text-sm font-light leading-relaxed text-gray-400">Over 35 years of expertise in bespoke curtains, blinds, motorised window treatments and interior textiles, professionally specified and installed in Ankara.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:contents">
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-sm font-light uppercase tracking-[.2em]">Quick Links</h2>
              <nav className="flex flex-col gap-3"><Link className={footerLinkClass} href="/en">Home</Link><Link className={footerLinkClass} href="/en/about">About</Link><Link className={footerLinkClass} href="/en/journal">Journal</Link><Link className={footerLinkClass} href="/en/faq">FAQ</Link><Link className={footerLinkClass} href="/en/contact">Contact</Link></nav>
            </div>
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-sm font-light uppercase tracking-[.2em]">Products</h2>
              <nav className="flex flex-col gap-3"><Link className={footerLinkClass} href="/en/products/blinds-and-shades">Made-to-Measure Blinds</Link><Link className={footerLinkClass} href="/en/products/sheer-and-drapery">Sheer & Decorative Curtains</Link><Link className={footerLinkClass} href="/en/products/motorised-window-treatments">Motorised Window Treatments</Link><Link className={footerLinkClass} href="/en/products/curtain-accessories">Curtain Accessories</Link></nav>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-6 text-sm font-light uppercase tracking-[.2em]">Contact</h2>
            <div className="space-y-4 text-sm font-light text-gray-500"><a className="block hover:text-white" href="tel:+903122417272">+90 (312) 241 72 72</a><a className="block break-all hover:text-white" href="mailto:info@pileperde.com.tr">info@pileperde.com.tr</a><address className="not-italic leading-6">Prof. Dr. Ahmet Taner Kışlalı Mah.<br />Bangabandhu Boulevard No:94 H<br />06810 Çayyolu, Çankaya, Ankara</address><div className="border-t border-white/10 pt-4"><p className="mb-2 text-xs uppercase tracking-wider text-gray-600">Opening Hours</p><p>Monday–Saturday: 10:00–19:30</p><p>Sunday: Closed</p></div></div>
          </div>
        </div>
        <section className="border-t border-white/10 py-12" aria-labelledby="newsletter-heading-en">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="text-center lg:text-left">
              <h2 id="newsletter-heading-en" className="mb-2 text-lg font-extralight text-white">Stay Up to Date</h2>
              <p className="text-sm font-light text-gray-500">Be the first to hear about new collections and offers.</p>
            </div>
            <form className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <label htmlFor="newsletter-email-en" className="sr-only">Email address</label>
              <input id="newsletter-email-en" type="email" autoComplete="email" placeholder="Your email address" className="min-h-12 w-full rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-light text-white placeholder:text-gray-600 focus:border-white/30 focus:outline-none sm:min-w-72" />
              <button type="submit" className="min-h-12 rounded-lg bg-white px-8 py-3 font-medium text-black transition hover:bg-gray-100">Subscribe</button>
            </form>
          </div>
        </section>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-gray-600 md:flex-row"><span>© {currentYear} Pile Perde. All rights reserved.</span><span className="flex gap-4"><Link href="/en/privacy-policy">Privacy Policy</Link><Link href="/en/terms-of-use">Terms of Use</Link></span></div>
      </div>
    </footer>
  )
}
