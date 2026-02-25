"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Command, CheckCircle2, Zap, PowerOff } from "lucide-react";
import * as LucideIcons from "lucide-react";
import * as THREE from "three";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import SpriteText from "three-spritetext";

import dynamic from "next/dynamic";
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function UniverseGraph({ graphData, storageNamespace = "possibility" }: { graphData: any, storageNamespace?: string }) {
    const [mounted, setMounted] = useState(false);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set());
    const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const fgRef = useRef<any>(null);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem(`disha_unlocked_${storageNamespace}`);
        if (saved) {
            setUnlockedNodes(new Set(JSON.parse(saved)));
        }
    }, []);

    const handleNodeClick = useCallback((node: any) => {
        setSelectedNode(node);
        setUnlockedNodes(prev => {
            const newSet = new Set(prev).add(node.id);
            localStorage.setItem(`disha_unlocked_${storageNamespace}`, JSON.stringify([...newSet]));
            return newSet;
        });
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

    const handleDirectorySelect = (node: any) => {
        setIsDirectoryOpen(false);
        setSearchQuery('');
        setSelectedNode(node);

        setUnlockedNodes(prev => {
            const newSet = new Set(prev).add(node.id);
            localStorage.setItem(`disha_unlocked_${storageNamespace}`, JSON.stringify([...newSet]));
            return newSet;
        });

        // Fly camera to node
        if (fgRef.current) {
            const distance = 40;
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
    };

    const initiateRandomJump = () => {
        if (!graphData || !graphData.nodes?.length) return;

        // Find nodes that haven't been unlocked yet
        const unvisited = graphData.nodes.filter((n: any) => !unlockedNodes.has(n.id));

        // If all are visited, pick from the whole pool, otherwise pick unvisited
        const pool = unvisited.length > 0 ? unvisited : graphData.nodes;
        const randomNode = pool[Math.floor(Math.random() * pool.length)];

        // Unlock node, open HUD, and jump camera
        setSelectedNode(randomNode);
        setUnlockedNodes(prev => {
            const newSet = new Set(prev).add(randomNode.id);
            localStorage.setItem(`disha_unlocked_${storageNamespace}`, JSON.stringify([...newSet]));
            return newSet;
        });

        if (fgRef.current) {
            const distance = 40;
            const distRatio = 1 + distance / Math.hypot(randomNode.x, randomNode.y, randomNode.z);
            fgRef.current.cameraPosition(
                { x: randomNode.x * distRatio, y: randomNode.y * distRatio, z: randomNode.z * distRatio },
                randomNode,
                2000 // 2-second cinematic sweep
            );
        }
    };

    const wipeMemory = () => {
        if (window.confirm("WARNING: This will sever all neural pathways and plunge the universe back into darkness. Proceed?")) {
            localStorage.removeItem(`disha_unlocked_${storageNamespace}`);
            setUnlockedNodes(new Set());
            setSelectedNode(null); // Close the HUD

            // Zoom out to center
            if (fgRef.current) {
                fgRef.current.cameraPosition({ x: 0, y: 0, z: 250 }, { x: 0, y: 0, z: 0 }, 2000);
            }
        }
    };

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
            {/* The Floating Top-Right Arsenal */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-40 flex items-center gap-3">
                <button
                    onClick={initiateRandomJump}
                    className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-500/30 text-slate-300 hover:bg-slate-800/60 hover:text-white hover:border-slate-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
                >
                    <Zap className="w-4 h-4 md:w-4 md:h-4" />
                    <span className="hidden md:block text-[10px] tracking-widest uppercase font-mono">Random Jump</span>
                </button>
                <button
                    onClick={() => setIsDirectoryOpen(true)}
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/60 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 pointer-events-auto"
                >
                    <Search className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </div>

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
                        const isUnlocked = unlockedNodes.has(node.id);
                        const coreMat = new THREE.MeshBasicMaterial({
                            color: isActive ? '#00FF9D' : (isUnlocked ? '#FFFFFF' : '#002244'), // Bright Neon Green active state, pure white unlocked, dim cyan locked
                            transparent: !isUnlocked && !isActive,
                            opacity: isActive || isUnlocked ? 1 : 0.6
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

            {/* Neural Ledger HUD */}
            <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 z-40 flex flex-col items-end gap-1 pointer-events-none text-right">
                <span className="text-[9px] md:text-[10px] text-cyan-500 font-mono tracking-widest uppercase">Neural Pathways Unlocked</span>
                <span className="text-xl md:text-2xl font-bold text-white tracking-widest">{unlockedNodes.size} <span className="text-sm text-slate-500">/ {graphData.nodes?.length || 0}</span></span>
                <button
                    onClick={wipeMemory}
                    className="mt-4 flex items-center justify-end gap-2 text-[8px] md:text-[9px] text-red-500/50 hover:text-red-400 font-mono tracking-widest uppercase transition-colors group pointer-events-auto"
                >
                    <span>Wipe Memory</span>
                    <PowerOff className="w-3 h-3 group-hover:scale-110 transition-transform" />
                </button>
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
                                    h2: ({ node, ...props }: any) => <h2 className="text-cyan-400 text-[10px] md:text-xs tracking-[0.2em] font-mono uppercase mt-8 mb-3 border-b border-white/10 pb-2 drop-shadow-md" {...props} />,
                                    p: ({ node, ...props }: any) => <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4 font-sans" {...props} />,
                                    ul: ({ node, ...props }: any) => <ul className="flex flex-col gap-2 mt-4" {...props} />,
                                    li: ({ node, ...props }: any) => <li className="text-cyan-100 text-xs font-mono bg-slate-900/50 px-3 py-2 rounded border border-cyan-500/20" {...props} />,
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

            {/* Omni-Directory Modal */}
            <AnimatePresence>
                {isDirectoryOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl max-h-[80vh] bg-slate-950/90 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl flex flex-col overflow-hidden"
                        >
                            {/* The Search Header */}
                            <div className="flex items-center gap-4 p-6 border-b border-white/10 bg-slate-900/50">
                                <Command className="w-5 h-5 text-cyan-500" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search the universe..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 font-mono text-sm md:text-base focus:ring-0"
                                />
                                <button onClick={() => setIsDirectoryOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* The Filtered List Rendering */}
                            <div className="flex-1 overflow-y-auto p-2 md:p-4 flex flex-col gap-1 custom-scrollbar">
                                {graphData?.nodes
                                    ?.filter((n: any) => n.name?.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map((node: any) => (
                                        <button
                                            key={node.id}
                                            onClick={() => handleDirectorySelect(node)}
                                            className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-slate-800/50 transition-colors group text-left border border-transparent hover:border-cyan-500/20"
                                        >
                                            <span className="text-sm text-slate-300 group-hover:text-cyan-300 font-mono">
                                                {node.name}
                                            </span>
                                            {unlockedNodes.has(node.id) && (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            )}
                                        </button>
                                    ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
