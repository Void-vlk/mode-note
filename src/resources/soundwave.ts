export enum SoundWave {
  Sawtooth = "sawtooth",
  Sine = "sine",
  Square = "square",
  Triangle = "triangle",
}

export enum FilterType {
  Lowpass = "lowpass",
  Highpass = "highpass",
  Bandpass = "bandpass",
  Notch = "notch",
}

// Use Web Audio API types for actual audio functions
export type WaveType = `${SoundWave}`;
