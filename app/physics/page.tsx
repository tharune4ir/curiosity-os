import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import matter from "gray-matter";

import UniverseGraph from "@/components/UniverseGraph";

export default function PhysicsOS() {
    // 1. Path to our markdown files
    const mdDirectory = path.join(process.cwd(), "content", "physics_os");
    const filenames = fs.readdirSync(mdDirectory).filter(f => f.endsWith('.md'));

    // 2. Map data natively from Markdown files using gray-matter
    const nodes: any[] = [];
    const links: any[] = [];

    filenames.forEach((filename) => {
        const filePath = path.join(mdDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        // Use the filename (without extension) as a fallback ID if not strictly defined
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

    // Filter out invalid links to prevent ForceGraph3D from crashing if a linked node doesn't exist
    const validNodeIds = new Set(nodes.map(n => n.id));
    const validLinks = links.filter(link => validNodeIds.has(link.source) && validNodeIds.has(link.target));

    const graphData = { nodes, links: validLinks };

    return (
        <main className="relative flex min-h-screen w-full bg-[#020617] overflow-hidden">

            {/* Dynamic 3D Graph (Client-Side Only) */}
            <UniverseGraph graphData={graphData} storageNamespace="physics" />

            {/* Persistent UI Overlay */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
                <Link
                    href="/"
                    className="group flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    SYSTEM_RETURN
                </Link>
            </div>

            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-50 pointer-events-none">
                <h2 className="text-white font-mono tracking-[0.2em] text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                    PHYSICS UNIVERSE
                </h2>
            </div>
        </main>
    );
}
