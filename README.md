# Curiosity OS 🌌
> **A static open learning portal and interactive 3D concept map designed to train better questioning, reasoning, and critical thinking.**

![Curiosity OS Banner](https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072)

---

## 🎯 What is Curiosity OS?
Traditional learning often emphasizes rote memorization and passive compliance. **Curiosity OS** shifts the learning experience back to active, self-driven inquiry. 

It is a completely free, serverless, and offline-friendly playground designed for students, teachers, parents, and self-learners to explore ideas and build deep thinking habits.

---

## ✨ Key Features

* **🌌 The Curiosity Verse:** A beautifully rendered, interactive WebGL 3D network mapping 147 learning concepts. Zoom, rotate, search, and connect ideas across four thematic wings.
* **📚 The Activity Library:** Access 36 flagship playbook challenges (including *Reality Checks*, *Study Engines*, *Decision Gyms*, and *Trust & Teamwork*) that you can practice solo, in pairs, or in groups.
* **⏱️ Facilitation HUD & Timers:** Built-in step guides, timers, and facilitation moves to help parents or mentors lead active discussions and thought exercises seamlessly.
* **📝 Evidence-Tagging Terminal:** Facilitators can capture thoughts, breakthroughs, confusion, and friction points on the fly with millisecond-accurate timestamp tagging.
* **🔒 100% Client-Side Privacy:** No logins, no database connections, and no tracking. All session queue states and reflections are stored safely in your browser's local sandbox memory.

---

## 🧭 The 4 Pillars of Thinking

Curiosity OS structures concepts into four primary wings:
1. **W1 — Decode:** The Reality Hacker's Toolkit (Systems thinking, logic, and data).
2. **W2 — Cognition:** The intellectual OS (Philosophy, memory, and cognitive biases).
3. **W3 — Relate:** The Human Interface (Empathy, active listening, and communication under pressure).
4. **W4 — Sandbox:** High-stakes live exercises and creative brainstorming fields.

---

## 🚀 Getting Started

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/tharungajula2/curiosity-os.git
   cd curiosity-os
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## ⚙️ Technical Details & Deployment Runbook

For a comprehensive architectural blueprint, please refer to the detailed specification:
* **[System Blueprint & Source of Truth](./CURIOSITY_OS_SOURCE_OF_TRUTH_2026-06-20.md)**

### Local Build and Compilation Pipelines
Curiosity OS features localized parsing compilers to generate static activity data structures. Run these in sequence before production deployments:

* **Generate Activity Indexes:**
  ```bash
  npm run build:activities
  ```
* **Verify Metadata Validation:**
  ```bash
  npm run validate:activities
  ```
* **Sync Obsidian Traversal Nodes:**
  ```bash
  npm run generate:universe
  ```
* **Production Build:**
  ```bash
  npm run build
  npm run start
  ```

---
© **Tharun Gajula** | All Rights Reserved.  
Built with intention to foster curiosity in the next generation of thinkers.
