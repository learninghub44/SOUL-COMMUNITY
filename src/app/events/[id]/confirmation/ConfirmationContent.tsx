'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, Ticket, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref') || '';
  const eventName = searchParams.get('event') || '';
  const name = searchParams.get('name') || '';

  if (!reference || !eventName) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          <div className="bg-white rounded-2xl soul-shadow-lg overflow-hidden">
            <div className="soul-gradient-green p-8 text-center">
              <CheckCircle className="w-16 h-16 text-soul-gold mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)]">
                No Booking Found
              </h1>
              <p className="text-white/80 mt-2">Please complete a booking first.</p>
            </div>
            <div className="p-8 text-center">
              <Link href="/events">
                <Button className="bg-soul-green hover:bg-soul-green-dark text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="bg-white rounded-2xl soul-shadow-lg overflow-hidden">
          <div className="soul-gradient-green p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-soul-gold mx-auto mb-4" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)]">
              Ticket Confirmed!
            </h1>
            <p className="text-white/80 mt-2">Your ticket has been successfully generated</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Ticket Reference</p>
              <p className="text-xl font-mono font-bold text-soul-green">{reference}</p>
            </div>

            <div className="bg-soul-cream-dark/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-soul-green flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Event</p>
                  <p className="font-medium">{eventName}</p>
                </div>
              </div>
              {name && (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-soul-green flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendee</p>
                    <p className="font-medium">{name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-soul-cream-dark/30 rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">QR Code</p>
              <div className="w-32 h-32 bg-white rounded-lg mx-auto flex items-center justify-center soul-shadow-card">
                <Ticket className="w-16 h-16 text-soul-green/30" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Show this QR code at the entrance</p>
            </div>

            <div className="text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm text-soul-green hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Events
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
