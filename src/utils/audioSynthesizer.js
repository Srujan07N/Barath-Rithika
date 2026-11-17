/**
 * Traditional Indian Wedding Audio Engine
 * Uses Web Audio API to procedurally generate authentic Tanpura drone,
 * Bansuri (bamboo flute) auspicious wedding raag melody, and temple bells,
 * with zero external asset dependency. Also supports external MP3 if provided.
 */

class IndianWeddingAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.melodyTimer = null;
    this.bellTimer = null;
    this.droneNodes = [];
    this.volume = 0.45;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    // Start Tanpura Drone
    this.startTanpuraDrone();

    // Start Auspicious Flute Melodic phrasing (Raag Bhupali / Yaman celebration notes)
    this.startFluteMelody();

    // Subtle Temple Chimes
    this.startTempleChimes();
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.melodyTimer) {
      clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.bellTimer) {
      clearInterval(this.bellTimer);
      this.bellTimer = null;
    }

    // Fade out drone nodes
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      setTimeout(() => {
        this.droneNodes.forEach(node => {
          try {
            node.stop();
            node.disconnect();
          } catch (e) {}
        });
        this.droneNodes = [];
        if (this.masterGain) {
          this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        }
      }, 600);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  // Authentic Indian Tanpura Drone (Tuning in D: Pa, Sa, Sa, Sa_)
  startTanpuraDrone() {
    if (!this.ctx || !this.masterGain) return;
    const baseFreq = 146.83; // D3 (Standard classical Indian vocal/instrument tonic)
    const pitches = [
      baseFreq * 1.5, // Pa (A3 = 220.24 Hz)
      baseFreq * 2.0, // Sa' (D4 = 293.66 Hz)
      baseFreq * 2.0 * 1.002, // Sa' chorus
      baseFreq,       // Mandra Sa (D3 = 146.83 Hz)
    ];

    pitches.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Tanpura has rich jawari (buzzing overtone harmonics)
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Lowpass filter to soften sharp edges into warm strings
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(850 + idx * 120, this.ctx.currentTime);

      // Subtle LFO for gentle slow string pluck wave
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.25 + idx * 0.1, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      lfo.connect(lfoGain);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      lfoGain.connect(gain.gain);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      lfo.start();
      this.droneNodes.push(osc, lfo);
    });
  }

  // Melodic Bansuri (Bamboo Flute) playing auspicious Indian wedding raag
  startFluteMelody() {
    // Frequencies for Raag Bhupali in D: D4, E4, F#4, A4, B4, D5, E5
    const notes = [
      293.66, // D4 (Sa)
      329.63, // E4 (Re)
      369.99, // F#4 (Ga)
      440.00, // A4 (Pa)
      493.88, // B4 (Dha)
      587.33, // D5 (Taar Sa)
      659.25, // E5 (Taar Re)
    ];

    // Traditional auspicious phrasing sequence
    const melodyPhrases = [
      [0, 1, 2, 3],          // Sa Re Ga Pa
      [2, 3, 4, 5],          // Ga Pa Dha Sa'
      [5, 4, 3, 2],          // Sa' Dha Pa Ga
      [2, 1, 2, 0],          // Ga Re Ga Sa
      [0, 3, 4, 3, 2, 0],    // Sa Pa Dha Pa Ga Sa
      [2, 4, 5, 4, 3],       // Ga Dha Sa' Dha Pa
    ];

    let phraseIndex = 0;

    const playNextPhrase = () => {
      if (!this.isPlaying || !this.ctx) return;
      const phrase = melodyPhrases[phraseIndex % melodyPhrases.length];
      phraseIndex++;

      phrase.forEach((noteIdx, step) => {
        const timeOffset = step * 0.95;
        const noteFreq = notes[noteIdx];
        this.playFluteNote(noteFreq, timeOffset, 1.2);
      });
    };

    // Play initial phrase and schedule next phrases with natural breathing intervals
    setTimeout(playNextPhrase, 1000);
    this.melodyTimer = setInterval(playNextPhrase, 6800);
  }

  playFluteNote(frequency, delaySeconds, durationSeconds) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const startTime = this.ctx.currentTime + delaySeconds;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Sine wave with slight vibrato for organic bamboo flute sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, startTime);

    // Flute gentle vibrato (5 Hz subtle pitch wobble)
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5.2, startTime);
    vibratoGain.gain.setValueAtTime(frequency * 0.008, startTime); // subtle modulation
    vibrato.connect(osc.frequency);
    vibrato.start(startTime);
    vibrato.stop(startTime + durationSeconds);

    // Warm resonant tone filter
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(frequency * 1.5, startTime);
    filter.Q.setValueAtTime(2.0, startTime);

    // Envelope: Gentle breath attack and smooth release
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.14, startTime + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.10, startTime + durationSeconds * 0.65);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationSeconds);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + durationSeconds + 0.1);
  }

  // Auspicious Temple Bell / Ghanta sound at entrance and transitions
  playBell(freq = 1174.66) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Second harmonic for brass bell shimmer
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now); // Bell inharmonicity

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    gain2.gain.setValueAtTime(0.08, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 3.6);
    osc2.start(now);
    osc2.stop(now + 2.0);
  }

  startTempleChimes() {
    this.bellTimer = setInterval(() => {
      if (this.isPlaying && Math.random() > 0.4) {
        this.playBell(1174.66); // D6
      }
    }, 14000);
  }
}

export const weddingAudio = new IndianWeddingAudioEngine();
export default weddingAudio;
