'use client';

import { useRef } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';

import { instrumentData } from '@/lib/data/instrument-data';
import { scalesData } from '@/lib/data/scales-data';
import { noteNames } from '@/lib/data/note-data';
import { timeSignatureData } from '@/lib/data/metronome-data';
import { tuningData } from '@/lib/data/tuning-data';

import { useTuningStore } from '@/lib/stores/tuning-state';
import { useMetronomeStore } from '@/lib/stores/metronome-state';
import { useDropdownStore } from '../lib/stores/dropdown-state';
import { useNoteStore } from '../lib/stores/note-state';
import { useScalesStore } from '../lib/stores/scales-state';
import { useInstrumentStore } from '../lib/stores/instrument-state';

import ControlButton from '@/components/control-button';

type DropdownVariant =
  | "instrument"
  | "scale"
  | "tonic"
  | "timeSignature"
  | "tuning";

type ButtonVariant = 'accordion' | 'dropdown';
type ItemVariant = 'accordionItem' | 'dropdownItem';
 
const styleLayouts = {
  accordionLayout: "flex flex-col items-start w-full bg-gray-900 opacity-80 h-[17rem] max-h-[60vh] overflow-y-scroll dropdown-container transition delay-1000 duration-500 ease-out",
  dropdownLayout: "absolute mt-2 p-1 gap-1 bg-gray-900 text-gray-400 text-sm border-2 border-gray-300 rounded-lg z-50 cursor-pointer",
};

const dropdownStyles = {
  instrument: 'w-40 -ml-4',
  scale: 'grid grid-cols-2 w-72 -ml-20', 
  tonic: 'grid grid-cols-2 w-32 ml-2',
  timeSignature: '',
  tuning: '',
  menu: '',
};

type DropdownProps = {
  variant: DropdownVariant;
  buttonStyle: ButtonVariant;
  itemStyle: ItemVariant;
  id: string;
};

const Dropdown = ({ variant, buttonStyle, itemStyle, id }: DropdownProps) => {
  const { 
    instrumentOpen, 
    toggleInstrumentOpen, 
    scaleOpen, 
    toggleScaleOpen, 
    tonicOpen, 
    toggleTonicOpen, 
    closeAll, 
    forcePlaceholder, 
    setForcePlaceholder,
    tuningOpen, 
    toggleTuningOpen,
    timeSignatureOpen, 
    toggleTimeSignatureOpen
   } = useDropdownStore();
  const { selectedScale, setSelectedScale, selectedTonic, setSelectedTonic } = useScalesStore();
  const { showSharp } = useNoteStore();
  const { selectedInstrument, setSelectedInstrument, } = useInstrumentStore();
  const { selectedTuning, setSelectedTuning  } = useTuningStore();
  const { selectedTimeSignature, setSelectedTimeSignature } = useMetronomeStore();
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownMaps = {
    instrument: {
      items: instrumentData.map((instrument) => ({ id: instrument.id, title: instrument.title })),
      selectedItem: selectedInstrument ? { id: selectedInstrument.id, title: selectedInstrument.title } : null,
      isOpen: instrumentOpen,
      toggleDropdown: toggleInstrumentOpen,
      handleItemClick: (id: string) => {
        setSelectedInstrument(id);
        closeAll();
        setForcePlaceholder(false); // instrument has default so force placeholder until user chooses
      },
    },
    scale: {
      items: scalesData.map((scale) => ({ id: scale.id, title: scale.title })),
      selectedItem: selectedScale ? { id: selectedScale.id, title: selectedScale.title } : null,
      isOpen: scaleOpen,
      toggleDropdown: toggleScaleOpen,
      handleItemClick: (id: number) => {
        setSelectedScale(id);
        closeAll();
      },
    },
    tonic: {
      items: noteNames.map((note) => ({
        id: note.id, 
        title: typeof note.name === 'string' ? note.name : (showSharp ? note.name.sharp : note.name.flat),
      })),
      selectedItem: selectedTonic ? { id: selectedTonic.id, title: typeof selectedTonic.name === 'string' ? selectedTonic.name : (showSharp ? selectedTonic.name.sharp : selectedTonic.name.flat) } : null,
      isOpen: tonicOpen,
      toggleDropdown: toggleTonicOpen,
      handleItemClick: (id: number) => {
        setSelectedTonic(id);
        closeAll();
      },
    },
    timeSignature: {
      items: timeSignatureData.map((timeSignature) => ({ id: timeSignature.id, title: timeSignature.title })),
      selectedItem: selectedTimeSignature ? { id: selectedTimeSignature.id, title: selectedTimeSignature.title } : null,
      isOpen: timeSignatureOpen,
      toggleDropdown: toggleTimeSignatureOpen,
      handleItemClick: (id: number) => {
        setSelectedTimeSignature(id);
        closeAll();
      },
    },
    tuning: {
      items: tuningData
        .filter((tuning) => tuning.instrumentTitle === selectedInstrument?.title)
        .map((tuning) => ({ id: tuning.id, title: tuning.title })),
      selectedItem: selectedTuning ? { id: selectedTuning.id, title: selectedTuning.title } : null,
      isOpen: tuningOpen,
      toggleDropdown: toggleTuningOpen,
      handleItemClick: (id: string) => {
        setSelectedTuning(id);
        closeAll();
      }
    },
  };

  const { items, selectedItem, isOpen, toggleDropdown, handleItemClick } = dropdownMaps[variant];

  type PlaceholderText = {
    instrument: string;
    scale: string;
    tonic: string;
    timeSignature: string;
    tuning: string;
  };
  const placeholderText: PlaceholderText = {
    instrument: 'Select an Instrument',
    scale: 'Select a Scale',
    tonic: 'Select Tonic Note',
    timeSignature: 'Select a Time Signature',
    tuning: 'Select a Tuning',
  };

  //if accordion variant use accordion styling & dont use dropdown styling
  const dropdownFormat = `${buttonStyle === "accordion" ? styleLayouts.accordionLayout : styleLayouts.dropdownLayout} ${buttonStyle === "accordion" ? dropdownStyles.menu : dropdownStyles[variant]}`;

  const headerText = () => {
    // Show placeholder if forcePlaceholder is true or no item is selected
    return (variant === 'instrument' ? forcePlaceholder : !selectedItem) 
      ? placeholderText[variant] 
      : selectedItem!.title;
  };

  const addAccordionContent = () => (
    <div className="flex justify-between items-center w-full">
      <span className="flex px-4">
        {headerText()}
      </span>
      {isOpen ? (
        <FaChevronUp className="transform transition-transform duration-200 h-3 w-3 text-gray-300 mr-2" />
      ) : (
        <FaChevronDown className="transform transition-transform duration-200 h-3 w-3 text-gray-300 mr-2" />
      )}
    </div>  
  );

  const headerContent = () => {
    return buttonStyle === "accordion" ? addAccordionContent() : headerText();
  }
 
  return (
    <div className="relative dropdown-container w-full" id={id}>
      <div>
        <ControlButton onClick={toggleDropdown} variant={buttonStyle}>
          {headerContent()}
        </ControlButton>
        {isOpen && (
          <div ref={dropdownRef} className={dropdownFormat}>
            {items.map((item) => (
              <ControlButton
                key={item.id}
                onClick={() => handleItemClick(item.id as never)}
                variant={itemStyle}
              >
                {item.title}
              </ControlButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;