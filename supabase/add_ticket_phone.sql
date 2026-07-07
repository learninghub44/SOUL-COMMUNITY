-- Add phone number to tickets so admins can send/resend tickets via WhatsApp.
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS phone TEXT;

COMMENT ON COLUMN tickets.phone IS 'Attendee WhatsApp/phone number (E.164 or local format), used for sending ticket via WhatsApp';
