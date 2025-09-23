// Système de sons pour l'application
export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();

  private constructor() {
    this.initAudioContext();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private async initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await this.createSounds();
    } catch (error) {
      console.log('Audio context not supported');
    }
  }

  private async createSounds() {
    if (!this.audioContext) return;

    // Son de clic
    const clickBuffer = this.createToneBuffer(800, 0.1, 'sine');
    this.sounds.set('click', clickBuffer);

    // Son de succès
    const successBuffer = this.createToneBuffer(1200, 0.3, 'sine');
    this.sounds.set('success', successBuffer);

    // Son d'erreur
    const errorBuffer = this.createToneBuffer(400, 0.2, 'sawtooth');
    this.sounds.set('error', errorBuffer);

    // Son de notification
    const notificationBuffer = this.createToneBuffer(1000, 0.15, 'triangle');
    this.sounds.set('notification', notificationBuffer);

    // Son de hover
    const hoverBuffer = this.createToneBuffer(600, 0.05, 'sine');
    this.sounds.set('hover', hoverBuffer);
  }

  private createToneBuffer(frequency: number, duration: number, type: OscillatorType): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not initialized');

    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (type) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'triangle':
          sample = 2 * Math.abs(2 * (frequency * t - Math.floor(frequency * t + 0.5))) - 1;
          break;
        case 'sawtooth':
          sample = 2 * (frequency * t - Math.floor(frequency * t + 0.5));
          break;
      }

      // Envelope pour éviter les clics
      const envelope = Math.exp(-t * 3);
      data[i] = sample * envelope * 0.3;
    }

    return buffer;
  }

  public playSound(soundName: string) {
    if (!this.audioContext || !this.sounds.has(soundName)) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = this.sounds.get(soundName)!;
    source.connect(this.audioContext.destination);
    source.start();
  }

  public playClick() {
    this.playSound('click');
  }

  public playSuccess() {
    this.playSound('success');
  }

  public playError() {
    this.playSound('error');
  }

  public playNotification() {
    this.playSound('notification');
  }

  public playHover() {
    this.playSound('hover');
  }
}

// Hook pour utiliser les sons
export const useSounds = () => {
  const soundManager = SoundManager.getInstance();

  return {
    playClick: () => soundManager.playClick(),
    playSuccess: () => soundManager.playSuccess(),
    playError: () => soundManager.playError(),
    playNotification: () => soundManager.playNotification(),
    playHover: () => soundManager.playHover(),
  };
}; 