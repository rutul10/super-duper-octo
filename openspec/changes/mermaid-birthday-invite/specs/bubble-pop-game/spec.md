## ADDED Requirements

### Requirement: Floating bubbles render above the game section
The game section SHALL display at least 10 CSS-animated bubbles that float upward continuously. Bubbles SHALL vary in size, speed, and horizontal position to feel organic. Bubbles SHALL be tappable/clickable on both desktop and mobile.

#### Scenario: Bubbles are visible and animated
- **WHEN** the guest scrolls to the game section
- **THEN** colorful bubbles are visibly floating upward across the section with varying sizes and speeds

#### Scenario: Bubbles respond to touch on mobile
- **WHEN** a guest on a mobile device taps a bubble
- **THEN** the bubble pops (is removed from the DOM) and a message appears

### Requirement: Bubble pop interaction with celebratory messages
The page SHALL handle a click or touch on any bubble by: removing the bubble from the DOM, displaying a brief celebratory message chosen randomly from a predefined list (e.g., "Splish splash! 🐠", "See you there! 🌊", "Yay! 🧜‍♀️"), and incrementing an internal pop counter.

#### Scenario: Guest pops a bubble
- **WHEN** a guest clicks or taps a bubble
- **THEN** the bubble disappears, a random celebratory message appears near the pop location, and the pop counter increments

#### Scenario: Message disappears after display
- **WHEN** a pop message has been shown for ~1.5 seconds
- **THEN** the message fades out and is removed from the DOM

### Requirement: Treasure reveal after sufficient pops
After the guest pops 5 bubbles, the page SHALL display a "treasure found" celebratory animation (e.g., a glowing shell or treasure chest icon with a congratulatory message) and SHALL automatically smooth-scroll to the RSVP section.

#### Scenario: Treasure triggers at 5 pops
- **WHEN** the guest pops their 5th bubble
- **THEN** a treasure reveal animation plays, a congratulatory message appears (e.g., "You found Aarya's treasure! 🐚 Don't forget to RSVP!"), and the page scrolls to the RSVP section

#### Scenario: Game does not loop
- **WHEN** the treasure has been revealed
- **THEN** remaining bubbles stop being interactive and the game state is complete
