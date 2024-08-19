import { useNoteStore } from '@/lib/stores/note-state';
import { useScalesStore } from '@/lib/stores/scales-state';
import { useOrientationStore } from '@/lib/stores/orientation-state';
import { useDropdownStore } from '@/lib/stores/dropdown-state';
// import { useNavStore } from '@/lib/stores/nav-state';
import { useInstrumentStore } from '@/lib/stores/instrument-state';

export const useCombiStore = () => {
  //Note Store - sharps
  const noteNames = useNoteStore((state) => state.noteNames);
  const showSharp = useNoteStore((state) => state.showSharp);
  const toggleSharp = useNoteStore((state) => state.toggleSharp);
  const resetSharps = useNoteStore((state) => state.resetSharps);
  const stringNotes = useNoteStore((state) => state.stringNotes);
  const setCurrentIndex = useNoteStore((state) => state.setCurrentIndex);
  const setOpenNote = useNoteStore((state) => state.setOpenNote);
  //Note Store - intervals
  const intervalNames = useNoteStore((state) => state.intervalNames);
  const showIntervals = useNoteStore((state) => state.showIntervals);
  const toggleIntervals = useNoteStore((state) => state.toggleIntervals);
  const resetIntervals = useNoteStore((state) => state.resetIntervals);
  //Scales Store
  const selectedScale = useScalesStore((state) => state.selectedScale);
  const setSelectedScale = useScalesStore((state) => state.setSelectedScale);
  const selectedTonic = useScalesStore((state) => state.selectedTonic);
  const setSelectedTonic = useScalesStore((state) => state.setSelectedTonic);
  const resetSelection = useScalesStore((state) => state.resetSelection);
  //Orientation Store
  const isLandscape = useOrientationStore((state) => state.isLandscape);
  const toggleOrientation = useOrientationStore((state) => state.toggleOrientation);
  const resetOrientation = useOrientationStore((state) => state.resetOrientation);
  // Dropdown Store
  const tonicOpen = useDropdownStore((state) => state.tonicOpen);
  const scaleOpen = useDropdownStore((state) => state.scaleOpen);
  const instrumentOpen = useDropdownStore((state) => state.instrumentOpen);
  const timeSignatureOpen = useDropdownStore((state) => state.timeSignatureOpen);
  const toggleTonicOpen = useDropdownStore((state) => state.toggleTonicOpen);
  const toggleScaleOpen = useDropdownStore((state) => state.toggleScaleOpen);
  const toggleInstrumentOpen = useDropdownStore((state) => state.toggleInstrumentOpen);
  const toggleTimeSignatureOpen = useDropdownStore((state) => state.toggleTimeSignatureOpen);
  const closeAll = useDropdownStore((state) => state.closeAll);
  const registerClickOutsideListener = useDropdownStore((state) => state.registerClickOutsideListener);
  const unregisterClickOutsideListener = useDropdownStore((state) => state.unregisterClickOutsideListener);
  const forcePlaceholder = useDropdownStore((state) => state.forcePlaceholder);
  const setForcePlaceholder = useDropdownStore((state) => state.setForcePlaceholder);
  const infoOpen = useDropdownStore((state) => state.infoOpen);
  const toggleInfo = useDropdownStore((state => state.toggleInfo));

// Nav Store -TODO: currently useState but need the state to also link to the main page scroll lock so merge with this.
//   const isMenuOpen = useNavStore((state) => state.isMenuOpen);
//   const setIsMenuOpen = useNavStore((state) => state.setIsMenuOpen);

  // Instrument Store
  const selectedInstrument = useInstrumentStore((state) => state.selectedInstrument);
  const setSelectedInstrument = useInstrumentStore((state) => state.setSelectedInstrument);
  const stringIndex = useInstrumentStore((state) => state.stringIndex);
  const setStringIndex = useInstrumentStore((state) => state.setStringIndex);
  // const stringThickness = useInstrumentStore((state) => state.stringThickness);
  // const setStringThickness = useInstrumentStore((state) => state.setStringThickness);
  
  const resetAll = () => {
    resetSelection();
    resetSharps();
    resetIntervals();
    resetOrientation();
  };

  return {
    //Note Store
    noteNames,
    intervalNames,
    showSharp,
    toggleSharp,
    showIntervals,
    toggleIntervals,
    stringNotes,
    setCurrentIndex,
    setOpenNote,
    //Scales store
    selectedScale,
    setSelectedScale,
    selectedTonic,
    setSelectedTonic,
    //orientation Store
    isLandscape,
    toggleOrientation,
    //Dropdown store
    tonicOpen,
    scaleOpen,
    instrumentOpen,
    timeSignatureOpen,
    toggleTonicOpen,
    toggleScaleOpen,
    toggleInstrumentOpen,
    toggleTimeSignatureOpen,
    closeAll,
    registerClickOutsideListener,
    unregisterClickOutsideListener,
    forcePlaceholder,
    setForcePlaceholder,
    infoOpen,
    toggleInfo,

    //Nav Store - update from useState
    // isMenuOpen,
    // setIsMenuOpen,

    //Instrument Store
    selectedInstrument,
    setSelectedInstrument,
    stringIndex,
    setStringIndex,
    // stringThickness,
    // setStringThickness,
    
    //Reset All
    resetSelection: resetAll,
  };
};