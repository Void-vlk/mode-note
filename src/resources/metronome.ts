export type Beat = 2 | 3 | 4 | 5 | 6 | 7 | 9 | 11 | 13 | 15;
export type Bar = 4 | 8;

export enum TimeSig {
  TwoFour = "2/4",
  ThreeFour = "3/4",
  FourFour = "4/4",
  FiveFour = "5/4",
  SixFour = "6/4",
  SevenFour = "7/4",
  ThreeEight = "3/8",
  FiveEight = "5/8",
  SixEight = "6/8",
  SevenEight = "7/8",
  NineEight = "9/8",
  ElevenEight = "11/8",
  ThirteenEight = "13/8",
  FifteenEight = "15/8",
}

export type TimeSignature = {
  beat: Beat;
  bar: Bar;
};

export const TIME_SIGNATURES: Record<TimeSig, TimeSignature> = {
  [TimeSig.TwoFour]: { beat: 2, bar: 4 },
  [TimeSig.ThreeFour]: { beat: 3, bar: 4 },
  [TimeSig.FourFour]: { beat: 4, bar: 4 },
  [TimeSig.FiveFour]: { beat: 5, bar: 4 },
  [TimeSig.SixFour]: { beat: 6, bar: 4 },
  [TimeSig.SevenFour]: { beat: 7, bar: 4 },
  [TimeSig.ThreeEight]: { beat: 3, bar: 8 },
  [TimeSig.FiveEight]: { beat: 5, bar: 8 },
  [TimeSig.SixEight]: { beat: 6, bar: 8 },
  [TimeSig.SevenEight]: { beat: 7, bar: 8 },
  [TimeSig.NineEight]: { beat: 9, bar: 8 },
  [TimeSig.ElevenEight]: { beat: 11, bar: 8 },
  [TimeSig.ThirteenEight]: { beat: 13, bar: 8 },
  [TimeSig.FifteenEight]: { beat: 15, bar: 8 },
};

export enum Sound {
  Click = "click",
  Clap = "clap",
  Snap = "snap",
  Block = "block",
  Drum = "drum",
  Cymbal = "cymbal",
  Bell = "bell",
  Beep = "beep",
}

export type MetronomeSound = {
  label: string;
  file: string;
  fileAccent?: string;
};

export const METRONOME_SOUNDS: Record<Sound, MetronomeSound> = {
  [Sound.Clap]: {
    label: "Clap",
    file: "/sounds/Perc_Clap_lo.wav", // Perc_Tongue_lo
    fileAccent: "/sounds/Perc_Clap_hi.wav",
  },
  [Sound.Click]: {
    label: "Click",
    file: "/sounds/Perc_Clackhead_lo.wav",
    fileAccent: "/sounds/Perc_Clackhead_hi.wav",
  },
  [Sound.Snap]: {
    label: "Snap",
    file: "/sounds/Perc_Snap_lo.wav",
    fileAccent: "/sounds/Perc_Snap_hi.wav",
  },
  [Sound.Block]: {
    label: "Block",
    file: "/sounds/Perc_Castanet_lo.wav",
    fileAccent: "/sounds/Perc_Castanet_hi.wav",
  },
  [Sound.Drum]: {
    label: "Drum",
    file: "/sounds/Perc_PracticePad_lo.wav",
    fileAccent: "/sounds/Perc_PracticePad_hi.wav",
  },
  [Sound.Cymbal]: {
    label: "Cymbal",
    file: "/sounds/Perc_Tamb_A_hi.wav",
    fileAccent: "/sounds/Perc_Tamb_A_lo.wav",
  },
  [Sound.Bell]: {
    label: "Bell",
    file: "/sounds/Synth_Bell_A_lo.wav",
    fileAccent: "/sounds/Synth_Bell_A_hi.wav",
  },
  [Sound.Beep]: {
    label: "Beep",
    file: "/sounds/Synth_Square_D_lo.wav",
    fileAccent: "/sounds/Synth_Square_D_hi.wav",
  },
};

  // file: "/sounds/Perc_Stick_lo.wav",
    // fileAccent: "/sounds/Perc_Stick_hi.wav",

    //file: "/sounds/Synth_Block_D_lo.wav",
   // fileAccent: "/sounds/Synth_Block_D_hi.wav",