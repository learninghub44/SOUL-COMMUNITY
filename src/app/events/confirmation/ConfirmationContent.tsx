'use client';

import { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import {
  CheckCircle,
  ArrowLeft,
  Calendar,
  User,
  Clock,
  MapPin,
  Download,
  Share2,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

/** Loads an image and resolves once ready, for use inside canvas/pdf drawing. */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref') || '';
  const eventName = searchParams.get('event') || '';
  const name = searchParams.get('name') || '';
  const isFree = searchParams.get('free') === '1';
  const dateParam = searchParams.get('date') || '';
  const venue = searchParams.get('venue') || '';
  const phone = searchParams.get('phone') || '';

  const qrRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const formattedDate = (() => {
    if (!dateParam) return '';
    try {
      return format(new Date(dateParam), 'EEEE, MMM d, yyyy');
    } catch {
      return dateParam;
    }
  })();

  const shareText = [
    `🎟️ SOUL Community Ticket`,
    `Event: ${eventName}`,
    name ? `Attendee: ${name}` : '',
    `Reference: ${reference}`,
    formattedDate ? `Date: ${formattedDate}` : '',
    venue ? `Venue: ${venue}` : '',
    `Status: ${isFree ? 'Confirmed' : 'Pending payment confirmation'}`,
  ]
    .filter(Boolean)
    .join('\n');

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My SOUL Ticket', text: shareText });
        return;
      } catch {
        // user cancelled or share failed — fall through to WhatsApp link
      }
    }
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  }

  async function handleDownloadPdf() {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) {
      toast.error('QR code is not ready yet, try again in a moment');
      return;
    }
    setDownloading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: [360, 580] });

      const green = '#2D5A3D';
      const gold = '#C9A34E';
      const cream = '#FFFBF5';
      const dark = '#22331F';

      // Background
      doc.setFillColor(cream);
      doc.rect(0, 0, 360, 580, 'F');

      // Header band
      doc.setFillColor(green);
      doc.rect(0, 0, 360, 140, 'F');

      // Logo in header
      try {
        const logo = await loadImage('/soul-logo-sm.png');
        const logoSize = 56;
        doc.addImage(logo, 'PNG', 180 - logoSize / 2, 18, logoSize, logoSize);
      } catch {
        // continue without logo if it fails to load
      }

      doc.setTextColor('#FFFFFF');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('SOUL COMMUNITY', 180, 96, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('WORKSHOP TICKET', 180, 112, { align: 'center' });

      // Dashed divider
      doc.setDrawColor(gold);
      doc.setLineWidth(1.2);
      doc.setLineDashPattern([4, 3], 0);
      doc.line(20, 140, 340, 140);
      doc.setLineDashPattern([], 0);

      // Body details
      let y = 168;
      doc.setTextColor(dark);

      const field = (label: string, value: string) => {
        if (!value) return;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor('#7A6A55');
        doc.text(label.toUpperCase(), 28, y);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(dark);
        doc.text(value, 28, y + 15);
        y += 38;
      };

      field('Workshop', eventName);
      if (name) field('Attendee', name);
      if (formattedDate) field('Date', formattedDate);
      if (venue) field('Venue', venue);
      field('Status', isFree ? 'Confirmed' : 'Pending payment confirmation');

      // Ticket reference, prominent
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor('#7A6A55');
      doc.text('TICKET REFERENCE', 180, y + 6, { align: 'center' });
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(green);
      doc.text(reference, 180, y + 24, { align: 'center' });

      y += 44;

      // Dashed divider before QR
      doc.setDrawColor(gold);
      doc.setLineDashPattern([4, 3], 0);
      doc.line(20, y, 340, y);
      doc.setLineDashPattern([], 0);
      y += 20;

      // QR code
      const qrDataUrl = canvas.toDataURL('image/png');
      const qrSize = 150;
      doc.addImage(qrDataUrl, 'PNG', 180 - qrSize / 2, y, qrSize, qrSize);
      y += qrSize + 18;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor('#7A6A55');
      doc.text('Show this QR code at the entrance', 180, y, { align: 'center' });

      doc.save(`SOUL-Ticket-${reference}.pdf`);
    } catch {
      toast.error('Could not generate PDF ticket. Please try again.');
    } finally {
      setDownloading(false);
    }
  }

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
              <h1 className="text-2xl font-bold text-white font-heading">No Booking Found</h1>
              <p className="text-white/80 mt-2">Please complete a booking first.</p>
            </div>
            <div className="p-8 text-center">
              <Link href="/events">
                <Button className="bg-soul-green hover:bg-soul-green-dark text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse Workshops
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
            <h1 className="text-2xl font-bold text-white font-heading">
              {isFree ? 'Spot Reserved!' : 'Registration Received!'}
            </h1>
            <p className="text-white/80 mt-2">
              {isFree
                ? 'Your ticket has been confirmed'
                : "We'll contact you shortly with payment details"}
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Ticket Reference</p>
              <p className="text-xl font-mono font-bold text-soul-green">{reference}</p>
            </div>

            <div className="bg-soul-cream-dark/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-soul-green shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Workshop</p>
                  <p className="font-medium">{eventName}</p>
                </div>
              </div>
              {name && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-soul-green shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Attendee</p>
                    <p className="font-medium">{name}</p>
                  </div>
                </div>
              )}
              {formattedDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-soul-green shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                </div>
              )}
              {venue && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-soul-green shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-medium">{venue}</p>
                  </div>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-soul-green shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp Number</p>
                    <p className="font-medium">{phone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-soul-green shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">
                    {isFree ? 'Confirmed' : 'Pending payment confirmation'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-soul-cream-dark/30 rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">QR Code</p>
              <div
                ref={qrRef}
                className="w-36 h-36 bg-white rounded-lg mx-auto flex items-center justify-center soul-shadow-card p-2"
              >
                <QRCodeCanvas
                  value={reference}
                  size={128}
                  level="H"
                  imageSettings={{
                    src: '/soul-logo-sm.png',
                    height: 30,
                    width: 30,
                    excavate: true,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Show this QR code at the entrance</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="bg-soul-green hover:bg-soul-green-dark text-white"
              >
                {downloading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download PDF
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-soul-green text-soul-green hover:bg-soul-green/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share on WhatsApp
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm text-soul-green hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Workshops
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
