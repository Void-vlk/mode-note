"use client";
import { create } from "zustand";

export type Token =
  | `outer${"01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12"}`
  | `mid${"01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12"}`
  | `inner${"01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12"}`;

type ColourMap = Partial<Record<Token, string>>;

type CircleColoursState = {
  colours: ColourMap;
  defaultColour: string;
  setColour: (token: Token, colour: string) => void;
  setColours: (partial: ColourMap) => void;
  setDefaultColour: (colour: string) => void;
  getColour: (token: Token) => string;
};

export const useCircleColours = create<CircleColoursState>((set, get) => ({
  colours: {},
  defaultColour: "#e5e7eb", // one default for every sector
  setColour: (token, colour) =>
    set((s) => ({ colours: { ...s.colours, [token]: colour } })),
  setColours: (partial) =>
    set((s) => ({ colours: { ...s.colours, ...partial } })),
  setDefaultColour: (colour) => set({ defaultColour: colour }),
  getColour: (token) => get().colours[token] ?? get().defaultColour,
}));
