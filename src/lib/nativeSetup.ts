import { Capacitor } from '@capacitor/core';

/** Initialise les plugins natifs (status bar, splash screen) sur iOS/Android. No-op sur le web. */
export async function initNativeApp() {
  if (!Capacitor.isNativePlatform()) return;

  const [{ StatusBar, Style }, { SplashScreen }] = await Promise.all([
    import('@capacitor/status-bar'),
    import('@capacitor/splash-screen'),
  ]);

  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0A0E1F' });
  } catch {
    // no-op : StatusBar.setBackgroundColor n'est pas supporté sur iOS, c'est attendu
  }

  await SplashScreen.hide();
}
