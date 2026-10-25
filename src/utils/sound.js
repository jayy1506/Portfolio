// Global audio state for web shooter sounds
let isAudioMuted = false;

export function getAudioMuted() {
  return isAudioMuted;
}

export function setAudioMuted(val) {
  isAudioMuted = val;
  try {
    localStorage.setItem('spider_portfolio_muted', val ? '1' : '0');
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('audio-mute-changed', { detail: val }));
}

// Initialize from localStorage if present
try {
  const saved = localStorage.getItem('spider_portfolio_muted');
  if (saved !== null) {
    isAudioMuted = saved === '1';
  }
} catch (e) {}

export function playWebThwipSound() {
  if (isAudioMuted) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Noise buffer for silk friction
    const bufferSize = ctx.sampleRate * 0.1; // 100ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Resonant bandpass filter sweeping down (thwip pitch drop)
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 3.5;
    filter.frequency.setValueAtTime(3200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.09);

    // Gain envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Autoplay policy or unsupported audio gracefully handled
  }
}
