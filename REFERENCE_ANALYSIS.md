# Referans incelemesi ve eğitim haritası

`Hatice_Calisma_Kitabi_1_Hafta_Detayli_Duzeltilmis.html` ve `Berk_Ogretmen_Rehberi_1_Hafta_Detayli.html` ZIP paketinden yerel `reference/` klasörüne çıkarıldı. `RTK.md` çalışma klasöründe ve bakılan üst dizinlerde bulunmadı; dolayısıyla içeriği varsayılmadı.

Korunan güçlü yanlar: Türkçe yönlendirme, yetişkin öğrenciye uygun gündelik konular, kısa dil kalıpları, somut ödev, haftada iki kez Berk desteği, metinsiz → metinli → yeniden metinsiz → yeni bağlam yaklaşımı. Dil seviyesi tamamen sıfır kabul edilmiyor.

Görülen sınırlar: bir haftalık kapsam, bireysel derslerde tek 4–5 sıralı diyalog, çoğunlukla üç anlama sorusu ve iki boşluk, tek uzun ekran, dışa aktarılamayan tarayıcı kaydı, genel kısa sürüm. Kaynak sürümün `transcriptText` fonksiyonu `x[1]` kullanarak A/B etiketlerini zaten ayırmış. Kullanıcının eski sürümden bildirdiği ses hatası referansın bu düzeltilmiş işlevinde görülmedi; yeni uygulamada ayrıca regresyon testi ile engellendi. Kaynaktaki `say` iptal çağrısı yapıyor fakat asenkron kuyruk, İngilizce ses yokluğu ve başlatma zaman aşımı için kapsamlı durum yönetimi yok.

## Dört haftalık harita

| Hafta | Pazartesi / Salı | Çarşamba Berk | Perşembe / Cuma | Cumartesi Berk | Pazar |
| --- | --- | --- | --- | --- | --- |
| 1 | Rutin / saatler | Saat ve eylemi ayırt etme | Hobi / kafe | Kafe rol değişimi | Rutin, hobi, sipariş |
| 2 | Ürün bulma / özellik-fiyat | Alışveriş | İhtiyaç / yanlış ürün | Değişim ve ihtiyaç | Yardım ve çözüm |
| 3 | Plan / davet | Müsait gün, saat ve yer | İki geçmiş eylem / sıralama | İki veya üç olaylık hikâye | Plan-geçmiş ayrımı |
| 4 | Yol tarifi / randevu | Yer ve saat doğrulama | Telefon / ofiste sorun | Üç gerçek hayat sahnesi | Genel karşılaştırma |

Her hafta 4 bireysel, 2 partner, 1 tekrar. Yeni günleri takvimle kilitleme yok. Başlangıç 2 Kasım 2026 pazartesi; ayarlardan başka bir pazartesi seçilebilir.

## Hazır oluş ve destek ölçütü

Haftalık tekrarda anlama sorularında %80 ve üç konuşma görevinin en az ikisinde özgün, ipucusuz üretim hedeflenir. Uygulamadaki son cevaplar destek aldıktan sonraki durumu gösterir; standartlaştırılmış sınav veya bağımsız ilk deneme puanı değildir. Konuşma öz değerlendirmesini Berk gerçek konuşmada gözlemlemelidir. Yetersiz kalan beceri varsa yeni haftaya geçmek zorunda kalmadan önceki dersin kısa dinlemesi önerilir. Dört hafta tamamlanınca otomatik A2 iddiası yok.

Geçmiş zamanda yeni çekim tablosu yerine stayed / watched / cooked parçaları kullanılır. Zorlanırsa iki fiil ve iki olayla sınırlanır; went / made önce dinlemede tanınır. Dinleme başarılıysa konuşma hedefi ayrıntıyla genişler; boş tekrar sayısı artırılmaz.

## Akış ve süre sınırı

Tam bireysel akış: 3 dakika geri çağırma, 7 dinleme, 5 anlama, 5 üretim, 6 konuşma, 3 çıktı. Kullanıcıya süreyi doldurmak için bekleme zorunluluğu yok. Geri çağırma, iki tur dinleme, rol değiştirme ve kendi cümlesini kurma sesli yapılır; yalnızca düğmelere basmak 29 dakikalık öğrenme sayılmaz. Erken bitene her derste konuya özel iki ek görev var. Gerçek Hatice pilotu olmadan 25–30 dakikayı her gün kesin karşıladığı iddia edilmez.

Kısa sürüm: bir temel diyalog, ona dayanan bir anlama sorusu ve kişisel konuşma görevi. Tam çalışma işaretinden ayrı. Partner dersinde de yorgun gün için kısa bireysel seçenek bulunur; bu, birlikte 40 dakikalık ders yapılmış sayılmaz.
