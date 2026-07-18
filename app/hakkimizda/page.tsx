import type { Metadata } from "next";
import About from "@/components/About";
import AboutPageHero from "@/components/AboutPageHero";
import { BreadcrumbListJsonLd } from "@/components/BreadcrumbListJsonLd";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { getCmsPageMetadata } from "@/lib/cmsMetadata";
import { turkishLocaleAlternates } from "@/lib/siteLocales";

const canonicalUrl = "https://pileperde.com.tr/hakkimizda";
const breadcrumbItems: BreadcrumbItem[] = [
  { name: "Ana Sayfa", url: "/" },
  { name: "Hakkımızda", url: "/hakkimizda" },
];

const fallbackMetadata: Metadata = {
  title: "Hakkımızda - 35 Yıllık Deneyim",
  description: "35 yıllık deneyim ile Ankara'da perde, jaluzi ve dekorasyon hizmetleri. Beytepe, Bilkent, Yaşamkent, Çayyolu, Ümitköy bölgelerinde profesyonel hizmet.",
};

export const generateMetadata = async () => ({
  ...(await getCmsPageMetadata("about", fallbackMetadata)),
  alternates: turkishLocaleAlternates('/hakkimizda'),
});

export default function AboutPage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      <div>
        <AboutPageHero breadcrumbItems={breadcrumbItems} canonicalUrl={canonicalUrl} />
        <About showCta={false} />
      </div>
    </main>
  );
}
