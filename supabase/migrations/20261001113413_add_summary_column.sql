/*
# Add summary column to readings table

1. Modified Tables
- `readings`
  - Add `summary` (text, nullable) — short summary of the reading

2. Security
- No policy changes needed — existing policies cover new column.
*/

ALTER TABLE readings
  ADD COLUMN IF NOT EXISTS summary text;
