-- =====================================================================
-- Storage bucket for admin-uploaded media (event posters, gallery
-- images, announcement images, etc.)
-- Run this once in the Supabase SQL Editor.
-- =====================================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone can view files (needed so posters/images render on the public site)
create policy "Public can view media"
on storage.objects for select
using (bucket_id = 'media');

-- Only admins can upload
create policy "Admins can upload media"
on storage.objects for insert
with check (
  bucket_id = 'media'
  and auth.uid() in (select id from public.admin_users)
);

-- Only admins can update/replace files
create policy "Admins can update media"
on storage.objects for update
using (
  bucket_id = 'media'
  and auth.uid() in (select id from public.admin_users)
);

-- Only admins can delete files
create policy "Admins can delete media"
on storage.objects for delete
using (
  bucket_id = 'media'
  and auth.uid() in (select id from public.admin_users)
);
