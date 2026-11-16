/* "Try the model": Andrea's baseline Decision Tree (sklearn, random_state=42),
   rebuilt from the plotted tree in the project notebook. Thresholds are the
   values shown in the plot (rounded to 3 decimal places). Educational only. */
(() => {
  'use strict';
  const root = document.getElementById('treeDemo');
  if (!root) return;

  // Slider ranges follow the public UCI Parkinson's voice dataset.
  const FEATURES = [
    { key: 'PPE', label: 'PPE', hint: 'Pitch period entropy', min: 0.04, max: 0.53, step: 0.001, value: 0.194 },
    { key: 'NHR', label: 'NHR', hint: 'Noise-to-harmonics ratio', min: 0.0005, max: 0.32, step: 0.0005, value: 0.0117 },
    { key: 'Fo', label: 'MDVP:Fo(Hz)', hint: 'Average vocal pitch', min: 88, max: 261, step: 0.1, value: 148.8 },
    { key: 'Flo', label: 'MDVP:Flo(Hz)', hint: 'Lowest vocal pitch', min: 65, max: 240, step: 0.1, value: 104.3 },
    { key: 'ShimmerDb', label: 'MDVP:Shimmer(dB)', hint: 'Loudness variation (dB)', min: 0.08, max: 1.31, step: 0.001, value: 0.282 },
    { key: 'Shimmer', label: 'MDVP:Shimmer', hint: 'Loudness variation', min: 0.009, max: 0.12, step: 0.0005, value: 0.0297 },
    { key: 'PPQ', label: 'MDVP:PPQ', hint: 'Pitch perturbation quotient', min: 0.0009, max: 0.0196, step: 0.0001, value: 0.0027 },
    { key: 'DDP', label: 'Jitter:DDP', hint: 'Cycle-to-cycle pitch jitter', min: 0.002, max: 0.065, step: 0.0005, value: 0.0075 },
    { key: 'RAP', label: 'MDVP:RAP', hint: 'Relative pitch perturbation', min: 0.0006, max: 0.0215, step: 0.0001, value: 0.0025 },
    { key: 'D2', label: 'D2', hint: 'Signal complexity', min: 1.4, max: 3.7, step: 0.01, value: 2.36 }
  ];
  const byKey = Object.fromEntries(FEATURES.map(f => [f.key, f]));

  const leaf = (no, yes) => ({ leaf: true, no, yes });
  const split = (key, t, left, right, no, yes) => ({ key, t, left, right, no, yes });
  const TREE =
    split('PPE', 0.134,
      split('PPE', 0.106,
        leaf(17, 0),
        split('PPE', 0.118,
          leaf(0, 8),
          split('Flo', 125.969, leaf(9, 0), leaf(0, 1), 9, 1),
          9, 9),
        26, 9),
      split('NHR', 0.005,
        split('PPQ', 0.002,
          split('DDP', 0.005, leaf(0, 1), leaf(6, 0), 6, 1),
          leaf(0, 4),
          6, 5),
        split('ShimmerDb', 0.19,
          split('Fo', 117.986,
            split('D2', 1.872, leaf(0, 1), leaf(4, 0), 4, 1),
            split('Shimmer', 0.022, leaf(0, 20), leaf(1, 0), 1, 20),
            5, 21),
          split('Fo', 208.799,
            leaf(0, 82),
            split('RAP', 0.003, leaf(0, 1), leaf(1, 0), 1, 1),
            1, 83),
          6, 104),
        12, 109),
      38, 118);

  const decimals = step => (String(step).split('.')[1] || '').length;
  const fmt = (f, v) => Number(v).toFixed(Math.max(decimals(f.step), 0));

  const controls = root.querySelector('.td-controls');
  const pathEl = root.querySelector('.td-path');
  const result = root.querySelector('.td-result');
  const values = {};

  FEATURES.forEach(f => {
    values[f.key] = f.value;
    const row = document.createElement('label');
    row.className = 'td-row'; row.dataset.key = f.key;
    row.innerHTML = `<span class="td-name"><strong></strong><small></small></span>
      <input type="range"><output></output>`;
    row.querySelector('strong').textContent = f.label;
    row.querySelector('small').textContent = f.hint;
    const input = row.querySelector('input');
    Object.assign(input, { min: f.min, max: f.max, step: f.step, value: f.value });
    input.setAttribute('aria-label', `${f.label} (${f.hint})`);
    const out = row.querySelector('output');
    out.textContent = fmt(f, f.value);
    input.addEventListener('input', () => {
      values[f.key] = parseFloat(input.value);
      out.textContent = fmt(f, input.value);
      run();
    });
    controls.appendChild(row);
  });

  root.querySelector('.td-reset').addEventListener('click', () => {
    controls.querySelectorAll('.td-row').forEach(row => {
      const f = byKey[row.dataset.key], input = row.querySelector('input');
      input.value = f.value; values[f.key] = f.value;
      row.querySelector('output').textContent = fmt(f, f.value);
    });
    run();
  });

  function run() {
    let node = TREE; const steps = [];
    while (!node.leaf) {
      const f = byKey[node.key], v = values[node.key], goLeft = v <= node.t;
      steps.push({ f, v, t: node.t, goLeft });
      node = goLeft ? node.left : node.right;
    }
    const used = new Set(steps.map(s => s.f.key));
    controls.querySelectorAll('.td-row').forEach(r => r.classList.toggle('is-used', used.has(r.dataset.key)));

    pathEl.innerHTML = '';
    steps.forEach((s, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="td-q"></span><span class="td-a"></span>`;
      li.querySelector('.td-q').textContent = `${s.f.label} ≤ ${s.t}?`;
      li.querySelector('.td-a').textContent = `${fmt(s.f, s.v)} → ${s.goLeft ? 'yes' : 'no'}`;
      li.style.animationDelay = `${i * 60}ms`;
      pathEl.appendChild(li);
    });

    const pd = node.yes > node.no;
    const total = node.no + node.yes;
    result.classList.toggle('is-pd', pd);
    result.querySelector('.td-verdict').textContent = pd ? "Parkinson's" : "No Parkinson's";
    result.querySelector('.td-leaf').textContent =
      `All ${total} training record${total === 1 ? '' : 's'} that reached this leaf ${total === 1 ? 'was' : 'were'} labelled “${pd ? "Parkinson's" : "No Parkinson's"}”.`;
    result.querySelector('.td-depth').textContent = `${steps.length} question${steps.length === 1 ? '' : 's'} deep`;
  }
  run();
})();
