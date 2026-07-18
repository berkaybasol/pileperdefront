import type { Metadata } from "next";
import { BreadcrumbListJsonLd } from "@/components/BreadcrumbListJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import Products from "@/components/Products";
import { getPublicProductsPageContent } from "@/lib/catalogContent";
import { getCmsPageMetadata } from "@/lib/cmsMetadata";
import { turkishLocaleAlternates } from "@/lib/siteLocales";

const canonicalUrl = 'https://pileperde.com.tr/urunler';
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
];
const fallbackMetadata: Metadata = {
  title: "Ürünlerimiz - Pile Perde",
  description: "Pile Perde ürün kataloğu, perde modelleri ve çeşitleri",
};

export const generateMetadata = async () => ({
  ...(await getCmsPageMetadata("products", fallbackMetadata)),
  alternates: turkishLocaleAlternates('/urunler', '/en/products'),
});

export default async function ProductsPage() {
  const productsPageContent = await getPublicProductsPageContent();

  return (
    <main>
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      <div>
        <div className="bg-gradient-to-b from-gray-900 to-black py-16 px-6">
          <div className="container mx-auto">
            <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-8" />
            <h1 className="text-4xl md:text-5xl font-extralight text-white text-center">{productsPageContent.heroTitle}</h1>
            <p className="text-gray-400 text-center mt-4 text-lg font-light">{productsPageContent.heroSubtitle}</p>
          </div>
        </div>
        <Products
          showSwiper={false}
          initialItems={productsPageContent.items}
          initialCopy={{
            heroTitle: productsPageContent.heroTitle,
            heroSubtitle: productsPageContent.heroSubtitle,
            sectionEyebrow: productsPageContent.sectionEyebrow,
            sectionTitle: productsPageContent.sectionTitle,
            sectionDescription: productsPageContent.sectionDescription,
          }}
        />
      </div>
    </main>
  );
}
