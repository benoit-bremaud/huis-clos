import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Velia',
  slug: 'velia',
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
    bundleIdentifier: 'com.velia.app'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.velia.app'
  },
  web: {
    favicon: './src/assets/favicon.png'
  },
  plugins: [
    'expo-router'
  ]
};

export default config;
