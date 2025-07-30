import { ReactNode } from "react";

import InstrumentChoice from "@/components/dropdowns/InstrumentChoice";
import TuningChoice from "@/components/dropdowns/TuningChoice";
import TonicChoice from "@/components/dropdowns/TonicChoice";
import ScalesChoice from "@/components/dropdowns/ScalesChoice";
import ThemeChoice from "@/components/dropdowns/ThemeChoice";
import TimeSignatureChoice from "@/components/metronome/TimeSignatureChoice";

export type MenuContent = {
  id: string;
  heading: string;
  content: ReactNode;
};

export const MENU_CONTENT: MenuContent[] = [
  {
    id: "instrument",
    heading: "Instrument",
    content: <InstrumentChoice />,
  },
  {
    id: "tuning",
    heading: "Tuning",
    content: <TuningChoice />,
  },
  {
    id: "tonic",
    heading: "Tonic Note",
    content: <TonicChoice />,
  },
  {
    id: "scales",
    heading: "Musical Scales",
    content: <ScalesChoice />,
  },
  {
    id: "theme",
    heading: "Theme",
    content: <ThemeChoice />,
  },
];

export const METRONOME_CONTENT: MenuContent[] = [
  {
    id: "time-signature",
    heading: "Time Signature",
    content: <TimeSignatureChoice />,
  },
  {
    id: "metronome-theme",
    heading: "Theme",
    content: (
      <>
        <div> SPEED ADJUSTER</div>
      </>
    ),
  },
];
