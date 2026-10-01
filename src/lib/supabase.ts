import { createClient } from '@supabase/supabase-js';
import type { Reading } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ReadingRow {
  id: string;
  mode: string;
  user_name: string;
  user_zodiac: string;
  user_gender: string | null;
  relationship_status: string | null;
  partner_name: string | null;
  partner_zodiac: string | null;
  question: string | null;
  coffee_photo: string | null;
  birth_date: string | null;
  birth_time: string | null;
  birth_place: string | null;
  moon_sign: string | null;
  rising_sign: string | null;
  greeting: string;
  sections: Reading['sections'];
  closing: string;
  summary: string;
  created_at: string;
}

export function readingToRow(r: Reading): Omit<ReadingRow, 'id' | 'created_at'> {
  return {
    mode: r.mode,
    user_name: r.userInfo.name,
    user_zodiac: r.userInfo.zodiac,
    user_gender: r.userInfo.gender,
    relationship_status: r.userInfo.relationshipStatus,
    partner_name: r.userInfo.partnerName ?? null,
    partner_zodiac: r.userInfo.partnerZodiac ?? null,
    question: r.userInfo.question ?? null,
    coffee_photo: r.userInfo.coffeePhoto ?? null,
    birth_date: r.userInfo.birthDate ?? null,
    birth_time: r.userInfo.birthTime ?? null,
    birth_place: r.userInfo.birthPlace ?? null,
    moon_sign: r.userInfo.moonSign ?? null,
    rising_sign: r.userInfo.risingSign ?? null,
    greeting: r.greeting,
    sections: r.sections,
    closing: r.closing,
    summary: r.summary,
  };
}

export function rowToReading(row: ReadingRow): Reading {
  return {
    id: row.id,
    mode: row.mode as Reading['mode'],
    userInfo: {
      name: row.user_name,
      zodiac: row.user_zodiac as Reading['userInfo']['zodiac'],
      gender: (row.user_gender ?? 'belirtmek istemiyorum') as Reading['userInfo']['gender'],
      relationshipStatus: (row.relationship_status ?? 'belirtmek istemiyorum') as Reading['userInfo']['relationshipStatus'],
      partnerName: row.partner_name ?? undefined,
      partnerZodiac: row.partner_zodiac as Reading['userInfo']['partnerZodiac'] ?? undefined,
      question: row.question ?? undefined,
      coffeePhoto: row.coffee_photo ?? undefined,
      birthDate: row.birth_date ?? undefined,
      birthTime: row.birth_time ?? undefined,
      birthPlace: row.birth_place ?? undefined,
      moonSign: (row.moon_sign as Reading['userInfo']['moonSign']) ?? undefined,
      risingSign: (row.rising_sign as Reading['userInfo']['risingSign']) ?? undefined,
    },
    greeting: row.greeting,
    sections: row.sections,
    closing: row.closing,
    summary: row.summary ?? '',
    createdAt: row.created_at,
  };
}

export async function saveReading(reading: Reading): Promise<void> {
  const { error } = await supabase.from('readings').insert({
    id: reading.id,
    ...readingToRow(reading),
    created_at: reading.createdAt,
  });
  if (error) throw error;
}

export async function fetchReadings(): Promise<Reading[]> {
  const { data, error } = await supabase
    .from('readings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return (data as ReadingRow[]).map(rowToReading);
}

export async function deleteReading(id: string): Promise<void> {
  const { error } = await supabase.from('readings').delete().eq('id', id);
  if (error) throw error;
}
