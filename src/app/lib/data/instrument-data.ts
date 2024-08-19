export interface InstrumentProps {
  id: string;
  title: string;
  stringQty: number;
  instrumentType: "bass" | "guitar";
}

export const instrumentData: readonly InstrumentProps[] = [
  {
    id: "4B",
    title: "Bass - 4 String",
    stringQty: 4,
    instrumentType: "bass",
  },
  {
    id: "5B",
    title: "Bass - 5 String",
    stringQty: 5,
    instrumentType: "bass",
  },
  {
    id: "6B",
    title: "Bass - 6 String",
    stringQty: 6,
    instrumentType: "bass",
  },
  {
    id: "6G",
    title: "Guitar - 6 String",
    stringQty: 6,
    instrumentType: "guitar",
  },
  {
    id: "7G",
    title: "Guitar - 7 String",
    stringQty: 7,
    instrumentType: "guitar",
  },
  {
    id: "8G",
    title: "Guitar - 8 String",
    stringQty: 8,
    instrumentType: "guitar",
  },
] as const;
