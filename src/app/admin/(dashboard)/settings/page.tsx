'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Globe, MessageCircle, Share2, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { createClient } from '@/lib/supabase/client';
import { getWebsiteSettings, saveWebsiteSettings } from '@/lib/services/settings';

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settingsId, setSettingsId] = useState<string | null>(null);

  const [general, setGeneral] = useState({
    heroHeadline: '',
    heroSubheadline: '',
    mission: '',
    vision: '',
    about: '',
  });

  const [contact, setContact] = useState({
    whatsappCommunity: '',
    whatsappChannel: '',
    email: '',
  });

  const [social, setSocial] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    tiktok: '',
    linkedin: '',
  });

  const [seo, setSeo] = useState({
    siteTitle: '',
    metaDescription: '',
    keywords: '',
  });

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    getWebsiteSettings(supabase)
      .then((data) => {
        if (!active || !data) return;
        setSettingsId(data.id);
        setGeneral({
          heroHeadline: data.hero_headline || '',
          heroSubheadline: data.hero_subheadline || '',
          mission: data.mission || '',
          vision: data.vision || '',
          about: data.about || '',
        });
        setContact({
          whatsappCommunity: data.whatsapp_community_link || '',
          whatsappChannel: data.whatsapp_channel_link || '',
          email: data.email || '',
        });
        setSocial({
          facebook: data.social_media?.facebook || '',
          instagram: data.social_media?.instagram || '',
          twitter: data.social_media?.twitter || '',
          youtube: data.social_media?.youtube || '',
          tiktok: data.social_media?.tiktok || '',
          linkedin: data.social_media?.linkedin || '',
        });
        setSeo({
          siteTitle: data.seo?.title || '',
          metaDescription: data.seo?.description || '',
          keywords: (data.seo?.keywords || []).join(', '),
        });
      })
      .catch(() => toast.error('Could not load settings'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const saved = await saveWebsiteSettings(supabase, settingsId, {
        hero_headline: general.heroHeadline,
        hero_subheadline: general.heroSubheadline,
        mission: general.mission,
        vision: general.vision,
        about: general.about,
        whatsapp_community_link: contact.whatsappCommunity,
        whatsapp_channel_link: contact.whatsappChannel,
        email: contact.email,
        social_media: {
          facebook: social.facebook,
          instagram: social.instagram,
          twitter: social.twitter,
          youtube: social.youtube,
          tiktok: social.tiktok,
          linkedin: social.linkedin,
        },
        seo: {
          title: seo.siteTitle,
          description: seo.metaDescription,
          keywords: seo.keywords
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean),
        },
      });
      setSettingsId(saved.id);
      toast.success('Settings saved successfully');
    } catch {
      toast.error('Could not save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D5A3D]/10">
                <Settings className="h-5 w-5 text-[#2D5A3D]" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-[#1E3D2A]">
                  Settings
                </h1>
                <p className="text-sm text-[#8B6B4A]">Manage your website settings</p>
              </div>
            </div>
            <Button
              className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white"
              onClick={handleSave}
              disabled={saving || loading}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-[#2D5A3D]" />
          </div>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-[#F5F0E8] bg-white p-6">
            <Tabs defaultValue="general">
              <TabsList className="mb-6 w-full justify-start gap-1 bg-[#F5F0E8] p-1">
                <TabsTrigger value="general" className="gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  General
                </TabsTrigger>
                <TabsTrigger value="contact" className="gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="social" className="gap-1.5">
                  <Share2 className="h-3.5 w-3.5" />
                  Social Media
                </TabsTrigger>
                <TabsTrigger value="seo" className="gap-1.5">
                  <Search className="h-3.5 w-3.5" />
                  SEO
                </TabsTrigger>
              </TabsList>

              {/* General */}
              <TabsContent value="general">
                <div className="space-y-5">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Hero Headline
                    </label>
                    <Input
                      value={general.heroHeadline}
                      onChange={(e) =>
                        setGeneral({ ...general, heroHeadline: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Hero Subheadline
                    </label>
                    <Input
                      value={general.heroSubheadline}
                      onChange={(e) =>
                        setGeneral({ ...general, heroSubheadline: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Mission
                    </label>
                    <Textarea
                      rows={3}
                      value={general.mission}
                      onChange={(e) =>
                        setGeneral({ ...general, mission: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Vision
                    </label>
                    <Textarea
                      rows={3}
                      value={general.vision}
                      onChange={(e) =>
                        setGeneral({ ...general, vision: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      About
                    </label>
                    <Textarea
                      rows={4}
                      value={general.about}
                      onChange={(e) =>
                        setGeneral({ ...general, about: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Contact */}
              <TabsContent value="contact">
                <div className="space-y-5">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      WhatsApp Community Link
                    </label>
                    <Input
                      value={contact.whatsappCommunity}
                      onChange={(e) =>
                        setContact({ ...contact, whatsappCommunity: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      WhatsApp Channel Link
                    </label>
                    <Input
                      value={contact.whatsappChannel}
                      onChange={(e) =>
                        setContact({ ...contact, whatsappChannel: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Social Media */}
              <TabsContent value="social">
                <div className="space-y-5">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Facebook URL
                    </label>
                    <Input
                      value={social.facebook}
                      onChange={(e) =>
                        setSocial({ ...social, facebook: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Instagram URL
                    </label>
                    <Input
                      value={social.instagram}
                      onChange={(e) =>
                        setSocial({ ...social, instagram: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Twitter / X URL
                    </label>
                    <Input
                      value={social.twitter}
                      onChange={(e) =>
                        setSocial({ ...social, twitter: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      YouTube URL
                    </label>
                    <Input
                      value={social.youtube}
                      onChange={(e) =>
                        setSocial({ ...social, youtube: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      TikTok URL
                    </label>
                    <Input
                      value={social.tiktok}
                      onChange={(e) =>
                        setSocial({ ...social, tiktok: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      LinkedIn URL
                    </label>
                    <Input
                      value={social.linkedin}
                      onChange={(e) =>
                        setSocial({ ...social, linkedin: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <p className="text-xs text-[#8B6B4A]">
                    Leave any of these blank to hide that icon everywhere on the
                    public site - only platforms you fill in here will show up.
                  </p>
                </div>
              </TabsContent>

              {/* SEO */}
              <TabsContent value="seo">
                <div className="space-y-5">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Site Title
                    </label>
                    <Input
                      value={seo.siteTitle}
                      onChange={(e) =>
                        setSeo({ ...seo, siteTitle: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Meta Description
                    </label>
                    <Textarea
                      rows={3}
                      value={seo.metaDescription}
                      onChange={(e) =>
                        setSeo({ ...seo, metaDescription: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                      Keywords
                    </label>
                    <Input
                      value={seo.keywords}
                      onChange={(e) =>
                        setSeo({ ...seo, keywords: e.target.value })
                      }
                      className="border-[#F5F0E8] bg-[#FFFBF5]"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
        )}
      </div>
    </div>
  );
}
