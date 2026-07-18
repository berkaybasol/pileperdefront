import Contact from "@/components/Contact";
import { BreadcrumbListJsonLd } from "@/components/BreadcrumbListJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { turkishLocaleAlternates } from "@/lib/siteLocales";

const canonicalUrl = "https://pileperde.com.tr/iletisim";
const breadcrumbItems: BreadcrumbItem[] = [
  { name: "Ana Sayfa", url: "/" },
  { name: "İletişim", url: "/iletisim" },
];

export const metadata = {
  title: "İletişim - Pile Perde Ankara Çayyolu",
  description: "Pile Perde ile iletişime geçin. Ankara Çayyolu, Beytepe, Bilkent, Yaşamkent, Ümitköy bölgelerinde ücretsiz keşif ve ölçüm hizmeti. ☎️ 0312 241 72 72",
  alternates: turkishLocaleAlternates('/iletisim'),
};

export default function ContactPage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      <div>
        {/* Page Title - Dark Glassmorphism Style */}
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black" />
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
          </div>
          <div className="relative container mx-auto px-6 py-20">
            <div className="text-center">
              <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-8" />
              <div className="inline-block mb-4">
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="w-12 h-[1px] bg-gray-700"></span>
                  <span className="uppercase tracking-[0.2em] font-light">BİZE ULAŞIN</span>
                  <span className="w-12 h-[1px] bg-gray-700"></span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-extralight text-white mb-4">İletişim</h1>
              <p className="text-gray-400 font-light text-base">Size en yakın mağazamızı ziyaret edin</p>
            </div>
          </div>
        </section>
        <Contact />
      </div>
    </main>
  );
}
