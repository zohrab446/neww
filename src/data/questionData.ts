export type AnswerType = 'yes' | 'no' | 'maybe';

export interface QuestionAnswer {
  verdict: AnswerType;
  emoji: string;
  headline: string;
  elaboration: string;
}

export const QUESTION_GREETINGS: string[] = [
  'Sorunu duyuyorum, Sevgili dostum. Evrenin enerjisi senin soruna bir cevap arıyor. Sessizliğin içinden bir yankı geliyor, dinleyiver...',
  'Kalbinin sorusu kozmik enerjilere karışıyor. Sezgilerim senin için ne diyor, bir bakalım. Sorular, bazen cevaptan daha çok şey anlatır; ama bu sefer, cevap da bir şey anlatacak.',
  'Enerjini soruna yönlendirdin, ben de o enerjiyi okuyorum. Sevgili dostum, gökyüzü senin soruna bir mesaj gönderiyor. Açık kalple dinle, çünkü cevap bazen beklediğin yönden değil, ihtiyaç duyduğun yönden gelir.',
  'Sorun, bir taş gibi sessiz suya düştü. Dalga dalga yayılıyor cevap. Sevgili dostum, su durulduğunda neyi göreceğiz, bir birlikte bakalım.',
];

export const YES_ANSWERS: QuestionAnswer[] = [
  {
    verdict: 'yes',
    emoji: '✅',
    headline: 'Evet, bu kapı senin için açık.',
    elaboration: 'Enerjiler bana "evet" diyor, Sevgili dostum. Önündeki bu konuda, evrenin akışı seninle. Ama "evet" demek, senin yerine adım atacak demek değil; o, rüzgârın seni arkadan ittiğini söylemek. Yelkeni açmak senin elinde. Fırsat var, ama fırsatı değerlendiren, hazır olan kişidir. Şimdi hazır olma zamanı.',
  },
  {
    verdict: 'yes',
    emoji: '🌟',
    headline: 'Evet, bu fırsatın var.',
    elaboration: 'Sevgili dostum, yıldızlar bu soruda seninle parlıyor. Fırsat kapıda, ama kapı kendiliğinden açılmaz; senin o kapıyı çalmanı ve itmeni bekliyor. "Evet" cevabı, bir garanti değil, bir yeşil ışıktır. Yeşil ışık yandığında, gaz pedalına basan sensin. Harekete geç; enerji seninle, ama sen onu kullanacaksın.',
  },
  {
    verdict: 'yes',
    emoji: '🌅',
    headline: 'Evet, güneş bu konuda doğuyor.',
    elaboration: 'Enerjiler aydınlık. Bu konuda önünde bir açılma var, bir doğuş. Ama her doğuş, bir gecenin ardından gelir; belki de sen zaten o geceden geçtin. Şimdi sabah ışığı seni aydınlatıyor. Bu ışığı boşa harcama; onu bir amaca yönlendir. "Evet" cevabını aldın, şimdi onu bir eyleme çevir.',
  },
];

export const NO_ANSWERS: QuestionAnswer[] = [
  {
    verdict: 'no',
    emoji: '🚫',
    headline: 'Hayır, bu kapı şimdilik kapalı.',
    elaboration: 'Enerjiler bana "hayır" diyor, Sevgili dostum. Ama "hayır" bir reddedilme değil; bir yönlendirmedir. Bu kapı kapalıysa, başka bir kapı açık. Evren, bazen en sevdiğimiz kapıyı kapatır, ki doğru kapıyı bulalım. Bu "hayır", seni koruyor olabilir; henüz göremediğin bir nedeni var. Sabret ve başka yöne bak.',
  },
  {
    verdict: 'no',
    emoji: '🌑',
    headline: 'Hayır, bu yol şimdi senin değil.',
    elaboration: 'Sevgili dostum, bu konuda enerjiler tıkanmış. "Hayır" cevabı zor bir cevap, ama bazen en bilge cevaptır. Çünkü inatla açılmaya çalıştığın kapı, seni yıpratır; ama seni bekleyen doğru kapı, seni besler. Bu "hayır", bir son değil; bir ara durak. Belki zamanı gelmedi, belki yolu farklı. Şimdi geri çekil ve bekle; doğru zaman, kendini belli eder.',
  },
  {
    verdict: 'no',
    emoji: '🛑',
    headline: 'Hayır, şimdi değil.',
    elaboration: 'Enerjiler "dur" diyor. Bu, bir asla değil; bir "şimdi değil". Bazen en doğru şey, yanlış zamanda yapmaktır; ama bazen de en doğru şey, doğru zamanı beklemektir. Bu "hayır", seni bir aceleden koruyor olabilir. Acele, en güzel fırsatları da bozar. Sabret; sabır, en güçlü kapı açıcıdır.',
  },
];

export const MAYBE_ANSWERS: QuestionAnswer[] = [
  {
    verdict: 'maybe',
    emoji: '⚖️',
    headline: 'Belki — bu, senin elinde.',
    elaboration: 'Enerjiler bana "belki" diyor, Sevgili dostum. Bu, en güçlü cevaptır; çünkü "belki", senin özgür iradeni onurlandırır. Sonuç, senin adımlarına bağlı. Evren yarısı seninle, yarısı seni bekliyor. Geri kalan yarısı sen tamamlayacaksın. "Belki" demek, "sen karar ver" demektir; ama karar verirken kalbinin sesini dinle.',
  },
  {
    verdict: 'maybe',
    emoji: '🌫️',
    headline: 'Belki — sis henüz dağılmadı.',
    elaboration: 'Sevgili dostum, bu konuda enerjiler henüz netleşmedi. Sis var, ama sis bir düşman değil; bir bekleyiş. Sis dağıldığında, yol kendini gösterecek. Şimdi acele etme; gözünü kapat, sezgilerine kulak ver. Cevap, dışarıda değil, içeride. Birkaç gün bekle, sonra tekrar sor; belki o zaman sis dağılmış olur.',
  },
  {
    verdict: 'maybe',
    emoji: '🔀',
    headline: 'Belki — iki yol da açık.',
    elaboration: 'Enerjiler bana iki yol gösteriyor. Bu sorunun cevabı, senin hangi yolu seçeceğine bağlı. "Belki" demek, "iki kapı da açık" demektir; ama sen birinden girmelisin. Hangi kapı? Bunu kalbine sor. Kalbin korktuğu kapı, bazen en doğru kapıdır; çünkü korku, büyümün eşidir. Seç, ve seçtiğin yolda yürü; tereddüt, en büyük düşmandır.',
  },
];

export const QUESTION_CLOSINGS: string[] = [
  'Sevgili dostum, sorunun cevabını aldın. Ama unutma, fal bir pusuladır, bir efendi değil. Yürüyecek olan sensin. Başka bir soru var mı kalbinde?',
  'Cevap, bir tohumdur; onu büyütecek olan sensin. Sevgili dostum, merak ettiğin başka bir kapı var mı?',
  'Enerjiler senin için konuştu, ama son söz her zaman senin. Sevgili dostum, başka bir soru mu var, yoksa bu cevap seninle yeter mi?',
];
