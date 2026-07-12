'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Wrench, MessageCircle } from 'lucide-react';
import { SITE_CONFIG, MAINTENANCE_ENDS_AT } from '@/lib/constants';

function getTimeLeft() {
  const diff = new Date(MAINTENANCE_ENDS_AT).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  const hours = Math.floor(clamped / (1000 * 60 * 60));
  const minutes = Math.floor((clamped % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((clamped % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, done: diff <= 0 };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function MaintenanceMode() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const adminDigits = SITE_CONFIG.adminContactPhone.replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${adminDigits}?text=${encodeURIComponent(
    'Hi, I was trying to reach the SOUL Community website during the maintenance window.'
  )}`;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-soul-cream px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/soul-logo.png"
            alt="SOUL Community"
            width={72}
            height={72}
            className="rounded-full soul-shadow"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-2 bg-soul-gold/10 text-soul-gold-dark px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Wrench className="w-4 h-4" />
          Scheduled Maintenance
        </div>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-soul-green-dark mb-4">
          We&apos;re making SOUL even better
        </h1>

        <p className="text-soul-brown text-base md:text-lg mb-8 leading-relaxed">
          Our homepage is temporarily offline while we roll out some improvements.
          We expect to be back within <span className="font-semibold text-soul-green-dark">24 hours</span>.
          Thank you for your patience.
        </p>

        {!timeLeft.done ? (
          <div className="flex justify-center gap-3 mb-10">
            {[
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-white soul-shadow-card rounded-xl px-4 py-3 min-w-[80px]"
              >
                <div className="font-playfair text-2xl md:text-3xl font-bold text-soul-green-dark tabular-nums">
                  {pad(unit.value)}
                </div>
                <div className="text-xs text-soul-brown uppercase tracking-wide mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-soul-green-dark font-medium mb-10">
            We&apos;re just about done — thanks for hanging in there.
          </p>
        )}

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-soul-green text-white px-6 py-3 rounded-full font-medium hover:bg-soul-green-dark transition-colors soul-shadow"
        >
          <MessageCircle className="w-5 h-5" />
          Message us on WhatsApp
        </a>
      </div>
    </div>
  );
}
