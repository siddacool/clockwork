const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const workboxPlugin = () => new GenerateSW({
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp('https://fonts.googleapis.com/css?family'),
      handler: 'cacheFirst',
    },
    {
      urlPattern: new RegExp('https://sid-maps-api.firebaseapp.com/mapdata'),
      handler: 'staleWhileRevalidate',
    },
  ],
});

const manifestPlugin = (name, title, description, themeColor, backgroundColor) => new WebpackPwaManifest({
  name: title,
  short_name: name,
  description,
  start_url: `/${name}/`,
  display: 'standalone',
  theme_color: themeColor,
  background_color: backgroundColor,
  icons: [
    {
      src: path.resolve('src/images/icon.png'),
      sizes: [96, 128, 192, 240],
    },
  ],
});

module.exports = {
  workboxPlugin,
  manifestPlugin,
};
