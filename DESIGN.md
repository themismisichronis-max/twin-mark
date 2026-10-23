---
name: TWINMARK
description: The TWINMARK line. Athens Metro wayfinding in the brand gradient; scrolling is riding from station to terminus.
colors:
  aqua: "#7acfd6"
  steel: "#5384b7"
  indigo: "#3d51a3"
  indigo-deep: "#2c3c83"
  harbour-blue: "#1f6490"
  teal: "#007775"
  teal-deep: "#005c5a"
  tile: "#ffffff"
  mist: "#eef7f8"
  wall: "#f3f5fa"
  night: "#0e1330"
  ink: "#14183a"
  ink-soft: "#4b5372"
  ink-night: "#b9c0da"
  rule: "#dfe4ee"
  track: "#e1e6ef"
  ring-off: "#cbd2df"
  board: "#16171d"
  board-rule: "#2a2c35"
  amber: "#ffb21a"
  error: "#c2362f"
  media-scrim: "rgba(0, 0, 0, 0.62)"
  media-shadow: "rgba(0, 0, 0, 0.5)"
typography:
  display:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.7rem, 5.4vw, 4.75rem)"
    fontWeight: 750
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  sign:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.45rem, 3.4vw, 2.9rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.6rem)"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.35rem, 2.3vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.06rem, 1.4vw, 1.25rem)"
    fontWeight: 350
    lineHeight: 1.55
  body:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 350
    lineHeight: 1.6
  figure:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.35rem, 2vw, 1.7rem)"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "0.02em"
    fontFeature: "tnum"
  ui:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 550
    lineHeight: 1.45
  small:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 350
    lineHeight: 1.35
  label:
    fontFamily: "Geologica, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.1em"
rounded:
  dot: "6px"
  board: "10px"
  image: "12px"
  frame: "16px"
  phone-web-screen-small: "16px"
  phone-web-small: "20px"
  phone-web-screen: "21px"
  brief: "22px"
  phone-web: "26px"
  card: "28px"
  phone-screen: "32px"
  phone: "40px"
  pill: "999px"
spacing:
  pad: "clamp(16px, 4vw, 56px)"
  lane-phone: "34px"
  lane-desktop: "108px"
  step: "clamp(96px, 12vw, 176px)"
  max: "1320px"
  nav-phone: "64px"
  nav-desktop: "76px"
components:
  button-go:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.tile}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "54px"
  button-go-hover:
    backgroundColor: "{colors.teal-deep}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "54px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tile}"
  station-sign:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.tile}"
    typography: "{typography.sign}"
    rounded: "{rounded.pill}"
    padding: "clamp(12px, 1.3vw, 18px) clamp(20px, 2.4vw, 34px)"
  station-sign-night:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.indigo}"
  departure-board:
    backgroundColor: "{colors.board}"
    textColor: "{colors.amber}"
    typography: "{typography.figure}"
    rounded: "{rounded.board}"
    padding: "4px 0"
  network-map-card:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(18px, 2.4vw, 30px)"
  input-field:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.image}"
    padding: "13px 16px"
    height: "52px"
  choice-chip:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "46px"
  choice-chip-checked:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tile}"
---

# Design System: TWINMARK

## Overview

**Creative North Star: "The TWINMARK Line"**

The site is a ride on one metro line. Athens Metro wayfinding, translated into the TWINMARK brand: station-tile white ground, indigo station signs that carry a Greek name with a smaller Latin name beneath, white rings on a single line drawn in the logo gradient (aqua, steel, indigo, harbour blue, teal), octilinear routing on the network map, amber LED figures on a row-based departure board, and teal reserved for the action. Scrolling is travelling: each kind of work is its own station, the brief is the terminus. Structure is the only ornament placed on the work itself.

It is mature rather than plain. The header is white with the full-colour logo, and atmosphere comes from static brand-colour radial washes laid into the grounds (hero, the Video station's night ground, the Photos station's mist) plus one gradient terminus ground running teal-deep to harbour blue to indigo. Depth is real but quiet: the network map sits on a raised card, the website sits in a raised browser frame with its phone version beside it, the phones carry their own bezels, and the brief is the one card on the terminus. Nothing repaints on scroll to create atmosphere.

Photos and videos never mix. Each kind of work gets its own station and its own presentation (reels inside phones, posts as a passing strip of carriages, websites inside a browser frame with a small phone frame beside it), one figure per piece of work, real numbers only.

**Key Characteristics:**
- One gradient line runs the page in a left lane; every section heading is a station sign mounted on a ring on that line.
- White and mist grounds by day, one night ground for video, a gradient ground for the terminus.
- Geologica is the only face; heavy for signs and display, light (350) for reading.
- Amber appears only on live figures; teal appears only on actions and "you are here".
- Fully round pills and rings are the dominant shape; rectangles only frame work.

## Colors

The brand gradient does the colour work; everything else is tile white, cool greys and a deep indigo ink.

### Primary
- **Station Indigo** (indigo): the station sign plate, the wordmark colour, the indigo stop rings in the Websites points. Signs are the section headings, so indigo is the colour of "where you are".
- **Deep Platform Indigo** (indigo-deep): the darker indigo partner for pressed/deep indigo surfaces.

### Secondary
- **Departure Teal** (teal): the primary action ("Send a brief", WhatsApp), focus rings, the active "you are here" dot in the header, the checked step in the brief, the terminus dot on the map. Teal-deep is its hover.
- **Line Gradient** (aqua, steel, indigo, harbour-blue, teal): the five line colours from top of page to terminus. Each station fills between two adjacent stops (Video aqua to steel, Photos steel to indigo, Websites indigo to harbour blue, How we work harbour blue to teal, terminus teal). Aqua also serves as text selection, link hover on dark grounds and the checked-chip dot. Harbour blue is a built intermediate stop that bridges indigo and teal; it is not in PRODUCT.md's brand gradient but the line uses it.

### Tertiary
- **LED Amber** (amber): live figures only. The departure board values, the view counts on reels, the held figure in the pause passage. Always on the board's near-black (board).

### Neutral
- **Station Tile** (tile): the default ground and every raised card.
- **Platform Mist** (mist): the Photos station ground and the light hover for white buttons.
- **Concourse Wall** (wall): the How-we-work station ground and header link hover.
- **Night Line** (night): the Video station ground and the footer.
- **Ink** (ink) and **Soft Ink** (ink-soft): headings and body, secondary copy.
- **Night Soft Ink** (ink-night): soft ink on dark grounds. Board labels, the Video station (where it replaces ink-soft), footer copy and footer headings.
- **Board Rule** (board-rule): the 1px divider between departure-board rows.
- **Rule** (rule), **Track** (track), **Unlit Ring** (ring-off): dividers, the unfilled line, and stops the train has not reached. Unlit ring is also the shared quiet grey for map branches, unchecked chip and leg rings, field and chip hover borders, and the browser-frame dots.
- **Error Red** (error): field errors and form status only.

### Overlays
- **Media Scrim** (media-scrim): the dark chip behind the Instagram/TikTok platform label laid over a reel.
- **Media Shadow** (media-shadow): the shadow under the white play disc on a reel. All other shadows are neutral black at the opacities in Elevation & Depth.

### Named Rules
**The Amber Is Live Rule.** Amber marks a real, current number on the dark board ground. Never on decoration, never on a label, never on a white ground.

**The Teal Means Go Rule.** Teal is the action colour and the "you are here" colour. A teal element is something you press or the place you are.

**The One Line Rule.** There is one line per page and it is drawn in the brand gradient, top to terminus, in order. Secondary branches (map branches, the How-we-work route) are grey or a short slice of the same gradient.

## Typography

**Display Font:** Geologica (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Geologica
**Label Font:** Geologica

Geologica is the only face, self-hosted as one variable woff2 per subset (greek, latin, latin-ext; weight axis 100 to 900, font-display swap; greek and latin preloaded). It was chosen over the planned Sofia Sans on a Greek-glyph comparison: its Greek is clear at signage weights, which is what the station signs and the Greek-primary page need. One family, carried by weight: 800 for sign names, 750 for display and figures, 600 to 700 for titles and emphasis, 350 for reading.

**Character:** Geometric signage sans with an even Greek and Latin; heavy and tracked-open on signs, tight and dense on display, light and generous in the copy.

### Hierarchy
- **Display** (750, clamp(2.7rem, 5.4vw, 4.75rem), 0.98, -0.04em): the hero headline only.
- **Sign** (800, clamp(1.45rem, 3.4vw, 2.9rem), 1, +0.04em): the Greek station name on the plate. The Latin name sits beneath at weight 450, +0.02em, 90% opacity: small (0.875rem) on phones, body size (1.0625rem) from 900px.
- **Headline** (750, clamp(2rem, 4.4vw, 3.6rem), 1.02, -0.035em, max 14ch): the terminus heading. The held pause passage after the reels uses the same size at a softer weight (650, 1.08, -0.03em).
- **Statement** (600, clamp(1.35rem, 2.3vw, 2rem), 1.22, -0.02em, max 24ch, balanced): the one line under each sign; a lead, not a second headline.
- **Title** (700, 1.35rem, -0.01em): step titles in How we work and the brief title.
- **Lede** (350, clamp(1.06rem, 1.4vw, 1.25rem), 1.55 to 1.6, max 46ch): the hero sub and station intros, in soft ink.
- **Body** (350, 1.0625rem, 1.6): running copy; bold is 650. Form inputs and textareas are set at body size on purpose: iOS zooms into any field under 16px. Point titles and the brief step legend also use body size.
- **UI** (0.95rem): nav links, buttons, chips, field labels, reel names and captions, website caption, points and route copy, brief sub and hints, the pause footnote. The working size for controls and secondary paragraphs.
- **Small** (0.875rem, the `--fs-small` token): post captions, stats meta, transfer badges row, Latin plate names on phones, direct-contact sub lines, field help and errors.
- **Figure** (750, clamp(1.35rem, 2vw, 1.7rem), +0.02em, tabular numerals): amber board values.
- **Label** (600, 0.78rem, +0.1em, uppercase): departure-board row names and footer column headings, the way platform screens label their rows. The same 0.78rem size, not uppercase, sets dense chrome: the language switch, badges, platform chips, the client meter, the brief legs, the route numbers, the browser URL and the map card head.

The network map's labels are SVG presentation attributes in viewBox units, not CSS type: station names 17, the departure label 13, Latin names and branch labels 11.5. They scale with the map card.

### Named Rules
**The One Face Rule.** Geologica only. Hierarchy comes from weight and size, never from a second family.

**The Sign Is The Heading Rule.** A station's heading is its sign plate. No separate label or kicker above a heading.

## Motion

**Metaphor: a train running the line.** Travel is vertical and smooth; arrivals are lateral and crisp. All motion is self-hosted GSAP 3.15 (gsap, ScrollTrigger, CustomEase in `assets/vendor/gsap`), set up in `assets/js/motion.js` inside one `gsap.matchMedia` with desktop (min-width 900px), mobile (max-width 899.98px) and reduce branches.

### The two eases
- **Brake** (CustomEase `brake` = `M0,0 C0.22,0.9 0.24,1 1,1`; CSS twin `--ease-brake: cubic-bezier(0.22, 0.9, 0.24, 1)`): quick departure, long gentle stop. Used for travel and settling: reels arriving, map text, the route line, ring scale, header hide, action bar, brief progress, button press. Fallback without CustomEase: `expo.out`.
- **Doors** (CustomEase `doors` = `M0,0 C0.55,0 0.1,1 1,1`; CSS twin `--ease-doors: cubic-bezier(0.55, 0, 0.1, 1)`): a fast centre-split opening. Used only for things that open like platform doors. Fallback: `power3.inOut`.

### Where motion happens
- **Network map self-draw:** the logo mark strokes in, then the main line draws by stroke offset (1.8s desktop, 1.2s phone, power1.inOut); each stop pops in (back.out) when the drawn tip reaches it, its names follow, branches grow by scaleY. On desktop it plays on load; on phones it waits until the map is seen (top 65%). The board figures count up once alongside it.
- **Line fill per section:** each station's line segment fills by transform scaleY, scrubbed from "top 62%" to "bottom 62%". 62% down the viewport is the tip horizon where the train rides (scrub 0.3 desktop, direct on phones).
- **Station rings light** (class toggle, ring colour and scale 0.8 to 1 on brake) when their centre crosses the 62% tip.
- **Doors:** station sign plates open from a centre-split `clip-path: inset(0 50% 0 50% round 999px)` (0.62s desktop, 0.5s phone, at top 78%); the website browser frame opens the same way with its 16px radius (1s desktop, 0.8s phone), and on desktop only its image settles from scale 1.08.
- **The website's phone pulls out** from behind the browser (x from -70 desktop, -30 phones, with autoAlpha, brake, 1.1s / 0.8s, delay 0.35), once, on the browser's trigger.
- **Live site on demand:** desktop with a fine pointer only, a "try it live" teal button inside the browser frame loads the live site in an iframe (rendered at 1440 x 900 and scaled to the frame with transform). Nothing loads until it is clicked; the iframe crossfades in over the capture (opacity 0.5s) once loaded. Phones and touch screens get only the link to the real site.
- **Reels arrive laterally** (x from -90 on desktop, from 48 on phones, with autoAlpha, brake, stagger 0.11 / 0.08), once.
- **The photo strip** passes sideways on a sticky stage while the page scrolls down: the track translates on x, scrubbed over a section height of viewport + strip distance x factor (0.6 desktop, 0.42 phone). The client-stop meter under it follows.
- **Count-ups** (1.4s power2.out, tabular numerals) on the board and the pause figure, once. A counting figure inside a sentence reserves its final width (the pause figure is an inline-block at min-width 7ch) so the text never re-wraps mid-count.
- **How-we-work route** draws once (scaleX on desktop, scaleY on phones, brake).

### Where motion never happens
Body copy, statements and ledes; the brief form (only its step change and progress fill move); the footer.

### Phones
Same scenes, lighter: scroll factor 0.42 instead of 0.6, entrance triggers at top 78% or lower (reels 80%, route 80%, browser 70%), the map waits until it is seen, reels sit in a native scroll-snap swipe row, the website image keeps only the doors. The line runs in a narrow 34px gutter (6px line, 22px rings) instead of the 108px desktop lane (10px line, 34px rings).

### Reduced motion and no JS
Content never depends on motion. Without JS or with `prefers-reduced-motion: reduce`, no GSAP scene is created: the line is fully drawn, every station is lit, the map is drawn, the photos are a native horizontal swipe row, everything is visible, and CSS transitions collapse to 0.01ms. A head bootstrap adds `motion-pending` only when motion is allowed, hiding the few `data-motion-hide` elements (map, board figures) until motion.js calls `motionReady()`; a 2.5s failsafe removes the class if scripts never arrive. If GSAP is missing, motion.js releases immediately.

### Performance rules that must hold
- Animate only transform, opacity, SVG stroke offsets and a single element's clip-path.
- No blur filters, no backdrop-filter, anywhere.
- Compositor layers (`will-change: transform`) only on the line fills and the photo track.
- One reel video loads and plays at a time (`preload="none"`, posters first; the most-visible reel at 60%+ plays, others pause; none autoplay under reduced motion or Save-Data).

### Performance guardrails
The old site lagged on every device. These patterns caused it and are banned:
- A page-tall scroll-scrubbed SVG line with geometry rebuilt on scroll (the line is now CSS segments filled by scaleY).
- Images spawned or animated on every scroll step.
- Large blur filters and backdrop-filter.
- Live iframe embeds loaded with the page. The website is a static capture inside a browser frame; the only allowed live embed is the on-demand iframe described above (desktop, fine pointer, loaded on click, never on phones).
- Several autoplaying videos at once.

## Layout

A centred container (min(100% minus 2 x pad, 1320px), pad clamp(16px, 4vw, 56px)) with a left lane reserved for the line: 34px on phones, 108px from 900px. The line sits on its own layer under the content (rail), so full-bleed work (reels on phones, the photo strip, the terminus panel) crosses it the way a platform does. Station heads are a two-column grid: the ring in the lane, the sign beside it. Stations open with a step of clamp(96px, 12vw, 176px) and close at 0.7 of it.

The hero is two columns from 1080px (headline, sub, actions and board left at 1.32fr; the map card right at 0.68fr, min 360px). Station intros split statement and lede into two equal columns from 1000px. Reels are a swipe row on phones and a four-column grid from 900px with even reels dropped 84px. Websites is 1.7fr devices to 1fr points from 1000px; the devices stage reserves 13% right and 6% bottom (20% under 600px) so the phone frame (25% wide, min 112px; 30% under 600px) can overlap the browser's lower right corner. How we work stacks on phones and runs four across from 900px. The header nav appears at 1120px; below it a menu sheet with its own short line. A fixed pill action bar (WhatsApp and brief) appears on phones past the hero.

**The Lane Rule.** The left lane belongs to the line. Content starts after the lane; only full-bleed work crosses it.

## Elevation & Depth

A hybrid: grounds are flat and tonal (tile, mist, wall, night, the terminus gradient, with static radial washes), and a small set of raised objects carry long, soft, downward shadows in neutral black. Depth is reserved for the things you look at or into: the map card, the browser frame, the brief, the photos, the phones, the board. The terminus itself is a ground and casts no shadow.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 22px 40px -24px rgba(0,0,0,0.28)`): the departure board and each photo.
- **Deep** (`box-shadow: 0 2px 6px rgba(0,0,0,0.06), 0 40px 70px -34px rgba(0,0,0,0.38)`): the network map card and the browser frame.
- **Brief** (`box-shadow: 0 40px 80px -40px rgba(0,0,0,0.5)`): the brief card on the terminus gradient.
- **Header** (`0 12px 30px -24px rgba(0,0,0,0.28)` once scrolled), **Menu sheet** (`0 30px 50px -30px rgba(0,0,0,0.36)`), **Action bar** (`0 20px 40px -16px rgba(0,0,0,0.4)`): the floating chrome.
- **Play disc** (`0 10px 30px -8px` media-shadow): the reel play button.
- **Go glow** (`box-shadow: 0 14px 28px -14px rgba(0,119,117,0.7)`): the teal primary button only.
- **Phone bezel** (inset 1.5px white at 12%, `0 32px 56px -30px rgba(0,0,0,0.75)`): reel phones on the night ground.

### Named Rules
**The Static Atmosphere Rule.** Atmosphere is painted once into the ground as radial gradients in brand colours. It never moves, never blurs, never uses backdrop-filter.

## Shapes

Round is the system: fully round pills (999px) for signs, buttons, chips, the language switch, the action bar and badges; circles with thick borders for every stop (rings, the menu stops, the brief legs, the client meter, the Websites points). Rectangles only frame work, softened by size: focus and small chips 6px, the board 10px, photos and fields 12px, browser frame and contact rows 16px, brief 22px, map card and terminus 28px, reel phones 40px outer / 32px screen, the website phone 26px / 21px (20px / 16px under 600px). Bars, tracks and small lines use the pill radius; there are no 2, 4, 8 or 20px corners. Lines have round caps; the map is routed octilinear.

**The Ring Rule.** A stop is a white (or ground-coloured) circle with a heavy ink border. Unlit stops are grey and slightly smaller; lit or current stops are ink or teal.

## Components

### Buttons
Confident, round, heavy-labelled.
- **Shape:** full pill (999px), min height 54px (46px in the header, 48px in the action bar), 24px side padding, weight 650.
- **Go (primary):** teal with white text and the go glow; hover teal-deep.
- **Line (secondary):** 2px ink outline, transparent; hover fills ink with white text.
- **Press:** translateY(1px) scale(0.985). Disabled at 45% opacity, no shadow.
- **Focus:** 3px teal outline, 3px offset.

### Station Sign (signature)
The section heading. An indigo pill with the Greek name (sign role) and the Latin name beneath, mounted beside a ring on the line. On the night ground it inverts to a white plate with indigo text. It opens with the doors ease.

### Departure Board (signature)
A near-black panel (board) with 10px corners and the lift shadow, one row per figure: an uppercase night-soft-ink label at left, an amber tabular figure at right, rows divided by 1px board-rule. The same board treatment appears inline as the view-count chip on each reel.

### Network Map Card (signature)
A white card with a 1px rule border, 28px corners and the deep shadow. Inside, an SVG line map of the site in the brand gradient (12px stroke, round joins), unlit-ring grey branches, ring and pill stops in ink that turn teal on hover or focus; every stop is a link.

### Work Frames
- **Phone:** a 9:16 screen inside a dark gradient bezel with an island, a platform chip (Instagram or TikTok) and a centred white play disc. One reel at a time.
- **Photo strip:** posts at a shared height, native aspect ratio, 12px corners, lift shadow, caption under each taking the image's width.
- **Devices (Websites):** a browser frame (16px, rule border, deep shadow, wall-grey bar with three neutral unlit-ring dots and a pill URL link that turns teal on hover) holding a 1440:900 static capture, plus a small phone frame with the mobile capture overlapping its lower right. On desktop with a fine pointer a teal "try it live" button in the frame's lower left swaps in the live site on demand.

### Cards / Containers
- **Terminus ground:** not a card. A 28px-radius gradient ground (teal-deep to harbour blue to indigo at 125deg, with aqua and ink washes), no shadow, white text; holds direct-contact rows (16px, white at 10% with a white 24% border; the main row is solid white) and the brief.
- **Brief:** the only card. White, 22px corners, the brief shadow.

### Inputs / Fields
- **Style:** 52px min height, 12px corners, 1.5px rule border, tile fill, soft-ink placeholder, text at body size (never under 16px, so iOS does not zoom); hover border unlit ring.
- **Focus:** teal border, white fill, 4px teal halo at 15%.
- **Error:** error-red border with a 12% red halo and a bold red message.

### Chips (brief choices)
Pills, 46px high, with a small ring before the label. Checked fills ink with white text and an aqua dot.

### Navigation
White sticky header (64px phone, 76px desktop) with the colour logo; a rule and soft shadow appear once scrolled, and it slides away on scroll down. Station links are pills with a small ring before each label; the ring fills teal and scales 1.2 for the section on screen. EN pill switch, teal "Send a brief". Below 1120px an ink menu pill opens a white sheet listing the stations on its own short gradient line.

## Do's and Don'ts

### Do:
- **Do** make every section heading a station sign on a ring on the one line.
- **Do** keep amber for real figures on the board ground, and teal for actions and "you are here".
- **Do** give each kind of work its own station and frame: reels in phones, posts in the strip, websites in the browser.
- **Do** use the brake ease for travel and the doors ease for openings, and keep phones on the same scenes, lighter.
- **Do** keep everything readable and visible with no JS and under reduced motion.

### Don't:
- **Don't** mix photos and videos in one presentation.
- **Don't** add a second typeface; Geologica carries every role.
- **Don't** use blur filters or backdrop-filter, or animate anything other than transform, opacity, stroke offsets and a single clip-path.
- **Don't** scrub a page-tall SVG, spawn images on scroll, load a live iframe with the page (live sites load only on click, desktop only), or autoplay more than one video.
- **Don't** put a label or kicker above a heading; the sign is the heading.
- **Don't** move body copy, the brief form (beyond its step change) or the footer.
