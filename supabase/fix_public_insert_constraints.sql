-- Defense-in-depth constraints for the two tables anyone on the
-- internet can INSERT into (RLS policies are "WITH CHECK (true)" by
-- design - the contact form and free ticket registration are meant to
-- be open to the public). These constraints don't replace RLS; they
-- stop obviously-malformed or abusive rows (empty strings, absurdly
-- long text, invalid emails) at the database level even if a request
-- bypasses client-side validation entirely.
--
-- Added as NOT VALID: this applies the check to all NEW rows
-- immediately without failing if any existing row in the table
-- happens to already violate it (e.g. a very long message saved
-- before this migration existed). Safe to run against a live table.
--
-- Run this once in the Supabase SQL Editor, same as
-- fix_admin_users_grant.sql.

-- contact_messages: public can insert (see schema.sql policy
-- "Public can insert contact_messages" WITH CHECK (true))
ALTER TABLE contact_messages
  ADD CONSTRAINT contact_messages_name_length CHECK (char_length(name) BETWEEN 1 AND 200) NOT VALID,
  ADD CONSTRAINT contact_messages_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') NOT VALID,
  ADD CONSTRAINT contact_messages_subject_length CHECK (subject IS NULL OR char_length(subject) <= 200) NOT VALID,
  ADD CONSTRAINT contact_messages_message_length CHECK (char_length(message) BETWEEN 1 AND 5000) NOT VALID;

-- tickets: public can insert (see schema.sql policy
-- "Public can insert tickets" WITH CHECK (true))
ALTER TABLE tickets
  ADD CONSTRAINT tickets_full_name_length CHECK (char_length(full_name) BETWEEN 1 AND 200) NOT VALID,
  ADD CONSTRAINT tickets_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') NOT VALID;

-- Optional follow-up, once you're ready: this checks existing rows
-- against the new rules too (reports an error naming any row that
-- fails, instead of silently leaving old bad data in place). Safe to
-- run any time later - skip it entirely if you'd rather not touch
-- historical data.
-- ALTER TABLE contact_messages VALIDATE CONSTRAINT contact_messages_name_length;
-- ALTER TABLE contact_messages VALIDATE CONSTRAINT contact_messages_email_format;
-- ALTER TABLE contact_messages VALIDATE CONSTRAINT contact_messages_subject_length;
-- ALTER TABLE contact_messages VALIDATE CONSTRAINT contact_messages_message_length;
-- ALTER TABLE tickets VALIDATE CONSTRAINT tickets_full_name_length;
-- ALTER TABLE tickets VALIDATE CONSTRAINT tickets_email_format;

-- If you ever see repeated abuse (spam submissions), the next layer
-- up from here is a CAPTCHA (e.g. Cloudflare Turnstile) on the
-- contact and ticket forms, or a Cloudflare Worker/Pages Function
-- rate limiter in front of these inserts. Not added here since it
-- requires new frontend + Cloudflare configuration beyond a SQL fix.
