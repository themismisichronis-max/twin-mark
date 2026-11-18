/* TWINMARK — the feed that stops (R-01 home object, real 3D).
   A real phone, in the logo's indigo, showing the studio's own reels.
   Scroll flicks the feed (PH-09 scroll-scrubbed 3D pose), the last flick
   brakes on the Lizzy's reel, which starts playing; the camera comes round
   to face it while the ground turns to night and hands over to the Video
   station (ST-13 pinned stage, seam = blend). Every pose is a function of
   scroll progress. Without WebGL, JS or with reduced motion the section
   shows the reel poster in a phone frame and the four lines as text. */
/* three (~725 KB) is fetched only when the intro is done, so it never
   competes with the intro or the hero for a phone's bandwidth */
let THREE, RoomEnvironment, RoundedBoxGeometry;
const boot = () => Promise.all([
  import("../vendor/three/three.module.min.js"),
  import("../vendor/three/RoomEnvironment.js"),
  import("../vendor/three/RoundedBoxGeometry.js")
]).then(([t, r, g]) => { THREE = t; RoomEnvironment = r.RoomEnvironment; RoundedBoxGeometry = g.RoundedBoxGeometry; start(); })
  .catch(() => { sec.classList.remove("feed3d--live"); ScrollTrigger.refresh(); });

const sec = document.querySelector("[data-feed3d]");
const motionOK = matchMedia("(prefers-reduced-motion: no-preference)").matches;
/* the layout (330vh sticky stage) is claimed at once so nothing below moves
   later; the GPU work waits until the logo intro has finished, so shader
   compiles and texture uploads never steal frames from it on a phone */
if (sec && motionOK && window.gsap && window.ScrollTrigger) {
  sec.classList.add("feed3d--live");
  const go = () => requestAnimationFrame(() => setTimeout(boot, 60));
  if (!document.documentElement.classList.contains("intro-on") || window.__introDone) go();
  else document.addEventListener("twm:intro-done", go, { once: true });
}

function start() {
  const canvas = sec.querySelector(".feed3d__canvas");
  const stage = sec.querySelector(".feed3d__stage");
  const phoneUA = matchMedia("(max-width: 899.98px)").matches;
  let gl = null;
  try {
    const o = { alpha: true, antialias: !phoneUA, powerPreference: "high-performance" };
    gl = canvas.getContext("webgl2", o) || canvas.getContext("webgl", o);
  } catch (e) {}
  if (!gl) { sec.classList.remove("feed3d--live"); ScrollTrigger.refresh(); return; }

  const renderer = new THREE.WebGLRenderer({ canvas, context: gl, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, phoneUA ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x7acfd6, 2.2);
  rim.position.set(-4, 1, -3);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);

  /* ---- the phone ---- */
  const PW = 0.76, PH = 1.6, PD = 0.085;
  const SW = 0.70, SH = 1.54;
  const phone = new THREE.Group();
  const pivot = new THREE.Group();
  pivot.add(phone);
  scene.add(pivot);

  const metal = new THREE.MeshPhysicalMaterial({ color: 0x2c3c83, metalness: 0.78, roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.18 });
  phone.add(new THREE.Mesh(new RoundedBoxGeometry(PW, PH, PD, 6, 0.1), metal));

  function roundedPlane(w, h, r) {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const g = new THREE.ShapeGeometry(s, 10);
    const pos = g.attributes.position, uv = g.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h);
    return g;
  }

  const glass = new THREE.Mesh(roundedPlane(PW - 0.02, PH - 0.02, 0.09),
    new THREE.MeshPhysicalMaterial({ color: 0x05060c, metalness: 0, roughness: 0.08, clearcoat: 1 }));
  glass.position.z = PD / 2 + 0.001;
  phone.add(glass);

  /* the feed is drawn into a canvas; redrawn only when its offset changes */
  const FW = 540, FH = Math.round(540 * SH / SW);
  const feed = document.createElement("canvas");
  feed.width = FW; feed.height = FH;
  const fx = feed.getContext("2d");
  const feedTex = new THREE.CanvasTexture(feed);
  feedTex.colorSpace = THREE.SRGBColorSpace;
  feedTex.anisotropy = 4;
  const screenMat = new THREE.MeshBasicMaterial({ map: feedTex, toneMapped: false });
  const screen = new THREE.Mesh(roundedPlane(SW, SH, 0.07), screenMat);
  screen.position.z = PD / 2 + 0.002;
  phone.add(screen);

  /* the reel's own interface, drawn once, faded in once the feed lands */
  const ui = document.createElement("canvas");
  ui.width = FW; ui.height = FH;
  const uiTex = new THREE.CanvasTexture(ui);
  uiTex.colorSpace = THREE.SRGBColorSpace;
  const uiMat = new THREE.MeshBasicMaterial({ map: uiTex, transparent: true, opacity: 0, toneMapped: false, depthWrite: false });
  const uiPlane = new THREE.Mesh(roundedPlane(SW, SH, 0.07), uiMat);
  uiPlane.position.z = PD / 2 + 0.003;
  phone.add(uiPlane);

  const island = new THREE.Mesh(roundedPlane(0.2, 0.055, 0.0275), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  island.position.set(0, SH / 2 - 0.06, PD / 2 + 0.004);
  phone.add(island);

  /* the camera block on the back, so the turn reads as an object */
  const bump = new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.3, 0.03, 4, 0.06), metal);
  bump.position.set(-0.18, 0.56, -PD / 2 - 0.012);
  phone.add(bump);
  const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x0a0c16, metalness: 0.2, roughness: 0.05, clearcoat: 1 });
  [[-0.24, 0.62], [-0.12, 0.5]].forEach(([x, y]) => {
    const l = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 32), lensMat);
    l.rotation.x = Math.PI / 2;
    l.position.set(x, y, -PD / 2 - 0.03);
    phone.add(l);
  });

  /* ---- the studio's own reels, the Lizzy's one last ---- */
  const base = "assets/media/reels/";
  const srcs = ["reel-posture", "tiktok-chefbf", "tiktok-xagk", "reel-lizzys-genz"];
  const prefix = document.documentElement.lang === "en" ? "../" : "";
  const imgs = srcs.map((n) => {
    const im = new Image();
    im.decoding = "async";
    im.src = prefix + base + n + ".webp";
    im.onload = () => { lastOffset = -1; };
    return im;
  });

  let lastOffset = -1;
  function drawFeed(o) {
    if (Math.abs(o - lastOffset) < 0.0005) return;
    lastOffset = o;
    fx.fillStyle = "#000";
    fx.fillRect(0, 0, FW, FH);
    const sw = 960 * FW / FH;
    imgs.forEach((im, i) => {
      const y = (i - o) * FH;
      if (y > FH || y < -FH || !im.complete || !im.naturalWidth) return;
      fx.drawImage(im, (540 - sw) / 2, 0, sw, 960, 0, Math.round(y), FW, FH);
    });
    feedTex.needsUpdate = true;
  }

  const P = (d) => new Path2D(d);
  const heart = P("M12 21.2 10.6 20C5.4 15.3 2 12.2 2 8.4 2 5.3 4.4 3 7.4 3c1.7 0 3.4.8 4.6 2.1C13.2 3.8 14.9 3 16.6 3 19.6 3 22 5.3 22 8.4c0 3.8-3.4 6.9-8.6 11.6L12 21.2z");
  const bubble = P("M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8.4L4 21.6V18a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z");
  const play = P("M7 4.5v15l12.5-7.5z");
  function drawUI() {
    const c = ui.getContext("2d");
    c.clearRect(0, 0, FW, FH);
    const g = c.createLinearGradient(0, FH * 0.62, 0, FH);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0.62)");
    c.fillStyle = g;
    c.fillRect(0, FH * 0.62, FW, FH * 0.38);
    const font = (w, s) => w + " " + s + "px Geologica, system-ui, sans-serif";
    c.fillStyle = "#fff";
    c.textBaseline = "alphabetic";
    c.shadowColor = "rgba(0,0,0,0.35)";
    c.shadowBlur = 8;
    c.font = font(700, 25);
    c.fillText("@lizzys_coffee_and_more", 30, FH - 108);
    c.font = font(400, 24);
    c.fillText("POV: Δουλεύεις με Gen Z", 30, FH - 70);
    const icon = (path, label, y) => {
      c.save(); c.translate(FW - 72, y); c.scale(1.9, 1.9); c.fill(path); c.restore();
      c.font = font(600, 21); c.textAlign = "center";
      c.fillText(label, FW - 49, y + 72);
      c.textAlign = "left";
    };
    icon(heart, "5.322", FH - 410);
    icon(bubble, "46", FH - 290);
    icon(play, "520K", FH - 170);
    uiTex.needsUpdate = true;
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(drawUI);

  /* ---- the reel itself plays once the feed has stopped on it ---- */
  const video = document.createElement("video");
  video.muted = true; video.loop = true; video.playsInline = true;
  video.setAttribute("playsinline", ""); video.setAttribute("muted", "");
  video.preload = "none";
  video.src = prefix + base + "reel-lizzys-genz.mp4";
  const vTex = new THREE.VideoTexture(video);
  vTex.colorSpace = THREE.SRGBColorSpace;
  vTex.repeat.set((960 * SW / SH) / 540, 1);
  vTex.offset.set((1 - vTex.repeat.x) / 2, 0);
  let wantPlay = false, videoOn = false;
  video.addEventListener("playing", () => { if (wantPlay) { screenMat.map = vTex; videoOn = true; } });
  function setPlay(on) {
    if (on === wantPlay) return;
    wantPlay = on;
    if (on) { video.preload = "auto"; const pr = video.play(); if (pr && pr.catch) pr.catch(() => {}); }
    else { video.pause(); if (videoOn) { screenMat.map = feedTex; videoOn = false; lastOffset = -1; } }
  }

  /* ---- choreography ---- */
  const brake = gsap.parseEase("brake") || gsap.parseEase("expo.out");
  const inOut = gsap.parseEase("power3.inOut");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const seg = (p, a, b) => clamp((p - a) / (b - a), 0, 1);
  const lerp = (a, b, t) => a + (b - a) * t;

  /* three flicks: two quick ones, then the one that brakes on Lizzy's */
  function feedOffset(p) {
    return inOut(seg(p, 0.04, 0.13)) + inOut(seg(p, 0.17, 0.26)) + brake(seg(p, 0.3, 0.47));
  }

  const night = sec.querySelector(".feed3d__night");
  const beats = Array.prototype.slice.call(sec.querySelectorAll("[data-beat]"));
  const windows = [[-1, 0, 0.17, 0.22], [0.2, 0.25, 0.4, 0.46], [0.5, 0.56, 0.74, 0.79], [0.79, 0.85, 2, 3]];
  const isMobile = () => innerWidth < 900;

  let target = 0, prog = 0, lastP = -1, running = false, w = 0, h = 0;

  function pose(p, t) {
    const a = seg(p, 0, 0.5), b = seg(p, 0.5, 0.8), c = seg(p, 0.8, 1);
    const ea = 1 - Math.pow(1 - a, 3);
    let dist = lerp(8.2, 4.4, ea);
    dist = lerp(dist, 4.1, b);
    dist = lerp(dist, 7.5, c * c);
    const mob = isMobile();
    if (mob) dist *= 1.18;
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);

    const halfH = Math.tan((camera.fov * Math.PI) / 360) * dist;
    const halfW = halfH * camera.aspect;
    pivot.position.x = mob ? 0 : halfW * 0.36;
    pivot.position.y = mob ? -halfH * 0.16 : 0;

    phone.rotation.y = lerp(1.15, 0, ea) - 0.1 * b - 0.75 * c * c + Math.sin(t * 0.8) * 0.02;
    phone.rotation.x = lerp(0.38, 0, ea) + Math.sin(t * 0.6) * 0.015;
    phone.rotation.z = lerp(-0.14, 0, ea) + 0.06 * c;
    phone.position.y = Math.sin(t * 0.9) * 0.015 + c * 0.25;

    drawFeed(feedOffset(p));
    uiMat.opacity = seg(p, 0.48, 0.56);
    /* the night rises from below as a soft-edged curtain, never a grey dim */
    const nt = inOut(seg(p, 0.48, 0.72));
    night.style.transform = "translate3d(0," + (h * (1 - nt * 1.95)).toFixed(1) + "px,0)";
    setPlay(p > 0.46 && p < 1.2);

    beats.forEach((el, i) => {
      const wnd = windows[i];
      const o = Math.min(seg(p, wnd[0], wnd[1]), 1 - seg(p, wnd[2], wnd[3]));
      el.style.opacity = o.toFixed(3);
      el.style.transform = "translate3d(0," + ((1 - o) * (p < wnd[1] ? 24 : -24)).toFixed(1) + "px,0)";
      el.style.visibility = o < 0.01 ? "hidden" : "visible";
    });
  }

  function size() {
    const r = stage.getBoundingClientRect();
    if (r.width === w && Math.abs(r.height - h) < 2) return;
    w = r.width; h = r.height;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    lastP = -1;
  }

  function tick(time) {
    const k = 1 - Math.exp(-gsap.ticker.deltaRatio(60) / (isMobile() ? 6 : 4));
    prog += (target - prog) * k;
    if (Math.abs(target - prog) < 0.0003) prog = target;
    pose(prog, time);
    renderer.render(scene, camera);
  }

  const st = ScrollTrigger.create({
    trigger: sec,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      if (self.isActive && !running) { running = true; size(); gsap.ticker.add(tick); }
      else if (!self.isActive && running) { running = false; gsap.ticker.remove(tick); setPlay(false); }
    }
  });
  ScrollTrigger.create({
    trigger: sec, start: "top top", end: "bottom bottom",
    onUpdate: (self) => { target = self.progress; },
    onRefresh: (self) => { target = self.progress; prog = target; }
  });
  addEventListener("resize", size);
  size();
  pose(0, 0);
  renderer.render(scene, camera);
  if (st.isActive) { running = true; gsap.ticker.add(tick); }
}
