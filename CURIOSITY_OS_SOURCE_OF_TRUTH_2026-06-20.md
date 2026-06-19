# CURIOSITY OS // SYSTEM ARCHITECTURE & SOURCE OF TRUTH
> **Release Target:** Static Open Learning Exploration System (Dual-Architecture)  
> **Documentation Version:** 2.0.0  
> **Generation Date:** June 20, 2026  
> **Lead Architect & Owner:** Tharun Gajula  

---

## 1. Project Executive Summary & Philosophy

### 1.1. Core Purpose
**Curiosity OS** is a premium, client-side, zero-database learning playground designed to train questioning, observation, system thinking, and critical reasoning. It shifts the learning experience away from rote memorization and compliance into active inquiry. The system acts as a static open learning portal hosting:
* **The Curiosity Verse:** An immersive 3D WebGL semantic concept network mapping 147 learning nodes and 381 links across four wings.
* **The Playbook Library:** 36 flagship active learning exercises (e.g., Reality Checks, Study Engines, Decision Gyms, Trust & Teamwork) that can be run individually or facilitated for classrooms.
* **Guide Scaffolding:** Embedded facilitation HUDs, step-by-step countdown timers, and observation capture tools to enable parents, teachers, or peer mentors to guide thinking exercises seamlessly.

### 1.2. Architectural Pivot
Curiosity OS has surgically decoupled the planning, facilitation, and execution layers from standard server-side state or user databases. It operates on a **Zero-Knowledge, Zero-Login, Offline-First** model. All persistent user records (e.g., bookmarked activities, active queues, session history, facilitator observations) reside strictly in browser-level sandbox memory (`localStorage`). This architecture eliminates latency, guarantees student data privacy, and makes the system fully operational in network-constrained or offline environments.

### 1.3. Cyber-Laboratory Design System
The visual style of Curiosity OS is centered on a premium digital laboratory HUD.
* **Color Palette:**
  * Background: Deep space void (`#030712` / `#020617`).
  * Text: High-contrast slate and slate gray (`#F8FAFC`, `#slate-300`, `#slate-400`).
  * Primary Accent: Electric Cyan (`#00F0FF`).
  * Secondary Accent: Deep Azure (`#0055FF`).
  * Indicators: Success Green (`#10B981`), Warning Gold (`#F59E0B`), Error Crimson (`#EF4444`).
* **Typography:**
  * Display: *Outfit* (Modern display sans-serif for headings, badges, and card headers).
  * Monospaced: *JetBrains Mono* (Core interface font for timers, evidence logging, schema fields, and command overlays).
* **Motion & Interactivity:**
  * Glassmorphism (`backdrop-blur-2xl`, translucent panel borders).
  * Radial shimmers, pulsing neon rings, and fly-to cameras in the 3D network view.
  * Strict bottom clearance margins (`pb-48` and `pb-24`) to accommodate the floating navigation dock.

---

## 2. Production Dependencies

The following exact versions are hard-locked in the environment to prevent React 19/Next.js 16 peer dependency conflicts and compiler memory overhead:

### 2.1. Core Web Framework
* `next`: `16.1.6` (App Router paradigm)
* `react`: `19.2.3`
* `react-dom`: `19.2.3`
* `typescript`: `^5`

### 2.2. WebGL 3D Graph Engine
* `three`: `^0.183.1` (WebGL renderer)
* `@react-three/fiber`: `^9.5.0` (React wrapper for Three.js)
* `@react-three/drei`: `^10.7.7` (Three.js helper suite)
* `react-force-graph-3d`: `^1.29.1` (WebGL force-directed network graphing)
* `three-spritetext`: `^1.10.0` (Vector text rendering in WebGL)
* `framer-motion-3d`: `^12.4.13` (3D transitions)

### 2.3. Styling & Transitions
* `tailwindcss`: `^4`
* `@tailwindcss/postcss`: `^4`
* `framer-motion`: `^12.34.3` (2D components, panels, and slide-in panels)
* `clsx`: `^2.1.1` (Utility for class joining)
* `tailwind-merge`: `^3.5.0` (Surgical class override merger)
* `lucide-react`: `^0.575.0` (Unified SVG iconography)

### 2.4. Content & Parsing Engines
* `gray-matter`: `^4.0.3` (YAML frontmatter parsing)
* `react-markdown`: `^10.1.0` (HTML-safe Markdown renderer)
* `remark-gfm`: `^4.0.1` (Remark GitHub-Flavored Markdown support)

---

## 3. Database Schemas & Data Pipeline

Curiosity OS replaces traditional relational databases with local browser-sandbox storage.

```
+------------------------+      +-------------------------+
|  Markdown Playbooks    |      |  Universe Configuration |
|  (/content/activities) |      |     (3 JSON Files)      |
+-----------+------------+      +------------+------------+
            |                                |
  (build-activities.js)             (Runtime Merging)
            |                                |
            v                                v
+-----------+------------+      +------------+------------+
| Compiled JSON Indexes  |      |   WebGL 3D Graph Data   |
|     (/dist/*.json)     |      |    (Nodes & Links)      |
+-----------+------------+      +------------+------------+
            |                                |
      (Runtime Loading)                      |
            |                                v
            +--------------->+---------------+------------+
                             |   Curiosity OS Frontend    |
                             |   (State Context & HUDs)   |
                             +---------------+------------+
                                             |
                                             v
                             +---------------+------------+
                             |     Browser localStorage   |
                             |   - curiosity_os_planner   |
                             |   - curiosity_os_evidence  |
                             +----------------------------+
```

### 3.1. Local Browser Storage Model
1. **Planner State Key (`curiosity_os_planner_v1`):**
   Tracks bookmarked activities, active queues, and sequenced training lists.
   ```typescript
   export interface PlannerState {
     savedActivityIds: string[]; // List of bookmarked activity IDs
     queueActivityIds: string[]; // Ordered list of activities in the active queue
     sequences: {
       id: string;          // format: seq_{timestamp}
       name: string;        // label
       activityIds: string[];
     }[];
   }
   ```
2. **Evidence State Key (`curiosity_os_evidence_v1`):**
   Tracks active/completed facilitation runs, reflection notes, and live observations.
   ```typescript
   export interface Session {
     id: string;                  // format: session_{timestamp}
     activityId: string;          // links to the running activity
     activityTitle: string;
     startTime: number;           // Unix epoch timestamp
     endTime?: number;
     status: 'active' | 'completed';
     reflection?: string;         // Overall summary reflection
     whatWorked?: string;         // Facilitator notes
     whereStruggled?: string;
     adaptationNotes?: string;
     nextStepChoice?: 'rerun' | 'followup' | 'later';
     nextStepActivityId?: string;
   }

   export interface EvidenceEntry {
     id: string;                  // format: entry_{timestamp}
     sessionId: string;           // links to current session
     activityId: string;          // links to current activity
     stepIndex: number;           // step number where observation was captured
     timestamp: number;           // timestamp in milliseconds
     type: 'observation' | 'confusion' | 'quote' | 'breakthrough' | 'participation' | 'next_step' | 'reflection';
     note: string;
     tags: string[];              // e.g., ["Strong Reasoning", "Social Friction"]
   }
   ```

### 3.2. Markdown Playbook Schema (YAML Frontmatter)
Every activity file under `/content/0_activities/activities/*.md` must conform to this schema:
```yaml
id: "cos2_a28"                                # Unique serial identifier
slug: "listening-lab-paraphrase-clarify-confirm" # URL path slug
title: "Listening Lab: Paraphrase, Clarify, Confirm" # UI Header
short_promise: "Practice active validation techniques under noise." # Key promise
teacher_value_line: "Train students to prevent conversational drift." # Mentor goal
student_value_line: "Learn to summarize arguments before disputing them." # Learner takeaway
summary: "A rapid pairs exercise to practice high-fidelity communication." # Detail overview
purpose_category: "People & Pressure"          # Enums: Systems Lens, Reality Check, etc.
mode_category: "Simulation / Roleplay"        # Enums: Roleplay, System Mapping, etc.
class_fit:
  grades: [9, 10, 11, 12]
  typical_class_size: "30-40"
duration_minutes:
  min: 25
  typical: 30
  max: 40
group_mode: "Pairs"                           # Solo, Pairs, Small Group, Whole Class
prep_level: "No Prep"                         # No Prep, Low Prep, High Prep
materials:
  minimal: ["Timer"]
energy_level: "High"                          # Low, Medium, High
facilitation_difficulty: 2                    # 1 (Easy) to 3 (Hard)
flow_steps:
  - t: 5                                      # Duration in minutes
    step: "Setup & Alignment"                 # Step description
  - t: 15
    step: "Pairs Execution Exchange"
  - t: 10
    step: "Whole Class Reflection"
teacher_moves:
  - "Introduce noisy environment parameters."
teacher_watch_fors:
  - "Watch for students jumping straight to disagreement."
observation_cues:
  - "Observe if pairs can replay arguments without changing tone."
common_failure_points:
  - "Conversations collapse into arguments."
reflection_prompts:
  - "How did paraphrasing shift your immediate response?"
adaptations:
  large_class: "Run in structured rows."
follow_ups: ["cos2_a25"]
status: "flagship"
curation_tier: "flagship_36"
version: "2.0"
internal:
  backend_primary_wing: "Relate"
  backend_capability_clusters: ["trust_boundaries_pressure"]
  evidence_dimensions_targeted: ["transfer", "reflect"]
```

### 3.3. Activity Data Pipeline
* **Build Step:** `node scripts/build-activities.js` iterates through all `.md` files in `/content/0_activities/activities/`, parses the frontmatter via `gray-matter`, separates the markdown body content, and writes the output files:
  1. `/content/0_activities/dist/activities.index.json` (Lightweight array containing metadata optimized for filtering and library search).
  2. `/content/0_activities/dist/activities.full.json` (Full records including raw Markdown body content for detail views).
  3. `/content/0_activities/dist/collections.manifest.json` (Playbook collections compiled from files in `/content/0_activities/collections/`).
  4. `/content/0_activities/dist/backend_coverage_map.json` (Map of primary concept wings, capability clusters, and taxonomy hooks).
* **Runtime Resolution:** `lib/activities.ts` loads the compiled index files for fast rendering. If compilation artifacts are missing, fallback functions read the raw directory directly on the fly.

---

## 4. System Engines & Algorithms

### 4.1. Step Parsing Engine (`parseFacilitationSteps`)
The detail and run screens parse step instructions from the markdown content body using the following algorithm:
1. Searches the markdown body for headers starting with `## The Run Mode` or `## Facilitation`.
2. Splits the target section on `### ` markers to isolate step blocks.
3. Maps each extracted text block to the corresponding entry in the `flow_steps` configuration array.
4. If no facilitation section is detected, a single fallback stage containing the entire body text is generated.

### 4.2. 3D Force-Directed Graph Layout Mapping
The 3D concept universe leverages `react-force-graph-3d` to display structural networks:
* **Node Merging:** Integrates `master_universe_v1.json` (147 concept nodes) with localized state parameters from `teaching_state_v1_starter.json`.
* **Explicit Pinning:** Merges 3D coordinates from `universe_layouts_v1_starter.json`. If a node contains `pinned: true`, coordinates are fixed on the force engine via `node.fx = x`, `node.fy = y`, `node.fz = z`.
* **WebGL Text Sprites:** Node text tags are rendered as vector sprites using `three-spritetext` to remain legible under zoom. Regex cleaning is applied to strip invisible characters and markdown citation tokens before drawing.
* **Camera Flight:** Node selection triggers camera repositioning via:
  $$P_{new} = P_{node} \times \left(1 + \frac{D_{offset}}{\sqrt{x^2 + y^2 + z^2}}\right)$$
  This maintains consistent focal distance and viewport offset across selections.

---

## 5. Frontend Navigation & Pages

### 5.1. Dashboard Landing Page (`/`)
* **Visuals:** Immersive page featuring the spinning `NeuralCore3D` WebGL canvas, space-grade wireframes, and the Feynman-inspired audio background controller.
* **Interface:** Simple landing hero with a single prominent call to action pointing to `/gateway` ("ENTER GATEWAY").
* **Dock:** Hosts the floating global navigation bar with safety padding clearances.

### 5.2. Gateway Entry Guide (`/gateway`)
* **Purpose:** Onboarding screen explaining system workflows.
* **Layout:** Dual navigation paths:
  1. *Curiosity Verse Path* (`/verse`) - Conceptual 3D network traversal.
  2. *Activity Library Path* (`/activities`) - Practical playbooks and challenges.
* **Features:** Step-by-step guides for students, mentors, and parents.

### 5.3. Playbook Curation Library (`/activities`)
* **Filters:** Interactive interface allowing users to filter playbooks by purpose wings (Decode, Cognition, Relate, Sandbox), preparation complexity (No Prep, Low Prep, High Prep), group format, duration, and energy levels.
* **Collections:** Thematic groupings (e.g. "Systems & Signals") rendering card lists of related conceptual activities.

### 5.4. Activity Detail Page (`/activities/[slug]`)
* **Logistics Grid:** Clean monospaced display detailing time constraints, energy indicators, formatting structures, and required materials.
* **Facilitation Sections:** Step-by-step timeline blocks, detailed playbook instructions, mentor moves, watch-fors, and success indicators.
* **CTAs:** Options to run the activity or queue it in the planner.

### 5.5. Guided Reflection Run (`/activities/[slug]/runs/[sessionId]/reflect`)
* **Timeline Review:** Replays all evidence logs and observation cues recorded during facilitation, sorted by timestamp.
* **Evaluation forms:** Simple, clean inputs for note-taking, rating student engagement, and choosing follow-up practices.

### 5.6. WebGL Concept Map Canvas (`/another_point_of_view`)
* **Canvas:** Complete 3D Force Graph canvas interface supporting mouse-based rotation, panning, and scroll-to-zoom.
* **HUD Overlay:** Displays active search filters, sidebar detail sheets for selected nodes, perspective shifts, and camera controls.

---

## 6. Developer Operations Runbook

### 6.1. Environment Configuration
Curiosity OS runs entirely client-side. No API keys, databases, or environment variables are required.

### 6.2. Installation & Setup
1. **Clean workspace structure:**
   Ensure Node.js LTS (`v20.x`) is installed on the system.
2. **Restore dependencies:**
   ```bash
   npm install
   ```
3. **Compile activity indexes (mandatory):**
   ```bash
   npm run build:activities
   ```
4. **Validate activity content schemas (optional):**
   ```bash
   npm run validate:activities
   ```
5. **Sync concept universe markdown files (optional):**
   ```bash
   npm run generate:universe
   ```

### 6.3. Local Development
Start the hot-reloading dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### 6.4. Production Compilation
Build optimized static HTML files:
```bash
npm run build
npm run start
```

---
*End of Specification.*
