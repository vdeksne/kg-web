-- Public bucket for CMS images (admin upload → public URLs).
-- Apply in Supabase SQL Editor or via `supabase db push` if linked.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cms',
  'cms',
  TRUE,
  8388608,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Anyone can read objects (bucket is public; URLs are unguessable UUIDs).
DROP POLICY IF EXISTS "Public read cms objects" ON storage.objects;
CREATE POLICY "Public read cms objects"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'cms');

-- Note: uploads use SUPABASE_SERVICE_ROLE_KEY in /api/admin/upload, which bypasses RLS.
