import type { NotePitch } from "@/resources/themes";

export type KeyDefinition = {
  id: string;
  code: string;
  label: string;
  pitchIndex: NotePitch;
  octave: number;
  isBlack: boolean;
};

export type PadDefinition = {
  id: string;
  code: string;
  label: string;
  semitone: number;
  pitchIndex: NotePitch;
};

const OCTAVE_START = 2;

const ALL_NOTES_CHROMATIC: Array<{ pitch: NotePitch; isBlack: boolean }> = [
  { pitch: 0, isBlack: false },
  { pitch: 1, isBlack: true },
  { pitch: 2, isBlack: false },
  { pitch: 3, isBlack: true },
  { pitch: 4, isBlack: false },
  { pitch: 5, isBlack: false },
  { pitch: 6, isBlack: true },
  { pitch: 7, isBlack: false },
  { pitch: 8, isBlack: true },
  { pitch: 9, isBlack: false },
  { pitch: 10, isBlack: true },
  { pitch: 11, isBlack: false },
];

// 4 octaves of keyboard input, organized by rows (bottom to top, left to right)
// Each row is one octave (12 semitones)
const KEYBOARD_CODES_BY_ROW = [
  // Row 1 - ZXCVBNM...
  [
    "IntlBackslash",
    "KeyZ",
    "KeyX",
    "KeyC",
    "KeyV",
    "KeyB",
    "KeyN",
    "KeyM",
    "Comma",
    "Period",
    "Slash",
    "ShiftRight",
  ],
  // Row 2 - ASDFGH...
  [
    "KeyA",
    "KeyS",
    "KeyD",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyJ",
    "KeyK",
    "KeyL",
    "Semicolon",
    "Quote",
    "Backslash",
  ],
  // Row 3 - QWERTY...
  [
    "KeyQ",
    "KeyW",
    "KeyE",
    "KeyR",
    "KeyT",
    "KeyY",
    "KeyU",
    "KeyI",
    "KeyO",
    "KeyP",
    "BracketLeft",
    "BracketRight",
  ],
  // Row 4 - 12345...
  [
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
  ],
  // Row 5 - Additional High C note
  ["Backspace"],
];

const KEYBOARD_CODES = KEYBOARD_CODES_BY_ROW.flat();

// Map key codes to readable labels
const KEY_LABELS: Record<string, string> = {
  IntlBackslash: "\\",
  KeyZ: "Z",
  KeyX: "X",
  KeyC: "C",
  KeyV: "V",
  KeyB: "B",
  KeyN: "N",
  KeyM: "M",
  Comma: ",",
  Period: ".",
  Slash: "/",
  ShiftRight: "⇧R",
  KeyA: "A",
  KeyS: "S",
  KeyD: "D",
  KeyF: "F",
  KeyG: "G",
  KeyH: "H",
  KeyJ: "J",
  KeyK: "K",
  KeyL: "L",
  Semicolon: ";",
  Quote: "'",
  Backslash: "\\",
  KeyQ: "Q",
  KeyW: "W",
  KeyE: "E",
  KeyR: "R",
  KeyT: "T",
  KeyY: "Y",
  KeyU: "U",
  KeyI: "I",
  KeyO: "O",
  KeyP: "P",
  BracketLeft: "[",
  BracketRight: "]",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "=",
  Backspace: "⌫",
};

export const KEYBOARD_KEYS: KeyDefinition[] = [];

// Generate 49 keys (4 octaves + 1 extra C note)
let keyIndex = 0;
for (let octave = OCTAVE_START; octave < OCTAVE_START + 4; octave++) {
  for (const note of ALL_NOTES_CHROMATIC) {
    const code = KEYBOARD_CODES[keyIndex];
    const label = KEY_LABELS[code] || code;

    KEYBOARD_KEYS.push({
      id: `${note.isBlack ? "black" : "white"}-${octave}-${note.pitch}`,
      code,
      label,
      pitchIndex: note.pitch,
      octave,
      isBlack: note.isBlack,
    });

    keyIndex++;
  }
}

// Additional High C note (Backspace key)
const topOctave = OCTAVE_START + 4;
KEYBOARD_KEYS.push({
  id: `white-${topOctave}-0`,
  code: "Backspace",
  label: "←",
  pitchIndex: 0, // C
  octave: topOctave,
  isBlack: false,
});

export const PADS: PadDefinition[] = [
  // Row 1 (top, left to right): 9, /, *, -, +
  { id: "pad-9", code: "Numpad9", label: "9", semitone: 10, pitchIndex: 10 },    // A#
  { id: "pad-divide", code: "NumpadDivide", label: "/", semitone: 11, pitchIndex: 11 },  // B
  { id: "pad-multiply", code: "NumpadMultiply", label: "*", semitone: 12, pitchIndex: 0 }, // C (+1 octave)
  { id: "pad-subtract", code: "NumpadSubtract", label: "-", semitone: -12, pitchIndex: 0 }, // C (-1 octave) - LOW C
  { id: "pad-add", code: "NumpadAdd", label: "+", semitone: 24, pitchIndex: 0 }, // C (+2 octaves) - HIGH C
  
  // Row 2 (middle, left to right): 4, 5, 6, 7, 8
  { id: "pad-4", code: "Numpad4", label: "4", semitone: 5, pitchIndex: 5 },     // F
  { id: "pad-5", code: "Numpad5", label: "5", semitone: 6, pitchIndex: 6 },     // F#
  { id: "pad-6", code: "Numpad6", label: "6", semitone: 7, pitchIndex: 7 },     // G
  { id: "pad-7", code: "Numpad7", label: "7", semitone: 8, pitchIndex: 8 },     // G#
  { id: "pad-8", code: "Numpad8", label: "8", semitone: 9, pitchIndex: 9 },     // A
  
  // Row 3 (bottom, left to right): 0, ., 1, 2, 3
  { id: "pad-0", code: "Numpad0", label: "0", semitone: 0, pitchIndex: 0 },     // C
  { id: "pad-decimal", code: "NumpadDecimal", label: ".", semitone: 1, pitchIndex: 1 },  // C#
  { id: "pad-1", code: "Numpad1", label: "1", semitone: 2, pitchIndex: 2 },     // D
  { id: "pad-2", code: "Numpad2", label: "2", semitone: 3, pitchIndex: 3 },     // D#
  { id: "pad-3", code: "Numpad3", label: "3", semitone: 4, pitchIndex: 4 },     // E
];
