import { SCALES, Scales } from "@/resources/scales";
import type { NotePitch } from "@/resources/themes";

export const MODE_ROTATION_INDEX: Partial<Record<Scales, number>> = {
  [Scales.Major]: 0,
  [Scales.Ionian]: 0,
  [Scales.Dorian]: 1,
  [Scales.Phrygian]: 2,
  [Scales.Lydian]: 3,
  [Scales.Mixolydian]: 4,
  [Scales.Minor]: 5,
  [Scales.Aeolian]: 5,
  [Scales.Locrian]: 6,
};

export type ModeName = (typeof MODE_NAMES)[number];
export const MODE_NAMES = [
  "Ionian", // rotation 0
  "Dorian", // rotation 1
  "Phrygian", // rotation 2
  "Lydian", // rotation 3
  "Mixolydian", // rotation 4
  "Aeolian", // rotation 5
  "Locrian", // rotation 6
] as const;

export const EQUIVALENT_SCALE_IDS: Partial<Record<Scales, Scales>> = {
  [Scales.Major]: Scales.Ionian,
  [Scales.Ionian]: Scales.Major,
  [Scales.Minor]: Scales.Aeolian,
  [Scales.Aeolian]: Scales.Minor,
};

export type StepSymbol = "W" | "H" | "WH" | "WW" | "WWH";
const GAP_STEP: Record<number, Exclude<StepSymbol, "WWH">> = {
  1: "H", // half step
  2: "W", // whole step
  3: "WH", // 3 half steps
  4: "WW", // 2 whole steps
};

export const getStepsFromPattern = (
  pitchClassPattern: number[]
): StepSymbol[] => {
  const patternWithOctave = [...pitchClassPattern, 12];

  return patternWithOctave.slice(1).map((v, i) => {
    const gap = v - patternWithOctave[i];
    return gap >= 5 ? "WWH" : GAP_STEP[gap as 1 | 2 | 3 | 4];
  });
};

// Rotate a pattern to generate a mode. Returns the new pattern (re-normalized to 0) and the semitone offset of the modal tonic relative to the original tonic.
export const rotatePatternForMode = (
  pitchClassPattern: number[],
  rotationIndex: number
) => {
  const rotation = pitchClassPattern.length;
  const normalizedIndex = ((rotationIndex % rotation) + rotation) % rotation;
  const modalTonicOffset = pitchClassPattern[normalizedIndex]; // in semitones from the original tonic

  const rotatedPattern = [
    ...pitchClassPattern.slice(normalizedIndex),
    ...pitchClassPattern.slice(0, normalizedIndex),
  ]
    .map((value) => (value - modalTonicOffset + 12) % 12)
    .sort((a, b) => a - b);

  return {
    rotatedPattern,
    modalTonicOffset: (modalTonicOffset % 12) as NotePitch,
  };
};

export type ModeEntry = {
  modeName: ModeName;
  rotationIndex: number; // 0-6 (0: Ionian, 6: Locrian)
  modalTonicPitch: NotePitch; // (selectedTonic + modalTonicOffset) % 12 // e.g., for Dorian (rotation 1) in the major set, modalTonicOffset=2 because D is 2 semitones above C in the C-major collection.
  modalTonicOffset: NotePitch; // 0-11 - semitones from original tonic // eg: selected tonic = C (0). For Dorian, offset=2 → (0+2)%12=2 (D). This is standard mod-12 transposition of pitch classes.
  pattern: number[]; // rotated & re-normalized to 0
  noteSteps: StepSymbol[]; // W/H sequence for the mode
};

export type RelativeModesDirectory = {
  baseScaleId: Scales; // If Ionian treat it as Major, if Aeolian then Minor.
  sameSetAliases: Scales[]; // Any alternate names for same scale
  modes: ModeEntry[]; // seven diatonic modes of that pitch set
  relativeMinorPitch: NotePitch; // If the base is Major, the relative minor tonic is +9 semitones (the 6th degree): e.g., C major (0) → A minor (9).
  relativeMajorPitch: NotePitch; // If the base is Minor, the relative major tonic is +3 semitones (the 3rd degree of the minor): e.g., A minor (9) → C major (0).
};

export const buildModesDirectoryForSelection = (
  selectedScaleId: Scales,
  selectedTonicPitch: NotePitch
): RelativeModesDirectory | null => {
  const selectedRotation = MODE_ROTATION_INDEX[selectedScaleId];
  if (selectedRotation == null) return null;

  const baseScaleId = Scales.Major;
  const basePattern = SCALES[baseScaleId].pattern;
  const isTargetMode =
    selectedScaleId === Scales.Ionian ||
    selectedScaleId === Scales.Dorian ||
    selectedScaleId === Scales.Phrygian ||
    selectedScaleId === Scales.Lydian ||
    selectedScaleId === Scales.Mixolydian ||
    selectedScaleId === Scales.Aeolian ||
    selectedScaleId === Scales.Locrian;

  // for each rotation/mode of basePattern, generate the rotated pattern and modal tonic offset
  const modes: ModeEntry[] = MODE_NAMES.map((modeName, rotationIndex) => {
    const { rotatedPattern } = rotatePatternForMode(basePattern, rotationIndex);

    // T(mode r) = T(selected) + (base[r] - base[selectedRotation]) mod 12
    const relativeOffset = ((((basePattern[rotationIndex] -
      basePattern[selectedRotation]) %
      12) +
      12) %
      12) as NotePitch;
    const modalTonicPitch = ((selectedTonicPitch + relativeOffset) %
      12) as NotePitch;

    return {
      modeName,
      rotationIndex,
      modalTonicPitch,
      modalTonicOffset: relativeOffset,
      pattern: rotatedPattern,
      noteSteps: getStepsFromPattern(rotatedPattern),
    };
  }).filter(
    (mode) => !(isTargetMode && mode.rotationIndex === selectedRotation)
  ); // exclude the selected mode if selected scale is also a mode

  // Same-set alias - Major:Ionian, Minor:Aeolian - based on the selected scale
  const alias = EQUIVALENT_SCALE_IDS[selectedScaleId];
  const sameSetAliases = alias ? ([alias] as Scales[]) : [];

  const relativeMajorPitch = ((selectedTonicPitch -
    basePattern[selectedRotation] +
    12) %
    12) as NotePitch;
  const relativeMinorPitch = ((relativeMajorPitch + 9) % 12) as NotePitch; // relative minor of parent major

  return {
    baseScaleId,
    sameSetAliases,
    modes,
    relativeMajorPitch,
    relativeMinorPitch,
  };
};
