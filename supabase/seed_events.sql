-- =====================================================================
-- Seed: 4 community events (Community Mental Health Meetup, S.O.U.L
-- Escape: Kanunga Edition, Youth Empowerment Workshop, S.O.U.L.Mates
-- Hangout). Run once in the Supabase SQL Editor.
--
-- image_url / gallery are left NULL / empty on purpose — add the real
-- event photos afterward from the admin dashboard
-- (Admin > Events > Edit > Upload Image), which uploads to the
-- existing "media" storage bucket and updates the event automatically.
-- All events are fully editable and deletable afterward from
-- Admin > Events, exactly like every other event in the system.
-- =====================================================================

insert into events (
  id, title, description, venue, date, time, organizer,
  image_url, capacity, ticket_price, is_free, whatsapp_link,
  status, is_featured, gallery, faqs
) values
-- NOTE: no charge was listed for this one in the source content, so it's
-- seeded as free for now. Update the price from Admin > Events > Edit if
-- there is actually a charge.
(
  gen_random_uuid(),
  'Community Mental Health Meetup',
  'A safe, judgment-free gathering where community members come together to talk openly about mental health, share experiences, and support one another. Come as you are, listen, share if you feel ready, and connect with people on the same journey of growth and healing.',
  'Arboretum',
  '2026-07-05',
  null,
  'We are S.O.U.L Community',
  null,
  null,
  null,
  true,
  null,
  'published',
  false,
  '[]'::jsonb,
  '[]'::jsonb
),
(
  gen_random_uuid(),
  'Youth Empowerment Workshop',
  'Empower-Fest: A workshop focused on empowering youth through practical knowledge and skills. Experts will share insights on building practical business skills, navigating challenges in business, and fostering emotional intelligence to manage your business in a supportive environment. Covers media market selling for every kind of business, plus learning new skills.',
  'Arboretum',
  '2026-07-05',
  null,
  'We are S.O.U.L Community',
  null,
  null,
  400,
  false,
  null,
  'published',
  false,
  '[]'::jsonb,
  '[]'::jsonb
),
(
  gen_random_uuid(),
  'S.O.U.L.Mates Hangout: Karura Walk',
  'A nature escape to walk, connect, and recharge. Life can carry a lot of pressure, so we take time away to clear our minds, touch grass, vibe with good people, and enjoy the moment. Expect meaningful conversations, plenty of laughter, deep talks, nature vibes, some reflection, and connecting with others on the same journey of growth and healing. No form, no pressure -- come as you are. We will walk, vibe, talk, and recharge together. Pull up with good energy and leave feeling fresh, lighter, and with new connections.',
  'Karura Forest',
  '2026-06-13',
  null,
  'We are S.O.U.L Community',
  null,
  null,
  350,
  false,
  null,
  'published',
  false,
  '[]'::jsonb,
  '[]'::jsonb
),
(
  gen_random_uuid(),
  'S.O.U.L Escape: Kanunga Edition',
  'Escape the noise and find yourself through our community. Join us for a refreshing outdoor experience designed to help everyone unwind, connect, and grow. Surrounded by the beauty of Kanunga Falls, we will enjoy nature walks, meaningful conversations, team-building activities, reflection moments, games, and genuine connections. Whether you are looking to make new friends or simply take a break from life''s pressures, this is your chance to step away from the noise and reconnect with yourself and others. Adventure, mental wellness, community connection, reflection and growth, fun and lasting memories. Come as you are, leave as S.O.U.L.Mates -- refreshed, connected, and inspired.',
  'Kanunga Falls',
  '2026-07-18',
  null,
  'We are S.O.U.L Community',
  null,
  null,
  1400,
  false,
  null,
  'published',
  false,
  '[]'::jsonb,
  '[]'::jsonb
);
