/* Portfolio image viewer. Standalone and isolated from main.js. */
(() => {
  'use strict';
  if (document.getElementById('apv-overlay')) return;
  const script = document.currentScript;
  if (!script) return;
  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.href = new URL('../css/project-image-viewer.css', script.src).href;
  document.head.appendChild(styles);
  const scope = document.querySelector('main') || document.body;
  const images = [...scope.querySelectorAll('img')].filter(img => !img.closest('nav,header,footer'));
  if (!images.length) return;
  const overlay = document.createElement('div');
  overlay.id = 'apv-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-label','Project image viewer');
  overlay.setAttribute('aria-hidden','true');
  const layout = document.createElement('div');
  layout.className = 'apv-layout';
  const large = document.createElement('img');
  large.className = 'apv-image';
  large.alt = '';
  const caption = document.createElement('p');
  caption.className = 'apv-caption';
  const direct = document.createElement('a');
  direct.className = 'apv-openfile';
  direct.textContent = 'Open original image ↗';
  direct.target = '_blank';
  direct.rel = 'noopener noreferrer';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'apv-close';
  close.setAttribute('aria-label', 'Close image viewer');
  close.textContent = '×';
  layout.append(large,caption,direct);
  overlay.append(layout,close);
  document.body.appendChild(overlay);
  let lastFocus = null;
  function getCaption(img) {
    const figcaption = img.closest('figure')?.querySelector('figcaption');
    if (figcaption) return figcaption.textContent.trim();
    const card = img.closest('.journey-row, .dpv-team-case, .lunar-shot, .lunar-card');
    const heading = card?.querySelector('h3, h4');
    return heading?.textContent.trim() || img.alt || 'Project image';
  }
  function open(img) {
    const url = img.currentSrc || img.src;
    if (!url) return;
    lastFocus = document.activeElement;
    large.src = url;
    large.alt = img.alt || 'Project image';
    caption.textContent = getCaption(img);
    direct.href = url;
    overlay.classList.add('apv-open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.setProperty('--apv-previous-overflow', document.body.style.overflow);
    document.body.style.overflow = 'hidden';
    close.focus();
  }
  function dismiss() {
    overlay.classList.remove('apv-open');
    overlay.setAttribute('aria-hidden','true');
    large.removeAttribute('src');
    document.body.style.overflow = document.body.style.getPropertyValue('--apv-previous-overflow') || '';
    document.body.style.removeProperty('--apv-previous-overflow');
    if (lastFocus && lastFocus.isConnected) lastFocus.focus();
  }
  close.addEventListener('click', dismiss);
  overlay.addEventListener('click', event => { if (event.target === overlay) dismiss(); });
  document.addEventListener('keydown', event => {
    if (!overlay.classList.contains('apv-open')) return;
    if (event.key === 'Escape') dismiss();
    if (event.key === 'Tab') { event.preventDefault(); (document.activeElement === close ? direct : close).focus(); }
  });
  images.forEach(img => {
    img.classList.add('apv-image-target');
    img.setAttribute('tabindex','0');
    img.setAttribute('role','button');
    img.setAttribute('aria-label', 'View full image: ' + (img.alt || 'Project screenshot'));
    img.addEventListener('click', event => {
      event.preventDefault(); event.stopPropagation(); open(img);
    });
    img.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(img); }
    });
  });
})();
