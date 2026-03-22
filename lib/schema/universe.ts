export type NodeType = 
  | "topic"
  | "embedded_topic"
  | "practice_zone"
  | "practice_atom"
  | "outcome";

export type Visibility = "public" | "internal" | "hidden";

export type EdgeType = 
  | "builds_on"
  | "related_to"
  | "reinforces"
  | "contrasts_with"
  | "embedded_in"
  | "practiced_in"
  | "leads_to"
  | "supports";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type TeachingMode = 
  | "concept"
  | "mental-model"
  | "decision-tool"
  | "social-skill"
  | "practice"
  | "reflection"
  | "simulation"
  | "game"
  | "project";

export type ActivityType = 
  | "micro-exercise"
  | "mini-game"
  | "discussion"
  | "journal"
  | "roleplay"
  | "challenge"
  | "experiment"
  | "project";

export type ActivityMode = "solo" | "pair" | "group" | "solo_or_group";

export interface Activity {
  activity_id: string;
  title: string;
  type: ActivityType;
  mode: ActivityMode;
  duration_minutes: number;
  objective: string;
  prompt: string;
  materials: string[];
  tags: string[];
}

export interface UniverseNode {
  id: string;
  sequence_number: number;
  slug: string;
  title: string;
  display_title: string;
  aliases?: string[];
  
  node_type: NodeType;
  visibility: Visibility;

  taxonomy: {
    wing_number: number;
    wing_code: string;
    wing_short_name: string;
    wing_long_name: string;
    arena_title: string | null;
    module_number: number | null;
    module_title: string | null;
    curriculum_path: string[];
    zone_title?: string | null;
    embedded_under_title?: string | null;
    curriculum_code?: string | null;
  };

  classification: {
    domain: string | null;
    tags: string[];
    keywords: string[];
  };

  content: {
    hook: string;
    meaning: string;
    why_it_matters: string;
    example: string;
    teaching_prompt: string;
    summary_short?: string;
    summary_long?: string;
  };

  pedagogy?: {
    difficulty: Difficulty;
    age_band: string;
    estimated_minutes: number;
    teaching_modes: TeachingMode[];
    misconceptions: string[];
    prerequisite_ids: string[];
    recommended_after_ids: string[];
  };

  activities?: Activity[];

  graph: {
    linked_node_ids: string[];
    wikilinks: string[];
  };

  display?: {
    color_group?: string;
    icon?: string;
    default_open_section?: string;
  };

  // The runtime Teaching State is attached to the node for UI access
  state?: TeachingState;
}

export interface UniverseEdge {
  id: string;
  from: string;
  to: string;
  type: EdgeType;
  strength: number;
  bidirectional: boolean;
  reason: string;
}

export interface MasterUniverse {
  schema_version: string;
  generated_at: string;
  curriculum: {
    name: string;
    wing_system: Array<{
      wing_number: number;
      wing_code: string;
      short_name: string;
      long_name: string;
    }>;
  };
  nodes: UniverseNode[];
  edges: UniverseEdge[];
  indexes: {
    by_id: Record<string, number>;
    by_slug: Record<string, number>;
    by_wing: Record<string, number[]>;
  };
  meta: {
    node_count: number;
    edge_count: number;
  };
}

export type StatusEnum = "not_started" | "planned" | "in_progress" | "covered" | "revisit_needed" | "mastered";

export interface TeachingState {
  node_id: string;
  status: StatusEnum;
  coverage_stage: string;
  last_taught_on: string | null;
  mastery_estimate: number;
  remarks: string[];
  first_taught_on?: string | null;
  next_review_on?: string | null;
  classes?: string[];
}

export interface TeachingStateFile {
  schema_version: string;
  updated_at: string;
  states: TeachingState[];
}

export interface LayoutNodeState {
  node_id: string;
  x: number;
  y: number;
  z: number;
  cluster: string | null;
  pinned: boolean;
}

export interface UniverseLayout {
  layout_id: string;
  name: string;
  description: string;
  nodes: LayoutNodeState[];
  filters?: Record<string, any>;
}

export interface UniverseLayoutsFile {
  schema_version: string;
  updated_at: string;
  layouts: UniverseLayout[];
}
