-- =====================================================================
-- team_members table — makes the Team page admin-editable.
-- Run this once in the Supabase SQL Editor (after schema.sql).
-- =====================================================================

CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    phone TEXT,
    email TEXT,
    is_founder BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE team_members IS 'Team/staff members shown on the public Team page, managed from the admin dashboard';

CREATE INDEX IF NOT EXISTS idx_team_members_sort_order ON team_members(sort_order);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Public can view (needed so the Team page renders for everyone)
CREATE POLICY "Public can view team_members" ON team_members
    FOR SELECT USING (true);

-- Only admins can add/edit/remove team members
CREATE POLICY "Admins can insert team_members" ON team_members
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update team_members" ON team_members
    FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can delete team_members" ON team_members
    FOR DELETE USING (auth.uid() IN (SELECT id FROM admin_users));

-- Seed with the current static team so nothing looks empty after migration.
-- Safe to skip/edit — admins can also just add these by hand in the dashboard.
INSERT INTO team_members (name, role, bio, image_url, phone, email, is_founder, sort_order)
VALUES
    (
        'Valentine Muthoni',
        'Founder & Director',
        'Mental health support in Kenya can be expensive, difficult to access, and often surrounded by stigma. I founded S.O.U.L to provide young people with a safe and supportive community where they can connect, heal, grow, and access the support they need. Through peer support, meaningful conversations, and community-driven initiatives, we aim to ensure that no one faces life''s challenges alone.',
        '/team/valentine-muthoni.jpg',
        NULL,
        NULL,
        true,
        0
    ),
    (
        'Wickliffe Okoth Otieno',
        'Counselling Psychologist',
        'Wickliffe Okoth Otieno is a licensed counseling psychologist dedicated to providing tailored mental health support for youth.',
        '/team/wickliffe-okoth.jpg',
        '+254729010390',
        'wickliffeokoth53@gmail.com',
        false,
        1
    ),
    (
        'Diana Muthoni',
        'Community Psychologist',
        'Diana Muthoni is a licensed community psychologist committed to addressing the specific mental health challenges faced by young individuals in our society.',
        '/team/diana-muthoni.jpg',
        '+254701286253',
        'dianamwendiamuthoni@gmail.com',
        false,
        2
    )
ON CONFLICT DO NOTHING;
