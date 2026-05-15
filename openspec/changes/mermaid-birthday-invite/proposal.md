## Why

Aarya is turning 4 on June 4th, and her parents want to send a fun, shareable mermaid-themed birthday invitation website to friends — complete with animated ocean visuals, background music, an interactive bubble-pop game, and a simple RSVP form. A website invite is more engaging and delightful than a static image or message.

## What Changes

- New static single-page website (HTML/CSS/JS) with a mermaid/underwater theme
- Animated hero section with ocean waves, floating bubbles, and sparkles
- Party details section displaying date (June 6th) and time (4pm)
- Interactive bubble-pop game where guests pop bubbles revealing messages before RSVP
- Background music toggle (two candidate tracks for owner preview: "Under the Sea" and "Bubble Guppies Theme")
- RSVP section via embedded Google Form (collects: name + attending yes/no)
- Hosted as a static site (Netlify or GitHub Pages) for easy link sharing

## Capabilities

### New Capabilities

- `invite-page`: The single-page birthday invitation — hero, party details, bubble-pop game, music, and RSVP sections
- `bubble-pop-game`: Interactive client-side mini-game where clicking floating bubbles reveals celebratory messages and funnels guests toward RSVP
- `rsvp-form`: Embedded Google Form collecting guest name and attendance (yes/no)

### Modified Capabilities

## Impact

- New project: no existing code affected
- Requires a Google Form to be created by the owner and its embed URL added to the site
- Music files (MP3/OGG) need to be sourced; owner selects one of two previewed tracks before final deploy
- Hosting setup needed (Netlify drag-and-drop or GitHub Pages)
