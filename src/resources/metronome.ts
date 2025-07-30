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
  id: string;
  beat: Beat;
  bar: Bar;
};

export const TIME_SIGNATURES: Record<TimeSig, TimeSignature> = {
  [TimeSig.TwoFour]: { id: "2/4", beat: 2, bar: 4 },
  [TimeSig.ThreeFour]: { id: "3/4", beat: 3, bar: 4 },
  [TimeSig.FourFour]: { id: "4/4", beat: 4, bar: 4 },
  [TimeSig.FiveFour]: { id: "5/4", beat: 5, bar: 4 },
  [TimeSig.SixFour]: { id: "6/4", beat: 6, bar: 4 },
  [TimeSig.SevenFour]: { id: "7/4", beat: 7, bar: 4 },
  [TimeSig.ThreeEight]: { id: "3/8", beat: 3, bar: 8 },
  [TimeSig.FiveEight]: { id: "5/8", beat: 5, bar: 8 },
  [TimeSig.SixEight]: { id: "6/8", beat: 6, bar: 8 },
  [TimeSig.SevenEight]: { id: "7/8", beat: 7, bar: 8 },
  [TimeSig.NineEight]: { id: "9/8", beat: 9, bar: 8 },
  [TimeSig.ElevenEight]: { id: "11/8", beat: 11, bar: 8 },
  [TimeSig.ThirteenEight]: { id: "13/8", beat: 13, bar: 8 },
  [TimeSig.FifteenEight]: { id: "15/8", beat: 15, bar: 8 },
};

export enum Sound {
  Click = "click",
  Block = "block",
  Drum = "drum",
  Cymbal = "cymbal",
}

export type MetronomeSound = {
  id: string;
  label: string;
  file: string;
  fileAccent?: string;
};

export const METRONOME_SOUNDS: Record<Sound, MetronomeSound> = {
  [Sound.Click]: {
    id: "click",
    label: "Click",
    file: "/sounds/click.wav",
    fileAccent: "/sounds/click-accent.wav",
  },
  [Sound.Block]: {
    id: "block",
    label: "Block",
    file: "/sounds/block.wav",
    fileAccent: "/sounds/block-accent.wav",
  },
  [Sound.Drum]: {
    id: "drum",
    label: "Drum",
    file: "/sounds/drum.wav",
    fileAccent: "/sounds/drum-accent.wav",
  },
  [Sound.Cymbal]: {
    id: "cymbal",
    label: "Cymbal",
    file: "/sounds/cymbal.wav",
    fileAccent: "/sounds/cymbal-accent.wav",
  },
};
