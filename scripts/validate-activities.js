const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// ─── Configuration ──────────────────────────────────────────────────
const CONTENT_ROOT = path.join(process.cwd(), 'content', '0_activities');
const ACTIVITIES_DIR = path.join(CONTENT_ROOT, 'activities');
const COLLECTIONS_DIR = path.join(CONTENT_ROOT, 'collections');
const DIST_DIR = path.join(CONTENT_ROOT, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// ─── Shared Enums ───────────────────────────────────────────────────
const ENUMS = {
  PurposeCategory: [
    "Reality Check", "Study Engine", "Decision Gym", "Truth & Evidence",
    "Systems Lens", "People & Pressure", "Trust & Teamwork", "Reset & Reflect",
    "Sandbox: Make & Tinker", "Sandbox: Move, Play, Reset"
  ],
  ModeCategory: [
    "Case File", "Puzzle / Challenge", "Lab", "Simulation / Roleplay",
    "Game", "Build / Make", "Outdoor Mission", "Writing Studio", "Reflection Studio"
  ],
  BackendWing: ["Decode", "Cognition", "Relate", "Sandbox"],
  CapabilityCluster: [
    "claim_forensics", "signal_noise_judgment", "model_estimate", "compounding_loops",
    "odds_updates_calibration", "strategy_adversarial", "spatial_intelligence",
    "digital_defense", "learning_engine", "memory_strengthening", "decision_craft",
    "scientific_causal_reasoning", "systems_incentives_sight", "evidence_hygiene",
    "synthesis_under_disagreement", "trust_boundaries_pressure", "cooperation_repair",
    "regulation_reflection"
  ],
  Status: ["draft", "pilot", "flagship", "deprecated"],
  CurationTier: ["flagship_36", "expansion", "experimental", "archived"],
  EvidenceDimension: ["generate", "notice", "represent", "reason", "transfer", "reflect"]
};

// ─── Validation Engine ──────────────────────────────────────────────

let reports = [];

function logError(file, msg) {
  reports.push({ file: path.basename(file), msg, type: 'error' });
}

function logWarning(file, msg) {
  reports.push({ file: path.basename(file), msg, type: 'warn' });
}

function validateActivity(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);

  // Required Fields
  const required = [
    'id', 'slug', 'title', 'short_promise', 'teacher_value_line', 
    'student_value_line', 'summary', 'purpose_category', 'mode_category',
    'class_fit', 'duration_minutes', 'group_mode', 'prep_level', 'materials',
    'energy_level', 'facilitation_difficulty', 'flow_steps', 'teacher_moves',
    'teacher_watch_fors', 'observation_cues', 'common_failure_points',
    'reflection_prompts', 'status', 'curation_tier', 'version', 'internal'
  ];

  required.forEach(field => {
    if (data[field] === undefined) logError(filePath, `Missing required field: ${field}`);
  });

  // Enum Validations
  if (data.purpose_category && !ENUMS.PurposeCategory.includes(data.purpose_category)) {
    logError(filePath, `Invalid purpose_category: ${data.purpose_category}`);
  }
  if (data.mode_category && !ENUMS.ModeCategory.includes(data.mode_category)) {
    logError(filePath, `Invalid mode_category: ${data.mode_category}`);
  }
  if (data.status && !ENUMS.Status.includes(data.status)) {
    logError(filePath, `Invalid status: ${data.status}`);
  }

  // Internal Mapping Validations
  if (data.internal) {
    if (!ENUMS.BackendWing.includes(data.internal.backend_primary_wing)) {
      logError(filePath, `Invalid primary wing: ${data.internal.backend_primary_wing}`);
    }
    
    (data.internal.backend_capability_clusters || []).forEach(cluster => {
      if (!ENUMS.CapabilityCluster.includes(cluster)) {
        logError(filePath, `Invalid cluster: ${cluster}`);
      }
    });

    (data.internal.evidence_dimensions_targeted || []).forEach(dim => {
      if (!ENUMS.EvidenceDimension.includes(dim)) {
        logError(filePath, `Invalid evidence dimension: ${dim}`);
      }
    });
  }
}

function validateCollection(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);

  const required = ['id', 'slug', 'title', 'description', 'why_it_exists', 'included_activity_ids'];
  required.forEach(field => {
    if (data[field] === undefined) logError(filePath, `Missing required field: ${field}`);
  });
}

// ─── Execution ──────────────────────────────────────────────────────

console.log("🔍 Validating Curiosity OS 2.0 Activity Content...");

// 1. Activities
if (fs.existsSync(ACTIVITIES_DIR)) {
  const files = fs.readdirSync(ACTIVITIES_DIR).filter(f => f.endsWith('.md'));
  files.forEach(file => validateActivity(path.join(ACTIVITIES_DIR, file)));
}

// 2. Collections
if (fs.existsSync(COLLECTIONS_DIR)) {
  const files = fs.readdirSync(COLLECTIONS_DIR).filter(f => f.endsWith('.md'));
  files.forEach(file => validateCollection(path.join(COLLECTIONS_DIR, file)));
}

// ─── Write Report ───────────────────────────────────────────────────

const errorCount = reports.filter(r => r.type === 'error').length;
const warnCount = reports.filter(r => r.type === 'warn').length;

const finalReport = {
  timestamp: new Date().toISOString(),
  summary: {
    total_issues: reports.length,
    errors: errorCount,
    warnings: warnCount
  },
  details: reports
};

fs.writeFileSync(path.join(DIST_DIR, 'validation_report.json'), JSON.stringify(finalReport, null, 2));

if (errorCount > 0) {
  console.error(`❌ Found ${errorCount} errors. See /dist/validation_report.json for details.`);
  process.exit(1);
} else {
  console.log(`✅ Validation successful! (${warnCount} warnings). Report saved to /dist/`);
}
筋
