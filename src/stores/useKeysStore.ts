import { create } from "zustand";

type KeysState = {
  volume: number;
  isSharp: boolean;
  heldKeyCodes: Set<string>;
  heldPadCodes: Set<string>;
  setVolume: (value: number) => void;
  setIsSharp: (value: boolean) => void;
  pressKey: (code: string) => void;
  releaseKey: (code: string) => void;
  pressPad: (code: string) => void;
  releasePad: (code: string) => void;
  clearAllHeld: () => void;
};

const useKeysStore = create<KeysState>((set) => ({
  volume: 0.6,
  isSharp: true,
  heldKeyCodes: new Set<string>(),
  heldPadCodes: new Set<string>(),

  setVolume: (value) => set({ volume: value }),
  setIsSharp: (value) => set({ isSharp: value }),

  pressKey: (code) =>
    set((state) => ({
      heldKeyCodes: new Set(state.heldKeyCodes).add(code),
    })),

  releaseKey: (code) =>
    set((state) => {
      const next = new Set(state.heldKeyCodes);
      next.delete(code);
      return { heldKeyCodes: next };
    }),

  pressPad: (code) =>
    set((state) => ({
      heldPadCodes: new Set(state.heldPadCodes).add(code),
    })),

  releasePad: (code) =>
    set((state) => {
      const next = new Set(state.heldPadCodes);
      next.delete(code);
      return { heldPadCodes: next };
    }),

  clearAllHeld: () =>
    set({
      heldKeyCodes: new Set<string>(),
      heldPadCodes: new Set<string>(),
    }),
}));

export default useKeysStore;
