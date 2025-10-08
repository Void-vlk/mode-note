declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clarity?: (method: string, ...args: any[]) => void;
  }
}
export {};

export enum EventName {
  SetupSkipped = "skipped_setup",
  SetupCompleted = "completed_setup",

  OpenedSidebar = "opened_sidebar",

  ClickedInstrument = "clicked_instrument",
  ClickedStringQty = "clicked_string_qty",
  ClickedFretQty = "clicked_fret_qty",
  ToggledFretMarkers = "clicked_fret_markers",
  ToggledHandedness = "clicked_handedness",

  ClickedScale = "clicked_scale",
  ClickedTuning = "clicked_tuning",
  ToggledAccidentals = "clicked_accidentals",
  ClickedTunedAll = "clicked_tuned_all",

  ClickedTunedIndividual = "clicked_tuned_individual",
  ClickedSaveTuning = "clicked_save_tuning",
  ClickedPresetTuning = "clicked_preset_tuning",
  ClickedTonicNote = "clicked_tonic_note",
  ClickedScaleInfo = "clicked_scale_info",
  ClickedScalePosition = "clicked_scale_position",
  ToggledShape = "toggled_shape",
  ClickedNoteDisplay = "clicked_note_display",
  ClickedWood = "clicked_wood",
  ClickedColour = "clicked_colour",
  ToggledStringColour = "toggled_string_colour",

  AdvancedSettingsOpened = "opened_advanced_settings",
  ToggledCustomNoteSelection = "toggled_custom_note_selection",
  ToggledNoteSelectionType = "toggled_note_selection_type",
  ResetSelection = "reset_selection",

  PlayMetronome = "played_metronome",
  StoppedMetronome = "stopped_metronome",
  OpenedMetronomeSettings = "opened_metronome_settings",
  ClickedTempo = "clicked_tempo",
  ClickedSound = "clicked_sound",
  ClickedTimeSignature = "clicked_time_signature",
  ClickedResetBpm = "clicked_reset_bpm",

  BuyMeACoffee = "buy_me_a_coffee",
  SendFeedback = "send_feedback",
}

export type CustomEventProperties = {
  setup_page?: string;
  
  instrument_type?: string;
  string_qty?: string;
  fret_qty?: string;
  fret_markers?: string;
  handedness?: string;
  accidental?: string;

  down_whole_step?: number;
  down_half_step?: number;
  up_whole_step?: number;
  up_half_step?: number;
  preset_selected?: string;
  tuning_saved?: string[];

  scale_name?: string;
  tonic_note?: string;
  scale_position?: string;
  shape?: string;
  note_display?: string;

  wood_theme?: string;
  colour_theme?: string;
  string_colour?: string;

  custom_note_selection?: string;
  note_selection_type?: string;

  time_signature?: string;
  tempo?: number;
  sound?: string;
};

export type EventProperties = { event: EventName } & CustomEventProperties;

export const trackEvent = (
  eventName: EventName,
  properties?: CustomEventProperties
) => {
  if (process.env.NODE_ENV === "development") {
    console.log("track event: ", eventName, properties);
  }

  if (typeof window !== "undefined" && window.clarity) {
    try {
      // Microsoft Clarity API: clarity('event', eventName, properties)
      window.clarity("event", eventName, properties || {});
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  }
};
