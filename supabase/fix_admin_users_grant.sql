-- Fix: "permission denied for table admin_users" breaking public reads
-- on announcements/events/gallery/resources/weekly_activities.
--
-- Root cause: those tables have an "Admins can view all X" RLS policy
-- whose USING clause references admin_users (e.g. auth.uid() IN
-- (SELECT id FROM admin_users)). Postgres must evaluate every
-- permissive policy on a table to resolve a query, even ones that
-- don't apply to the current role - so it needs SELECT privilege on
-- admin_users just to *check* that policy, regardless of whether the
-- row would ultimately be visible via the "Public can view published X"
-- policy. The anon role never had that grant, so the whole query fails
-- before RLS even gets to the policy that would have allowed it.
--
-- This does NOT expose admin data: admin_users' own RLS policy still
-- restricts which ROWS anon/authenticated can see when querying it
-- directly (rows are only visible where auth.uid() matches, and anon
-- has no auth.uid(), so a direct `select * from admin_users` as anon
-- still returns zero rows). This grant only unblocks the table-level
-- permission check needed to evaluate policies on OTHER tables.

GRANT SELECT ON public.admin_users TO anon;
GRANT SELECT ON public.admin_users TO authenticated;
