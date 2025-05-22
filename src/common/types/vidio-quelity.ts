import { VideoQuality } from '@prisma/client';
export const qualityMap: Record<string, VideoQuality> = {
  '240p': 'P240',
  '360p': 'P360',
  '480p': 'P480',
  '720p': 'P720',
  '1080p': 'P1080',
  '4k': 'P4K',
};
