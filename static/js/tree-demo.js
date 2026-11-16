/* "Try the model": runs Andrea's tuned Gradient Boosting model and baseline
   Decision Tree in the browser. Both were retrained from the project notebook
   pipeline and exported to static/js/pd-model.js. Educational only. */
(() => {
  'use strict';
  const root = document.getElementById('treeDemo');
  const M = window.PD_MODEL;
  if (!root || !M) return;

  const F = M.gb.features;
  const idx = Object.fromEntries(F.map((f, i) => [f, i]));
  const HINTS = {
    'PPE': 'Pitch period entropy', 'MDVP:Fo(Hz)': 'Average vocal pitch', 'RPDE': 'Recurrence period density entropy',
    'NHR': 'Noise-to-harmonics ratio', 'MDVP:Fhi(Hz)': 'Highest vocal pitch', 'spread1': 'Pitch variation (nonlinear)',
    'D2': 'Signal complexity', 'MDVP:PPQ': 'Pitch perturbation quotient', 'Jitter:DDP': 'Cycle-to-cycle pitch jitter',
    'spread2': 'Pitch variation (nonlinear)', 'MDVP:Flo(Hz)': 'Lowest vocal pitch', 'MDVP:Shimmer(dB)': 'Loudness variation (dB)',
    'MDVP:Shimmer': 'Loudness variation', 'MDVP:RAP': 'Relative pitch perturbation'
  };
  // Sliders: the Gradient Boosting top 10 plus the other features the Decision Tree uses.
  const dtUsed = new Set(M.dt.f.filter(f => f >= 0).map(f => F[f]));
  const byImp = Object.keys(M.importance);
  const shown = [...byImp.slice(0, 10), ...byImp.slice(10).filter(f => dtUsed.has(f))];

  const x = M.medians.slice();
  let current = null; // loaded test recording, if any

  const decimalsFor = (min, max) => { const span = max - min; return span >= 50 ? 1 : span >= 5 ? 2 : span >= .5 ? 3 : 4; };
  const fmt = (f, v) => Number(v).toFixed(decimalsFor(...M.ranges[f]));

  const controls = root.querySelector('.td-controls');
  const rows = {};
  shown.forEach(f => {
    const [min, max] = M.ranges[f];
    const row = document.createElement('label');
    row.className = 'td-row'; row.dataset.f = f;
    row.innerHTML = '<span class="td-name"><strong></strong><small></small></span><input type="range"><output></output>';
    row.querySelector('strong').textContent = f;
    row.querySelector('small').textContent = HINTS[f] || '';
    const input = row.querySelector('input');
    Object.assign(input, { min, max, step: (max - min) / 400 });
    input.setAttribute('aria-label', `${f} (${HINTS[f] || 'voice measurement'})`);
    input.addEventListener('input', () => { x[idx[f]] = parseFloat(input.value); markEdited(); sync(f); run(); });
    controls.appendChild(row);
    rows[f] = row;
  });
  const sync = f => {
    const row = rows[f], v = x[idx[f]];
    row.querySelector('input').value = v;
    row.querySelector('output').textContent = fmt(f, v);
  };

  // ---- Models ----
  const gbProb = v => {
    let s = M.gb.init;
    for (const t of M.gb.trees) {
      let n = 0;
      while (t.l[n] !== -1) n = v[t.f[n]] <= t.t[n] ? t.l[n] : t.r[n];
      s += M.gb.lr * t.v[n];
    }
    return 1 / (1 + Math.exp(-s));
  };
  const dtRun = v => {
    const T = M.dt; let n = 0; const steps = [];
    while (T.l[n] !== -1) {
      const f = F[T.f[n]], yes = v[T.f[n]] <= T.t[n];
      steps.push({ f, v: v[T.f[n]], t: T.t[n], yes });
      n = yes ? T.l[n] : T.r[n];
    }
    const [no, pd] = T.n[n];
    return { pd: pd > no, no, yes: pd, steps };
  };

  // ---- Output ----
  const gbCard = root.querySelector('.td-gb'), dtCard = root.querySelector('.td-dt');
  const pathEl = root.querySelector('.td-path'), source = root.querySelector('.td-source');
  const label = p => p ? "Parkinson's" : "No Parkinson's";

  function run() {
    const p = gbProb(x), gbPd = p >= .5;
    gbCard.classList.toggle('is-pd', gbPd);
    gbCard.querySelector('.td-verdict').textContent = label(gbPd);
    gbCard.querySelector('.td-prob').textContent = p > .999 ? '>99.9%' : p < .001 ? '<0.1%' : `${(p * 100).toFixed(1)}%`;
    gbCard.querySelector('.td-bar i').style.width = `${(p * 100).toFixed(1)}%`;

    const d = dtRun(x), total = d.no + d.yes;
    dtCard.classList.toggle('is-pd', d.pd);
    dtCard.querySelector('.td-verdict').textContent = label(d.pd);
    dtCard.querySelector('.td-leaf').textContent =
      `${total} of the 156 training recordings ended at this leaf; ${d.pd ? d.yes : d.no} were labelled “${label(d.pd)}”.`;
    pathEl.innerHTML = '';
    d.steps.forEach((s, i) => {
      const li = document.createElement('li');
      li.innerHTML = '<span class="td-q"></span><span class="td-a"></span>';
      li.querySelector('.td-q').textContent = `${s.f} ≤ ${+s.t.toFixed(4)}?`;
      li.querySelector('.td-a').textContent = `${fmt(s.f, s.v)} → ${s.yes ? 'yes' : 'no'}`;
      li.style.animationDelay = `${i * 50}ms`;
      pathEl.appendChild(li);
    });
    const used = new Set(d.steps.map(s => s.f));
    Object.entries(rows).forEach(([f, r]) => r.classList.toggle('is-used', used.has(f)));

    if (current) {
      const ok = m => m === (current.y === 1);
      source.querySelector('.td-check').textContent =
        `Actual label: ${label(current.y === 1)} · Gradient Boosting ${ok(gbPd) ? '✓ correct' : '✗ wrong'} · Decision Tree ${ok(d.pd) ? '✓ correct' : '✗ wrong'}`;
    }
  }

  function markEdited() {
    if (current && !current.edited) { current.edited = true; source.querySelector('.td-src-title').textContent += ' (edited)'; }
  }

  function loadRecord(rec) {
    current = rec ? { ...rec, edited: false } : null;
    const vals = rec ? rec.x : M.medians;
    vals.forEach((v, i) => { x[i] = v; });
    shown.forEach(sync);
    source.hidden = !rec;
    if (rec) {
      source.querySelector('.td-src-title').textContent = `Held-out test recording ${rec.id + 1} of ${M.tests.length}`;
    }
    run();
  }

  let order = M.tests.map((_, i) => i).sort(() => Math.random() - .5), pos = 0;
  root.querySelector('.td-load').addEventListener('click', () => { loadRecord(M.tests[order[pos++ % order.length]]); });
  root.querySelector('.td-reset').addEventListener('click', () => loadRecord(null));

  root.querySelector('.td-gb-metrics').textContent = `${M.metrics.gb[0]}% test accuracy · ${M.metrics.gb[3]}% F1`;
  root.querySelector('.td-dt-metrics').textContent = `${M.metrics.dt[0]}% test accuracy · ${M.metrics.dt[3]}% F1`;
  root.querySelector('.td-fixed').textContent =
    `The other ${F.length - shown.length} measurements stay at ${'the loaded recording’s values, or the training medians'}.`;
  loadRecord(null);
})();
