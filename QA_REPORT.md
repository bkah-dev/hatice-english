# Doğrulama raporu

Tarih: 1 Kasım 2026. Ortam: Windows, Node.js 24.15.0, Playwright 1.64.1, Chromium ve iPhone 13 ölçülerinde WebKit. Gerçek fiziksel iPhone yerine masaüstünde mobil tarayıcı motoru kullanıldı.

## Otomatik kontroller

- `npm run build`: 28 günün içerik doğrulaması, TypeScript ve Vite üretim derlemesi başarılı. 16 bireysel ders, 8 partner dersi, 4 haftalık tekrar; 32 ayrı özgün diyalog, 80 anlama sorusu, 64 üretim etkinliği ve 48 konuşma görevi.
- `npm run test:unit`: 3 test başarılı. Eksik diyalog, geçersiz cevap anahtarı, boş ödev ve bozuk tekrar bağlantısı gerçekten reddediliyor. Bozuk yedek yapısı reddediliyor. Tekrar aralıkları doğru büyüyor ve unutulunca sıfırlanıyor.
- `npm test`: iki tarayıcıda 108 senaryo. Her günün bütün adımları ve her bireysel dersin iki diyaloğu ayrı bir test olarak çalışıyor; ayrıca uçtan uca ilerleme, yedek, ses hata/iptal, öğretmen, erişilebilirlik ve çevrimdışı senaryoları var. İlk yerel turdaki 24 toplu senaryo başarılıydı. Daha yavaş Linux CI koşucusunda toplu taramaların toplam süre sınırına takılması üzerine aynı kapsam gün/ders başına ayrıldı.
- Bağımlılık kurulumundan sonraki npm taraması: 0 bilinen açık. Gereksiz PWA bağımlılıkları kaldırıldı; önbellek uygulamanın statik dosyalarıyla sınırlı özel service worker ile kuruluyor.

## Tarayıcı senaryoları

1. Bütün 28 gün ve bireysel/tekrar derslerinin tüm adımları açılıyor. Yatay taşma yok. Tarayıcı JavaScript hata listesi boş.
2. Bütün 32 bireysel diyalogda normal/yavaş dinleme, tek cümle, metin aç/kapat, isteğe bağlı Türkçe, durdurma kontrol ediliyor. Ses kuyruğuna konuşmacı etiketi gitmiyor.
3. İlk bireysel ders baştan sona çalışılıyor: notsuz hatırlama, dinleme, yanlış yanıt desteği, doğru cevaplar, dört üretim, üç konuşma görevi, ödev. Tamamlandı kaydı ve metin yenilemede korunuyor.
4. Doğrudan ödev adımına atlamak tam dersi tamamlanmış yapamıyor. Kısa çalışma ayrı kaydediliyor; tam ders işareti oluşmuyor.
5. Sekiz öğretmen planının her birindeki altı zaman bölümü ve eşleşen öğrenci diyalogları kontrol ediliyor. Veri doğrulayıcı her planın toplamının 40 dakika olduğunu denetliyor.
6. Keşif notu ve tema yenilemede saklanıyor. JSON indiriliyor ve yeniden içe alınıyor. Geçersiz dosya mevcut kaydı değiştirmiyor.
7. İngilizce ses yoksa açık hata var. Yeniden başlatma ve sayfadan çıkma eski ses kuyruğunu iptal ediyor.
8. Mikrofon engelli veya kayıt desteği olmayan ortamda alternatif açıklaması var; görevin sesli öz değerlendirmesi kullanılabiliyor.
9. Manifestin alt dizin yolları doğru. Service worker kurulduktan sonra ağ kapatılıyor; ana ekran ve 4. haftanın ders bağlantısı yeniden yükleniyor ve açılıyor. Chrome’un `Vary: Origin` yüzünden statik dosyayı kaçırma hatası, yalnızca bilinen aynı kökenli statik önbellek için `ignoreVary` ile giderildi.
10. Ana ekran, ders listesi, ders akışı, Keşfet, öğretmen ve ayarlar sayfalarında axe WCAG 2/2.1 A/AA taraması başarılı. Koyu tema ayrıca tarandı. Metin kontrastları ve gereksiz tema geçişi düzeltildi.
11. Masaüstü ve mobil ekran görüntüleri gözle incelendi. SVG kahve çizimi ve responsive yerleşim, uygulamanın kendi kodudur; dış görsel ağı yok.

## Kontrolün sınırları

### 1.0.4 bağımsız Türkçe dinleme desteği

Her dinleme kartında İngilizce metin ve Türkçe çeviri ayrı düğmelerle açılır; başlangıçta ikisi de gizlidir. Dinleme testleri önce yalnızca Türkçeyi, sonra iki dili birlikte ve son olarak İngilizce kapalıyken Türkçenin açık kalmasını denetler. Ses düğmeleri her durumda yalnızca İngilizce cümleyi okur. Kurtarma testleri sürüm etiketini paket sürümünden alır; normal bir sürüm artışı eski test sabitine takılmaz.

### 1.0.3 eski dosya adresi ve beyaz ekran kurtarması

Kullanıcının gerçek Chrome sekmesinde boş `#root` ve `assets/index-DUBs5tBM.js` çağrısı görüldü. Bu dosyanın canlı sunucuda 404 döndüğü doğrulandı. Yeni sürümlerde giriş dosyası `assets/app.js`, dinamik parça ve stil adresleri de sabit kalır. Daha önce yayımlanmış dosya adresleri, ilerlemeyi silmeden güncel service worker’ı etkinleştiren küçük kurtarma girişlerine yönlendirilir. Açılış durumu React başlamadan görünür; dosya yüklenemediğinde boş ekran yerine kurtarma ve yeniden deneme alanı vardır. Kurtarma en fazla iki otomatik deneme yapar; `localStorage` silinmez.

Gerçek hata, testte önce silinmiş JavaScript dosyasına bakan eski HTML’yi bir service worker önbelleğine kurarak üretildi. Yeni dağıtımdan sonra sayfa hâlâ o eski HTML’yi alırken kurtarma girişi uygulamayı açtı ve yazılı ödev kaydını korudu. İkinci testte güncel giriş dosyasının ilk isteği 404 yapıldı ve uygulamanın kendiliğinden açıldığı görüldü. İki test de Chrome ve mobil WebKit için çalışır; toplam tarayıcı testi 114’tür.

### 1.0.2 HTTP önbelleği düzeltmesi

Canlı 1.0.0 → 1.0.1 geçiş testi, yeni service worker etkinleşmesine rağmen önbelleğe eski HTML’nin konabildiğini gösterdi. Test sunucusu GitHub Pages gibi `Cache-Control: public, max-age=600` başlığıyla çalışacak şekilde değiştirildi; eski kodda ilk sekme bile yeni sürüm işaretine geçemedi. Kurulumdaki tüm statik dosya istekleri artık `cache: reload` ile HTTP önbelleğini yeniden doğruluyor. Service worker üretim kodu da önbellek sürümünün hash hesabına katılıyor; yalnızca önbellek algoritması değişse bile ayrı bir sürüm oluşuyor. İki sekmeli geçiş, hata/yeniden deneme ve ilerleme koruma testleri Chrome ve mobil WebKit’te bu önbellek başlıklarıyla geçti.

### 1.0.1 güncelleme düzeltmesi

İki açık sekmeyle gerçek service worker güncellemesi test edildi. Önceki sürümde birinci sekme yeni sürümü etkinleştirince ikinci sekmedeki bildirim kalıyor, düğme `registration.waiting` boş olduğu için hiçbir şey yapmıyordu. Test bu hatayı eski kodda yeniden üretti. Yeni sürüm diğer sekmede etkinleşmiş güncellemeyi izler; kullanıcının güncelle düğmesi yeni sayfayı açar. Sekmeler kendiliğinden yeniden yüklenmez; indirilmemiş ses kayıtları için kullanıcı kontrolü korunur. Gönderim hatası enjekte edilerek hata metni, yeniden deneme ve ardından başarılı güncelleme de sınandı. İlerleme kaydı iki sekmede de korunur. Bu test Chrome ve mobil WebKit için iki ek senaryo getirir (toplam 110 tarayıcı testi).

- Otomatik ses testlerinde sentez arayüzü test sesiyle taklit edilir. Kuyruk, etiketler ve düğmeler doğrulanır; insan kulağıyla sesin doğallığı veya fiziksel iPhone hoparlörü doğrulanmaz.
- iPhone Safari/Chrome’da gerçek sentez, mikrofon izni, indirilen ses dosyası, ana ekrana ekleme ve işletim sistemi çevrimdışı ses paketi Hatice’nin telefonunda ayrıca denenmelidir.
- Mikrofon izni reddi ve destek yokluğu test edildi. Gerçek mikrofonla kayıt kalitesi değerlendirilmedi. Kayıtlar sunucuya gönderilmez ve indirilmeyen kayıt ekrandan ayrılınca kaybolur; bu durum arayüzde yazılıdır.
- 29/40/18 ve 8–10 dakika tahmindir. Hatice ile gerçek öğrenme süresi, yorgunluk, anlaşılırlık ve görev zorluğu pilotu yapılmadı. Sayısal içerik hedefinin tutması bu süreyi kanıtlamaz.
- Konuşma ve kişisel cümleler otomatik dil modeliyle puanlanmaz. Model cevap + öz değerlendirme ve Berk dönütü vardır. Son soru cevapları destek sonrasını içerebilir; bağımsız ölçme sınavı değildir.
- Harici kaynakların resmi adresleri araştırmada açıldı. YouTube/Google bağlantıları doğru kodlanmış arama URL’leridir; sonuçların seviyesi ve erişilebilirliği zamanla değişebilir.
- Otomatik erişilebilirlik kontrolü insan ekran okuyucu ve gerçek klavye kullanımının tam eşdeğeri değildir. Yerel HTML semantiği, etiketler, odak işareti ve dokunma hedefleri ayrıca uygulandı.

Canlı dağıtım sonucu GitHub Actions çalışmasında ayrıca görülebilir. Sayfa açılışı, ders bağlantısı ve manifest dağıtımdan sonra kontrol edilir.
