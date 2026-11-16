/* Tonight's Moon: phase calculated in the browser from the mean synodic month,
   measured from the new moon of 6 Jan 2000, 18:14 UTC. Accurate to about a day. */
(() => {
  'use strict';
  const root = document.getElementById('moonPhase');
  if (!root) return;

  const SYNODIC = 29.530588853;
  const REF = Date.UTC(2000, 0, 6, 18, 14);
  const DAY = 86400000;
  const now = Date.now();
  const age = (((now - REF) / DAY) % SYNODIC + SYNODIC) % SYNODIC;
  const p = age / SYNODIC;                      // 0 new, 0.5 full
  const lit = (1 - Math.cos(2 * Math.PI * p)) / 2;

  const names = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
                 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  const name = names[Math.floor(((p + 1 / 16) % 1) * 8)];

  const daysToFull = ((SYNODIC / 2 - age) + SYNODIC) % SYNODIC;
  const nextFull = new Date(now + daysToFull * DAY);
  const fullText = daysToFull < 1 ? 'tonight' : nextFull.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

  // Lit area: outer semicircle on the lit side plus an elliptical terminator.
  const r = 40, cx = 50, top = 10, bottom = 90;
  const k = Math.cos(2 * Math.PI * p);
  const rx = Math.abs(k) * r;
  const waxing = p < 0.5;
  const d = waxing
    ? `M${cx},${top} A${r},${r} 0 0 1 ${cx},${bottom} A${rx},${r} 0 0 ${k > 0 ? 0 : 1} ${cx},${top}Z`
    : `M${cx},${top} A${r},${r} 0 0 0 ${cx},${bottom} A${rx},${r} 0 0 ${k > 0 ? 1 : 0} ${cx},${top}Z`;

  root.querySelector('.moon-lit').setAttribute('d', d);
  root.querySelector('.moon-name').textContent = name;
  root.querySelector('.moon-pct').textContent = `${Math.round(lit * 100)}% lit · day ${Math.floor(age) + 1} of 29.5`;
  root.querySelector('.moon-next').textContent = `Next full moon: ${fullText}`;
  root.setAttribute('aria-label', `Tonight's moon: ${name}, ${Math.round(lit * 100)} percent lit`);
  root.hidden = false;
})();
