---
id: cos2_a08
slug: digital-defense-cipher-quest
title: "Digital Defense: Cipher Quest (Cycles, Primes, Secrets)"
short_promise: "Students experience how secrecy and verification work—without heavy math."
teacher_value_line: "A high-engagement gateway into cryptography intuition and 'digital defense' thinking."
student_value_line: "I understand why modern messaging feels like magic but isn't."
summary: "Students run a three-part quest: (1) crack a simple shift cipher using cyclic 'clock math,' (2) build 'prime locks' using factorization, (3) simulate secure messaging with tamper-evidence verification."
purpose_category: "Reality Check"
mode_category: "Game"
class_fit:
  grades: [9, 10]
  typical_class_size: "25-50"
duration_minutes:
  min: 45
  typical: 55
  max: 65
group_mode: "whole-class"
prep_level: "medium"
materials:
  minimal: ["paper", "pens", "cipher cards"]
energy_level: "high"
facilitation_difficulty: 3
flow_steps:
  - { t: 5, step: "The Secrecy Trap: How do you hide a message?" }
  - { t: 25, step: "Cipher Quest: Crack, Lock, Verify." }
  - { t: 15, step: "The Digital Mirror: How modern apps do this." }
teacher_moves:
  - "The secret is the key, not the algorithm."
  - "Verification is more common than encryption in daily security."
teacher_watch_fors:
  - "Students stuck on 'counting' shift-ciphers manually rather than 'cyclic logic'."
observation_cues:
  - "Decoded messages + prime lock keys."
common_failure_points:
  - "unverified_trust_lapse"
reflection_prompts:
  - "What 'hash' or fingerprint would you check before trusting a message?"
adaptations:
  low_resource: "Use board-written ciphers."
follow_ups: ["cos2_a23", "cos2_a01"]
status: "pilot"
curation_tier: "flagship_36"
version: "1.0.0"

internal:
  backend_primary_wing: "Decode"
  backend_secondary_wings: ["Cognition"]
  backend_capability_clusters: ["digital_defense", "evidence_hygiene"]
  backend_node_hooks:
    - { node_code: "W1-A5-M15", weight: 1.0, role: "core" }
    - { node_code: "W1-A5-M13", weight: 0.6, role: "support" }
    - { node_code: "W1-A5-M14", weight: 0.4, role: "support" }
    - { node_code: "W2-M6-C02", weight: 0.4, role: "support" }
  evidence_dimensions_targeted: ["generate", "notice", "represent", "reason", "transfer", "reflect"]
---

# Digital Defense: Cipher Quest (Cycles, Primes, Secrets)

## The Run Mode
### 1. The Setup
Show a cipher board with three segments:
- **Segment 1: Shift Cipher** (A → D, B → E...).
- **Segment 2: Prime Lock** (Factoring 15 into 3 and 5).
- **Segment 3: Tamper Check** (Adding digits to create a sum-check).

### 2. The Mission
In groups, students must:
1. Crack the Shift Cipher to reveal the "Destination."
2. Create their own "Prime Lock" (Product of two primes).
3. Send a message with a "Hash Check" (The sum of the digits in the message).

### 3. The Decompile
Focus on **Secrecy vs. Verification**:
- Secrecy is for privacy; **Verification** is for authenticity.
- Modern security (passwords, banks) uses the same 'one-way logic' as your prime locks.
