export interface TimeSignatureProps {
  id: number;
  title: string;
  beat: number;
  bar: number;
}

export const timeSignatureData: readonly TimeSignatureProps[] = [
  { id: 0, title: '2/4', beat: 2, bar: 4 },
  { id: 1, title: '3/4', beat: 3, bar: 4 },
  { id: 2, title: '4/4', beat: 4, bar: 4 },
  { id: 3, title: '5/4', beat: 5, bar: 4 },
  { id: 4, title: '6/4', beat: 6, bar: 4 },
  { id: 5, title: '7/4', beat: 7, bar: 4 },
  { id: 6, title: '3/8', beat: 3, bar: 8 },
  { id: 7, title: '5/8', beat: 5, bar: 8 },
  { id: 8, title: '6/8', beat: 6, bar: 8 },
  { id: 9, title: '7/8', beat: 7, bar: 8 },
  { id: 10, title: '9/8', beat: 9, bar: 8 },
  { id: 11, title: '11/8', beat: 11, bar: 8 },
  { id: 12, title: '13/8', beat: 13, bar: 8 },
  { id: 13, title: '15/8', beat: 15, bar: 8 },
];
