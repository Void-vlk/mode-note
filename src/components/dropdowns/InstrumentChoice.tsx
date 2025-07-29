"use client";
import { Diamond, TriangleRight } from "lucide-react";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import ContentToggle from "@/components/settings/ContentToggle";
import { getStringQuantities } from "@/hooks/getInstrumentValues";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { INSTRUMENTS } from "@/resources/types";

type Props = {
  isInSetup?: boolean;
};

const InstrumentChoice: FC<Props> = ({ isInSetup = false }) => {
  const setInstrument = useInstrumentStore((s) => s.setInstrument);
  const currentInstrument = useInstrumentStore((s) => s.instrument);
  const setStringQty = useInstrumentStore((s) => s.setStringQty);
  const stringQty = useInstrumentStore((s) => s.stringQty);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const setFretQuantity = useInstrumentStore((s) => s.setFretQuantity);
  const isDiamond = useInstrumentStore((s) => s.isDiamond);
  const setIsDiamond = useInstrumentStore((s) => s.setIsDiamond);

  const toggleFretMarkers = () => {
    setIsDiamond(!isDiamond);
  };

  return (
    <>
      <MenuSelectionList
        options={INSTRUMENTS.map((instrument) => ({
          value: instrument,
          label: instrument[0].toUpperCase() + instrument.slice(1),
          checked: currentInstrument === instrument,
          onSelect: () => setInstrument(instrument),
        }))}
        className={twMerge(isInSetup && "sm:px-16 gap-3 mb-4 w-full !px-16")}
        contentHeader="Instrument Type"
      />
      <MenuSelectionList
        options={getStringQuantities(currentInstrument).map((qty) => ({
          value: qty,
          label: `${qty} strings`,
          checked: stringQty === qty,
          onSelect: () => setStringQty(qty),
        }))}
        className={twMerge(
          isInSetup && "grid-cols-3 gap-3 mb-4 sm:px-2 !px-16"
        )}
        contentHeader="String Quantity"
      />
      <section className="flex">
        <ContentToggle
          isChecked={fretQuantity === 24}
          onChange={() => setFretQuantity(fretQuantity === 24 ? 21 : 24)}
          isInSetup={isInSetup}
          optionHeader="Fret Quantity"
          leftOption="21"
          rightOption="24"
        />
        <ContentToggle
          isChecked={isDiamond}
          onChange={toggleFretMarkers}
          isInSetup={isInSetup}
          optionHeader="Fret Markers"
          leftOption={
            <TriangleRight className="scale-y-[-1] rotate-90 size-4 lg:size-5 mt-px lg:mt-0" />
          }
          rightOption={<Diamond className="size-4 lg:size-5 mt-px lg:mt-0" />}
        />
      </section>
    </>
  );
};

export default InstrumentChoice;
