
// ===== Elements
const phraseEl = document.getElementById('phrase');
const buttonEl = document.getElementById('actionButton');

// Background container (created in Step 2)
function ensureBg() {
  let bg = document.getElementById('bg-circles');
 ',  if (!bg) {
    zIndex: '0',
    pointerEvents: 'none',
    overflow: 'hidden'
  });
  return bg;
}

// ===== Initial state
let buttonText = Math.random() < 0.5 ? 'Speel!' : 'Joue !';
buttonEl.textContent = buttonText;

// ===== Data

    bg = document.createElement('div');
    bg.id = 'bg-circles';
    document.body.insertBefore(bg, document.body.firstChild);
  }
  // Safety: enforce background behavior in case CSS is missing
  Object.assign(bg.style, {
    position: 'fixed',
