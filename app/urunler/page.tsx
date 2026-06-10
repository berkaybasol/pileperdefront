import type { Metadata } from "next";
import Products from "@/components/Products";
import { getCmsPageMetadata } from "@/lib/cmsMetadata";
import { defaultProductCatalogText, getPublicProductCatalogContent } from "@/lib/catalogContent";

const fallbackMetadata: Metadata = {
  title: "Ürünlerimiz - Pile Perde",
  description: "Pile Perde ürün kataloğu, perde modelleri ve çeşitleri",
};

export const generateMetadata = () => getCmsPageMetadata("products", fallbackMetadata);

export default async function ProductsPage() {
  const catalogContent = await getPublicProductCatalogContent();
  const pageTitle = catalogContent.eyebrow || defaultProductCatalogText.eyebrow;
  const pageDescription = catalogContent.description || defaultProductCatalogText.description;

  return (
    <main>
      <div>
        <div className="bg-gradient-to-b from-gray-900 to-black py-16 px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-extralight text-white text-center">{pageTitle}</h1>
            <p className="text-gray-400 text-center mt-4 text-lg font-light">{pageDescription}</p>
          </div>
        </div>
        <Products showSwiper={false} />
      </div>
    </main>
  );
}
