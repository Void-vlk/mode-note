export interface InstrumentProps {
  id: string;
  title: string;
  stringQty: number;
  instrumentType: "bass" | "guitar";
  stringTunings: readonly { openNote: number }[];
}

export const instrumentData: readonly InstrumentProps[] = [
 {
   id: "4B",
   title: "Bass - 4 String",
   stringQty: 4,
   instrumentType: "bass",
   stringTunings: [{ openNote: 7 }, { openNote: 2 }, { openNote: 9 }, { openNote: 4 }],
 },
 {
   id: "5B",
   title: "Bass - 5 String",
   stringQty: 5,
   instrumentType: "bass",
   stringTunings: [{ openNote: 7 }, { openNote: 2 }, { openNote: 9 }, { openNote: 4 }, { openNote: 11 }],
 },
 {
   id: "6B",
   title: "Bass - 6 String",
   stringQty: 6,
   instrumentType: "bass",
   stringTunings: [{ openNote: 0 }, { openNote: 7 }, { openNote: 2 }, { openNote: 9 }, { openNote: 4 }, { openNote: 11 }],
 },

 {
   id: "6G",
   title: "Guitar - 6 String",
   stringQty: 6,
   instrumentType: "guitar",
   stringTunings: [{ openNote: 4 }, { openNote: 11 }, { openNote: 7 }, { openNote: 2 }, { openNote: 9 }, { openNote: 4 }],
 },
 {
   id: "7G",
   title: "Guitar - 7 string",
   stringQty: 7,
   instrumentType: "guitar",
   stringTunings: [{ openNote: 4 }, { openNote: 11 }, { openNote: 7 }, { openNote: 2 }, { openNote: 9 }, { openNote: 4 }, { openNote: 11 }],
 },
 {
   id: "8G",
   title: "Guitar - 8 String",
   stringQty: 8,
   instrumentType: "guitar",
   stringTunings: [{ openNote: 4 }, { openNote: 11 }, { openNote: 7 }, { openNote: 2 }, { openNote: 9 }, { openNote: 4 }, { openNote: 11 }, { openNote: 6 }],
 },
] as const;