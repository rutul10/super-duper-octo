## Context

Brand new project — no existing codebase. The output is a single-page static website shared as a URL with family friends for Aarya's 4th birthday party (June 6th, 4pm). Guests only need to RSVP (name + yes/no); no address collection required. Parents control the final music choice from two candidate tracks. Hosting must be free and shareable via a simple link.

## Goals / Non-Goals

**Goals:**
- Delightful, mobile-friendly mermaid-themed invite page
- Animated ocean visuals (waves, bubbles, sparkles, fish)
- Background music with play/pause toggle; two tracks embedded for owner preview
- Bubble-pop mini-game that funnels guests toward the RSVP section
- RSVP via embedded Google Form (name + attending)
- Deployable to Netlify or GitHub Pages with zero backend

**Non-Goals:**
- No server-side code or database
- No guest address collection
- No authentication or admin dashboard
- No multi-language support
- No CMS or content editing UI

## Decisions

**D1 — Pure HTML/CSS/JS, no framework**
A React or Vue app would add build tooling complexity with no benefit for a single static page. Vanilla HTML/CSS/JS ships as a folder that can be dragged onto Netlify instantly.

**D2 — CSS animations for visual effects (no canvas)**
Floating bubbles, wave animations, and sparkles are achievable with CSS `@keyframes` and absolutely-positioned elements. This avoids a canvas/WebGL dependency and degrades gracefully on slower devices. Performance is sufficient for this scale.

**D3 — HTML5 `<audio>` for music**
Two `<audio>` elements are embedded with distinct track sources. A single toggle button shows/hides them and manages play state. Owner previews both, removes one before deploy. Browser autoplay policy means music starts on first user interaction (the toggle click), which is fine.

**D4 — Google Form embed for RSVP**
Owner creates a Google Form (name + attending), copies the embed `<iframe>` URL into the page. No backend needed; responses land in Google Sheets. Alternative (Formspree) was considered but requires an account and email routing — Google Forms is simpler and free.

**D5 — Bubble-pop game in vanilla JS**
Bubbles are CSS-animated `<div>` elements. A click handler removes the bubble, increments a counter, and shows a random message from a small array. After N pops (e.g., 5), a "treasure found" animation triggers and the page scrolls to RSVP. No library needed.

**D6 — File structure: single `index.html` + `assets/`**
```
/
├── index.html
├── assets/
│   ├── style.css
│   ├── main.js
│   ├── music-track-1.mp3   (Under the Sea)
│   ├── music-track-2.mp3   (Bubble Guppies)
│   └── images/             (mermaid SVGs, shell, fish decorations)
```
Simple to deploy — zip and drag to Netlify, or push to GitHub Pages.

## Risks / Trade-offs

- **Music copyright** → "Under the Sea" and "Bubble Guppies" are copyrighted; fine for a private personal use invite, but not for a public site. Mitigation: site is shared only with known friends via private link, not indexed publicly.
- **Autoplay blocked by browsers** → Most browsers block audio autoplay without user gesture. Mitigation: music only starts on explicit toggle click (D3), which satisfies browser policy.
- **Google Form styling mismatch** → Embedded Google Forms have limited styling options and may look out of place. Mitigation: wrap the iframe in a styled "treasure chest / shell" container to soften the transition; accept minor visual inconsistency.
- **Mobile touch vs. click for bubble game** → Bubbles need both `click` and `touchstart` event listeners for cross-device support. Low complexity risk.

## Open Questions

- **Music final choice**: Owner needs to preview both tracks and confirm one before final deploy. A comment block in `index.html` marks which `<audio>` element to remove.
- **Google Form URL**: Owner must create the form and paste the embed URL into `index.html` before deploying. A clear `<!-- PASTE GOOGLE FORM EMBED URL HERE -->` placeholder will mark the spot.
- **Party duration**: Not specified — party details section will show "4:00 PM" without an end time unless owner provides one.
