-- =====================================================================
-- Seed: sample gallery photos from two client-provided Google Photos
-- albums (10 photos total — 5 per album). Run once in the Supabase
-- SQL Editor.
--
-- IMPORTANT — read before running:
-- 1. These image_url values point directly at Google's photo CDN
--    (lh3.googleusercontent.com), NOT at our own Supabase "media"
--    storage bucket. They will display fine, but they are outside our
--    control — Google can technically invalidate or expire these
--    share links at any time. For anything you want to keep long-term,
--    the safer path is: open the album, save/download the photo, then
--    upload it properly via Admin > Gallery > Upload, which copies it
--    into our own storage.
-- 2. This is a SAMPLE, not a curated "best of" set — these were picked
--    in album order, not by visual quality (no tool available here can
--    actually view/compare the photos). Swap any of them out any time
--    from Admin > Gallery.
-- 3. The remaining ~50 photos not included here are linked as an
--    external "View Full Photo Albums" section on the public Gallery
--    page instead of being imported one-by-one.
--
-- Source albums:
--   Album A ("Jun 7, 2026"):   https://photos.app.goo.gl/dPsqty9VxaQa5dYNA
--   Album B ("Trip to Kenya"): https://photos.app.goo.gl/hanzjgiKo3ujtnY76
-- =====================================================================

insert into gallery_images (id, image_url, title, description, category) values
-- Album A — "Jun 7, 2026" (Community)
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczMWuvV_wWc6FyHuy11r1gmFJr_Nw-V03NsmuLLCype2l5u_9Bg8szJunP9yqgxrZt60wm6Wiy0wr0bswUGNFLdgk5XIKO2vW_xx0ymrbXku8rRhkTAf=w1600', 'Community Gathering', 'Sunday, Jun 7 community moment', 'Community'),
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczNztWlxF1TiBkn4J5Lz3yjAi08yJroj-C7SLo2lTVmGCGSthaGhEwwQXI2XuedkDPyK7NPvLDkdlDAXayIce83FpKUsk_ssZDq5l7WJZ_Lps9DAaxpE=w1600', 'Community Gathering', 'Sunday, Jun 7 community moment', 'Community'),
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczMcvzudwOXOUyL4a-zVhdWwS3Cc-fyCJvVitJupoUZCfVRe_qBMQbZ_CQvrbZ2iJocDKyIK2HJwaVDH_NeKT1-UTapluXkLINAMa4s9YjJSAHoBZ5ym=w1600', 'Community Gathering', 'Sunday, Jun 7 community moment', 'Community'),
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczNejMgMbcH11GBZjAlm5pYa0Ja3uw6LTBG8ZzMETpC9A8gLj--1LHtkMHFYjFIRSgfpEjBcPs0nkDhx5j3gJ6R5PwGGyPneUSm0mefJ__sp2BQwag5P=w1600', 'Community Gathering', 'Sunday, Jun 7 community moment', 'Community'),
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczNNzlnWDR0NH2hk_eUdmJieLhJGimOqie3ywCNzAsaEbeSYHNBVPgen1vkfj0IQMAjPrLX5ZHPqju2mCj2DpSa5LWxMsyzK9dLNMwHky44ZlHRKO_W1=w1600', 'Community Gathering', 'Sunday, Jun 7 community moment', 'Community'),

-- Album B — "Trip to Kenya" (Outdoor)
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczMpLlWymk_QNSxLlde7_edywqbjTXoWqD8eRsbj4ZifjyPa5YwiIXxefWyrjHbrpAq1snV0H1g49MNLA_L8otds4w0avRrsSK-HnnaFo0fOjjDM4xm2=w1600', 'Trip to Kenya', 'Community outdoor trip', 'Outdoor'),
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczOgoKEDNY-dH8TEzpfdQuAnYR8L9FMSuwBHZVloYR4Eizo6AwCdoYsAqEX4IWBoBWp4QXbC5KK8lMVLoCTBR7SvKOv8jsCRRg6tPb-vx7Sg8dzOkNcL=w1600', 'Trip to Kenya', 'Community outdoor trip', 'Outdoor'),
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczNiKXBin7pFqqX6cL6h8cv18KWiRlczZVh_CkvID7fF_aK96odio8D5i6YnNfYVu8mU01gesDg0mXz94unBsLd9LmRohWZ1bO1Pd3cGTBECCLkuB84M=w1600', 'Trip to Kenya', 'Community outdoor trip', 'Outdoor'),
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczPTCFe9BA72EdNHtR5hOXxkoQsL6B7EWKGzF4b6zmdlkqdeo6989v-Y0Yh0DUplufeSUFU9BwpR_9GlsXfjg3Oh1ZHXDNF9Hrxx40wGo5R83RtD8oay=w1600', 'Trip to Kenya', 'Community outdoor trip', 'Outdoor'),
(gen_random_uuid(), 'https://lh3.googleusercontent.com/pw/AP1GczO13QPoFpFncbSKGkdRZB8GDqNSS0FXCmZjSlv0RKe6GcNiYACIfngsmaPXWlZ_SjgMwWD0HKpeYvyMRLktewZoPPmmOiTu8NznSLVJmsxXHH4kfdSK=w1600', 'Trip to Kenya', 'Community outdoor trip', 'Outdoor');
