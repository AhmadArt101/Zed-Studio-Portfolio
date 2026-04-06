# Zed Studio Portfolio

## Overview

Portfolio website for Ahmad Akram Abbas (Zed Studio) — a 3D Game Artist based in Jordan. Single-page scrolling portfolio with full brand identity implementation.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/portfolio)
- **API framework**: Express 5 (artifacts/api-server — not used by portfolio)
- **Database**: PostgreSQL + Drizzle ORM (not used by portfolio)
- **UI library**: shadcn/ui + Tailwind CSS
- **Animation**: Framer Motion
- **Routing**: wouter

## Artifacts

### Portfolio (artifacts/portfolio)
- Preview path: `/`
- Type: react-vite (presentation-first, no backend)
- Entry: `artifacts/portfolio/src/pages/Home.tsx`
- Brand colors: deep forest green background, lime/olive green accent (#8DB600), cream/off-white text
- All 3D work sample images live in `attached_assets/` and are aliased via `@assets/`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/portfolio run dev` — run portfolio locally

## Brand Identity

- Logo: `attached_assets/zedstudio_english_no_bg_1775500272724.png`
- Colors: Forest green bg (#0D2B1A), Lime green accent (#8DB600), Cream text (#E8E4CC)
- Sections: Hero, About, Portfolio Grid, Scene Renders, Process (robot wireframe/textured), Skills, Experience/Education, Contact
