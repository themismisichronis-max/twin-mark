/* TWINMARK — motion. A train running the line: travel is vertical and
   smooth, arrivals are lateral and crisp. Everything here is optional;
   without it the line is drawn, the stations are lit and every word is
   readable. Only transform, opacity, stroke offsets and single-element
   clip-paths move. */
(function () {
  "use strict";

  var root = document.documentElement;

  window.motionReady = function () {
    clearTimeout(window.__motionFailsafe);
    root.classList.remove("motion-pending");
  };

  if (!window.gsap || !window.ScrollTrigger) {
    window.motionReady();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  if (window.ScrambleTextPlugin) gsap.registerPlugin(ScrambleTextPlugin);
  if (window.CustomEase) {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("brake", "M0,0 C0.22,0.9 0.24,1 1,1");
    CustomEase.create("doors", "M0,0 C0.55,0 0.1,1 1,1");
  }
  var BRAKE = window.CustomEase ? "brake" : "expo.out";
  var DOORS = window.CustomEase ? "doors" : "power3.inOut";

  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ST-23 · one Lenis for the whole page, on every device. Wheel and
     trackpad glide; touch stays native (no syncTouch), so phones keep their
     own fling while velocity still reaches ST-24. Reduced motion: none. */
  var lenis = null;
  if (window.Lenis && matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
    window.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    if (root.classList.contains("intro-on")) {
      lenis.stop();
      document.addEventListener("twm:intro-done", function () { lenis.start(); }, { once: true });
    }
  }

  window.withMotion = function (setup) {
    var mm = gsap.matchMedia();
    mm.add({
      desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 899.98px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)"
    }, function (ctx) {
      var c = ctx.conditions;
      if (c.reduce) return;
      return setup(c, ctx);
    });
    return mm;
  };

  var TIP = 62; /* where the line's tip rides, % down the viewport */
  var introPlayed = false;
  var nf = new Intl.NumberFormat(root.lang === "el" ? "el-GR" : "en-GB");

  function formatCount(el, v) {
    var fmt = el.getAttribute("data-count-format");
    var suffix = el.getAttribute("data-count-suffix") || "";
    if (fmt === "k") return Math.round(v / 1000) + "K" + suffix;
    return nf.format(Math.round(v)) + suffix;
  }

  function countUp(el, tl, at) {
    var to = parseFloat(el.getAttribute("data-count"));
    var o = { v: 0 };
    el.textContent = formatCount(el, 0);
    var tw = { v: to, duration: 1.4, ease: "power2.out", onUpdate: function () { el.textContent = formatCount(el, o.v); } };
    if (tl) tl.to(o, tw, at);
    else gsap.to(o, tw);
  }

  function q(s, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(s)); }

  withMotion(function (c) {
    root.classList.add("js-line");
    var cleanups = [];

    /* ---- departure: the map draws its own line, stop by stop ---- */
    var map = document.querySelector("[data-netmap]");
    if (map && !introPlayed) {
      introPlayed = true;
      var line = map.querySelector("[data-nm-line]");
      var len = line.getTotalLength();
      var drawTime = c.mobile ? 1.2 : 1.8;
      var start = c.mobile ? 0.3 : 0.55;
      /* desktop: the map sits in the first view, so it draws on arrival;
         phones: it sits below the fold, so it waits until it is seen */
      /* while the logo intro (R-11) holds the screen, the map waits for it */
      var held = root.classList.contains("intro-on");
      var tl = gsap.timeline({ delay: 0.1, paused: c.mobile || held });
      if (held && !c.mobile) document.addEventListener("twm:intro-done", function () { tl.play(); }, { once: true });
      if (c.mobile) {
        ScrollTrigger.create({ trigger: map, start: "top 65%", once: true, onEnter: function () { tl.play(); } });
      }

      q("[data-nm-mark] path", map).forEach(function (p, i) {
        var l = p.getTotalLength();
        tl.fromTo(p,
          { strokeDasharray: l + " " + (l + 40), strokeDashoffset: l, autoAlpha: 0 },
          { strokeDashoffset: 0, autoAlpha: 1, duration: 0.36, ease: "power2.inOut" },
          i * 0.06);
      });
      tl.from(map.querySelector("[data-nm-depart]"), { autoAlpha: 0, x: -10, duration: 0.5, ease: BRAKE }, 0.3);

      tl.fromTo(line,
        { strokeDasharray: len + " " + (len + 20), strokeDashoffset: len },
        { strokeDashoffset: 0, duration: drawTime, ease: "power1.inOut" },
        start);

      q("[data-nm-stop]", map).forEach(function (stop) {
        var f = parseFloat(stop.getAttribute("data-nm-stop"));
        /* power1.inOut maps time to distance; invert it so each stop lands
           when the drawn tip actually reaches it */
        var t = f < 0.5 ? Math.sqrt(f / 2) : 1 - Math.sqrt((1 - f) / 2);
        var at = start + t * drawTime - 0.05;
        var marks = stop.querySelectorAll("circle, .nm-pill");
        tl.fromTo(marks, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.42, ease: "back.out(2.2)" }, at);
        tl.fromTo(stop.querySelectorAll("text"), { autoAlpha: 0, y: 4 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: BRAKE, stagger: 0.04 }, at + 0.06);
      });

      tl.fromTo(q("[data-nm-branch] path", map),
        { scaleY: 0, transformOrigin: "50% 100%" },
        { scaleY: 1, duration: 0.6, ease: BRAKE, stagger: 0.1 },
        start + 0.2);
      tl.fromTo(q("[data-nm-branch] text", map), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, stagger: 0.08 }, start + 0.35);

      var counts = gsap.timeline({ delay: 0.5, paused: held });
      if (held) document.addEventListener("twm:intro-done", function () { counts.play(); }, { once: true });
      q(".board [data-count]").forEach(function (el, i) { countUp(el, counts, i * 0.12); });
    }

    /* ---- the line between stations fills as you ride ---- */
    q("[data-leg]").forEach(function (fill) {
      gsap.fromTo(fill, { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: fill.parentNode,
          start: "top " + TIP + "%",
          end: "bottom " + TIP + "%",
          scrub: c.mobile ? true : 0.3
        }
      });
    });

    /* ---- stations light when the tip reaches them ---- */
    q("[data-stop]").forEach(function (stop) {
      ScrollTrigger.create({
        trigger: stop,
        start: "center " + TIP + "%",
        end: "max",
        toggleClass: { targets: stop, className: "is-lit" }
      });
    });

    /* ---- station plates open like platform doors ---- */
    q("[data-plate]").forEach(function (plate) {
      gsap.fromTo(plate,
        { clipPath: "inset(0% 50% 0% 50% round 999px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 999px)",
          duration: c.mobile ? 0.5 : 0.62,
          ease: DOORS,
          clearProps: "clipPath",
          scrollTrigger: { trigger: plate, start: c.mobile ? "top 78%" : "top 78%", once: true }
        });
    });

    /* ---- reels pull into the platform, one after another ---- */
    var reels = q("[data-reel]");
    if (reels.length) {
      gsap.fromTo(reels,
        { x: c.mobile ? 48 : -90, autoAlpha: 0 }, /* desktop: from the left, so nothing waits past the page edge */
        {
          x: 0, autoAlpha: 1,
          duration: c.mobile ? 0.9 : 1.15,
          ease: BRAKE,
          stagger: c.mobile ? 0.08 : 0.11,
          clearProps: "transform",
          scrollTrigger: { trigger: "[data-reels]", start: c.mobile ? "top 80%" : "top 76%", once: true }
        });
    }

    q(".pause [data-count]").forEach(function (el) {
      ScrollTrigger.create({ trigger: el, start: "top 80%", once: true, onEnter: function () { countUp(el); } });
    });

    /* ---- photos: the posts pass like carriages while you scroll down ---- */
    var gallery = document.querySelector("[data-gallery]");
    if (gallery) {
      var track = gallery.querySelector("[data-gallery-track]");
      var viewport = gallery.querySelector("[data-gallery-viewport]");
      var factor = c.mobile ? 0.42 : 0.6;
      var dist = function () { return Math.max(0, track.scrollWidth - viewport.clientWidth); };
      var size = function () {
        gallery.style.height = "";
        gallery.style.height = (window.innerHeight + dist() * factor) + "px";
      };

      viewport.scrollLeft = 0;
      gallery.classList.add("js-gallery");
      size();
      ScrollTrigger.addEventListener("refreshInit", size);

      gsap.to(track, {
        x: function () { return -dist(); },
        ease: "none",
        scrollTrigger: {
          trigger: gallery,
          start: "top top",
          end: "bottom bottom",
          scrub: c.mobile ? true : 0.45,
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            if (window.__galleryMeter) window.__galleryMeter(self.progress * dist() + viewport.clientWidth * 0.4);
          }
        }
      });
      if (window.__galleryMeter) window.__galleryMeter(viewport.clientWidth * 0.4);

      cleanups.push(function () {
        ScrollTrigger.removeEventListener("refreshInit", size);
        gallery.classList.remove("js-gallery");
        gallery.style.height = "";
        gsap.set(track, { clearProps: "transform" });
      });
    }

    /* ---- the website arrives through the same doors ---- */
    var browser = document.querySelector("[data-browser]");
    if (browser) {
      gsap.fromTo(browser,
        { clipPath: "inset(0% 50% 0% 50% round 16px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          duration: c.mobile ? 0.8 : 1,
          ease: DOORS,
          clearProps: "clipPath",
          scrollTrigger: { trigger: browser, start: c.mobile ? "top 70%" : "top 75%", once: true }
        });
      /* phones keep the doors; the extra settle of the picture is desktop-only */
      if (!c.mobile) gsap.fromTo(browser.querySelector("img"), { scale: 1.08 }, {
        scale: 1, duration: c.mobile ? 0.9 : 1.6, ease: BRAKE, clearProps: "transform",
        scrollTrigger: { trigger: browser, start: c.mobile ? "top 70%" : "top 75%", once: true }
      });
    }

    /* the phone version pulls out from behind the browser */
    var webPhone = document.querySelector("[data-web-phone]");
    if (webPhone && browser) {
      gsap.fromTo(webPhone, { x: c.mobile ? -30 : -70, autoAlpha: 0 }, {
        x: 0, autoAlpha: 1, duration: c.mobile ? 0.8 : 1.1, ease: BRAKE, delay: 0.35, clearProps: "transform",
        scrollTrigger: { trigger: browser, start: c.mobile ? "top 70%" : "top 75%", once: true }
      });
    }

    /* ---- ST-24 · the reel phones lean with the scroll's speed and settle
       when it stops; frames only, never the captions people read ---- */
    var leanFrames = q("#video .reel .phone");
    if (lenis && leanFrames.length) {
      var lean = leanFrames.map(function (f) { return gsap.quickTo(f, "skewY", { duration: 0.5, ease: "power3.out" }); });
      var squash = leanFrames.map(function (f) { return gsap.quickTo(f, "scaleY", { duration: 0.5, ease: "power3.out" }); });
      var leanOn = false;
      var leanMax = c.mobile ? 1.6 : 3;
      var onLean = function (e) {
        if (!leanOn) return;
        var v = gsap.utils.clamp(-1, 1, e.velocity / 60);
        lean.forEach(function (fn) { fn(v * leanMax); });
        squash.forEach(function (fn) { fn(1 + Math.abs(v) * 0.03); });
      };
      lenis.on("scroll", onLean);
      var leanST = ScrollTrigger.create({ trigger: "#video", start: "top bottom", end: "bottom top", onToggle: function (s) { leanOn = s.isActive; } });
      cleanups.push(function () { leanST.kill(); lenis.off("scroll", onLean); gsap.set(leanFrames, { clearProps: "transform" }); });
    }

    /* ---- closing idea: the question rises line by line out of its own slot
       (TX-03 masked line rise, brake ease), the answer button follows ---- */
    var close = document.querySelector("[data-foot-close]");
    if (close) {
      var closeTl = gsap.timeline({ scrollTrigger: { trigger: close.querySelector(".foot__ask"), start: matchMedia("(max-width: 899px)").matches ? "top 80%" : "clamp(top 62%)", once: true } });
      closeTl.from(q(".foot__l > span", close), { yPercent: 105, duration: 0.9, ease: BRAKE, stagger: 0.11 });
      /* the logo sits beside the last line on every size, so it follows the question */
      closeTl.from(close.querySelector(".foot__logo"), { y: 24, autoAlpha: 0, duration: 0.7, ease: BRAKE }, 0.15);
      cleanups.push(function () { closeTl.scrollTrigger && closeTl.scrollTrigger.kill(); closeTl.progress(1).kill(); });
    }

    /* ---- how we work, compact: a departures board on one short line.
       SV-03 a train travels the line to the active stop (brake ease);
       TX-05 the board decodes each step like a station sign (Greek chars);
       ST-09 the active stop follows the reader's scroll; a tap picks one.
       Without JS / reduced motion: the plain 4-stop list, all text shown. ---- */
    var how = document.querySelector("[data-how]");
    var board = how && how.querySelector("[data-how-board]");
    if (how && board) {
      var stopsOl = how.querySelector("[data-how-stops]");
      var stops = q("[data-how-stop]", how);
      var texts = stops.map(function (li) { return li.querySelector("p").textContent.trim(); });
      var numEl = board.querySelector("[data-how-num]");
      var txtEl = board.querySelector("[data-how-text]");
      var fill = document.createElement("span"); fill.className = "how__fill"; fill.setAttribute("aria-hidden", "true");
      var train = document.createElement("span"); train.className = "how__train"; train.setAttribute("aria-hidden", "true");
      stopsOl.appendChild(fill); stopsOl.appendChild(train);
      how.classList.add("how--live");
      board.hidden = false;
      var cur = -1;
      var dotX = function (i) {
        var r0 = stopsOl.getBoundingClientRect(), d = stops[i].getBoundingClientRect();
        return d.left - r0.left + 10;
      };
      var fitBoard = function () {
        var keep = txtEl.textContent, h = 0;
        board.style.height = "";
        texts.forEach(function (t) { txtEl.textContent = t; h = Math.max(h, board.offsetHeight); });
        txtEl.textContent = keep;
        board.style.height = h + "px";
      };
      var setStep = function (i, instant) {
        if (i === cur) return;
        cur = i;
        stops.forEach(function (li, k) { li.classList.toggle("is-on", k === i); li.classList.toggle("is-past", k < i); });
        var x = dotX(i);
        gsap.to(train, { x: x, duration: instant ? 0 : 0.75, ease: BRAKE, overwrite: true });
        gsap.to(fill, { width: x, duration: instant ? 0 : 0.75, ease: BRAKE, overwrite: true });
        var n = "0" + (i + 1);
        if (instant) { numEl.textContent = n; txtEl.textContent = texts[i]; return; }
        gsap.to(numEl, { duration: 0.5, scrambleText: { text: n, chars: "0123456789", speed: 0.8 }, overwrite: true });
        gsap.to(txtEl, { duration: c.mobile ? 0.7 : 0.9, scrambleText: { text: texts[i], chars: "αβγδεζηθικλμνξοπρστυφχψω  ", revealDelay: 0.12, speed: 0.6, tweenLength: false }, overwrite: true });
      };
      fitBoard();
      setStep(0, true);
      var lastScroll = 0;
      var howST = ScrollTrigger.create({
        trigger: how, start: "top 75%", end: "bottom 25%",
        onUpdate: function (self) {
          var k = Math.min(stops.length - 1, Math.floor(self.progress * stops.length));
          if (k !== lastScroll) { lastScroll = k; setStep(k); }
        },
        onRefresh: function () { fitBoard(); var k = cur; cur = -1; setStep(k < 0 ? 0 : k, true); }
      });
      var onPick = function (e) {
        var i = stops.indexOf(e.currentTarget);
        if (i > -1) setStep(i);
      };
      stops.forEach(function (li) { li.addEventListener("click", onPick); });
      cleanups.push(function () {
        howST.kill();
        stops.forEach(function (li) { li.removeEventListener("click", onPick); li.classList.remove("is-on", "is-past"); });
        gsap.killTweensOf([train, fill, numEl, txtEl]);
        fill.remove(); train.remove();
        how.classList.remove("how--live");
        board.hidden = true; board.style.height = "";
      });
    }

    return function () {
      root.classList.remove("js-line");
      cleanups.forEach(function (fn) { fn(); });
    };
  });

  window.motionReady();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
