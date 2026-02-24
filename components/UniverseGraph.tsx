"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import * as THREE from "three";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import SpriteText from "three-spritetext";

import dynamic from "next/dynamic";
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function UniverseGraph({ graphData }: { graphData: any }) {
    const [mounted, setMounted] = useState(false);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const fgRef = useRef<any>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleNodeClick = useCallback((node: any) => {
        setSelectedNode(node);
        // Fly-to animation logic
        if (fgRef.current) {
            const distance = 100;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

            let newPos = {
                x: node.x * distRatio,
                y: node.y * distRatio,
                z: node.z * distRatio
            };

            // Handling the dead center edge case (everything 0)
            if (node.x === 0 && node.y === 0 && node.z === 0) {
                newPos = { x: 0, y: 0, z: distance };
            }

            fgRef.current.cameraPosition(
                newPos, // new position
                node,   // lookAt ({ x, y, z })
                2000    // ms transition duration
            );
        }
    }, [fgRef]);

    if (!mounted) return null;

    // Helper to render dynamic icon
    const renderIcon = () => {
        if (!selectedNode || !selectedNode.icon) return <LucideIcons.Hexagon className="w-8 h-8 text-cyan-400" />;
        // @ts-ignore
        const IconComponent = LucideIcons[selectedNode.icon];
        return IconComponent ? <IconComponent className="w-8 h-8 text-cyan-400" /> : <LucideIcons.Hexagon className="w-8 h-8 text-cyan-400" />;
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <ForceGraph3D
                    ref={fgRef}
                    graphData={graphData}
                    backgroundColor="#020617"
                    linkColor={() => "rgba(0, 240, 255, 0.1)"}
                    linkDirectionalParticles={() => Math.random() > 0.5 ? 1 : 0}
                    linkDirectionalParticleWidth={1}
                    linkDirectionalParticleSpeed={0.015}
                    linkDirectionalParticleColor={() => "#00F0FF"}
                    nodeThreeObject={(node: any) => {
                        const group = new THREE.Group();
                        const isActive = selectedNode?.id === node.id;

                        // 1. The Mathematical Shell (Wireframe Icosahedron)
                        const shellGeo = new THREE.IcosahedronGeometry(isActive ? 8 : 6, 1);
                        const shellMat = new THREE.MeshBasicMaterial({
                            color: '#00F0FF', // Signature Cyan
                            wireframe: true,
                            transparent: true,
                            opacity: isActive ? 0.3 : 0.15
                        });
                        const shell = new THREE.Mesh(shellGeo, shellMat);
                        group.add(shell);

                        // 2. The Quantum Core (Smooth solid center)
                        const coreGeo = new THREE.SphereGeometry(isActive ? 3 : 2, 16, 16);
                        const coreMat = new THREE.MeshBasicMaterial({
                            color: isActive ? '#00FF9D' : '#FFFFFF' // Bright Neon Green active state, pure white default
                        });
                        const core = new THREE.Mesh(coreGeo, coreMat);
                        group.add(core);

                        // 3. Floating Holographic Data (SpriteText)
                        const sprite = new SpriteText(node.name || "");
                        sprite.color = 'rgba(255, 255, 255, 0.4)'; // Dimmed text
                        sprite.textHeight = isActive ? 3 : 2.5; // Slightly larger text on active
                        sprite.fontFace = 'monospace';
                        sprite.position.set(0, isActive ? -12 : -10, 0); // Push text lower if geometry is larger
                        group.add(sprite);

                        return group;
                    }}
                    showNavInfo={false}
                    onNodeClick={handleNodeClick}
                />
            </div>

            {/* Glassmorphic Side Panel HUD */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-slate-950/80 backdrop-blur-2xl border-l border-cyan-500/30 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] p-8 overflow-y-auto z-[100] flex flex-col gap-6"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-4 mb-2 pb-4">
                                {renderIcon()}
                                <h2 className="text-xl font-bold tracking-[0.1em] uppercase bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,240,255,0.2)] m-0">
                                    {selectedNode.name}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedNode(null)}
                                className="text-cyan-400 hover:text-white transition-colors p-1 rounded-md hover:bg-cyan-500/10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="prose prose-invert prose-cyan max-w-none">
                            <ReactMarkdown
                                components={{
                                    h2: ({ node, ...props }: any) => <h2 className="text-cyan-400 text-[10px] tracking-[0.3em] font-bold uppercase mt-8 first-of-type:mt-0 mb-3 border-b border-cyan-500/20 pb-2 flex-shrink-0" {...props} />,
                                    p: ({ node, ...props }: any) => <p className="text-white/90 text-sm leading-relaxed mb-4" {...props} />,
                                    a: ({ node, href, children, ...props }: any) => {
                                        return (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const targetId = href?.replace('#', '');
                                                    const targetNode = graphData?.nodes?.find((n: any) => n.id === targetId);
                                                    if (targetNode) {
                                                        handleNodeClick(targetNode);
                                                    }
                                                }}
                                                className="text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/80 border border-cyan-500/30 hover:border-cyan-400/60 px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-300 inline-block mr-2 mb-2 shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                                            >
                                                {children}
                                            </button>
                                        )
                                    }
                                }}
                            >
                                {selectedNode.content?.replace(/\[\[(.*?)\]\]/g, '[$1](#$1)') || ''}
                            </ReactMarkdown>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
