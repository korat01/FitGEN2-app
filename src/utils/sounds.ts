// Système de sons pour l'application — synthèse directe (oscillateurs + enveloppes), pas de buffers
// pré-calculés à la main : ça évite le "pop" audible au démarrage de chaque son (attaque à 0 au lieu
// d'un saut brutal à pleine amplitude) et permet des accords/arpèges au lieu d'un simple bip plat.
export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private constructor() {
    this.initAudioContext();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.28;
      this.masterGain.connect(this.audioContext.destination);
    } catch (error) {
      console.log('Audio context not supported');
    }
  }

  // Les navigateurs suspendent l'AudioContext tant qu'aucun geste utilisateur n'a eu lieu :
  // sans ça, les tout premiers sons (souvent juste après le chargement) ne jouaient jamais.
  private ensureRunning() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
  }

  // Une note = un oscillateur + une enveloppe attaque/déclin douce (jamais un saut brutal de gain,
  // source du "clic" désagréable qu'on entendait sur chaque son).
  private playTone(frequency: number, startOffset: number, duration: number, type: OscillatorType, peak: number) {
    if (!this.audioContext || !this.masterGain) return;
    const ctx = this.audioContext;
    const start = ctx.currentTime + startOffset;

    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(peak, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  }

  public playClick() {
    this.ensureRunning();
    this.playTone(720, 0, 0.06, 'sine', 0.5);
  }

  public playHover() {
    this.ensureRunning();
    this.playTone(900, 0, 0.035, 'sine', 0.22);
  }

  // Petit arpège majeur ascendant et chaleureux (Do5 - Mi5 - Sol5 - Do6) — se sent comme une
  // vraie récompense plutôt qu'un bip d'ordinateur.
  public playSuccess() {
    this.ensureRunning();
    this.playTone(523.25, 0, 0.22, 'sine', 0.6);
    this.playTone(659.25, 0.07, 0.22, 'sine', 0.6);
    this.playTone(783.99, 0.14, 0.26, 'sine', 0.55);
    this.playTone(1046.5, 0.21, 0.32, 'triangle', 0.5);
  }

  // Deux notes graves et descendantes, en triangle (doux) plutôt qu'en sawtooth (agressif/strident) :
  // ça signale clairement l'échec sans être désagréable à répétition.
  public playError() {
    this.ensureRunning();
    this.playTone(233.08, 0, 0.16, 'triangle', 0.5);
    this.playTone(185.0, 0.1, 0.26, 'triangle', 0.42);
  }

  // Montée à 3 notes plus brillante que le succès simple — réservée aux moments notables (level up).
  public playNotification() {
    this.ensureRunning();
    this.playTone(659.25, 0, 0.15, 'sine', 0.5);
    this.playTone(783.99, 0.09, 0.15, 'sine', 0.5);
    this.playTone(1046.5, 0.18, 0.3, 'sine', 0.55);
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
