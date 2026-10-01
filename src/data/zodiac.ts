import type { ZodiacInfo, ZodiacSign, ElementType } from '@/types';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  'Koç',
  'Boğa',
  'İkizler',
  'Yengeç',
  'Aslan',
  'Başak',
  'Terazi',
  'Akrep',
  'Yay',
  'Oğlak',
  'Kova',
  'Balık',
];

export const ZODIAC_INFO: Record<ZodiacSign, ZodiacInfo> = {
  Koç: {
    sign: 'Koç',
    element: 'Ateş',
    traits: ['cesur', 'lider', 'tutkulu', 'atılgan', 'bağımsız'],
    rulingPlanet: 'Mars',
    dateRange: '21 Mart - 19 Nisan',
  },
  Boğa: {
    sign: 'Boğa',
    element: 'Toprak',
    traits: ['sabırlı', 'sadık', 'kararlı', 'pratik', 'estetik'],
    rulingPlanet: 'Venus',
    dateRange: '20 Nisan - 20 Mayıs',
  },
  İkizler: {
    sign: 'İkizler',
    element: 'Hava',
    traits: ['meraklı', 'uyumlu', 'zeki', 'iletişimci', 'çevik'],
    rulingPlanet: 'Merkür',
    dateRange: '21 Mayıs - 20 Haziran',
  },
  Yengeç: {
    sign: 'Yengeç',
    element: 'Su',
    traits: ['duygusal', 'sezgisel', 'koruyucu', 'şefkatli', 'bağlı'],
    rulingPlanet: 'Ay',
    dateRange: '21 Haziran - 22 Temmuz',
  },
  Aslan: {
    sign: 'Aslan',
    element: 'Ateş',
    traits: ['gururlu', 'cömert', 'karizmatik', 'yaratıcı', 'sıcakkanlı'],
    rulingPlanet: 'Güneş',
    dateRange: '23 Temmuz - 22 Ağustos',
  },
  Başak: {
    sign: 'Başak',
    element: 'Toprak',
    traits: ['analitik', 'titiz', 'çalışkan', 'yardımsever', 'mantıklı'],
    rulingPlanet: 'Merkür',
    dateRange: '23 Ağustos - 22 Eylül',
  },
  Terazi: {
    sign: 'Terazi',
    element: 'Hava',
    traits: ['dengeli', 'adil', 'diplomatik', 'zarif', 'romantik'],
    rulingPlanet: 'Venus',
    dateRange: '23 Eylül - 22 Ekim',
  },
  Akrep: {
    sign: 'Akrep',
    element: 'Su',
    traits: ['tutkulu', 'kararlı', 'gizemli', 'sezgisel', 'güçlü'],
    rulingPlanet: 'Plüton',
    dateRange: '23 Ekim - 21 Kasım',
  },
  Yay: {
    sign: 'Yay',
    element: 'Ateş',
    traits: ['özgür', 'maceracı', 'iyimser', 'filozofik', 'dürüst'],
    rulingPlanet: 'Jüpiter',
    dateRange: '22 Kasım - 21 Aralık',
  },
  Oğlak: {
    sign: 'Oğlak',
    element: 'Toprak',
    traits: ['disiplinli', 'hırslı', 'sorumlu', 'geleneksel', 'dayanıklı'],
    rulingPlanet: 'Satürn',
    dateRange: '22 Aralık - 19 Ocak',
  },
  Kova: {
    sign: 'Kova',
    element: 'Hava',
    traits: ['bağımsız', 'yenilikçi', 'insancıl', 'orijinal', 'asi'],
    rulingPlanet: 'Uranüs',
    dateRange: '20 Ocak - 18 Şubat',
  },
  Balık: {
    sign: 'Balık',
    element: 'Su',
    traits: ['sezgisel', 'empatik', 'hayalperest', 'sanatsal', 'duyarlı'],
    rulingPlanet: 'Neptün',
    dateRange: '19 Şubat - 20 Mart',
  },
};

export const ELEMENT_COLORS: Record<ElementType, string> = {
  Ateş: '#ff6b35',
  Toprak: '#7cb342',
  Hava: '#42a5f5',
  Su: '#26c6da',
};

export function getElementCompatibility(el1: ElementType, el2: ElementType): 'high' | 'medium' | 'low' {
  if (el1 === el2) return 'high';
  const pairs: [ElementType, ElementType][] = [
    ['Ateş', 'Hava'],
    ['Toprak', 'Su'],
  ];
  for (const [a, b] of pairs) {
    if ((el1 === a && el2 === b) || (el1 === b && el2 === a)) return 'high';
  }
  if (el1 === 'Ateş' && el2 === 'Toprak') return 'low';
  if (el1 === 'Toprak' && el2 === 'Ateş') return 'low';
  if (el1 === 'Hava' && el2 === 'Su') return 'low';
  if (el1 === 'Su' && el2 === 'Hava') return 'low';
  return 'medium';
}
