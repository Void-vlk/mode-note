"use client";
import { Diamond, Hand, TriangleRight } from "lucide-react";
import { type FC } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import ContentToggle from "@/components/settings/ContentToggle";
import { getStringQuantities } from "@/hooks/getInstrumentValues";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { Instruments, INSTRUMENTS } from "@/resources/types";
import { FRET_QUANTITY } from "@/resources/themes";
import { EventName, trackEvent } from "@/resources/analytics";

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
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);
  const setIsRighteHanded = useInstrumentStore((s) => s.setIsRightHanded);

  const instrumentOptions = Object.entries(INSTRUMENTS);

  return (
    <>
      <MenuSelectionList
        options={instrumentOptions.map(([key, instrument]) => ({
          value: key,
          label: instrument.label,
          checked: currentInstrument === key,
          onSelect: () => {
            setInstrument(key as Instruments);
            trackEvent(EventName.ClickedInstrument, {
              instrument: instrument.label,
              setup_page: isInSetup ? "true" : "false",
            });
          },
        }))}
        className={twMerge(isInSetup && "gap-3 mb-4 w-full md:!px-8")}
        contentHeader="Instrument Type"
      />
      <MenuSelectionList
        options={getStringQuantities(currentInstrument).map((qty) => ({
          value: qty,
          label: `${qty} strings`,
          checked: stringQty === qty,
          onSelect: () => {
            setStringQty(qty);
            trackEvent(EventName.ClickedStringQty, {
              string_qty: stringQty,
              setup_page: isInSetup ? "true" : "false",
            });
          },
        }))}
        className={twMerge(isInSetup && "grid-cols-2 gap-3 mb-4 md:!px-8")}
        contentHeader="String Quantity"
      />
      <MenuSelectionList
        options={FRET_QUANTITY.map((qty) => ({
          value: qty,
          label: `${qty}`,
          checked: fretQuantity === qty,
          onSelect: () => {
            setFretQuantity(qty);
            trackEvent(EventName.ClickedFretQty, {
              fret_qty: qty,
            });
          },
        }))}
        className={twMerge(isInSetup && "gap-3 mb-4 md:!px-8", "grid-cols-3")}
        contentHeader="Fret Quantity"
      />
      <section className={twJoin("flex gap-1", isInSetup && "justify-center")}>
        <ContentToggle
          isChecked={isDiamond}
          onChange={() => setIsDiamond(!isDiamond)}
          isInSetup={isInSetup}
          optionHeader="Fret Markers"
          leftOption={
            <TriangleRight className="scale-y-[-1] rotate-90 size-4 lg:size-5 mt-px lg:mt-0 -ml-1" />
          }
          rightOption={<Diamond className="size-4 lg:size-5 mt-px lg:mt-0" />}
          aria-label="Toggle fret markers"
        />
        <ContentToggle
          isChecked={isRightHanded}
          onChange={() => setIsRighteHanded(!isRightHanded)}
          isInSetup={isInSetup}
          optionHeader="Handedness"
          leftOption={
            <Hand
              className="scale-x-[-1] size-4.5 lg:size-5 -mr-1"
              strokeWidth={1.5}
            />
          }
          rightOption={
            <Hand className="size-4.5 lg:size-5 -ml-1" strokeWidth={1.5} />
          }
          aria-label="Toggle handedness"
        />
      </section>
    </>
  );
};

export default InstrumentChoice;
