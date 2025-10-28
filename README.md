# Mode Note

Mode Note was created for guitar & bass players to learn & practice notes & scales on the fretboard, with extended range instruments & in alternate tunings.
Created in Nextjs using React, Typescript, Tailwind, Zustand & AudioContext api

## Features include:

### Extended Range Instrument support

- **Guitar**: 6, 7, 8, and 9 strings
- **Bass**: 4, 5, 6, and 7 strings

Each instrument has adjustable fret quantities (21, 22, or 24 frets), fret marker styles (diamond or triangle), and orientation settings for left or right-handed players.

### Tuning System

- Preset tunings for each instrument and string configuration
- Individual string tuning in semitones & whole notes
- Full fretboard tuning adjustments
- Custom tuning storage for future sessions per instrument type
- Sharp and flat notation preferences

### Scale Visualisation

Select a tonic note and view the scale pattern, in note name, interval or blank, either across the full fretboard, or at different neck positions.

- Modes (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian)
- Selection of other scales - Harmonic Minor, Blues, Bebop, Pentatonic, etc

### Music Theory Tools

Added educational features for understanding music theory:

- **Circle of Fifths**: Interactive visualization showing note relationships, intervals, and relative scales - **coming soon**
- **Scale Information Panel**: Detailed breakdown of selected scales including modal relationships and relative major/minor connections
- **Interval Display**: Roman numeral analysis and interval patterns for selected scales

### Metronome

- BPM range from 30 to 300 with fine adjustment controls
- Multiple time signatures including common (4/4, 3/4) and complex (7/8, 13/8) meters
- Eight sounds
- Visual beat indicator
- Audio controls for muting or adjusting metronome volume

### Visual Customisation

- Four fretboard wood types (rosewood, maple, ebony, pale)
- Ten note color schemes
- Gold or silver string colours
- Responsive design scaling from mobile to desktop
- Custom note selection modes for creating personal practice patterns

### Setup and Configuration

New users are guided through a three-stage setup process:

1. **Instrument Selection**: Choose instrument type, string quantity, and fret configuration
2. **Tuning Configuration**: Select preset or create custom tuning
3. **Scale Setup**: Choose initial scale and tonic note preferences

The setup can be skipped for immediate access or revisited through the settings menu.

### Advanced Features

- **Custom Note Selection**: Manual selection of individual notes or fret positions for personalised pattern practice
- **Persistent Settings**: All preferences saved between sessions
