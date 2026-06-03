import Models from "@/components/Models";
import { getCmsPageMetadata } from "@/lib/cmsMetadata";

const fallbackMetadata = {
  title: "Perde Modelleri - Pile Perde",
  description: "Modern ve klasik perde modelleri, rustik, kruvaze, balon ve katlamalı perde çeşitleri",
};

export const generateMetadata = () => getCmsPageMetadata("curtain-models", fallbackMetadata);

export default function PerdeModelleriPage() {
  return (
    <main>
      <div>
        <div className="bg-gradient-to-b from-gray-900 to-black py-16 px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-extralight text-white text-center">Perde Modelleri</h1>
            <p className="text-gray-400 text-center mt-4 text-lg font-light">Mekanınıza uygun perde modellerimiz</p>
          </div>
        </div>
        <Models showSwiper={false} showCTA={false} />
      </div>
    </main>
  );
}
