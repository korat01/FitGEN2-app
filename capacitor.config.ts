import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitgen222.app',
  appName: 'FitGEN',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
    backgroundColor: '#0A0E1F',
  },
  plugins: {
    SplashScreen: {
      backgroundColor: '#0A0E1F',
      showSpinner: false,
      launchAutoHide: true,
      androidSplashResourceName: 'splash',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0A0E1F',
      overlaysWebView: false,
    },
    Keyboard: {
      resize: 'body',
    },
  },
};

export default config;
