# PROJECT MASTER CONTEXT: CURIOSITY OS (The Neural Navigator)

## 📌 Executive Summary
**CURIOSITY OS** is a massive, immersive 3D visually-gamified Neural Map and Zettelkasten engine. It maps nearly 500 unique conceptual pathways across seven distinct "Universes." Designed with a premium "Cyber-Laboratory" aesthetic (glassmorphism, neon cyan, high-contrast dark modes), it allows users to navigate a complex web of interconnected skills, philosophies, and career insights using a 3D hyperspace interface.

---

## 🛠️ Technology Stack
- **Framework:** Next.js 15 (App Router)
- **UI & Styling:** React, Tailwind CSS, Framer Motion (for smooth 2D transitions & glassmorphic HUDs)
- **3D Engine:** `react-force-graph-3d` (Three.js powered) for real-time node-link physics.
- **Content Engine:** 
  - **Source:** Directory-specific `master_universe.json` files.
  - **Generator:** `scripts/generate-universe.js` (Custom Node.js script for Markdown batch-generation).
  - **Parser:** `gray-matter` & `react-markdown` for Zettelkasten-style reading.
- **Icons:** `lucide-react` with a massive custom `iconFallbackMap` in `UniverseGraph.tsx` to handle 100+ specialized conceptual icons.

---

## 🎨 Design System & Visual Palette
Any AI or engineer replicating this project MUST adhere strictly to these physical design parameters:
- **Core Backgrounds:** Pure deep-space void (`bg-[#020617]`) layered with mesh gradients (`from-slate-950/90 via-slate-950/40 to-transparent`).
- **Glassmorphism (The 'Lab' Feel):** Panels use `bg-slate-950/60` or `bg-slate-900/40` combined heavily with `backdrop-blur-xl` and `backdrop-blur-2xl`. Borders are universally micro-thin (`border-white/10` or `border-white/[0.08]`).
- **Primary Accent (Neon Cyan):** Used for standard data and tech-readouts. Glowing box-shadows are engineered via `shadow-[0_0_30px_rgba(0,240,255,0.2)]`. Text elements use `text-cyan-400` or `text-cyan-500`.
- **Secondary Accent (Emerald Green):** Used exclusively to signify active status, verification, or system readiness (e.g., "ENTER" buttons, `CONCEPT (V 1.0)` badging). Engineered via `rgba(16,185,129,x)`.
- **Typography Matrix:**
  - **Headers & Massive Text:** `var(--font-outfit)` (Outfit) — lightweight, highly tracked (`tracking-[0.3em]`), geometric.
  - **Micro-Readouts & HUDs:** `font-mono` (Geist Mono) — used for all `text-[9px]` or `text-[10px]` technical labels perfectly echoing aviation/cyber instrumentation.
  - **Body Text:** Standard sans-serif (`Inter`) with `text-slate-300` and high leading (`leading-relaxed`).

---

## 🌌 The Nine Integrated Universes
The project is organized into nine core realms, each with its own dedicated 3D map:

1.  **1_possibilities** (85 Nodes): The foundational map of career pathways and skill trees.
2.  **2_biosystem** (80 Nodes): Health, biology, and human optimization.
3.  **3_cognition** (63 Nodes): Learning, mental models, and brain-states.
4.  **4_fun** (60 Nodes): Creative outlets, gamification, and leisure.
5.  **5_logic** (58 Nodes): Mathematical principles, coding physics, and engineering.
6.  **6_signal** (96 Nodes): Information hygiene, digital safety, and algorithmic defense.
7.  **7_wealth** (123 Nodes): Financial physics, leverage, and value creation.
8.  **8_digital** (82 Nodes): The digital architect realm, mastering cyber-tools and digital presence.
9.  **9_ai** (80 Nodes): AI Nexus platform, symbiotically leveraging superintelligence.

Total Intelligence Nodes: **~727**

---

## 🗺️ Core Architecture & Component Logic

### 1. The Orbital Landing (`app/page.tsx`)
- **NeuralCore3D:** A pulsing 3D wireframe energy core background.
- **The CURIOSITY Orb:** A central gateway pulsator.
- **Dynamic Domains:** 10 interactive orbital spheres (9 Universes + 1 Center). As universes are completed, placeholders move from "COMING SOON" to "ENTER" with functional `href` routing.
- **Density Layer:** A terminal-style log feed (`TerminalLogs`) and live UTC clock (`LiveTime`) providing real-time system feedback.

### 2. The Universe Engine (`components/UniverseGraph.tsx`)
The heavy-lifter for all universe sub-pages (e.g., `/wealth`, `/signal`):
- **WikiLink Mapping:** Automatically detects `[[intra-universe-links]]` in Markdown bodies and draws 3D "Energy Bridges" (edges) between nodes.
- **Icon Collision Strategy:** Custom icon names (e.g., `WealthScoreboard`) are used to prevent `lucide-react` name collisions across different universes.
- **Fog of War (Gamification):**
  - **Discovery Loop:** Nodes start as hollow shells and ignite into glowing cores only upon discovery.
  - **Persistence:** Progress is saved to `localStorage` under `curiosity_unlocked_nodes`.
  - **HUD Metrics:** Live tracking of `Nodes Discovered / Total Nodes`.
  - **Wormhole Jump:** A random discovery script that cinematically flies the camera to a new undiscovered node.
  - **Command Palette:** A full-screen searchable directory to jump to any node instantly.

---

## 🎨 Advanced UI/UX Space Mechanics & Polishing
- **Orbital Tooltips (Symmetric Math):** Tooltips strictly render vertically stacked above their nodes to prevent Z-index collisions with the bottom navigation dock. Their absolute distance geometrically perfectly matches the counterpart downwards tooltips via `bottom-1/2 mb-10 md:mb-14` spacing geometry.
- **Interactive Double-Tap Navigation (Mobile PWA):** On touch displays, CSS `:hover` states fail. Therefore, clicking an orbital node intercepts routing and instead triggers the tooltip gateway interface. Users must explicitly click the glowing 'ENTER' button to jump, mathematically eliminating misclicks.
- **Z-Index Layering Override:** Because 10 absolute nodes render sequentially in the DOM, later nodes physically overlap tooltips of earlier nodes. We bypass this stack context by forcing nodes to dynamically spike to `z-50` upon hover.
- **Microscopic HUD Typography:** Title typography in the Universe maps (e.g., "COGNITION UNIVERSE") is strictly `text-[10px] text-cyan-500 font-mono uppercase tracking-widest`, mirroring realistic jet-fighter/tech instrumentation readouts.
- **Global Contrast Glow:** Bottom Dock layouts utilize hyper-deep slate gradients (`bg-gradient-to-br from-slate-800/80 to-slate-950/90`) coupled with powerful cyan shadow underglows (`shadow-[0_0_30px_rgba(0,240,255,0.2)]`). This guarantees legibility against the unpredictable canvas of pitch-black WebGL backgrounds.
- **Mobile Clearance Bounds (The 140px Rule):** Due to `100vh` scaling dynamically failing against native Android/iOS Chrome URL bars, all physical HUD and Information layers are fully decapitated from `absolute bottom-X` relative positioning. Instead, all lower bounds are physically locked to the viewport using `fixed bottom-[140px]`. This guarantees exact margin clearance over global navigation bars regardless of scrolling interference or screen-size stretching.

---

## 🧠 Data Schema Protocol (`master_universe.json`)
Every Universe's content originates linearly from a JSON block array. Any system extension must strictly follow this data model format:
```json
[
  {
    "title": "Node Name",
    "domain": "DOMAIN_CATEGORY",
    "icon": "LucideIconName",
    "content": "Deep markdown chunk here. Internal linking utilizes standard [[target-node-title]] syntax."
  }
]
```

## 🔧 Automated Workflow & Data Engine
- **Markdown Matrix Generation:** `npm run generate:universe` executes `scripts/generate-universe.js`, reading `content/[universe]/master_universe.json` to synthesize a flat file-system of pristine `.md` nodes.
- **Content Cleaning:** The pipeline automatically strips research artifacts and citation markers.
- **Master Textbook Compilation:** `npm run generate-textbook` actively scrapes specifically all 727 fully-rendered `.md` nodes across the Universes (ignoring raw JSONs). It extracts domains and titles, natively readjusts header hierarchy depth, perfectly strips HTML/CSS remnants, and compiles a single, massive, clean `Curiosity_OS_Textbook.md` knowledge-base document.
- **SSG Integration:** Next.js pre-builds all node content for near-instant 3D interaction and zero-latency loading.

---

## ✅ Current Project Status
- **Universes Integrated:** 9 / 9 (Complete)
- **Navigation:** All 9 universes are fully linked from the landing page.
- **Reliability:** `physics_os` and other legacy directories have been purged to prevent build errors.
- **Build Pipeline:** Optimized with absolute pathing in scripts to handle directory locks and environment-specific pathing issues.

---

## 🚨 CRITICAL VERCEL DEPLOYMENT & BUILD RULES (POST AI/ESLINT/TURBOPACK INCIDENTS) 🚨
**MAJOR WARNING: NEVER TOUCH THE NEXT.JS OR ESLINT VERSIONS UNLESS EXPLICITLY INSTRUCTED.**

We recently experienced severe, cascading build failures on Vercel related to `Next.js`, `eslint`, and `Turbopack` caching. This happened because AI inadvertently tried to upgrade/downgrade Next.js versions (e.g., between 14.x, 15.2.0, and 16.x) trying to fix minor linting issues, which actually destroyed the Vercel build pipeline.

**To ensure we NEVER face these environment compilation and caching errors again, follow these unbreakable rules:**

1. **VERSION LOCK:** Do NOT change the `next`, `react`, `react-dom`, or `eslint` versions in `package.json`. The current combination completely bypasses the Turbopack memory leaks and Vercel caching bugs.
2. **ESLINT CONFIG:** We are strictly using the flat config (`eslint.config.mjs`). Do NOT revert to legacy `.eslintrc.json`. If a dependency complains about missing legacy configs (e.g., `@humanwhocodes/config-array`), IGNORE IT during deployments.
3. **TURBOPACK / CACHE ISSUES:** If Vercel throws strange "Unexpected token", "Turbopack", or "Memory leak / Inflight" errors during `vercel build`, it is a **Vercel Build Cache corruption**, not a code error.
   - **Fix:** Go to Vercel Dashboard -> Deployments -> Redeploy -> **Uncheck "Use Build Cache"** and redeploy. 
4. **LOCAL FIXES INSTEAD OF VERSION JUMPS:** If there is a Type error or ESLint error causing a Vercel build failure, fix the *TypeScript/Code* issue (e.g., fix the duplicate key in `UniverseGraph.tsx` or fix the `.json` formatting in `master_universe.json`). Do **NOT** try to fix it by changing Next.js versions.

---

## 📝 Deployment & Replication Notes
To replicate or scale this project:
1. Define new concepts in a `master_universe.json` within a new folder in `content/`.
2. Register the folder in `scripts/generate-universe.js` (`CONTENT_SOURCES`).
3. Create a new `app/[domain]/page.tsx` using the standard universe template (dynamic logic).
4. Add the domain entry to the `domains` array in `app/page.tsx`.
5. Update `iconFallbackMap` in `UniverseGraph.tsx` for any new specialized Lucide mappings.
6. Run `node scripts/generate-universe.js` and then `npm run build`.
