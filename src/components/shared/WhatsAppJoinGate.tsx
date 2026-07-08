'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const ADMIN_PHONE_DIGITS = SITE_CONFIG.adminContactPhone.replace(/[^0-9]/g, '');
const ADMIN_WA_LINK = `https://wa.me/${ADMIN_PHONE_DIGITS}?text=${encodeURIComponent(
  "Hi, I'd like to join the SOUL Community WhatsApp group/channel."
)}`;

interface WhatsAppJoinGateProps {
  /** Classes for the trigger element — pass through the original button/link styling. */
  className?: string;
  children: ReactNode;
}

/**
 * Wraps any "Join WhatsApp Community" / "Follow WhatsApp Channel" trigger.
 * Instead of navigating to the invite link, it opens a hard wall requiring
 * the user to contact admin support first. The real invite link is never
 * shown here — the admin adds the member directly after being contacted.
 */
export function WhatsAppJoinGate({ className, children }: WhatsAppJoinGateProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-soul-green/10">
                <MessageCircle className="h-6 w-6 text-soul-green" />
              </div>

              <h3 className="font-heading text-xl font-bold text-foreground">
                Contact admin to join
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We don&apos;t have an open invite link. To join, message our support admin on
                WhatsApp and they&apos;ll add you directly.
              </p>

              <a
                href={ADMIN_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-soul-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-soul-green-dark"
              >
                <Phone className="h-4 w-4" />
                Message Admin: {SITE_CONFIG.adminContactPhone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
