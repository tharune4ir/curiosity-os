---
id: cos2_a06
slug: strategy-heist-logic-locks
title: "Strategy Heist: Logic Locks, Search Space, Enemy Moves"
short_promise: "Students learn why some problems explode, and how strategists prune possibilities."
teacher_value_line: "A single activity that expresses the entire Decode 'Strategy Room'."
student_value_line: "I stop brute-forcing; I learn to narrow intelligently."
summary: "Teams must 'recover the stolen answer key' by solving a constrained puzzle where brute force is impossible. They use logic locks (must/can't statements) to prune the search space and anticipate 'enemy moves' (other team incentives)."
purpose_category: "Decision Gym"
mode_category: "Puzzle / Challenge"
class_fit:
  grades: [9, 10]
  typical_class_size: "25-50"
duration_minutes:
  min: 45
  typical: 55
  max: 60
group_mode: "groups"
prep_level: "medium"
materials:
  minimal: ["paper", "heist map", "clue cards"]
energy_level: "high"
facilitation_difficulty: 3
flow_steps:
  - { t: 5, step: "The Search Space: How many ways can this fail?" }
  - { t: 30, step: "Logic Locks: Pruning the mission." }
  - { t: 20, step: "The Enemy Move: Anticipating incentives." }
teacher_moves:
  - "Lock the first logic before trying to solve the problem."
  - "Strategy is not speed; it's pruning."
teacher_watch_fors:
  - "Students trying to brute force (manual testing) rather than logical pruning."
observation_cues:
  - "Pruning tables and strategy trees."
common_failure_points:
  - "brute_force_failure"
  - "incentive_blindness"
reflection_prompts:
  - "How many possibilities did you kill with one lock?"
adaptations:
  low_resource: "Use board-written 'logic rules'."
follow_ups: ["cos2_a18", "cos2_a15"]
status: "pilot"
curation_tier: "flagship_36"
version: "1.0.0"

internal:
  backend_primary_wing: "Decode"
  backend_secondary_wings: ["Cognition", "Relate"]
  backend_capability_clusters: ["strategy_adversarial", "decision_craft"]
  backend_node_hooks:
    - { node_code: "W1-A3-M07", weight: 1.0, role: "core" }
    - { node_code: "W1-A3-M08", weight: 0.6, role: "support" }
    - { node_code: "W1-A3-M09", weight: 0.6, role: "support" }
    - { node_code: "W2-M3-C06", weight: 0.4, role: "support" }
  evidence_dimensions_targeted: ["generate", "notice", "represent", "reason", "transfer", "reflect"]
---

# Strategy Heist: Logic Locks, Search Space, Enemy Moves

## The Run Mode
### 1. The Setup
Show a heist map with 10 potential routes, each with different gates. 
- Total search space: 2^10 (1024) combinations.
- Hand out 'Logic Lock' clue cards.

### 2. The Mission
Groups have 30 minutes to:
1. Identify 'Logic Locks' (e.g., 'Locked: Cannot pass through Gate A and Gate B').
2. Prune the map: draw a tree or table of survivors.
3. Mid-game twist: Another team (the enemy) is given a different incentive. 
4. Predict what they will do (adversarial modeling).

### 3. The Decompile
Focus on **Search Space and Logic**:
- Brute forcing is for computers; strategists use **Pruning**.
- The enemy move is about incentives, not vibes.
