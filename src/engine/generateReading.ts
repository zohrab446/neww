import type {
  FortuneMode,
  Reading,
  ReadingSection,
  UserInfo,
  CoffeeSymbol,
  TarotCard,
  ZodiacSign,
} from '@/types';
import { ZODIAC_INFO, getElementCompatibility } from '@/data/zodiac';
import { COFFEE_SYMBOLS, SAUCER_MESSAGES, COFFEE_GREETINGS } from '@/data/coffeeSymbols';
import { TAROT_CARDS, TAROT_GREETINGS } from '@/data/tarotCards';
import {
  LOVE_GREETINGS,
  LOVE_CONNECTION_PHRASES,
  LOVE_HIDDEN_PHRASES,
  LOVE_FUTURE_PHRASES,
  LOVE_ADVICE,
} from '@/data/loveData';
import {
  ASTROLOGY_GREETINGS,
  MOON_SIGN_TRAITS,
  RISING_SIGN_TRAITS,
  TRANSIT_MESSAGES,
} from '@/data/astrologyData';
import {
  QUESTION_GREETINGS,
  YES_ANSWERS,
  NO_ANSWERS,
  MAYBE_ANSWERS,
  QUESTION_CLOSINGS,
  type QuestionAnswer,
} from '@/data/questionData';

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function nameHash(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildSeed(user: UserInfo, mode: FortuneMode): number {
  const photoPart = user.coffeePhotoSeed != null ? user.coffeePhotoSeed * 17 : 0;
  const birthPart = user.birthDate != null ? nameHash(user.birthDate) * 13 : 0;
  const moonPart = user.moonSign != null ? nameHash(user.moonSign) * 23 : 0;
  const risingPart = user.risingSign != null ? nameHash(user.risingSign) * 29 : 0;
  const questionPart = user.question != null ? nameHash(user.question) * 31 : 0;
  const base = nameHash(user.name + user.zodiac + mode) ^ photoPart ^ birthPart ^ moonPart ^ risingPart ^ questionPart;
  return base >>> 0;
}

function pickSymbols(seed: number): CoffeeSymbol[] {
  const shuffled = shuffle(COFFEE_SYMBOLS, seed);
  const domains = ['past', 'path', 'love'] as const;
  const picked: CoffeeSymbol[] = [];
  for (const domain of domains) {
    const found = shuffled.find((s) => s.domain === domain);
    if (found) picked.push(found);
  }
  while (picked.length < 3) {
    const remaining = shuffled.find((s) => !picked.includes(s));
    if (remaining) picked.push(remaining);
    else break;
  }
  return picked.slice(0, 3);
}

function pickTarotCards(seed: number, count: number): TarotCard[] {
  const shuffled = shuffle(TAROT_CARDS, seed);
  return shuffled.slice(0, count);
}

function elementWisdom(element: string): string {
  switch (element) {
    case 'Ateş':
      return 'Ateşin sıcaklığı ve cesareti senin doğal gücün. Ateş, hem ısıtır hem yakar; önemli olan, onu bir meşale gibi kullanmak, bir yangın gibi değil. Tutkunu bir amaca yönlendir, o zaman ateş seni yakmaz, aydınlatır.';
    case 'Toprak':
      return 'Toprağın sağlamlığı ve sabrı senin temel gücün. Toprak, acele etmez ama her zaman var olur. Bir ağaç gibi: köklerin derin, gövden sağlam, dalların gökyüzüne uzanıyor. Sabrın, en güçlü silahın; çünkü sabırlı olan, zamanın yanında olur.';
    case 'Hava':
      return 'Havanın çevikliği ve zekası senin silahın. Hava, her yere sızar, her engeli aşar. Zekân, bir rüzgâr gibi; estği yere göre şekil alır ama hiçbir yere takılıp kalmaz. Esnek ol, ama kendini kaybetme; rüzgâr, yön değiştirir ama uçmaz.';
    case 'Su':
      return 'Suyun derinliği ve sezgisi senin en güçlü yönün. Su, en sert kayayı bile zamanla eritir; yumuşaklık, aslında en büyük güçtür. Sezgilerine güven; su, yüzeyin altında ne olduğunu bilir. Derine in, orada cevaplar seni bekliyor.';
    default:
      return '';
  }
}

function relationshipContext(status: string): string {
  switch (status) {
    case 'bekar':
      return 'Bekarlığın bir yokluk değil, bir hazırlık. Toprak, tohumu kabul etmeden önce dinlenir; sen de şimdi dinlenme ve hazırlanma mevsimindesin. Ama unutma, her mevsimin bir sonu vardır.';
    case 'ilişkide':
      return 'Mevcut ilişkin, senin için bir ayna. Karşındaki kişide, kendinin görmek istediğin ve görmek istemediğin yanlarını görüyorsun. Bu ilişki, seni büyütüyor — bazen güzellikle, bazen zorlukla.';
    case 'evli':
      return 'Evliliğin, bir ortak yolculuk. Artık iki kişi, bir gemide. Gemiyi birlikte yönetmek, hem güvertede hem de kürek başında olmak demek. Dengeyi koru, ki gemi sulara gömülmesin.';
    case 'ayrıldım':
      return 'Ayrılığın, bir veda değil, bir serbest kalış. Kapandı bir kapı, ama koridor açık. Acın, bir geçiş töreni; onu yaşa, onu onurlandır, ama onda kalma. Yolun devamı, yeni bir başlangıçla başlıyor.';
    case 'karmaşık':
      return 'Karmaşık durumun, bir düğüm gibidir; ama her düğümün bir çözümü vardır. Önce düğümün nerede olduğunu bul, sonra yumuşakça çözmeye başla. Zorlamak, düğümü sıkıştırır; sabır, onu çözer.';
    default:
      return 'Hayatın akışında, sen de bir nehir gibi akıyorsun. Bazen geniş, bazen dar, ama her zaman ileri.';
  }
}

function generateCoffeeReading(user: UserInfo, seed: number): Reading {
  const symbols = pickSymbols(seed);
  const greeting = pick(COFFEE_GREETINGS, seed);
  const saucer = pick(SAUCER_MESSAGES, seed + 7);
  const zodiacInfo = ZODIAC_INFO[user.zodiac];
  const traitsText = zodiacInfo.traits.slice(0, 3).join(', ');

  const pastSymbol = symbols.find((s) => s.domain === 'past') ?? symbols[0];
  const pathSymbol = symbols.find((s) => s.domain === 'path') ?? symbols[1];
  const loveSymbol = symbols.find((s) => s.domain === 'love') ?? symbols[2];

  const relContext = relationshipContext(user.relationshipStatus);

  const sections: ReadingSection[] = [
    {
      title: 'Geçmişin İzleri / Şu Anki Enerji',
      emoji: pastSymbol.emoji,
      content: `Sevgili ${user.name}, fincanında **${pastSymbol.name}** sembolü belirginleşiyor. Bu, ${pastSymbol.meaning}. ${zodiacInfo.element} grubunun bir ${user.zodiac} olarak ${traitsText} doğan taşıdığın bu özellikler, geçmişte attığın adımların seni buraya getirdiğini gösteriyor.\n\nFincanın üst kısımlarında bu sembolün belirmesi, geçmişin senin üzerinde hâlâ bir etkisi olduğunu, ama bu etkinin artık dönüşmeye başladığını müjdeliyor. Sırtındaki yükü hafifletme zamanı gelmiş olabilir. ${relContext} Geçmiş, bir öğretmendir; ama bir hapishane değildir. Ondan öğrendiğini al, gerisini bırak.`,
    },
    {
      title: 'Yol ve Fırsatlar',
      emoji: pathSymbol.emoji,
      content: `Fincanın gövdesinde **${pathSymbol.name}** sembolü parlıyor. Bu, ${pathSymbol.meaning}. ${zodiacInfo.rulingPlanet} gezegeninin enerjisi seninle birlikte hareket ediyor; bu gezegen, senin burcunun rehberi ve senin en yakın mütteffikin.\n\nÖnünde bir yol açılıyor; cesur adımlar at, ama ${traitsText} doğan sana rehberlik etsin. Bir fırsat kapısı çalabilir, gözün açık olsun. ${elementWisdom(zodiacInfo.element)} Bu sembol, sana şunu fısıldıyor: kapıyı açacak olan dışarıdaki bir güç değil, içerideki cesaretin. Hazır olduğunda, kapı zaten açılır.`,
    },
    {
      title: 'Aşk ve Kalp Kapısı',
      emoji: loveSymbol.emoji,
      content: `Fincanın dibinde **${loveSymbol.name}** sembolü belirmiş. Bu, ${loveSymbol.meaning}. Kalbinin kapısı ${user.relationshipStatus === 'bekar' ? 'yeni bir enerjiye açılmaya hazır' : 'mevcut bağın içinde yeni bir sayfa açmaya davet ediyor'}.\n\nDuygusal dünyanda bir hareketlenme var; sezgilerine güven, ${zodiacInfo.element} elementinin sana öğrettiği empati ve derinlik rehberin olsun. ${user.partnerName ? `${user.partnerName} aklındaysa, aranızdaki enerji şu sıralar yoğunlaşıyor; ama hatırla, kalbinin sesi her zaman gerçeği söyler. ` : ''}Aşk, bir varış değil, bir yolculuktur; bu yolculukta en önemli eşya, yanında taşıdığın öz-sevgi çantasıdır.`,
    },
    {
      title: 'Fincanın Tabağı',
      emoji: '☕',
      content: saucer,
    },
  ];

  const closing = `Sevgili ${user.name}, fincanın kapanıyor ama enerjiler açık kalıyor. ${zodiacInfo.rulingPlanet} seni korusun, ${zodiacInfo.element} elementin seni taşısın. Söyle bana, merak ettiğin başka bir konu var mı? Kariyer mi, aşk mı, yoksa genel yaşam enerjin mi?`;

  const summary = `Fincanda ${pastSymbol.name}, ${pathSymbol.name} ve ${loveSymbol.name} sembolleri belirdi. Geçmişin yükü hafifliyor, önünde bir fırsat kapısı açılıyor, kalbinin kapısı hareketleniyor. ${zodiacInfo.rulingPlanet} enerjisi seninle.`;

  return {
    id: crypto.randomUUID(),
    mode: 'coffee',
    userInfo: user,
    greeting,
    sections,
    closing,
    summary,
    createdAt: new Date().toISOString(),
  };
}

function generateLoveReading(user: UserInfo, seed: number): Reading {
  const greeting = pick(LOVE_GREETINGS, seed);
  const connection = pick(LOVE_CONNECTION_PHRASES, seed + 1);
  const hidden = pick(LOVE_HIDDEN_PHRASES, seed + 2);
  const future = pick(LOVE_FUTURE_PHRASES, seed + 3);
  const advice = pick(LOVE_ADVICE, seed + 4);

  const zodiacInfo = ZODIAC_INFO[user.zodiac];
  const partnerZodiac = user.partnerZodiac ?? null;
  let compatText = '';
  if (partnerZodiac) {
    const compat = getElementCompatibility(zodiacInfo.element, ZODIAC_INFO[partnerZodiac].element);
    compatText = compat === 'high'
      ? 'Yıldızlar aranızdaki uyumun güçlü olduğunu fısıldıyor. Elementleriniz birbirini besliyor; bu, doğal bir çekim ve anlayış getiriyor.'
      : compat === 'medium'
        ? 'Yıldızlar aranızda bir uyum var ama emek istiyor. Elementleriniz farklı danslar yapıyor; ama farklı danslar, bazen en güzel koreografiyi yaratır.'
        : 'Yıldızlar aranızda zıt enerjiler var, ama zıtlar bazen en güçlü çekimi yaratır. Mıknatısın iki kutbu gibi; birbirinizi itip çekiyorsunuz, ama kopamıyorsunuz.';
  }

  const partnerContext = user.partnerName
    ? `${user.partnerName} ile aranızdaki enerji`
    : partnerZodiac
      ? `${partnerZodiac} burcu enerjisi ile senin ${user.zodiac} enerjin arasındaki akış`
      : 'Kalbinin derinliklerinde taşıdığın o özel bağ';

  const relContext = relationshipContext(user.relationshipStatus);

  const sections: ReadingSection[] = [
    {
      title: 'Mevcut Bağ Enerjisi',
      emoji: '💫',
      content: `Sevgili ${user.name}, ${partnerContext} şu an okunuyor. ${connection} ${compatText}\n\n${user.zodiac} burcunun ${zodiacInfo.traits.slice(0, 2).join(' ve ')} doğası, bu bağın ritmini şekillendiriyor. ${relContext} Bu bağın şu anki frekansı, senin iç dünyandaki durumla da çok ilgili; dışarıdaki her bağ, içerideki bir yansımadır.`,
    },
    {
      title: 'Gizli Kalmış Gerçekler / Engeller',
      emoji: '🌑',
      content: `Enerjiler bana şunu fısıldıyor: ${hidden}\n\n${user.relationshipStatus === 'karmaşık' ? 'Karmaşık durumunun altında bu gizli dinamik yatıyor. Düğümü çözmek için, önce düğümün nerede olduğunu kabul etmek gerek.' : ''} ${user.relationshipStatus === 'bekar' ? 'Bekarlığının altında da bir bekleyiş var; ama önce içteki engeli çözmek gerek. Dışarıdaki bağ, içerideki hazır oluşu bekler.' : ''} ${user.relationshipStatus === 'ilişkide' || user.relationshipStatus === 'evli' ? 'Bu gizli gerçek, konuşulduğunda gücünü yitirir; suskunlukta büyür. Bir akşam, bir kahve, bir yürüyüş sırasında, kalbini açmak için bir fırsat yarat.' : ''}`,
    },
    {
      title: 'Gelecek Potansiyeli',
      emoji: '🌟',
      content: `${future}\n\n${zodiacInfo.rulingPlanet} gezegeninin enerjisi seninle. ${user.relationshipStatus === 'evli' || user.relationshipStatus === 'ilişkide' ? 'Mevcut bağın daha derin bir zemine oturma potansiyeli taşıyor. Ama derinleşmek, yüzleşmekle gelir; kaçılan, derinleşmez.' : 'Önünde bir buluşma, bir yeniden tanışma veya kalbini açacak bir sürpriz olabilir. Ama en önemli buluşma, kendinle olan buluşmandır; kendinle barışık olan, başkalarıyla da barışık olur.'} ${user.question ? `\n\nSorduğun soru, kalbinin derinliklerinden geliyor. Cevap, dışarıda değil, içeride; ama bazen içeriye dinlemek için dışarıdaki bir sese ihtiyaç duyarız. Bu fal, o ses olabilir.` : ''}`,
    },
    {
      title: 'Bilgece Tavsiye',
      emoji: '🦉',
      content: advice,
    },
  ];

  const closing = `Sevgili ${user.name}, kalp kapısının enerjisi okundu. Ama unutma, en güçlü sezgi senin kendi kalbindendir. Fal bir aynadır; gerçeği yansıtır, ama gerçeği yaşayan sensin. Merak ettiğin başka bir kapı var mı? Aşkın derinlikleri mi, kariyerin yolu mu, yoksa genel yaşamın akışı mı?`;

  const summary = `${user.partnerName ? user.partnerName + ' ile aranızdaki bağ' : 'Kalbindeki bağ'} ${user.relationshipStatus === 'bekar' ? 'bekleyişte' : user.relationshipStatus === 'karmaşık' ? 'karmaşık ama çözülmeye yakın' : 'şeffaflaşmaya doğru'} bir enerjide. Gizli bir gerçek konuşulmayı bekliyor, gelecekte derinleşme potansiyeli var. ${zodiacInfo.rulingPlanet} seninle.`;

  return {
    id: crypto.randomUUID(),
    mode: 'love',
    userInfo: user,
    greeting,
    sections,
    closing,
    summary,
    createdAt: new Date().toISOString(),
  };
}

function generateTarotReading(user: UserInfo, seed: number): Reading {
  const cards = pickTarotCards(seed, 3);
  const greeting = pick(TAROT_GREETINGS, seed);
  const zodiacInfo = ZODIAC_INFO[user.zodiac];

  const positions = ['Geçmiş / Kök Neden', 'Şimdi / Mevcut Durum', 'Gelecek / Tavsiye Edilen Adım'];
  const positionEmojis = ['🌙', '☀️', '⭐'];
  const positionIntros = [
    'Bu kart, seni buraya getiren kök nedene işaret ediyor. Geçmiş, geçmişte kalmaz; bugünün toprağını besler.',
    'Bu kart, şu anki enerjinin aynası. Bugün ne yaşıyorsun, ne hissediyorsun, ne seçiyorsun — hepsi bu kartta yankılanıyor.',
    'Bu kart, önündeki yolu aydınlatıyor. Gelecek kesin yazılmamıştır; ama bu kart, yolu seçmen için bir pusula sunuyor.',
  ];

  const sections: ReadingSection[] = cards.map((card, i) => ({
    title: positions[i],
    emoji: positionEmojis[i],
    content: `**${card.name}** ${card.emoji}\n\n${positionIntros[i]}\n\n${i === 0 ? card.meaning : i === 1 ? card.meaning : card.reversed}\n\n*Anahtar kelimeler: ${card.keywords.join(', ')}*\n\n${user.zodiac} burcu olarak ${zodiacInfo.traits.slice(0, 2).join(' ve ')} doğan, bu kartın enerjisiyle senin elementin ${zodiacInfo.element} arasında bir rezonans var. ${i === 1 ? 'Bugün bu enerjeyi kendi hayatına nasıl uygulayacağını düşün; kart bir tavsiye değil, bir ayna — aynada gördüğünü, sen yorumlarsın.' : ''} ${i === 2 ? 'Bu kart, sana bir adım öneriyor; ama adımı sen atacaksın. Kart, yolu gösterir; yürüyüş senin.' : ''}`,
  }));

  const closing = `Sevgili ${user.name}, kartlar senin için konuştu. ${cards.length} kart, ${cards.length} kapı, ${cards.length} ayna. Hangi kapıyı açmak istersin? Aşk mı, kariyer mi, yoksa ruhunun başka bir sorusu mu var?`;

  const cardNames = cards.map((c) => c.name).join(', ');
  const summary = `Çekilen kartlar: ${cardNames}. Geçmişin kök nedeni, şu anki enerjin ve geleceğin tavsiye adımı ortaya kondu. ${zodiacInfo.element} elementinle rezonansta olan bu kartlar, bir pusula sunuyor.`;

  return {
    id: crypto.randomUUID(),
    mode: 'tarot',
    userInfo: user,
    greeting,
    sections,
    closing,
    summary,
    createdAt: new Date().toISOString(),
  };
}

function generateAstrologyReading(user: UserInfo, seed: number): Reading {
  const greeting = pick(ASTROLOGY_GREETINGS, seed);
  const transit = pick(TRANSIT_MESSAGES, seed + 1);
  const sunInfo = ZODIAC_INFO[user.zodiac];
  const moonSign = user.moonSign ?? user.zodiac;
  const moonData = MOON_SIGN_TRAITS[moonSign];
  const risingSign = user.risingSign ?? user.zodiac;
  const risingData = RISING_SIGN_TRAITS[risingSign];

  const birthInfo = user.birthDate
    ? `Doğum tarihin ${new Date(user.birthDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}${user.birthTime ? `, saat ${user.birthTime}` : ''}${user.birthPlace ? `, ${user.birthPlace}` : ''}`
    : '';
  const sunTraits = sunInfo.traits.slice(0, 3).join(', ');

  const sections: ReadingSection[] = [
    {
      title: 'Temel Karakter ve Güçlü Yönler',
      emoji: '☀️',
      content: `Sevgili ${user.name}, Güneş burcun **${user.zodiac}**. ${birthInfo ? birthInfo + '. ' : ''}Güneş'in ışığı senin dış dünyaya yansıyan yüzünü aydınlatıyor. ${sunInfo.element} elementinin enerjisi ve ${sunInfo.rulingPlanet} gezegeninin rehberliğiyle, ${sunTraits} bir doğan taşıyorsun.\n\n${elementWisdom(sunInfo.element)} Bu özellikleri yaşamına kattıkça, gerçek potansiyelini açığa çıkarırsın. Güneş burcun, senin "ben kimim?" sorusunun cevabı; ama o, sadece bir başlangıç. Sen, güneş burcundan ibaret değilsin; o, senin en parlak yüzün, ama tek yüzün değil.`,
    },
    {
      title: 'İçsel Dünya ve Duygular',
      emoji: '🌙',
      content: `Ay burcun **${moonSign}** — ${moonData.traits} bir iç dünyaya sahipsin. ${moonData.innerWorld}. İhtiyaç duyduğun şey ${moonData.needs}.\n\nAy burcun, kalbinin kapısını açtığın ve kendini güvende hissettiğin o iç mekanı anlatıyor. ${user.moonSign ? 'Ay burcunu bilmek, kendini daha derin tanımak demek; çünkü güneş herkese görünür, ama ay gizli kalır.' : 'Ay burcunu belirtmediğin için, şu anki güneş burcunla da bir iç dünya okuyorum; ama gerçek ay burcunu öğrenmek, bu tabloyu çok daha derinleştirir.'} Duygularını beslemek için bu ihtiyacı tanımak ve ona alan açmak senin için çok önemli, Sevgili dostum.`,
    },
    {
      title: 'Maske ve Dış Etki',
      emoji: '🎭',
      content: `Yükselen burcun **${risingSign}** — ${risingData.mask} bir ilk izlenim veriyorsun. ${risingData.approach}.\n\nYükselen burcun, dünyayla buluştuğun o ilk anki enerjini, karşılaştığın kişilerin seni nasıl algıladığını anlatıyor. Ama unutma, bu bir maske; altındaki gerçek yüzü ancak güvendiğin kişiler görür. ${user.risingSign ? 'Yükselen burcunun enerjisini bilinçli kullanmak, ilk karşılaşmalarda güçlü bir etki bırakmanı sağlar.' : 'Yükselen burcunu belirtmediğin için, güneş burcunla da bir dış etki okuyorum; ama gerçek yükselen burcunu öğrenmek, dış dünyayla ilişkini çok daha net anlar.'} Maske, bir yalandır demek değil; maske, bir seçimdir. Bilinçli giyilen maske, bir sanat eseridir.`,
    },
    {
      title: 'Bu Dönemin Gökyüzü Etkisi',
      emoji: '🌌',
      content: `${transit}\n\n${sunInfo.rulingPlanet} gezegeninin senin burcuna olan etkisi şu sıralar özellikle güçlü. ${user.question ? `Sorduğun soru kalbini meşgul ediyor; gökyüzü bana diyor ki, bu sorunun cevabı zamanla değil, sabırla açılacak. Sabır, bir bekleyiş değil, bir olgunlaşmadır.` : ''} Sezgilerine güven, Sevgili dostum; yıldızlar yolunu aydınlatıyor ama yürüyecek olan sensin. Gökyüzü bir rehberdir, bir efendi değil; sen özgürsün, yıldızlar ise sadece ışık tutar.`,
    },
  ];

  const closing = `Sevgili ${user.name}, doğum haritanın ışığında kim olduğunu, neye ihtiyaç duyduğunu ve dünyayla nasıl buluştuğunu okuduk. Gökyüzü bir rehber, ama seçim senin. Merak ettiğin başka bir kapı var mı? Aşk mı, kariyer mi, yoksa ruhunun başka bir sorusu mu var?`;

  const summary = `Güneş: ${user.zodiac}, Ay: ${moonSign}, Yükselen: ${risingSign}. ${sunInfo.element} elementinin gücüyle donanmışsın. ${sunInfo.rulingPlanet} rehberliğinde, bu dönemde gezegen hareketleri senin için bir açılım getiriyor.`;

  return {
    id: crypto.randomUUID(),
    mode: 'astrology',
    userInfo: user,
    greeting,
    sections,
    closing,
    summary,
    createdAt: new Date().toISOString(),
  };
}

function generateQuestionReading(user: UserInfo, seed: number): Reading {
  const greeting = pick(QUESTION_GREETINGS, seed);
  const closing = pick(QUESTION_CLOSINGS, seed + 5);
  const zodiacInfo = ZODIAC_INFO[user.zodiac];

  const verdictType = seed % 3;
  const answerPool: QuestionAnswer[] =
    verdictType === 0 ? YES_ANSWERS : verdictType === 1 ? NO_ANSWERS : MAYBE_ANSWERS;
  const answer = pick(answerPool, seed + 1);

  const userQuestion = user.question ?? '';

  const sections: ReadingSection[] = [
    {
      title: 'Cevap',
      emoji: answer.emoji,
      content: `**${answer.headline}**\n\n${answer.elaboration}`,
    },
    {
      title: 'Enerjinin Yorumu',
      emoji: '🔮',
      content: `Sevgili ${user.name}, sorduğun soru — "${userQuestion}" — enerjilere ulaştı. ${zodiacInfo.rulingPlanet} gezegeninin senin ${user.zodiac} burcuna olan rehberliği, bu cevabın arka planında çalışıyor. ${zodiacInfo.traits.slice(0, 2).join(' ve ')} doğan, bu cevabı alırken onu bir ayna olarak kullan; ayna, gerçeği yansıtır ama gerçeği yaşayan sensin.\n\n${elementWisdom(zodiacInfo.element)}`,
    },
    {
      title: 'Sezgimin Tavsiyesi',
      emoji: '🦉',
      content: `Bu cevabı aldın, Sevgili dostum. Ama cevap, bir varış noktası değil, bir başlangıç noktasıdır. ${answer.verdict === 'yes' ? 'Evet cevabını aldın; şimdi onu bir eyleme çevir. Evet, bir yeşil ışıktır; ama yeşil ışık yandığında yürüyecek olan sensin. Hazır olduğun an, şu an olabilir.' : answer.verdict === 'no' ? 'Hayır cevabını aldın; ama bu, bir son değil, bir yönlendirmedir. Bu kapı kapalıysa, başka bir kapı açık. Gözünü aç, etrafa bak; belki de doğru kapı, baktığın yöne değil, arkana doğru.' : 'Belki cevabını aldın; bu, senin özgür iradeni onurlandıran bir cevap. Sonuç, senin adımlarına bağlı. Karar ver, ama kararı verirken kalbinin sesini mantığınla birlikte dinle. Tereddüt, en büyük düşmandır.'} Fal bir pusuladır, bir efendi değil; sen özgürsün.`,
    },
  ];

  return {
    id: crypto.randomUUID(),
    mode: 'question',
    userInfo: user,
    greeting,
    sections,
    closing,
    summary: `Soru: "${userQuestion}" — Cevap: ${answer.headline} ${zodiacInfo.rulingPlanet} enerjisi bu cevabın arka planında.`,
    createdAt: new Date().toISOString(),
  };
}

export function generateReading(user: UserInfo, mode: FortuneMode): Reading {
  const seed = buildSeed(user, mode);
  switch (mode) {
    case 'coffee':
      return generateCoffeeReading(user, seed);
    case 'love':
      return generateLoveReading(user, seed);
    case 'tarot':
      return generateTarotReading(user, seed);
    case 'astrology':
      return generateAstrologyReading(user, seed);
    case 'question':
      return generateQuestionReading(user, seed);
  }
}

export function getZodiacByDate(month: number, day: number): ZodiacSign | null {
  const ranges: [ZodiacSign, number, number, number, number][] = [
    ['Koç', 3, 21, 4, 19],
    ['Boğa', 4, 20, 5, 20],
    ['İkizler', 5, 21, 6, 20],
    ['Yengeç', 6, 21, 7, 22],
    ['Aslan', 7, 23, 8, 22],
    ['Başak', 8, 23, 9, 22],
    ['Terazi', 9, 23, 10, 22],
    ['Akrep', 10, 23, 11, 21],
    ['Yay', 11, 22, 12, 21],
    ['Oğlak', 12, 22, 1, 19],
    ['Kova', 1, 20, 2, 18],
    ['Balık', 2, 19, 3, 20],
  ];
  for (const [sign, m1, d1, m2, d2] of ranges) {
    if ((month === m1 && day >= d1) || (month === m2 && day <= d2)) {
      return sign;
    }
  }
  return null;
}
