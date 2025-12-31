// Elements
const phraseEl = document.getElementById('phrase');
const buttonEl = document.getElementById('actionButton');
const background = document.getElementById('background');

// Initial state
let buttonText = Math.random() < 0.5 ? 'Speel!' : 'Joue !';
buttonEl.textContent = buttonText;

// --- Random hover color setup for the action button ---
// Use the same palette family as your circles (excluding blue so it "pops" against the blue base)
const hoverColors = ['#1D9A4E', '#E09E2A', '#C63737']; // green, yellow, red

// Optional: avoid repeating the same color back-to-back
let lastHoverColor = null;

function pickHoverColor() {
  let c;
  do {
    c = hoverColors[Math.floor(Math.random() * hoverColors.length)];
  } while (hoverColors.length > 1 && c === lastHoverColor);
  lastHoverColor = c;
  return c;
}

// Randomize on mouse hover
buttonEl.addEventListener('mouseenter', () => {
  buttonEl.style.setProperty('--hover-color', pickHoverColor());
});

// Also randomize on keyboard focus (accessibility)
buttonEl.addEventListener('focus', () => {
  buttonEl.style.setProperty('--hover-color', pickHoverColor());
});

// Data
const group1SetA = ['Duim', 'Wijsvinger', 'Middelvinger', 'Ringvinger', 'Pink'];
const group1SetB = ['Pouce', 'Index', 'Majeur', 'Annulaire', 'Auriculaire'];

const group2SetA = ['blauw', 'geel', 'rood', 'groen'];
const group2SetB = ['blue', 'jaune', 'rouge', 'vert'];

const circleColors = ['#1D9A4E', '#2E5CA8', '#E09E2A', '#C63737']; // green, blue, yellow, red

/* -------------------- Responsive background circles -------------------- */

/**
 * Read numeric CSS custom properties (e.g., --circle-gap).
 */
function getComputedNumber(el, prop, fallback) {
  const v = getComputedStyle(el).getPropertyValue(prop).trim();
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Read the current column count from :root --cols (updated by media queries).
 */
function getCols() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--cols').trim();
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : 8; // default fallback
}

/**
 * Render just enough circles to fill the viewport-sized grid.
 * Colors are assigned by COLUMN → solid color columns.
 */
function renderCircles() {
  const cols = getCols();
  const gap = getComputedNumber(background, '--circle-gap', 8);

  const containerWidth = background.clientWidth;
  const containerHeight = background.clientHeight;

  // Gap space between columns
  const totalGapWidth = Math.max(0, cols - 1) * gap;
  const colWidth = (containerWidth - totalGapWidth) / cols;

  // Each circle has aspect-ratio: 1 → height equals colWidth
  const rowStride = colWidth + gap;
  const rows = Math.ceil(containerHeight / rowStride);

  const needed = cols * rows;
  const current = background.childElementCount;

  // 1) Adjust DOM count (add/remove) to match "needed"
  if (current > needed) {
    for (let i = current - 1; i >= needed; i--) {
      background.removeChild(background.lastChild);
    }
  } else if (current < needed) {
    const fragment = document.createDocumentFragment();
    for (let i = current; i < needed; i++) {
      const div = document.createElement('div');
      div.className = 'circle';
      fragment.appendChild(div);
    }
    background.appendChild(fragment);
  }

  // 2) Ensure colors are assigned by COLUMN (not by item index),
  //    and update colors whenever cols change.
  const children = background.children;
  for (let k = 0; k < children.length; k++) {
    const col = k % cols; // row-major placement → column = index % cols
    const color = circleColors[col % circleColors.length];
    children[k].style.backgroundColor = color;
  }
} // ← Close renderCircles()

// Initial render & dynamic updates
window.addEventListener('load', renderCircles);
window.addEventListener('resize', renderCircles);
const bgResizeObserver = new ResizeObserver(() => renderCircles());
bgResizeObserver.observe(background);

// Button handler
buttonEl.addEventListener('click', () => {
  // Toggle button text
  buttonText = buttonText === 'Speel!' ? 'Joue !' : 'Speel!';
  buttonEl.textContent = buttonText;

  const useOption1 = Math.random() < 0.5;
  let finger, color;

  if (useOption1) {
    finger = group1SetA[Math.floor(Math.random() * group1SetA.length)];
    color = group2SetB[Math.floor(Math.random() * group2SetB.length)];
  } else {
    finger = group1SetB[Math.floor(Math.random() * group1SetB.length)];
    color = group2SetA[Math.floor(Math.random() * group2SetA.length)];
  }

  phraseEl.textContent = `${finger} - ${color}`;
  }); // ← Close addEventListener
