import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllBlogPosts, getPublicBlogPostBySlug, getPublicBlogPosts } from '@/lib/blogContent';
import { sanitizeHtml } from '@/lib/sanitizeHtml';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Yazı Bulunamadı - Pile Perde',
    };
  }

  return {
    title: `${post.title} - Pile Perde Blog`,
    description: post.excerpt,
  };
}

function formatContent(html: string): string {
  // Önce WordPress shortcode'larını temizle
  let formatted = html
    .replace(/\[caption[^\]]*\][^\[]*\[\/caption\]/g, '') // Caption shortcode'ları
    .replace(/\[gallery[^\]]*\]/g, '') // Gallery shortcode'ları
    .replace(/\[audio[^\]]*\]/g, '') // Audio shortcode'ları
    .replace(/\[video[^\]]*\]/g, '') // Video shortcode'ları
    .replace(/\[[^\]]+\]/g, ''); // Diğer tüm shortcode'lar

  // WordPress görsellerini temizle
  formatted = formatted.replace(/<img[^>]+src="https:\/\/www\.pileperde\.com\.tr[^"]*"[^>]*>/g, '');

  // Boş paragrafları ve gereksiz boşlukları temizle
  formatted = formatted
    .replace(/<p>\s*<\/p>/g, '') // Boş paragraflar
    .replace(/&nbsp;/g, ' ') // nbsp karakterleri
    .replace(/\n{3,}/g, '\n\n'); // Çoklu satır sonlarını düzenle

  // WordPress sınıflarını temizle
  formatted = formatted
    .replace(/class="[^"]*"/g, '')
    .replace(/style="[^"]*"/g, '')
    .replace(/width="[^"]*"/g, '')
    .replace(/height="[^"]*"/g, '')
    .replace(/alignleft|alignright|aligncenter|size-[^\s]*/g, '');

  // Strong taglerini başlık olarak düzenle (çoğu WordPress yazısında başlık için strong kullanılmış)
  // İlk strong tag'i büyük başlık yap
  let isFirstStrong = true;
  formatted = formatted.replace(/<strong>([^<]+)<\/strong>/g, (match, p1) => {
    if (isFirstStrong && p1.length > 20) {
      isFirstStrong = false;
      return `<h2 class="text-3xl font-bold text-white mb-6 mt-10">${p1}</h2>`;
    }
    // Uzun strong'ları alt başlık yap
    if (p1.length > 30) {
      return `<h3 class="text-2xl font-bold text-white mb-4 mt-8">${p1}</h3>`;
    }
    return `<span class="font-bold text-white">${p1}</span>`;
  });

  // Paragrafları düzgün ayır
  formatted = formatted
    .split('\n\n')
    .filter(p => p.trim())
    .map(paragraph => {
      if (!paragraph.startsWith('<')) {
        return `<p class="text-gray-300 mb-5 leading-relaxed text-base">${paragraph}</p>`;
      }
      return paragraph;
    })
    .join('\n\n');

  // HTML taglerini stillendir
  formatted = formatted
    .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-white mb-6 mt-10">')
    .replace(/<h2(?!.*class)/g, '<h2 class="text-2xl font-bold text-white mb-5 mt-8">')
    .replace(/<h3(?!.*class)/g, '<h3 class="text-xl font-bold text-white mb-4 mt-6">')
    .replace(/<h4(?!.*class)/g, '<h4 class="text-lg font-semibold text-white mb-3 mt-5">')
    .replace(/<p(?!.*class)/g, '<p class="text-gray-300 mb-5 leading-relaxed text-base">')
    .replace(/<ul>/g, '<ul class="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-4">')
    .replace(/<ol>/g, '<ol class="list-decimal list-inside text-gray-300 mb-6 space-y-2 ml-4">')
    .replace(/<li>/g, '<li class="text-gray-300 text-base leading-relaxed">')
    .replace(/<a /g, '<a class="text-blue-400 hover:text-blue-300 underline transition-colors" ')
    .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-400 text-lg">');

  return formatted;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getPublicBlogPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const categoryColors: { [key: string]: string } = {
    'Perde Bilgisi': 'bg-blue-500/10 text-blue-400 border-l-4 border-blue-500',
    'Bakım': 'bg-green-500/10 text-green-400 border-l-4 border-green-500',
    'Çocuk Odası': 'bg-purple-500/10 text-purple-400 border-l-4 border-purple-500',
    'Salon': 'bg-orange-500/10 text-orange-400 border-l-4 border-orange-500',
    'Yatak Odası': 'bg-pink-500/10 text-pink-400 border-l-4 border-pink-500',
    'Mutfak': 'bg-cyan-500/10 text-cyan-400 border-l-4 border-cyan-500',
    'Perde Modelleri': 'bg-indigo-500/10 text-indigo-400 border-l-4 border-indigo-500',
    'Perde Çeşitleri': 'bg-yellow-500/10 text-yellow-400 border-l-4 border-yellow-500',
  };

  const formattedContent = sanitizeHtml(formatContent(post.content));

  // İlgili yazıları bul
  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  // Rastgele öneriler için farklı kategoriden yazılar
  const otherPosts = posts
    .filter(p => p.id !== post.id && p.category !== post.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const suggestedPosts = relatedPosts.length > 0 ? relatedPosts : otherPosts;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0c] to-[#18181a]">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="relative h-[40vh] min-h-[350px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-[#0a0a0c]" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Ana Sayfa
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white truncate max-w-[200px] md:max-w-none">{post.title}</span>
            </nav>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className={`px-4 py-2 ${categoryColors[post.category] || 'bg-gray-700/10 text-gray-400 border-l-4 border-gray-600'}`}>
                {post.category}
              </div>

              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{post.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Excerpt */}
            <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border-l-4 border-blue-500 pl-6 py-4 mb-12">
              <p className="text-xl text-gray-300 leading-relaxed italic">
                {post.excerpt}
              </p>
            </div>

            {/* Article Body */}
            <div
              className="prose prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-white
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-300 prose-p:text-base prose-p:leading-relaxed prose-p:mb-5
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-300
                prose-ul:text-gray-300 prose-ul:ml-4
                prose-li:text-gray-300 prose-li:mb-1"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Contact Info */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">İletişim Bilgileri</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-300">Telefon</p>
                      <a href="tel:+903125127272" className="text-sm text-white hover:text-blue-400 transition-colors">
                        0312 512 72 72
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-300">WhatsApp</p>
                      <a href="https://wa.me/905335127272" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-green-400 transition-colors">
                        0533 512 72 72
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-300">Adres</p>
                      <p className="text-sm text-white">
                        Yaşamkent Mah. 3061. Cadde<br/>
                        (Eski 3158) No:5/B Çankaya/Ankara
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-700">
                    <a
                      href="https://maps.app.goo.gl/5XbjMAsscS58sh7p8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span className="text-sm font-medium">Yol Tarifi Al</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50">
                <h3 className="text-lg font-semibold text-white mb-2">Ücretsiz Danışmanlık</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Perde seçimi konusunda uzman desteği almak ister misiniz?
                </p>
                <Link
                  href="/iletisim"
                  className="block w-full text-center py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Hemen İletişime Geç
                </Link>
              </div>

              {/* Categories */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Kategoriler</h3>
                <div className="space-y-2">
                  {Array.from(new Set(posts.map(p => p.category))).map(cat => (
                    <Link
                      key={cat}
                      href="/blog"
                      className="block text-gray-400 hover:text-white transition-colors py-1"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-gradient-to-b from-gray-900/30 to-black py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {relatedPosts.length > 0 ? 'İlgili Yazılar' : 'Diğer Yazılar'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {suggestedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={relatedPost.href}
                className="group block"
              >
                <article className="h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300">
                  <div className="relative h-56">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>{relatedPost.date}</span>
                      <span>•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3">
                      {relatedPost.excerpt}
                    </p>

                    <div className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                      <span>Devamını Oku</span>
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Tüm Yazıları Görüntüle
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
