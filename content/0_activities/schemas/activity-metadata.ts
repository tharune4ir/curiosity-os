import { 
    PurposeCategory, 
    ModeCategory, 
    BackendWing, 
    CapabilityCluster, 
    ActivityStatus, 
    CurationTier, 
    EvidenceDimension 
} from "../enums/activity-enums.ts";

export interface ActivityMetadata {
    // Required (Public + Operational)
    id: string;
    slug: string;
    title: string;
    short_promise: string;
    teacher_value_line: string;
    student_value_line: string;
    summary: string;
    purpose_category: (typeof PurposeCategory)[number];
    mode_category: (typeof ModeCategory)[number];
    class_fit: {
        grades: number[];
        typical_class_size: string;
        space_constraints?: string;
    };
    duration_minutes: {
        min: number;
        typical: number;
        max: number;
    };
    group_mode: "solo" | "pairs" | "groups" | "whole-class";
    prep_level: "none" | "low" | "medium" | "high";
    materials: {
        minimal: string[];
        ideal?: string[];
        notes?: string;
    };
    energy_level: "low" | "medium" | "high";
    facilitation_difficulty: number; // 1-5
    
    // Core Workflow
    flow_steps: Array<{
        t: number; // minutes
        step: string;
    }>;
    teacher_moves: string[];
    teacher_watch_fors: string[];
    observation_cues: string[];
    common_failure_points: string[];
    reflection_prompts: string[];
    adaptations: {
        low_resource?: string;
        low_time?: string;
        high_time?: string;
        neurodiversity?: string;
    };
    follow_ups: string[]; // array of activity IDs
    
    // Lifecycle
    status: (typeof ActivityStatus)[number];
    curation_tier: (typeof CurationTier)[number];
    version: string;
    quality_flags?: string[];

    // Internal Backend Alignment (Hidden from teachers)
    internal: {
        backend_primary_wing: (typeof BackendWing)[number];
        backend_secondary_wings?: (typeof BackendWing)[number][];
        backend_capability_clusters: (typeof CapabilityCluster)[number][];
        backend_node_hooks: Array<{
            node_code: string;
            weight: number; // 0.1 - 1.0
            role: "core" | "support" | "extension";
        }>;
        evidence_dimensions_targeted: (typeof EvidenceDimension)[number][];
        failure_atlas_risks?: string[];
        recommendation_prereqs?: string[];
        recommendation_next_best?: Array<{
            id: string;
            context_rank: number;
        }>;
    };
}

export interface CollectionMetadata {
    id: string;
    slug: string;
    title: string;
    description: string;
    why_it_exists: string;
    included_activity_ids: string[];
    featured_activity_id?: string;
    ordering_logic?: "intentional" | "flexible";
}
