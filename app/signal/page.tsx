import fs from "fs";
import path from "path";
import matter from "gray-matter";

import UniverseGraph from "@/components/UniverseGraph";

export default function SignalOS() {
    // 1. Path to our markdown files
    const mdDirectory = path.join(process.cwd(), "content", "6_signal");

    // Ensure directory exists to avoid build errors if run before generation
    if (!fs.existsSync(mdDirectory)) {
        return <div className="p-20 text-white">Generating Signal Universe...</div>;
    }

    const filenames = fs.readdirSync(mdDirectory).filter(f => f.endsWith('.md'));

    // 2. Map data natively from Markdown files using gray-matter
    const nodes: any[] = [];
    const links: any[] = [];

    filenames.forEach((filename) => {
        const filePath = path.join(mdDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        const nodeId = filename.replace(/\.md$/, "");

        nodes.push({
            id: nodeId,
            name: data.title,
            group: data.domain,
            icon: data.icon,
            content: content.trim()
        });

        // Extract Obsidian WikiLinks from the markdown body
        const linkMatches = Array.from(content.matchAll(/\[\[(.*?)\]\]/g)) as RegExpMatchArray[];
        linkMatches.forEach((match) => {
            links.push({
                source: nodeId,
                target: match[1]
            });
        });
    });

    // Filter out invalid links
    const validNodeIds = new Set(nodes.map(n => n.id));
    const validLinks = links.filter(link => validNodeIds.has(link.source) && validNodeIds.has(link.target));

    const graphData = { nodes, links: validLinks };

    return (
        <main className="relative flex h-screen w-full bg-[#020617] overflow-hidden">
            <UniverseGraph graphData={graphData} storageNamespace="signal" />
        </main>
    );
}
