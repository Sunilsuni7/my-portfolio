// Web Audio API Synthesizer for futuristic ambient sound and UI feedback
class AmbientAudioController {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.osc1 = null;
    this.osc2 = null;
    this.filter = null;
    this.lfo = null;
    this.lfoGain = null;
    this.isPlaying = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(2.0, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // LFO for slow ambient sweep
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(90, this.ctx.currentTime);
    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filter.frequency);
    this.lfo.start();

    // Ambient Drone Oscillator 1 (Warm Root)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
    this.osc1.connect(this.filter);
    this.osc1.start();

    // Ambient Drone Oscillator 2 (Subtle Fifth harmonic)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 harmonic
    
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    this.osc2.connect(osc2Gain);
    osc2Gain.connect(this.filter);
    this.osc2.start();
  }

  playUiClick(tone = 'up') {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      if (tone === 'up') {
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(1180, now + 0.08);
      } else {
        osc.frequency.setValueAtTime(1180, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);
      }

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore audio glitches safely
    }
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    if (this.isPlaying) {
      // Fade out
      this.playUiClick('down');
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
      this.isPlaying = false;
    } else {
      // Fade in to gentle ambient level (around 0.045)
      this.playUiClick('up');
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0, now);
      this.masterGain.gain.linearRampToValueAtTime(0.045, now + 0.5);
      this.isPlaying = true;
    }

    return this.isPlaying;
  }

  destroy() {
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {
        // ignore
      }
      this.ctx = null;
      this.isPlaying = false;
    }
  }
}

export const ambientAudio = new AmbientAudioController();
