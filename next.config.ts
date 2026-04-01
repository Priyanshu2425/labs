import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    // Silence Sass @import deprecation warnings — existing module SCSS files
    // still use @import for variables/mixins. Migrating them to @use is a
    // separate clean-up step that's safe to do incrementally.
    silenceDeprecations: ['import', 'legacy-js-api'],
  },
};

export default nextConfig;
