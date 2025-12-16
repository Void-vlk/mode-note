const MIN_GAIN = 0.0001;
const PAD_RELEASE_SECONDS = 0.3;

export type PianoVoice = {
  osc1: OscillatorNode;
  osc2: OscillatorNode;
  lfo: OscillatorNode;
  lfoDepth: GainNode;
  filter: BiquadFilterNode;
  amp: GainNode;
};

export type PadVoice = {
  oscLeft: OscillatorNode;
  oscRight: OscillatorNode;
  lowpass: BiquadFilterNode;
  gainNode: GainNode;
};

type CreateVoiceParams = {
  audioContext: AudioContext;
  masterGain: GainNode;
  frequencyHz: number;
  waveType?: OscillatorType;
  filterType?: BiquadFilterType;
  filterCutoff?: number;
  filterResonance?: number;
  attack?: number;
  decay?: number;
  sustain?: number;
  lfoRate?: number;
  lfoDepth?: number;
  detune?: number;
};

export const createPianoVoice = ({
  audioContext,
  masterGain,
  frequencyHz,
  waveType = "sawtooth",
  filterType = "lowpass",
  filterCutoff = 1200,
  filterResonance = 0.9,
  attack = 0.01,
  decay = 0.2,
  sustain = 0.35,
  lfoRate = 5,
  lfoDepth = 2,
  detune = 6,
}: CreateVoiceParams): PianoVoice => {
  const amp = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  filter.type = filterType;
  filter.Q.value = filterResonance;

  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();
  osc1.type = waveType;
  osc2.type = waveType;
  osc1.frequency.value = frequencyHz;
  osc2.frequency.value = frequencyHz;
  osc1.detune.value = -detune;
  osc2.detune.value = detune;

  const lfo = audioContext.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = lfoRate;
  const lfoDepthNode = audioContext.createGain();
  lfoDepthNode.gain.value = lfoDepth;
  lfo.connect(lfoDepthNode);
  lfoDepthNode.connect(osc1.frequency);
  lfoDepthNode.connect(osc2.frequency);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(amp);
  amp.connect(masterGain);

  const now = audioContext.currentTime;

  amp.gain.cancelScheduledValues(now);
  amp.gain.setValueAtTime(MIN_GAIN, now);
  amp.gain.exponentialRampToValueAtTime(0.9, now + attack);
  amp.gain.exponentialRampToValueAtTime(
    Math.max(MIN_GAIN, sustain),
    now + attack + decay
  );

  // Dynamic filter envelope based on user cutoff
  const baseCutoff = Math.max(180, filterCutoff * 0.5);
  const peakCutoff = Math.min(10000, filterCutoff * 1.5);
  const settleCutoff = filterCutoff;

  filter.frequency.cancelScheduledValues(now);
  filter.frequency.setValueAtTime(baseCutoff, now);
  filter.frequency.linearRampToValueAtTime(peakCutoff, now + attack * 0.5);
  filter.frequency.exponentialRampToValueAtTime(
    settleCutoff,
    now + attack + decay
  );

  osc1.start(now);
  osc2.start(now);
  lfo.start(now);

  return { osc1, osc2, lfo, lfoDepth: lfoDepthNode, filter, amp };
};

export const stopPianoVoice = (
  voice: PianoVoice,
  audioContext: AudioContext,
  releaseTime: number = 0.28
): void => {
  const now = audioContext.currentTime;

  voice.amp.gain.cancelScheduledValues(now);
  voice.amp.gain.setValueAtTime(Math.max(MIN_GAIN, voice.amp.gain.value), now);
  voice.amp.gain.exponentialRampToValueAtTime(MIN_GAIN, now + releaseTime);

  voice.filter.frequency.cancelScheduledValues(now);
  voice.filter.frequency.exponentialRampToValueAtTime(200, now + releaseTime);

  window.setTimeout(
    () => {
      try {
        voice.osc1.stop();
        voice.osc2.stop();
        voice.lfo.stop();
      } catch {}
      voice.osc1.disconnect();
      voice.osc2.disconnect();
      voice.lfo.disconnect();
      voice.lfoDepth.disconnect();
      voice.filter.disconnect();
      voice.amp.disconnect();
    },
    Math.ceil(releaseTime * 1000)
  );
}

export const createPadVoice = ({
  audioContext,
  masterGain,
  frequencyHz,
  waveType = "sine",
}: CreateVoiceParams): PadVoice =>{
  const oscLeft = audioContext.createOscillator();
  oscLeft.type = waveType;
  oscLeft.frequency.value = frequencyHz;

  const oscRight = audioContext.createOscillator();
  oscRight.type = waveType;
  oscRight.frequency.value = frequencyHz;
  oscRight.detune.value = 7;

  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 1200;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = MIN_GAIN;

  oscLeft.connect(lowpass);
  oscRight.connect(lowpass);
  lowpass.connect(gainNode);
  gainNode.connect(masterGain);

  const now = audioContext.currentTime;
  const attackTime = 0.6;
  const decayTime = 2.0;
  const sustainLevel = 0.5;

  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(MIN_GAIN, now);
  gainNode.gain.exponentialRampToValueAtTime(0.7, now + attackTime);
  gainNode.gain.exponentialRampToValueAtTime(
    sustainLevel,
    now + attackTime + decayTime
  );

  lowpass.frequency.cancelScheduledValues(now);
  lowpass.frequency.setValueAtTime(800, now);
  lowpass.frequency.linearRampToValueAtTime(1800, now + attackTime);

  oscLeft.start(now);
  oscRight.start(now);

  return { oscLeft, oscRight, lowpass, gainNode };
}

export const stopPadVoice = (
  voice: PadVoice,
  audioContext: AudioContext
): void =>{
  const now = audioContext.currentTime;

  voice.gainNode.gain.cancelScheduledValues(now);
  voice.gainNode.gain.setValueAtTime(
    Math.max(MIN_GAIN, voice.gainNode.gain.value),
    now
  );
  voice.gainNode.gain.exponentialRampToValueAtTime(
    MIN_GAIN,
    now + PAD_RELEASE_SECONDS
  );

  window.setTimeout(
    () => {
      try {
        voice.oscLeft.stop();
        voice.oscRight.stop();
      } catch {}
      voice.oscLeft.disconnect();
      voice.oscRight.disconnect();
      voice.lowpass.disconnect();
      voice.gainNode.disconnect();
    },
    Math.ceil(PAD_RELEASE_SECONDS * 1000)
  );
}
