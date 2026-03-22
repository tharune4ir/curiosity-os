import fs from "fs";
import path from "path";
import UniverseGraph from "@/components/UniverseGraph";
import { MasterUniverse, TeachingStateFile, UniverseLayoutsFile, UniverseNode } from "@/lib/schema/universe";

export default function AnotherPointOfView() {
    // 1. Paths to our JSON master files (V1 Schema)
    const dataDir = path.join(process.cwd(), "content", "1_another_point_of_view");
    const masterPath = path.join(dataDir, "master_universe_v1.json");
    const statePath = path.join(dataDir, "teaching_state_v1_starter.json");
    const layoutsPath = path.join(dataDir, "universe_layouts_v1_starter.json");

    // 2. Read all 3 files
    const masterData: MasterUniverse = JSON.parse(fs.readFileSync(masterPath, "utf8"));
    const stateData: TeachingStateFile = JSON.parse(fs.readFileSync(statePath, "utf8"));
    const layoutsData: UniverseLayoutsFile = JSON.parse(fs.readFileSync(layoutsPath, "utf8"));

    // 3. Map state to an index for fast O(1) merging
    const stateMap = new Map();
    stateData.states.forEach(state => {
        stateMap.set(state.node_id, state);
    });

    // 4. Transform Nodes into the unified runtime shape
    const nodes = masterData.nodes.map((n: UniverseNode) => {
        const nodeEdges = masterData.edges.filter(e => e.from === n.id || e.to === n.id);
        return {
            ...n,
            state: stateMap.get(n.id) || null,
            rawEdges: nodeEdges
        };
    });

    // 5. Transform explicit edges into 3d-force-graph expected {source, target} format
    const links = masterData.edges.map(edge => ({
        source: edge.from,
        target: edge.to,
        type: edge.type,
        strength: edge.strength,
        bidirectional: edge.bidirectional,
        reason: edge.reason
    }));

    const graphData = { nodes, links };
    
    // Pass the primary layout if available (Optional, for Phase 3 advanced mapping)
    const defaultLayout = layoutsData.layouts.find(l => l.layout_id === "overview-galaxy") || layoutsData.layouts[0] || null;

    return (
        <main className="relative flex h-screen w-full bg-[#020617] overflow-hidden">
            {/* Dynamic 3D Graph (Client-Side Only) */}
            <UniverseGraph 
                graphData={graphData} 
                defaultLayout={defaultLayout}
                storageNamespace="curiosity_os_v1" 
            />
        </main>
    );
}
