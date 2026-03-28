# Curiosity OS // Evidence Capture Integration Note (Stage 6)

## Overview
Stage 6 transforms Curiosity OS into a **noticing system**. It introduces a lightweight evidence layer that allows teachers to capture observations during live facilitation and synthesis after the run.

## Data Model

### 1. Session (`Session`)
Tracks a single execution of an activity.
- `id`: Unique session identifier.
- `activityId`: Reference to the activity.
- `startTime` / `endTime`: Facilitation duration.
- `status`: Lifecycle state (`active` | `completed`).
- `reflection`: Final teacher meta-reflection.

### 2. Evidence Entry (`EvidenceEntry`)
Tactical observations recorded during or after a session.
- `sessionId`: Parent session reference.
- `stepIndex`: Automatic step-aware context from Run Mode.
- `timestamp`: Precise moment of capture.
- `type`: Category of evidence (observation, confusion, quote, etc.).
- `note`: Teacher's text.
- `tags`: Professional teacher-facing signals (e.g., "Strong Reasoning").

## Implementation Details

### Evidence Engine (`lib/evidence-context.tsx`)
- Uses `localStorage` persistence (`curiosity_os_evidence_v1`).
- Provides hooks for starting/ending sessions and adding entries.
- Decoupled from backend storage to remain low-friction.

### Live Capture (Run Mode)
- **Injection**: The "Notice & Capture" strip in the tactical toolbox.
- **Automation**: Automatically attaches the `currentStepIndex` to every entry.
- **Micro-UI**: Optimized for one-handed use during active facilitation.

### Post-Run Synthesis
- **Logic**: Triggered when "Complete Mission" is clicked.
- **Surface**: `/activities/[slug]/run/complete`.
- **Function**: Summarizes tactical signals and prompts for a final meta-reflection.

### Activity History
- **Location**: Bottom of the Activity Detail page.
- **Visibility**: Only appears once at least one session is recorded.
- **Revisit Flow**: Critical for "browsing before running" to remember past student thinking.

## Teacher-Facing Tags
- Strong Reasoning
- Confusion
- High Engagement
- Low Participation
- Thoughtful Question
- Useful Disagreement
- Rushed Thinking
- Needs Follow-up
- Clear Explanation
- Social Friction

## Future Readiness (Stage 7)
The evidence model is structured to support:
- **Trend Detection**: Identifying recurring confusions across runs.
- **Recommendation Logic**: Suggesting follow-up activities based on captured tags.
- **Adaptation Intelligence**: Pre-filling reflection templates based on session signals.

---
**Status:** Stage 6 Evidence Layer Integrated.
