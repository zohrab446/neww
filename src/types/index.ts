export type FortuneMode = 'coffee' | 'love' | 'tarot' | 'astrology' | 'question';

export type Gender = 'kadın' | 'erkek' | 'belirtmek istemiyorum';

export type RelationshipStatus =
  | 'bekar'
  | 'ilişkide'
  | 'evli'
  | 'ayrıldım'
  | 'karmaşık'
  | 'belirtmek istemiyorum';

export interface UserInfo {
  name: string;
  zodiac: ZodiacSign;
  gender: Gender;
  relationshipStatus: RelationshipStatus;
  partnerName?: string;
  partnerZodiac?: ZodiacSign;
  question?: string;
  coffeePhoto?: string;
  coffeePhotoSeed?: number;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  moonSign?: ZodiacSign;
  risingSign?: ZodiacSign;
}

export type ZodiacSign =
  | 'Koç'
  | 'Boğa'
  | 'İkizler'
  | 'Yengeç'
  | 'Aslan'
  | 'Başak'
  | 'Terazi'
  | 'Akrep'
  | 'Yay'
  | 'Oğlak'
  | 'Kova'
  | 'Balık';

export type ElementType = 'Ateş' | 'Toprak' | 'Hava' | 'Su';

export interface ZodiacInfo {
  sign: ZodiacSign;
  element: ElementType;
  traits: string[];
  rulingPlanet: string;
  dateRange: string;
}

export interface CoffeeSymbol {
  name: string;
  emoji: string;
  meaning: string;
  domain: 'past' | 'path' | 'love';
}

export interface TarotCard {
  name: string;
  emoji: string;
  meaning: string;
  reversed: string;
  keywords: string[];
}

export interface ReadingSection {
  title: string;
  emoji: string;
  content: string;
}

export interface Reading {
  id: string;
  mode: FortuneMode;
  userInfo: UserInfo;
  greeting: string;
  sections: ReadingSection[];
  closing: string;
  summary: string;
  createdAt: string;
}

export type AppPhase = 'intro' | 'form' | 'mode-select' | 'reading' | 'result' | 'history';
