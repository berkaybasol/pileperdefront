import Models from "@/components/Models";
import { BreadcrumbListJsonLd } from "@/components/BreadcrumbListJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { getPublicModelsPageContent } from "@/lib/catalogContent";
import { getCmsPageMetadata } from "@/lib/cmsMetadata";

const canonicalUrl = 'https://pileperde.com.tr/perde-modelleri';
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
];
const fallbackMetadata = {
  title: "Perde Modelleri - Pile Perde",
  alternates: {
    canonical: "https://pileperde.com.tr/perde-modelleri",
  },
  description: "Modern ve klasik perde modelleri, rustik, kruvaze, balon ve katlamalı perde çeşitleri",
};

export const generateMetadata = () => getCmsPageMetadata("curtain-models", fallbackMetadata);

export default async function PerdeModelleriPage() {
  const modelsPageContent = await getPublicModelsPageContent();

  return (
    <main>
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      <div>
        <div className="bg-gradient-to-b from-gray-900 to-black py-16 px-6">
          <div className="container mx-auto">
            <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-8" />
            <h1 className="text-4xl md:text-5xl font-extralight text-white text-center">{modelsPageContent.heroTitle}</h1>
            <p className="text-gray-400 text-center mt-4 text-lg font-light">{modelsPageContent.heroSubtitle}</p>
          </div>
        </div>
        <Models showSwiper={false} showCTA={false} initialItems={modelsPageContent.items} />
      </div>
    </main>
  );
}
