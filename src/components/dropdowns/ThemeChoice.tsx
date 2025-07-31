"use client";
import { type FC } from "react";
import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import ContentToggle from "@/components/settings/ContentToggle";
import {
  // APP_THEMES,
  FRETBOARD_THEMES,
  NOTE_THEMES,
} from "@/resources/themes";

import { useThemeStore } from "@/hooks/useThemeStore";

const ThemeChoice: FC = () => {
  // const appTheme = useThemeStore((s) => s.appTheme);
  // const setAppTheme = useThemeStore((s) => s.setAppTheme);
  const fretboardTheme = useThemeStore((s) => s.fretboardTheme);
  const setFretboardTheme = useThemeStore((s) => s.setFretboardTheme);
  const stringTheme = useThemeStore((s) => s.stringTheme);
  const setStringTheme = useThemeStore((s) => s.setStringTheme);
  const noteTheme = useThemeStore((s) => s.noteTheme);
  const setNoteTheme = useThemeStore((s) => s.setNoteTheme);

  return (
    <>
      {/* <MenuSelectionList
        options={APP_THEMES.map((theme) => ({
          value: theme,
          label: theme,
          checked: appTheme === theme,
          onSelect: () => setAppTheme(theme),
        }))}
      /> */}
      <MenuSelectionList
        options={FRETBOARD_THEMES.map((theme) => ({
          value: theme,
          label: theme,
          checked: fretboardTheme === theme,
          onSelect: () => setFretboardTheme(theme),
        }))}
        contentHeader="Fretboard Wood"
      />

      <MenuSelectionList
        options={NOTE_THEMES.map((theme) => ({
          value: theme,
          label: theme,
          checked: noteTheme === theme,
          onSelect: () => setNoteTheme(theme),
        }))}
        contentHeader="Note Colour"
      />

      <ContentToggle
        isChecked={stringTheme === "gold"}
        onChange={() =>
          setStringTheme(stringTheme === "gold" ? "silver" : "gold")
        }
        optionHeader="String Colour"
        isInSetup={false}
        leftOption="Ag"
        rightOption="Au"
        aria-label="Toggle string colour"
      />
    </>
  );
};

export default ThemeChoice;
