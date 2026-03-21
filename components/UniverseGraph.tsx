"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Command, CheckCircle2, Zap, PowerOff, ArrowLeft, RotateCcw, Cpu, MemoryStick, Binary, HardDrive, Lightbulb, Settings, Navigation, Atom, Monitor, GitMerge, Package, MapPin, BookOpen, GitBranch, Globe, Globe2, Activity, Box, Layers, RefreshCw, GitFork, FunctionSquare, Languages, List, Repeat, Gauge, Database, FileStack, Cloud, Waypoints, Network, ServerCog, Layout, Server, Boxes, PenTool, Code, Shield, UserX, Terminal, ShieldCheck, Fingerprint, EyeOff, AlertTriangle, Syringe, Wifi, AppWindow, CheckSquare, Hash, Minimize2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import * as THREE from "three";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import SpriteText from "three-spritetext";

import dynamic from "next/dynamic";
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

const getCategoryColor = (category: string) => {
    switch (category) {
        case "1": return "#00f0ff"; // Neon Cyan (Cognitive Engine)
        case "2": return "#10b981"; // Emerald Green (Cybernetic Arsenal)
        case "3": return "#8b5cf6"; // Deep Violet/Purple (Human Ecosystem)
        case "4": return "#f59e0b"; // Amber/Gold (Sandbox/Fun)
        default: return "#00f0ff";
    }
};

export default function UniverseGraph({ graphData, storageNamespace = "possibility" }: { graphData: any, storageNamespace?: string }) {
    const [mounted, setMounted] = useState(false);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set());
    const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const fgRef = useRef<any>(null);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem(`curiosity_unlocked_${storageNamespace}`);
        if (saved) {
            setUnlockedNodes(new Set(JSON.parse(saved)));
        }
    }, []);

    const handleNodeClick = useCallback((node: any) => {
        setSelectedNode(node);
        setUnlockedNodes(prev => {
            const newSet = new Set(prev).add(node.id);
            localStorage.setItem(`curiosity_unlocked_${storageNamespace}`, JSON.stringify([...newSet]));
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
            localStorage.setItem(`curiosity_unlocked_${storageNamespace}`, JSON.stringify([...newSet]));
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
            localStorage.setItem(`curiosity_unlocked_${storageNamespace}`, JSON.stringify([...newSet]));
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
            localStorage.removeItem(`curiosity_unlocked_${storageNamespace}`);
            setUnlockedNodes(new Set());
            setSelectedNode(null); // Close the HUD

            // Zoom out to center
            if (fgRef.current) {
                fgRef.current.cameraPosition({ x: 0, y: 0, z: 250 }, { x: 0, y: 0, z: 0 }, 2000);
            }
        }
    };

    if (!mounted) return null;

    // Fallback map for icon names not directly available in lucide-react
    const iconFallbackMap: Record<string, string> = {
        "ComedyTragedyMasks": "Drama",
        "Fossil": "Bone",
        "VR": "Glasses",
        "Blueprint": "FileText",
        "SunCloud": "CloudSun",
        "MicrophoneStand": "Mic",
        "Bullhorn": "Megaphone",
        "CricketBat": "Swords",
        "Dance": "Music",
        "Tooth": "SmilePlus",
        "LightBulb": "Lightbulb",
        "GameController": "Gamepad2",
        "RaceCar": "Car",
        "Dress": "Shirt",
        "FighterJet": "Plane",
        "FireTruck": "Flame",
        "Football": "Trophy",
        "PaintPalette": "Palette",
        "Gymnast": "PersonStanding",
        "Gavel": "Scale",
        "VideoCamera": "Video",
        "Medal": "Award",
        "Gear": "Settings",
        "Bridge": "Building2",
        "ChartLine": "LineChart",
        "Guitar": "Music2",
        "Surfboard": "Waves",
        "ChefHat": "CookingPot",
        "ClapperBoard": "Clapperboard",
        "Tractor": "Wheat",
        "Robot": "Bot",
        "Calculator": "Hash",
        "Laptop": "Monitor",
        "Stethoscope": "HeartPulse",
        "Flask": "FlaskConical",
        // Biosystem v1 icons (legacy)
        "Battery": "BatteryFull",
        "WaterDrop": "Droplets",
        "Crown": "Crown",
        "Lightning": "Zap",
        "Coin": "Coins",
        "Water": "Waves",
        "Drop": "Droplet",
        "Block": "Box",
        "TrendDown": "TrendingDown",
        "Bug": "Bug",
        // Biosystem v2 icons (Material-style → lucide-react)
        "Alarm": "AlarmClock",
        "Hotel": "BedDouble",
        "Bed": "BedDouble",
        "Energy": "Zap",
        "Network": "Network",
        "FlashOn": "Zap",
        "Spa": "Flower2",
        "Bolt": "Zap",
        "LocalDining": "UtensilsCrossed",
        "Nutrition": "Apple",
        "RiceBowl": "Soup",
        "Egg": "Egg",
        "OliveOil": "Droplet",
        "Vitamin": "Pill",
        "Restaurant": "UtensilsCrossed",
        "Pill": "Pill",
        "ForkKnife": "Utensils",
        "OverflowMenu": "MoreHorizontal",
        "LocalHospital": "Cross",
        "Candy": "Candy",
        "InBox": "Inbox",
        "BatteryHigh": "BatteryFull",
        "Power": "Power",
        "FitnessCenter": "Dumbbell",
        "Accessibility": "Accessibility",
        "Favorite": "Heart",
        "AirlineSeatFlat": "BedDouble",
        "SwapHoriz": "ArrowLeftRight",
        "FavoriteBorder": "Heart",
        "DirectionsRun": "PersonStanding",
        "CenterFocusWeak": "Focus",
        "EmojiEvents": "SmilePlus",
        "Grass": "Leaf",
        "WbSunny": "Sun",
        "Bloodtype": "Droplets",
        "TrendingUp": "TrendingUp",
        "DoNotDisturbOff": "Ban",
        "Tv": "Monitor",
        "Schedule": "Clock",
        "Opacity": "Droplet",
        "Visibility": "Eye",
        "LocalPizza": "Pizza",
        "CalendarToday": "Calendar",
        "Hospital": "Cross",
        "Thermostat": "Thermometer",
        "Whatshot": "Flame",
        "FlashAuto": "Zap",
        "Accessible": "Accessibility",
        "Healing": "HeartPulse",
        "Gesture": "Hand",
        "AutoAwesome": "Sparkles",
        "Balance": "Scale",
        "Kitchen": "ChefHat",
        "Memory": "Brain",
        // Cognition icons (creative names → lucide-react)
        "RamChip": "Cpu",
        "Weight": "Dumbbell",
        "SkillTree": "GitBranch",
        "Flashlight": "Flashlight",
        "GhostTab": "Ghost",
        "PhoneOff": "PhoneOff",
        "Wave": "Waves",
        "Reset": "RotateCcw",
        "DownGraph": "TrendingDown",
        "Steps": "Footprints",
        "QuestionMark": "HelpCircle",
        "Quiz": "ClipboardCheck",
        "Cards": "Layers",
        "Mixer": "Shuffle",
        "Mountain": "Mountain",
        "Pencil": "Pencil",
        "SpeechBubble": "MessageSquare",
        "Why": "HelpCircle",
        "Teacher": "GraduationCap",
        "Blocks": "Boxes",
        "ImageText": "ImagePlus",
        "House": "Home",
        "Story": "BookOpen",
        "ExamSheet": "FileCheck",
        "CrossedArrows": "ArrowUpDown",
        "BrainCircuit": "BrainCircuit",
        "Smooth": "Gauge",
        "Mirror": "ScanFace",
        "BugFix": "Bug",
        "Notebook": "BookOpen",
        "Mentor": "Users",
        "Wall": "SquareStack",
        "Pen": "PenTool",
        "StickyNote": "StickyNote",
        "Nodes": "Network",
        "Tabs": "AppWindow",
        "BatteryLow": "BatteryLow",
        "Menu": "Menu",
        "Freeze": "Snowflake",
        "Loop": "RefreshCw",
        "Spark": "Sparkle",
        "XP": "Trophy",
        "Headphones": "Headphones",
        "Noise": "Volume2",
        "Scoreboard": "BarChart3",
        // Fun universe icons (creative names → lucide-react)
        "Dices": "Dice5",
        "Laugh": "Laugh",
        "Cricket": "CircleDot",
        "Carrom": "Circle",
        "Refresh": "RefreshCw",
        "Chat": "MessageCircle",
        "Bicycle": "Bike",
        "Run": "PersonStanding",
        "Sunrise": "Sunrise",
        "Drum": "Disc3",
        "Tools": "Wrench",
        "Bowl": "Soup",
        "Utensils": "UtensilsCrossed",
        "Controller": "Gamepad2",
        "Diya": "Flame",
        "Album": "BookImage",
        "Letter": "Mail",
        "Mic": "Mic",
        "Planet": "Globe",
        "Stars": "Star",
        "Kite": "Wind",
        "Film": "Film",
        "Comic": "BookOpen",
        "Handshake": "Handshake",
        // Logic universe icons (creative names → lucide-react)
        "ChessPawn": "CircleDot",
        "Lock": "Lock",
        "Repeat": "Repeat",
        "Knight": "Shield",
        "Gift": "Gift",
        "Team": "Users",
        "Star": "Star",
        "Shield": "Shield",
        "Puzzle": "Puzzle",
        "Infinity": "Infinity",
        "Tree": "Trees",
        "Umbrella": "Umbrella",
        "Person": "User",
        "Arrow": "ArrowRight",
        "Chain": "Link",
        "Rocket": "Rocket",
        "Percent": "Percent",
        "Wallet": "Wallet",
        "Pie": "PieChart",
        "UpArrow": "ArrowUp",
        "Hole": "CircleSlash",
        "Target": "Target",
        "Ghost": "Ghost",
        "Magnet": "Magnet",
        "Cherry": "Cherry",
        // Signal universe icons (Shield-themed → lucide-react)
        "ShieldLock": "ShieldCheck",
        "ShieldAlert": "ShieldAlert",
        "ShieldShuffle": "Shuffle",
        "ShieldSound": "Volume2",
        "ShieldYes": "CheckCircle2",
        "ShieldMoney": "Coins",
        "ShieldHook": "Anchor",
        "ShieldRandom": "Dices",
        "ShieldBubble": "MessageSquare",
        "ShieldPower": "Zap",
        "ShieldFire": "Flame",
        "ShieldAds": "Megaphone",
        "ShieldEye": "Eye",
        "ShieldStar": "Star",
        "ShieldHands": "Handshake",
        "ShieldFishes": "Fish",
        "ShieldMap": "MapPin",
        "ShieldFootprint": "Footprints",
        "ShieldHurt": "HeartCrack",
        "ShieldCamera": "Camera",
        "ShieldMobile": "Smartphone",
        "ShieldBug": "Bug",
        "ShieldKey": "Key",
        "ShieldShield": "Shield",
        "ShieldGroup": "Users",
        "ShieldWarning": "AlertTriangle",
        "ShieldMask": "Drama",
        "ShieldWifi": "Wifi",
        "ShieldCandy": "Candy",
        "ShieldGift": "Gift",
        "ShieldCode": "Code",
        "ShieldNetwork": "Network",
        "ShieldUser": "User",
        "ShieldAccuse": "UserX",
        "ShieldHeart": "Heart",
        "ShieldVoice": "Mic",
        "ShieldMonster": "Ghost",
        "ShieldPoison": "Skull",
        "ShieldRocket": "Rocket",
        "ShieldFirstAid": "LifeBuoy",
        "ShieldDetective": "Search",
        "ShieldMessage": "MessageSquare",
        "ShieldMagnify": "Search",
        "ShieldBook": "Book",
        "ShieldLibrary": "Library",
        "ShieldCheck": "Check",
        "ShieldLaugh": "Laugh",
        "ShieldImage": "Image",
        "ShieldHistory": "History",
        "ShieldGossip": "Megaphone",
        "ShieldTeacher": "GraduationCap",
        "ShieldQuestion": "HelpCircle",
        "ShieldCrowd": "Users",
        "ShieldSearch": "Search",
        "ShieldSponge": "Eraser",
        "ShieldRobot": "Bot",
        "ShieldVerified": "BadgeCheck",
        "ShieldScroll": "Scroll",
        "ShieldPit": "ArrowDownToLine",
        "ShieldFace": "UserCircle",
        "ShieldCursor": "Pointer",
        "ShieldCloud": "Cloud",
        "ShieldSplit": "Split",
        "ShieldShopping": "ShoppingBag",
        "ShieldScrollText": "ScrollText",
        "ShieldCookie": "Cookie",
        "ShieldZap": "Zap",
        "ShieldScales": "Scale",
        "ShieldFlag": "Flag",
        "ShieldBookOpen": "BookOpen",
        "ShieldActivity": "Activity",
        "ShieldRotate": "RotateCcw",
        "ShieldHeartHand": "HeartHandshake",
        "ShieldSettings": "Settings",
        "ShieldCrown": "Crown",
        "ShieldPhoneOff": "PhoneOff",
        "ShieldBattery": "Battery",
        "ShieldEyeOff": "EyeOff",
        "ShieldCpu": "Cpu",
        "ShieldPowerOff": "PowerOff",
        "ShieldClock": "Clock",
        "ShieldBot": "Bot",
        "ShieldAI": "BrainCircuit",
        "ShieldLink": "Link2",
        "ShieldTrash": "Trash2",
        "ShieldInfo": "Info",
        "ShieldMic": "Mic2",
        // AI universe icons
        "Trash": "Trash2",
        "CheckCircle": "CheckCircle2",
        "Edit3": "PenLine",
        "Droplet": "Droplets",
        "Smile": "SmilePlus",
        "ArrowDown": "ArrowDown",
        "BarChart": "BarChart3",
        // Wealth universe icons
        "Seeds": "Sprout",
        "Snowball": "IterationCcw",
        "Hourglass": "Hourglass",
        "Forked Road": "GitFork",
        "Faucet & Drain": "Pipette",
        "Paper Bill": "Banknote",
        "Golden Tractor": "Tractor",
        "Iron Anchor": "Anchor",
        "Apple & Seed": "Apple",
        "Water Tap": "Droplets",
        "Basket of Eggs": "ShoppingBasket",
        "Toll Booth": "Ticket",
        "WealthScoreboard": "LayoutList",
        "Speedometer": "Gauge",
        "Shrinking Rupee": "TrendingDown",
        "Rollercoaster": "LineChart",
        "Bandage": "Stethoscope",
        "Clock vs. Factory": "Factory",
        "Food Cart": "Store",
        "Hammer & Megaphone": "Gavel",
        "Only Shop": "Store",
        "Treasure Map": "Map",
        "Trophy Cabinet": "Trophy",
        "Chameleon": "Palette",
        "Giant's Stick": "Zap",
        "Locked Gate": "Lock",
        "Team Captain": "UserCheck",
        "Bank Vault": "Landmark",
        "Open Door": "DoorOpen",
        "Code Brackets": "Code2",
        "Broadcasting": "RadioTower",
        "Magic Copier": "Copy",
        "Sniper Scope": "Target",
        "Signature": "PenLine",
        "Iron Man Suit": "Shield",
        "Web of Friends": "Share2",
        "Trust Bank": "HeartHandshake",
        "Solo Race": "Flag",
        "Wind in Sails": "Sailboat",
        "Stadium": "Hexagon",
        "Lego Bricks": "LayoutGrid",
        "Internet Plot": "Globe",
        "Builder's Kit": "Hammer",
        "Treadmill": "Timer",
        "Fake Crown": "Crown",
        "Golden Cage": "Lock",
        "Handcuffs": "Lock",
        "Bad Shampoo": "Trash2",
        "House of Cards": "Layers",
        "Leaking Bucket": "GlassWater",
        "Broken Clock": "Watch",
        "Heavy Anchor": "Anchor",
        "Stampede": "Users",
        "Delivery Box": "Package",
        "Expensive Label": "Tag",
        "Diluted Juice": "GlassWater",
        "Hamster Wheel": "RefreshCw",
        "Melting Ice": "IceCream",
        "Sadness Tax": "Frown",
        "Snake Oil": "FlaskConical",
        "Neighbor Game": "Users",
        "Rotting Fruit": "Binary",
        "Forever Debt": "Infinity",
    };

    // Helper to render dynamic icon
    const renderIcon = () => {
        const catColor = selectedNode ? getCategoryColor(selectedNode.universe_category) : "#00f0ff";
        if (!selectedNode || !selectedNode.icon) return <LucideIcons.Hexagon className="w-8 h-8" style={{ color: catColor }} />;
        const iconName = iconFallbackMap[selectedNode.icon] || selectedNode.icon;
        // @ts-ignore
        const IconComponent = LucideIcons[iconName];
        return IconComponent ? <IconComponent className="w-8 h-8" style={{ color: catColor }} /> : <LucideIcons.Hexagon className="w-8 h-8" style={{ color: catColor }} />;
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Back to Home Button - Top Left */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-40">
                <a
                    href="/"
                    className="group flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="hidden md:block">SYSTEM_RETURN</span>
                </a>
            </div>

            {/* The Floating Top-Right Arsenal */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-40 flex items-center gap-3">
                <button
                    onClick={() => {
                        setSelectedNode(null);
                        if (fgRef.current) {
                            fgRef.current.cameraPosition({ x: 0, y: 0, z: 250 }, { x: 0, y: 0, z: 0 }, 2000);
                        }
                    }}
                    className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-500/30 text-slate-300 hover:bg-slate-800/60 hover:text-white hover:border-slate-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
                >
                    <RotateCcw className="w-4 h-4 md:w-4 md:h-4" />
                    <span className="hidden md:block text-[10px] tracking-widest uppercase font-mono">Reset View</span>
                </button>
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
                        const catColor = getCategoryColor(node.universe_category);

                        // 1. The Mathematical Shell (Wireframe Icosahedron)
                        const shellGeo = new THREE.IcosahedronGeometry(isActive ? 8 : 6, 1);
                        const shellMat = new THREE.MeshBasicMaterial({
                            color: catColor,
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
                            color: isActive ? '#FFFFFF' : (isUnlocked ? catColor : '#002244'),
                            transparent: !isUnlocked && !isActive,
                            opacity: isActive || isUnlocked ? 1 : 0.6
                        });
                        const core = new THREE.Mesh(coreGeo, coreMat);
                        group.add(core);

                        // 3. Floating Holographic Data (SpriteText) — ALWAYS ON TOP
                        const sprite = new SpriteText(node.canonical_name || node.name || "");
                        sprite.color = isActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)';
                        sprite.textHeight = isActive ? 3.5 : 2.5;
                        sprite.fontFace = 'monospace';
                        sprite.position.set(0, isActive ? 12 : 10, 0);
                        // CRITICAL: Disable depth testing so text renders ON TOP of ALL geometry
                        sprite.material.depthTest = false;
                        sprite.material.depthWrite = false;
                        sprite.renderOrder = 999; // Draw last, always visible
                        group.add(sprite);

                        return group;
                    }}
                    showNavInfo={false}
                    onNodeClick={handleNodeClick}
                />
            </div>

            {/* Universe Title HUD (Bottom Left) */}
            <div className="fixed bottom-[140px] md:absolute md:bottom-10 left-6 md:left-10 z-[100] flex flex-col gap-1 pointer-events-none text-left">
                <span className="text-[9px] md:text-[10px] text-cyan-500 font-mono tracking-widest uppercase">
                    {storageNamespace.replace('-', ' ')} UNIVERSE
                </span>
                <span className="text-[7px] md:text-[8px] text-slate-500/60 tracking-[0.3em] font-light uppercase">
                    concept phase
                </span>
            </div>

            {/* Neural Ledger HUD (Bottom Right) */}
            <div className="fixed bottom-[140px] md:absolute md:bottom-10 right-6 md:right-10 z-[100] flex flex-col items-end gap-1 pointer-events-none text-right">
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
                        style={{ borderLeftColor: getCategoryColor(selectedNode.universe_category) }}
                        className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-slate-950/80 backdrop-blur-2xl border-l-[2px] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] p-8 overflow-y-auto z-[100] flex flex-col gap-6"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-4 mb-2 pb-4">
                                {renderIcon()}
                                <h2
                                    style={{ color: getCategoryColor(selectedNode.universe_category), filter: `drop-shadow(0 0 15px ${getCategoryColor(selectedNode.universe_category)}40)` }}
                                    className="text-xl font-bold tracking-[0.1em] uppercase m-0"
                                >
                                    {selectedNode.canonical_name || selectedNode.name}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedNode(null)}
                                className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="prose prose-invert prose-cyan max-w-none">
                            <ReactMarkdown
                                components={{
                                    h2: ({ node, ...props }: any) => <h2 className="text-slate-400 text-[10px] md:text-xs tracking-[0.2em] font-mono uppercase mt-8 mb-3 border-b border-white/10 pb-2 drop-shadow-md" {...props} />,
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
                                {selectedNode.description || ''}
                            </ReactMarkdown>

                            {selectedNode.linked_nodes && selectedNode.linked_nodes.length > 0 && (
                                <div className="mt-8 border-t border-white/10 pt-6 block clear-both">
                                    <h3
                                        style={{ color: getCategoryColor(selectedNode.universe_category) }}
                                        className="text-[10px] md:text-xs font-mono tracking-widest uppercase mb-4 opacity-80"
                                    >
                                        Linked Nodes
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedNode.linked_nodes.map((link: string) => {
                                            const targetNode = graphData?.nodes?.find((n: any) => n.id === link);
                                            if (!targetNode) return null;
                                            const catColor = getCategoryColor(targetNode.universe_category);
                                            return (
                                                <button
                                                    key={link}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleNodeClick(targetNode);
                                                    }}
                                                    style={{ borderColor: catColor, color: catColor }}
                                                    className="bg-slate-950/40 hover:bg-slate-900/80 border px-3 py-1.5 rounded-md text-[10px] md:text-xs font-mono transition-all opacity-80 hover:opacity-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] text-left"
                                                >
                                                    {targetNode.canonical_name || targetNode.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
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
                                                {node.canonical_name || node.name}
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
