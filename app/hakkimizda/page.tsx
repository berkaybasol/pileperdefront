import type { Metadata } from "next";
import About from "@/components/About";
import AboutPageHero from "@/components/AboutPageHero";
import { getCmsPageMetadata } from "@/lib/cmsMetadata";

const fallbackMetadata: Metadata = {
  title: "Hakkımızda - 35 Yıllık Deneyim",
  description: "35 yıllık deneyim ile Ankara'da perde, jaluzi ve dekorasyon hizmetleri. Beytepe, Bilkent, Yaşamkent, Çayyolu, Ümitköy bölgelerinde profesyonel hizmet.",
};

export const generateMetadata = () => getCmsPageMetadata("about", fallbackMetadata);

export default function AboutPage() {
  return (
    <main>
      <div>
        <AboutPageHero />
        <About />
      </div>
    </main>
  );
}
