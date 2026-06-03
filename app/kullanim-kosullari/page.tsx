export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-light mb-8">Kullanım Koşulları</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-light mb-4">1. Genel Kullanım</h2>
            <p className="text-gray-300 leading-relaxed">
              Bu web sitesini kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız.
              Web sitemizdeki içerikler yalnızca bilgilendirme amaçlıdır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">2. Fikri Mülkiyet Hakları</h2>
            <p className="text-gray-300 leading-relaxed">
              Bu web sitesindeki tüm içerik, görseller ve materyaller Pile Perde&apos;ye aittir.
              İzinsiz kullanımı yasaktır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">3. Sorumluluk Sınırlaması</h2>
            <p className="text-gray-300 leading-relaxed">
              Web sitemizdeki bilgilerin doğruluğunu sağlamak için çaba göstermekteyiz,
              ancak herhangi bir hata veya eksiklikten sorumlu tutulamayız.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">4. Fiyatlar ve Ürünler</h2>
            <p className="text-gray-300 leading-relaxed">
              Web sitesinde gösterilen fiyatlar ve ürün özellikleri bilgilendirme amaçlıdır
              ve önceden haber verilmeksizin değiştirilebilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">5. İletişim</h2>
            <p className="text-gray-300 leading-relaxed">
              Kullanım koşullarımız hakkında sorularınız varsa, lütfen bizimle iletişime geçin.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
