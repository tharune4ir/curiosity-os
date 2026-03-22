# Curiosity OS: Data Schema V1 Specification
**Status**: APPROVED / LOCKED FOR GENERATION
**Date**: March 2026

## Core Architectural Philosophy
Curiosity OS uses a true **topic-first atomic knowledge graph**.
The curriculum itself is stable infrastructure. The teaching progress is dynamic state. 
These are strictly decoupled into separate files.

### The 3 Core Files
1. `master_universe.json`: The immutable curriculum nodes, edges, taxonomy metadata, and descriptions.
2. `teaching_state.json`: The volatile tracking state (dates, remarks, mastery).
3. `universe_layouts.json`: Saved visual X/Y/Z mapping states.

---

## The Atom Rule
**A Node is the smallest meaningful teachable unit.**
Wings, Arenas, and Modules are *not* graph nodes. They exist only as taxonomy metadata. This prevents the 3D map from rendering massive, useless "folder" gravity wells and ensures a true neural map of concepts.

---

## 1. Type Definitions & Enums

### `NodeType`
```json
[
  "topic",          // Normal visible curriculum atom (e.g., Bayes' Rule, Social Calibration)
  "embedded_topic", // Internal concept nested inside a topic (e.g., BATNA, Tit-for-Tat)
  "practice_zone",  // Wing 4 structural zone anchor (e.g., Skyline Outlaws)
  "practice_atom",  // A specific Wing 4 activity (e.g., Conflict Repair Roleplay)
  "outcome"         // A reinforced capability (e.g., Confidence Through Action)
]
```

### `Visibility`
```json
[
  "public",   // Standard student-facing topic
  "internal", // Teacher-side concept or embedded topic (hidden by default)
  "hidden"    // System infrastructure node
]
```

### `EdgeType`
Edges are the authoritative, explicit source of all graph connectivity, stored in a top-level `edges` array.
```json
[
  "builds_on",      // Conceptual prerequisite
  "related_to",     // General conceptual link
  "reinforces",     // One node strengthens another in application
  "contrasts_with", // Useful conceptual opposition
  "embedded_in",    // Internal concept lives inside a public topic
  "practiced_in",   // Concept is exercised inside a Wing 4 zone/activity
  "leads_to",       // Node unlocks another capability
  "supports"        // General broad reinforcement
]
```

### `Difficulty` & `TeachingModes`
```json
// Difficulty
["beginner", "intermediate", "advanced"]

// Teaching Modes
["concept", "mental-model", "decision-tool", "social-skill", "practice", "reflection", "simulation", "game", "project"]
```

---

## 2. Canonical JSON Structure (`master_universe.json`)
The root file layout separating system instructions from the actual database structures.

```typescript
interface MasterUniverse {
  schema_version: "curiosity-os.atom-graph.v1";
  generated_at: string;
  curriculum: {
    name: "Curiosity OS";
    wing_system: Array<{
      wing_number: number;
      wing_code: string;
      short_name: "Decode" | "Cognition" | "Relate" | "Sandbox";
      long_name: string;
    }>;
  };
  nodes: Node[];
  edges: Edge[];
  indexes: {
    by_id: Record<string, number>; // Maps COS-ID to array index
    by_slug: Record<string, number>;
    by_wing: Record<string, number[]>;
    // ... other indexes
  };
  meta: {
    node_count: number;
    edge_count: number;
  };
}
```

---

## 3. Node Schema Definition
Every atomic node is composed of 6 required blocks.

```typescript
interface Node {
  // 1. Identity Block
  id: string;               // Permanent identifier (e.g., "COS-0001")
  sequence_number: number;  // Display sorting (1-220)
  slug: string;             // URL-safe string
  title: string;            // Short name (e.g., "Bayes' Rule")
  display_title: string;    // UI name (e.g., "Bayes' Rule (The Belief Updater)")
  aliases?: string[];
  
  node_type: NodeType;
  visibility: Visibility;

  // 2. Taxonomy Block (Metadata, NOT Graph Nodes)
  taxonomy: {
    wing_number: number;
    wing_code: string;         // e.g., "W2"
    wing_short_name: string;   // e.g., "Cognition"
    wing_long_name: string;
    arena_title: string | null;
    module_number: number | null;
    module_title: string | null;
    curriculum_path: string[]; // e.g., ["Cognition", "Probability...", "Bayes' Rule"]
  };

  // 3. Classification Block
  classification: {
    domain: string | null;
    tags: string[];
    keywords: string[];
  };

  // 4. Content Block (The 5-Part Teaching Structure)
  content: {
    hook: string;              // Vivid single line
    meaning: string;           // What it actually is
    why_it_matters: string;    // Practical value/thesis
    example: string;           // Concrete everyday application
    teaching_prompt: string;   // Question/starter for engagement
    summary_short: string;     // Tooltip/card text
    summary_long: string;      // Full drawer description
  };

  // 5. Pedagogy Block (The Teaching Engine)
  pedagogy?: {
    difficulty: Difficulty;
    age_band: string;          // e.g., "15+"
    estimated_minutes: number;
    teaching_modes: TeachingModes[];
    misconceptions: string[];
    prerequisite_ids: string[];
    recommended_after_ids: string[];
  };

  // 6. Activities Block
  activities?: Array<{
    activity_id: string;
    title: string;
    type: string;             // e.g., "mini-game", "roleplay"
    mode: string;             // e.g., "solo", "group"
    duration_minutes: number;
    objective: string;
    prompt: string;
    materials: string[];
    tags: string[];
  }>;

  // 7. Graph Block (Display & Fallback connections)
  graph: {
    linked_node_ids: string[]; // Fallback array. Edges array is source of truth.
    wikilinks: string[];
  };

  // 8. Display Block
  display?: {
    color_group?: string;       // e.g., "W2"
    icon?: string;              // Lucide icon name, e.g., "brain"
    default_open_section?: string;
  };
}
```

---

## 4. Edge Schema Definition
Edges connect atomic nodes. They live strictly in the top-level `edges` array of `master_universe.json`.

```typescript
interface Edge {
  id: string;             // Permanent edge identifier (e.g., "EDGE-000001")
  from: string;           // Node ID corresponding to origin
  to: string;             // Node ID corresponding to target
  type: EdgeType;         // The relationship typed Enum
  strength: number;       // e.g., 0.86
  bidirectional: boolean;
  reason: string;         // Human-readable rationale for the edge connection
}
```

---

## 5. Teaching State Data Structure (`teaching_state.json`)
Merged onto nodes at runtime in the UI but never stored inside canonical curriculum nodes.

```typescript
type StatusEnum = "not_started" | "planned" | "in_progress" | "covered" | "revisit_needed" | "mastered";

interface TeachingState {
  node_id: string;              // Relates to master_universe COS-ID
  status: StatusEnum;
  coverage_stage: string;       // e.g., "taught_once"
  last_taught_on: string | null;// ISO Date
  mastery_estimate: number;     // e.g., 0.68
  remarks: string[];            // Live class-specific volatile notes
}
```

---

## 6. Universe Layouts Architecture (`universe_layouts.json`)
Stores the X/Y/Z mapping states to support the 3D map.

```typescript
interface LayoutState {
  layout_id: string;
  name: string;
  description: string;
  nodes: Array<{
    node_id: string;
    x: number;
    y: number;
    z: number;
    cluster: string | null;
    pinned: boolean;
  }>;
  filters?: Record<string, any>;
}
```

---

## 7. Future Trajectory (Phase 5: Supabase Postgres)
While currently static JSON arrays, these exact TypeScript interface schemas are designed to be mapped 1:1 into a relational PostgreSQL database.
- `master_universe.json` -> `nodes` and `edges` tables.
- `teaching_state.json` -> `progress_state` matching UUIDs to authenticated user sessions.
- `universe_layouts.json` -> `saved_layouts` with serialized position arrays.
