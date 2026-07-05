-- SOUL Community Platform Database Schema
-- For Supabase PostgreSQL

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. admin_users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE admin_users IS 'Administrators of the SOUL community platform';

-- 2. website_settings table
CREATE TABLE website_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_headline TEXT,
    hero_subheadline TEXT,
    mission TEXT,
    vision TEXT,
    about TEXT,
    whatsapp_community_link TEXT,
    whatsapp_channel_link TEXT,
    email TEXT,
    phone TEXT,
    social_media JSONB DEFAULT '{}',
    seo JSONB DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE website_settings IS 'Global website configuration and content settings';

-- 3. events table
CREATE TABLE events (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    venue TEXT,
    date DATE,
    time TEXT,
    organizer TEXT,
    image_url TEXT,
    capacity INTEGER,
    tickets_sold INTEGER DEFAULT 0,
    ticket_price NUMERIC DEFAULT 0,
    is_free BOOLEAN DEFAULT true,
    whatsapp_link TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
    is_featured BOOLEAN DEFAULT false,
    gallery JSONB DEFAULT '[]',
    faqs JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE events IS 'Community events with ticketing and management';

-- 4. tickets table
CREATE TABLE tickets (
    id UUID PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    ticket_reference TEXT UNIQUE NOT NULL,
    qr_code TEXT,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'cancelled')),
    checked_in BOOLEAN DEFAULT false,
    checked_in_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE tickets IS 'Event ticket purchases and registrations';

-- 5. announcements table
CREATE TABLE announcements (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    is_pinned BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    scheduled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE announcements IS 'Community announcements and news';

-- 6. gallery_albums table
CREATE TABLE gallery_albums (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE gallery_albums IS 'Photo albums for community gallery';

-- 7. gallery_images table
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY,
    image_url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    album_id UUID REFERENCES gallery_albums(id) ON DELETE SET NULL,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE gallery_images IS 'Individual images within gallery albums';

-- 8. weekly_activities table
CREATE TABLE weekly_activities (
    id UUID PRIMARY KEY,
    day TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    detailed_description TEXT,
    image_url TEXT,
    meeting_info TEXT,
    links JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE weekly_activities IS 'Regular weekly community activities and schedule';

-- 9. resources table
CREATE TABLE resources (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    type TEXT,
    file_url TEXT,
    external_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE resources IS 'Downloadable and external resources for members';

-- 10. testimonials table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE testimonials IS 'Member testimonials and reviews';

-- 11. contact_messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE contact_messages IS 'Messages submitted through contact form';

-- Indexes for performance
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_is_featured ON events(is_featured);
CREATE INDEX idx_tickets_event_id ON tickets(event_id);
CREATE INDEX idx_tickets_ticket_reference ON tickets(ticket_reference);
CREATE INDEX idx_tickets_payment_status ON tickets(payment_status);
CREATE INDEX idx_announcements_status ON announcements(status);
CREATE INDEX idx_announcements_scheduled_at ON announcements(scheduled_at);
CREATE INDEX idx_gallery_images_album_id ON gallery_images(album_id);
CREATE INDEX idx_gallery_images_category ON gallery_images(category);
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_contact_messages_read ON contact_messages(read);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- Enable Row Level Security on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Admin users: only authenticated admins can access
CREATE POLICY "Admins can view admin_users" ON admin_users
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can insert admin_users" ON admin_users
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update admin_users" ON admin_users
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete admin_users" ON admin_users
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Website settings: public read, admin write
CREATE POLICY "Public can view website_settings" ON website_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert website_settings" ON website_settings
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update website_settings" ON website_settings
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete website_settings" ON website_settings
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Events: public read published, admin full access
CREATE POLICY "Public can view published events" ON events
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can view all events" ON events
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can insert events" ON events
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update events" ON events
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete events" ON events
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Tickets: public can insert (for purchases), admin can read/update
CREATE POLICY "Public can insert tickets" ON tickets
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view own tickets" ON tickets
    FOR SELECT USING (email = auth.email());

CREATE POLICY "Admins can view all tickets" ON tickets
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update tickets" ON tickets
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete tickets" ON tickets
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Announcements: public read published, admin full access
CREATE POLICY "Public can view published announcements" ON announcements
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can view all announcements" ON announcements
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can insert announcements" ON announcements
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update announcements" ON announcements
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete announcements" ON announcements
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Gallery albums: public read, admin full access
CREATE POLICY "Public can view gallery_albums" ON gallery_albums
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert gallery_albums" ON gallery_albums
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update gallery_albums" ON gallery_albums
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete gallery_albums" ON gallery_albums
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Gallery images: public read, admin full access
CREATE POLICY "Public can view gallery_images" ON gallery_images
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert gallery_images" ON gallery_images
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update gallery_images" ON gallery_images
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete gallery_images" ON gallery_images
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Weekly activities: public read, admin full access
CREATE POLICY "Public can view weekly_activities" ON weekly_activities
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert weekly_activities" ON weekly_activities
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update weekly_activities" ON weekly_activities
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete weekly_activities" ON weekly_activities
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Resources: public read, admin full access
CREATE POLICY "Public can view resources" ON resources
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert resources" ON resources
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update resources" ON resources
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete resources" ON resources
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Testimonials: public read, admin full access
CREATE POLICY "Public can view testimonials" ON testimonials
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert testimonials" ON testimonials
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update testimonials" ON testimonials
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete testimonials" ON testimonials
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Contact messages: public insert, admin read/update
CREATE POLICY "Public can insert contact_messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact_messages" ON contact_messages
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update contact_messages" ON contact_messages
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete contact_messages" ON contact_messages
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));