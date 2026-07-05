'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Download, MessageCircle, ArrowLeft, Calendar, MapPin, Clock, User, Mail, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref') || 'SOUL-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const eventName = searchParams.get('event') || 'Community Event';
  const name = searchParams.get('name') || 'Guest';

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
                <Calendar className="w-5 h-5 text-soul-green" />
                <div>
                  <p className="text-sm text-muted-foreground">Event</p>
                  <p className="font-medium">{eventName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-soul-green" />
                <div>
                  <p className="text-sm text-muted-foreground">Attendee</p>
                  <p className="font-medium">{name}</p>
                </div>
              </div>
            </div>

            <div className="bg-soul-cream-dark/30 rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">QR Code</p>
              <div className="w-32 h-32 bg-white rounded-lg mx-auto flex items-center justify-center soul-shadow-card">
                <Ticket className="w-16 h-16 text-soul-green/30" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Show this QR code at the entrance</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-soul-green hover:bg-soul-green-dark" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <a
                href="https://chat.whatsapp.com/your-community"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 flex-1 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium h-11"
              >
                <MessageCircle className="w-4 h-4" />
                Join on WhatsApp
              </a>
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
