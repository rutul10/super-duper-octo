## ADDED Requirements

### Requirement: Embedded Google Form for RSVP
The RSVP section SHALL embed a Google Form via `<iframe>` that collects guest name and attendance (yes/no). The embed URL SHALL be provided by the owner via a clearly marked placeholder comment in `index.html`. No address field SHALL be included in the form.

#### Scenario: Guest sees the RSVP form
- **WHEN** a guest scrolls to or is scrolled to the RSVP section
- **THEN** an embedded Google Form is visible and interactive within the page

#### Scenario: Owner configures the form URL
- **WHEN** the owner replaces the `<!-- PASTE GOOGLE FORM EMBED URL HERE -->` placeholder with a real Google Form embed URL
- **THEN** the form appears correctly inside the styled RSVP section

### Requirement: RSVP section is visually integrated with the invite theme
The RSVP section SHALL be styled with the mermaid color palette and include a heading (e.g., "Will you join us? 🧜‍♀️") so the embedded form feels part of the invite rather than a separate tool.

#### Scenario: RSVP section matches the invite theme
- **WHEN** the guest reaches the RSVP section
- **THEN** the surrounding container uses the mermaid palette and themed heading, visually framing the embedded Google Form

### Requirement: RSVP section is reachable via game completion
The RSVP section SHALL have an HTML `id` attribute (e.g., `id="rsvp"`) so the bubble-pop game can programmatically scroll to it after the treasure reveal.

#### Scenario: Scroll-to-RSVP works from game completion
- **WHEN** the bubble-pop game triggers its treasure reveal
- **THEN** `document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })` successfully scrolls to the RSVP section
