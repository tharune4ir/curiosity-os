# PROJECT MASTER CONTEXT: CURIOSITY OS (The Neural Navigator)

## 📌 Executive Summary
**CURIOSITY OS** is a massive, immersive 3D visually-gamified Neural Map and teaching engine. It maps exactly 147 unique conceptual pathways centralized around a single massive core ("Another Point of View"). Designed with a premium "Cyber-Laboratory" aesthetic (glassmorphism, neon cyan, high-contrast dark modes), it allows students and mentors to navigate a complex web of interconnected skills, philosophies, and capabilities using a 3D hyperspace interface.

---

## 🛠️ Technology Stack
- **Framework:** Next.js 15 (App Router)
- **UI & Styling:** React, Tailwind CSS, Framer Motion (for smooth 2D transitions & glassmorphic HUDs)
- **3D Engine:** `react-force-graph-3d` (Three.js powered) for real-time node-link physics.
- **Content Engine:** 
  - **Source of Truth:** Pure structured data split across 3 JSON files (Master Schema, Teaching State, and Layouts). Markdown wikilinks have been completely eradicated.
  - **Generator:** Data parsed directly via the `app/another_point_of_view/page.tsx` React component.
- **Icons:** `lucide-react` with a massive dynamic mapping to handle specialized conceptual icons.

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

## 🌌 The Core Engine (The 4 Wings)
The project architecture is a singular "1+4 Core Engine" model for maximum density.

### The Central Core: "Another Point of View"
A highly concentrated Atomic Universe defined entirely in `content/1_another_point_of_view/schema_files/`.
- **Node Count:** V1 Schema locked at exactly 147 pre-validated conceptual atoms.
- **Relational Data Mapping:** No longer relies on implicit directories or markdown files. Edges are strictly mapped via Top-Level typed edges (e.g., `builds_on`, `reinforces`, `practiced_in`).

### The Four Wings (Taxonomy Pillars)
Every concept falls under one of four foundational Wings:
1. **W1 — Decode** (Understanding Reality)
2. **W2 — Cognition** (Building the Mind)
3. **W3 — Relate** (Functioning with Humans)
4. **W4 — Sandbox** (High-Stakes Live Practice)

---

## 🗺️ Core Architecture & Component Logic

### 1. The Home Gateway (`app/page.tsx` & `app/gateway/page.tsx`)
- **NeuralCore3D:** A pulsing 3D wireframe energy core background overlaying cinematic space footage on `app/page.tsx`.
- **The Core Orb Hub:** A single central orb with the Orbit icon. Clicking "ENTER GATEWAY" routes the user to `app/gateway/page.tsx`.
- **The Manifesto (`/gateway`):** A beautiful scrolling narrative explaining the 4 Wings (Decode, Cognition, Relate, Sandbox) and why the OS exists, leading to a final CTA button "Explore the Core Graph" which boots up the 3D mapping engine.

### 2. The Universe Engine (`components/UniverseGraph.tsx`)
The heavy-lifter for the 3D data-visualization:
- **Explicit Edge Generation:** Directly parses native JSON relational arrays to construct the force-directed graph architecture.
- **Node Selection & Context Engine:** Multi-mode sidebar (Student / Mentor / Builder) that decrypts the physical relationships between concepts (e.g., automatically resolving Prerequisites and "Practiced In" targets).
- **Session Stack UI:** A globally positioned horizontal slider on top of the navigation dock that allows the founder to click nodes and generate a "Class Session Plan," separating Opener, Core, and Reflection nodes.
- **Fog of War (Gamification):** Nodes start as hollow shells and ignite into glowing cores only upon discovery. Progress is saved to `localStorage`.

---

## 🎨 Advanced UI/UX Space Mechanics & Polishing
- **Interactive Double-Tap Navigation:** On touch displays, CSS `:hover` states fail. Therefore, clicking an orbital node intercepts routing and instead triggers the tooltip gateway interface.
- **Microscopic HUD Typography:** Title typography in the Universe maps is strictly `text-[10px] text-cyan-500 font-mono uppercase tracking-widest`, mirroring realistic jet-fighter/tech instrumentation readouts.
- **Global Contrast Glow:** Bottom Dock layouts utilize hyper-deep slate gradients (`bg-gradient-to-br from-slate-800/80 to-slate-950/90`) coupled with powerful cyan shadow underglows.
- **Mobile Clearance Bounds:** Elements are gracefully snapped to physical offsets (like `bottom-[85px]`) rather than simple percentage heights, clearing the mobile native UI browsers flawlessly. Z-indexes are hyper-strict to prevent overlap.

---

## 🧠 Data Schema Protocol (The 3-File Split)
The core architectural pivot removed the reliance on individual Markdown text files or single bloated JSONs. The architecture is strictly decoupled into 3 state files located in `content/1_another_point_of_view/`:

1. **`master_universe_v1.json` (Immutable Infrastructure)**: Stores the 147 conceptual topological nodes, 5-part teaching descriptions, and physical network edges.
2. **`teaching_state_v1_starter.json` (Volatile Progress)**: Stores the mentor's progress through the map. Records `status`, `mastery_estimate`, `last_taught_on`, and `remarks`.
3. **`universe_layouts_v1_starter.json` (Visual Presets)**: Stores physical X/Y/Z mapping positions to retain curated cluster views.

Please see the root `CURIOSITY_SCHEMA_V1.md` document for the absolute exhaustive TypeScript interfaces for these files.

---

## 🔄 The Teaching Cycle & Progress Tracking
Curiosity OS has grown beyond a visualization tool into a complete **Teaching OS**.
1. **Adding a Topic:** The Founder uses the AI to generate a valid schema node to inject into `master_universe_v1.json`. Upon UI refresh, it spawns instantly in 3D.
2. **Session Building:** Using the global Bottom Dock and multi-select HUD, the Founder queues up specific atoms into a "Session Stack" before class (Opener, Core, Practice, Reflection).
3. **Reporting Mastery:** After class, the Founder logs completion logic into `teaching_state_v1_starter.json`. Upon refresh, the visual graph gamifies and illuminates the completed nodes in brilliant neon colors. The OS physically tracks chronological cycles over time.

---

## 🚀 Next Horizon: Phase 5 (Supabase Integration)
Currently, all graph and teaching states run cleanly from local JSON. The exact next evolutionary step is migrating these 3 files to live **Supabase PostgreSQL** tables. 
- Supabase will become the "Cloud Memory" for the OS, enabling real-time remote fetching, cross-device persistence (like using an iPad while teaching), and eventual Multi-Tenant tracking for distinct cohorts of students.

---

## 🚨 CRITICAL VERCEL DEPLOYMENT & BUILD RULES
**MAJOR WARNING: NEVER TOUCH THE NEXT.JS OR ESLINT VERSIONS UNLESS EXPLICITLY INSTRUCTED.**

1. **VERSION LOCK:** Do NOT change the `next`, `react`, `react-dom`, or `eslint` versions in `package.json`. The current combination completely bypasses the Turbopack memory leaks and Vercel caching bugs.
2. **ESLINT CONFIG:** We are strictly using the flat config (`eslint.config.mjs`). Do NOT revert to legacy `.eslintrc.json`. If a dependency complains about missing legacy configs (e.g., `@humanwhocodes/config-array`), IGNORE IT during deployments.
3. **TURBOPACK / CACHE ISSUES:** If Vercel throws strange "Unexpected token", "Turbopack", or "Memory leak / Inflight" errors during `vercel build`, it is a **Vercel Build Cache corruption**, not a code error.
   - **Fix:** Go to Vercel Dashboard -> Deployments -> Redeploy -> **Uncheck "Use Build Cache"** and redeploy. 
4. **LOCAL FIXES INSTEAD OF VERSION JUMPS:** If there is a Type error or ESLint error causing a Vercel build failure, fix the *TypeScript/Code* issue. Do **NOT** try to fix it by changing Next.js versions.
