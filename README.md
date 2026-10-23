# TWINMARK · site

Στατικό site (HTML/CSS/JS), χωρίς framework. Ελληνικά στο `index.html`, αγγλικά στο `en/index.html`.

## Προβολή στον υπολογιστή

```bash
npm run serve
```

Μετά άνοιξε http://localhost:8787 (αγγλικά: http://localhost:8787/en/).

## Ανέβασμα

```bash
sh scripts/dist.sh
```

Φτιάχνει τον φάκελο `dist/` μόνο με ό,τι χρειάζεται το site (~10MB). Ανέβασε **μόνο** το περιεχόμενο του `dist/` στον host (Cloudflare Pages, Netlify, cPanel κ.λπ.). Αν ο host χτίζει από το git (π.χ. Cloudflare Pages), βάλε build command `sh scripts/dist.sh` και output folder `dist`.

## Αλλαγές κειμένων

1. Άλλαξε το ελληνικό `index.html`.
2. Ξαναφτιάξε την αγγλική σελίδα με `python3 scripts/make-en.py`. Αν άλλαξες κείμενο που έχει μετάφραση, πρόσθεσε το ζευγάρι ελληνικά → αγγλικά στη λίστα `pairs` μέσα στο `scripts/make-en.py`. Το script σταματά και σου δείχνει ποιο κείμενο δεν βρήκε.

## Έλεγχοι πριν ανεβάσεις

```bash
npm run serve
node scripts/tour.mjs http://localhost:8787/
```

Το `tour.mjs` περνάει τη σελίδα σε desktop και κινητό, κρατάει εικόνες στο `.impeccable/review/tour/` και δείχνει αν υπάρχουν σφάλματα.

## Νέα δουλειά

- **Post:** βάλε την εικόνα στο `assets/media/work/` σε δύο μεγέθη (`όνομα-400.webp` και `όνομα-800.webp`) και αντίγραψε μια γραμμή `<li class="post" …>` στο `index.html`. Το `--ar` είναι η αναλογία πλάτος/ύψος (π.χ. `.8` για 4:5, `.5625` για 9:16, `1` για τετράγωνο). Το `data-client` είναι η σειρά του πελάτη στον μετρητή από κάτω.
- **Reel:** βίντεο 540×960 MP4 και poster WebP στο `assets/media/reels/`, και αντίγραψε ένα `<li class="reel" …>`.

## Φόρμα

Η φόρμα στέλνει στο Formspree (`https://formspree.io/f/xnjednyq`).

## Το site του Lizzy's

Στο κεφάλαιο Ιστοσελίδες φαίνονται φωτογραφίες του https://www.lizzyscoffee.gr (desktop και κινητό) με link στο live site. Στον υπολογιστή, το κουμπί «Δοκίμασέ το εδώ, live» φορτώνει το ζωντανό site μέσα στο πλαίσιο **μόνο όταν πατηθεί**. Μην το κάνεις να φορτώνει αυτόματα: ένα ζωντανό site μέσα στο δικό σας ήταν από τους λόγους που κολλούσε το παλιό.

Για νέες φωτογραφίες του site: ένα screenshot 1440×900 (desktop) και ένα 390×693 (κινητό), αποθηκευμένα ως WebP με τα ίδια ονόματα στο `assets/media/work/lizzys-site-*.webp`.

## Αρχεία σχεδιασμού

- `PRODUCT.md`: τι είναι το TWINMARK, για ποιον και με ποια στοιχεία.
- `DESIGN.md`: χρώματα, γραμματοσειρά, κίνηση, κανόνες ταχύτητας.
