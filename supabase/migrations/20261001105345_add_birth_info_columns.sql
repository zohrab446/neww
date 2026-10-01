/*
# Add birth info columns to readings table

1. Modified Tables
- `readings`
  - Add `birth_date` (date, nullable) — user's birth date for astrology readings
  - Add `birth_time` (text, nullable) — user's birth time
  - Add `birth_place` (text, nullable) — user's birth place
  - Add `moon_sign` (text, nullable) — user's moon zodiac sign
  - Add `rising_sign` (text, nullable) — user's rising/ascendant zodiac sign

2. Security
- No policy changes needed — existing policies cover new columns.
*/

ALTER TABLE readings
  ADD COLUMN IF NOT EXISTS birth_date date,
  ADD COLUMN IF NOT EXISTS birth_time text,
  ADD COLUMN IF NOT EXISTS birth_place text,
  ADD COLUMN IF NOT EXISTS moon_sign text,
  ADD COLUMN IF NOT EXISTS rising_sign text;
