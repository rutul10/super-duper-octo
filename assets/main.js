'use strict';

// ===================== SHARED AUDIO CONTEXT =====================
const Audio = (function() {
  let ctx = null;
  let master = null;

  function get() {
    if (!ctx) {
      ctx    = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.18;
      master.connect(ctx.destination);
    }
    return ctx;
  }

  function getMaster() { get(); return master; }

  function pop() {
    const c = get();
    if (c.state === 'suspended') return;
    // Descending tone: bubble pop "bwop"
    const osc  = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(getMaster());
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, c.currentTime + 0.14);
    gain.gain.setValueAtTime(0.6, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.16);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.18);
  }

  return { get, getMaster, pop };
})();

// ===================== SPARKLES =====================
(function initSparkles() {
  const container = document.getElementById('sparkleContainer');
  if (!container) return;
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.className = 'sparkle';
    el.style.setProperty('--dur',   (2 + Math.random() * 3).toFixed(1) + 's');
    el.style.setProperty('--delay', (Math.random() * 4).toFixed(1) + 's');
    el.style.left = Math.random() * 100 + '%';
    el.style.top  = Math.random() * 72 + '%';
    const size = 4 + Math.random() * 6;
    el.style.width = el.style.height = size + 'px';
    container.appendChild(el);
  }
})();

// ===================== MUSIC =====================
(function initMusic() {
  const btn   = document.getElementById('floatMusicBtn');
  const track = new window.Audio('assets/music.mp3');
  track.loop   = true;
  track.volume = 0.7;

  let playing = false;
  let muted   = false;

  function startMusic() {
    track.play().catch(() => {}); // browser may still block; handled gracefully
    playing = true;
    updateBtn();
  }

  function toggleMute() {
    if (!playing) {
      startMusic();
      muted = false;
    } else {
      muted        = !muted;
      track.volume = muted ? 0 : 0.7;
    }
    updateBtn();
  }

  function updateBtn() {
    if (!btn) return;
    btn.textContent = (!playing || muted) ? '🔇' : '🔊';
    btn.setAttribute('aria-label', (!playing || muted) ? 'Unmute music' : 'Mute music');
  }

  if (btn) btn.addEventListener('click', toggleMute);

  // Autoplay on first interaction
  document.addEventListener('click',      () => { if (!playing) startMusic(); }, { capture: true, once: true });
  document.addEventListener('touchstart', () => { if (!playing) startMusic(); }, { capture: true, once: true });
  document.addEventListener('keydown',    () => { if (!playing) startMusic(); }, { capture: true, once: true });
})();

// ===================== SEA CREATURE POP-OUT =====================
const SEA_CREATURES = (function() {
  const defs = {
    fish: `<svg width="64" height="48" viewBox="0 0 80 60" fill="none">
      <ellipse cx="35" cy="30" rx="25" ry="18" fill="#FF6B6B"/>
      <polygon points="60,30 80,10 80,50" fill="#FFD700"/>
      <circle cx="20" cy="26" r="4" fill="#fff"/>
      <circle cx="21" cy="26" r="2.5" fill="#1a3a5c"/>
      <circle cx="22" cy="25" r="1" fill="#fff"/>
    </svg>`,

    shark: `<svg width="80" height="50" viewBox="0 0 130 75" fill="none">
      <path d="M6 42 Q22 60 65 60 Q108 60 124 42 Q108 24 65 22 Q22 24 6 42Z" fill="#8FA8BE"/>
      <path d="M18 46 Q65 58 112 46 Q85 56 65 56 Q45 56 18 46Z" fill="#E8EDF2"/>
      <path d="M58 22 Q63 2 75 12 Q70 20 65 22Z" fill="#6E8EA8"/>
      <path d="M114 38 L130 22 L130 58 Z" fill="#6E8EA8"/>
      <circle cx="26" cy="40" r="5" fill="#fff"/>
      <circle cx="27" cy="41" r="3" fill="#1a3a5c"/>
      <path d="M14 46 Q20 52 28 48" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.9"/>
    </svg>`,

    jellyfish: `<svg width="60" height="70" viewBox="0 0 75 90" fill="none">
      <path d="M6 35 Q6 5 37.5 5 Q69 5 69 35 Q69 50 37.5 52 Q6 50 6 35Z" fill="#FFB6C1" opacity="0.9"/>
      <path d="M16 30 Q16 13 37.5 13 Q59 13 59 30 Q59 42 37.5 44 Q16 42 16 30Z" fill="#FF6B6B" opacity="0.25"/>
      <path d="M16 50 Q10 64 14 80" stroke="#FFB6C1" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M28 52 Q26 67 30 82" stroke="#FF6B6B" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M38 52 Q38 68 38 84" stroke="#FFB6C1" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M50 52 Q54 67 48 82" stroke="#FF6B6B" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M60 50 Q66 64 61 80" stroke="#FFB6C1" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="28" cy="30" r="5" fill="#fff" opacity="0.9"/>
      <circle cx="47" cy="30" r="5" fill="#fff" opacity="0.9"/>
      <circle cx="28.5" cy="31" r="3" fill="#9B5DE5"/>
      <circle cx="47.5" cy="31" r="3" fill="#9B5DE5"/>
    </svg>`,

    octopus: `<svg width="64" height="72" viewBox="0 0 90 100" fill="none">
      <ellipse cx="45" cy="38" rx="32" ry="34" fill="#9B5DE5"/>
      <ellipse cx="45" cy="30" rx="22" ry="18" fill="#B47EF5" opacity="0.5"/>
      <circle cx="33" cy="34" r="9" fill="#fff"/>
      <circle cx="57" cy="34" r="9" fill="#fff"/>
      <circle cx="34" cy="35" r="5.5" fill="#1a3a5c"/>
      <circle cx="58" cy="35" r="5.5" fill="#1a3a5c"/>
      <circle cx="35.5" cy="33.5" r="2" fill="#fff"/>
      <circle cx="59.5" cy="33.5" r="2" fill="#fff"/>
      <path d="M36 48 Q45 56 54 48" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M16 64 Q6 76 10 92" stroke="#7B3DC5" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M28 70 Q20 82 24 96" stroke="#9B5DE5" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M40 72 Q38 85 40 98" stroke="#7B3DC5" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M52 72 Q54 85 52 98" stroke="#9B5DE5" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M64 70 Q72 82 68 96" stroke="#7B3DC5" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M74 64 Q84 76 80 92" stroke="#9B5DE5" stroke-width="8" fill="none" stroke-linecap="round"/>
    </svg>`,

    mermaid: `<svg width="54" height="90" viewBox="0 0 90 150" fill="none">
      <path d="M28 88 Q12 118 4 140 Q28 130 45 134 Q62 130 86 140 Q78 118 62 88 Z" fill="#48CAE4"/>
      <path d="M4 140 Q28 127 45 134 Q62 127 86 140 Q64 154 45 148 Q26 154 4 140Z" fill="#0096C7"/>
      <path d="M32 58 Q26 74 28 88 L62 88 Q64 74 58 58 Z" fill="#FF6B6B"/>
      <ellipse cx="37" cy="68" rx="7" ry="5" fill="#FFD700" opacity="0.9"/>
      <ellipse cx="53" cy="68" rx="7" ry="5" fill="#FFD700" opacity="0.9"/>
      <circle cx="45" cy="42" r="22" fill="#FFDBB5"/>
      <path d="M23 36 Q20 10 45 12 Q70 10 67 36 Q60 18 45 20 Q30 18 23 36Z" fill="#9B5DE5"/>
      <path d="M23 36 Q8 54 14 76 Q20 65 26 60" fill="#9B5DE5"/>
      <path d="M67 36 Q82 54 76 76 Q70 65 64 60" fill="#9B5DE5"/>
      <circle cx="37" cy="42" r="5" fill="#fff"/>
      <circle cx="53" cy="42" r="5" fill="#fff"/>
      <circle cx="38" cy="43" r="3" fill="#1a3a5c"/>
      <circle cx="54" cy="43" r="3" fill="#1a3a5c"/>
      <path d="M38 52 Q45 58 52 52" stroke="#FF6B6B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <polygon points="45,14 46.8,19 52,19 48,22 49.5,27 45,24 40.5,27 42,22 38,19 43.2,19" fill="#FFD700"/>
    </svg>`,

    whale: `<svg width="90" height="56" viewBox="0 0 120 75" fill="none">
      <path d="M10 38 Q25 58 70 55 Q105 52 112 38 Q100 20 65 18 Q25 18 10 38Z" fill="#0077B6"/>
      <path d="M20 44 Q70 58 105 44 Q80 54 65 52 Q45 52 20 44Z" fill="#90E0EF" opacity="0.6"/>
      <path d="M105 35 L120 20 L120 52 Z" fill="#005F92"/>
      <path d="M65 18 Q70 5 78 12 Q73 16 68 18Z" fill="#005F92"/>
      <circle cx="28" cy="36" r="6" fill="#fff"/>
      <circle cx="29" cy="37" r="3.5" fill="#1a3a5c"/>
      <circle cx="30" cy="36" r="1.2" fill="#fff"/>
      <path d="M14 44 Q20 50 28 46" stroke="#90E0EF" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M72 8 Q76 2 80 8" stroke="#90E0EF" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`,

    seahorse: `<svg width="44" height="76" viewBox="0 0 55 95" fill="none">
      <path d="M30 24 Q42 36 38 52 Q34 66 26 74 Q18 82 22 90 Q30 94 35 88" stroke="#FFD700" stroke-width="13" fill="none" stroke-linecap="round"/>
      <path d="M30 24 Q42 36 38 52 Q34 66 26 74 Q18 82 22 90 Q30 94 35 88" stroke="#F4A400" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.5"/>
      <ellipse cx="25" cy="18" rx="13" ry="16" fill="#FFD700"/>
      <path d="M14 18 Q6 16 2 22 Q8 26 16 22" fill="#F4A400"/>
      <circle cx="18" cy="14" r="5" fill="#fff"/>
      <circle cx="18" cy="15" r="3" fill="#1a3a5c"/>
      <path d="M26 4 Q30 9 28 14" stroke="#FF6B6B" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M32 7 Q36 12 33 16" stroke="#FF6B6B" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`,

    crab: `<svg width="70" height="52" viewBox="0 0 90 68" fill="none">
      <ellipse cx="45" cy="42" rx="28" ry="20" fill="#FF6B6B"/>
      <ellipse cx="45" cy="38" rx="20" ry="14" fill="#FF8C8C"/>
      <circle cx="34" cy="32" r="6" fill="#fff"/>
      <circle cx="56" cy="32" r="6" fill="#fff"/>
      <circle cx="35" cy="33" r="3.5" fill="#1a3a5c"/>
      <circle cx="57" cy="33" r="3.5" fill="#1a3a5c"/>
      <path d="M38 44 Q45 50 52 44" stroke="#CC3333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Claws -->
      <path d="M17 38 Q5 30 4 20 Q12 18 16 28" fill="#FF6B6B"/>
      <path d="M4 20 Q2 12 10 12 Q14 18 12 24" fill="#CC3333"/>
      <path d="M73 38 Q85 30 86 20 Q78 18 74 28" fill="#FF6B6B"/>
      <path d="M86 20 Q88 12 80 12 Q76 18 78 24" fill="#CC3333"/>
      <!-- Legs -->
      <path d="M28 56 Q22 64 18 62" stroke="#FF6B6B" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M35 58 Q32 66 28 65" stroke="#FF6B6B" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M55 58 Q58 66 62 65" stroke="#FF6B6B" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M62 56 Q68 64 72 62" stroke="#FF6B6B" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>`,
  };

  const keys = Object.keys(defs);

  function spawn(x, y) {
    const name = keys[Math.floor(Math.random() * keys.length)];
    const wrapper = document.createElement('div');
    wrapper.innerHTML = defs[name];
    wrapper.style.cssText = `
      position:fixed; left:${x}px; top:${y}px;
      transform:translate(-50%,-50%) scale(0);
      pointer-events:none; z-index:9998;
      animation: creaturePop 1.8s ease forwards;
    `;
    document.body.appendChild(wrapper);
    setTimeout(() => wrapper.remove(), 1900);
  }

  return { spawn };
})();

// Inject creature keyframe once
(function() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes creaturePop {
      0%   { transform: translate(-50%,-50%) scale(0) rotate(-15deg); opacity: 1; }
      25%  { transform: translate(-50%,-80%) scale(1.2) rotate(8deg);  opacity: 1; }
      55%  { transform: translate(-50%,-110%) scale(1) rotate(-4deg);  opacity: 1; }
      100% { transform: translate(-50%,-150%) scale(0.7) rotate(0deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

// ===================== INTERACTIVE HERO BUBBLES =====================
(function initHeroBubbles() {
  const container = document.getElementById('heroBubbles');
  if (!container) return;

  const COLORS = [
    'rgba(255,255,255,0.22)',
    'rgba(0,180,216,0.32)',
    'rgba(155,93,229,0.28)',
    'rgba(255,107,107,0.25)',
    'rgba(255,215,0,0.28)',
    'rgba(72,202,228,0.30)',
    'rgba(255,182,193,0.28)',
  ];

  const MESSAGES = [
    'Splish splash! 🐠',
    'Bubble burst! 💦',
    'Yay! 🧜‍♀️',
    'Under the sea! 🐚',
    'So exciting! ✨',
    'Woohoo! 🎉',
    'Keep going! 🌊',
    'Pop pop pop! 🫧',
    'Almost there! 🌟',
    'One more! 🎂',
  ];

  // Pop gate state
  const REQUIRED  = 4;
  let popCount    = 0;
  let gateOpened  = false;

  const popCountEl  = document.getElementById('popCount');
  const popBarFill  = document.getElementById('popBarFill');
  const pbbEls      = [0,1,2,3].map(i => document.getElementById('pbb'+i));
  const popGateEl   = document.getElementById('popGate');
  const revealMsgEl = document.getElementById('revealMsg');
  const detailsSec  = document.getElementById('detailsSection');
  const rsvpSec     = document.getElementById('rsvp');

  const TOTAL = window.innerWidth <= 480 ? 5 : 8;
  for (let i = 0; i < TOTAL; i++) spawnBubble();

  function spawnBubble() {
    const el = document.createElement('div');
    el.className = 'hero-bubble';
    const size = 70 + Math.random() * 90;
    el.style.width  = size + 'px';
    el.style.height = size + 'px';
    el.style.left   = (1 + Math.random() * 90) + '%';
    el.style.top    = (3 + Math.random() * 88) + '%';
    el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.setProperty('--dur',   (4 + Math.random() * 5).toFixed(1) + 's');
    el.style.setProperty('--delay', (Math.random() * 3).toFixed(1) + 's');

    function onPop(e) {
      e.preventDefault();
      if (el.classList.contains('popped')) return;
      el.classList.add('popped');
      el.removeEventListener('click', onPop);
      el.removeEventListener('touchstart', onPop);
      Audio.pop();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) || window.innerWidth / 2;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) || window.innerHeight / 2;
      SEA_CREATURES.spawn(cx, cy);

      if (!gateOpened) {
        popCount = Math.min(popCount + 1, REQUIRED);
        updateGate();
        if (popCount < REQUIRED) {
          showMessage(e, MESSAGES[Math.floor(Math.random() * (MESSAGES.length - 2))]);
        }
        if (popCount >= REQUIRED) openGate();
      } else {
        showMessage(e, MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      }

      setTimeout(() => { el.remove(); spawnBubble(); }, 380);
    }

    el.addEventListener('click', onPop);
    el.addEventListener('touchstart', onPop, { passive: false });
    container.appendChild(el);
  }

  function updateGate() {
    if (popCountEl)  popCountEl.textContent = popCount;
    if (popBarFill)  popBarFill.style.width = (popCount / REQUIRED * 100) + '%';
    if (pbbEls[popCount - 1]) pbbEls[popCount - 1].classList.add('popped');
  }

  function openGate() {
    if (gateOpened) return;
    gateOpened = true;

    if (popGateEl)   popGateEl.hidden  = true;
    if (revealMsgEl) revealMsgEl.hidden = false;

    setTimeout(() => {
      [detailsSec, rsvpSec].forEach(el => {
        if (!el) return;
        el.classList.remove('locked');
        el.classList.add('revealed');
      });
      setTimeout(() => detailsSec && detailsSec.scrollIntoView({ behavior: 'smooth' }), 200);
    }, 900);
  }

  function showMessage(e, text) {
    const msg = document.createElement('div');
    msg.className = 'pop-msg';
    msg.textContent = text;
    const x = (e.touches ? e.touches[0].clientX : e.clientX) || window.innerWidth / 2;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) || window.innerHeight / 2;
    msg.style.left = Math.min(x - 60, window.innerWidth - 220) + 'px';
    msg.style.top  = (y - 20) + 'px';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 1450);
  }
})();
