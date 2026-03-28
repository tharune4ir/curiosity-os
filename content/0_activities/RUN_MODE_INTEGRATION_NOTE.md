# Curiosity OS // Run Mode Integration Note (Stage 5)

## Overview
Stage 5 introduces the **Facilitation Studio (Run Mode)**, turning Curiosity OS from a content repository into a live classroom operating system. It provides a "Focus Mode" UI that minimizes cognitive load for teachers during an active session.

## Architecture

### 1. Smart Content Parser (`lib/activities.ts`)
The system treats activity markdown as a structured data source.
- **Section Isolation**: Extracts everything under `## The Run Mode` or `## Facilitation`.
- **Step Splitting**: Uses `###` headers to segment the body into discrete steps.
- **Frontmatter Mapping**: Aligns the detailed body content with the `flow_steps` array (which provides titles and durations).
- **Graceful Fallback**: If no structured run mode section is found, it presents the entire body as a single "Main Facilitation" step.

### 2. Focus UI (`app/activities/[slug]/run`)
- **Isolation**: Global navigation (`BottomBar`) is hidden via pathname detection in `layout.tsx`.
- **State**: The `RunModeClient` manages `currentStepIndex` and a global mission timer.
- **Typography**: Uses high-contrast, larger font sizes for readability from a distance.

### 3. The Tactical Toolbox
Located in the right sidebar, this provides:
- **Teacher Moves**: Tactical scripts to keep the session alive.
- **Watch Fors**: Behavioral monitoring signals.
- **Failure Signals**: Common conceptual pitfalls.
- **Stage 6 Hook**: A reserved slot for future Evidence Capture / Observations.

## Teacher Experience (TX)
- **Calm Pacing**: The integrated timer helps maintain activity rhythm without being intrusive.
- **Reduced Load**: Presentation is limited to one step at a time, preventing "scroll-fatigue" during class.
- **Tactile Navigation**: Large CTAs and step-maps facilitate motion.

## Planner Integration
The **Queue** and **Sequences** in the Planner now feature a primary "Run" button, establishing the core workflow:
`Browse → Plan → Run`.

---
**Status:** Stage 5 Facilitation Core Integrated.
