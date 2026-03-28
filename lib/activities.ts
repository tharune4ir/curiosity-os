import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content', '0_activities');
const DIST_DIR = path.join(CONTENT_ROOT, 'dist');

export interface RunStep {
  id: string;
  title: string;
  duration: number;
  content: string;
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  short_promise: string;
  teacher_value_line: string;
  student_value_line: string;
  summary: string;
  purpose_category: string;
  mode_category: string;
  class_fit: { grades: number[]; typical_class_size: string };
  duration_minutes: { min: number; typical: number; max: number };
  group_mode: string;
  prep_level: string;
  materials: { minimal: string[]; ideal?: string[] };
  energy_level: string;
  facilitation_difficulty: number;
  flow_steps: { t: number; step: string }[];
  teacher_moves: string[];
  teacher_watch_fors: string[];
  observation_cues: string[];
  common_failure_points: string[];
  reflection_prompts: string[];
  adaptations: Record<string, string>;
  follow_ups: string[];
  status: 'draft' | 'pilot' | 'flagship';
  curation_tier: 'flagship_36' | 'expansion' | 'experimental';
  version: string;
  body: string;
  run_steps?: RunStep[];
}

/**
 * Parses the activity body to extract structured facilitation steps.
 * Looks for '## The Run Mode' or '## Facilitation' and splits by '###'
 */
function parseFacilitationSteps(body: string, flow_steps: { t: number; step: string }[]): RunStep[] {
  const sections = body.split(/\n## /);
  const runModeSection = sections.find(s => s.toLowerCase().startsWith('the run mode') || s.toLowerCase().startsWith('facilitation'));
  
  if (!runModeSection) {
    // Fallback: If no run mode section, create a single "Main Session" step
    return [{
      id: "step_01",
      title: "Main Facilitation",
      duration: flow_steps.reduce((acc, curr) => acc + curr.t, 0) || 45,
      content: body
    }];
  }

  // Split section content by '### '
  const stepBlocks = runModeSection.split(/\n### /).slice(1);
  
  return flow_steps.map((f, i) => {
    const block = stepBlocks[i] || "";
    // Extract title from the first line of the block if it exists
    const titleMatch = block.match(/^(.*?)\n/);
    const title = titleMatch ? titleMatch[1].replace(/^\d+\.\s*/, '').trim() : f.step;
    const content = block.substring(titleMatch ? titleMatch[0].length : 0).trim();

    return {
      id: `step_${i + 1}`,
      title: title || f.step,
      duration: f.t,
      content: content || "No detailed instructions provided for this step."
    };
  });
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  why_it_exists: string;
  included_activity_ids: string[];
  activities?: Partial<Activity>[];
  body?: string;
}

/**
 * Load all activities from source markdown if dist is missing.
 */
async function loadActivitiesFromSource(): Promise<Activity[]> {
  const activitiesDir = path.join(CONTENT_ROOT, 'activities');
  if (!fs.existsSync(activitiesDir)) {
    console.error(`⚠️ [lib/activities] Source directory not found: ${activitiesDir}`);
    return [];
  }
  
  const files = fs.readdirSync(activitiesDir).filter(f => f.endsWith('.md'));
  const seenIds = new Set<string>();
  const activities: Activity[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(activitiesDir, file), 'utf8');
      const { data, content: body } = matter(content);
      
      const id = data.id;
      if (seenIds.has(id)) {
        console.warn(`⚠️ [lib/activities] Duplicate activity ID found in ${file}: ${id}. Skipping.`);
        continue;
      }
      seenIds.add(id);

      const activity = { ...data, body: body.trim() } as Activity;
      activity.run_steps = parseFacilitationSteps(activity.body, activity.flow_steps || []);
      
      activities.push(activity);
    } catch (e) {
      console.error(`❌ [lib/activities] Error parsing ${file}:`, e);
    }
  }

  return activities;
}

/**
 * Loads a full activity and prepares it for Run Mode.
 */
export async function getRunData(slug: string): Promise<Activity | null> {
  const activity = await getActivityBySlug(slug);
  if (!activity) return null;
  
  // Ensure run_steps are present (in case they weren't in the cache)
  if (!activity.run_steps) {
    activity.run_steps = parseFacilitationSteps(activity.body, activity.flow_steps || []);
  }
  
  return activity;
}

/**
 * Map a full activity object to the simplified index structure required by the UI.
 */
function mapToIndex(a: Activity) {
  return {
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
    evidence: (a as any).internal ? (a as any).internal.evidence_dimensions_targeted : [],
    wing: (a as any).internal ? (a as any).internal.backend_primary_wing : 'Unknown'
  };
}

/**
 * Loads the activity index for the library view.
 */
export async function getActivityIndex() {
  const filePath = path.join(DIST_DIR, 'activities.index.json');
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  
  // Guaranteed Fallback: Build a basic index on the fly
  console.log("🛠️ [lib/activities] dist/index missing. Building index from source...");
  const full = await loadActivitiesFromSource();
  return full.map(mapToIndex);
}

/**
 * Loads all collections for the entry strip.
 */
export async function getCollections() {
  const filePath = path.join(DIST_DIR, 'collections.manifest.json');
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Collection[];
  }

  // Guaranteed Fallback: Read collections dir
  console.log("🛠️ [lib/activities] dist/collections missing. Reading from source...");
  const collectionsDir = path.join(CONTENT_ROOT, 'collections');
  if (!fs.existsSync(collectionsDir)) return [];

  const files = fs.readdirSync(collectionsDir).filter(f => f.endsWith('.md'));
  const activities = await getActivityIndex();
  
  const seenIds = new Set<string>();
  const collections: Collection[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(collectionsDir, file), 'utf8');
      const { data, content: body } = matter(content);
      
      const id = data.id;
      if (seenIds.has(id)) {
        console.warn(`⚠️ [lib/activities] Duplicate collection ID found in ${file}: ${id}. Skipping.`);
        continue;
      }
      seenIds.add(id);

      const enriched_activities = (data.included_activity_ids || []).map((id: string) => {
        const activity = activities.find((a: any) => a.id === id);
        return activity ? { id: activity.id, title: activity.title, slug: activity.slug, purpose: activity.purpose } : { id, error: 'Missing' };
      });

      collections.push({ ...data, activities: enriched_activities, body: body.trim() } as Collection);
    } catch (e) {
      console.error(`❌ [lib/activities] Error parsing collection ${file}:`, e);
    }
  }

  return collections;
}

/**
 * Loads a full activity by slug.
 */
export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const filePath = path.join(DIST_DIR, 'activities.full.json');
  if (fs.existsSync(filePath)) {
    const activities = JSON.parse(fs.readFileSync(filePath, 'utf8')) as Activity[];
    return activities.find(a => a.slug === slug) || null;
  }
  
  // Guaranteed Fallback: Load from source
  const full = await loadActivitiesFromSource();
  return full.find(a => a.slug === slug) || null;
}

/**
 * Resolves follow-up activity references to simple card data.
 */
export async function getFollowUps(ids: string[]) {
  const index = await getActivityIndex();
  return index.filter((a: any) => ids.includes(a.id));
}
