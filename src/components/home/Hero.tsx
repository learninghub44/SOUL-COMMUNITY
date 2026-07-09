'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/marketing/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { WhatsAppJoinGate } from '@/components/shared/WhatsAppJoinGate';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden soul-gradient-green">
      {/* Big S.O.U.L emblem as the hero backdrop itself — multiply-blended into
          the dark gradient so its cream square edges melt into the background
          instead of reading as a framed sticker. */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/soul-logo.png"
          alt=""
          aria-hidden="true"
          width={1200}
          height={1200}
          priority
          className="h-[80vh] w-[80vh] max-w-none object-contain opacity-100 sm:h-[88vh] sm:w-[88vh] lg:h-full lg:w-full lg:max-w-full lg:object-cover"
        />
      </motion.div>

      {/* Soft gold glow + light gradient overlay so the heading/body text stay legible over the emblem, without dulling it down */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,155,60,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/45" />

      <div className="container-app relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-6 flex max-w-3xl flex-col items-center"
        >
          <h1 className="text-white font-heading text-hero text-center leading-tight">
            Serving Opportunities,{' '}
            <span className="text-soul-gold-light">Uplifting Lives</span>
          </h1>
          <span className="mt-5 h-[3px] w-28 rounded-full bg-gradient-to-r from-transparent via-soul-gold-light to-transparent sm:w-36" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mb-10 max-w-2xl text-lg text-white/85 sm:text-xl"
        >
          {SITE_CONFIG.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <WhatsAppJoinGate
            className={cn(buttonVariants({ variant: 'gold', size: 'lg' }), 'rounded-full')}
          >
            Join WhatsApp Community
          </WhatsAppJoinGate>
          <Link
            href="/support"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg' }),
              'gap-2 rounded-full soul-shadow-lg bg-white border-white hover:bg-white/90'
            )}
          >
            <Heart className="h-5 w-5 fill-current text-primary" />
            Donate Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
