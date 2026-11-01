# Hatice English

Mobil öncelikli, Türkçe rehberli, dinleme ve konuşma odaklı dört haftalık React + TypeScript PWA.

Site: https://bkah-dev.github.io/hatice-english/

## Yerel kullanım

Node.js 24 ile doğrulanmıştır.

```sh
npm ci
npm run dev
```

Geliştirme adresi: `http://127.0.0.1:5173/hatice-english/`.

```sh
npm run build
npm run test:unit
npx playwright install --with-deps chromium webkit
npm test
npm run preview
```

`build` önce bütün dersleri doğrular, TypeScript kontrolünü yapar, sonra üretim dosyalarını ve sürümlü çevrimdışı önbelleği oluşturur. GitHub Pages tabanı `/hatice-english/`; yönlendirme hash üzerinden olduğundan ders bağlantıları yenilendiğinde 404 oluşmaz.

Giriş dosyası adresi sürümler arasında `assets/app.js` olarak sabittir. Önceki sürümlerin dosya adresleri `scripts/legacy-entries.json` üzerinden kurtarma girişleri olarak yayımlanır. Bu uyumluluk dosyalarını kaldırmayın: eski HTML hâlâ bir cihazda saklanıyor olabilir. Açılış kurtarması `public/recovery.js` içindedir ve ilerlemeyi temizlemez.

## Hazır kapsam

- 16 tam bireysel ders: 32 özgün 6 sıralı diyalog, 80 anlama sorusu, 64 cümle üretimi, 48 konuşma görevi ve somut ödevler.
- 8 partner dersi ve her biri için 40 dakikalık ayrıntılı Berk rehberi.
- 4 haftalık tekrar/değerlendirme; 8–10 dakikalık kısa sürüm.
- Normal/yavaş sentez ses, tek cümle tekrarı, metin ve Türkçe destek; iptal ve hata durumu.
- Cihazda ilerleme/not saklama, aralıklı tekrar, JSON dışa/içe aktarma.
- Açık/koyu tema; iPhone boyutlarında responsive arayüz; PWA manifesti ve temel offline uygulama/içerik.
- Kendi sesini kaydetme, dinleme ve dosya olarak indirme. İzin yoksa yazılı çıktı veya telefonun Sesli Notlar uygulaması.
- ChatGPT komutları, YouTube/Google arama bağlantıları ve özgür notlar.

Öğretmen rehberi `#/teacher` adresinde; kimlik doğrulaması yok. Öğrenci dersinde öğretmenin cevap senaryoları gösterilmez. Bu ayrım bir güvenlik mekanizması olarak sunulmaz.

## Veri ve ses sınırları

İlerleme sadece o tarayıcının `localStorage` alanındadır; eşitleme veya sunucu hesabı yok. Ses kayıtları kalıcı depolanmaz: sayfadan ayrılmadan indirilmeli ve JSON yedeğine dahil değildir. Yedek içe aktarılırken sürüm/yapı doğrulanır ve mevcut kaydın değişeceği açıkça gösterilir. Bozuk yerel kayıtta eski veri sessizce üzerine yazılmaz.

Ses, cihazın İngilizce Web Speech sentezidir. İnsan kaydı, telaffuz puanlayıcısı veya otomatik konuşma değerlendirmesi değildir. Gerçek iPhone’da ses kalitesi, mikrofon izni, sessiz mod ve offline İngilizce ses paketi ayrıca kontrol edilmelidir. Otomatik ses testleri kuyruk/düğme davranışını bir test sesiyle doğrular; duyulan sesin kalitesini doğrulamaz.

29 / 40 / 18 dakika hedef tahminlerdir. Gerçek öğrenciyle süre ve zorluk pilotu yapılmamıştır. Dört hafta otomatik A2 geçişi değildir.

## Yeni ders ekleme

1. `src/types.ts` içindeki `Lesson` alanlarını kullan. Asıl metinleri bileşene koyma.
2. `src/content.ts` içine özgün `Seed` ekle: 4–6 konuşma sıralı iki diyalog, dört çekirdek ifade ve kelime, 5–6 kanıtlı soru, en az dört farklı üretim, üç konuşma görevi ve sayısı belli ödev.
3. Sorunun `dialogue` indeksi ve `evidence` cümlesi birebir ilgili diyalogla eşleşmeli. `reviewPhrase` var olan çekirdek ifadeyi göstermeli.
4. `src/teacher.ts` içinde yeni partner planını öğrenci derslerine bağla; aşamaların toplamı 40 dakika olsun. Örnek, kurtarma ipucu ve zorlaştırmadan genişletme sorusu ekle.
5. `src/curriculum.ts` içinde hafta haritası ve haftalık tekrarı düzenle. Takvim ve doğrulayıcıdaki mevcut 4 hafta sınırını yeni kapsama bilinçli olarak genişlet. Yedek şemasında sürüm geçişini planla.
6. `npm run build`, `npm run test:unit`, `npm test` çalıştır. Diyalogdan cevaplanamayan soru veya boş ödevle yayımlama yapma.
7. `CONTENT_SOURCES.md` dosyasında kullanılan kaynağı ve ayrı medya lisansını kaydet. Kopyalanan içerik yoksa özgün olarak belirt.

## Dağıtım

Depo sahibi `bkah-dev`. GitHub Settings → Pages → Source: GitHub Actions. `main` değişiklikleri için `.github/workflows/pages.yml` içerik/build ve testlerden sonra Pages artifact’ini dağıtır. Ücretli API, backend, özel alan adı veya üyelik yok.

`CONTENT_SOURCES.md`, `REFERENCE_ANALYSIS.md` ve `QA_REPORT.md` gerekçeleri ve doğrulama sınırlarını içerir. Kullanıcının orijinal HTML dosyaları yerel `reference/` içinde tutulur, kamu deposuna eklenmez.
