# Curiosity OS // Planner Integration Note (Stage 4)

## Overview
Stage 4 introduces the **Planner**, a teacher-facing workflow layer that bridges the gap between the static Activity Library and future live facilitation (Run Mode).

## Data Model (V1)
The planner uses a lightweight, decoupled data model stored in `localStorage` for zero-friction local persistence.

### Objects
1. **Saved Activities** (`savedActivityIds: string[]`)
   - Activities the teacher has "starred" for future reference.
   - Primary Entry Point: Activity Cards (Star icon) or Detail Page (Save button).
2. **Up Next (Queue)** (`queueActivityIds: string[]`)
   - The immediate sequence of activities intended for the next classroom session.
   - Design: Reorderable using `framer-motion` for a tactile, professional feel.
3. **Teaching Sets (Sequences)** (`sequences: PlannerSequence[]`)
   - Manually assembled thematic groups (e.g., "This Week's Reasoning", "Study Reset").
   - Structure: `{ id, name, activityIds }`.

## Architecture
- **State Store**: `lib/planner-context.tsx` provides a `PlannerProvider` and `usePlanner` hook.
- **Persistence**: Auto-syncs to `localStorage` key `curiosity_os_planner_v1`.
- **Decoupling**: The planner stores only IDs. It looks up activity metadata from the static index at runtime, ensuring it is always aligned with the content source.

## Teacher Experience (TX)
- **Calm Workflow**: The Studio (`/planner`) is designed as a minimalist workspace, not a dense management dashboard.
- **Immediate Value**: Adding to a "Queue" or "Set" is a one-click action from any activity surface.
- **Zero Configuration**: No account creation is required to begin planning.

## Future Evolution
- **Account Sync**: Transition `localStorage` persistence to an API-based backend sync for cross-device access.
- **Run Mode Bridge**: The "Queue" will become the primary source for the upcoming interactive facilitation interface.
- **Template Sharing**: Allowing teachers to share "Teaching Sets" as curated curriculum blocks.

---
**Status:** Stage 4 Core Integrated.
