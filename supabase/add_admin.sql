-- =====================================================================
-- Add an admin to SOUL Community
-- =====================================================================
-- Admin access is two-part by design:
--   1. A real login must exist in Supabase Auth (auth.users) - this is
--      what proves someone knows a valid email + password.
--   2. That same user's UUID must also exist in public.admin_users -
--      this is what every Row Level Security policy checks before
--      granting access to any admin-only data.
-- Being in auth.users alone does NOT make someone an admin - RLS
-- policies check admin_users, not auth.users. Both steps are required.
-- =====================================================================

-- STEP 1: Create the login (do this in the Supabase Dashboard, not SQL)
-- Go to: Authentication -> Users -> Add user -> Create new user
--   - Enter their email + a temporary password
--   - Check "Auto Confirm User" so they can log in immediately
-- After creating them, copy their User UID (a UUID) shown in the users list.
--
-- Alternative: they can be invited instead, via
-- Authentication -> Users -> Invite user (sends them a magic link to
-- set their own password). Either way, you need their UUID for step 2.

-- STEP 2: Grant admin access by inserting into admin_users.
-- Replace the placeholders below and run this in the SQL Editor.

insert into public.admin_users (id, email, full_name)
values (
  '00000000-0000-0000-0000-000000000000', -- <- paste the User UID from auth.users
  'newadmin@soul-community.org',          -- <- must match their auth.users email
  'New Admin Name'
)
on conflict (id) do update
set email = excluded.email,
    full_name = excluded.full_name;

-- ---------------------------------------------------------------------
-- Alternative: if you don't want to copy/paste the UUID manually, look
-- it up by email directly from auth.users in the same statement:
-- ---------------------------------------------------------------------

insert into public.admin_users (id, email, full_name)
select id, email, 'New Admin Name'
from auth.users
where email = 'newadmin@soul-community.org'
on conflict (id) do update
set email = excluded.email,
    full_name = excluded.full_name;

-- ---------------------------------------------------------------------
-- To revoke admin access later (does NOT delete their login, just
-- removes their admin privileges - they can no longer reach /admin or
-- read/write any admin-only tables):
-- ---------------------------------------------------------------------
-- delete from public.admin_users where email = 'someone@soul-community.org';

-- ---------------------------------------------------------------------
-- To list current admins:
-- ---------------------------------------------------------------------
-- select id, email, full_name, created_at from public.admin_users order by created_at;
