# Curiosity OS 2.0: Activity Content System

This directory is the canonical source of truth for the **Curiosity OS 2.0 Teacher Operating System**. It transition the product from a graph-facing knowledge base into a mission-first activity engine for educators.

## 🧠 Philosophy: Backend Atoms, Frontend Missions

*   **Backend Atom = Node**: The 147-node curriculum remains the hidden "logic engine."
*   **Frontend Atom = Activity**: Teachers interact with high-impact "Missions" that map back to the nodes silently.

## 📂 Structure

- **`/activities/`**: 36 Flagship & Pilot mission files. 
    - Filename: `cos2_aXX_slug.md`
    - Logic: Weighted node hooks and capability clusters.
- **`/collections/`**: Teacher-facing purpose-based groupings (e.g., "Reality Check Labs").
- **`/schemas/`**: TypeScript interfaces for metadata validation.
- **`/enums/`**: Controlled vocabularies for wings, clusters, and modes.
- **`/templates/`**: Reference Markdown files for creating new missions.
- **`/dist/`**: Machine-readable JSON artifacts compiled from source Markdown.

## 🛠️ Tooling

The system includes a strict validation and build pipeline:

- **Validate**: `npm run validate:activities`
    - Checks for schema validity, enum correctness, and backend alignment.
    - Generates `/dist/validation_report.json`.
- **Build**: `npm run build:activities`
    - Compiles human-readable Markdown into optimized JSON.
    - Generates `activities.index.json`, `collections.manifest.json`, and `backend_coverage_map.json`.

## 🚀 The Promotion Model (Maturity Honesty)

Curiosity OS 2.0 uses a strict maturity model to ensure quality:

1.  **Draft**: Initial flow, artifact definition, and approximate node hooks.
2.  **Pilot**: Successfully run in 2+ classroom contexts; failure points and teacher moves refined.
3.  **Flagship**: Peak fidelity; predictable evidence artifacts; safety reviewed; internal node weights stabilized.

> [!IMPORTANT]
> **Curation Tier vs. Status**: 
> - `curation_tier: flagship_36` refers to the strategic 36-activity set defined in the research report.
> - `status: flagship` refers only to activities that have reached the highest operational maturity.

## 📝 How to Add a New Activity

1.  Use `/templates/activity-pilot.md` to create a new file in `/activities/`.
2.  Fill in the teacher-facing metadata (short_promise, teacher_value_line).
3.  Add the internal mapping: primary wing, capability clusters, and weighted node hooks.
4.  Run `npm run validate:activities` to check for schema errors.
5.  Run `npm run build:activities` to update the application artifacts.
筋
