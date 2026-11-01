# İçerik kaynakları

İnceleme tarihi: 1 Kasım 2026. 1.1.0 sürümünde 96 bireysel dinleme sahnesinin 92’si özgündür; dördü VOA Learning English metinlerinin açıkça belirtilmiş A1 uyarlamalarıdır. Türkçe çeviriler, sorular, dikte ve üretim etkinlikleri proje için yazıldı. Üçüncü taraf ses, görsel veya soru bankası kopyalanmadı. Kaynaklardaki öğretim sırası ve bağlam fikirleri değerlendirildi; aşağıdaki yöntem karşılaştırması editoryal bir çıkarımdır.

| Kaynak / URL | Yararlanma amacı | Lisans ve kullanım durumu | Uygulamada kullanım |
| --- | --- | --- | --- |
| British Council A1 Listening — https://learnenglish.britishcouncil.org/free-resources/listening/a1 | Hazırlık → kayıt → anlama görevleri; alışveriş ve işyeri gibi tanıdık bağlamlar | Sayfa kamuya açık; açık yeniden dağıtım lisansı varsayılmadı. İçerik ve kayıt kopyalanmadı. | `british-council-method`: yöntem esini ve Keşfet bağlantısı |
| British Council A1 Speaking — https://learnenglish.britishcouncil.org/free-resources/speaking/a1 | Bağlam içinde kalıp, dinleme/tekrar, anlama ve kullanım sırası | Telifli materyal olarak ele alındı; video ve alıştırmalar alınmadı. | Yöntem esini; Keşfet bağlantısı |
| VOA Let’s Learn English Level 1 — https://learningenglish.voanews.com/p/5644.html | Haftalara yayılan hayat bağlamları, konuşma/kelime/yazma birlikteliği, öğretmen planı ve değerlendirme | VOA kullanım koşulları, yalnızca kendilerinin ürettiği metin/ses/video için public domain bildiriyor; üçüncü taraf içerik hariç. Bu sürümde dört VOA ders metninden kısa uyarlamalar kullanılıyor; medya dosyaları alınmıyor. | `voa-method`: yöntem esini; ayrıca aşağıdaki dört uyarlamada doğrudan metin kaynağı |
| BBC Learning English resmi ana sayfası — https://feeds.bbci.co.uk/learningenglish | Kolay seviye seçimi ve Real Easy English programına yönlendirme | BBC alanındaki sayfa incelendi. Program alt sayfasında robots erişim sınırı görüldü ve aşılmadı. Telifli ses veya çalışma kâğıdı alınmadı. | Yalnızca resmi ana sayfa bağlantısı ve kolay kaynak seçimi fikri |
| Tatoeba kullanım rehberi — https://en.wiki.tatoeba.org/articles/show/using-the-tatoeba-corpus | Metin ve ses lisanslarının ayrı değerlendirilmesi | Rehber, metin için yazar atıflı CC BY 2.0 FR; seslerde kayıt sahibinin ayrı lisansını kontrol etme gereğini belirtiyor. | Hiçbir cümle/ses alınmadı; dolayısıyla yazar bazlı bir corpus atfı gerektiren veri eklenmedi. |
| Kullanıcının iki HTML materyali — yerel `reference/` klasörü | Hatice’nin rutin, saat, hobi ve kafe konuları; Berk’in destek azaltma yaklaşımı | Kullanıcının proje referansı. Harici dağıtım lisansı varsayılmadı; orijinaller kamu deposundan hariç. | Eğitim yaklaşımı geliştirildi; yeni içerik özgün yazıldı. |
| Özgün içerik — `src/content.ts`, `src/practice.ts`, `src/teacher.ts`, `src/curriculum.ts` | Ana program, tekrarlar, öğretmen senaryoları | Proje için oluşturuldu; üçüncü taraf dersten çoğaltılmadı. | `original`: VOA olarak işaretlenmiş dört sahne dışındaki içerik |

## Tasarıma dönüştürülen sonuçlar

- Bir derste dört çekirdek ifade. İlk tur ana fikir, ikinci tur ayrıntı, gerektiğinde metin, son tur metinsiz dinleme.
- Her bireysel günde altı farklı dinleme sahnesi ve 17 anlama sorusu var. İlk iki kısa sahne korunur; dört ek sahnede daha uzun karşılıklı konuşma, seçenekler, değişen bilgi ve sorun çözme çalışılır. Toplam 96 sahne, 272 soru, 128 yazma, 80 konuşma görevi ve 96 ek kelime vardır.
- Anlama sorularının her birinde diyalogdaki tam kanıt cümlesi ve Türkçe geri bildirim var. Build, kanıtın ilgili diyalogda bulunmasını denetliyor.
- Her gün sekiz yazma etkinliği: sıralama, tamamlama, kişiselleştirme, birleştirme, gizli metinden dikte ve üç yeni çok bilgili yanıt. Son üç görevde 8–12 kelimelik asgari yanıt yalnızca tek kelimeyle geçmeyi önler; dil doğruluğu veya anlamın otomatik puanlaması değildir.
- Konuşmada ilk cevap → ayrıntı → karşılıklı soru/çözüm. Her etkinliğin sonunda “örneği okumadan kendi bilgimi kullandım” öz değerlendirmesi var.
- Önceki 1, 2 ve 4 bireysel dersin ifadeleriyle hatırlama; zorlanılanlar kişisel tekrar listesine giriyor. Başarılı geri çağırmada aralık 1, 3, 7, 14, 28 ve en fazla 30 güne uzuyor.
- Kullanıcı, önceki sürümde 29 dakika yazan çalışmanın yaklaşık 5 dakikada bittiğini bildirdi. Bu nedenle bireysel, haftalık tekrar ve kısa çalışma süre iddiaları kaldırıldı; ekranda dinleme, soru, yazma ve konuşma adetleri gösteriliyor. Yeni içerik daha geniştir, ancak gerçek kullanıcı denemesi olmadan 25–30 dakika sürdüğü iddia edilmez. Berk derslerindeki 40 dakika, aşamaları dakika bazında yazılmış öğretmen planıdır. Yapay bekleme veya süre kilidi yoktur.

## Doğrudan kullanılan kamu malı metinler

Hak bildirimi: [VOA Terms of Use — Copyright Statement](https://learningenglish.voanews.com/p/6021.html). İnceleme: 1 Kasım 2026. Yalnızca VOA Learning English’in kendi ders konuşmaları kullanıldı; AP/Reuters içeriği, fotoğraf, logo veya medya alınmadı. VOA onayı veya ortaklığı iddia edilmez. Kaynak atfı her uyarlamanın dinleme kartında, haftalık tekrarda da korunur. Tam orijinal ders ve insan kaydı için ilgili resmi sayfaya bağlantı vardır; uygulama içindeki ses İngilizce sentez sesidir.

| Kullanıldığı gün | VOA Learning English kaynağı | Alınan bağlam ve değişiklik |
| --- | --- | --- |
| 1. hafta 5. gün, dinleme 6 | [Lesson 23: What Do You Want?](https://learningenglish.voanews.com/a/lets-learn-english-lesson-23-what-do-you-want/3413753.html) | Tükenen yemek, alternatif ve para üstü. Ayrı konuşma parçaları birleştirildi ve A1 için kısaltıldı. |
| 2. hafta 5. gün, dinleme 6 | [Lesson 35: Let’s Make Dinner!](https://learningenglish.voanews.com/a/lets-learn-english-lesson-35-lets-make-dinner/3571922.html) | Yanlış kahvaltı listesi, yerdeki akşam listesi ve otuz dakika. Kısaltılmış konuşma ve yeni basit çözüm cümlesi. |
| 3. hafta 5. gün, dinleme 6 | [Lesson 24: Yesterday Was Amazing!](https://learningenglish.voanews.com/a/lets-learn-english-lesson-24-yesterday-was-amazing/3439164.html) | İş molasından Bask festivaline gidiş. Anlatı soru-cevaba dönüştürüldü, zamanlar ve kelimeler sadeleştirildi. |
| 4. hafta 5. gün, dinleme 6 | [Lesson 46: May I Borrow That?](https://learningenglish.voanews.com/a/lets-learn-english-lesson-46-may-i-borrow-that/3723588.html) | Amelia’dan zımba, Jonathan’dan makas ödünç alma ve ertesi gün geri verme. İki parça kısaltılıp birleştirildi. |

Bütün Türkçe çeviri, cevap seçenekleri, açıklamalar ve kişisel üretim görevleri yeni yazıldı; VOA’nın quiz ve çalışma kâğıtları kopyalanmadı. Haftalık tekrarlar aynı haftanın kaynaklı sahnesini hatırlama amacıyla yeniden kullanır.

## Ses seçimi

Üçüncü taraf ders kayıtları izin alınmadan kullanılamaz. Tatoeba seslerinin lisansı kişiye bağlıdır ve bu programın özgün diyaloglarını karşılamaz. İlk sürüm, ücretli API/hesap gerektirmeden cihazın İngilizce Web Speech sentez sesini kullanır; insan kaydı olarak sunulmaz. İngilizce ses yoksa sessizce Türkçe sese düşülmez: açık hata, metin ve Berk’in okuması seçenekleri sunulur. Ses kalitesi ve çevrimdışı çalışması cihazın paketine bağlıdır. iPhone üzerinde gerçek ses kalitesi/izin testi doğrulanmamıştır.

## Teknik referanslar

- Vite GitHub Pages dağıtımı: https://vite.dev/guide/static-deploy.html#github-pages — alt dizin tabanı ve Pages iş akışı.
- MDN SpeechSynthesis: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis — kuyruk, iptal, ses seçimi. Etiketler ayrı veri alanında tutulur; yalnızca `line.en` seslendirilir.

Kamuya açık olmayan sayfalar, giriş duvarları veya bot engelleri aşılmadı. Arama sonuçlarında çıkan benzer isimli alan adları resmi BBC kaynağı kabul edilmedi.
