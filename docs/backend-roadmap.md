# Pile Perde Backend Roadmap

Bu dokuman, mevcut Next.js vitrinin Java Spring Boot + PostgreSQL backend ile
yonetilebilir bir CMS yapisina tasinmasi icin baslangic planidir.

## Hedef Mimari

- Public site: `pileperde.com.tr` veya `www.pileperde.com.tr`
- Admin panel: `admin.pileperde.com.tr`
- Backend API: `api.pileperde.com.tr` veya admin/public domainlerin arkasinda `/api`
- Backend stack: Java 21, Spring Boot, PostgreSQL, Flyway veya Liquibase
- Dosya depolama: AWS S3
- Gorsel servisleme: S3 + CloudFront
- Auth: JWT access token + refresh token veya admin subdomain icin guvenli cookie
- Backend sekli: modular monolith

Admin panelin subdomain olmasi mantikli. Vitrin ve admin birbirinden net ayrilir,
cookie/same-site kurallari daha kontrollu olur, ileride admin paneli ayri deploy
edilebilir. Backend yine tek modular monolith olarak kalabilir.

## Mevcut Frontend Envanteri

### Yonetilecek Icerik Tipleri

- Site ayarlari: telefon, WhatsApp, e-posta, adres, calisma saatleri, sosyal medya, harita linkleri
- SEO ayarlari: title, description, keywords, canonical, open graph gorseli
- Ana sayfa bolumleri: hero, urunler, modeller, kurumsal urunler, hakkimizda, yorumlar, blog, SSS, iletisim
- Kategoriler: urunler, mekanizmali perdeler, motorlu perdeler, model perdeler, kurumsal urunler
- Urun/detail sayfalari: baslik, slug, ozet, aciklama, ozellikler, kullanim alanlari, CTA metinleri
- Galeriler: urun/model/kurumsal sayfalardaki `productImages` dizileri
- Blog: `blog_posts.json` icindeki yazilar, kategori, tarih, gorsel, slug, HTML icerik
- SSS: `components/FAQ.tsx` icindeki soru/cevaplar
- Musteri yorumlari: `components/Testimonials.tsx` icindeki yorumlar
- Iletisim/teklif talepleri: su an WhatsApp linki aciliyor, backend kaydi yok
- Hukuki sayfalar: gizlilik politikasi, kullanim kosullari

### Mevcut Gorsel Durumu

`public` altinda yaklasik 1996 dosya ve 664 MB gorsel var. En buyuk klasorler:

- `ofis-perdeleri`: 57 dosya, yaklasik 73 MB
- `modern-perde`: 287 dosya, yaklasik 52 MB
- `zebra-perde`: 29 dosya, yaklasik 52 MB
- `kruvaze-perde`: 144 dosya, yaklasik 45 MB
- `klasik-avangart`: 196 dosya, yaklasik 39 MB
- `dikey-perde`: 15 dosya, yaklasik 34 MB
- `tul-stor-perde`: 53 dosya, yaklasik 34 MB

Bu gorseller backend sunucusuna degil, S3 bucket'a tasinmali. Veritabaninda
sadece metadata ve URL/key bilgisi tutulmali.

### Dikkat Edilecek Mevcut Tutarsizliklar

- Telefon/WhatsApp numaralari farkli yerlerde tekrar ediyor.
- Blog sidebar icinde farkli telefon/adres degerleri var.
- SEO metadata her sayfada daginik.
- Urun galerileri her sayfanin icinde hardcoded.
- Build config TypeScript ve ESLint hatalarini build sirasinda yok sayiyor.

Backend tasariminda bu tekrarlar tek kaynak haline getirilmeli.

## Modular Monolith Modul Haritasi

Backend tek Spring Boot uygulamasi olur, ama package ve domain sinirlari moduller
halinde ayrilir.

```text
com.pileperde
  common
  security
  users
  settings
  media
  taxonomy
  catalog
  content
  blog
  leads
  seo
  audit
```

### Moduller

- `security`: login, JWT/cookie, password hashing, role checks
- `users`: admin kullanicilari, roller, durum bilgisi
- `settings`: telefon, WhatsApp, adres, calisma saatleri, sosyal medya, harita linkleri
- `media`: S3 presigned URL, media asset metadata, alt text, siralama, mime/size bilgisi
- `taxonomy`: kategori agaci, menu gorunurlugu, slug hiyerarsisi
- `catalog`: urun/model/kurumsal urun sayfalari, ozellikler, galeriler, sayfa bolumleri
- `content`: ana sayfa bolumleri, SSS, yorumlar, statik/hukuki sayfalar
- `blog`: blog yazilari, blog kategorileri, yayin durumu
- `leads`: iletisim ve teklif talepleri
- `seo`: sayfa metadata, canonical, OG image, sitemap verisi
- `audit`: admin islemleri icin kim neyi ne zaman degistirdi kaydi

## PostgreSQL Entity Taslagi

### Ortak Base Alanlar

Butun ana entity'lerde su alanlar standart olmali:

- `id UUID primary key`
- `created_at timestamptz`
- `updated_at timestamptz`
- `created_by UUID null`
- `updated_by UUID null`
- `deleted_at timestamptz null` veya aktif/pasif status

Soft delete her tabloda sart degil ama admin panelde yanlis silmeleri geri almak
icin kritik icerik tablolarinda kullanilmali.

### Auth ve Admin

#### `admin_users`

- `id`
- `email`
- `password_hash`
- `full_name`
- `role`
- `enabled`
- `last_login_at`

Ilk asamada roller `SUPER_ADMIN`, `EDITOR`, `VIEWER` enum olabilir. Ayrintili
permission sistemine hemen gerek yok.

#### `refresh_tokens` veya `admin_sessions`

- `id`
- `user_id`
- `token_hash`
- `expires_at`
- `revoked_at`
- `ip_address`
- `user_agent`

### Site Ayarlari

#### `site_settings`

- `id`
- `setting_key`
- `setting_value`
- `value_type`
- `group_name`
- `description`

Ornek key'ler:

- `company.phone.primary`
- `company.whatsapp.primary`
- `company.email`
- `company.address.full`
- `company.maps_url`
- `company.instagram_url`
- `business.hours.weekdays`
- `business.hours.sunday`

Bu sayede frontend'deki daginik telefon/adres bilgileri tek kaynaktan gelir.

### Medya

#### `media_assets`

- `id`
- `bucket`
- `object_key`
- `public_url`
- `cdn_url`
- `file_name`
- `mime_type`
- `size_bytes`
- `width`
- `height`
- `alt_text`
- `title`
- `status` (`UPLOADING`, `READY`, `FAILED`, `ARCHIVED`)
- `uploaded_by`

#### `media_folders`

- `id`
- `name`
- `slug`
- `parent_id`
- `sort_order`

Ilk etapta folder opsiyonel olabilir. Ama 1996 dosyalik arshiv icin admin UX'te
ise yarar.

### Kategori ve Menu

#### `categories`

- `id`
- `parent_id`
- `type` (`PRODUCT`, `MODEL`, `CORPORATE`, `BLOG`)
- `name`
- `slug`
- `description`
- `hero_media_id`
- `menu_media_id`
- `sort_order`
- `visible_in_menu`
- `published`

Kategori agaci ornekleri:

- Urunler
  - Mekanizmali Perdeler
    - Zebra Perde
    - Plise Perde
    - Stor Perde
  - Motorlu Perdeler
  - Tul & Fon Perde
- Model Perdeler
- Kurumsal Urunler

### Katalog / Urun Sayfalari

Bu projede "urun", "model perde" ve "kurumsal urun" teknik olarak ayni sayfa
modelinin farkli tipleri gibi davranabilir.

#### `catalog_pages`

- `id`
- `category_id`
- `page_type` (`PRODUCT`, `MODEL`, `CORPORATE_PRODUCT`)
- `title`
- `slug`
- `subtitle`
- `summary`
- `body`
- `hero_media_id`
- `status` (`DRAFT`, `PUBLISHED`, `ARCHIVED`)
- `published_at`
- `sort_order`

#### `catalog_page_sections`

- `id`
- `catalog_page_id`
- `section_type` (`TEXT`, `FEATURE_LIST`, `USAGE_AREAS`, `BENEFITS`, `CTA`, `HTML`)
- `title`
- `content`
- `sort_order`
- `visible`

Sayfalardaki farkli bolumleri bu tabloyla esnek yonetiriz. Baslangicta cok
komplike editor yazmadan, JSON veya basit text alanlariyla ilerlenebilir.

#### `catalog_page_features`

- `id`
- `catalog_page_id`
- `text`
- `sort_order`

#### `catalog_page_images`

- `id`
- `catalog_page_id`
- `media_asset_id`
- `title`
- `alt_text`
- `sort_order`
- `is_cover`

Mevcut `productImages` dizilerinin backend karsiligi bu olur.

### Blog

#### `blog_categories`

- `id`
- `name`
- `slug`
- `description`

#### `blog_posts`

- `id`
- `category_id`
- `title`
- `slug`
- `excerpt`
- `content`
- `cover_media_id`
- `read_time`
- `status`
- `published_at`
- `legacy_id`

Not: Mevcut blog content HTML iceriyor. Backend'de HTML saklanacaksa admin
editor cikisi sanitize edilmeli. Alternatif olarak Markdown saklanabilir.

### Sayfalar ve Ana Sayfa Icerikleri

#### `pages`

- `id`
- `page_key`
- `title`
- `slug`
- `body`
- `status`
- `published_at`

Kullanim:

- `about`
- `corporate`
- `privacy-policy`
- `terms-of-use`

#### `home_sections`

- `id`
- `section_key`
- `title`
- `subtitle`
- `content`
- `media_id`
- `sort_order`
- `visible`

Ana sayfa hero, urunler, modeller, kurumsal urunler, hakkimizda gibi bolumlerin
admin panelden acilip kapanmasi icin.

#### `faqs`

- `id`
- `question`
- `answer`
- `sort_order`
- `published`

#### `testimonials`

- `id`
- `customer_name`
- `comment`
- `rating`
- `source`
- `published`
- `sort_order`

### Iletisim ve Teklif Talepleri

#### `contact_requests`

- `id`
- `name`
- `phone`
- `email`
- `message`
- `source_page`
- `status` (`NEW`, `CONTACTED`, `WON`, `LOST`, `SPAM`)
- `admin_note`
- `created_at`

Ileride teklif urunu secilirse ek alanlar:

- `catalog_page_id`
- `preferred_contact_method`
- `city`
- `district`

### SEO

#### `seo_metadata`

- `id`
- `owner_type` (`PAGE`, `CATALOG_PAGE`, `BLOG_POST`, `CATEGORY`)
- `owner_id`
- `title`
- `description`
- `keywords`
- `canonical_url`
- `og_title`
- `og_description`
- `og_media_id`
- `robots_index`
- `robots_follow`

Bu tablo sayesinde metadata daginik `layout.tsx` dosyalarindan backend'e tasinir.

### Audit

#### `audit_logs`

- `id`
- `actor_user_id`
- `action`
- `entity_type`
- `entity_id`
- `old_value_json`
- `new_value_json`
- `created_at`
- `ip_address`

Icerik yonetimi yapan aile/sirket sistemlerinde kim neyi degistirdi kaydi cok
hayat kurtarir.

## API Taslagi

Public endpointler:

- `GET /api/public/settings`
- `GET /api/public/navigation`
- `GET /api/public/home`
- `GET /api/public/catalog-pages/{slug}`
- `GET /api/public/categories/{slug}`
- `GET /api/public/blog-posts`
- `GET /api/public/blog-posts/{slug}`
- `POST /api/public/contact-requests`

Admin endpointler:

- `POST /api/admin/auth/login`
- `POST /api/admin/auth/refresh`
- `POST /api/admin/auth/logout`
- `GET /api/admin/media`
- `POST /api/admin/media/presigned-upload`
- `POST /api/admin/media/complete-upload`
- `CRUD /api/admin/categories`
- `CRUD /api/admin/catalog-pages`
- `CRUD /api/admin/blog-posts`
- `CRUD /api/admin/pages`
- `CRUD /api/admin/faqs`
- `CRUD /api/admin/testimonials`
- `GET/PATCH /api/admin/site-settings`
- `GET/PATCH /api/admin/seo-metadata`
- `GET/PATCH /api/admin/contact-requests`

## AWS S3 Upload Akisi

1. Admin panel dosya secer.
2. Admin panel backend'e dosya adi, mime type, size bilgisiyle istek atar.
3. Backend `media_assets` kaydini `UPLOADING` status ile olusturur.
4. Backend S3 icin presigned PUT URL uretir.
5. Admin panel dosyayi dogrudan S3'e yukler.
6. Admin panel backend'e `complete-upload` cagrisi yapar.
7. Backend dosyayi kontrol eder ve kaydi `READY` yapar.
8. Public site `cdn_url` veya `public_url` ile gorseli gosterir.

S3 object key formati:

```text
media/{yyyy}/{mm}/{uuid}-{safe-file-name}
```

CloudFront devreye girince public URL'ler CloudFront domaininden servis edilir.

## Admin Subdomain Notlari

Onerilen ayrim:

- `pileperde.com.tr`: public frontend
- `admin.pileperde.com.tr`: admin frontend
- `api.pileperde.com.tr`: Spring Boot API

CORS:

- Public frontend sadece public endpointlere erismeli.
- Admin frontend admin endpointlere erismeli.
- Admin auth cookie kullanilirsa domain, SameSite, Secure ve CSRF ayrica
  tasarlanmali.

Baslangicta JWT access token + refresh token modeli daha hizli uygulanabilir.
Prod sertlestirmede refresh token httpOnly secure cookie'ye alinabilir.

## Oncelikli Gelistirme Sirasi

### Faz 0: Karar ve Hazirlik

- Dogru telefon, WhatsApp, e-posta, adres ve harita linklerini netlestir.
- AWS hesap/bucket/region karari ver.
- Backend repo yerini kararlastir.
- Migration araci olarak Flyway mi Liquibase mi kullanilacak sec.

### Faz 1: Backend Iskeleti

- Spring Boot projesi ac.
- PostgreSQL baglantisi kur.
- Modular package yapisini olustur.
- Base entity, exception handling, response modeli, validation altyapisi ekle.
- Flyway/Liquibase migration baslat.

### Faz 2: Auth + Admin Temeli

- Admin user entity ve login endpointleri.
- Role bazli guard.
- Ilk super admin seed.

### Faz 3: Site Settings + Contact Requests

- `site_settings` ve `contact_requests` modullerini yaz.
- Frontend ile ilk gercek entegrasyonu iletisim formunda yap.
- Mevcut WhatsApp akisi korunabilir ama backend'e de kayit atilir.

### Faz 4: Media + S3

- S3 presigned upload akisini yaz.
- Admin panelde medya kutuphanesi olustur.
- Mevcut gorsellerin S3'e tasinmasi icin migration script planla.

### Faz 5: Blog Migrasyonu

- `blog_posts.json` verisini PostgreSQL'e import et.
- Public blog list/detail endpointlerini yaz.
- Frontend blog'u backend'den okumaya gecir.

### Faz 6: Katalog Pilot Sayfa

- Tek pilot sayfa sec: `zebra-perde` iyi aday.
- Kategori, katalog sayfasi, galeri, SEO verisini DB'ye tasir.
- Frontend'de bu sayfayi backend verisiyle render eden dinamik template kur.
- Pilot dogrulaninca diger sayfalara yay.

### Faz 7: Tum Icerik CMS'e Tasima

- Urunler
- Model perdeler
- Kurumsal urunler
- Ana sayfa bolumleri
- SSS
- Yorumlar
- SEO/sitemap

## Ilk Kodlama Karari

Backend'de entity'leri JPA ile olusturmak mantikli; ama database semasini
Hibernate `ddl-auto=update` ile prod'da otomatik degistirmemeliyiz. Oneri:

- Local dev: gerekirse `ddl-auto=validate` veya baslangicta `update`
- Gercek akis: Flyway/Liquibase migration dosyalari
- Entity her zaman migration ile uyumlu kalir

Bu sekilde hem Java tarafinda entity merkezli ilerleriz hem de veritabani
degisiklikleri kontrollu olur.

## Hemen Sonraki Somut Adim

Backend repo acildiginda ilk commit su kapsami tasimali:

- Spring Boot skeleton
- PostgreSQL config
- `common`, `security`, `users`, `settings`, `leads`, `media` paketleri
- Base entity
- Flyway/Liquibase ilk migration
- Admin user seed
- Health check endpoint

Ardindan ilk calisan dikey akis:

```text
admin login -> site setting guncelle -> public frontend setting okur
public contact form -> backend contact request kaydi -> admin panel listeler
```

Bu dikey akis calistiginda sistemin temeli kanitlanmis olur.
