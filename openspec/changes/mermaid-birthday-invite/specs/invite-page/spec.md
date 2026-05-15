## ADDED Requirements

### Requirement: Animated mermaid-themed hero section
The page SHALL display a full-viewport hero section with the birthday girl's name ("Aarya"), the age milestone ("Turning 4!"), and an animated ocean environment including CSS-animated waves at the bottom, floating bubbles, sparkle particles, and decorative mermaid/fish/shell SVG elements.

#### Scenario: Hero renders on load
- **WHEN** a guest opens the invite URL
- **THEN** the hero section fills the viewport with animated ocean waves, floating bubbles, Aarya's name in a large decorative font, and the "Turning 4!" subtitle

#### Scenario: Page is mobile-responsive
- **WHEN** a guest opens the invite on a phone screen (width ≤ 480px)
- **THEN** all sections stack vertically, text remains legible, animations continue, and no horizontal scroll appears

### Requirement: Party details section
The page SHALL display a styled party details section showing the event date (June 6th) and start time (4:00 PM). No address SHALL be shown.

#### Scenario: Details are visible below the hero
- **WHEN** a guest scrolls past the hero
- **THEN** a clearly styled card or section shows "June 6th" and "4:00 PM" with mermaid-themed decorative elements

### Requirement: Background music with toggle
The page SHALL include two embedded audio tracks ("Under the Sea" and "Bubble Guppies Theme") and a visible play/pause toggle button. Music SHALL NOT autoplay without user interaction. The owner SHALL be able to remove one track before deploy by following an inline comment.

#### Scenario: Guest activates music
- **WHEN** a guest clicks the music toggle button
- **THEN** the selected track begins playing and the button shows a "pause" state

#### Scenario: Guest pauses music
- **WHEN** music is playing and the guest clicks the toggle again
- **THEN** the music pauses and the button returns to a "play" state

#### Scenario: Owner removes a candidate track
- **WHEN** the owner deletes the `<audio>` element marked with the removal comment in `index.html`
- **THEN** only the remaining track plays when the toggle is clicked

### Requirement: Color palette and typography
The page SHALL use the mermaid color palette: deep ocean blues (#0077B6, #00B4D8), coral pink (#FF6B6B, #FFB6C1), seafoam (#90E0EF, #CAF0F8), and gold/sparkle (#FFD700). Headings SHALL use a fun, rounded Google Font appropriate for a children's party invite. Body text SHALL remain legible on all backgrounds.

#### Scenario: Color palette is applied consistently
- **WHEN** the page loads
- **THEN** all sections use colors from the defined mermaid palette with no default browser styling visible
