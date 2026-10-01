/*
# Add coffee_photo column to readings table

1. Modified Tables
- `readings`
  - Add `coffee_photo` (text, nullable) — stores the data URL of the coffee cup photo uploaded by the user for coffee readings.

2. Security
- No policy changes needed — the existing anon/authenticated policies already cover the new column.
*/

ALTER TABLE readings
  ADD COLUMN IF NOT EXISTS coffee_photo text;
