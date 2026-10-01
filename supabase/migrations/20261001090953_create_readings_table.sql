/*
# Create readings table (single-tenant, no auth)

1. New Tables
- `readings`
  - `id` (uuid, primary key)
  - `mode` (text: 'coffee' | 'love' | 'tarot', not null)
  - `user_name` (text, not null)
  - `user_zodiac` (text, not null)
  - `user_gender` (text)
  - `relationship_status` (text)
  - `partner_name` (text, nullable)
  - `partner_zodiac` (text, nullable)
  - `question` (text, nullable)
  - `greeting` (text, not null)
  - `sections` (jsonb, not null — array of {title, emoji, content})
  - `closing` (text, not null)
  - `created_at` (timestamp, defaults to now)

2. Security
- Enable RLS on `readings`.
- Allow anon + authenticated full CRUD — this is a single-tenant app with no sign-in screen.
*/

CREATE TABLE IF NOT EXISTS readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mode text NOT NULL CHECK (mode IN ('coffee', 'love', 'tarot')),
  user_name text NOT NULL,
  user_zodiac text NOT NULL,
  user_gender text,
  relationship_status text,
  partner_name text,
  partner_zodiac text,
  question text,
  greeting text NOT NULL,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  closing text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_readings" ON readings;
CREATE POLICY "anon_select_readings" ON readings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_readings" ON readings;
CREATE POLICY "anon_insert_readings" ON readings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_readings" ON readings;
CREATE POLICY "anon_delete_readings" ON readings FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_readings_created_at ON readings (created_at DESC);
