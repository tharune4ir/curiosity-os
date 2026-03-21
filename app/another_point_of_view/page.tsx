import fs from "fs";
import path from "path";
import UniverseGraph from "@/components/UniverseGraph";

export default function AnotherPointOfView() {
    // 1. Path to our JSON master file
    const jsonPath = path.join(process.cwd(), "content", "1_another_point_of_view", "master_universe.json");
    const rawData = fs.readFileSync(jsonPath, "utf8");
    const parsedData = JSON.parse(rawData);
    // NEW SCHEMA: Top level has a .nodes array, but fallback to the root if it's the old schema
    const jsonNodes = parsedData.nodes || parsedData || [];

    // 2. Map data natively from JSON structure
    const nodes: any[] = [];
    const links: any[] = [];

    // Create a set of valid IDs to prevent broken links
    const validIds = new Set(jsonNodes.map((n: any) => n.node_id || n.name));

    jsonNodes.forEach((node: any) => {
        const nodeId = node.node_id || node.name;
        nodes.push({
            id: nodeId, // Use stable ID
            name: node.name,
            canonical_name: node.canonical_name || node.name,
            universe_category: node.universe_category,
            domain: node.domain,
            description: node.description,
            linked_nodes: node.linked_node_ids || node.linked_nodes || []
        });

        // Generate edges (links) from the relational array using stable IDs
        const linksArray = node.linked_node_ids || node.linked_nodes;
        if (linksArray && Array.isArray(linksArray)) {
            linksArray.forEach((targetId: string) => {
                if (validIds.has(targetId)) {
                    links.push({
                        source: nodeId,
                        target: targetId
                    });
                }
            });
        }
    });

    const graphData = { nodes, links };

    return (
        <main className="relative flex h-screen w-full bg-[#020617] overflow-hidden">
            {/* Dynamic 3D Graph (Client-Side Only) */}
            <UniverseGraph graphData={graphData} storageNamespace="another_point_of_view" />
        </main>
    );
}
