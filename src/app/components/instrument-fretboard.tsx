'use client';

import FretboardStringItems from '@/components/fretboard-string-items';
import { useInstrumentStore } from '@/lib/stores/instrument-state';
import { IoMdPlay } from "react-icons/io";

const InstrumentFretboard = () => {
  const { selectedInstrument } = useInstrumentStore();
  
  const fretCount = 24;
  const fretHeight = 2.5; 
  const fretInitialOffset = 5.45 + fretHeight;
  const fretPositions = Array.from({ length: fretCount }).map((_, fretIndex) => ({
    top: `${fretInitialOffset + fretIndex * fretHeight}rem`
  }));

  const fretMarkerPositions = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
  const markerInitialOffset = 4.9 + fretHeight / 2;
  const markerPositions = fretMarkerPositions.map(position => ({
    top: `${markerInitialOffset + (position - 1) * fretHeight}rem`
  }));

  return (
    <div className="flex justify-center">
      <div className="relative flex flex-row items-center justify-center border-2 border-black px-1 py-2 bg-gray-900 z-0">
        
        {/* nut */}
        <div className="absolute top-[5.4rem] left-0 h-1 w-full bg-gray-500 -z-10" /> 

        {/* frets */}
        {fretPositions.map((fretPosition, fretIndex) => (
          <div
            key={fretIndex}
            className="absolute w-full h-0.5 bg-gray-300 -z-10"
            style={{ top: fretPosition.top }}
          />
        ))}
        
        {/* notes + strings */}
          {Array.from({ length: selectedInstrument.stringQty }).map((_, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <div className="absolute top-[2.75rem] h-[97%] w-1.5 bg-yellow-500 border-l-2 border-r-2 border-yellow-600 -z-10 rounded-full" />
              <FretboardStringItems stringIndex={index} />
            </div>
          ))}

        {/* fret markers */}
        {markerPositions.map((markerPosition, index) => (
          <div
            key={index}
            className="absolute text-gray-400 z-10"
            style={{
              top: markerPosition.top,
              left: '96%',
              transform: 'translateX(50%) rotate(180deg)',
              fontSize: '1.25rem'
            }}
          >
            <IoMdPlay />
          </div>
        ))}

      </div>
    </div>
  );
};

export default InstrumentFretboard;

//TODO: string thickness for different instruments, also need to add for each string low end thicker to high end thinner...
// const stringThickness = selectedInstrument.instrumentType === "guitar" ? "p-0.5" : "p-1";