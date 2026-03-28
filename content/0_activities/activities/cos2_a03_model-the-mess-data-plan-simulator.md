---
id: cos2_a03
slug: model-the-mess-data-plan-simulator
title: "Model the Mess: The Data Plan Simulator"
short_promise: "Students turn a messy real-life problem into variables, constraints, and a model they can control."
teacher_value_line: "A bridge from 'school algebra' to 'life modeling' without extra syllabus load."
student_value_line: "I learn to control chaos by naming variables."
summary: "Students analyze a messy, familiar scenario (mobile data, lateness, study time) and define the inputs, outputs, and constraints. They then propose a simple equation or relationship to represent the problem."
purpose_category: "Reality Check"
mode_category: "Lab"
class_fit:
  grades: [9, 10]
  typical_class_size: "25-50"
duration_minutes:
  min: 35
  typical: 45
  max: 55
group_mode: "pairs"
prep_level: "medium"
materials:
  minimal: ["paper", "scenario cards"]
energy_level: "medium"
facilitation_difficulty: 3
flow_steps:
  - { t: 5, step: "The Scenario: What's the problem?" }
  - { t: 25, step: "Model Building: Variables, Inputs, Constraints." }
  - { t: 15, step: "Run mutations: What happens if X changes?" }
teacher_moves:
  - "Variables are power, not just notation."
  - "Lock the first model before giving the students advice."
teacher_watch_fors:
  - "Students stuck on 'advice' rather than 'modeling' (e.g., 'he should sleep more' vs 'sleep = T - study')."
observation_cues:
  - "Model sheet with variables, relationship, and mutation results."
common_failure_points:
  - "vague_representation"
  - "advice_as_model"
reflection_prompts:
  - "Which variable was the hardest to control?"
adaptations:
  low_resource: "Use board-written scenarios."
follow_ups: ["cos2_a04", "cos2_a15"]
status: "pilot"
curation_tier: "flagship_36"
version: "1.0.0"

internal:
  backend_primary_wing: "Decode"
  backend_secondary_wings: ["Cognition"]
  backend_capability_clusters: ["model_estimate", "scientific_causal_reasoning"]
  backend_node_hooks:
    - { node_code: "W1-A2-M04", weight: 1.0, role: "core" }
    - { node_code: "W1-A2-M06", weight: 0.6, role: "support" }
    - { node_code: "W2-M4-C03", weight: 0.6, role: "support" }
  evidence_dimensions_targeted: ["generate", "notice", "represent", "reason", "transfer", "reflect"]
---

# Model the Mess: The Data Plan Simulator

## The Run Mode
### 1. The Setup
Hand out a messy scenario card (e.g., "I keep running out of mobile data," "I'm always late," "Test prep time disappears").

### 2. The Mission
Pairs must build a simple model:
1. **Define Inputs:** List what changes (e.g., "hours of video," "background apps").
2. **Define Outputs:** What is the result? (e.g., "data used").
3. **Identify Constraints:** What limits the model (e.g., "budget," "storage").
4. **Relationship:** Write a simple equation (e.g., `DataUsed = VideoTime * DataRate + Apps`).
5. **Mutation:** If VideoTime doubles, what happens to the budget?

### 3. The Decompile
Focus on the **Power of Naming**:
- Once you name the variables and their relationship, you can control the outcome.
- Modeling is the tool that makes chaos legible.
