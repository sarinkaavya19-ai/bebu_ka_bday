# Babu's Birthday World ♡

A tiny midnight universe made for **Babu** — memories, reasons, little surprises, and one long letter. Built with plain HTML, CSS, and JavaScript, so it can live on GitHub Pages (or any static host) without a server, database, or build step.

**The birthday:** 04 · 11 · 2026
**Made by:** Kaavu

---

## What's inside

| File / folder | What it does |
| --- | --- |
| `index.html` | The page structure — all six sections and the modal shell. |
| `styles.css` | Every colour, font, layout, and animation. |
| `script.js` | Renders the content, runs the gallery, song, envelope, confetti, and starfield. |
| `config.js` | **The only file you need to edit.** Names, photos, reasons, surprises, and letters live here. |
| `images/` | The nine prepared photos. |
| `audio/our-song.mp3` | The song used in the “Our song” card. |
| `favicon.svg` | The little heart-and-star browser icon. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. |
| `Readme` | The original design brief (kept for reference). |

---

## Open it locally

1. Open the folder `C:\Users\Monika\bebu_ka_bday`.
2. Double-click `index.html`.

That's it — no installation. For the most reliable fonts and audio, use Chrome, Edge, Firefox, or Safari. An internet connection is needed the first time the page loads its Google Fonts.

If audio does not play when you double-click the file, open the folder in a terminal and run a small local server instead:

```powershell
# Python 3
python -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## Personalise it

Everything personal is in **`config.js`**. Open it in Notepad, VS Code, or any text editor. Keep the quotes and commas intact.

### 1. Names and date

```js
names: {
  him: "Babu",
  her: "Kaavu",
  signature: "Kaavu ♡"
},
birthday: {
  date: "2026-11-04",
  display: "04 · 11 · 2026",
  label: "the day the world got you"
}
```

- `him` is used in the nav, footer, and hero heading.
- `her` is used in signatures and the hero line.
- `display` is what appears on the page. `date` is kept for reference and future use.

### 2. Photos

1. Put your new photo in the `images/` folder.
2. In `config.js`, find `memories.photos`.
3. Update the photo's `src`, `alt`, `caption`, `meta`, `width`, and `height`.

Example:

```js
{
  src: "images/memory-sunset.jpg",
  alt: "Babu and Kaavu silhouetted against a sunset over the water",
  caption: "The evening the world went quiet — and it was just us.",
  meta: "somewhere by the water",
  width: 933,
  height: 1186
}
```

Tips:

- **Portrait or landscape both work** — the Polaroid frames adapt.
- Keep photos under roughly **500 KB each** where possible, so the page loads gently on a phone.
- `alt` should describe the photo for someone who cannot see it. It is not the same as the caption.
- To hide a photo, delete its `{ ... }` block (and the comma before or after it).
- The ninth photo is `memories.hidden`. The “There's one more memory…” button reveals it. To remove that final surprise, delete the whole `hidden: { ... }` block and the `hiddenButton` / `hiddenNote` lines.
- To add more photos, copy an existing block, paste it after it, and separate blocks with commas.

### 3. Reasons I love you

Edit `reasons.items`. Each entry has a `title` (the short word on the heart) and a longer `message` (what opens when he taps it). Add or remove entries freely — the heart grid reflows automatically.

### 4. The Surprise Room

The four cards are listed in `surprises.cards`. Each card needs an `id` that matches one of the built-in surprises:

| `id` | Opens |
| --- | --- |
| `secret` | `surprises.secret` — the secret message |
| `song` | `surprises.song` — the music player |
| `open-when` | `surprises.openWhen` — the “open when you miss me” letter |
| `wish` | `surprises.wish` — the birthday wish star |

You can change each card's `number`, `icon`, `title`, and `text`. If you remove a card, remove its whole `{ ... }` block. The card order in the array is the order on the page.

### 5. The song

The player uses `audio/our-song.mp3`. To swap the song:

- **Easiest:** replace `audio/our-song.mp3` with your new file, keeping the same filename.
- **Or:** put the new file in `audio/` and update `surprises.song.src` in `config.js`.
- Update `songTitle`, `artist`, and `note` to match.
- `link` is optional. Add a Spotify/YouTube/Apple Music URL to show a button under the player; leave it as `""` to hide the button.

The song **never autoplays**. It only starts when he presses play, and it pauses when the modal closes.

### 6. The letters

- `surprises.secret` — the secret message.
- `surprises.openWhen` — the “open when you miss me” letter.
- `letter` — the long final letter inside the envelope.
- `wish` and `surprises.wish` — the wish section and the wish card.

Each `body` or `paragraphs` entry becomes its own paragraph. Keep each paragraph as a quoted string and separate entries with commas. The final entry should not have a trailing comma.

### 7. Ambient sound

The gentle background hum is generated in the browser with the Web Audio API — there is no second audio file. It starts only when the **Sound off** button is pressed. To remove the button entirely, set:

```js
ambient: {
  enabled: false,
  volume: 0.045
}
```

---

## Publish it on GitHub Pages

1. Create a GitHub repository (for example `bebu-ka-bday`).
2. Upload the contents of this folder — **not** the folder itself — so `index.html` sits at the top level of the repository.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. GitHub will give you a URL like `https://your-username.github.io/bebu-ka-bday/`.

The included `.nojekyll` file lets GitHub Pages serve `images/` and `audio/` directly. No build step is needed.

### A note about privacy

**GitHub Pages is public.** Anyone who has the link can open the page, and public repositories can be indexed by search engines. The page includes `<meta name="robots" content="noindex, nofollow">`, which asks search engines not to list it, but that is a request — **not real security**.

If you want it to be genuinely private:

- Keep the repository **private** (GitHub Pages availability depends on your GitHub plan), or
- Host it somewhere with password protection, or
- Add authentication in front of it (for example, Netlify password protection or Cloudflare Access).

Do not put anything in the site that you would be uncomfortable with a stranger reading. The letters are personal; the site is a gift, not a vault.

---

## Accessibility & motion

- Every interactive element is a real button or link and can be reached with the keyboard.
- The modal closes with the **×** button, a click outside the panel, or the **Esc** key.
- In the photo lightbox, the **←** and **→** arrow keys move between memories.
- The page respects **`prefers-reduced-motion`**: the starfield becomes still, confetti and floating hearts are skipped, and scroll transitions are removed.
- Photos include descriptive `alt` text; update it when you change a photo.
- Text colours were chosen for contrast against the midnight background.

---

## Troubleshooting

**The page looks unstyled.**
Make sure `styles.css`, `config.js`, and `script.js` are in the same folder as `index.html`.

**Photos are broken.**
Check the `src` path. It is case-sensitive on GitHub Pages: `images/memory-sunset.jpg` is not the same as `images/Memory-Sunset.JPG`.

**The song will not play.**
Confirm the file is at `audio/our-song.mp3`. Browsers block audio until the user presses play; pressing the player button is the permission. If you opened the page by double-clicking, try a local server instead.

**The envelope and the letter overlap strangely.**
They are designed to share the same grid cell. Make sure the `.envelope-scene > .envelope, .envelope-scene > .letter-paper { grid-area: 1 / 1; }` rule is present in `styles.css`.

**I edited `config.js` but nothing changed.**
Save the file and refresh with **Ctrl + F5** (or **Cmd + Shift + R**) to bypass the browser cache.

---

Made with a whole heart, for Babu. ♡
