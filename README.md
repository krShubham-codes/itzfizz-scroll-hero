# ItzFizz – Scroll-Driven Hero Animation

Next.js (static export) + Tailwind CSS + GSAP ScrollTrigger.

- **Intro:** headline letters stagger in, car rises, then hint fades in (GSAP timeline).
- **Scroll:** hero is pinned; a single scrubbed timeline (`scrub: 1`) drives the car (translate/scale/rotate), road dashes, headline and the 4 stats (which count up as they appear). Everything is progress-based, so it reverses when scrolling up.
- **Performance:** only `transform` + `opacity` are animated, `will-change: transform`, no layout reads on scroll.
- Respects `prefers-reduced-motion`.

## Run
```bash
npm install
npm run dev
```

## Deploy (GitHub Pages)
Push to `main`; in repo **Settings → Pages → Source: GitHub Actions**. The included workflow builds and publishes to `https://<user>.github.io/<repo>/`.
