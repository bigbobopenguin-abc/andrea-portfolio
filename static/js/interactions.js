/* Interactive touches: magnetic buttons, card tilt,
   word-by-word headings and a small easter egg. Desktop pointer only, and
   everything is skipped when the visitor prefers reduced motion. */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduce) return;

  /* ---------- Headings slide in word by word (all devices) ---------- */
  const headings = document.querySelectorAll('.section h2, .aw-section-head h2, .lunar-section h2');
  const splitWords = el => {
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.className = 'wi'; i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(el);
    el.querySelectorAll('.wi').forEach((w, n) => { w.style.transitionDelay = `${Math.min(n, 8) * 55}ms`; });
    el.classList.add('split-words');
  };
  headings.forEach(splitWords);
  const hio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('words-in'); hio.unobserve(e.target); }
  }), { threshold: .4 });
  headings.forEach(h => hio.observe(h));

  if (!finePointer) return;

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll('.btn, .contact-pill, .carousel-arrow, .fp-arrow, .contact-social-icon, .hero-sticker').forEach(el => {
    const strength = el.matches('.carousel-arrow, .fp-arrow') ? .35 : .22;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
      el.style.translate = `${x * strength}px ${y * strength}px`;
    });
    el.addEventListener('mouseleave', () => { el.style.translate = ''; });
  });

  /* ---------- 3D tilt ---------- */
  const tilt = (el, max, extra = '') => {
    el.classList.add('tiltable');
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) ${extra}`;
      el.style.setProperty('--gx', `${(px + .5) * 100}%`); el.style.setProperty('--gy', `${(py + .5) * 100}%`);
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  };
  document.querySelectorAll('.all-projects-page .project-card').forEach(c => tilt(c, 6, 'translateY(-6px)'));
  document.querySelectorAll('.aw-card').forEach(c => tilt(c, 5, 'translateY(-4px)'));
  document.querySelectorAll('.about-portrait img').forEach(c => tilt(c, 10, 'scale(1.02)'));

  /* ---------- Easter egg: type "moon" anywhere ---------- */
  let typed = '';
  window.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    typed = (typed + (e.key || '')).slice(-4).toLowerCase();
    if (typed !== 'moon') return;
    const rocket = document.createElement('div');
    rocket.className = 'egg-rocket'; rocket.textContent = '🚀';
    rocket.setAttribute('aria-hidden', 'true');
    document.body.appendChild(rocket);
    const toast = document.createElement('div');
    toast.className = 'egg-toast'; toast.setAttribute('role', 'status');
    toast.textContent = 'Outpost 07 says hi from the Moon 🌙';
    document.body.appendChild(toast);
    setTimeout(() => { rocket.remove(); toast.remove(); }, 3200);
  });
})();
