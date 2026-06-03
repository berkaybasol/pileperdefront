import Corporate from "@/components/Corporate";

export const metadata = {
  title: "Kurumsal - Pile Perde",
  description: "Pile Perde kurumsal bilgiler, tarihçe ve kurumsal değerler",
};

export default function CorporatePage() {
  return (
    <main>
      <div>
        {/* Page Title - Dark Glassmorphism Style */}
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black" />
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
          </div>
          <div className="relative container mx-auto px-6 py-20">
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="w-12 h-[1px] bg-gray-700"></span>
                  <span className="uppercase tracking-[0.2em] font-light">ŞİRKET</span>
                  <span className="w-12 h-[1px] bg-gray-700"></span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-extralight text-white mb-4">Kurumsal</h1>
              <p className="text-gray-400 font-light text-base">Profesyonel çözümler, güvenilir hizmet</p>
            </div>
          </div>
        </section>
        <Corporate />
      </div>
    </main>
  );
}