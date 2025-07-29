import { ReactNode } from "react";

import InstrumentChoice from "@/components/dropdowns/InstrumentChoice";
import TuningChoice from "@/components/dropdowns/TuningChoice";
import TonicChoice from "@/components/dropdowns/TonicChoice";
import ScalesChoice from "@/components/dropdowns/ScalesChoice";
import ThemeChoice from "@/components/dropdowns/ThemeChoice";

export type MenuContent = {
  heading: string;
  content: ReactNode;
};

export const DROPDOWN_CONTENT: MenuContent[] = [
  {
    heading: "Instrument",
    content: <InstrumentChoice />,
  },
  {
    heading: "Tuning",
    content: <TuningChoice />,
  },
  {
    heading: "Tonic Note",
    content: <TonicChoice />,
  },
  {
    heading: "Musical Scales",
    content: <ScalesChoice />,
  },
  {
    heading: "Theme",
    content: <ThemeChoice />,
  },
];
