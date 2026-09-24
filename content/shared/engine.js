// Deterministic scene timeline for the reels. The page defines, before loading this file:
//   window.SCENES   = [{ id: "s1", dur: 5.5 }, ...]   (ids of <section class="scene">)
//   window.UPDATERS = { s1(t) {...}, ... }             (optional per-scene animation, t = seconds into scene)
// Elements with data-in="<sec>" fade/slide in at that offset. render(t) paints the frame at time t.
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (x) => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3);
const lerp = (a, b, p) => a + (b - a) * p;
const $ = (id) => document.getElementById(id);

// Phase sequencer: phases [{d, from, to, ...}] -> current phase index i, progress p, eased value v
function phaseAt(phases, t) {
  const cyc = phases.reduce((a, p) => a + p.d, 0);
  let tt = ((t % cyc) + cyc) % cyc;
  for (let i = 0; i < phases.length; i++) {
    const ph = phases[i];
    if (tt < ph.d) { const p = tt / ph.d; return { i, p, v: lerp(ph.from, ph.to, ease(p)), ph }; }
    tt -= ph.d;
  }
  const last = phases.length - 1;
  return { i: last, p: 1, v: phases[last].to, ph: phases[last] };
}

// Slow "breathing" orb used on hook and outro scenes
function breatheOrb(orbId, haloId, t) {
  const b = 0.5 - 0.5 * Math.cos(t * 2 * Math.PI / 5);
  $(orbId).style.transform = `scale(${0.85 + 0.25 * b})`;
  $(haloId).style.transform = `scale(${1.05 + 0.4 * b})`;
  $(haloId).style.opacity = 0.9 - 0.6 * b;
}

(function () {
  const SCENES = window.SCENES, UPDATERS = window.UPDATERS || {};
  const FADE = 0.55;
  let acc = 0;
  for (const s of SCENES) {
    s.start = acc; acc += s.dur;
    s.el = $(s.id);
    s.items = [...s.el.querySelectorAll("[data-in]")];
  }
  const TOTAL = acc;

  function render(t) {
    $("b1").style.transform = `translate(${-200 + 80 * Math.sin(t * .23)}px, ${-120 + 60 * Math.cos(t * .19)}px)`;
    $("b2").style.transform = `translate(${560 + 70 * Math.cos(t * .21)}px, ${700 + 90 * Math.sin(t * .17)}px)`;
    $("b3").style.transform = `translate(${-80 + 90 * Math.sin(t * .15 + 1)}px, ${1400 + 70 * Math.cos(t * .2)}px)`;
    $("prog").style.width = (clamp(t / TOTAL) * 100) + "%";

    for (let n = 0; n < SCENES.length; n++) {
      const s = SCENES[n];
      const local = t - s.start;
      if (local < -FADE || local >= s.dur) { s.el.style.display = "none"; continue; }
      s.el.style.display = "block";
      const fin = n === 0 ? 1 : ease((local + FADE) / FADE);
      const fout = n === SCENES.length - 1 ? 1 : 1 - ease((local - (s.dur - FADE)) / FADE);
      s.el.style.opacity = Math.min(fin, fout);
      const lt = Math.max(local, 0);
      for (const el of s.items) {
        const start = parseFloat(el.dataset.in);
        const p = easeOut((lt - start) / 0.8);
        el.style.opacity = n === 0 && start === 0 ? 1 : p;
        el.style.transform = `translateY(${(1 - p) * 36}px)`;
      }
      UPDATERS[s.id]?.(lt);
    }
  }
  window.TOTAL = TOTAL;
  window.render = render;
  render(0);
})();
