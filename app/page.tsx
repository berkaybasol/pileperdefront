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
import {
  getPublicCorporatePageContent,
  getPublicModelsPageContent,
  getPublicProductsPageContent,
} from "@/lib/catalogContent";

const fallbackMetadata: Metadata = {
  title: "Pile Perde Ankara Çayyolu - Perde, Jaluzi, Stor Perde",
  description: "Pile Perde Ankara Çayyolu showroom, perde modelleri ve ölçü hizmetleri.",
};

export const generateMetadata = async () => ({
  ...(await getCmsPageMetadata("home", fallbackMetadata)),
  alternates: turkishLocaleAlternates('/'),
});

export default async function Home() {
  const [productsContent, modelsContent, corporateContent] = await Promise.all([
    getPublicProductsPageContent(),
    getPublicModelsPageContent(),
    getPublicCorporatePageContent(),
  ]);

  return (
    <CmsPageBoundary pageKey="home">
      <BusinessStructuredData />
      <Hero />
      <Products
        initialItems={productsContent.items}
        initialCopy={{
          heroTitle: productsContent.heroTitle,
          heroSubtitle: productsContent.heroSubtitle,
          sectionEyebrow: productsContent.sectionEyebrow,
          sectionTitle: productsContent.sectionTitle,
          sectionDescription: productsContent.sectionDescription,
        }}
      />
      <Models initialItems={modelsContent.items} initialCopy={modelsContent} />
      <Corporate initialItems={corporateContent.items} initialCopy={corporateContent} />
      <About />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
    </CmsPageBoundary>
  );
}
