import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Skies band below ~84, so allow a higher quality for the hero and closing images.
  images: { qualities: [75, 86] },
};

export default nextConfig;
