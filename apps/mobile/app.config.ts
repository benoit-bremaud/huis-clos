import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Huis Clos',
  slug: 'huis-clos',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'app.huisclos.mobile'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'app.huisclos.mobile'
  },
  web: {
    favicon: './src/assets/favicon.png'
  },
  plugins: [
    'expo-router'
  ]
};

export default config;
