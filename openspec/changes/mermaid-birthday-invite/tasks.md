## 1. Project Setup

- [x] 1.1 Create project folder structure: `index.html`, `assets/style.css`, `assets/main.js`, `assets/images/`
- [ ] 1.2 Add two candidate music files to `assets/`: `music-under-the-sea.mp3` and `music-bubble-guppies.mp3`
- [x] 1.3 Source or create mermaid/ocean SVG decorations (mermaid tail, shells, fish, starfish) and place in `assets/images/`

## 2. Base HTML Structure

- [x] 2.1 Set up `index.html` with correct `<meta>` tags (charset, viewport, og:title for link previews), Google Fonts link, and CSS/JS references
- [x] 2.2 Add hero section markup: heading "You're Invited!", subheading "Aarya is Turning 4!", decorative SVG placeholders, wave element, and music toggle button
- [x] 2.3 Add party details section markup: date card (June 6th) and time card (4:00 PM)
- [x] 2.4 Add bubble-pop game section markup: section heading, bubble container `<div>`, treasure reveal container (hidden by default)
- [x] 2.5 Add RSVP section markup with `id="rsvp"`, themed heading, and Google Form `<iframe>` placeholder comment (`<!-- PASTE GOOGLE FORM EMBED URL HERE -->`)
- [x] 2.6 Add two `<audio>` elements with inline removal comment marking which to delete after music choice

## 3. Styling (style.css)

- [x] 3.1 Define CSS custom properties for the mermaid color palette (blues, coral, seafoam, gold)
- [x] 3.2 Style the hero section: full-viewport height, ocean gradient background, centered text, Google Font headings
- [x] 3.3 Implement CSS wave animation at the bottom of the hero using `@keyframes` and `clip-path` or SVG wave
- [x] 3.4 Implement floating bubble animation (`@keyframes floatUp`) with varied sizes, speeds, and positions
- [x] 3.5 Implement sparkle/glitter particle animations in the hero
- [x] 3.6 Style the party details section: shell/pearl bordered cards, mermaid palette
- [x] 3.7 Style the bubble-pop game section: ocean floor background, bubble container positioning
- [x] 3.8 Style the treasure reveal element: glowing shell icon, congratulatory text, fade-in animation
- [x] 3.9 Style the RSVP section: themed container framing the Google Form iframe
- [x] 3.10 Add responsive styles for mobile (≤ 480px): stack sections, scale fonts, maintain animations

## 4. Music Toggle (main.js)

- [x] 4.1 Implement music toggle button: clicking starts/pauses the active `<audio>` element and updates button icon/text between play and pause states
- [x] 4.2 Ensure music does NOT autoplay on page load (respects browser autoplay policy)

## 5. Bubble-Pop Game (main.js)

- [x] 5.1 Dynamically generate 10+ bubble elements in the bubble container, each with randomized size (20–60px), position, animation duration (3–8s), and color from palette
- [x] 5.2 Attach `click` and `touchstart` event listeners to each bubble for cross-device support
- [x] 5.3 On pop: remove the bubble from DOM, pick a random message from the celebratory list, show the message near the pop location, fade it out after 1.5s
- [x] 5.4 Implement pop counter; when counter reaches 5, trigger treasure reveal and disable remaining bubbles
- [x] 5.5 Implement treasure reveal: show hidden treasure container with animation, then smooth-scroll to `#rsvp` section

## 6. Owner Customization & Deploy

- [ ] 6.1 Verify both audio tracks are correctly referenced and playable; owner reviews and removes unwanted `<audio>` element
- [ ] 6.2 Owner creates Google Form with fields: Name (short answer) + Attending? (multiple choice: Yes / No), then pastes the embed URL into the `index.html` placeholder
- [ ] 6.3 Test full page on desktop Chrome/Safari and mobile (iOS Safari, Android Chrome): animations, bubble pops, music toggle, RSVP form
- [ ] 6.4 Deploy to Netlify (drag `index.html` + `assets/` folder to Netlify drop zone) or push to GitHub and enable GitHub Pages
- [ ] 6.5 Share the live URL with friends for RSVP
