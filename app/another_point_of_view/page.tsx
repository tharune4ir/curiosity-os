import fs from "fs";
import path from "path";
import UniverseGraph from "@/components/UniverseGraph";

export default function AnotherPointOfView() {
    // 1. Path to our JSON master file
    const jsonPath = path.join(process.cwd(), "content", "1_another_point_of_view", "master_universe.json");
    const rawData = fs.readFileSync(jsonPath, "utf8");
    const jsonNodes = JSON.parse(rawData);

    // 2. Map data natively from JSON structure
    const nodes: any[] = [];
    const links: any[] = [];

    // Create a set of valid names to prevent broken links
    const validNames = new Set(jsonNodes.map((n: any) => n.name));

    jsonNodes.forEach((node: any) => {
        nodes.push({
            id: node.name, // Use name as ID
            name: node.name,
            universe_category: node.universe_category,
            domain: node.domain,
            description: node.description,
            linked_nodes: node.linked_nodes || []
        });

        // Generate edges (links) from the relational array
        if (node.linked_nodes && Array.isArray(node.linked_nodes)) {
            node.linked_nodes.forEach((target: string) => {
                if (validNames.has(target)) {
                    links.push({
                        source: node.name,
                        target: target
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
