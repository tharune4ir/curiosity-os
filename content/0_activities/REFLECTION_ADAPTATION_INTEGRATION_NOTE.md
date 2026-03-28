# Curiosity OS // Reflection & Adaptation Integration Note (Stage 7)

## Overview
Stage 7 closes the teacher virtuous cycle: **Browse → Plan → Run → Notice → Reflect → Adapt**. It provides the tools for qualitative interpretation of student evidence and tactical next-step planning.

## Data Model Extensions

### 1. Enhanced Session (`Session`)
Extended to include pedagogical synthesis fields:
- `whatWorked`: Qualitative summary of successes.
- `whereStruggled`: Identification of friction points or student misconceptions.
- `adaptationNotes`: High-value "Next Time" tuning instructions.
- `nextStepChoice`: Decision on the subsequent move (`rerun` | `followup` | `later`).
- `nextStepActivityId`: Reference to the chosen follow-up activity.

## Reflection Workspace (`/reflect`)
A dedicatedthinking surface that transitions from live facilitation to deliberate planning.

### Sections
- **Evidence Mirror**: Grouped visualization of captured signals (tags) and tactical observations (notes).
- **Guided Reflection**: Guided professional prompts (What worked? Where were the gaps?).
- **Adaptation Lab**: A space to commit to specific tactical changes for the next execution of the activity.
- **Next Move Selector**: Decisive integration with the **Follow-up System** and **Planner Queue**.

## The Adaptation Loop

### 1. Pedagogical Memory
- The `LastAdaptation` note is now surfaced on the Activity Detail page.
- This creates "Pedagogical Memory," ensuring that the teacher's previous reflections are the first thing they see before starting a new run.

### 2. Decision Support
- The workspace dynamically resolves the activity's `follow_ups` metadata.
- Integrated with `usePlanner`, allowing teachers to add suggested next steps directly to their queue with one click.

## Terminology Normalization
- Purged "Mission" language in favor of professional educator terms: **"Activity Session"**, **"Run Complete"**, **"Pedagogical Reflection"**.

## Future Readiness (Stage 8)
- **Recommendation Intelligence**: The `nextStepChoice` data will eventually feed into Stage 8's recommendation engine to suggest activities based on success patterns.
- **Portfolio Synthesis**: Reflections will eventually be aggregated into a "Teacher Portfolio" / "Growth Journal."

---
**Status:** Stage 7 Reflection & Adaptation Layer Integrated.
筋
