-- SOUL Community: member accounts + suggestion box
-- Run this in the Supabase SQL editor after schema.sql

-- 1. member_profiles table
-- One row per registered member, keyed to their auth.users id.
-- Sign up is optional site-wide; this is specifically for visitors
-- who want to request support and create an account to be reachable.
CREATE TABLE member_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    gender TEXT,
    age INTEGER,
    county TEXT,
    support_categories TEXT[] DEFAULT '{}',
    personal_statement TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    emergency_contact_relationship TEXT,
    location_lat DOUBLE PRECISION,
    location_lng DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE member_profiles IS 'Optional member accounts, primarily for visitors requesting support';

CREATE INDEX idx_member_profiles_email ON member_profiles(email);

ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;

-- Members can manage only their own row. Admins can view all (so the
-- team can follow up on support requests).
CREATE POLICY "Members can view own profile" ON member_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Members can insert own profile" ON member_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Members can update own profile" ON member_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all member_profiles" ON member_profiles
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete member_profiles" ON member_profiles
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- 2. suggestions table
-- Public suggestion box. Anyone can submit, but only admins can read
-- them back - there is no public listing of suggestions anywhere.
CREATE TABLE suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE suggestions IS 'Public suggestion box submissions - admin-only visibility';

CREATE INDEX idx_suggestions_status ON suggestions(status);
CREATE INDEX idx_suggestions_created_at ON suggestions(created_at);

ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert suggestions" ON suggestions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view suggestions" ON suggestions
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update suggestions" ON suggestions
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete suggestions" ON suggestions
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));
