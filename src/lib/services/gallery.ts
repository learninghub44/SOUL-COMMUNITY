import type { SupabaseClient } from '@supabase/supabase-js';
import type { GalleryImage, GalleryAlbum } from '@/types';

export async function listGalleryImages(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as GalleryImage[];
}

export async function uploadGalleryImage(
  supabase: SupabaseClient,
  file: File,
  input: { title: string; description: string; category: string; album_id?: string }
) {
  const path = `gallery/${crypto.randomUUID()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(path, file, { upsert: false });
  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(path);

  const { data, error } = await supabase
    .from('gallery_images')
    .insert({
      id: crypto.randomUUID(),
      image_url: publicUrlData.publicUrl,
      title: input.title,
      description: input.description,
      category: input.category,
      album_id: input.album_id || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as GalleryImage;
}

export async function deleteGalleryImage(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from('gallery_images').delete().eq('id', id);
  if (error) throw error;
}

export async function listGalleryAlbums(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('gallery_albums')
    .select('*, gallery_images(count)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as unknown as Array<GalleryAlbum & { gallery_images: { count: number }[] }>).map(
    (album) => ({
      ...album,
      image_count: album.gallery_images?.[0]?.count ?? 0,
    })
  ) as GalleryAlbum[];
}

export async function createGalleryAlbum(
  supabase: SupabaseClient,
  input: { name: string; description: string }
) {
  const { data, error } = await supabase
    .from('gallery_albums')
    .insert({
      id: crypto.randomUUID(),
      name: input.name,
      description: input.description,
      cover_image: '',
    })
    .select()
    .single();

  if (error) throw error;
  return { ...data, image_count: 0 } as GalleryAlbum;
}

export async function deleteGalleryAlbum(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from('gallery_albums').delete().eq('id', id);
  if (error) throw error;
}
