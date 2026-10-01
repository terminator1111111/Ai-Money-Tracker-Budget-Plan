/* SI Money Tracker: English / Espanol language choice.
 *
 * Progressive enhancement only. Every page already carries plain
 * <a hreflang> links to its other-language twin; they work with JavaScript
 * off and crawlers follow them. This file adds two things on top:
 *
 * 1. Memory. Clicking any [data-lang-link] link, or a choice on the card
 *    below, stores "en" or "es" in localStorage under "amtp.lang". Every read
 *    and write is wrapped in try/catch, so a private window or blocked
 *    storage only means the choice is not remembered. The current #section
 *    carries over, because both languages use the same section ids.
 *
 * 2. The first-visit chooser. On a page that opts in with
 *    <html data-lang-splash> (the two home pages), and only while no choice
 *    is stored, a small card rises at the bottom of the screen:
 *    "Choose your language / Elige tu idioma", English | Espanol.
 *    It is banner-sized, never a full-screen overlay, so the page stays
 *    readable and usable behind it. Google Search Central: "Don't obscure the
 *    entire page with interstitials"
 *    (developers.google.com/search/docs/appearance/avoid-intrusive-interstitials).
 *    It never redirects on its own. Google: "Avoid automatically redirecting
 *    users from one language version of a site to a different language
 *    version" (developers.google.com/search/docs/specialty/international/
 *    managing-multi-regional-sites). The card carries data-nosnippet, so its
 *    text never becomes a search snippet.
 *
 * The card's background is one small WebGL fragment shader: two colour
 * fields, English on the left in accentSecondary and Espanol on the right in
 * accentViolet, meet at a slowly drifting seam lit in AMTP Green, and the
 * seam leans toward whichever choice is hovered or focused. The colours are
 * the Babylon Pixel Guide's dark-mode family, blended in OKLab with Bjorn
 * Ottosson's published matrices (bottosson.github.io/posts/oklab/) and
 * encoded with the sRGB transfer function from the CSS Color 4 sample code
 * (drafts.csswg.org/css-color-4/conversions.js), so the blend is
 * perceptually even. Each OKLab constant round-trips to its brand hex.
 *
 * Without WebGL, or on a software-only GPU (failIfMajorPerformanceCaveat),
 * the card keeps a static CSS gradient and the same plain links. Under
 * prefers-reduced-motion it shows one still frame with no entrance movement.
 * The loop runs at about 30 fps, only while the card is open and the tab is
 * visible, and the GL context is released when the card closes.
 */
(function () {
  'use strict';

  var KEY = 'amtp.lang';
  var doc = document;
  var root = doc.documentElement;
  var pageLang = /^es\b/i.test(root.getAttribute('lang') || '') ? 'es' : 'en';

  function readChoice() {
    try {
      var v = window.localStorage.getItem(KEY);
      return v === 'en' || v === 'es' ? v : null;
    } catch (e) {
      return null;
    }
  }

  function writeChoice(lang) {
    try {
      window.localStorage.setItem(KEY, lang);
    } catch (e) {
      /* Storage blocked: the choice is simply not remembered. */
    }
  }

  // The same page in the other language, read from this page's own hreflang
  // tags. Path only, so it also works on preview deployments and local servers.
  function pathFor(lang) {
    var fallback = lang === 'es' ? '/es' : '/';
    var link = doc.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
    if (!link) return fallback;
    try {
      return new URL(link.href, location.href).pathname;
    } catch (e) {
      return fallback;
    }
  }

  function withHash(a) {
    if (location.hash) a.setAttribute('href', a.getAttribute('href').split('#')[0] + location.hash);
  }

  // 1. Remember choices made with the static language links on every page.
  doc.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-lang-link]') : null;
    if (!a) return;
    writeChoice(a.getAttribute('data-lang-link'));
    withHash(a);
  });

  // 2. First-visit chooser, home pages only.
  if (!root.hasAttribute('data-lang-splash') || readChoice()) return;

  var CSS = [
    '.lang-splash, .lang-splash * { box-sizing: border-box; }',
    '.lang-splash { position: fixed; z-index: 60; left: 0; right: 0; bottom: 16px;',
    '  bottom: calc(16px + env(safe-area-inset-bottom, 0px));',
    '  width: min(440px, calc(100% - 32px)); margin: 0 auto; padding: 0; border-radius: 22px;',
    '  overflow: hidden; isolation: isolate; color: #eef4ff; text-align: left;',
    '  background: #0a0f1a linear-gradient(100deg, rgba(65,217,241,.30), rgba(131,221,122,.16) 50%, rgba(224,165,255,.30));',
    '  background: #0a0f1a linear-gradient(100deg in oklab, rgba(65,217,241,.30), rgba(131,221,122,.16) 50%, rgba(224,165,255,.30));',
    '  border: 1px solid rgba(94,234,212,.24);',
    '  box-shadow: inset 0 1px 0 rgba(238,244,255,.5), 0 18px 50px -12px rgba(0,0,0,.75), 0 0 34px rgba(65,217,241,.14);',
    '  transition: transform .42s cubic-bezier(.32,1.4,.5,1), opacity .28s ease; }',
    '.lang-splash.is-entering, .lang-splash.is-leaving { transform: translateY(28px); opacity: 0; }',
    '.lang-splash-gl { position: absolute; inset: 0; z-index: -1; display: block; width: 100%; height: 100%; }',
    '.lang-splash.is-flat .lang-splash-gl { display: none; }',
    '.lang-splash-body { position: relative; padding: 14px 14px 14px 16px; }',
    '.lang-splash-head { display: flex; align-items: center; gap: 12px; padding-right: 40px; }',
    '.lang-splash-head img { display: block; flex: none; width: 28px; height: 28px; }',
    '.lang-splash-title { flex: 1; margin: 0; font-size: .95rem; line-height: 1.3; font-weight: 800; letter-spacing: -.005em; }',
    '.lang-splash-title span { display: block; }',
    '.lang-splash-title span + span { color: #d3def0; font-weight: 700; }',
    /* Last in tab order (after the two choices), drawn at the top-right corner. */
    '.lang-splash-close { position: absolute; top: 6px; right: 6px; display: grid; place-items: center;',
    '  width: 44px; height: 44px; margin: 0; padding: 0; border: 0; border-radius: 12px; background: transparent;',
    '  color: #eef4ff; font: inherit; font-size: 1.6rem; line-height: 1; cursor: pointer; }',
    '.lang-splash-close:hover { background: rgba(238,244,255,.10); }',
    '.lang-splash-choices { display: flex; gap: 10px; margin-top: 12px; }',
    '.lang-splash-choice { flex: 1 1 0; display: flex; align-items: center; justify-content: center;',
    '  min-height: 48px; padding: 10px 14px; border-radius: 14px; text-decoration: none;',
    '  font-size: 1rem; font-weight: 800; letter-spacing: .01em; color: #eef4ff;',
    '  background: rgba(5,7,13,.62); border: 1px solid rgba(238,244,255,.24);',
    '  box-shadow: inset 0 1px 0 rgba(238,244,255,.22);',
    '  transition: transform .12s cubic-bezier(.32,1.4,.5,1), border-color .15s ease, box-shadow .15s ease; }',
    '.lang-splash-choice:hover { border-color: rgba(65,217,241,.65); }',
    '.lang-splash-choice:active { transform: scale(.96); }',
    '.lang-splash-choice.is-suggested { color: #04121a; border-color: transparent;',
    '  background: linear-gradient(92deg, #41D9F1, #83DD7A); box-shadow: 0 0 22px rgba(65,217,241,.35); }',
    '.lang-splash-choice:focus-visible, .lang-splash-close:focus-visible { outline: 3px solid #eef4ff; outline-offset: 2px; }',
    '.lang-splash-vh { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden;',
    '  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }',
    '@media (prefers-reduced-motion: reduce) { .lang-splash, .lang-splash-choice { transition: none; } }',
    '@media (prefers-reduced-transparency: reduce) { .lang-splash-choice { background: #101827; } }',
    '@media (forced-colors: active) { .lang-splash { border: 1px solid CanvasText; }',
    '  .lang-splash-gl { display: none; } .lang-splash-choice { border: 1px solid LinkText; } }'
  ].join('\n');

  // Babylon Pixel Guide dark-mode family as OKLab (L, a, b), 4 decimals.
  // Recomputed from the shipped hex with Ottosson's matrices; each value
  // converts back to exactly the hex in its comment.
  var FRAG = [
    'precision mediump float;',
    'uniform vec2 uRes;',
    'uniform float uTime;',
    'uniform float uLean;',
    'const vec3 INK = vec3(0.1290, -0.0009, -0.0150);',   // #05070D site background
    'const vec3 CYAN = vec3(0.8173, -0.1093, -0.0644);',  // #41D9F1 accentSecondary (English)
    'const vec3 VIOLET = vec3(0.8085, 0.0947, -0.0999);', // #E0A5FF accentViolet (Espanol)
    'const vec3 GREEN = vec3(0.8178, -0.1259, 0.0982);',  // #83DD7A AMTP Green (the seam)
    'vec3 oklabToLinear(vec3 c) {',
    '  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;',
    '  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;',
    '  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;',
    '  l = l * l * l; m = m * m * m; s = s * s * s;',
    '  return vec3( 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,',
    '              -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,',
    '              -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);',
    '}',
    'vec3 encodeSRGB(vec3 x) {',
    '  x = clamp(x, 0.0, 1.0);',
    '  return mix(12.92 * x, 1.055 * pow(x, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, x));',
    '}',
    'void main() {',
    '  vec2 uv = gl_FragCoord.xy / uRes;',
    '  float t = uTime;',
    // Where the two languages meet: a slow drift, plus the lean toward the focused choice.
    '  float seam = 0.5 + 0.22 * uLean + 0.05 * sin(uv.y * 3.0 + t * 0.45) + 0.025 * sin(uv.y * 7.0 - t * 0.7);',
    '  float d = (uv.x - seam) * (uRes.x / uRes.y);',
    '  vec3 field = mix(CYAN, VIOLET, smoothstep(-0.6, 0.6, d));',
    '  float swell = 0.5 + 0.5 * sin(t * 0.35 + uv.x * 2.2 - uv.y * 1.3);',
    // Lift off the ink, brighter toward the top edge where the key light sits.
    '  vec3 lab = mix(INK, field, (0.16 + 0.10 * swell) * (0.55 + 0.45 * uv.y));',
    // The seam fades toward the top so the title keeps WCAG AA contrast:
    // worst case over time and lean, 6.6:1 (title) and 5.4:1 (second line).
    '  lab = mix(lab, GREEN, 0.42 * (1.0 - 0.4 * uv.y) * exp(-d * d * 36.0));',
    '  gl_FragColor = vec4(encodeSRGB(oklabToLinear(lab)), 1.0);',
    '}'
  ].join('\n');

  var VERT = 'attribute vec2 aPos; void main() { gl_Position = vec4(aPos, 0.0, 1.0); }';
  var STILL_TIME = 2.0; // the one frame shown under reduced motion

  function suggestedLang() {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < list.length; i++) {
      var primary = String(list[i] || '').slice(0, 2).toLowerCase();
      if (primary === 'es' || primary === 'en') return primary;
    }
    return pageLang;
  }

  function onMediaChange(mq, fn) {
    if (!mq) return function () {};
    if (mq.addEventListener) {
      mq.addEventListener('change', fn);
      return function () { mq.removeEventListener('change', fn); };
    }
    if (mq.addListener) {
      mq.addListener(fn);
      return function () { mq.removeListener(fn); };
    }
    return function () {};
  }

  function compileProgram(gl) {
    function shader(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    }
    var vs = shader(gl.VERTEX_SHADER, VERT);
    var fs = shader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return null;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    return gl.getProgramParameter(prog, gl.LINK_STATUS) ? prog : null;
  }

  // Returns a small controller, or null when WebGL is unavailable (the card
  // then keeps its CSS gradient).
  function startShader(card, reduceMQ) {
    var canvas = card.querySelector('.lang-splash-gl');
    var gl = null;
    try {
      gl = canvas.getContext('webgl', {
        alpha: false, antialias: false, depth: false, stencil: false,
        preserveDrawingBuffer: false, powerPreference: 'low-power',
        failIfMajorPerformanceCaveat: true
      });
    } catch (e) {
      gl = null;
    }
    if (!gl) return null;
    var prog = compileProgram(gl);
    if (!prog) return null;

    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    // One triangle that covers the whole canvas.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    var uRes = gl.getUniformLocation(prog, 'uRes');
    var uTime = gl.getUniformLocation(prog, 'uTime');
    var uLean = gl.getUniformLocation(prog, 'uLean');

    function reduced() {
      return !!(reduceMQ && reduceMQ.matches);
    }

    // The entrance: the seam starts off the left edge and settles in the
    // middle over about a second. Reduced motion starts (and stays) centred.
    var state = { lean: reduced() ? 0 : -2.4, target: 0, time: 0, last: 0, raf: 0, running: false, dead: false };
    var start = null;

    function draw() {
      var scale = Math.min(window.devicePixelRatio || 1, 1.5);
      var w = Math.max(1, Math.round(canvas.clientWidth * scale));
      var h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, state.time);
      gl.uniform1f(uLean, state.lean);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function still() {
      state.lean = 0;
      state.target = 0;
      state.time = STILL_TIME;
      draw();
    }
    function tick(ts) {
      state.raf = 0;
      if (!state.running) return;
      if (start === null) start = ts - state.time * 1000;
      if (ts - state.last >= 32) { // about 30 fps is plenty for a slow drift
        state.last = ts;
        state.time = (ts - start) / 1000;
        state.lean += (state.target - state.lean) * 0.14;
        draw();
      }
      state.raf = requestAnimationFrame(tick);
    }
    function play() {
      if (state.dead || state.running || reduced() || doc.hidden) return;
      state.running = true;
      start = null;
      state.raf = requestAnimationFrame(tick);
    }
    function pause() {
      state.running = false;
      if (state.raf) cancelAnimationFrame(state.raf);
      state.raf = 0;
    }

    function onVisibility() {
      if (doc.hidden) pause();
      else play();
    }
    function onResize() {
      if (!state.running && !state.dead) draw();
    }
    function onContextLost() {
      pause();
      state.dead = true;
      card.classList.add('is-flat');
    }
    var offMotion = onMediaChange(reduceMQ, function () {
      if (reduced()) {
        pause();
        still();
      } else {
        play();
      }
    });
    doc.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);
    canvas.addEventListener('webglcontextlost', onContextLost);

    if (reduced()) still();
    else {
      draw(); // first frame now, so the opaque canvas never shows empty
      play();
    }
    card.classList.remove('is-flat');

    return {
      lean: function (v) {
        if (!reduced()) state.target = v;
      },
      stop: function () {
        if (state.dead) return;
        pause();
        state.dead = true;
        offMotion();
        doc.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('resize', onResize);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        var lose = gl.getExtension('WEBGL_lose_context');
        if (lose) lose.loseContext();
      }
    };
  }

  function showCard() {
    if (!doc.body || doc.getElementById('lang-splash')) return;
    var reduceMQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var reducedAtStart = !!(reduceMQ && reduceMQ.matches);

    var style = doc.createElement('style');
    style.id = 'lang-splash-style';
    style.textContent = CSS;
    doc.head.appendChild(style);

    // A div, not a <section>: page CSS styles bare section elements (padding,
    // borders), and the card must look the same on every page.
    var card = doc.createElement('div');
    card.id = 'lang-splash';
    card.className = 'lang-splash is-flat' + (reducedAtStart ? '' : ' is-entering');
    card.setAttribute('role', 'region');
    card.setAttribute('aria-labelledby', 'lang-splash-title');
    card.setAttribute('data-nosnippet', '');
    card.innerHTML =
      '<canvas class="lang-splash-gl" aria-hidden="true"></canvas>' +
      '<div class="lang-splash-body">' +
        '<div class="lang-splash-head">' +
          '<img src="/assets/logo-64.png" alt="" width="28" height="28">' +
          '<p class="lang-splash-title" id="lang-splash-title">' +
            '<span lang="en">Choose your language</span> <span lang="es">Elige tu idioma</span></p>' +
        '</div>' +
        '<div class="lang-splash-choices">' +
          '<a class="lang-splash-choice" data-choice="en" hreflang="en" lang="en" href="' + pathFor('en') + '">English</a>' +
          '<a class="lang-splash-choice" data-choice="es" hreflang="es" lang="es" href="' + pathFor('es') + '">Espa&ntilde;ol</a>' +
        '</div>' +
        '<button type="button" class="lang-splash-close"><span aria-hidden="true">&times;</span>' +
          '<span class="lang-splash-vh" lang="en">Close</span> <span class="lang-splash-vh" lang="es">Cerrar</span></button>' +
      '</div>';
    card.querySelector('[data-choice="' + suggestedLang() + '"]').classList.add('is-suggested');

    // First in document order, so the first Tab reaches it; fixed at the
    // bottom of the screen, so nothing on the page moves.
    doc.body.insertBefore(card, doc.body.firstChild);

    var shader = startShader(card, reduceMQ);
    if (!reducedAtStart) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { card.classList.remove('is-entering'); });
      });
    }

    function onKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc') close(pageLang);
    }
    function close(storeLang) {
      if (storeLang) writeChoice(storeLang);
      doc.removeEventListener('keydown', onKey);
      if (shader) shader.stop();
      var hadFocus = card.contains(doc.activeElement);
      function remove() {
        if (card.parentNode) card.parentNode.removeChild(card);
      }
      if (reduceMQ && reduceMQ.matches) remove();
      else {
        card.classList.add('is-leaving');
        setTimeout(remove, 300);
      }
      if (hadFocus) {
        // Hand focus to the page's own language link, the next thing in order.
        var next = doc.querySelector('a[data-lang-link]');
        if (next) next.focus();
      }
    }

    doc.addEventListener('keydown', onKey);
    card.querySelector('.lang-splash-close').addEventListener('click', function () {
      close(pageLang);
    });
    Array.prototype.forEach.call(card.querySelectorAll('.lang-splash-choice'), function (a) {
      var lang = a.getAttribute('data-choice');
      var lean = lang === 'en' ? 1 : -1; // the chosen field grows
      a.addEventListener('click', function (e) {
        // A new-tab click (modifier keys, middle button) is not a choice for this tab.
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        writeChoice(lang);
        if (lang === pageLang) {
          e.preventDefault();
          close(null);
          return;
        }
        withHash(a);
        if (shader) shader.stop();
      });
      a.addEventListener('pointerenter', function () { if (shader) shader.lean(lean); });
      a.addEventListener('pointerleave', function () { if (shader) shader.lean(0); });
      a.addEventListener('focus', function () { if (shader) shader.lean(lean); });
      a.addEventListener('blur', function () { if (shader) shader.lean(0); });
    });

    // Back/forward cache: returning to this page after a choice was made
    // elsewhere should not show the old card again.
    window.addEventListener('pageshow', function (e) {
      if (e.persisted && readChoice() && card.parentNode) {
        doc.removeEventListener('keydown', onKey);
        if (shader) shader.stop();
        card.parentNode.removeChild(card);
      }
    });
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', showCard);
  else showCard();
})();
