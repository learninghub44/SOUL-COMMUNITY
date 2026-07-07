export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  organizer: string;
  image_url: string;
  capacity: number;
  tickets_sold: number;
  ticket_price: number;
  is_free: boolean;
  whatsapp_link: string;
  status: 'draft' | 'published' | 'cancelled';
  is_featured: boolean;
  gallery: string[];
  faqs: FAQ[];
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Ticket {
  id: string;
  event_id: string;
  full_name: string;
  email: string;
  ticket_reference: string;
  qr_code: string;
  phone?: string | null;
  payment_status: 'pending' | 'paid' | 'refunded' | 'cancelled';
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
  event?: Event;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  is_pinned: boolean;
  status: 'draft' | 'published' | 'archived';
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  description: string;
  album_id: string;
  category: string;
  created_at: string;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  image_count: number;
  created_at: string;
}

export interface WeeklyActivity {
  id: string;
  day: string;
  title: string;
  description: string;
  detailed_description: string;
  image_url: string;
  meeting_info: string;
  links: ActivityLink[];
  created_at: string;
  updated_at: string;
}

export interface ActivityLink {
  label: string;
  url: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'jobs' | 'scholarships' | 'learning' | 'mental_health' | 'career' | 'volunteer';
  type: 'pdf' | 'link' | 'document';
  file_url: string | null;
  external_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar_url: string;
  rating: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface WebsiteSettings {
  id: string;
  hero_headline: string;
  hero_subheadline: string;
  mission: string;
  vision: string;
  about: string;
  whatsapp_community_link: string;
  whatsapp_channel_link: string;
  email: string;
  social_media: SocialMedia;
  seo: SEOSettings;
  updated_at: string;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tiktok: string;
  linkedin: string;
}

export interface MemberProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  gender: string | null;
  age: number | null;
  county: string | null;
  support_categories: string[];
  personal_statement: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_relationship: string | null;
  location_lat: number | null;
  location_lng: number | null;
  created_at: string;
  updated_at: string;
}

export interface Suggestion {
  id: string;
  name: string | null;
  email: string | null;
  message: string;
  status: 'new' | 'reviewed' | 'archived';
  created_at: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface DashboardStats {
  total_events: number;
  upcoming_events: number;
  total_announcements: number;
  total_gallery_images: number;
  total_resources: number;
  total_tickets_sold: number;
  total_revenue: number;
  recent_activity: Activity[];
}

export interface Activity {
  id: string;
  type: 'event' | 'announcement' | 'ticket' | 'gallery';
  title: string;
  description: string;
  created_at: string;
}
