import type {Dialogue, Exercise, Lesson, Question, SourceCredit} from './types';

// The first two dialogues and all existing progress keys stay in their original order.
type Check = [line: number, prompt: string, correct: string, other: string, other: string];
type Scene = {dialogue: Dialogue; checks: Check[]};
type Practice = {scenes: Scene[]; writing: [string,string,string,string,string,string]; roleplay: string};
const source = (number:number,title:string,url:string):SourceCredit=>({title:`Let's Learn English ${number}: ${title}`,author:'VOA Learning English',url,license:'Public domain',rightsUrl:'https://learningenglish.voanews.com/p/6021.html',changes:'A1 için kısaltılıp uyarlandı. Türkçe çeviri ve etkinlikler bu proje için yazıldı. Orijinal dersin metni daha uzundur.'});
const credits = {
  food:source(23,'What Do You Want?','https://learningenglish.voanews.com/a/lets-learn-english-lesson-23-what-do-you-want/3413753.html'),
  shopping:source(35,"Let's Make Dinner!",'https://learningenglish.voanews.com/a/lets-learn-english-lesson-35-lets-make-dinner/3571922.html'),
  past:source(24,'Yesterday Was Amazing!','https://learningenglish.voanews.com/a/lets-learn-english-lesson-24-yesterday-was-amazing/3439164.html'),
  office:source(46,'May I Borrow That?','https://learningenglish.voanews.com/a/lets-learn-english-lesson-46-may-i-borrow-that/3723588.html'),
};
const scene=(title:string,gist:string,text:string,checks:Check[],credit?:SourceCredit,names=['Alex','Mia']):Scene=>({dialogue:{title,gist,lines:text.trim().split('\n').map((line,i)=>{const [en,tr]=line.split('|');return {speaker:names[i%names.length],en,tr};}),...(credit?{source:credit}:{})},checks});

const practice:Record<string,Practice>={
 'w1-d1':{
  scenes:[
   scene('İki farklı akşam','İki kişinin işten sonraki ilk işini ve ortak noktasını ayır.',`What do you usually do after work, Mia?|İşten sonra genellikle ne yaparsın Mia?
I get home at six and change my clothes.|Altıda eve gelirim ve kıyafetlerimi değiştiririm.
Do you make dinner when you get home?|Eve gelince yemek yapar mısın?
Not first. I sit down and have some tea.|Önce değil. Oturup biraz çay içerim.
I usually cook first because I am hungry.|Ben genellikle önce yemek yaparım çünkü aç olurum.
Do you watch television after you have dinner?|Yemek yedikten sonra televizyon izler misin?
Sometimes, but I usually listen to music instead.|Bazen ama genellikle onun yerine müzik dinlerim.
I like music too. We both need a quiet evening.|Ben de müzik severim. İkimizin de sakin bir akşama ihtiyacı var.`,[[1,'Mia eve kaçta geliyor?','Altıda','Beşte','Yedide'],[3,'Mia eve gelince önce ne yapıyor?','Oturup çay içiyor','Yemek yapıyor','Televizyon izliyor'],[6,'Alex yemekten sonra daha sık ne yapıyor?','Müzik dinliyor','Televizyon izliyor','Kıyafet değiştiriyor']]),
   scene('Her gün aynı değil','Genellikle yapılan işle bugün yapılan işin farkını bul.',`Do you go for a walk after work every day?|İşten sonra her gün yürüyüşe çıkar mısın?
No, I usually walk on Monday and Thursday.|Hayır, genellikle pazartesi ve perşembe yürürüm.
What do you do on the other evenings?|Diğer akşamlarda ne yaparsın?
I stay at home and paint a little.|Evde kalıp biraz resim yaparım.
Do you paint after work today too?|Bugün de işten sonra resim yapar mısın?
Not today. My sister is here, so we cook together.|Bugün değil. Kız kardeşim burada, birlikte yemek yapıyoruz.
That sounds nice. Do you have dinner at home?|Kulağa hoş geliyor. Akşam yemeğini evde mi yersiniz?
Yes, and after dinner we look at my paintings.|Evet, yemekten sonra da resimlerime bakarız.`,[[1,'Yürüyüş hangi günlerde?','Pazartesi ve perşembe','Her iş günü','Salı ve cuma'],[5,'Bugün rutin neden değişiyor?','Kız kardeşi yanında','Resim kursu var','İşten geç geliyor'],[7,'Yemekten sonra neye bakacaklar?','Resimlere','Akşam haberlerine','Yemek tarifine']]),
   scene('Yeni komşuyla ilk sohbet','Sohbeti başlatan soruya, cevaba ve karşı soruya dikkat et.',`Hello, I am Alex. I live in the next building.|Merhaba, ben Alex. Yandaki binada yaşıyorum.
Nice to meet you. I am Mia. Do you work near here?|Tanıştığımıza memnun oldum. Ben Mia. Yakında mı çalışıyorsun?
Yes, at the small office next to the bank.|Evet, bankanın yanındaki küçük ofiste.
That is close. What do you do after work?|Yakınmış. İşten sonra ne yaparsın?
I usually walk home, then I make a simple dinner.|Genellikle eve yürür, sonra basit bir yemek yaparım.
I often buy coffee on my way home.|Ben eve gelirken sık sık kahve alırım.
Where do you buy it? Is there a good café here?|Nereden alırsın? Burada iyi bir kafe var mı?
Yes, near the park. We can go there another day.|Evet, parkın yakınında. Başka gün oraya gidebiliriz.`,[[2,'Alex nerede çalışıyor?','Bankanın yanındaki ofiste','Parktaki kafede','Yandaki bankada'],[4,'Alex eve nasıl dönüyor?','Yürüyerek','Otobüsle','Komşusuyla arabayla'],[6,'Alex sohbeti nasıl sürdürüyor?','Kahvenin nereden alındığını soruyor','Sadece vedalaşıyor','İş saatini soruyor']]),
   scene('Berk’e sesli mesaj','Mesajdaki üç işi sırayla hatırla; olmayan bir ayrıntı ekleme.',`Hi, Berk. Can you talk now, or are you busy?|Merhaba Berk. Şimdi konuşabilir misin, meşgul müsün?
I am on the bus. Tell me about your evening.|Otobüsteyim. Akşamını anlat.
First, I make tea and sit by the window.|Önce çay yapıp pencerenin yanına otururum.
That sounds relaxing. What do you do next?|Dinlendirici geliyor. Sonra ne yaparsın?
Then I paint for a little while before dinner.|Sonra yemekten önce bir süre resim yaparım.
Do you paint with music or in a quiet room?|Müzikle mi, sessiz bir odada mı resim yaparsın?
With music. After dinner I read a few pages.|Müzikle. Yemekten sonra birkaç sayfa okurum.
Tea, painting, then reading. I like your evening!|Çay, resim, sonra kitap. Akşamını sevdim!`,[[1,'Berk mesajı nerede dinliyor?','Otobüste','Ofiste','Evde'],[4,'Resim ne zaman yapılıyor?','Yemekten önce','Yemekten sonra','Çaydan önce'],[6,'Yemekten sonraki iş ne?','Birkaç sayfa okumak','Resim yapmak','Kahve almak']]),
  ],
  writing:['Komşun “What do you do after work?” diye yazdı. Önce ne yaptığını, ardından ikinci bir işi söyle. Ona da bir soru sor.','After work, I make coffee. Then I paint a little. What do you do after work?','Mesajda resim yerine müzik, çay yerine kahve olsun. İki yeni cümle yaz.','First, I make coffee. Then I listen to music.','İki bilgiyi then ile sıraya koy: I get home. I make dinner. Sonuna kendi akşamından bir iş ekle.','I get home, then I make dinner. After dinner, I read a book.'],
  roleplay:'Yeni komşunla 6 sıra konuş: kendini tanıt → işten sonraki rutinini sor → cevap ver → bir ayrıntı sor → cevap ver → başka bir gün kahve öner. Berk yoksa iki rolü de seslendir.',
 },
 'w1-d2':{
  scenes:[
   scene('Aynı saat, farklı iş','Başlangıç ile bitiş saatini birbirine karıştırma.',`What time do you start work in the morning?|Sabah işe kaçta başlarsın?
At nine, but I leave home at eight fifteen.|Dokuzda ama evden sekiz on beşte çıkarım.
Do you have breakfast at home before you leave?|Çıkmadan önce evde kahvaltı eder misin?
Yes, at half past seven, with a cup of tea.|Evet, yedi buçukta bir fincan çayla.
What time do you finish work on a normal day?|Normal bir günde işi kaçta bitirirsin?
Usually at five. On Friday I finish at four.|Genellikle beşte. Cuma günü dörtte bitiririm.
Can we have coffee at five on Friday then?|O zaman cuma beşte kahve içebilir miyiz?
Yes. I have an hour to get there after work.|Evet. İşten sonra oraya gitmek için bir saatim var.`,[[1,'İşe başlama saati kaç?','09.00','08.15','07.30'],[5,'Cuma günü iş kaçta bitiyor?','16.00','17.00','15.00'],[6,'Kahve için önerilen saat?','Cuma 17.00','Cuma 16.00','Her gün 17.00']]),
   scene('Değişen kurs saati','Eski saatten sonra söylenen yeni saati not al.',`Is the painting class at six this evening?|Resim dersi bu akşam altıda mı?
It usually starts at six, but today it starts later.|Genellikle altıda başlıyor ama bugün daha geç.
Oh, what time does it start today?|Öyle mi, bugün kaçta başlıyor?
At half past six. The teacher has a meeting.|Altı buçukta. Öğretmenin toplantısı var.
I finish work at five. I can have dinner first.|İşim beşte bitiyor. Önce yemek yiyebilirim.
Good idea. Can we meet outside the class at six twenty?|İyi fikir. Dersin önünde altı yirmide buluşabilir miyiz?
Yes. Six twenty outside, and the class at six thirty.|Evet. Dışarıda altı yirmi, ders altı otuz.
Exactly. Bring your brushes, and I will bring the paper.|Aynen. Fırçalarını getir, ben kâğıt getireceğim.`,[[3,'Bugünkü dersin yeni saati?','18.30','18.00','18.20'],[5,'Kapının önünde kaçta buluşacaklar?','18.20','18.30','17.00'],[7,'İlk konuşan ne getirmeli?','Fırça','Kâğıt','Yemek']]),
   scene('Otobüs mü, kahvaltı mı?','İki seçeneğin saatini ve son seçimi takip et.',`The first bus leaves at seven forty. Is that too early?|İlk otobüs yedi kırkta kalkıyor. Çok mu erken?
Yes, I have breakfast at seven thirty every morning.|Evet, her sabah yedi otuzda kahvaltı ederim.
There is another bus at eight ten. Does that work?|Sekiz onda başka bir otobüs var. Uyar mı?
What time does it arrive at the office?|Ofise kaçta varıyor?
At eight forty-five, fifteen minutes before work starts.|Sekiz kırk beşte, iş başlamadan on beş dakika önce.
That is better. I do not want to miss breakfast.|Bu daha iyi. Kahvaltıyı kaçırmak istemiyorum.
Then let us meet at the bus stop at eight.|O zaman durakta sekizde buluşalım.
All right. At eight, not eight ten. See you there.|Peki. Sekizde, sekiz onda değil. Orada görüşürüz.`,[[2,'Seçilen otobüs kaçta kalkıyor?','08.10','07.40','08.00'],[4,'İş kaçta başlıyor?','09.00','08.45','08.10'],[7,'Duraktaki buluşma saati?','08.00','08.10','08.45']]),
   scene('Hafta sonu programı','Hafta içiyle pazar gününün farkını dinle.',`Do you get up at seven on Sunday too?|Pazar günü de yedide mi kalkarsın?
No, I get up at nine because I do not work.|Hayır, çalışmadığım için dokuzda kalkarım.
What time do you have your first coffee?|İlk kahveni kaçta içersin?
At ten, after a slow breakfast with my family.|Onda, ailemle sakin bir kahvaltıdan sonra.
Do you paint in the morning on Sunday?|Pazar sabahı resim yapar mısın?
Not in the morning. I paint at three in the afternoon.|Sabah değil. Öğleden sonra üçte resim yaparım.
And when do you go for a walk?|Peki ne zaman yürüyüşe çıkarsın?
At five, before dinner. Sunday is my quiet day.|Beşte, yemekten önce. Pazar sakin günümdür.`,[[1,'Pazar kalkış saati?','09.00','07.00','10.00'],[5,'Resim hangi vakitte?','Öğleden sonra üçte','Sabah onda','Akşam beşte'],[7,'Yürüyüş ne zamana denk geliyor?','Yemekten önce','Kahvaltıdan önce','Resimden önce']]),
  ],writing:['Berk “When can we have coffee?” diyor. İşinin bitişini, buluşma saatini ve yerini en az üç bilgiyle yaz.','I finish work at five. We can have coffee at six near the park. Is that good?','Ders normalde altıda, bugün yedide. Arkadaşına değişikliği ve yeni buluşma saatini yaz.','The class usually starts at six. Today it starts at seven. Let us meet at six fifty.','Kendi gününden üç işi saatleriyle sıraya koy; örnek saatleri değiştirebilirsin.','I have breakfast at eight. I start work at nine. I have dinner at seven.'],roleplay:'Berk iş saatini ve öğle arasını sorsun. Sonra sana uymayan bir kahve saati önersin. Yeni saat öner ve en sonda günü, yeri ve saati karşılıklı doğrulayın: en az 6 sıra.',
 },
 'w1-d4':{
  scenes:[
   scene('Hobiyi biraz aç','Bir şeyin sevilmesiyle ne sıklıkta yapıldığını ayır.',`I know you like painting. What do you like to paint?|Resim yapmayı sevdiğini biliyorum. Ne çizmeyi seversin?
I like painting trees and small houses with bright colours.|Ağaçları ve küçük evleri canlı renklerle çizmeyi severim.
Do you paint every evening after work?|Her akşam işten sonra resim yapar mısın?
No, only twice a week. I am often tired.|Hayır, haftada yalnızca iki kez. Sık sık yorgun olurum.
I like drawing too, but I am not very good.|Ben de çizim severim ama çok iyi değilim.
That is fine. You do not need a perfect picture.|Sorun değil. Kusursuz bir resim gerekmiyor.
Can we try together on Saturday afternoon?|Cumartesi öğleden sonra birlikte deneyebilir miyiz?
Yes. Bring a pencil. You can use my paper.|Evet. Bir kalem getir. Benim kâğıdımı kullanabilirsin.`,[[1,'Mia ne çizmeyi seviyor?','Ağaç ve küçük ev','İnsan portresi','Yemek'],[3,'Ne sıklıkla resim yapıyor?','Haftada iki kez','Her akşam','Yalnızca ayda bir'],[7,'Alex ne getirmeli?','Kalem','Kâğıt','Tablo']]),
   scene('Aynı zevk, farklı ortam','Ortak hobiyi ve farklı tercihi bul.',`What do you do when you want to relax?|Rahatlamak istediğinde ne yaparsın?
I listen to music, usually with a cup of coffee.|Müzik dinlerim, genellikle bir fincan kahveyle.
Do you like loud music when you paint?|Resim yaparken yüksek sesli müzik sever misin?
No, I like quiet music. Loud music is difficult for me.|Hayır, sakin müzik severim. Yüksek sesli müzik bana zor gelir.
I listen to music outside, when I go for walks.|Ben dışarıda yürüyüş yaparken müzik dinlerim.
Do you walk alone or with a friend?|Yalnız mı, bir arkadaşınla mı yürürsün?
Usually alone, but on Sunday I walk with my sister.|Genellikle yalnız ama pazar günü kız kardeşimle yürürüm.
We both like music, then, but in different places.|Demek ikimiz de müzik severiz ama farklı yerlerde.`,[[3,'Resim yaparken hangi müzik tercih ediliyor?','Sakin müzik','Yüksek sesli müzik','Müziksiz oda'],[4,'Alex nerede müzik dinliyor?','Yürüyüşte','Resim kursunda','Kahve alırken'],[6,'Pazar yürüyüşünde kim var?','Kız kardeşi','İş arkadaşı','Kimse yok']]),
   scene('Yeni bir kurs seçmek','İlk öneri yerine kabul edilen seçeneği yakala.',`There is a cooking class near my house. Are you interested?|Evimin yakınında yemek kursu var. İlgilenir misin?
I like eating, but I do not really like cooking.|Yemek yemeyi severim ama yemek yapmayı pek sevmem.
What about a photography class? You like taking pictures.|Fotoğraf kursuna ne dersin? Fotoğraf çekmeyi seviyorsun.
Yes, but I only have my phone, not a camera.|Evet ama yalnızca telefonum var, fotoğraf makinem yok.
The class is for phone pictures. It is on Saturday.|Kurs telefon fotoğrafları için. Cumartesi günü.
That sounds good. Is it in the morning or afternoon?|Kulağa iyi geliyor. Sabah mı, öğleden sonra mı?
In the morning, at ten. We can have lunch after.|Sabah onda. Sonra öğle yemeği yiyebiliriz.
Great. Let us try that one together this weekend.|Harika. Bu hafta sonu o kursu birlikte deneyelim.`,[[1,'İlk öneri neden uymuyor?','Yemek yapmayı pek sevmiyor','Ev çok uzak','Telefonu yok'],[4,'Kurs için hangi cihaz yeterli?','Telefon','Fotoğraf makinesi','Bilgisayar'],[6,'Kurs sonrası önerilen iş?','Öğle yemeği','Kahvaltı','Akşam yürüyüşü']]),
   scene('Hobiler üzerine kısa röportaj','Cevaptan sonra gelen neden ve karşı soruya kulak ver.',`Can I ask you three questions about your hobbies?|Hobilerin hakkında üç soru sorabilir miyim?
Of course. I like talking about things I enjoy.|Elbette. Sevdiğim şeylerden bahsetmeyi severim.
First, do you prefer reading or watching films?|Önce, okumayı mı film izlemeyi mi tercih edersin?
Reading. I can stop and think about the story.|Okumayı. Durup hikâyeyi düşünebilirim.
Second, where do you usually read your books?|İkinci olarak, kitaplarını genellikle nerede okursun?
On the sofa at home, never on the bus.|Evde kanepede, otobüste hiç okumam.
And third, what do you want to try next?|Üçüncü olarak, sırada ne denemek istersin?
Painting. You paint, do you not? Can you help me start?|Resim yapmayı. Sen resim yapıyorsun, değil mi? Başlamama yardım eder misin?`,[[3,'Okuma neden tercih ediliyor?','Durup düşünmek için','Otobüs yolculuğu için','Film bulamadığı için'],[5,'Nerede okumuyor?','Otobüste','Evde','Kanepede'],[7,'Sıradaki hobi ne?','Resim','Müzik','Fotoğraf']]),
  ],writing:['Yeni bir kurs arkadaşına kendini anlat: sevdiğin iki hobi, bunlardan birini ne zaman yaptığın ve ona bir soru.','I like painting and reading. I usually paint on Sunday afternoon. What do you like doing?','Yemek kursuna katılamıyorsun; sevmediğin şeyi kibarca söyle ve farklı bir etkinlik öner.','I do not really like cooking. What about a painting class on Saturday?','İki bilgiyi but ile bağla, ardından sıklık ekle: I like painting. I am often tired after work.','I like painting, but I am often tired after work. I paint twice a week.'],roleplay:'Berk ile hobi röportajı yapın: bir tercih, bir neden ve bir zaman sorusu sor. Cevapları dinleyip ortak bir etkinlik seçin. Rol değiştirin; aynı üç soruyu okumadan yeniden sorun.',
 },
 'w1-d5':{
  scenes:[
   scene('Eksik sipariş','Sipariş edilenle masaya geleni karşılaştır.',`Excuse me, I ordered a small coffee and a cheese sandwich.|Affedersiniz, küçük kahve ve peynirli sandviç söylemiştim.
Here is your coffee. The sandwich will be here soon.|Kahveniz burada. Sandviçiniz birazdan gelecek.
Thank you. Is there milk in this coffee?|Teşekkürler. Bu kahvede süt var mı?
No, it is black coffee. Would you like some milk?|Hayır, sade kahve. Biraz süt ister misiniz?
Yes, please, and a glass of water too.|Evet lütfen, bir de bir bardak su.
Of course. Do you want the sandwich here or to go?|Elbette. Sandviçi burada mı yersiniz, paket mi?
Here, please. I have time before my next meeting.|Burada lütfen. Sonraki toplantıma kadar vaktim var.
All right. I will bring the milk and water now.|Peki. Sütü ve suyu şimdi getireceğim.`,[[0,'Kahvenin yanında ne sipariş edilmiş?','Peynirli sandviç','Kek','Tavuklu sandviç'],[3,'Gelen kahvede süt var mı?','Yok, sonra isteniyor','Var','Yalnızca soğuk süt var'],[6,'Sipariş nerede tüketilecek?','Kafede','Ofiste','Yolda']]),
   scene('Menüde iki seçenek','Fiyatı ve seçimden vazgeçme nedenini yakala.',`Can I have a large tea and a chocolate cake, please?|Büyük çay ve çikolatalı kek alabilir miyim, lütfen?
We have tea, but there is no chocolate cake today.|Çayımız var ama bugün çikolatalı kek yok.
What other cakes do you have this afternoon?|Bu öğleden sonra başka hangi kekleriniz var?
Carrot cake for four pounds, or lemon cake for three.|Dört sterline havuçlu, üç sterline limonlu kek.
I will have the lemon cake, please. Is it fresh?|Limonlu kek alayım lütfen. Taze mi?
Yes, we make it every morning. Is this to go?|Evet, her sabah yapıyoruz. Paket mi olacak?
Yes, please. And a small tea instead of a large one.|Evet lütfen. Bir de büyük yerine küçük çay olsun.
Small tea and lemon cake to go. That is five pounds.|Paket küçük çay ve limonlu kek. Beş sterlin.`,[[1,'İlk kek seçeneği neden değişiyor?','Çikolatalı kek yok','Çok pahalı','Taze değil'],[4,'Seçilen kek hangisi?','Limonlu','Havuçlu','Çikolatalı'],[7,'Son sipariş ve toplam?','Küçük çay + limonlu kek, £5','Büyük çay + kek, £4','Küçük çay + havuçlu kek, £3']]),
   scene('İki kişilik sipariş','İki kişinin farklı içeceklerini ve ortak isteğini ayır.',`Are you ready to order, or do you need a minute?|Siparişe hazır mısınız, bir dakika ister misiniz?
We are ready. I would like a small coffee, no sugar.|Hazırız. Küçük kahve istiyorum, şekersiz.
And for your friend? Would she like coffee too?|Arkadaşınız için? O da kahve ister mi?
No, a large tea with milk, please. We both want water.|Hayır, sütlü büyük çay lütfen. İkimiz de su istiyoruz.
Two glasses of water. Anything to eat with that?|İki bardak su. Yanına yiyecek bir şey var mı?
One cheese sandwich. Can you cut it in half?|Bir peynirli sandviç. İkiye bölebilir misiniz?
Certainly. Are you sitting inside or outside today?|Elbette. Bugün içeride mi dışarıda mı oturuyorsunuz?
Outside, by the window. Thank you for your help.|Dışarıda, pencerenin yanında. Yardımınız için teşekkürler.`,[[1,'İlk kişinin kahve tercihi?','Küçük ve şekersiz','Büyük ve sütlü','Küçük ve şekerli'],[3,'Arkadaşı ne içiyor?','Sütlü büyük çay','Sade kahve','Sütlü küçük çay'],[5,'Sandviç için ek rica ne?','İkiye bölünmesi','Paket yapılması','İki tane getirilmesi']]),
   scene('VOA: İstenen yemek kalmadı','Kaynaklı kısa uyarlama: olmayan ürüne verilen cevabı ve para üstünü dinle.',`Hello. I want the chicken dish, please.|Merhaba. Tavuk yemeğini istiyorum, lütfen.
We are out of chicken. I am sorry.|Tavuğumuz kalmadı. Üzgünüm.
You are out of chicken? I will try another food truck.|Tavuğunuz kalmadı mı? Başka bir yemek kamyonunu deneyeceğim.
You are welcome. There are other food trucks over there.|Rica ederiz. İleride başka yemek kamyonları var.
Jonathan, what do you want? The shrimp or the beef?|Jonathan, ne istersin? Karides mi, sığır eti mi?
There is no shrimp, so I will have the beef.|Karides yok, o yüzden sığır eti alacağım.
Your dish is seven dollars. Here is your change.|Yemeğin yedi dolar. Para üstün burada.
I gave you ten dollars. Three dollars back. Thank you.|On dolar verdim. Üç dolar para üstü. Teşekkürler.`,[[1,'İlk yerde hangi yemek yok?','Tavuk','Sığır eti','Tatlı'],[5,'Jonathan hangi yemeğe geçiyor?','Sığır eti','Tavuk','Karides'],[7,'On dolardan ne kadar para üstü?','Üç dolar','Yedi dolar','Beş dolar']],credits.food,['Anna','Çalışan','Anna','Çalışan','Anna','Jonathan','Çalışan','Jonathan']),
  ],writing:['Berk kafeye gidecek. İçeceğinin boyunu, süt/şeker tercihini, yiyeceğini ve paket olup olmadığını mesajla bildir.','Can I have a small coffee with milk, no sugar, and a cheese sandwich to go, please?','İstediğin kek kalmamış. Başka bir kek seç ve yeni siparişini iki cümleyle doğrula.','I will have the lemon cake instead. A small tea and lemon cake to go, please.','İki arkadaşın tercihini tek siparişte birleştir: biri küçük sade kahve, diğeri sütlü büyük çay; ikisi de su istiyor.','A small black coffee and a large tea with milk, please. We would both like water.'],roleplay:'Kafede 6–8 sıra konuşun: sipariş ver → süt/şeker sorusunu cevapla → istediğin yiyecek kalmasın → alternatif seç → fiyatı sor → servis biçimini doğrula. Sonra görevli rolüne geç.',
 },
 'w2-d1':{
  scenes:[
   scene('İki raf arasında','İlk tarifin ardından verilen son konumu bul.',`Excuse me. Can you help me find some paint brushes?|Affedersiniz. Birkaç boya fırçası bulmama yardım eder misiniz?
Of course. Are they for painting walls or pictures?|Elbette. Duvar boyamak için mi, resim için mi?
Pictures. I am starting a small painting class this week.|Resim için. Bu hafta küçük bir resim kursuna başlıyorum.
The art brushes are on the second shelf, near the paper.|Resim fırçaları ikinci rafta, kâğıdın yakınında.
I can see pencils there, but I cannot see brushes.|Orada kalemleri görüyorum ama fırçaları göremiyorum.
Look to the left of the pencils, in the blue box.|Kalemlerin soluna, mavi kutunun içine bakın.
Oh, here they are. Do you also sell small notebooks?|İşte buradalar. Küçük defter de satıyor musunuz?
Yes, behind you. I can show you the different sizes.|Evet, arkanızda. Farklı boyları gösterebilirim.`,[[2,'Fırça ne için kullanılacak?','Resim yapmak','Duvar boyamak','Makyaj yapmak'],[5,'Fırçaların tam yeri?','Kalemlerin solundaki mavi kutu','Kalemlerin sağındaki kutu','Kâğıdın altındaki raf'],[7,'Defterler müşteriye göre nerede?','Arkasında','Önündeki ikinci rafta','Mavi kutuda']]),
   scene('Aranan ürün burada satılmıyor','Olumsuz cevaptan sonra verilen işe yarar bilgiyi dinle.',`Hello. Do you sell phone chargers in this shop?|Merhaba. Bu mağazada telefon şarj cihazı satıyor musunuz?
Sorry, we only sell books and things for writing.|Üzgünüm, yalnızca kitap ve yazı malzemeleri satıyoruz.
Is there a shop near here that sells chargers?|Yakında şarj cihazı satan bir yer var mı?
Yes, next to the supermarket, across from the bank.|Evet, marketin yanında, bankanın karşısında.
Is it open now? It is almost six o'clock.|Şimdi açık mı? Saat neredeyse altı.
It closes at seven, so you still have time.|Yedide kapanıyor, hâlâ vaktiniz var.
Thank you. Before I go, can I buy this notebook?|Teşekkürler. Gitmeden önce bu defteri alabilir miyim?
Of course. That one is three pounds. Here you are.|Elbette. O üç sterlin. Buyurun.`,[[1,'Bu mağazada ne satılmıyor?','Telefon şarj cihazı','Kitap','Defter'],[3,'Şarj cihazı satan mağaza nerede?','Marketin yanında','Bankanın içinde','Kitapçının karşısında'],[5,'Diğer mağazanın kapanışı?','19.00','18.00','17.00']]),
   scene('Yardımın türünü söyle','Ürün bulma, fiyat sorma ve ödeme yerini ayır.',`Can I help you, or are you just looking today?|Yardım edebilir miyim, bugün yalnızca bakıyor musunuz?
I am looking for a small gift for my sister.|Kız kardeşim için küçük bir hediye arıyorum.
We have notebooks, pens and some beautiful postcards here.|Burada defterler, kalemler ve güzel kartpostallar var.
She likes drawing. Can you show me the coloured pencils?|Çizim yapmayı sever. Renkli kalemleri gösterebilir misiniz?
Certainly. This box has twelve different colours in it.|Elbette. Bu kutuda on iki farklı renk var.
That looks good. Is the price on the back?|Güzel görünüyor. Fiyatı arkasında mı?
Yes, eight pounds. You can pay at the front of the shop.|Evet, sekiz sterlin. Mağazanın ön tarafında ödeyebilirsiniz.
Thank you. I will take this box and a postcard.|Teşekkürler. Bu kutuyu ve bir kartpostal alacağım.`,[[1,'Hediye kimin için?','Kız kardeşi','Resim öğretmeni','İş arkadaşı'],[4,'Kutuda ne var?','On iki farklı renk','Sekiz kalem','On iki kartpostal'],[6,'Ödeme nerede yapılacak?','Mağazanın önünde','Üst katta','Arka rafta']]),
   scene('Kibarca tekrar sor','İlk açıklamayı anlamayan müşterinin nasıl yardım istediğini dinle.',`Excuse me, where can I find a bag for my painting things?|Affedersiniz, resim malzemelerim için çantayı nerede bulabilirim?
They are upstairs, next to the large travel bags.|Üst kattalar, büyük seyahat çantalarının yanında.
Sorry, could you say that again slowly, please?|Pardon, tekrar yavaşça söyler misiniz, lütfen?
Upstairs. Go up the stairs and look to your right.|Üst katta. Merdivenden çıkıp sağınıza bakın.
To the right, next to the travel bags. Is that correct?|Sağda, seyahat çantalarının yanında. Doğru mu?
Yes. The small bags are on the bottom shelf.|Evet. Küçük çantalar en alt rafta.
Thank you. Can someone help me upstairs if I need it?|Teşekkürler. Gerekirse üst katta biri yardım edebilir mi?
Yes, my colleague is there. Her name is Sara.|Evet, iş arkadaşım orada. Adı Sara.`,[[1,'Çantalar hangi katta?','Üst katta','Girişte','Bodrumda'],[3,'Merdivenden sonra hangi yön?','Sağ','Sol','Dümdüz'],[5,'Küçük çantalar hangi rafta?','En alt','En üst','Ortadaki']]),
  ],writing:['Bir mağaza çalışanına resim kursun için aradığın ürünü söyle. Ürünün küçük olmasını iste ve yerini sor.','Can you help me, please? I am looking for a small bag for my painting class. Where are the bags?','Çalışanın tarifini anlamadın. Yavaş tekrar iste; sonra üst kat ve sağ taraf bilgisini kendi cümlenle doğrula.','Could you say that again slowly, please? Upstairs, to the right. Is that correct?','Bilgileri müşteriye anlat: defterler arkasında; kalemler ikinci rafta; ödemeler mağazanın önünde.','The notebooks are behind you. The pens are on the second shelf. You can pay at the front.'],roleplay:'Sen resim malzemesi arayan müşteri, Berk görevli olsun. Ürünü bul, bir özelliğini sor, anlaşılmayan tarifi tekrar ettir ve ödeme yerini doğrula. Sonra satılmayan başka bir ürün için alternatif mağaza öner.',
 },
 'w2-d2':{
  scenes:[
   scene('Etiketteki fiyat hangisi?','İki benzer ürünün rengini ve fiyatını eşleştir.',`Excuse me, how much is this blue shirt in the window?|Affedersiniz, vitrindeki bu mavi gömlek ne kadar?
The light blue one is twenty pounds, the dark blue one is thirty.|Açık mavi olan yirmi, koyu mavi olan otuz sterlin.
I mean the light blue one, next to the white shirt.|Beyaz gömleğin yanındaki açık mavi olanı kastediyorum.
That is twenty pounds. We have it in small and medium.|O yirmi sterlin. Küçük ve orta bedenleri var.
Do you have a large one in the same colour?|Aynı rengin büyük bedeni var mı?
Not in light blue, but we have a large white one.|Açık mavisi yok ama beyazın büyük bedeni var.
Can I try the medium blue one before I decide?|Karar vermeden orta beden maviyi deneyebilir miyim?
Of course. The changing room is just behind the mirror.|Elbette. Deneme kabini aynanın hemen arkasında.`,[[1,'Açık mavi gömlek kaç sterlin?','20','30','10'],[5,'Hangi büyük beden mevcut?','Beyaz','Açık mavi','Koyu mavi'],[6,'Müşteri önce neyi deneyecek?','Orta beden mavi','Büyük beden beyaz','Küçük beden mavi']]),
   scene('İndirimdeki çanta','Eski fiyat ile ödenecek fiyatı ayır.',`I like this green bag. Is it in the sale?|Bu yeşil çantayı sevdim. İndirimde mi?
Yes. It was forty pounds, but today it is twenty-five.|Evet. Kırk sterlindi ama bugün yirmi beş.
Do you have the same bag in black or brown?|Aynı çantanın siyahı veya kahverengisi var mı?
We have black. Brown is not available at the moment.|Siyahı var. Kahverengi şu anda yok.
Is the black one twenty-five pounds too?|Siyah olan da yirmi beş sterlin mi?
No, only the green bag is in the sale.|Hayır, yalnızca yeşil çanta indirimde.
Then I will take the green one. Can I pay by card?|O zaman yeşili alacağım. Kartla ödeyebilir miyim?
Yes. Twenty-five pounds, please. Would you like a receipt?|Evet. Yirmi beş sterlin, lütfen. Fiş ister misiniz?`,[[1,'Yeşil çantanın bugünkü fiyatı?','£25','£40','£45'],[5,'Siyah çanta da indirimde mi?','Hayır','Evet','Yalnızca kartla ödenirse'],[6,'Son renk tercihi?','Yeşil','Siyah','Kahverengi']]),
   scene('Ayakkabıyı netleştir','Numara, renk ve iki ürünün toplam fiyatını takip et.',`Do you have these shoes in size thirty-eight, please?|Bu ayakkabının otuz sekiz numarası var mı, lütfen?
Yes, in white and black. Which colour would you like?|Evet, beyazı ve siyahı var. Hangi rengi istersiniz?
White, please. The black ones look nice, but I prefer white.|Beyaz lütfen. Siyahlar güzel ama beyazı tercih ederim.
Here you are. These are thirty-five pounds today.|Buyurun. Bunlar bugün otuz beş sterlin.
They fit well. How much are the small socks near the door?|İyi oldular. Kapının yanındaki küçük çoraplar ne kadar?
Five pounds for a pair. Would you like white socks too?|Bir çifti beş sterlin. Çoraplar da beyaz mı olsun?
No, black socks, please. So that is forty pounds in total?|Hayır, siyah çorap lütfen. Yani toplam kırk sterlin mi?
That is right. The shoes and one pair of socks.|Doğru. Ayakkabı ve bir çift çorap.`,[[0,'İstenen ayakkabı numarası?','38','35','40'],[2,'Ayakkabı için seçilen renk?','Beyaz','Siyah','Yeşil'],[7,'Kırk sterline neler alınıyor?','Ayakkabı ve bir çift çorap','İki çift ayakkabı','Yalnızca beyaz ayakkabı']]),
   scene('Arkadaşın için alışveriş','Mesajdaki tercih ile mağazadaki seçeneği karşılaştır.',`Mia asked me to buy a small red notebook for her.|Mia benden ona küçük kırmızı defter almamı istedi.
We have small notebooks, but only in blue and yellow.|Küçük defterlerimiz var ama yalnızca mavi ve sarı.
Are there any red notebooks on the other shelf?|Diğer rafta kırmızı defter var mı?
Yes, but those are large. They cost six pounds each.|Evet ama onlar büyük. Her biri altı sterlin.
How much is a small blue notebook, then?|Peki küçük mavi defter ne kadar?
Three pounds. The small yellow notebook is the same price.|Üç sterlin. Küçük sarı defter de aynı fiyat.
I will call Mia first. Size is more important to her.|Önce Mia'yı arayayım. Onun için boy daha önemli.
No problem. I can keep the blue one here for you.|Sorun değil. Maviyi sizin için burada tutabilirim.`,[[0,'Mia başlangıçta ne istiyor?','Küçük kırmızı defter','Büyük kırmızı defter','Küçük mavi defter'],[3,'Kırmızı defterin fiyatı?','£6','£3','£9'],[6,'Müşteri karar vermeden ne yapıyor?','Mia’yı arıyor','İki defter alıyor','Başka mağazaya gidiyor']]),
  ],writing:['Görevliye bir gömleğin rengini, bedenini ve fiyatını sor. En az iki soru yaz.','Do you have this shirt in blue and medium, please? How much is it? Can I try it on?','Aradığın kırmızı küçük defter yok. Arkadaşına seçenekleri ve fiyatlarını bildir, hangisini istediğini sor.','They have a small blue notebook for three pounds and a large red one for six. Which one do you want?','Hesabı doğrula: beyaz ayakkabı £35, siyah çorap £5. Ürünleri, renkleri ve toplamı cümlelerle yaz.','The white shoes are thirty-five pounds. The black socks are five pounds. The total is forty pounds.'],roleplay:'Bir rengi ve bedeni iste. O beden o renkte bulunmasın. Başka renk veya beden sor, fiyatını kontrol et, deneme rica et ve son kararını ver. Berk fiyatlardan birini düzeltsin; son toplamı yeniden söyle.',
 },
 'w2-d4':{
  scenes:[
   scene('Kursa giderken eksikler','Gerekli olanı, zaten var olanı ve ödünç alınanı ayır.',`I need some things for my first painting class tomorrow.|Yarınki ilk resim dersim için birkaç şeye ihtiyacım var.
What do you have already? Do you have any brushes?|Zaten nelerin var? Fırçan var mı?
Yes, two brushes, but I need paper and a small bag.|Evet, iki fırçam var ama kâğıt ve küçük çanta gerekiyor.
I have a spare bag. You can use it this week.|Fazladan çantam var. Bu hafta kullanabilirsin.
Thank you. Where can I buy the right paper?|Teşekkürler. Doğru kâğıdı nereden alabilirim?
At the shop near the station. Ask for thick paper.|İstasyonun yakınındaki dükkândan. Kalın kâğıt iste.
Do I need any paint today, or is it at the class?|Bugün boya da gerekiyor mu, yoksa kursta var mı?
The teacher has paint. Just bring your brushes and paper.|Öğretmende boya var. Yalnızca fırçalarını ve kâğıdını getir.`,[[2,'Hangi iki şey eksik?','Kâğıt ve çanta','Fırça ve boya','Boya ve kâğıt'],[3,'Hangi şey ödünç veriliyor?','Çanta','Fırça','Kalın kâğıt'],[7,'Boyayı kim sağlıyor?','Öğretmen','Kırtasiyeci','Arkadaşı']]),
   scene('İhtiyacı tarif ederek anlat','Bilmediğin kelimenin yerine işe yarayan tarifi dinle.',`Excuse me. I need something to carry a hot drink.|Affedersiniz. Sıcak içecek taşımak için bir şeye ihtiyacım var.
Do you mean a cup, or a bottle for travel?|Bir fincan mı, yolculuk için şişe mi demek istiyorsunuz?
A bottle for my coffee. I take the bus to work.|Kahvem için bir şişe. İşe otobüsle gidiyorum.
These travel cups keep drinks hot. Is small okay?|Bu termos bardaklar içecekleri sıcak tutar. Küçük boy olur mu?
Yes, I need a small one that fits in my bag.|Evet, çantama sığacak küçük bir tane gerekiyor.
This one has a lid. Would you like to see it?|Bunun kapağı var. Görmek ister misiniz?
Please. Can I open it with one hand?|Lütfen. Tek elle açabilir miyim?
Yes, like this. It is easy to use on the bus.|Evet, böyle. Otobüste kullanımı kolay.`,[[2,'Ürün ne için?','İşe giderken kahve taşımak','Evde çay yapmak','Resim suyunu taşımak'],[4,'Küçük boy neden gerekli?','Çantasına sığması için','Ucuz olduğu için','Sadece küçük satıldığı için'],[6,'Müşteri hangi kullanımı kontrol ediyor?','Tek elle açmayı','İçeceği soğutmayı','Fiyat etiketini sökmeyi']]),
   scene('İlaçsız basit ihtiyaç','Sorunu, istenen yardımı ve yönlendirilen yeri takip et.',`Could you help me, please? My phone has no battery.|Yardım eder misiniz, lütfen? Telefonumun şarjı yok.
Do you have a charger with you in your bag?|Çantanızda yanınızda şarj cihazı var mı?
Yes, but I need a place to charge it.|Evet ama şarj etmek için bir yer gerekiyor.
There is a socket next to the table by the door.|Kapının yanındaki masanın yanında priz var.
Thank you. Do I need to order something to sit there?|Teşekkürler. Oraya oturmak için bir şey sipariş etmem gerekiyor mu?
Yes, please. A drink is fine; you do not need food.|Evet lütfen. Bir içecek yeterli; yiyecek gerekmiyor.
Then I would like a small tea and a glass of water.|O zaman küçük çay ve bir bardak su istiyorum.
Of course. You can charge your phone while you wait.|Elbette. Beklerken telefonunuzu şarj edebilirsiniz.`,[[2,'Eksik olan hangisi?','Şarj edecek yer','Şarj cihazı','Telefon'],[3,'Priz nerede?','Kapının yanındaki masada','Pencerenin arkasında','Dışarıdaki duvarda'],[5,'Oturmak için ne yeterli?','Bir içecek','Tam bir yemek','Ücretsiz kayıt']]),
   scene('İş arkadaşından malzeme iste','Ne kadar, ne için ve ne zamana kadar gerektiğini bul.',`Do you have a minute? I need some help with this meeting.|Bir dakikan var mı? Bu toplantı için biraz yardım gerekiyor.
Of course. What do you need me to do?|Elbette. Ne yapmamı istiyorsun?
I need six copies of this page before two o'clock.|Saat ikiden önce bu sayfanın altı kopyası gerekiyor.
The printer here has no paper. Is there another printer?|Buradaki yazıcıda kâğıt yok. Başka yazıcı var mı?
Yes, in room four. There is paper next to it.|Evet, dört numaralı odada. Yanında kâğıt var.
I can do that. Do you need pens for the meeting too?|Yapabilirim. Toplantı için kalem de gerekiyor mu?
No, everyone has a pen. Just the six copies, please.|Hayır, herkesin kalemi var. Yalnızca altı kopya lütfen.
All right. I will put them on your desk before two.|Peki. İkiden önce masanın üzerine bırakacağım.`,[[2,'Kaç kopya, ne zamana kadar?','Altı kopya, ikiden önce','Dört kopya, altıdan önce','İki kopya, dörtten önce'],[4,'Alternatif yazıcı nerede?','Oda 4','Oda 6','Oda 2'],[6,'Kalem gerekli mi?','Hayır, herkeste var','Evet, altı tane','Yalnızca bir tane']]),
  ],writing:['Resim dersi için zaten neyin olduğunu, iki ihtiyacını ve bir yardım ricanı arkadaşına yaz.','I have two brushes, but I need thick paper and a small bag. Can I borrow your bag, please?','Telefonunun şarjı yok. Şarj cihazın var, priz gerekiyor. Durumu kafe çalışanına iki cümleyle anlat.','My phone has no battery. I have a charger, but I need a socket. Can I sit here?','Toplantı notu yaz: altı kopya gerekiyor; son saat iki; kalem gerekmiyor.','I need six copies before two o’clock. We do not need pens because everyone has a pen.'],roleplay:'Bir kelimeyi bilmiyormuş gibi yap: adını söylemeden ne işe yaradığını anlat. Berk iki ürün önersin. Doğru olanı seç, boyunu veya miktarını belirt, yardımı kabul edip teşekkür et.',
 },
 'w2-d5':{
  scenes:[
   scene('Fişteki yanlış beden','Sorunu ve değişim sonrası kabul edilen ürünü dinle.',`Hello, I bought this shirt yesterday, but it is too small.|Merhaba, bu gömleği dün aldım ama çok küçük.
I am sorry. Do you have the receipt with you?|Üzgünüm. Fişiniz yanınızda mı?
Yes, here it is. I need a large, not a medium.|Evet, burada. Büyük beden gerekiyor, orta değil.
We have a large in blue, but not in white.|Mavinin büyük bedeni var ama beyazın yok.
I need a white shirt for work. Can I return this one?|İş için beyaz gömlek gerekiyor. Bunu iade edebilir miyim?
Yes, or we can get a large white one for tomorrow.|Evet, ya da yarın için beyazın büyük bedenini getirtebiliriz.
Tomorrow is fine. Can you keep it here for me?|Yarın olur. Benim için burada tutabilir misiniz?
Certainly. Bring this shirt and receipt when you come back.|Elbette. Geldiğinizde bu gömleği ve fişi getirin.`,[[2,'İstenen yeni beden?','Büyük','Orta','Küçük'],[4,'Mavi gömlek neden seçilmiyor?','İş için beyaz gerekli','Mavi çok pahalı','Büyük beden yok'],[6,'Kabul edilen çözüm?','Yarın beyaz büyük bedeni almak','Şimdi mavi almak','Hemen iade etmek']]),
   scene('Çantanın fermuarı','Beden dışında bir problemi açıklayan ifadeye dikkat et.',`Excuse me. There is a problem with this new bag.|Affedersiniz. Bu yeni çantada bir sorun var.
What is wrong? Is it the wrong colour or size?|Sorun ne? Rengi veya boyu mu yanlış?
No, I like the colour, but I cannot close it.|Hayır, rengini seviyorum ama kapatamıyorum.
Let me see. Yes, the zip is not working properly.|Bir bakayım. Evet, fermuar düzgün çalışmıyor.
Can I exchange it for the same bag, please?|Aynı çantayla değiştirebilir miyim, lütfen?
Of course. We have one more green bag in the shop.|Elbette. Mağazada bir yeşil çanta daha var.
Can I try the zip before I take it home?|Eve götürmeden fermuarını deneyebilir miyim?
Please do. This one works. Here is your new receipt.|Lütfen deneyin. Bu çalışıyor. Yeni fişiniz burada.`,[[3,'Çantadaki problem?','Fermuar çalışmıyor','Renk yanlış','Boy çok küçük'],[5,'Değişim çantasının rengi?','Yeşil','Siyah','Mavi'],[6,'Müşteri yenisini almadan ne yapıyor?','Fermuarı deniyor','Fiyat soruyor','Renk değiştiriyor']]),
   scene('Paket karışmış','Sipariş ile teslim edilen ürünün üç farkını takip et.',`I ordered a small blue notebook, but this is not right.|Küçük mavi defter sipariş ettim ama bu doğru değil.
I am sorry. What did you receive in your package?|Üzgünüm. Paketinizden ne çıktı?
A large red notebook and a black pen. I did not order a pen.|Büyük kırmızı defter ve siyah kalem. Kalem sipariş etmedim.
I can send you the correct notebook today.|Doğru defteri bugün gönderebilirim.
Thank you. Do I need to send the wrong things back?|Teşekkürler. Yanlış şeyleri geri göndermem gerekiyor mu?
Yes. Please use the bag in the package. It is free.|Evet. Lütfen paketin içindeki poşeti kullanın. Ücretsiz.
When will the small blue notebook arrive at my house?|Küçük mavi defter evime ne zaman gelir?
Tomorrow morning. We will send you a message first.|Yarın sabah. Önce size mesaj göndereceğiz.`,[[2,'Yanlış gelen defter?','Büyük kırmızı','Küçük kırmızı','Büyük mavi'],[5,'Yanlış ürünler nasıl geri gönderilecek?','Paketteki ücretsiz poşetle','Mağazaya yürüyerek','Yeni kutu satın alarak'],[7,'Doğru ürün ne zaman gelecek?','Yarın sabah','Bugün akşam','Gelecek hafta']]),
   scene('VOA: Yanlış alışveriş listesi','Uyarlamada yanlış ürünün nedeni, doğru listenin yeri ve kalan süreyi bul.',`Anna, do you have the shopping list for dinner?|Anna, akşam yemeği için alışveriş listen var mı?
Yes, Marsha. I have the list. I will buy everything.|Evet Marsha. Liste bende. Her şeyi alacağım.
You bought bananas, coffee and bread. These are wrong!|Muz, kahve ve ekmek almışsın. Bunlar yanlış!
But they are on the list I took from the counter.|Ama tezgahtan aldığım listede bunlar var.
That list is for breakfast. The dinner list was on the refrigerator.|O liste kahvaltı için. Akşam yemeği listesi buzdolabının üzerindeydi.
It is not on the refrigerator now. Look, it is on the floor!|Şimdi buzdolabının üzerinde değil. Bak, yerde!
Our friends will arrive in thirty minutes. What can we do?|Arkadaşlarımız otuz dakika içinde gelecek. Ne yapabiliriz?
I can help. Let us make something with the food we have.|Yardım edebilirim. Elimizdeki yiyeceklerle bir şey yapalım.`,[[3,'Yanlış ürünlerin nedeni?','Kahvaltı listesi alınmış','Mağaza kapalıymış','Muz listede yokmuş'],[5,'Doğru liste şimdi nerede?','Yerde','Tezgahta','Buzdolabının üzerinde'],[6,'Misafirlerin gelişine ne kadar var?','Otuz dakika','On beş dakika','Bir saat']],credits.shopping,['Marsha','Anna']),
  ],writing:['Yeni aldığın bir ürünle ilgili problem bildir: ürünü, sorunu, fişinin olduğunu ve istediğin çözümü yaz.','I bought this bag yesterday. The zip is not working. I have the receipt. Can I exchange it, please?','İstenen beden bugün yok. Yarın almayı kabul et; doğru renk ve bedeni yeniden doğrula.','Tomorrow is fine. I need a large white shirt, please. Can you keep it for me?','Sipariş/teslim farkını iki cümleyle anlat: küçük mavi defter istedin; büyük kırmızı geldi ve kalem sipariş etmedin.','I ordered a small blue notebook, but I received a large red one. I did not order a pen.'],roleplay:'Bir ürünü değiştirme konuşması yapın: ürünü ve sorunu açıkla, fişi sun, ilk alternatif sana uymasın, ikinci çözümü kabul et. Görevli yanlış bedeni tekrar etsin; kibarca düzelt.',
 },
 'w3-d1':{
  scenes:[
   scene('Yarın her şeye zaman yok','İlk planı, zaman engelini ve kabul edilen yeni sırayı takip et.',`What are you going to do after work tomorrow?|Yarın işten sonra ne yapacaksın?
I am going to buy some paint and visit my sister.|Biraz boya alıp kız kardeşimi ziyaret edeceğim.
The art shop closes at six. When do you finish work?|Resim malzemesi dükkânı altıda kapanıyor. İşin kaçta bitiyor?
At five thirty. I can go to the shop first.|Beş buçukta. Önce dükkâna gidebilirim.
Good. Are you going to have dinner with your sister?|Güzel. Kız kardeşinle akşam yemeği yiyecek misin?
Yes, at seven. She is going to cook for us.|Evet, yedide. Bizim için o yemek yapacak.
Then you can buy the paint and still arrive in time.|O zaman boyayı alıp yine zamanında varabilirsin.
Exactly. The shop first, then my sister's house for dinner.|Aynen. Önce dükkân, sonra yemek için kız kardeşimin evi.`,[[3,'Önce nereye gidilecek?','Boya dükkânına','Kız kardeşinin evine','İşyerine'],[5,'Yemeği kim yapacak?','Kız kardeşi','Kendisi','Arkadaşı'],[5,'Akşam yemeği kaçta?','19.00','18.00','17.30']]),
   scene('Hava değişirse plan da değişir','İki hava durumuna göre yapılacak iki işi eşleştir.',`Are we going to walk in the park tomorrow morning?|Yarın sabah parkta yürüyecek miyiz?
I hope so, but the weather may be bad.|Umarım ama hava kötü olabilir.
What are we going to do if it rains?|Yağmur yağarsa ne yapacağız?
We can go to the small museum near the station.|İstasyonun yakınındaki küçük müzeye gidebiliriz.
That sounds good. What time are we going to meet?|Kulağa iyi geliyor. Kaçta buluşacağız?
At ten, outside the station. Bring your bus card.|Onda, istasyonun dışında. Otobüs kartını getir.
All right. A walk if it is sunny, a museum if it rains.|Peki. Güneşliyse yürüyüş, yağmurluysa müze.
Yes. I will send you a message before I leave home.|Evet. Evden çıkmadan sana mesaj göndereceğim.`,[[3,'Yağmurlu hava için plan?','Müze','Parkta yürüyüş','Evde kalmak'],[5,'Buluşma yeri?','İstasyonun dışı','Müzenin içi','Park kapısı'],[7,'Evden çıkmadan ne yapılacak?','Mesaj gönderilecek','Bilet alınacak','Kahve içilecek']]),
   scene('Küçük seyahat hazırlığı','Planlanan işle tamamlanmış hazırlığı birbirine karıştırma.',`I am going to visit my friend in another city on Saturday.|Cumartesi başka şehirdeki arkadaşımı ziyaret edeceğim.
That is nice. Are you going to travel by train?|Ne güzel. Trenle mi gideceksin?
Yes, in the morning. I already have my ticket.|Evet, sabah. Biletim zaten var.
What are you going to take in your bag?|Çantana ne alacaksın?
A book, my phone charger and a present for my friend.|Bir kitap, telefon şarj cihazım ve arkadaşıma bir hediye.
Are you going to buy the present before Saturday?|Hediyeyi cumartesiden önce mi alacaksın?
Yes, tomorrow after work. I want to find a small painting.|Evet, yarın işten sonra. Küçük bir tablo bulmak istiyorum.
Good idea. Do not forget your ticket and your charger.|İyi fikir. Biletini ve şarj cihazını unutma.`,[[2,'Hangi hazırlık zaten tamam?','Bilet alınmış','Hediye alınmış','Çanta hazırlanmış'],[4,'Çantadaki üç şey?','Kitap, şarj cihazı, hediye','Boya, kitap, bilet','Telefon, kahve, yiyecek'],[6,'Hediye ne zaman alınacak?','Yarın işten sonra','Cumartesi trende','Bugün öğlen']]),
   scene('Birlikte yapılacak hazırlık','Kimin hangi işi üstlendiğini hatırla.',`We are going to have coffee at home with Sara tomorrow.|Yarın Sara ile evde kahve içeceğiz.
Great. Are you going to make something to eat too?|Harika. Yiyecek bir şey de yapacak mısın?
Yes, I am going to make sandwiches before she arrives.|Evet, o gelmeden sandviç yapacağım.
Then I am going to buy some cake after work.|O zaman ben de işten sonra kek alacağım.
Thank you. Do we need milk, or is there some at home?|Teşekkürler. Süt gerekiyor mu, evde var mı?
There is milk, but we need more coffee. I can buy that too.|Süt var ama daha fazla kahve gerekiyor. Onu da alabilirim.
Perfect. Sara is going to arrive at six thirty.|Harika. Sara altı buçukta gelecek.
I will be home at six. We have time to prepare.|Altıda evde olurum. Hazırlık için vaktimiz var.`,[[2,'Sandviçi kim hazırlayacak?','İlk konuşan','Sara','İkinci konuşan'],[5,'Süt için ne yapılacak?','Alınmayacak, evde var','Sara getirecek','İşten sonra alınacak'],[6,'Sara’nın geliş saati?','18.30','18.00','17.30']]),
  ],writing:['Yarın işten sonra yapacağın iki işi sırayla yaz. Bir buluşma saati ekle ve arkadaşına uygun olup olmadığını sor.','Tomorrow I am going to buy some paint. Then I am going to visit my sister at seven. Is that good for you?','Yarın yürüyüş planın var; yağmur olursa bir kapalı alan alternatifi öner ve buluşma yerini belirt.','We can walk in the park. If it rains, we can go to the museum. Let us meet outside the station.','Hazırlık işlerini paylaştır: sen sandviç yapacaksın; Berk kahve ve kek alacak; Sara 18.30’da gelecek.','I am going to make sandwiches. Berk is going to buy coffee and cake. Sara is going to arrive at six thirty.'],roleplay:'Yarın için iki plan önerin. Berk ilk saatine uygun olmasın. Sırayı veya saati değiştirin, hazırlıkları paylaşın ve son planı ikiniz de bir kez notsuz anlatın.',
 },
 'w3-d2':{
  scenes:[
   scene('Davetin saati değişiyor','Reddedilen ilk saat yerine son kararı dinle.',`Would you like to come to the painting show on Saturday?|Cumartesi resim sergisine gelmek ister misin?
I would love to. What time are you going?|Çok isterim. Kaçta gideceksin?
At two in the afternoon. We can have coffee after.|Öğleden sonra ikide. Sonra kahve içebiliriz.
I have lunch with my family at one. Two is difficult.|Bire ailemle öğle yemeğim var. İki zor.
What about three thirty? The show is open until six.|Üç buçuğa ne dersin? Sergi altıya kadar açık.
That works for me. Shall we meet at the front door?|Bu bana uyar. Ön kapıda buluşalım mı?
Yes, at three thirty. I will buy the tickets online.|Evet, üç buçukta. Biletleri internetten alacağım.
Thank you. Coffee is on me after the show.|Teşekkürler. Sergiden sonra kahveler benden.`,[[3,'İlk saat neden uymuyor?','Aile yemeği var','İşte olacak','Sergi kapalı'],[4,'Son saat hangisi?','15.30','14.00','18.00'],[6,'Bilet işini kim üstleniyor?','Daveti yapan','Davet edilen','İkisi kapıda alacak']]),
   scene('Kibar bir hayır ve yeni öneri','Daveti reddetmekle görüşmek istememeyi ayır.',`Are you free for dinner on Friday evening?|Cuma akşamı yemek için müsait misin?
I am sorry, I cannot. I am visiting my parents.|Üzgünüm, olamam. Anne babamı ziyaret ediyorum.
No problem. Maybe another time when you are free.|Sorun değil. Belki müsait olduğun başka zaman.
How about lunch on Sunday? I am free after eleven.|Pazar öğle yemeğine ne dersin? On birden sonra müsaitim.
Sunday is good. Do you want to cook or eat out?|Pazar olur. Yemek mi yapalım, dışarıda mı yiyelim?
Let us eat at the café near your house.|Senin evinin yakınındaki kafede yiyelim.
Good idea. I will meet you there at twelve thirty.|İyi fikir. Orada on iki buçukta buluşuruz.
Great. Thanks for inviting me. See you on Sunday.|Harika. Davet için teşekkürler. Pazar görüşürüz.`,[[1,'Cuma neden uygun değil?','Anne babasını ziyaret ediyor','Çalışıyor','Yemek sevmiyor'],[3,'Karşı öneri ne?','Pazar öğle yemeği','Pazar akşam yemeği','Cuma kahvaltısı'],[6,'Buluşmanın saati ve yeri?','12.30, kafe','11.00, ev','13.30, park']]),
   scene('İki davetten birini seçmek','Birbirine yakın iki etkinliği ve seçimin nedenini bul.',`There is a film at seven and a concert at eight.|Yedide bir film, sekizde bir konser var.
I would like to see the film. What is it about?|Filmi görmek isterim. Ne hakkında?
It is about a small town and two old friends.|Küçük bir kasaba ve iki eski arkadaş hakkında.
That sounds interesting. Is it in English?|İlginç geliyor. İngilizce mi?
Yes, with Turkish subtitles. The concert is very loud.|Evet, Türkçe altyazılı. Konser çok gürültülü.
Then the film is better for me. I am tired today.|O zaman film bana daha iyi. Bugün yorgunum.
Shall we meet at six thirty and get a drink first?|Altı buçukta buluşup önce bir içecek alalım mı?
Yes. A quiet film and a drink sound perfect.|Evet. Sakin bir film ve içecek çok iyi geliyor.`,[[0,'Film kaçta, konser kaçta?','Film 19.00, konser 20.00','Film 20.00, konser 19.00','İkisi de 19.00'],[5,'Film neden daha uygun?','Yorgun, daha sakin bir şey istiyor','Konser bileti yok','Film ücretsiz'],[6,'Filmden önce ne yapılacak?','İçecek alınacak','Konser izlenecek','Eve gidilecek']]),
   scene('Davet mesajını doğrulamak','Buluşma noktasının düzeltildiği yeri yakala.',`Hi, is our coffee plan still on for tomorrow?|Merhaba, yarınki kahve planımız hâlâ geçerli mi?
Yes. I am looking forward to seeing you after work.|Evet. İşten sonra görüşmeyi bekliyorum.
We said six at the café near the bank, right?|Bankanın yanındaki kafede altı demiştik, doğru mu?
At six, yes, but not that café. The one near the park.|Altıda evet ama o kafe değil. Parkın yanındaki.
Thank you for checking. Is Sara coming with us?|Kontrol ettiğin için teşekkürler. Sara da geliyor mu?
No, she has a class. Just you and me tomorrow.|Hayır, onun dersi var. Yarın yalnızca sen ve ben.
All right. The park café at six, two people.|Peki. Park kafesi, saat altı, iki kişi.
Exactly. Send me a message if you are late.|Aynen. Geç kalırsan bana mesaj gönder.`,[[3,'Doğru kafe nerede?','Parkın yanında','Bankanın yanında','Kursun içinde'],[5,'Kaç kişi buluşacak?','İki','Üç','Dört'],[7,'Geç kalınırsa ne yapılmalı?','Mesaj gönderilmeli','Plan iptal edilmeli','Sara aranmalı']]),
  ],writing:['Bir arkadaşını bir etkinliğe davet et: ne, hangi gün, saat kaçta ve nerede buluşulacağını belirt.','Would you like to see a painting show on Saturday? We can meet at the front door at three thirty.','Cuma davetini kibarca reddet, kısa bir neden söyle ve pazar için yeni saat öner.','I am sorry, I cannot come on Friday. I am visiting my parents. How about Sunday at twelve thirty?','Yanlış bilgiyi düzelt: buluşma yarın 18.00’da, banka kafesinde değil park kafesinde ve Sara gelmiyor.','We are meeting tomorrow at six at the park café, not the bank café. Sara cannot come.'],roleplay:'Berk’i gerçek bir etkinliğe davet et. Biriniz ilk daveti neden göstererek reddetsin ve alternatif sunsun. Diğer kişi yeri yanlış anlasın. Yeni planı düzelterek onaylayın ve vedalaşın.',
 },
 'w3-d4':{
  scenes:[
   scene('Sakin bir dün','Bir kişinin yaptığıyla yapmadığını ayır; çok fiil bilmen gerekmiyor.',`Did you have a busy evening yesterday after work?|Dün işten sonra yoğun bir akşamın mı vardı?
No, I stayed at home because I was tired.|Hayır, yorgun olduğum için evde kaldım.
Did you watch a film or read your book?|Film mi izledin, kitabını mı okudun?
I watched a short film, then I called my sister.|Kısa bir film izledim, sonra kız kardeşimi aradım.
Was the film good, or was it boring?|Film iyi miydi, sıkıcı mıydı?
It was good, but I did not watch another one.|İyiydi ama başka bir film izlemedim.
That sounds like a quiet evening. What about dinner?|Sakin bir akşam gibi. Peki akşam yemeği?
I had some soup. Nothing special, but it was nice.|Biraz çorba içtim. Özel bir şey değil ama güzeldi.`,[[1,'Neden evde kaldı?','Yorgundu','Yağmur yağıyordu','Misafir bekliyordu'],[3,'Filmden sonra ne yaptı?','Kız kardeşini aradı','Kitap okudu','Dışarı çıktı'],[5,'İkinci film izlendi mi?','Hayır','Evet','Yarısı izlendi']]),
   scene('Beklenmeyen kahve','Planla gerçekte olanı karşılaştır.',`Did you go to the art shop yesterday afternoon?|Dün öğleden sonra resim malzemesi dükkânına gittin mi?
Yes, but it was closed when I arrived there.|Evet ama vardığımda kapalıydı.
Oh no. Did you go straight home after that?|Tüh. Ondan sonra hemen eve mi gittin?
No, I walked to the café and met an old friend.|Hayır, kafeye yürüdüm ve eski bir arkadaşımla karşılaştım.
That was lucky. Did you have coffee together?|Şanslıymışsın. Birlikte kahve içtiniz mi?
Yes. We talked about our jobs and our families.|Evet. İşlerimiz ve ailelerimiz hakkında konuştuk.
So you did not buy any paint yesterday?|Yani dün hiç boya almadın mı?
No paint, but a lovely afternoon with a friend.|Boya yok ama arkadaşımla güzel bir öğleden sonra oldu.`,[[1,'Alışveriş neden yapılamadı?','Dükkân kapalıydı','Boya çok pahalıydı','Cüzdan evdeydi'],[3,'Sonra nereye gidildi?','Kafeye','İşyerine','Doğruca eve'],[5,'Konuşulan iki konu?','İş ve aile','Resim ve fiyatlar','Kurs ve öğretmen']]),
   scene('Dünkü iş günü','Olumlu olayla küçük problemi birbirinden ayır.',`How was your day at the office yesterday?|Dün ofiste günün nasıldı?
It was quite good. I finished my work early.|Oldukça iyiydi. İşimi erken bitirdim.
Did you go home early too, or stay at the office?|Eve de erken mi gittin, ofiste mi kaldın?
I stayed. My colleague needed help with a file.|Kaldım. İş arkadaşımın bir dosya için yardıma ihtiyacı vardı.
Was it a difficult problem to fix?|Çözmesi zor bir sorun muydu?
Not really. We opened it on another computer.|Pek değil. Dosyayı başka bir bilgisayarda açtık.
And did you finish before your meeting?|Peki toplantınızdan önce bitirdiniz mi?
Yes, before three. Then we had a short coffee break.|Evet, üçten önce. Sonra kısa bir kahve molası verdik.`,[[3,'İş bitince neden ofiste kaldı?','İş arkadaşına yardım etmek için','Toplantı iptal olduğu için','Bilgisayarı olmadığı için'],[5,'Dosya nasıl açıldı?','Başka bilgisayarda','Yeni yazıcıyla','Telefonla gönderilerek'],[7,'İş kaçtan önce tamamlandı?','Üçten önce','İkiden önce','Dörtten önce']]),
   scene('Aynı gün iki kişi','Duyduğun işleri doğru kişiye bağla.',`I stayed home yesterday. What did you do, Mia?|Dün evde kaldım. Sen ne yaptın Mia?
I visited my mother in the morning and cooked with her.|Sabah annemi ziyaret ettim ve onunla yemek yaptım.
That sounds nice. I cooked too, but only some pasta.|Güzel geliyor. Ben de yemek yaptım ama yalnızca makarna.
Did you watch the new film after dinner?|Yemekten sonra yeni filmi izledin mi?
Yes, I liked it. Did you watch it too?|Evet, sevdim. Sen de izledin mi?
No, I listened to music and painted a small picture.|Hayır, müzik dinledim ve küçük bir resim yaptım.
Then we both cooked, but we had different evenings.|Demek ikimiz de yemek yaptık ama akşamlarımız farklıydı.
Exactly. You watched a film; I painted and listened to music.|Aynen. Sen film izledin; ben resim yaptım ve müzik dinledim.`,[[1,'Mia sabah kimi ziyaret etti?','Annesini','Kız kardeşini','İş arkadaşını'],[4,'Alex akşam ne yaptı?','Film izledi','Resim yaptı','Müzik dinledi'],[6,'İkisinin ortak yaptığı iş?','Yemek yapmak','Film izlemek','Resim yapmak']]),
  ],writing:['Berk dününü soruyor. Nerede olduğunu, yaptığın iki şeyi ve günün nasıl geçtiğini yaz; yalnızca bildiğin fiilleri kullanabilirsin.','Yesterday I stayed at home. I watched a film and called my sister. It was a quiet, nice evening.','Dün boya almak istedin ama dükkân kapalıydı. Sonra kafeye gidip arkadaşınla görüştüğünü iki cümleyle anlat.','The art shop was closed yesterday. I walked to a café and talked with a friend.','İki kişinin gününü karşılaştır: sen evde kaldın ve film izledin; Mia annesini ziyaret edip resim yaptı.','I stayed at home and watched a film. Mia visited her mother and painted a picture.'],roleplay:'Dün hakkında röportaj yapın. Biriniz iki gerçek bir uydurma olay anlatsın. Diğer kişi “Where?”, “Who with?” veya “Was it good?” diye sorup ayrıntılardan uydurma olayı tahmin etsin. Yanıtları önceden yazmayın.',
 },
 'w3-d5':{
  scenes:[
   scene('Kaybolan otobüs kartı','Olayların sırasını, aranan yeri ve gerçek sonucu takip et.',`You were late yesterday. What happened on your way here?|Dün geç kaldın. Buraya gelirken ne oldu?
First, I left home and walked to the bus stop.|Önce evden çıkıp otobüs durağına yürüdüm.
Did you have to wait a long time for the bus?|Otobüsü uzun süre beklemen mi gerekti?
No, the bus arrived, but I could not find my bus card.|Hayır, otobüs geldi ama otobüs kartımı bulamadım.
Oh no. Did you go back home to look for it?|Tüh. Aramak için eve mi döndün?
I looked in my bag first, then in my coat.|Önce çantama, sonra montuma baktım.
And finally? Did you find the card at home?|Peki sonunda? Kartı evde mi buldun?
No, it was in my coat. I took the next bus.|Hayır, montumdaydı. Sonraki otobüse bindim.`,[[3,'Gecikmenin asıl nedeni?','Kartı bulamaması','Otobüsün gelmemesi','Evden geç çıkması'],[5,'Arama sırası hangisi?','Önce çanta, sonra mont','Önce mont, sonra ev','Önce durak, sonra çanta'],[7,'Kartın bulunduğu yer?','Mont','Ev','Çanta']]),
   scene('Küçük bir doğum günü sürprizi','Önce, sonra ve en sonunda olan işleri hatırla.',`Tell me about your sister's birthday yesterday. Was it nice?|Dün kız kardeşinin doğum gününü anlat. Güzel miydi?
Yes. First, I bought a small cake on my way home.|Evet. Önce eve gelirken küçük bir pasta aldım.
Did she know you were going to visit her?|Onu ziyaret edeceğini biliyor muydu?
No. Then I called her and said I was near her house.|Hayır. Sonra onu arayıp evinin yakınında olduğumu söyledim.
What did she say when you arrived with the cake?|Pastayla geldiğinde ne dedi?
She was very happy. We made tea and talked for an hour.|Çok mutlu oldu. Çay yapıp bir saat konuştuk.
And what did you do with the rest of the cake?|Peki pastanın kalanını ne yaptınız?
Finally, we gave some to our neighbour. She was happy too.|Son olarak komşumuza biraz verdik. O da mutlu oldu.`,[[1,'İlk yapılan iş?','Pasta almak','Kız kardeşini aramak','Komşuyu ziyaret etmek'],[3,'Telefon ne zaman açıldı?','Evinin yakınına gelince','Pastayı almadan önce','Ziyaret bitince'],[7,'Son olay ne?','Komşuya pasta verilmesi','Bir saat konuşulması','Çay yapılması']]),
   scene('Öğretmene dünkü dersi anlat','Yanlış sırayı düzeltirken son bilgiyi koru.',`Did you finish your painting at the class yesterday?|Dün kursta resmini bitirdin mi?
Not completely. First, I drew a small house with a pencil.|Tam değil. Önce kalemle küçük bir ev çizdim.
Then you painted the sky and the trees, right?|Sonra gökyüzünü ve ağaçları boyadın, değil mi?
The sky, yes, but not the trees. I painted the house next.|Gökyüzünü evet ama ağaçları değil. Sonra evi boyadım.
What happened after that? Did you have enough time?|Ondan sonra ne oldu? Yeterli vaktin var mıydı?
No. The class finished, so I cleaned my brushes.|Hayır. Ders bitti, o yüzden fırçalarımı temizledim.
Are you going to finish the trees at home today?|Ağaçları bugün evde bitirecek misin?
Yes. Finally, I want to take a photo for my sister.|Evet. Son olarak kız kardeşime fotoğraf çekmek istiyorum.`,[[1,'Çizime neyle başlandı?','Kalemle','Mavi boyayla','Fırçayla'],[3,'Gökyüzünden sonra ne boyandı?','Ev','Ağaçlar','Çiçekler'],[5,'Ders bitince ne yapıldı?','Fırçalar temizlendi','Fotoğraf çekildi','Ağaçlar bitirildi']]),
   scene('VOA: İş gününden festivale','Uyarlanmış küçük hikâyeyi dinle. Sırayı ve festivalde yapılanları ayır.',`Yesterday started like a usual work day in Washington.|Dün Washington'da sıradan bir iş günü gibi başladı.
What happened next? Did you stay at work all day?|Sonra ne oldu? Bütün gün işte mi kaldın?
No, I wanted a break, so I walked outside.|Hayır, mola istedim, o yüzden dışarıda yürüdüm.
And then you saw a big festival in the city?|Sonra şehirde büyük bir festival mi gördün?
Yes. There was dancing, food and a game called pilota.|Evet. Dans, yemek ve pilota adlı bir oyun vardı.
Did you only watch, or did you dance too?|Yalnızca izledin mi, dans da ettin mi?
I danced a traditional Basque dance. The whole day was fun.|Geleneksel bir Bask dansı yaptım. Bütün gün eğlenceliydi.
Finally, you wrote to your friend about your interesting day.|Son olarak ilginç gününü arkadaşına yazdın.`,[[2,'Dışarı çıkmanın ilk nedeni?','Mola vermek','Festivalde çalışmak','Arkadaşını bulmak'],[4,'Pilota ne?','Bir oyun','Bir yemek','Bir şehir'],[6,'Anna festivalde ne yaptı?','Dans etti','Yalnızca izledi','Yemek pişirdi']],credits.past,['Anna','Arkadaşı']),
  ],writing:['Dünkü küçük bir olayı first, then, finally ile en az üç cümle anlat. Gerçek hayatından bir ayrıntı ekle.','First, I walked to the shop. Then I bought a cake for my sister. Finally, we had tea at her house.','Arkadaşın kartının evde bulunduğunu sanıyor. Önce nerelere baktığını, sonra kartın gerçek yerini açıklayıp düzelt.','First, I looked in my bag. Then I found the card in my coat, not at home.','İki olayı bağla ve bir gelecek planı ekle: dün evi boyadın; ders bitti; bugün ağaçları bitireceksin.','Yesterday I painted the house, then the class finished. Today I am going to finish the trees.'],roleplay:'Üç olaylık kısa bir hikâye anlat. Berk sırayı bilerek karıştırsın veya yanlış bir yer söylesin. First, then ve finally kullanarak düzelt; sonra roller değişsin. Aynı hikâyeyi ezberden değil, yeni ayrıntılarla anlatın.',
 },
 'w4-d1':{
  scenes:[
   scene('Yanlış yöne sapmadan','Yönleri sırayla dinle ve bitiş noktasını doğrula.',`Excuse me. How can I get to the art museum from here?|Affedersiniz. Buradan sanat müzesine nasıl gidebilirim?
Go straight along this street until you see the bank.|Bankayı görene kadar bu caddede düz gidin.
Do I turn left at the bank or after the bank?|Bankada mı, bankadan sonra mı sola döneceğim?
After the bank, turn left. The museum is on your right.|Bankadan sonra sola dönün. Müze sağınızda.
Is it next to the café with the red door?|Kırmızı kapılı kafenin yanında mı?
No, opposite that café, between the library and the small park.|Hayır, o kafenin karşısında, kütüphane ile küçük parkın arasında.
So, straight, left after the bank, then on my right.|Yani düz, bankadan sonra sola, sonra sağımda.
Exactly. It is about a ten-minute walk from here.|Aynen. Buradan yaklaşık on dakikalık yürüyüş.`,[[3,'Sola ne zaman dönülüyor?','Bankadan sonra','Bankadan önce','Kafeden önce'],[5,'Müze kafeye göre nerede?','Karşısında','Yanında','Arkasında'],[7,'Yaklaşık yürüyüş süresi?','On dakika','Yirmi dakika','Beş dakika']]),
   scene('Yürümek mi, otobüs mü?','Yol seçeneğini, durak sayısını ve iniş yerini bul.',`Is the train station near here? I have a heavy bag.|Tren istasyonu buraya yakın mı? Ağır çantam var.
It is twenty minutes on foot, but you can take a bus.|Yürüyerek yirmi dakika ama otobüse binebilirsiniz.
Which bus goes to the station, please?|İstasyona hangi otobüs gidiyor, lütfen?
Number twelve, from the stop across the street.|On iki numara, caddenin karşısındaki duraktan.
How many stops is it from here to the station?|Buradan istasyona kaç durak?
Three. Get off after the large supermarket, not before it.|Üç. Büyük marketten sonra inin, önce değil.
Thank you. Does the bus stop outside the station?|Teşekkürler. Otobüs istasyonun önünde duruyor mu?
Yes, right outside. You do not need to cross another road.|Evet, hemen önünde. Başka yol geçmeniz gerekmiyor.`,[[3,'Otobüs numarası?','12','3','20'],[5,'Kaç durak sonra inilmeli?','Üç','On iki','İki'],[5,'Markete göre nerede iniliyor?','Marketten sonra','Marketten önce','Marketin içinde']]),
   scene('Telefondaki yol tarifi','Konuşanın bulunduğu yer değişirken sonraki yönü takip et.',`I am outside the bank, but I cannot find your office.|Bankanın önündeyim ama ofisini bulamıyorum.
Can you see the café with the green tables outside?|Dışarıda yeşil masaları olan kafeyi görüyor musun?
Yes, it is across the street. Should I go there?|Evet, caddenin karşısında. Oraya mı gideyim?
Yes, cross at the lights, then walk past the café.|Evet, ışıklardan karşıya geç, sonra kafeyi geç.
All right, I am past the café now. What next?|Peki, şimdi kafeyi geçtim. Sırada ne var?
Turn right into the small street. Our door is number eight.|Küçük sokağa sağa dön. Bizim kapı sekiz numara.
Number eight, on the right. Is the door blue?|Sekiz numara, sağda. Kapı mavi mi?
Yes, number eight has a blue door. I can see you!|Evet, sekiz numaranın kapısı mavi. Seni görüyorum!`,[[3,'Karşıya nereden geçiliyor?','Işıklardan','Kafenin içinden','Bankanın arkasından'],[5,'Kafeden sonra yön ne?','Sağ','Sol','Geri'],[7,'Son kapının özelliği?','Mavi, 8 numara','Yeşil, 8 numara','Mavi, 12 numara']]),
   scene('Yanlış yeri kibarca düzelt','Benzer adların yarattığı karışıklığı ve doğru tarifi dinle.',`Is this the café near the old library? I am meeting a friend.|Burası eski kütüphanenin yanındaki kafe mi? Arkadaşımla buluşacağım.
This is Park Café. The café near the library is called Corner Café.|Burası Park Kafe. Kütüphanenin yanındakinin adı Köşe Kafe.
Oh, I am in the wrong place. Is Corner Café far?|Yanlış yerdeyim. Köşe Kafe uzak mı?
No. Go out, turn left and walk for five minutes.|Hayır. Çıkın, sola dönün ve beş dakika yürüyün.
Do I cross the road when I see the library?|Kütüphaneyi görünce yolu geçecek miyim?
No, stay on this side. It is just before the library.|Hayır, bu tarafta kalın. Kütüphaneden hemen önce.
Thank you. Left, five minutes, before the library, this side.|Teşekkürler. Sol, beş dakika, kütüphaneden önce, bu taraf.
That is right. Your friend will be there, I hope!|Doğru. Umarım arkadaşınız oradadır!`,[[1,'Aranan yerin adı?','Köşe Kafe','Park Kafe','Eski Kafe'],[3,'Çıkışta ne yapılmalı?','Sola dönüp beş dakika yürümek','Sağa dönüp on dakika yürümek','Karşıya geçmek'],[5,'Kütüphaneye göre kafe nerede?','Hemen önce, aynı tarafta','Hemen sonra, karşıda','Kütüphanenin içinde']]),
  ],writing:['Arkadaşına evinin veya seçtiğin bir yerin yolunu tarif et. En az iki yön, bir işaret ve son konum bilgisi ver.','Go straight to the bank, then turn left. The café is on your right, opposite the park.','Yanlış kafede bekliyorsun. Arkadaşına durumu söyle, doğru yeri ve yürüyerek ne kadar süreceğini sor.','I am at Park Café, not Corner Café. How can I get there? Is it a five-minute walk?','Üç bilgiyi yol tarifine dönüştür: 12 numaralı otobüs, üç durak, büyük marketten sonra iniş.','Take bus number twelve. Get off after three stops, just after the large supermarket.'],roleplay:'Biriniz telefonla yol tarifi versin, diğeri zihninde adımları takip etsin. Bir yönü yanlış tekrar et; karşı taraf düzeltsin. Son konumu, bina numarasını ve iki işareti doğrulayın.',
 },
 'w4-d2':{
  scenes:[
   scene('İlk boş saat uymadı','Gün ile saatin birlikte değişip değişmediğini kontrol et.',`Hello, I would like to make an appointment for a haircut.|Merhaba, saç kesimi için randevu almak istiyorum.
Of course. We have Tuesday at two or Thursday at five.|Elbette. Salı ikide veya perşembe beşte boşluk var.
I work until four. Is there anything later on Tuesday?|Dörde kadar çalışıyorum. Salı daha geç bir saat var mı?
Let me check. Tuesday at five thirty is available.|Kontrol edeyim. Salı beş buçuk müsait.
That is good. How long does the appointment take?|Bu iyi. Randevu ne kadar sürer?
About thirty minutes. Can I have your name, please?|Yaklaşık otuz dakika. Adınızı alabilir miyim, lütfen?
Hatice. So Tuesday at five thirty, for a haircut.|Hatice. Yani salı beş buçuk, saç kesimi için.
Yes, that is correct. Please arrive five minutes early.|Evet, doğru. Lütfen beş dakika erken gelin.`,[[2,'İlk salı saati neden uymuyor?','Dörde kadar çalışıyor','Salı seyahatte','Saç kesimi istemiyor'],[3,'Son salı saati?','17.30','14.00','17.00'],[5,'Randevu yaklaşık ne kadar sürüyor?','Otuz dakika','Beş dakika','Bir saat']]),
   scene('Randevuyu taşımak','İptal etmekle başka güne almak arasındaki farkı dinle.',`Hello, I have an appointment on Wednesday morning with Sara.|Merhaba, çarşamba sabahı Sara ile randevum var.
Can I have your name and appointment time, please?|Adınızı ve randevu saatinizi alabilir miyim, lütfen?
Mia, at ten. I am sorry, I need to change it.|Mia, saat onda. Üzgünüm, değiştirmem gerekiyor.
No problem. Can you come on Friday at the same time?|Sorun değil. Cuma aynı saatte gelebilir misiniz?
Friday is good, but can I come at eleven instead?|Cuma iyi ama onun yerine on birde gelebilir miyim?
Yes, eleven is available. I will change it now.|Evet, on bir müsait. Şimdi değiştiriyorum.
Thank you. Friday at eleven with Sara, not Wednesday.|Teşekkürler. Çarşamba değil, cuma on birde Sara ile.
Exactly. Your old appointment is cancelled. See you on Friday.|Aynen. Eski randevunuz iptal edildi. Cuma görüşürüz.`,[[2,'Eski randevu ne zaman?','Çarşamba 10.00','Cuma 10.00','Çarşamba 11.00'],[5,'Yeni randevu ne zaman?','Cuma 11.00','Cuma 10.00','Çarşamba 11.00'],[7,'Çarşamba randevusu duruyor mu?','Hayır, iptal edildi','Evet, iki randevu var','Henüz karar verilmedi']]),
   scene('Yer ve süre de önemli','Uygun saat kadar doğru şube ve gerekli hazırlığı da bul.',`I would like to book a first painting lesson, please.|İlk resim dersim için yer ayırtmak istiyorum, lütfen.
We have a place on Saturday at ten. Is that suitable?|Cumartesi onda yerimiz var. Uygun mu?
Yes. Is the class at the building near the station?|Evet. Ders istasyonun yanındaki binada mı?
Not this week. It is at our room next to the park.|Bu hafta değil. Parkın yanındaki odamızda.
Thank you for telling me. Do I need to bring anything?|Söylediğiniz için teşekkürler. Bir şey getirmem gerekiyor mu?
Just a pencil. We have paper, brushes and paint here.|Yalnızca bir kalem. Burada kâğıt, fırça ve boya var.
How long is the class? I have lunch plans at twelve.|Ders ne kadar sürüyor? On ikide öğle yemeği planım var.
One hour. You will finish at eleven, so that is fine.|Bir saat. On birde bitecek, dolayısıyla uygun.`,[[3,'Bu haftaki ders nerede?','Parkın yanındaki odada','İstasyon binasında','Öğretmenin evinde'],[5,'Ne getirilmeli?','Yalnızca kalem','Fırça ve boya','Kâğıt ve kalem'],[7,'Ders ne zaman biter?','11.00','12.00','10.00']]),
   scene('Takvime doğru not düş','Karışan iki randevuyu doğru kişiye ve güne bağla.',`I have two appointments this week and I am confused.|Bu hafta iki randevum var ve kafam karıştı.
Let us write them down. Who is the first one with?|Yazalım. İlki kiminle?
With the hairdresser, on Monday at four thirty.|Kuaförle, pazartesi dört buçukta.
And the second? Is that your painting teacher on Thursday?|Peki ikinci? Perşembe resim öğretmeninle olan mı?
Yes, but at six, not at five. She changed the time.|Evet ama beşte değil altıda. Saati değiştirdi.
All right. Monday, four thirty; Thursday, six. Where is Thursday's lesson?|Peki. Pazartesi dört buçuk; perşembe altı. Perşembe dersi nerede?
In room three. I need to bring my unfinished picture.|Üç numaralı odada. Bitmemiş resmimi getirmem gerekiyor.
Now it is clear. Put the picture by the door tonight.|Şimdi netleşti. Bu akşam resmi kapının yanına koy.`,[[2,'Kuaför randevusu?','Pazartesi 16.30','Perşembe 16.30','Pazartesi 18.00'],[4,'Değişen ders saati?','18.00','17.00','16.30'],[6,'Perşembe ne getirilmeli?','Bitmemiş resim','Yeni defter','Kuaför fişi']]),
  ],writing:['Bir randevu talebi oluştur: ne için, tercih ettiğin gün ve saat, adın; sonra uygunluğu sor.','I would like to make an appointment for a haircut on Tuesday at five thirty. My name is Hatice. Is that available?','Çarşamba 10.00 randevunu cuma 11.00’e değiştirmeyi iste. Yeni günü ve saati ayrıca doğrula.','Can I change my appointment from Wednesday at ten to Friday at eleven? Friday at eleven is good for me.','Arkadaşına ders bilgisini yaz: cumartesi 10.00, parkın yanı, bir saat, sadece kalem gerekli.','The class is on Saturday at ten near the park. It takes one hour. You only need a pencil.'],roleplay:'Bir hizmet için randevu al. İlk önerilen saat uymasın, uygun bir alternatif iste. Adını, yeri ve hazırlığı doğrula. İkinci turda aynı randevuyu başka güne taşımak için tekrar ara.',
 },
 'w4-d4':{
  scenes:[
   scene('Yanlış kişiye bağlanınca','Telefonun neden yeniden yönlendirildiğini ve son isteği dinle.',`Hello, this is Mia. Can I speak to Sara, please?|Merhaba, ben Mia. Sara ile konuşabilir miyim, lütfen?
You have reached the bookshop. Sara works at the art shop.|Kitapçıyı aradınız. Sara resim malzemesi dükkânında çalışıyor.
Oh, I am sorry. I think I have the wrong number.|Üzgünüm. Sanırım yanlış numarayı aradım.
No problem. The art shop is next door to us.|Sorun değil. Resim malzemesi dükkânı bizim yanımızda.
Do you have their number? I need to ask about some brushes.|Numaraları sizde var mı? Birkaç fırça hakkında sormam gerekiyor.
Yes. Do you have a pen? I can give it to you.|Evet. Kaleminiz var mı? Numarayı verebilirim.
One moment, please. All right, can you say it slowly?|Bir dakika lütfen. Tamam, yavaşça söyleyebilir misiniz?
Of course. Please read it back when I finish.|Elbette. Bitirince lütfen bana tekrar okuyun.`,[[1,'Aranan yer aslında neresi?','Kitapçı','Resim dükkânı','Kuaför'],[4,'Sara’ya ne sorulacak?','Fırçalar','Kitaplar','Randevu saati'],[7,'Numarayı duyduktan sonra ne yapılmalı?','Tekrar okumalı','Hemen kapatmalı','Mesajla göndermeli']]),
   scene('Toplantı mesajı bırak','Mesajdaki kişi, geri arama zamanı ve düzeltmeyi yakala.',`Good morning. This is Alex from the office next door.|Günaydın. Ben yandaki ofisten Alex.
Hello, Alex. I am afraid Berk is not here now.|Merhaba Alex. Ne yazık ki Berk şu an burada değil.
Can you ask him to call me before three, please?|Beni üçten önce aramasını söyler misiniz, lütfen?
Certainly. Is this about the meeting on Friday?|Elbette. Cuma günkü toplantıyla mı ilgili?
Yes, but the meeting is now on Thursday, not Friday.|Evet ama toplantı artık cuma değil perşembe günü.
Thursday. What time is the meeting going to start?|Perşembe. Toplantı kaçta başlayacak?
At two. I will send the new room number by email.|İkide. Yeni oda numarasını e-postayla göndereceğim.
I will tell him. Call Alex before three, meeting Thursday at two.|Söyleyeceğim. Üçten önce Alex'i ara, toplantı perşembe ikide.`,[[2,'Geri arama ne zamandan önce?','15.00','14.00','13.00'],[4,'Toplantının yeni günü?','Perşembe','Cuma','Salı'],[6,'Hangi bilgi e-postayla gelecek?','Yeni oda numarası','Telefon numarası','Geri arama saati']]),
   scene('Hat kesilince doğrulama','Anlaşılmayan şeyin ardından tekrarlanan bilgiyi esas al.',`Hello, can you hear me? I am calling from the bus.|Merhaba, beni duyabiliyor musun? Otobüsten arıyorum.
Not very well. Can you speak a little more slowly?|Pek iyi değil. Biraz daha yavaş konuşabilir misin?
Our class is in room four today, not room two.|Dersimiz bugün iki numaralı odada değil, dörtte.
Did you say four or fourteen? There is a lot of noise.|Dört mü on dört mü dedin? Çok gürültü var.
Four. The small room opposite the stairs on the first floor.|Dört. Birinci katta merdivenin karşısındaki küçük oda.
Thank you. And does the class still start at six?|Teşekkürler. Peki ders hâlâ altıda mı başlıyor?
Yes, the time is the same. Only the room has changed.|Evet, saat aynı. Yalnızca oda değişti.
Room four, first floor, at six. I will see you there.|Oda dört, birinci kat, saat altı. Orada görüşürüz.`,[[4,'Doğru oda hangisi?','4','14','2'],[4,'Odanın konumu?','Birinci kat, merdivenin karşısı','Giriş kat, kapının yanı','İkinci kat, asansörün arkası'],[6,'Ne değişmemiş?','Başlangıç saati','Oda','Kat bilgisi']]),
   scene('Geri aramayı tamamlamak','İlk mesajdan sonra sorunun çözülüp çözülmediğini dinle.',`Hello, this is Berk. I am returning your call from this morning.|Merhaba, ben Berk. Bu sabahki aramanıza dönüyorum.
Hi, thank you for calling back. I needed help with a file.|Merhaba, geri aradığın için teşekkürler. Bir dosya için yardım gerekiyordu.
Can you still not open it on your computer?|Bilgisayarında hâlâ açamıyor musun?
It opens now, but I cannot print the last page.|Şimdi açılıyor ama son sayfayı yazdıramıyorum.
Please send it to me by email. I can print it here.|Lütfen bana e-postayla gönder. Burada yazdırabilirim.
Thank you. I need it before the meeting at four.|Teşekkürler. Dörtteki toplantıdan önce gerekiyor.
No problem. I will bring it to your desk at three thirty.|Sorun değil. Üç buçukta masanıza getireceğim.
That is perfect. Just the last page, please, not the whole file.|Harika. Lütfen yalnızca son sayfa, bütün dosya değil.`,[[3,'Şu anki sorun hangisi?','Son sayfa yazdırılamıyor','Dosya açılmıyor','E-posta gelmiyor'],[6,'Sayfa ne zaman getirilecek?','15.30','16.00','14.30'],[7,'Ne yazdırılmalı?','Yalnızca son sayfa','Bütün dosya','İlk sayfa']]),
  ],writing:['Berk telefona gelemiyor. Kendini tanıt, geri arama rica et, saat sınırı ve arama nedenini belirt.','Hello, this is Hatice. Can Berk call me back before three, please? I need help with a file for our meeting.','Gürültü nedeniyle oda numarasını anlamadın. Tekrar iste; dört ile on dördü ayır ve saat altıyı doğrula.','Can you say that again slowly, please? Room four, not fourteen? And the class starts at six, right?','Geri arayan kişiye sorunun değiştiğini anlat: dosya artık açılıyor; yalnızca son sayfa yazdırılamıyor; toplantı dörtte.','I can open the file now, but I cannot print the last page. I need it before the meeting at four.'],roleplay:'Sırtınızı dönerek telefon konuşması canlandırın: kendini tanıt, kişiyi iste, kişi yoksa mesaj bırak. Geri arama turunda saat veya oda numarası karışsın. Tahmin etmek yerine tekrar iste ve son bilgiyi doğrula.',
 },
 'w4-d5':{
  scenes:[
   scene('Çözümün de bir engeli var','İlk çözüm işe yaramayınca sunulan ikinci seçeneği takip et.',`Could you help me? The printer in our room is not working.|Yardım edebilir misin? Bizim odadaki yazıcı çalışmıyor.
You can use the printer downstairs, near the kitchen.|Alt katta mutfağın yanındaki yazıcıyı kullanabilirsin.
I tried that one, but it has no paper left.|Onu denedim ama hiç kâğıdı kalmamış.
There is more paper in the cupboard opposite the stairs.|Merdivenin karşısındaki dolapta daha fazla kâğıt var.
Thank you. I only need three copies before the visitors arrive.|Teşekkürler. Ziyaretçiler gelmeden yalnızca üç kopya gerekiyor.
What time are they coming? Can I help with anything else?|Kaçta geliyorlar? Başka bir şeye yardım edebilir miyim?
At eleven. Could you put some water on the meeting table?|On birde. Toplantı masasına biraz su koyabilir misin?
Of course. You print the pages, and I will bring water.|Elbette. Sen sayfaları yazdır, ben su getireceğim.`,[[2,'Alt kattaki yazıcının sorunu?','Kâğıdı kalmamış','Dosya açılmıyor','Kapısı kilitli'],[3,'Yedek kâğıt nerede?','Merdivenin karşısındaki dolapta','Mutfağın içinde','Toplantı masasında'],[6,'İş arkadaşı hangi işi yapacak?','Masaya su koyacak','Üç kopya basacak','Ziyaretçileri arayacak']]),
   scene('Dosya, kişi ve son saat','Kimin neyi ne zamana kadar yapacağını not al.',`Sara, did you get the new plan I sent this morning?|Sara, bu sabah gönderdiğim yeni planı aldın mı?
Yes, but the date on the first page is wrong.|Evet ama ilk sayfadaki tarih yanlış.
You are right. It says Monday, but the meeting is on Tuesday.|Haklısın. Pazartesi yazıyor ama toplantı salı.
Can you change it and send me a PDF before lunch?|Değiştirip öğle yemeğinden önce PDF gönderebilir misin?
Yes. Do you need a printed copy, or is email enough?|Evet. Basılı kopya gerekiyor mu, e-posta yeterli mi?
Email is enough for me. Berk needs two printed copies.|Bana e-posta yeterli. Berk'e iki basılı kopya gerekiyor.
I will fix the date, email you and print two for Berk.|Tarihi düzeltip sana e-posta gönderecek, Berk'e iki tane basacağım.
Thank you. Please use the colour printer for his copies.|Teşekkürler. Onun kopyaları için lütfen renkli yazıcıyı kullan.`,[[2,'Doğru toplantı günü?','Salı','Pazartesi','Çarşamba'],[3,'PDF için son zaman?','Öğle yemeğinden önce','Toplantıdan sonra','Akşam beş'],[5,'Berk’in ihtiyacı?','İki basılı kopya','Yalnızca e-posta','Tek siyah beyaz kopya']]),
   scene('Ziyaretçiye çözüm sunmak','Yapılamayan ilk istek ile sunulan alternatifi ayır.',`Hello, I am here for a meeting with Berk at ten.|Merhaba, saat onda Berk ile toplantı için geldim.
Welcome. He is on a call for another five minutes.|Hoş geldiniz. Beş dakika daha telefonda olacak.
No problem. Is there somewhere I can open my laptop?|Sorun değil. Bilgisayarımı açabileceğim bir yer var mı?
You can use the table by the window. Would you like coffee?|Pencerenin yanındaki masayı kullanabilirsiniz. Kahve ister misiniz?
Tea, please. And could I have the Wi-Fi password?|Çay lütfen. Bir de Wi-Fi şifresini alabilir miyim?
Certainly. It is on this card. Let me know if it does not work.|Elbette. Bu kartın üzerinde. Çalışmazsa söyleyin.
Thank you. It works now. I will wait at that table.|Teşekkürler. Şimdi çalışıyor. O masada bekleyeceğim.
Great. I will tell Berk you are here and bring your tea.|Güzel. Berk'e geldiğinizi söyleyip çayınızı getireceğim.`,[[1,'Berk neden hemen gelemiyor?','Telefonda','Ofiste değil','Toplantıyı unutmuş'],[4,'Ziyaretçi ne içecek?','Çay','Kahve','Su'],[5,'Wi-Fi şifresi nerede?','Kartta','Pencerede','Bilgisayarda']]),
   scene('VOA: Ofis malzemesi ödünç almak','Uyarlamada ödünç alınan iki malzemeyi ve geri verme sözünü dinle.',`Amelia, may I borrow your stapler, please?|Amelia, zımbanı ödünç alabilir miyim, lütfen?
Sure, Anna. I can lend it to you, but please return it.|Tabii Anna. Sana verebilirim ama lütfen geri getir.
You can trust me. Thank you for helping me today.|Bana güvenebilirsin. Bugün yardım ettiğin için teşekkürler.
Do not mention it. It is my favourite stapler.|Rica ederim. O benim en sevdiğim zımba.
Jonathan, can I borrow your scissors? Sorry to bother you.|Jonathan, makasını ödünç alabilir miyim? Rahatsız ettiğim için üzgünüm.
Yes, but you must return them. Please be careful.|Evet ama geri vermelisin. Lütfen dikkatli ol.
I will be very careful, and I will bring them back tomorrow.|Çok dikkatli olacağım ve yarın geri getireceğim.
All right. You can borrow them. You are welcome, Anna.|Peki. Ödünç alabilirsin. Rica ederim Anna.`,[[0,'Amelia’dan ne isteniyor?','Zımba','Makas','Kalem'],[4,'Jonathan’dan ne isteniyor?','Makas','Zımba','Kâğıt'],[6,'Makas ne zaman geri verilecek?','Yarın','Bugün öğlen','Gelecek hafta']],credits.office,['Anna','Amelia','Anna','Amelia','Anna','Jonathan','Anna','Jonathan']),
  ],writing:['Ofiste yardım mesajı yaz: bir sorun, neye ihtiyacın olduğu, ne zamana kadar gerektiği ve kibar rica.','The printer is not working. I need three copies before eleven. Could you help me find another printer, please?','Dosyadaki günü düzelt; Sara’ya PDF, Berk’e iki basılı kopya gideceğini en az iki cümleyle bildir.','The meeting is on Tuesday, not Monday. I will email Sara a PDF and print two copies for Berk.','Bir malzemeyi ödünç iste; neden gerektiğini ve geri vereceğin zamanı belirt.','Can I borrow your scissors, please? I need them for a small gift. I will bring them back tomorrow.'],roleplay:'Ziyaretçi, görevli ve iş arkadaşı rollerini sırayla üstlenin: ziyaretçiyi karşıla, kısa bir engeli açıkla, beklerken çözüm sun, başka bir yardım isteğini yanıtla. Sonra kendi ofisinden yeni bir sorun seçip 6 sıralık farklı bir konuşma yap.',
 },
};

const extraWords:Record<string,string>={
 'w1-d1':'change my clothes|kıyafetlerimi değiştirmek;hungry|aç;quiet|sakin, sessiz;neighbour|komşu;next|sonraki;before dinner|akşam yemeğinden önce',
 'w1-d2':'half past|buçuk;leave|ayrılmak;arrive|varmak;bus stop|otobüs durağı;early|erken;instead|yerine',
 'w1-d4':'twice a week|haftada iki kez;drawing|çizim;loud|yüksek sesli;prefer|tercih etmek;interested|ilgili, hevesli;try|denemek',
 'w1-d5':'out of|kalmamış, tükenmiş;cheese|peynir;cut in half|ikiye kesmek;food truck|yemek satan kamyon;beef|sığır eti;change|para üstü',
 'w2-d1':'shelf|raf;upstairs|üst katta;colleague|iş arkadaşı;across from|karşısında;bottom|en alt;coloured pencils|renkli kalemler',
 'w2-d2':'light blue|açık mavi;dark blue|koyu mavi;sale|indirim;changing room|deneme kabini;pair|çift;total|toplam',
 'w2-d4':'already|zaten;spare|fazladan, yedek;thick|kalın;lid|kapak;socket|priz;copy|kopya',
 'w2-d5':'zip|fermuar;exchange|değiştirmek;return|iade etmek;receive|teslim almak;counter|tezgâh;floor|zemin, yer',
 'w3-d1':'ticket|bilet;prepare|hazırlamak;rain|yağmur yağmak;sunny|güneşli;charger|şarj cihazı;present|hediye',
 'w3-d2':'invite|davet etmek;available|müsait;show|sergi;subtitles|altyazı;still on|hâlâ geçerli;look forward to|hevesle beklemek',
 'w3-d4':'stayed|kaldı;called|aradı;closed|kapalı;met|buluştu, karşılaştı;break|mola;finished|bitirdi',
 'w3-d5':'happened|oldu;arrived|vardı, geldi;looked for|aradı;found|buldu;neighbour|komşu;festival|festival, şenlik',
 'w4-d1':'until|kadar;opposite|karşısında;between|arasında;on foot|yürüyerek;get off|inmek;cross|karşıya geçmek',
 'w4-d2':'haircut|saç kesimi;suitable|uygun;change an appointment|randevu değiştirmek;cancelled|iptal edildi;last|sürmek;unfinished|bitmemiş',
 'w4-d4':'wrong number|yanlış numara;return a call|bir aramaya dönmek;noise|gürültü;read back|duyduğunu tekrar okumak;still|hâlâ;last page|son sayfa',
 'w4-d5':'cupboard|dolap;visitor|ziyaretçi;printed copy|basılı kopya;borrow|ödünç almak;stapler|zımba;scissors|makas',
};

export function expandLesson(l:Lesson):Lesson {
 const p=practice[l.id];
 if(!p)return l;
 const addedQuestions:Question[]=p.scenes.flatMap((s,di)=>s.checks.map(([line,prompt,correct,other1,other2],qi)=>{
  const answer=(di+qi+1)%3;const options=[other1,other2];options.splice(answer,0,correct);
  return {type:'detail',prompt,options,answer,dialogue:di+2,evidence:s.dialogue.lines[line].en,explanation:`Yanıt: ${correct}. “${s.dialogue.title}” sahnesindeki bilgiyi kanıt cümlesiyle kontrol et.`,reviewPhrase:di%4};
 }));
 const dictation=p.scenes[0].dialogue.lines[4];
 const addedExercises:Exercise[]=[
  {type:'dictation',prompt:'Dinle ve duyduğun cümleyi yaz. Önce metni açmadan dene; sonra karşılaştırıp bir kez daha sesli söyle.',answer:dictation.en,hint:dictation.tr,explanation:'Bu cümle üçüncü dinleme sahnesinden. Önce sesleri kelimelere ayır; noktalama değil, duyduğun anlam üzerinde çalış.'},
  ...[0,2,4].map((n):Exercise=>({type:n===4?'combine':'personal',prompt:p.writing[n],answer:p.writing[n+1],hint:n===0?l.corePhrases[0].en:n===2?l.corePhrases[2].en:'Önce kısa cümleler kur; sonra and, but veya then ile bağla.',explanation:'Bu bir örnek yanıttır. Kendi bilgilerini kullanabilirsin; istenen bilgileri verdiğini ve mesajının anlaşıldığını kontrol et.',minWords:n===0?12:8})),
 ];
 const vocabulary=[...l.vocabulary,...extraWords[l.id].split(';').map(pair=>{const [en,tr]=pair.split('|');return {en,tr};})];
 return {...l,vocabulary,dialogues:[...l.dialogues,...p.scenes.map(s=>s.dialogue)],comprehensionQuestions:[...l.comprehensionQuestions,...addedQuestions],sentenceExercises:[...l.sentenceExercises,...addedExercises],speakingTasks:[...l.speakingTasks,
  {prompt:p.roleplay,scaffold:'Önce bildiğin tek bir cümleyle başla. İkinci turda ipucunu gizle; cevap değişirse senin cevabın da değişsin.',success:'En az üç karşılıklı sıra ürettim, bir ayrıntı sordum ve karşımdakinin cevabına göre devam ettim.'},
  {prompt:'Son dinleme sahnesini kapat. Kimin ne istediğini, sorunu veya seçimi ve son sonucu üç kısa İngilizce cümleyle anlat. Sonra bir ayrıntıyı değiştirip kendi sonunu söyle.',scaffold:'Kişi → istek veya durum → sonuç. İlk haftalarda geniş zamanla kısa cümleler yeterli; geçmiş zor gelirse bildiğin fiillerle sınırla.',success:'Metni okumadan üç bilgiyi aktardım ve kendi seçtiğim bir ayrıntıyı ekledim.'}],sources:[...l.sources,...p.scenes.flatMap(s=>s.dialogue.source?[s.dialogue.source.url]:[])]};
}
