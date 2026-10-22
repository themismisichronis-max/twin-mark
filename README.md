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

Φτιάχνει τον φάκελο `dist/` μόνο με ό,τι χρειάζεται το site (~10MB). Ανέβασε **μόνο** το περιεχόμενο του `dist/` στον host (Cloudflare Pages, Netlify, cPanel κ.λπ.). Μην ανεβάσεις τα `NOT-FOR-UPLOAD/`, `old-site/`, `node_modules/` και τα υπόλοιπα αρχεία εργασίας.

## Αλλαγές κειμένων

1. Άλλαξε το ελληνικό `index.html`.
2. Ξαναφτιάξε την αγγλική σελίδα με `python3 scripts/make-en.py`. Αν άλλαξες κείμενο που έχει μετάφραση, πρόσθεσε το ζευγάρι ελληνικά → αγγλικά στη λίστα `pairs` μέσα στο `scripts/make-en.py`. Το script σταματά και σου δείχνει ποιο κείμενο δεν βρήκε.

## Νέα δουλειά

- **Post:** βάλε την εικόνα στο `assets/media/work/` σε δύο μεγέθη (`όνομα-400.webp` και `όνομα-800.webp`) και αντίγραψε μια γραμμή `<li class="post" …>` στο `index.html`. Το `--ar` είναι η αναλογία πλάτος/ύψος (π.χ. `.8` για 4:5, `.5625` για 9:16, `1` για τετράγωνο). Το `data-client` είναι η σειρά του πελάτη στον μετρητή από κάτω.
- **Reel:** βίντεο 540×960 MP4 και poster WebP στο `assets/media/reels/`, και αντίγραψε ένα `<li class="reel" …>`.

## Φόρμα

Η φόρμα στέλνει στο Formspree (`https://formspree.io/f/xnjednyq`). Το link του site του Lizzy's θα μπει ξανά όταν το site είναι online. Τώρα η διεύθυνση `lizzys-site-test…workers.dev` δεν δείχνει τίποτα.

## Αρχεία σχεδιασμού

- `PRODUCT.md`: τι είναι το TWINMARK, για ποιον και με ποια στοιχεία.
- `DESIGN.md`: χρώματα, γραμματοσειρά, κίνηση, κανόνες ταχύτητας.
- `old-site/`: το προηγούμενο site, κρατημένο μόνο για αναφορά.
