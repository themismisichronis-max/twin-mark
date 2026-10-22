/* TWINMARK — behaviour. No animation library needed: everything here
   works with or without motion, and the page reads fine without it. */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var lang = root.lang === "el" ? "el" : "en";
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var T = {
    el: {
      required: "Συμπλήρωσε αυτό το πεδίο.",
      sending: "Αποστολή…",
      send: "Στείλε το brief",
      failed: "Δεν στάλθηκε. Δοκίμασε ξανά ή γράψε μας στο hello@twinmark.gr.",
      perMonth: "τον μήνα",
      brief: "Το brief σου:",
      subject: "Νέο brief από το twinmark.gr: "
    },
    en: {
      required: "Please fill this in.",
      sending: "Sending…",
      send: "Send the brief",
      failed: "It didn't go through. Try again, or email us at hello@twinmark.gr.",
      perMonth: "a month",
      brief: "Your brief:",
      subject: "New brief from twinmark.gr: "
    }
  }[lang];

  var sign = doc.querySelector("[data-sign]");
  var menuBtn = doc.querySelector("[data-menu-btn]");
  var menu = doc.getElementById("menu");

  /* ---------- mobile menu ---------- */

  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.hidden = !open;
    if (open) sign.classList.remove("is-away");
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    doc.addEventListener("click", function (e) {
      if (!menu.hidden && !sign.contains(e.target)) setMenu(false);
    });
  }

  /* ---------- in-page links: glide, then hand focus over ---------- */

  doc.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href").slice(1);
    var target = id ? doc.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    setMenu(false);
    var navH = sign ? sign.offsetHeight : 0;
    var y = target.getBoundingClientRect().top + window.scrollY - (id === "top" ? 0 : navH * 0.25);
    window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion ? "auto" : "smooth" });
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  });

  /* ---------- header: steps aside while reading down ---------- */

  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    var menuOpen = menu && !menu.hidden;
    sign.classList.toggle("is-scrolled", y > 8);
    if (!menuOpen && !sign.contains(doc.activeElement)) {
      if (y > 640 && y > lastY + 6) sign.classList.add("is-away");
      else if (y < lastY - 6 || y < 160) sign.classList.remove("is-away");
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  sign.addEventListener("focusin", function () { sign.classList.remove("is-away"); });
  onScroll();

  var io = "IntersectionObserver" in window;

  /* ---------- "you are here" in the header ---------- */

  var links = doc.querySelectorAll("[data-stop-link]");
  if (links.length && io) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("data-stop-link")] = a; });
    var here = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        } else if (link.getAttribute("aria-current")) {
          link.removeAttribute("aria-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = doc.getElementById(id);
      if (section) here.observe(section);
    });
  }

  /* ---------- phone action bar: after the departure, before the terminus ---------- */

  var bar = doc.querySelector("[data-actionbar]");
  var hero = doc.getElementById("top");
  var contact = doc.getElementById("contact");
  if (bar && hero && contact && io) {
    var pastHero = false, atEnd = false;
    var update = function () { bar.classList.toggle("is-on", pastHero && !atEnd); };
    new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (e) { atEnd = e[0].isIntersecting; update(); }, { rootMargin: "0px 0px -20% 0px" }).observe(contact);
  }

  /* ---------- reels: one plays at a time, only while on screen ---------- */

  var reels = Array.prototype.slice.call(doc.querySelectorAll("[data-reel]"));
  var saveData = navigator.connection && navigator.connection.saveData;

  function playReel(reel) {
    var v = reel.querySelector("video");
    reels.forEach(function (other) {
      if (other !== reel) other.querySelector("video").pause();
    });
    var p = v.play();
    if (p && p.catch) p.catch(function () { reel.classList.remove("is-playing"); });
  }

  reels.forEach(function (reel) {
    var v = reel.querySelector("video");
    var toggle = reel.querySelector("[data-reel-toggle]");
    reel.__ratio = 0;
    v.addEventListener("playing", function () { reel.classList.add("is-playing"); });
    /* when a reel ends, the next one on screen takes over; alone, it loops */
    v.addEventListener("ended", function () {
      if (reduceMotion || saveData) return; /* played by hand: stop at the end */
      var i = reels.indexOf(reel);
      for (var k = 1; k <= reels.length; k++) {
        var nextReel = reels[(i + k) % reels.length];
        if (nextReel === reel || (nextReel.__ratio >= 0.6 && !nextReel.__userPaused)) {
          if (nextReel === reel) v.currentTime = 0;
          playReel(nextReel);
          return;
        }
      }
    });
    v.addEventListener("pause", function () { reel.classList.remove("is-playing"); });
    toggle.addEventListener("click", function () {
      if (v.paused) {
        reel.__userPaused = false;
        playReel(reel);
      } else {
        reel.__userPaused = true;
        v.pause();
      }
    });
  });

  if (reels.length && io && !saveData && !reduceMotion) {
    /* the observer watches each phone; map it back to its reel */
    reels.forEach(function (reel) { reel.querySelector(".phone").__reel = reel; });
    var watch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { entry.target.__reel.__ratio = entry.intersectionRatio; });
      var current = reels.filter(function (r) { return !r.querySelector("video").paused; })[0];
      if (current && current.__ratio >= 0.6) return; /* let the playing reel finish */
      var best = null;
      reels.forEach(function (reel) {
        if (reel.__ratio >= 0.6 && !reel.__userPaused && (!best || reel.__ratio > best.__ratio)) best = reel;
      });
      reels.forEach(function (reel) {
        var v = reel.querySelector("video");
        if (reel !== best && !v.paused && reel.__ratio < 0.6) v.pause();
      });
      if (best && best.querySelector("video").paused) playReel(best);
    }, { threshold: [0, 0.25, 0.6, 0.85, 1] });
    reels.forEach(function (reel) { watch.observe(reel.querySelector(".phone")); });
  }

  /* ---------- photos: warm the images before the carriages arrive,
                and keep the client stops in step with the gallery ---------- */

  var gallery = doc.querySelector("[data-gallery]");
  if (gallery) {
    var posts = Array.prototype.slice.call(gallery.querySelectorAll(".post"));
    var stops = Array.prototype.slice.call(gallery.querySelectorAll("[data-meter] li"));
    var viewport = gallery.querySelector("[data-gallery-viewport]");
    var current = -1;

    if (io) {
      var warm = new IntersectionObserver(function (entries, obs) {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        posts.forEach(function (p) { p.querySelector("img").loading = "eager"; });
      }, { rootMargin: "1200px 0px" });
      warm.observe(gallery);
    }

    /* `pos` is how far along the track the reading point is, in px */
    window.__galleryMeter = function (pos) {
      var idx = 0;
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].offsetLeft <= pos) idx = parseInt(posts[i].getAttribute("data-client"), 10);
      }
      if (idx === current) return;
      current = idx;
      stops.forEach(function (li, i) {
        li.classList.toggle("is-past", i <= idx);
        li.classList.toggle("is-current", i === idx);
      });
    };

    window.__galleryMeter(viewport ? viewport.clientWidth * 0.4 : 0);

    if (viewport) {
      var meterTick = false;
      viewport.addEventListener("scroll", function () {
        if (gallery.classList.contains("js-gallery") || meterTick) return;
        meterTick = true;
        requestAnimationFrame(function () {
          meterTick = false;
          window.__galleryMeter(viewport.scrollLeft + viewport.clientWidth * 0.4);
        });
      }, { passive: true });
    }
  }

  /* ---------- the brief: four stops, one at a time ---------- */

  var form = doc.querySelector("[data-brief]");
  if (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll("[data-step]"));
    var legs = form.querySelector("[data-legs]");
    var legStops = legs ? Array.prototype.slice.call(legs.querySelectorAll(":scope > div")) : [];
    var legFill = form.querySelector("[data-legs-fill]");
    var back = form.querySelector("[data-brief-back]");
    var next = form.querySelector("[data-brief-next]");
    var send = form.querySelector("[data-brief-send]");
    var status = form.querySelector("[data-brief-status]");
    var done = form.querySelector("[data-brief-done]");
    var summary = form.querySelector("[data-summary]");
    var at = 0;

    form.noValidate = true;
    form.classList.add("has-steps");
    if (legs) legs.hidden = false;
    next.hidden = false;

    function clearError(input) {
      input.removeAttribute("aria-invalid");
      var err = doc.getElementById(input.id + "-err");
      if (err) err.remove();
      input.removeAttribute("aria-describedby");
    }

    function showError(input) {
      clearError(input);
      input.setAttribute("aria-invalid", "true");
      var err = doc.createElement("p");
      err.className = "field__error";
      err.id = input.id + "-err";
      err.textContent = input.getAttribute("data-error") || T.required;
      input.parentNode.appendChild(err);
      input.setAttribute("aria-describedby", err.id);
    }

    function validStep(i) {
      var first = null;
      steps[i].querySelectorAll("input[required]").forEach(function (input) {
        if (input.value.trim().length < 2) {
          showError(input);
          if (!first) first = input;
        } else {
          clearError(input);
        }
      });
      if (first) first.focus();
      return !first;
    }

    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") && e.target.value.trim().length >= 2) clearError(e.target);
    });

    function values(name) {
      return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]:checked'))
        .map(function (i) { return i.value; });
    }

    function escapeHtml(s) {
      var d = doc.createElement("div");
      d.textContent = s;
      return d.innerHTML;
    }

    function renderSummary() {
      var parts = [];
      var biz = form.business.value.trim();
      var svc = values("services");
      var budget = values("budget")[0];
      if (biz) parts.push("<b>" + escapeHtml(biz) + "</b>");
      if (svc.length) parts.push(escapeHtml(svc.join(" · ")));
      if (budget) parts.push(escapeHtml(budget) + (/^[€\d]|Κάτω|Under/.test(budget) ? " " + T.perMonth : ""));
      summary.innerHTML = parts.length ? T.brief + " " + parts.join(" — ") : "";
    }

    function go(i, focus) {
      at = i;
      steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      legStops.forEach(function (li, k) {
        li.classList.toggle("is-active", k === i);
        li.classList.toggle("is-done", k < i);
      });
      if (legFill) legFill.style.transform = "scaleX(" + (i / (steps.length - 1)) + ")";
      back.hidden = i === 0;
      var last = i === steps.length - 1;
      next.hidden = last;
      send.hidden = !last;
      if (last) renderSummary();
      if (focus) {
        var first = steps[i].querySelector("input, textarea");
        if (first) first.focus({ preventScroll: true });
      }
    }

    back.addEventListener("click", function () { if (at > 0) go(at - 1, true); });
    next.addEventListener("click", function () { if (validStep(at)) go(at + 1, true); });

    form.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "checkbox" && e.target.type !== "radio") {
        e.preventDefault();
        if (at < steps.length - 1) next.click();
        else send.click();
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validStep(at)) return;
      var data = new FormData(form);
      data.set("services", values("services").join(", ") || "—");
      data.set("_subject", T.subject + (form.business.value.trim() || form.name.value.trim()));
      send.disabled = true;
      send.textContent = T.sending;
      status.textContent = "";
      fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("send failed");
          steps.forEach(function (s) { s.hidden = true; });
          form.querySelector(".brief__controls").hidden = true;
          if (legs) legs.hidden = true;
          done.hidden = false;
          done.focus();
        })
        .catch(function () {
          send.disabled = false;
          send.textContent = T.send;
          status.textContent = T.failed;
        });
    });

    go(0, false);
  }

  /* ---------- footer year ---------- */

  var year = doc.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
