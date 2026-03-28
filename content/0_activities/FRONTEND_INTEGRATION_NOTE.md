# Frontend Integration Note: Curiosity OS 2.0 Activity Engine

This document outlines the architecture and constraints of the Stage 3 Frontend Integration for teachers.

## Data Source
The frontend exclusively consumes the generated JSON artifacts from `/content/0_activities/dist/`:
- **`activities.index.json`**: Used for the Library browse grid and search.
- **`collections.manifest.json`**: Used for the collection-based browsing strip.
- **`activities.full.json`**: Used for the high-fidelity Activity Detail pages.

## Transformation & Safety
The `lib/activities.ts` loader acts as a transform layer. It provides type-safety and ensures that the following internal-only fields are **HIDDEN** from the UI:
- `backend_primary_wing`
- `backend_secondary_wings`
- `backend_capability_clusters`
- `backend_node_hooks`
- Weighted mapping metadata
- Evidence-dimension IDs as internal labels

## UI Design Decisions
- **Teacher-First Language**: Instead of "Nodes" or "Wings," we use "Missions," "Purposes," and "Modes."
- **Collection-First Discovery**: The browse experience is centered around the 8 teacher-facing collections (e.g., Reality Check Labs, Study Engine).
- **Logistics Priority**: Duration, Prep Level, and Energy Level are surfaced as primary data points to help teachers make quick classroom decisions.
- **Graceful Maturity Handling**: The Detail page handles both "Pilot" (lighter content) and "Flagship" (richer scripts) activities without breaking.

## Future Roadmap (Next Stages)
- **Stage 4: Activity Planner**: Allow teachers to "save" missions into a personal queue.
- **Stage 5: Run Mode**: An interactive, simplified facilitation interface for use *during* the class.
- **Stage 6: Evidence Capture**: A micro-logging interface for teachers to record "What they saw" during a mission.

---
*Architecture Status: Normalized, Decoupled, Build-Powered.*
筋
