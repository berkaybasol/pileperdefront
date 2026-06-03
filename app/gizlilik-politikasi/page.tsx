export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-light mb-8">Gizlilik Politikası</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-light mb-4">1. Giriş</h2>
            <p className="text-gray-300 leading-relaxed">
              Pile Perde olarak, kişisel verilerinizin güvenliğini önemsiyoruz. Bu gizlilik politikası,
              web sitemizi ziyaret ettiğinizde toplanan bilgilerin nasıl kullanıldığını açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">2. Toplanan Bilgiler</h2>
            <p className="text-gray-300 leading-relaxed">
              Web sitemizi kullanırken, iletişim formları aracılığıyla adınız, e-posta adresiniz,
              telefon numaranız ve mesajınız gibi kişisel bilgilerinizi toplayabiliriz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">3. Bilgilerin Kullanımı</h2>
            <p className="text-gray-300 leading-relaxed">
              Topladığımız bilgiler yalnızca size daha iyi hizmet vermek, taleplerinizi karşılamak
              ve sizinle iletişim kurmak amacıyla kullanılır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">4. Bilgi Güvenliği</h2>
            <p className="text-gray-300 leading-relaxed">
              Kişisel bilgilerinizi korumak için uygun güvenlik önlemlerini alıyoruz.
              Verileriniz, yetkisiz erişime karşı korunmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">5. İletişim</h2>
            <p className="text-gray-300 leading-relaxed">
              Gizlilik politikamız hakkında sorularınız varsa, bizimle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
