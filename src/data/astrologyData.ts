import type { ZodiacSign } from '@/types';

export const ASTROLOGY_GREETINGS: string[] = [
  'Gökyüzünün haritası açılıyor, Sevgili dostum. Doğum anındaki yıldızların dizilişi senin için bir rehber. Yıldızların fısıltısına kulak verelim...',
  'Doğum haritanın kozmik örüntsü belirmeye başladı. Güneşin ışığı, Ayın derinliği ve yükselen burcunun maskesi... Hepsini senin için okuyorum.',
  'Gök kubbeni senin için tarıyorum. Doğduğun anda gezegenlerin duruşu, senin kim olduğunu, neye ihtiyaç duyduğunu ve dünyayla nasıl buluştuğunu anlatıyor.',
  'Yıldızların fısıltısı kulağıma ulaşıyor. Doğum haritan, gökyüzünün sana yazdığı bir mektup gibi. Okumaya hazır mısın?',
];

export const MOON_SIGN_TRAITS: Record<ZodiacSign, { traits: string; needs: string; innerWorld: string }> = {
  Koç: {
    traits: 'içten, ateşli, bağımsız',
    needs: 'kendini ifade etme özgürlüğüne ve hareket halinde olmaya',
    innerWorld: 'iç dünyanda bir volkan gibi kaynayan tutkular var; duyguların anında patlar ama çabuk geçer',
  },
  Boğa: {
    traits: 'sabırlı, kararlı, güven arayan',
    needs: 'stabiliteye, güvenliğe ve bedensel konfora',
    innerWorld: 'iç dünyanda huzur, sessiz bir bahçe ararsın; değişim seni yorar ama sadakat seni besler',
  },
  İkizler: {
    traits: 'meraklı, çevik, iletişimci',
    needs: 'zihinsel uyarana, çeşitliliğe ve özgürlüğe',
    innerWorld: 'iç dünyanda sürekli bir fikir akışı var; duygularını kelimelerle işlemek seni rahatlatır',
  },
  Yengeç: {
    traits: 'duygusal, şefkatli, koruyucu',
    needs: 'duygusal güvenliğe, aidiyete ve şefkate',
    innerWorld: 'iç dünyan bir okyanus gibi derin ve dalgalı; başkalarının duygularını sünger gibi emersin',
  },
  Aslan: {
    traits: 'gururlu, sıcak, cömert',
    needs: 'takdir edilmeye, parlamaya ve sevgi görmeye',
    innerWorld: 'iç dünyanda bir sahne var; kendini özel hissetmek senin için hayati, ama kalbin de cömert',
  },
  Başak: {
    traits: 'titiz, analitik, hizmet eden',
    needs: 'düzene, faydalı olmaya ve mükemmellik arayışına',
    innerWorld: 'iç dünyanda sürekli bir analiz akışı var; kendine ve başkalarına karşı eleştirel ama şefkatli',
  },
  Terazi: {
    traits: 'dengeli, zarif, uyum arayan',
    needs: 'dengeye, estetiğe ve ilişkilerde uyuma',
    innerWorld: 'iç dünyanda bir terazi var; çatışmadan kaçınır, güzellik ve uyum seni huzura erdirir',
  },
  Akrep: {
    traits: 'derin, tutkulu, sezgisel',
    needs: 'derin bağlara, dönüşüme ve gizemin çözülmesine',
    innerWorld: 'iç dünyanda bir karanlık okyanus var; duyguların yoğun ve derin, yüzeyin altında sırlar saklı',
  },
  Yay: {
    traits: 'özgür, iyimser, filozofik',
    needs: 'özgürlüğe, maceraya ve anlam arayışına',
    innerWorld: 'iç dünyanda bir göçebe ruh var; daralmadan nefes alamaz, geniş ufuklar seni besler',
  },
  Oğlak: {
    traits: 'disiplinli, sorumlu, hırslı',
    needs: 'başarıya, yapıya ve saygı görmeye',
    innerWorld: 'iç dünyanda bir dağ zirvesi var; duygularını kontrol altında tutar, ama yükü tek başına taşırsın',
  },
  Kova: {
    traits: 'bağımsız, yenilikçi, insancıl',
    needs: 'özgürlüğe, toplumsal aidiyete ve orijinal olmaya',
    innerWorld: 'iç dünyanda bir gelecek şehri var; duygularını nesnel bir mesafeden yaşar, ama insanlığa derin bağlı',
  },
  Balık: {
    traits: 'sezgisel, empatik, hayalperest',
    needs: 'duygusal bağa, sanata ve ruhsal beslenmeye',
    innerWorld: 'iç dünyanda bir rüya okyanusu var; başkalarının acısını kendi gibi hisseder, sınırlar erir',
  },
};

export const RISING_SIGN_TRAITS: Record<ZodiacSign, { mask: string; approach: string }> = {
  Koç: {
    mask: 'cesur, enerjik, öncül',
    approach: 'hayata atılgan ve doğrudan adımlarla girersin; ilk hamleyi yapmaktan çekinmezsin',
  },
  Boğa: {
    mask: 'sakin, kararlı, çekici',
    approach: 'hayata sabırla ve sağlam adımlarla yaklaşırsın; güvenlik ve estetik seni çeker',
  },
  İkizler: {
    mask: 'meraklı, konuşkan, çevik',
    approach: 'hayata zihinsel bir çeviklikle girersin; soru sormak ve öğrenmek senin doğal halin',
  },
  Yengeç: {
    mask: 'şefkatli, koruyucu, duyarlı',
    approach: 'hayata yumuşak bir kalple yaklaşırsın; güvenli bir yuva ve sevdiklerin çevresinde dönersin',
  },
  Aslan: {
    mask: 'karizmatik, gururlu, sıcak',
    approach: 'hayata bir sahne sanatçısı gibi girersin; dikkat çeker, parlar ve çevrene ışık saçarsın',
  },
  Başak: {
    mask: 'titiz, mütevazı, yardımsever',
    approach: 'hayata detaylara dikkat ederek girersin; hizmet ve mükemmellik senin ilk izlenimin',
  },
  Terazi: {
    mask: 'zarif, diplomatik, uyumlu',
    approach: 'hayata denge ve güzellik arayışıyla girersin; ilk izleniminde zarif ve uyumlusun',
  },
  Akrep: {
    mask: 'gizemli, güçlü, manyetik',
    approach: 'hayata derin ve manyetik bir enerjiyle girersin; insanlar seni çekici ama erişilmez bulur',
  },
  Yay: {
    mask: 'iyimser, maceracı, özgür',
    approach: 'hayata geniş bir gülümseme ve macera ruhuyla girersin; özgürlük ve geniş ufuklar senin imzan',
  },
  Oğlak: {
    mask: 'ciddi, disiplinli, saygın',
    approach: 'hayata sorumluluk ve hedef odaklı bir duruşla girersin; güven verir, otorite sahibi görünürsin',
  },
  Kova: {
    mask: 'özgün, bağımsız, insancıl',
    approach: 'hayata farklı ve orijinal bir tarzla girersin; kalabalıkta sıradışı duruşunla dikkat çekersin',
  },
  Balık: {
    mask: 'hayalperest, duyarlı, gizemli',
    approach: 'hayata yumuşak ve rüya gibi bir enerjiyle girersin; insanlar seni sezgisel ve sihirli bulur',
  },
};

export const TRANSIT_MESSAGES: string[] = [
  "Bu dönemde Jüpiter'in genişleyen enerjisi senin güneş burcunu ziyaret ediyor. Bu, fırsatların açıldığı, şansın arttığı ve vizyonunun genişlediği bir zaman. Yeni kapıları cesaretle it, Sevgili dostum.",
  "Satürn'ün disiplinli enerjisi şu sıralar senin alanında çalışıyor. Bu, yapı kurma ve sabırla sonuç alma zamanı. Zorluklar seni daha sağlam bir temele oturtacak; pes etme, kök sal.",
  "Merkür retrograd etkisi iletişim ve düşünce akışını yavaşlatabilir. Bu, geriye dönüp gözden geçirme zamanı. Yeni başlangıçlar yerine tamamlanmamış işleri bitir, sözlerine dikkat et.",
  "Venüs'ün tatlı enerjisi kalp çakranı açıyor. Bu dönemde ilişkiler, sanat ve estetik konularında güzel gelişmeler olabilir. Kalbinin sesini dinle, güzel olanı kucakla.",
  "Mars'ın ateşli enerjisi eylem ve cesaret istiyor. Bu dönemde girişimlerde bulunmak, yeni projelere başlamak için uygun bir zaman. Ama öfkeni de kontrol altında tut.",
  "Ay düğümlerinin ekseni senin yaşam yolunu işaret ediyor. Bu dönemde karmik dersler ve ruhsal büyüme ön planda. Eski alışkanlıkları bırakıp yeni bir yöne açılmak seni bekliyor.",
  "Uranüs'ün sürpriz enerjisi beklenmedik değişimler getirebilir. Bu, rutini kırma ve özgürleşme zamanı. Değişimden korkma; bazen en büyük fırsatlar beklenmedik anlarda gelir.",
  "Neptün'ün sisli enerjisi sezgilerini ve hayal gücünü güçlendiriyor. Bu dönemde ruhsal ve sanatsal konulara yönelmek seni besleyecek. Ama gerçeklikten kopmamaya da dikkat et.",
];
