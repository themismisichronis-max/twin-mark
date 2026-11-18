# STATE — TWINMARK v2 (skill upgrade, same structure)

Started 2026-11-17. Goal: apply the upgraded /design skill (R-01…R-15, depth library, Lenis, logo intro, closing idea) to the live site without changing its structure (hero → video → photos → web → how → contact). Work on branch `v2-skill-upgrade`; main stays live on Cloudflare Pages.

## Toolchain
impeccable ✔ · hooks ✔ · Refero — (web fallback, NO_SUBSCRIPTION) · 21st.dev ✔ · GSAP ✔ · ledger ✔ (10 sites) · Playwright ✔

## Proposed (waiting for his yes)
1. Logo intro (R-11): TWINMARK letters one by one, then the mark, hands off to the header. 2–2.5 s, once per session, skippable.
2. Home object (R-01, route C, free): a real 3D phone in the hero showing their own reels; the feed runs fast and brakes on their reel ("content that stops you"); the camera orbits with scroll; 3–5 beats (views counts) instead of a hint.
3. Lenis on every device (R-06) + one velocity layer (ST-24) on the metro line / board.
4. Depth: D-7 · LI-13 · photo posts turn over to show client + results (material already on site).
5. Closing idea instead of footer: question + WhatsApp/brief, TWINMARK wordmark across the width.
6. Motion map + Flow table + Requests table in DESIGN.md; ≥8 techniques.
Keep: palette (logo colours = client's strict colours), Geologica (approved), metro-line direction, all content.

## Cast draw (seed 11361)
PH-09, ST-05, PH-05, ST-13, LI-05, LI-13, TX-04, TX-10. Comfort set: F-04 LI-08 SV-05 SV-08. Avoid as signature: ST-04 ST-17 PH-07.

## Done (branch v2-skill-upgrade, nothing committed)
- R-11 logo intro: assets/js/intro.js (.lintro, once per session, ?intro forces; starts after logo decode; skip on wheel/touch/key/click).
- R-01 3D phone: section #feed (assets/js/feed3d.js, three r183 vendored). Feed flicks posture→chefbf→xagk, brakes on Lizzy's, real mp4 plays, night curtain into #video. GPU init waits for twm:intro-done. Static poster fallback (no JS / reduced motion) checked on both widths.
- ST-23 Lenis on every device (touch native), menu stop/start, anchors via lenis.scrollTo. ST-24: reel phones in #video lean (skewY ≤3°/1.6°) with scroll speed.
- Round 2 (owner approved, 11-17): new stats on the two big reels (Lizzy's 520K/5.322/46; Xagk 89.1K/1334/8/72 saves/49 shares); #how compacted to a departures board (SV-03 train + TX-05 Greek scramble + ST-09), 732→533px desktop, 911→576px phone; D-7·LI-13 flip cards on the 16 posts (back from caption + ratio); footer closing line (TX-03) + WhatsApp, night colour and white logo kept; DESIGN.md v2 tables; EN rebuilt; impeccable detect clean (feed tail moved to ::after, intro markink opacity set in JS).
- QA (round 1): motion-qa clean (desktop 38 / phone 67 animated). Videos: qa/video/desktop.mp4, phone.mp4 (qa/record-v2.mjs).

## Next step
Finish QA (motion-qa, test-recipes into qa/*.txt). Seam gate fails on the v1 flow (colour step 28, hard seams 50%, bridged 0%, dead band 256px, layout repeats 50%): ask the owner whether to touch the seams, since structure was to stay the same. Then videos, hand-off.

## Lessons
- Recording: warm the browser first (unrecorded visit) or the first context shows a blank page for ~4s.
- Heavy WebGL init at load steals frames from an intro: claim layout at once, init GPU after the intro.
- The rm safety check blocks heredocs with Python `.remove(`: write patch scripts to the scratchpad and use removeChild.
- `querySelector("div span")` on a built back face matched the kind label first: scope with `:scope > div span`.
- impeccable's static contrast check reads the far end of a section gradient as the text ground: put a decorative tail on ::after instead.


## 2026-11-17 footer round
- Owner: remove the block between the hairlines and keep only the logo, put in the WhatsApp button's place. Done: `.foot__grid` and `.foot__go` are gone, `.foot__logo` (white wordmark) sits right of the question on desktop and below it on phone, there is one hairline, and the © row stays. The phone actionbar (WhatsApp + Brief) was later removed entirely at the owner's request; WhatsApp stays in the hero/menu and #contact.
- Phone logo has its own trigger (top 80%), because inside the timeline it played offscreen.
- motion-qa track__fill JUMP showed once and was gone on the rerun (flaky).

## 2026-11-17 seams + actionbar round
- Owner: remove the floating button entirely; footer logo smaller and on the same line as «Ας είναι δικό σου.» on phone. Done: `.actionbar` markup, CSS and JS gone; `.foot__logo` 30px absolute right of the last line (<900px), in the timeline after the question; `.foot__ask` shrink scoped to ≤599px.
- Seams: each station's plate hangs centred on its section top (`.station{display:flow-root}` stops the negative margin collapsing, `.lane>.head{margin-top:-plate-h/2}`); night ends in an oklab dusk (night → indigo → mist, `--dusk`, text kept off it); end station fades wall → white; hero bottom gradient no longer tinted. seam-metrics: colourJump 16, hard 0, bridged 0.83, gap 80. layoutRepeat 0.5 left for the owner.
- Lessons: a negative margin on the first child collapses through the section unless the section is a BFC; a footer trigger at `top 62%` is unreachable on a short page, use `clamp()`; check the phone gap after hanging plates (how→contact touched at 375).

## 2026-11-17 · far/near stations + flip cards removed
- Owner: «βγάλε το feature που οι καρτέλες φωτογραφιών γυρνάνε ανάποδα, το βρίσκω περιττό». D-7 · LI-13 removed from motion.js and site.css. The gate now fails on the Depth line until the owner picks another depth idea (D-5 or D-8 need no new material) or confirms none.
- Layout: `.station--far` on #photos and #how (≥1000px), so the plate, statement and lede/board mirror. layoutRepeat 0 on GR and EN, seams still pass.
- Footer close: on the phone the trigger fired 50px before the page ended. Now `top 80%` under 900px and `clamp(top 62%)` above, with the logo playing alongside the lines. motion-qa is clean, test-recipes passes (0 heavy).
- Versions: site.css?v=34, motion.js?v=29.
- Lesson: when a client removes the depth idea, don't swap in another one silently. Record it and ask.
- Owner confirmed: no depth idea on this site («Χωρίς depth idea»). The gate's Depth failure is accepted and recorded in DESIGN.md.

## 2026-11-18 · /finish (pre-launch, not deployed yet)
- Added: privacy/ + en/privacy/ (GDPR, written from the real data flows), 404.html, favicon set + manifest, og.jpg 1200×630, JSON-LD Organization, _headers (CSP with hashed inline script, HSTS, nosniff…), brief legal note, footer links, sitemap with privacy pages.
- Owner facts: not a business (project, unestablished brand) → no ΑΦΜ/ΓΕΜΗ; address «Αθήνα»; analytics = Cloudflare Web Analytics (cookieless, no banner).
- feed3d.js v4: three.js is now dynamically imported after the intro (was eager, ~725 KB competing with the intro).
- Checks on dist/ with headers (localhost:8799): 47 internal links OK; form success/error states OK (mocked Formspree); JSON-LD parses; 404 returns 404; no CSP errors / overflow on phone+desktop; motion-qa CLEAN GR+EN; test-recipes --gpu HEAVY main 2.4–2.5 ms (budget 2; same with eager three, so not from this round; earlier PASS 1.68 on the dev server); Lighthouse phone local (no compression): perf 49 (LCP = h1 after the logo intro, R-11), a11y 97, BP 100, SEO 100.
- Owner dashboard steps still open: Cloudflare Email Routing for hello@ (no MX!), Pages build `sh scripts/dist.sh` → output `dist` (repo root is public today), enable Web Analytics.
- Open: deploy (commit + merge v2 → main) on owner's yes; real form submit after deploy; check OG card by pasting the link; Lighthouse again on the live URL.
