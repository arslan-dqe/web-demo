# DQE Web Demo

Landing page variations.

**Repository:** https://github.com/arslan-dqe/web-demo

---

## Installation

**Requirements:** Node.js 18+, npm

```bash
git clone https://github.com/arslan-dqe/web-demo.git
cd web-demo
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173`. The home page (`/`) lists all available landing pages — click any card to open it in a new tab.

## Production Build

```bash
npm run build
npm run preview
```

---

## Pages

All pages live under `src/pages/web/`. The index page auto-discovers them — no registration needed when you add a new file.

## Deployment

This project is deployed on **Vercel** and auto-deploys on every push to `main`.

### Adding a new page

**Option 1 — Branch (recommended for review before going live):**
```bash
git checkout -b my-new-page
# create src/pages/web/8.vue
git add .
git commit -m "add page 8"
git push origin my-new-page
# open a pull request — merging to main triggers Vercel deploy
```

**Option 2 — Push directly to main (deploys immediately):**
```bash
git checkout main
# make your changes
git add .
git commit -m "your message"
git push origin main
```

> Pushing to `main` deploys immediately. Use a branch if you want to review before going live.
