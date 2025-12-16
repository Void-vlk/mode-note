import { ReactNode } from "react";

import InstrumentChoice from "@/components/dropdowns/InstrumentChoice";
import TuningChoice from "@/components/dropdowns/TuningChoice";
import TonicChoice from "@/components/dropdowns/TonicChoice";
import ScalesChoice from "@/components/dropdowns/ScalesChoice";
import ThemeChoice from "@/components/dropdowns/ThemeChoice";
import TimeSignatureChoice from "@/components/metronome/TimeSignatureChoice";
import SoundChoice from "@/components/metronome/SoundChoice";
import ScalePositionChoice from "@/components/dropdowns/ScalePositionChoice";
import NoteDisplayChoice from "@/components/dropdowns/NoteDisplayChoice";
import AdvancedChoices from "@/components/dropdowns/AdvancedChoices";
import { Instruments } from "@/resources/types";

export type MenuContent = {
  id: string;
  heading: string;
  content: ReactNode;
};

const MENU_CONTENT: MenuContent[] = [
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
    heading: "Scales",
    content: <ScalesChoice />,
  },
  {
    id: "positions",
    heading: "Scale Position",
    content: <ScalePositionChoice />,
  },
  {
    id: "note-display",
    heading: "Note Display",
    content: <NoteDisplayChoice />,
  },
  {
    id: "theme",
    heading: "Theme",
    content: <ThemeChoice />,
  },
  {
    id: "advanced",
    heading: "Advanced",
    content: <AdvancedChoices />,
  },
];

export const getMenuContent = (instrument: Instruments): MenuContent[] => {
  if (instrument === Instruments.Keys) {
    // Exclude tuning and scale position for keyboard
    return MENU_CONTENT.filter(
      (item) => item.id !== "tuning" && item.id !== "positions"
    );
  }
  return MENU_CONTENT;
};

export const METRONOME_CONTENT: MenuContent[] = [
  {
    id: "time-signature",
    heading: "Time Signature",
    content: <TimeSignatureChoice />,
  },
  {
    id: "sound",
    heading: "Sound",
    content: <SoundChoice />,
  },
];
