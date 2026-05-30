# JiHyun's Life 🐜

An interactive, storybook-style UI/UX portfolio. A line of ants walks across a
forest scene — **click any ant** and it stops, says *"Hi!"*, and your portfolio
projects float up around its head like the ant's brain. **Click a floating
bubble** to open that project's case study (color palette, cover, details), then
hit **Back** to return.

Built with **React + Vite + Framer Motion**, designed to deploy on **GitHub Pages**.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173/poliouiux/
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Make it yours

- **Background images** — drop `hero-tree.jpg` and `tree-base.jpg` into
  [`public/assets/`](public/assets/README.md). Missing images fall back to a
  green gradient, so the site always works.
- **Projects** — edit [`src/data/projects.js`](src/data/projects.js). There are
  6 sample projects, one per palette color. Change the title, tagline,
  description, role, year, and color.
- **Palette** — the six brand colors live as CSS variables in
  [`src/index.css`](src/index.css) (`--sky`, `--lavender`, `--butter`,
  `--matcha`, `--pink`, `--tangerine`).
- **Number / pace of ants** — `ANT_COUNT` and `WALK_DURATION` in
  [`src/components/AntColony.jsx`](src/components/AntColony.jsx).

## Deploy to GitHub Pages

A workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds and deploys on every push to `main`. In your repo settings, set
**Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

The site is served from `/poliouiux/` (set via `base` in `vite.config.js`). If
you rename the repo, update that `base` to match.
