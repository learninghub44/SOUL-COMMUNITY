export const WEEKLY_ACTIVITIES = [
  {
    day: 'monday',
    title: 'Mental Health Monday',
    shortTitle: 'Mental Health',
    description: 'Start your week with mental wellness. Join us for guided discussions, meditation sessions, and mental health awareness activities.',
    color: '#2D5A3D',
    icon: 'Brain',
    emoji: '🧠',
  },
  {
    day: 'tuesday',
    title: 'Opportunity Tuesday',
    shortTitle: 'Opportunities',
    description: 'Discover new opportunities! From jobs to business prospects, we share and discuss opportunities that can transform your life.',
    color: '#C8A84E',
    icon: 'Lightbulb',
    emoji: '💡',
  },
  {
    day: 'wednesday',
    title: 'Wisdom Wednesday',
    shortTitle: 'Wisdom',
    description: 'Gain wisdom through shared knowledge. Expert talks, book reviews, and life lessons from experienced community members.',
    color: '#8B6B4A',
    icon: 'BookOpen',
    emoji: '📚',
  },
  {
    day: 'thursday',
    title: 'Thrive & Promote Thursday',
    shortTitle: 'Thrive & Promote',
    description: 'Promote your business and thrive together. Share your products, services, and business achievements with the community.',
    color: '#A67C52',
    icon: 'TrendingUp',
    emoji: '📈',
  },
  {
    day: 'friday',
    title: 'Soul Sync Friday',
    shortTitle: 'Soul Sync',
    description: 'Connect with your soul. Reflect on the week, share gratitude, and engage in meaningful conversations that nurture the spirit.',
    color: '#5C8A6B',
    icon: 'Heart',
    emoji: '💚',
  },
  {
    day: 'saturday',
    title: 'Outdoor Experience Saturday',
    shortTitle: 'Outdoor Experience',
    description: 'Get outside and explore! Hikes, nature walks, adventure trips, and outdoor activities to reconnect with nature.',
    color: '#2D5A3D',
    icon: 'Mountain',
    emoji: '⛰️',
  },
  {
    day: 'sunday',
    title: 'Self Reset Sunday',
    shortTitle: 'Self Reset',
    description: 'Rest, recharge, and reset. Self-care activities, relaxation tips, and preparation for the week ahead.',
    color: '#C8A84E',
    icon: 'Sun',
    emoji: '🌅',
  },
];

export const RESOURCE_CATEGORIES = [
  { value: 'jobs', label: 'Jobs', icon: 'Briefcase' },
  { value: 'scholarships', label: 'Scholarships', icon: 'GraduationCap' },
  { value: 'learning', label: 'Learning', icon: 'BookOpen' },
  { value: 'mental_health', label: 'Mental Health', icon: 'Brain' },
  { value: 'career', label: 'Career Advice', icon: 'Compass' },
  { value: 'volunteer', label: 'Volunteer Opportunities', icon: 'HandHeart' },
] as const;

export const GALLERY_CATEGORIES = [
  'Events',
  'Outdoor',
  'Community',
  'Meetups',
  'Celebrations',
  'Mental Health Sessions',
];

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/weekly-activities', label: 'Weekly Activities' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export const MOBILE_NAV_LINKS = [
  { href: '/', label: 'Home', icon: 'Home' },
  { href: '/events', label: 'Events', icon: 'Calendar' },
  { href: '/gallery', label: 'Gallery', icon: 'Image' },
  { href: '/announcements', label: 'News', icon: 'Megaphone' },
  { href: '/contact', label: 'Contact', icon: 'Phone' },
];

export const SITE_CONFIG = {
  name: 'SOUL – Serving Opportunities, Uplifting Lives',
  tagline: 'Serving Opportunities, Uplifting Lives',
  description: 'SOUL is a vibrant community dedicated to mental wellness, networking, opportunities, business promotion, outdoor experiences, learning, volunteering, and meaningful friendships.',
  url: 'https://soul-community.org',
  ogImage: '/og-image.png',
  whatsappCommunityLink: '#',
  whatsappChannelLink: '#',
  email: 'info@soul-community.org',
  phone: '+254 700 000 000',
};
