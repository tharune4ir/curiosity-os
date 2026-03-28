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

// ─── Builders ──────────────────────────────────────────────────────

function buildActivities() {
  const files = fs.readdirSync(ACTIVITIES_DIR).filter(f => f.endsWith('.md'));
  const activities = [];
  
  for (const file of files) {
    try {
      const filePath = path.join(ACTIVITIES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: body } = matter(content);
      activities.push({ ...data, body: body.trim() });
    } catch (e) {
      console.error(`❌ Error parsing activity file: ${file}`);
      console.error(e);
    }
  }

  // 1. Activity Index (Simplified for UI/Search)
  const index = activities.map(a => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    purpose: a.purpose_category,
    mode: a.mode_category,
    status: a.status,
    tier: a.curation_tier,
    summary: a.summary,
    short_promise: a.short_promise,
    duration: a.duration_minutes,
    prep: a.prep_level,
    energy: a.energy_level,
    materials: a.materials ? a.materials.minimal : [],
    evidence: a.internal ? a.internal.evidence_dimensions_targeted : [],
    wing: a.internal ? a.internal.backend_primary_wing : 'Unknown'
  }));

  fs.writeFileSync(path.join(DIST_DIR, 'activities.index.json'), JSON.stringify(index, null, 2));
  console.log(`✅ Generated activities.index.json (${index.length} activities)`);

  // 2. Original Full Data (For individual pages)
  fs.writeFileSync(path.join(DIST_DIR, 'activities.full.json'), JSON.stringify(activities, null, 2));
  console.log(`✅ Generated activities.full.json`);

  return activities;
}

function buildCollections(activities) {
  const files = fs.readdirSync(COLLECTIONS_DIR).filter(f => f.endsWith('.md'));
  const collections = [];

  for (const file of files) {
    try {
      const filePath = path.join(COLLECTIONS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: body } = matter(content);
      
      // Enrich with activity data
      const enriched_activities = (data.included_activity_ids || []).map(id => {
        const activity = activities.find(a => a.id === id);
        return activity ? { id: activity.id, title: activity.title, slug: activity.slug, purpose: activity.purpose_category } : { id, error: 'Missing' };
      });

      collections.push({ ...data, activities: enriched_activities, body: body.trim() });
    } catch (e) {
      console.error(`❌ Error parsing collection file: ${file}`);
      console.error(e);
    }
  }

  fs.writeFileSync(path.join(DIST_DIR, 'collections.manifest.json'), JSON.stringify(collections, null, 2));
  console.log(`✅ Generated collections.manifest.json (${collections.length} collections)`);
}

function buildCoverageMap(activities) {
  const wings = {
    Decode: { count: 0, clusters: {} },
    Cognition: { count: 0, clusters: {} },
    Relate: { count: 0, clusters: {} },
    Sandbox: { count: 0, clusters: {} }
  };

  const nodeHooks = {};

  activities.forEach(a => {
    if (!a.internal) return;
    const wing = a.internal.backend_primary_wing;
    if (wings[wing]) {
      wings[wing].count++;
      (a.internal.backend_capability_clusters || []).forEach(cluster => {
        wings[wing].clusters[cluster] = (wings[wing].clusters[cluster] || 0) + 1;
      });
    }

    (a.internal.backend_node_hooks || []).forEach(hook => {
      if (!nodeHooks[hook.node_code]) nodeHooks[hook.node_code] = [];
      nodeHooks[hook.node_code].push({ id: a.id, title: a.title, weight: hook.weight });
    });
  });

  const coverage = {
    summary: { total_activities: activities.length },
    by_wing: wings,
    by_node: nodeHooks
  };

  fs.writeFileSync(path.join(DIST_DIR, 'backend_coverage_map.json'), JSON.stringify(coverage, null, 2));
  console.log(`✅ Generated backend_coverage_map.json`);
}

// ─── Execution ──────────────────────────────────────────────────────

console.log("🚀 Building Curiosity OS 2.0 Activity Engine (Debug Mode)...");
const activities = buildActivities();
buildCollections(activities);
buildCoverageMap(activities);
console.log("\n✨ Done! Content artifacts are ready in /dist/");
