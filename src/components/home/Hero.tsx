'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/marketing/Button';
import { SITE_CONFIG } from '@/lib/constants';

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden soul-gradient-green">
      {/* Soft gold glow behind the emblem, echoing the Step 1 token palette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,155,60,0.18),transparent_60%)]" />

      <div className="container-app relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <Image
            src="/soul-logo.png"
            alt="S.O.U.L — Serving Opportunities, Uplifting Lives"
            width={640}
            height={640}
            priority
            className="h-72 w-72 sm:h-96 sm:w-96 md:h-[28rem] md:w-[28rem] lg:h-[32rem] lg:w-[32rem] drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          />
        </motion.div>

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
          <Link
            href={SITE_CONFIG.whatsappCommunityLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'gold', size: 'lg' }), 'rounded-full')}
          >
            Join WhatsApp Community
          </Link>
          <Link
            href={SITE_CONFIG.whatsappChannelLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'lg' }),
              'rounded-full border border-white/40 bg-white/5 text-white/90 backdrop-blur-sm hover:bg-white/15 hover:text-white'
            )}
          >
            Follow WhatsApp Channel
          </Link>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-label="Scroll down"
      >
        <span className="soul-dotted-arc w-16 text-white/50" />
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm"
        >
          <span className="block h-2 w-2 rounded-full bg-soul-gold-light" />
        </motion.span>
      </motion.button>
    </section>
  );
}
