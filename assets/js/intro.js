/* TWINMARK — logo intro (R-11). Once per session the mark draws its own
   six lines (SV-02 stroke draw), the eight letters of TWIN/MARK rise one by
   one out of their own slots (TX-03, cut from the real logo file, no font
   stand-in), then the whole sign flies into the header and becomes the
   header logo (Flip-style hand-off, F-01 timeline). Never a fade-out.
   Skippable by wheel, touch, key or click. Without JS or with reduced
   motion the head script never sets .intro-on, so nothing here exists. */
(function () {
  "use strict";

  var root = document.documentElement;
  var stage = document.querySelector("[data-intro]");

  function finish() {
    clearTimeout(window.__introFailsafe);
    root.classList.remove("intro-on");
    if (stage && stage.parentNode) stage.parentNode.removeChild(stage);
    window.__introDone = true;
    document.dispatchEvent(new CustomEvent("twm:intro-done"));
  }

  if (!root.classList.contains("intro-on") || !stage || !window.gsap) { finish(); return; }
  try { sessionStorage.setItem("twm-intro", "1"); } catch (e) {}

  var BRAKE = gsap.parseEase("brake") ? "brake" : "expo.out";
  var DOORS = gsap.parseEase("doors") ? "doors" : "power3.inOut";

  var sign = stage.querySelector("[data-intro-sign]");
  var ground = stage.querySelector("[data-intro-ground]");
  var target = document.querySelector(".sign__brand img");

  /* the real logo is 780 x 260; every slice is a window onto that file */
  var W = 780, H = 260;
  var slices = [
    /* TWIN */ [289, 0, 76, 130], [365, 0, 141, 130], [517, 0, 27, 130], [562, 0, 105, 130],
    /* MARK */ [322, 130, 126, 130], [449, 130, 117, 130], [570, 130, 98, 130], [679, 130, 101, 130]
  ];
  var letters = slices.map(function (s) {
    var slot = document.createElement("span");
    slot.className = "lintro__slot";
    slot.style.left = (s[0] / W * 100) + "%";
    slot.style.top = (s[1] / H * 100) + "%";
    slot.style.width = (s[2] / W * 100) + "%";
    slot.style.height = (s[3] / H * 100) + "%";
    var ink = document.createElement("span");
    ink.className = "lintro__ink";
    ink.style.backgroundSize = (W / s[2] * 100) + "% " + (H / s[3] * 100) + "%";
    ink.style.backgroundPosition = (s[0] / (W - s[2]) * 100) + "% " + (s[1] / (H - s[3]) * 100) + "%";
    slot.appendChild(ink);
    sign.appendChild(slot);
    return ink;
  });

  var strokes = Array.prototype.slice.call(stage.querySelectorAll("[data-intro-mark] path"));
  var markInk = stage.querySelector("[data-intro-markink]");
  gsap.set(markInk, { autoAlpha: 0 });

  gsap.set(letters, { yPercent: 110 });
  var tl = gsap.timeline({ paused: true, onComplete: finish });

  /* start only once the logo file is decoded and two frames have painted,
     so the first stroke is never drawn behind a blank, still-loading page */
  var logo = new Image();
  logo.src = target ? (target.currentSrc || target.src) : "assets/img/logo-transparent.png"; /* same file as the header, so the EN page path works too */
  var go = function () { requestAnimationFrame(function () { requestAnimationFrame(function () { tl.play(); }); }); };
  var started = false;
  var once = function () { if (!started) { started = true; go(); } };
  (logo.decode ? logo.decode() : Promise.resolve()).then(once, once);
  setTimeout(once, 900);

  strokes.forEach(function (p, i) {
    var l = p.getTotalLength();
    tl.fromTo(p, { strokeDasharray: l + " " + (l + 10), strokeDashoffset: l },
      { strokeDashoffset: 0, duration: 0.42, ease: "power2.inOut" }, 0.1 + i * 0.08);
  });
  tl.to(markInk, { autoAlpha: 1, duration: 0.25, ease: "none" }, 0.85);

  tl.fromTo(letters, { yPercent: 110 }, { yPercent: 0, duration: 0.62, ease: BRAKE, stagger: 0.07 }, 0.55);

  /* hand-off: measure the header logo at the moment we leave, so a page
     that moved under the curtain still gets a clean landing */
  tl.addLabel("handoff", 1.75);
  tl.add(function () {
    var a = sign.getBoundingClientRect();
    var b = target ? target.getBoundingClientRect() : { left: a.left, top: -a.height, width: a.width, height: a.height };
    var s = b.width / a.width;
    gsap.to(sign, {
      x: b.left - a.left, y: b.top - a.top, scale: s,
      transformOrigin: "0 0", duration: 0.8, ease: DOORS
    });
  }, "handoff");
  tl.to(ground, { yPercent: -100, duration: 0.8, ease: DOORS }, "handoff+=0.12");
  tl.to({}, { duration: 0.8 }, "handoff");

  /* skip: any intent to use the page jumps straight to the hand-off */
  var skipped = false;
  function skip(e) {
    if (e && e.type === "wheel" && e.cancelable) e.preventDefault();
    if (skipped) return;
    skipped = true;
    if (tl.time() < tl.labels.handoff) tl.seek(tl.labels.handoff - 0.01, false);
    started = true;
    tl.timeScale(1.6).play();
  }
  ["wheel", "touchstart", "keydown", "pointerdown"].forEach(function (t) {
    window.addEventListener(t, skip, { passive: t !== "wheel", once: t !== "wheel" });
  });
  tl.eventCallback("onComplete", function () {
    window.removeEventListener("wheel", skip);
    finish();
  });
})();
