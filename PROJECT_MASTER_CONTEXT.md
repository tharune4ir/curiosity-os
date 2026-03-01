# PROJECT MASTER CONTEXT: DISHA OS (The Neural Navigator)

## 📌 Executive Summary
**DISHA OS** is a massive, immersive 3D visually-gamified Neural Map and Zettelkasten engine. It maps nearly 500 unique conceptual pathways across seven distinct "Universes." Designed with a premium "Cyber-Laboratory" aesthetic (glassmorphism, neon cyan, high-contrast dark modes), it allows users to navigate a complex web of interconnected skills, philosophies, and career insights using a 3D hyperspace interface.

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

## 🌌 The Seven Integrated Universes
The project is organized into seven core realms, each with its own dedicated 3D map:

1.  **1_possibilities** (85 Nodes): The foundational map of career pathways and skill trees.
2.  **2_biosystem** (80 Nodes): Health, biology, and human optimization.
3.  **3_cognition** (63 Nodes): Learning, mental models, and brain-states.
4.  **4_fun** (60 Nodes): Creative outlets, gamification, and leisure.
5.  **5_logic** (58 Nodes): Mathematical principles, coding physics, and engineering.
6.  **6_signal** (64 Nodes): Information hygiene, digital safety, and algorithmic defense.
7.  **7_wealth** (83 Nodes): Financial physics, leverage, and value creation.

Total Intelligence Nodes: **~493**

---

## 🗺️ Core Architecture & Component Logic

### 1. The Orbital Landing (`app/page.tsx`)
- **NeuralCore3D:** A pulsing 3D wireframe energy core background.
- **The DISHA Orb:** A central gateway pulsator.
- **Dynamic Domains:** 8 interactive orbital spheres. As universes are completed, placeholders move from "COMING SOON" to "ENTER" with functional `href` routing.
- **Density Layer:** A terminal-style log feed (`TerminalLogs`) and live UTC clock (`LiveTime`) providing real-time system feedback.

### 2. The Universe Engine (`components/UniverseGraph.tsx`)
The heavy-lifter for all universe sub-pages (e.g., `/wealth`, `/signal`):
- **WikiLink Mapping:** Automatically detects `[[intra-universe-links]]` in Markdown bodies and draws 3D "Energy Bridges" (edges) between nodes.
- **Icon Collision Strategy:** Custom icon names (e.g., `WealthScoreboard`) are used to prevent `lucide-react` name collisions across different universes.
- **Fog of War (Gamification):**
  - **Discovery Loop:** Nodes start as hollow shells and ignite into glowing cores only upon discovery.
  - **Persistence:** Progress is saved to `localStorage` under `disha_unlocked_nodes`.
  - **HUD Metrics:** Live tracking of `Nodes Discovered / Total Nodes`.
  - **Wormhole Jump:** A random discovery script that cinematically flies the camera to a new undiscovered node.
  - **Command Palette:** A full-screen searchable directory to jump to any node instantly.

---

## 🔧 Automated Workflow & Data Flow
- **Markdown Generation:** `scripts/generate-universe.js` reads `content/[universe]/master_universe.json` and creates a flat file-system of `.md` nodes.
- **Content Cleaning:** The script automatically strips research artifacts and citation markers (e.g., `citeturn0...`) to ensure a clean UI.
- **SSG Integration:** Next.js pre-builds all node content for near-instant 3D interaction.

---

## ✅ Current Project Status
- **Universes Integrated:** 7 / 7 (Complete)
- **Navigation:** All 7 universes are fully linked from the landing page.
- **Reliability:** `physics_os` and other legacy directories have been purged to prevent build errors.
- **Build Pipeline:** Optimized with absolute pathing in scripts to handle directory locks and environment-specific pathing issues.

---

## 📝 Deployment & Replication Notes
To replicate or scale this project:
1. Define new concepts in a `master_universe.json` within a new folder in `content/`.
2. Register the folder in `scripts/generate-universe.js` (`CONTENT_SOURCES`).
3. Create a new `app/[domain]/page.tsx` using the standard universe template (dynamic logic).
4. Add the domain entry to the `domains` array in `app/page.tsx`.
5. Update `iconFallbackMap` in `UniverseGraph.tsx` for any new specialized Lucide mappings.
6. Run `node scripts/generate-universe.js` and then `npm run build`.
