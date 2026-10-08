# Sri Pavan Tej Balam — Portfolio

A bold, neo-brutalist personal portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **Framer Motion** and **GSAP**.

**Live:** [sripavantejb.editcomedia.com](https://sripavantejb.editcomedia.com)

---

## Design Language

The UI blends neo-brutalism (thick ink borders, hard offset shadows, heavy uppercase type) with soft glow and WebGL light effects on a near-black canvas.

### Color Palette

| Token          | Hex       | Usage                                |
| -------------- | --------- | ------------------------------------ |
| `ink`          | `#0a0a0a` | Page background, borders, shadows    |
| `paper`        | `#f0f0f0` | Light surfaces                       |
| `lime`         | `#c8f542` | Primary accent, CTAs, selection      |
| `sky`          | `#96c8ff` | Secondary accent, glows              |
| `orange`       | `#ff4e00` | Highlights                           |
| `purple`       | `#c3a4f6` | Tags / cards                         |
| `green`        | `#2fdf92` | Tags / cards                         |
| `pink`         | `#fca5cc` | Tags / cards                         |

Tokens are defined with `@theme` in `app/globals.css` and are available as Tailwind utilities (`bg-lime`, `text-ink`, `border-sky`, …).

### Typography

| Font            | Variable                | Role                      |
| --------------- | ----------------------- | ------------------------- |
| Archivo Black   | `--font-archivo-black`  | Headlines, CTAs (`font-archivo`) |
| Inter           | `--font-inter`          | Body text (`font-inter`)  |
| Space Grotesk   | `--font-space-grotesk`  | Taglines (`font-display`) |

All fonts are loaded through `next/font/google` with `display: swap`.

### Signature Details

- Lime custom scrollbar and lime `::selection`
- Scroll progress bar pinned to the top of the viewport
- Hard offset shadows like `shadow-[4px_4px_0_0_#0a0a0a]`
- Blurred lime and sky orbs behind the hero

---

## Page Layout

The home page (`app/page.tsx`) has two scroll modes.

**1. Sticky-stacking intro (desktop, `lg+`).** Each slide pins full-screen and the next one slides over it, like a deck of cards:

1. `HeroSection` — name, headline, location, CTAs over animated WebGL `SideRays`
2. `ExperienceSection`
3. `AwardsHighlightSection`
4. `WhyMeSection`

**2. Normal flowing content**, layered above the sticky stack:

`MarqueeStrip` → `ProjectsSection` → `FeaturedInSection` → `HackathonsSection` → `OpenSourceSection` → `LeadershipSection` → `SkillsSection` → `EducationSection` → `ContactSection`

The stacking classes live in `lib/stickyStack.ts`. Any section placed after the sticky stack must use `sectionFlowAfter` (a higher z-index), or it will render underneath the last slide.

### Other Routes

| Route                 | Description                                  |
| --------------------- | -------------------------------------------- |
| `/about`              | About page                                   |
| `/experience/[slug]`  | Experience detail pages                      |
| `/projects/[slug]`    | Project case studies (e.g. Agency ERP)       |
| `/admin`              | Password-protected dashboard (projects + resume) |
| `/admin/login`        | Admin login                                  |

---

## UI Component Library

Reusable pieces live in `components/ui/`:

| Component           | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `SideRays`          | WebGL light rays (via `ogl`), loaded client-only      |
| `SplitText`         | Character/word split reveal animation (GSAP)          |
| `BlurText`          | Blur-in text reveal                                   |
| `CountUp`           | Animated number counter                               |
| `TiltCard`          | 3D tilt-on-hover card                                 |
| `FlipCard`          | Front/back flip card                                  |
| `GlowParticleCard`  | Card with glowing particle hover effect               |
| `Magnet`            | Magnetic hover pull for buttons/links                 |
| `ClickSpark`        | Spark burst on click                                  |
| `ClientCursor`      | Custom animated cursor                                |
| `PillNavLinks`      | Animated pill-style navigation links                  |
| `ScrollProgress`    | Top-of-page scroll progress bar                       |
| `BrutalistLink`     | Neo-brutalist styled link/button                      |
| `SectionHeading`    | Consistent section titles                             |
| `TagChip`           | Colored tech/skill tags                               |
| `BrandIcons`        | Brand/social SVG icons                                |
| `skiper-ui/skiper40`| Animated underline link variants (`Link001`, `Link004`, `Link005`) |

Shared motion helpers (`StaggerWords`, `EASE`) are in `components/motion.tsx`.

---

## Accessibility

- A "Skip to main content" link appears on keyboard focus
- `prefers-reduced-motion` disables animations and smooth scrolling site-wide
- Decorative layers are marked `aria-hidden`
- Semantic landmarks (`<main id="main">`, `<section id="…">`) support anchor navigation

## SEO

- Per-page metadata via `buildPageMetadata` in `lib/site.ts`
- JSON-LD structured data (`components/JsonLd.tsx`, `lib/schema.ts`)
- `sitemap.ts`, `robots.ts`, `manifest.ts`, and `public/llms.txt`
- Open Graph and Twitter large image cards

---

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, `clsx`, `tailwind-merge`
- **Animation:** Framer Motion, GSAP (`@gsap/react`), OGL (WebGL)
- **Icons:** `lucide-react`, `react-icons`
- **Data:** MongoDB (projects and resume), with seed data as a fallback

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local`:

```bash
MONGODB_URI=mongodb+srv://...
MONGODB_DB=your-db-name
ADMIN_PASSWORD=your-admin-password
SESSION_SECRET=a-long-random-string
```

Without MongoDB, the projects section falls back to `lib/projects.seed.json`. To seed the database:

```bash
node scripts/seed-projects.mjs
```

### Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start the dev server     |
| `npm run build` | Production build         |
| `npm run start` | Serve the production build |
| `npm run lint`  | Run ESLint               |

---

## Project Structure

```
app/
  page.tsx            Home page (section composition)
  layout.tsx          Fonts, global metadata, skip link, scroll progress
  globals.css         Theme tokens and global styles
  about/ experience/ projects/ admin/ api/
components/
  sections/           Home page sections
  ui/                 Reusable animated UI primitives
  projects/           Case study components
  admin/              Admin dashboard, project form, resume upload
lib/
  data.ts             Profile content
  site.ts             Site config and metadata helpers
  stickyStack.ts      Sticky slide z-index system
  models/             MongoDB models
proxy.ts              Admin route protection
public/               Images, landing pages, llms.txt
```
