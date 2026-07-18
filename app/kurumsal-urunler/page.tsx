import type { Metadata } from "next";
import Corporate from "@/components/Corporate";
import { BreadcrumbListJsonLd } from "@/components/BreadcrumbListJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { getCmsPageMetadata } from "@/lib/cmsMetadata";

const canonicalUrl = "https://pileperde.com.tr/kurumsal-urunler";
const breadcrumbItems: BreadcrumbItem[] = [
  { name: "Ana Sayfa", url: "/" },
  { name: "Kurumsal Ürünler", url: "/kurumsal-urunler" },
];

const fallbackMetadata: Metadata = {
  title: "Kurumsal Ürünler - Pile Perde",
  description: "Otel, hastane, ofis, cafe ve restoran için kurumsal perde çözümleri",
};

export const generateMetadata = () => getCmsPageMetadata("corporate-products", fallbackMetadata);

export default function KurumsalUrunlerPage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      <div>
        <div className="bg-gradient-to-b from-gray-900 to-black py-16 px-6">
          <div className="container mx-auto">
            <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-8" />
            <h1 className="text-4xl md:text-5xl font-extralight text-white text-center">Kurumsal Ürünler</h1>
            <p className="text-gray-400 text-center mt-4 text-lg font-light">Profesyonel mekanlar için özel çözümler</p>
          </div>
        </div>
        <Corporate showSwiper={false} />
      </div>
    </main>
  );
}
