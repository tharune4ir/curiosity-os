const fs = require('fs');
let file = fs.readFileSync('components/UniverseGraph.tsx', 'utf8');

// 1. the getCategoryColor function
file = file.replace(/const getCategoryColor = \(category: string\) => \{[\s\S]*?default: return "#00f0ff";\s*\n\};/, 
`const getCategoryColor = (wingCode: string) => {
    switch (wingCode) {
        case "W1": return "#00f0ff"; // Decode (Cyan)
        case "W2": return "#10b981"; // Cognition (Emerald)
        case "W3": return "#8b5cf6"; // Relate (Purple)
        case "W4": return "#f59e0b"; // Sandbox (Amber)
        default: return "#00f0ff";
    }
};`);

// 2. Props signature
file = file.replace(/export default function UniverseGraph\(\{ graphData, storageNamespace = "possibility" \}: \{ graphData: any, storageNamespace\?: string \}\) \{/,
`export default function UniverseGraph({ graphData, defaultLayout, storageNamespace = "curiosity_os_v1" }: { graphData: any, defaultLayout?: any, storageNamespace?: string }) {`);

// 3. useEffect
file = file.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/,
`useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem(\`curiosity_unlocked_\${storageNamespace}\`);
        if (saved) {
            setUnlockedNodes(new Set(JSON.parse(saved)));
        }
        
        // Apply default layout coordinates
        if (defaultLayout && graphData?.nodes) {
            graphData.nodes.forEach((node: any) => {
                const layoutNode = defaultLayout.nodes?.find((ln: any) => ln.node_id === node.id);
                if (layoutNode) {
                    node.x = layoutNode.x;
                    node.y = layoutNode.y;
                    node.z = layoutNode.z;
                    if (layoutNode.pinned) {
                        node.fx = layoutNode.x;
                        node.fy = layoutNode.y;
                        node.fz = layoutNode.z;
                    }
                }
            });
        }
    }, [defaultLayout, graphData]);`);

// 4. renderIcon
file = file.replace(/const catColor = selectedNode \? getCategoryColor\(selectedNode\.universe_category\) : "#00f0ff";/,
`const catColor = selectedNode ? getCategoryColor(selectedNode.taxonomy?.wing_code) : "#00f0ff";`);
file = file.replace(/if \(!selectedNode \|\| !selectedNode\.icon\) return/g,
`if (!selectedNode || !selectedNode.display?.icon) return`);
file = file.replace(/const iconName = iconFallbackMap\[selectedNode\.icon\] \|\| selectedNode\.icon;/g,
`const iconName = iconFallbackMap[selectedNode.display?.icon] || selectedNode.display?.icon || "Hexagon";`);

// 5. ForceGraph render params
file = file.replace(/const catColor = getCategoryColor\(node\.universe_category\);/g,
`const catColor = getCategoryColor(node.taxonomy?.wing_code);`);

file = file.replace(/const sprite = new SpriteText\(node\.canonical_name \|\| node\.name \|\| ""\);/g,
`const sprite = new SpriteText(node.display_title || node.title || "");`);

// 6. Sidebar Header
file = file.replace(/getCategoryColor\(selectedNode\.universe_category\)/g,
`getCategoryColor(selectedNode.taxonomy?.wing_code)`);
file = file.replace(/\{selectedNode\.canonical_name \|\| selectedNode\.name\}/g,
`{selectedNode.display_title || selectedNode.title}`);

// 7. Sidebar Details
const newBody = `
                            {selectedNode.content && (
                                <div>
                                    {selectedNode.content.hook && (
                                        <p className="text-xl font-light italic opacity-90 mb-6 font-sans">"{selectedNode.content.hook}"</p>
                                    )}
                                    <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">Meaning</h3>
                                    <p className="text-sm text-slate-300 mb-6 font-sans leading-relaxed">{selectedNode.content.meaning}</p>
                                    
                                    <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">Why It Matters</h3>
                                    <p className="text-sm text-slate-300 mb-6 font-sans leading-relaxed">{selectedNode.content.why_it_matters}</p>
                                    
                                    <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">Example</h3>
                                    <p className="text-sm text-slate-300 mb-6 font-sans leading-relaxed">{selectedNode.content.example}</p>
                                    
                                    <div className="bg-slate-900/60 border border-cyan-500/20 p-4 rounded-xl mb-6 shadow-md shadow-cyan-900/10">
                                        <h3 className="text-[10px] text-cyan-500 tracking-widest uppercase mb-2 font-mono">Teaching Prompt</h3>
                                        <p className="text-sm md:text-base text-cyan-100 italic leading-relaxed">"{selectedNode.content.teaching_prompt}"</p>
                                    </div>
                                </div>
                            )}
                            
                            {selectedNode.activities && selectedNode.activities.length > 0 && (
                                <div className="mt-4 mb-4">
                                    <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 mb-4 border-b border-white/10 pb-2 font-mono">Activities</h3>
                                    <div className="flex flex-col gap-3">
                                        {selectedNode.activities.map((act: any) => (
                                            <div key={act.activity_id} className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 shadow-xl">
                                                <div className="flex items-center justify-between mb-3 border-b border-slate-700/50 pb-2">
                                                    <h4 className="text-xs md:text-sm font-bold text-emerald-100/90 tracking-widest font-mono uppercase">{act.title}</h4>
                                                    <span className="text-[9px] bg-slate-900 border border-slate-700/50 px-2 py-0.5 rounded text-emerald-400 font-mono uppercase">{act.duration_minutes}m • {act.mode}</span>
                                                </div>
                                                <p className="text-xs text-slate-300 mb-3 leading-relaxed opacity-90">{act.objective}</p>
                                                <p className="text-xs text-cyan-200/80 italic font-mono bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/30">"{act.prompt}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedNode.state && (
                                <div className="mt-4 mb-6 p-4 rounded-xl border border-dashed flex justify-between items-center" style={{ borderColor: selectedNode.state.status === 'covered' || selectedNode.state.status === 'mastered' ? '#10b98150' : '#47556950', backgroundColor: selectedNode.state.status === 'covered' || selectedNode.state.status === 'mastered' ? '#10b98110' : '#47556910' }}>
                                    <div className="flex items-center gap-3">
                                        <LucideIcons.CheckCircle2 className={\`w-5 h-5 \${selectedNode.state.status === 'covered' || selectedNode.state.status === 'mastered' ? 'text-emerald-400' : 'text-slate-500'}\`}/>
                                        <div>
                                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Progress State</div>
                                            <div className={\`text-sm font-bold \${selectedNode.state.status === 'covered' || selectedNode.state.status === 'mastered' ? 'text-emerald-300' : 'text-slate-300'}\`}>{selectedNode.state.status.replace("_", " ")}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Mastery</div>
                                        <div className="text-sm font-bold text-white">{(selectedNode.state.mastery_estimate * 100).toFixed(0)}%</div>
                                    </div>
                                </div>
                            )}
`;
// Replace the prose div content entirely
file = file.replace(/<div className="prose prose-invert prose-cyan max-w-none">[\s\S]*?<ReactMarkdown[\s\S]*?<\/ReactMarkdown>/, 
    \`<div className="prose prose-invert prose-cyan max-w-none">\n\${newBody}\`);

// 8. Linked Nodes Block Formatting
file = file.replace(/selectedNode\.linked_nodes && selectedNode\.linked_nodes\.length > 0/g,
`selectedNode.graph?.linked_node_ids && selectedNode.graph.linked_node_ids.length > 0`);
file = file.replace(/selectedNode\.linked_nodes\.map/g,
`selectedNode.graph.linked_node_ids.map`);
file = file.replace(/\{targetNode\.canonical_name \|\| targetNode\.name\}/g,
`{targetNode.display_title || targetNode.title}`);

// 9. Search filter logic
file = file.replace(/\(n: any\) => n\.name\?\.toLowerCase\(\)\.includes\(searchQuery\.toLowerCase\(\)\)/g,
`(n: any) => (n.display_title || n.title)?.toLowerCase().includes(searchQuery.toLowerCase())`);
file = file.replace(/\{node\.canonical_name \|\| node\.name\}/g,
`{node.display_title || node.title}`);

fs.writeFileSync('components/UniverseGraph.tsx', file);
