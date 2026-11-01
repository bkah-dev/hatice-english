# İçerik kaynakları

İnceleme tarihi: 1 Kasım 2026. Uygulamanın diyalogları, soru metinleri, cevap açıklamaları ve öğretmen senaryoları bu proje için özgün yazıldı. Üçüncü taraf ses, görsel, transkript veya soru bankası uygulamaya kopyalanmadı. Kaynaklardaki öğretim sırası ve bağlam fikirleri değerlendirildi; aşağıdaki yöntem karşılaştırması editoryal bir çıkarımdır.

| Kaynak / URL | Yararlanma amacı | Lisans ve kullanım durumu | Uygulamada kullanım |
| --- | --- | --- | --- |
| British Council A1 Listening — https://learnenglish.britishcouncil.org/free-resources/listening/a1 | Hazırlık → kayıt → anlama görevleri; alışveriş ve işyeri gibi tanıdık bağlamlar | Sayfa kamuya açık; açık yeniden dağıtım lisansı varsayılmadı. İçerik ve kayıt kopyalanmadı. | `british-council-method`: yöntem esini ve Keşfet bağlantısı |
| British Council A1 Speaking — https://learnenglish.britishcouncil.org/free-resources/speaking/a1 | Bağlam içinde kalıp, dinleme/tekrar, anlama ve kullanım sırası | Telifli materyal olarak ele alındı; video ve alıştırmalar alınmadı. | Yöntem esini; Keşfet bağlantısı |
| VOA Let’s Learn English Level 1 — https://learningenglish.voanews.com/p/5644.html | Haftalara yayılan hayat bağlamları, konuşma/kelime/yazma birlikteliği, öğretmen planı ve değerlendirme | Farklı varlıkların hakları ayrı incelenmeden kamu malı kabul edilmedi. Hiçbir medya/transkript yeniden dağıtılmadı. | `voa-method`: yöntem esini; kaynak bağlantısı |
| BBC Learning English resmi ana sayfası — https://feeds.bbci.co.uk/learningenglish | Kolay seviye seçimi ve Real Easy English programına yönlendirme | BBC alanındaki sayfa incelendi. Program alt sayfasında robots erişim sınırı görüldü ve aşılmadı. Telifli ses veya çalışma kâğıdı alınmadı. | Yalnızca resmi ana sayfa bağlantısı ve kolay kaynak seçimi fikri |
| Tatoeba kullanım rehberi — https://en.wiki.tatoeba.org/articles/show/using-the-tatoeba-corpus | Metin ve ses lisanslarının ayrı değerlendirilmesi | Rehber, metin için yazar atıflı CC BY 2.0 FR; seslerde kayıt sahibinin ayrı lisansını kontrol etme gereğini belirtiyor. | Hiçbir cümle/ses alınmadı; dolayısıyla yazar bazlı bir corpus atfı gerektiren veri eklenmedi. |
| Kullanıcının iki HTML materyali — yerel `reference/` klasörü | Hatice’nin rutin, saat, hobi ve kafe konuları; Berk’in destek azaltma yaklaşımı | Kullanıcının proje referansı. Harici dağıtım lisansı varsayılmadı; orijinaller kamu deposundan hariç. | Eğitim yaklaşımı geliştirildi; yeni içerik özgün yazıldı. |
| Özgün içerik — `src/content.ts`, `src/teacher.ts`, `src/curriculum.ts` | Ana program, tekrarlar, öğretmen senaryoları | Proje için oluşturuldu; üçüncü taraf dersten çoğaltılmadı. | `original`: bütün asıl ders içeriği |

## Tasarıma dönüştürülen sonuçlar

- Bir derste dört çekirdek ifade. İlk tur ana fikir, ikinci tur ayrıntı, gerektiğinde metin, son tur metinsiz dinleme.
- Her bireysel günde iki farklı özgün diyalog; ikinci diyalog bir seçim, karşıtlık, saat değişikliği veya küçük problem ekliyor.
- Anlama sorularının her birinde diyalogdaki tam kanıt cümlesi ve Türkçe geri bildirim var. Build, kanıtın ilgili diyalogda bulunmasını denetliyor.
- Sıralama, bir kalıbı tamamlama, kişiselleştirme ve cümle birleştirme birbirinin yerine geçen tekrarlar değil; tanımadan bağımsız üretime destek veriyor.
- Konuşmada ilk cevap → ayrıntı → karşılıklı soru/çözüm. Her etkinliğin sonunda “örneği okumadan kendi bilgimi kullandım” öz değerlendirmesi var.
- Önceki 1, 2 ve 4 bireysel dersin ifadeleriyle hatırlama; zorlanılanlar kişisel tekrar listesine giriyor. Başarılı geri çağırmada aralık 1, 3, 7, 14, 28 ve en fazla 30 güne uzuyor.
- Sayılar, etkinliklerin yeterli süre aldığına dair kanıt sayılmadı. 29 dakika bireysel, 40 dakika partner, 18 dakika tekrar ve 8–10 dakika kısa sürüm birer hedef tahminidir. Gerçek öğrenciyle süre ve dinleme zorluğu pilotu gerekiyor.

## Ses seçimi

Üçüncü taraf ders kayıtları izin alınmadan kullanılamaz. Tatoeba seslerinin lisansı kişiye bağlıdır ve bu programın özgün diyaloglarını karşılamaz. İlk sürüm, ücretli API/hesap gerektirmeden cihazın İngilizce Web Speech sentez sesini kullanır; insan kaydı olarak sunulmaz. İngilizce ses yoksa sessizce Türkçe sese düşülmez: açık hata, metin ve Berk’in okuması seçenekleri sunulur. Ses kalitesi ve çevrimdışı çalışması cihazın paketine bağlıdır. iPhone üzerinde gerçek ses kalitesi/izin testi doğrulanmamıştır.

## Teknik referanslar

- Vite GitHub Pages dağıtımı: https://vite.dev/guide/static-deploy.html#github-pages — alt dizin tabanı ve Pages iş akışı.
- MDN SpeechSynthesis: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis — kuyruk, iptal, ses seçimi. Etiketler ayrı veri alanında tutulur; yalnızca `line.en` seslendirilir.

Kamuya açık olmayan sayfalar, giriş duvarları veya bot engelleri aşılmadı. Arama sonuçlarında çıkan benzer isimli alan adları resmi BBC kaynağı kabul edilmedi.
