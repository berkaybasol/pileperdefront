import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Products from "@/components/Products";
import Models from "@/components/Models";
import Corporate from "@/components/Corporate";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import { BusinessStructuredData } from "@/components/StructuredData";
import CmsPageBoundary from "@/components/CmsPageBoundary";
import { getCmsPageMetadata } from "@/lib/cmsMetadata";
import { turkishLocaleAlternates } from "@/lib/siteLocales";

const fallbackMetadata: Metadata = {
  title: "Pile Perde Ankara Çayyolu - Perde, Jaluzi, Stor Perde",
  description: "Pile Perde Ankara Çayyolu showroom, perde modelleri ve ölçü hizmetleri.",
};

export const generateMetadata = async () => ({
  ...(await getCmsPageMetadata("home", fallbackMetadata)),
  alternates: turkishLocaleAlternates('/'),
});

export default function Home() {
  return (
    <CmsPageBoundary pageKey="home">
      <BusinessStructuredData />
      <Hero />
      <Products />
      <Models />
      <Corporate />
      <About />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
    </CmsPageBoundary>
  );
}
