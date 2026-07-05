import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://soul-community.org';

  const staticPages = [
    '',
    '/about',
    '/weekly-activities',
    '/events',
    '/gallery',
    '/announcements',
    '/resources',
    '/contact',
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const weeklyActivityPages = days.map((day) => `/weekly-activities/${day}`);

  const allPages = [...staticPages, ...weeklyActivityPages];

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));
}
