# PROJECT MASTER CONTEXT: CURIOSITY OS 2.0 (The Teacher Operating System)

## 📌 Executive Summary (The Pivot to V2.0)
**CURIOSITY OS 2.0**, founded and engineered by **Tharun Gajula**, is a professional **Teacher Operating System** specifically designed for educators, mentors, and schools working with students (Class 9–10 focus). 

While V1 was a 3D conceptual map, **V2.0 is a workflow-first utility**. It transforms pedagogical theory into a high-fidelity classroom operating loop: **Browse → Plan → Run → Notice → Reflect → Adapt.** It is a "Cognitive Playbook" turned into a live facilitation companion.

---

## 🛠️ The Core Product Loop (End-to-End)

### 1. Browse: The Activity Library (`/activities`)
A premium educator-facing playbook of high-thinking activities.
- **Categorization**: Grouped by **Purpose** (e.g., Debate, Simulation, Thinking Lab) and **Mode** (Group, Individual).
- **Metadata**: Each activity surfaces specific **Learning Outcomes**, **Prep Levels**, and **Energy States** before selection.

### 2. Plan: The Planner Workspace (`/planner`)
A queue-based planning layer where teachers build their session stack.
- **Add to Queue**: Teachers can "save" activities for later or queue them for immediate classroom use.
- **Contextualization**: Provides a bird's-eye view of upcoming facilitation requirements.

### 3. Run: Live Facilitation Stage (`/activities/[slug]/run`)
The "Calm Facilitation Companion" interface.
- **Step-by-Step Navigation**: Guides the teacher through exact facilitation timing.
- **Global Mission Timer**: A persistent, pulsing digital readout for classroom pace management.
- **Tactical Toolbox**: A slide-out panel containing **Teacher Moves** (scripts), **Watch Fors** (signals), and **Failure Signals** (pitfalls).

### 4. Notice: Evidence Capture (`Tactical Toolbox`)
A real-time "Notice & Capture" layer integrated into the Run Mode.
- **Evidence Tagging**: Teachers capture meaningful student thinking in real-time via clinical observation tags (e.g., `REASONING_LEAP`, `STALLED_LOGIC`).
- **Step-Aware Log**: Observations are tied to the specific facilitation step in which they occurred.

### 5. Reflect: Activity Run Reflection (`/runs/[id]/reflect`)
A guided workspace for pedagogical sense-making after a run.
- **Guided Prompts**: Replaced generic forms with professional educator-focused prompts:
  - *"What worked well during this run?"*
  - *"Where did student thinking stall or break down?"*
- **Evidence Mirror**: Re-surfaces all captured observations from the run to ground the teacher's reflection in data.

### 6. Adapt: Pedagogical Memory (`Activity Detail`)
The closing of the pedagogical loop.
- **Last Adaptation**: Surfaced at the top of the activity page, capturing exactly what the teacher planned to change for the next run.
- **Activity History**: A chronological log of every previous run, its captured evidence, and its reflection notes.

---

## 🎨 Design System & Visual Palette
- **Aesthetic**: **"Clinical-Grade Laboratory"**. Dark glassmorphism (`bg-slate-950/60`), cyan neon accents (`#00F0FF`), and high-contrast white typography.
- **Mobile Resilience**:
  - **Clickable Cards**: Activity cards are fully interactive surfaces on mobile (no hidden-hover links).
  - **Drawer Sidebar**: The Tactical Toolbox transforms into a full-screen drawer overlay on smaller screens.
  - **Scalable HUD**: Typography and padding are responsive (`p-6` to `p-10`) to maximize screen real-estate during live facilitation.
- **Legal**: Every interface is branded with **© Tharun Gajula**.

---

## 🗺️ Technical Architecture

### 1. Framework & Routing
- **Framework**: Next.js 15 (App Router).
- **UI Engine**: Framer Motion for high-fidelity pedagogical state transitions.
- **Routing Structure**: 
  - `/gateway`: The product manifesto.
  - `/activities`: The Playbook/Library.
  - `/planner`: The Workspace.
  - `/run`: The Live Facilitation Stage.
  - `/reflect`: The Reflection Workspace.

### 2. Data Infrastructure
- **Content Source**: Static Markdown files with structured YAML frontmatter for activities.
- **State Engines**:
  - **`EvidenceProvider`**: Manages session history, captured observations, and pedagogical reflections.
  - **`PlannerProvider`**: Manages the activity queue and saved state.
- **Persistence**: 100% client-side `localStorage` (`curiosity_os_evidence_v1`). No backend sync required for initial pilot.

---

## 🌌 Legacy Core: The Neural Universe (V1)
The **147-node Neural Map** remains the "Reasoning Engine" of the project.
- **System Architecture**: Located at `/another_point_of_view`.
- **Logic**: A 3D graph Powered by `react-force-graph-3d`, mapping the interconnected relationship of skills and philosophies.
- **Status**: Currently documented as the **"Core Intelligence Layer"**—teachers see the activities (V2), while the OS manages the curriculum map (V1).

---

## 🚨 CRITICAL DEPLOYMENT & BUILD RULES
1. **VERSION LOCK**: NEVER change `next`, `react`, or `eslint` versions in `package.json`. Current versions are tuned to bypass Turbopack memory leaks.
2. **ESLINT CONFIG**: Strictly use `eslint.config.mjs`. Do NOT revert to legacy `.eslintrc.json`.
3. **TURBOPACK CACHE**: If Vercel build fails with "Turbopack" errors, redeploy with **"Use Build Cache" UNCHECKED**.
筋
