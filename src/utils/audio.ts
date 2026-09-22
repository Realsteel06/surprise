/**
 * Web Audio API synthesizer for romantic ambient sounds and effects
 * Pure client-side synthesis: zero external audio assets or network dependencies
 */

class RomanticAudioController {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Delicate paper rustle and warm chime when the envelope opens
   */
  public playOpenEnvelopeSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;

      // Chord notes: F4, A4, C5, E5, G5 (Fmaj9 chord - deeply warm & heartfelt)
      const frequencies = [349.23, 440.0, 523.25, 659.25, 783.99];

      frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        // Soft bell-like envelope
        const noteStart = now + idx * 0.08;
        noteGain.gain.setValueAtTime(0, noteStart);
        noteGain.gain.linearRampToValueAtTime(0.18, noteStart + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 2.2);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(noteStart);
        osc.stop(noteStart + 2.3);
      });
    } catch {
      // Ignore if autoplay policy blocks audio before gesture
    }
  }

  /**
   * Sweet soft twinkle when interacting with choices or hearts
   */
  public playSparkleSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 1046.5]; // C5, E5, C6

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        const noteStart = now + idx * 0.06;
        noteGain.gain.setValueAtTime(0, noteStart);
        noteGain.gain.linearRampToValueAtTime(0.12, noteStart + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.8);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(noteStart);
        osc.stop(noteStart + 0.9);
      });
    } catch {
      // Silently catch
    }
  }

  /**
   * Gentle ambient melody toggle
   */
  public toggleMusic(onStateChange?: (playing: boolean) => void): boolean {
    this.initContext();
    if (this.isMusicPlaying) {
      this.stopMusic();
      onStateChange?.(false);
      return false;
    } else {
      this.startMusic();
      onStateChange?.(true);
      return true;
    }
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  private startMusic() {
    if (!this.ctx || !this.masterGain) return;
    this.isMusicPlaying = true;

    // Peaceful lullaby arpeggio loop (D minor, F major, C major, G minor romantic progression)
    const chords = [
      [349.23, 440.0, 523.25, 659.25], // Fmaj7
      [392.0, 493.88, 587.33, 783.99], // G
      [329.63, 392.0, 493.88, 659.25], // Em7
      [261.63, 329.63, 392.0, 523.25], // C
    ];

    let chordIndex = 0;
    let step = 0;

    const playStep = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.masterGain) return;

      const currentChord = chords[chordIndex];
      const freq = currentChord[step % currentChord.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.9);

      step++;
      if (step >= currentChord.length * 2) {
        step = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }
    };

    playStep();
    this.musicInterval = window.setInterval(playStep, 650);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const romanticAudio = new RomanticAudioController();
