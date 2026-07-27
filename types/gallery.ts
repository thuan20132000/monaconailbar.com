export interface BusinessGalleryImage {
  id: number
  media_type: 'image' | 'video'
  image: string | null
  video: string | null
  alt_text: string | null
  title: string | null
  caption: string | null
  category: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}
