"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Command, CheckCircle2, Zap, PowerOff, ArrowLeft, RotateCcw, Cpu, MemoryStick, Binary, HardDrive, Lightbulb, Settings, Navigation, Atom, Monitor, GitMerge, Package, MapPin, BookOpen, GitBranch, Globe, Globe2, Activity, Box, Layers, RefreshCw, GitFork, FunctionSquare, Languages, List, Repeat, Gauge, Database, FileStack, Cloud, Waypoints, Network, ServerCog, Layout, Server, Boxes, PenTool, Code, Shield, UserX, Terminal, ShieldCheck, Fingerprint, EyeOff, AlertTriangle, Syringe, Wifi, AppWindow, CheckSquare, Hash, Minimize2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import * as THREE from "three";
// @ts-ignore
import SpriteText from "three-spritetext";

import dynamic from "next/dynamic";
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

const getCategoryColor = (wingCode?: string) => {
    switch (wingCode) {
        case "W1": return "#00f0ff"; // Decode (Cyan)
        case "W2": return "#10b981"; // Cognition (Emerald)
        case "W3": return "#8b5cf6"; // Relate (Purple)
        case "W4": return "#f59e0b"; // Sandbox (Amber)
        default: return "#00f0ff";
    }
};

export default function UniverseGraph({ graphData, defaultLayout, storageNamespace = "curiosity_os_v1" }: { graphData: any, defaultLayout?: any, storageNamespace?: string }) {
    const [mounted, setMounted] = useState(false);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set());
    const [sessionStack, setSessionStack] = useState<any[]>([]);
    const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'student' | 'mentor' | 'builder'>('mentor');
    const fgRef = useRef<any>(null);
    const initialZoomDone = useRef(false);

    // Group the raw semantic edges by relationship type
    const groupedEdges = useMemo(() => {
        if (!selectedNode || !selectedNode.rawEdges) return null;
        const groups: Record<string, { node: any, edge: any, isOutgoing: boolean }[]> = {
            "Builds On": [], // Prerequisites
            "Leads To": [], // Next steps
            "Practiced In": [], // Wing 4 mappings
            "Reinforces": [], // Conceptual reinforcement
            "Embedded In": [], // Internal structures
            "Related To": [] // Bidirectional/Soft links
        };

        selectedNode.rawEdges.forEach((e: any) => {
            const isOutgoing = e.from === selectedNode.id;
            const targetId = isOutgoing ? e.to : e.from;
            const targetNode = graphData?.nodes?.find((n: any) => n.id === targetId);
            if (!targetNode) return;

            if (e.type === 'builds_on') {
                if (isOutgoing) groups["Leads To"].push({ node: targetNode, edge: e, isOutgoing });
                else groups["Builds On"].push({ node: targetNode, edge: e, isOutgoing });
            } else if (e.type === 'practiced_in') {
                groups["Practiced In"].push({ node: targetNode, edge: e, isOutgoing });
            } else if (e.type === 'reinforces') {
                groups["Reinforces"].push({ node: targetNode, edge: e, isOutgoing });
            } else if (e.type === 'embedded_in') {
                groups["Embedded In"].push({ node: targetNode, edge: e, isOutgoing });
            } else {
                groups["Related To"].push({ node: targetNode, edge: e, isOutgoing });
            }
        });
        return groups;
    }, [selectedNode, graphData]);

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
    }, [storageNamespace]);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem(`curiosity_unlocked_${storageNamespace}`);
        if (saved) {
            setUnlockedNodes(new Set(JSON.parse(saved)));
        }

        // Apply dynamic layout overrides
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
        
        // Setup Window Listeners for the HUD controls
        const handleSearch = () => setIsDirectoryOpen(true);
        const handleRandom = () => {
             if (graphData?.nodes?.length) {
                 const randomNode = graphData.nodes[Math.floor(Math.random() * graphData.nodes.length)];
                 handleNodeClick(randomNode);
             }
        };
        const handleReset = () => {
             if (fgRef.current) {
                 const isMobile = window.innerWidth < 768;
                 fgRef.current.cameraPosition(
                    { x: 0, y: 0, z: isMobile ? 1200 : 800 }, 
                    { x: 0, y: 0, z: 0 }, 
                    2000
                 );
                 setSelectedNode(null);
                 setSearchQuery('');
                 setIsDirectoryOpen(false);
             }
        };

        window.addEventListener('universe:search', handleSearch);
        window.addEventListener('universe:random', handleRandom);
        window.addEventListener('universe:reset', handleReset);
        
        return () => {
             window.removeEventListener('universe:search', handleSearch);
             window.removeEventListener('universe:random', handleRandom);
             window.removeEventListener('universe:reset', handleReset);
        };
    }, [defaultLayout, graphData, storageNamespace, handleNodeClick]);

    const handleEngineStop = useCallback(() => {
        if (fgRef.current && mounted && !initialZoomDone.current) {
            initialZoomDone.current = true;
            // Introduce a tiny delay so the sprites have time to map their bounding boxes before framing
            setTimeout(() => {
                if (fgRef.current) fgRef.current.zoomToFit(2000, 120);
            }, 300);
        }
    }, [mounted]);

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
        const catColor = selectedNode ? getCategoryColor(selectedNode.taxonomy?.wing_code) : "#00f0ff";
        if (!selectedNode || !selectedNode.display?.icon) return <LucideIcons.Hexagon className="w-8 h-8" style={{ color: catColor }} />;
        const iconName = iconFallbackMap[selectedNode.display.icon] || selectedNode.display.icon;
        // @ts-ignore
        const IconComponent = LucideIcons[iconName];
        return IconComponent ? <IconComponent className="w-8 h-8" style={{ color: catColor }} /> : <LucideIcons.Hexagon className="w-8 h-8" style={{ color: catColor }} />;
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Back to Home Button - Top Left */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-40 flex items-center gap-4">
                <a
                    href="/"
                    className="group flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="hidden md:block">SYSTEM_RETURN</span>
                </a>

                {/* View Mode Toggle */}
                <div className="flex flex-wrap md:flex-nowrap items-center bg-slate-900/60 backdrop-blur-md rounded-2xl md:rounded-full border border-slate-700/50 p-1 mt-2 md:mt-0 gap-1 md:gap-0">
                    {(['student', 'mentor', 'builder'] as const).map(mode => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${
                                viewMode === mode 
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                                : 'text-slate-500 hover:text-slate-300 border border-transparent'
                            }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
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
                    onEngineStop={handleEngineStop}
                    nodeThreeObject={(node: any) => {
                        const group = new THREE.Group();
                        const isActive = selectedNode?.id === node.id;
                        const catColor = getCategoryColor(node.taxonomy?.wing_code);

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
                        const sprite = new SpriteText(node.display_title || node.title || "");
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
            <div className={`fixed transition-all duration-500 z-[100] flex flex-col gap-1 pointer-events-none text-left ${sessionStack.length > 0 ? 'bottom-[290px] md:bottom-[230px]' : 'bottom-[140px] md:bottom-10'} left-6 md:left-10`}>
                <span className="text-[9px] md:text-[10px] text-cyan-500 font-mono tracking-widest uppercase">
                    {storageNamespace.replace('-', ' ')} UNIVERSE
                </span>
                <span className="text-[7px] md:text-[8px] text-slate-500/60 tracking-[0.3em] font-light uppercase">
                    concept phase
                </span>
            </div>

            {/* Neural Ledger HUD (Bottom Right) */}
            <div className={`fixed transition-all duration-500 z-[100] flex flex-col items-end gap-1 pointer-events-none text-right ${sessionStack.length > 0 ? 'bottom-[290px] md:bottom-[230px]' : 'bottom-[140px] md:bottom-10'} right-6 md:right-10`}>
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
                                    style={{ color: getCategoryColor(selectedNode.taxonomy?.wing_code), filter: `drop-shadow(0 0 15px ${getCategoryColor(selectedNode.taxonomy?.wing_code)}40)` }}
                                    className="text-xl font-bold tracking-[0.1em] uppercase m-0 leading-tight"
                                >
                                    {selectedNode.display_title || selectedNode.title}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedNode(null)}
                                className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        {/* Wing 4 Dedicated Practice Overlay */}
                        {selectedNode.taxonomy?.wing_code === 'W4' && groupedEdges && (
                            <div className="bg-gradient-to-br from-amber-900/20 to-transparent border border-amber-500/20 p-5 rounded-xl mb-2 flex flex-col gap-4">
                                <div>
                                    <h3 className="text-[10px] font-mono text-amber-500/80 tracking-widest uppercase mb-2">The Practice Matrix</h3>
                                    <p className="text-[11px] text-amber-200/60 leading-relaxed font-sans italic">
                                        Wing 4 is where abstract concepts are embodied through high-stakes simulation and drill.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-2 border-t border-amber-500/10 pt-3 mt-1">
                                    {groupedEdges["Reinforces"]?.length > 0 && (
                                        <div>
                                            <span className="text-[9px] uppercase tracking-widest font-mono text-amber-600">Reinforces: </span>
                                            <span className="text-xs text-amber-100/90 font-sans">
                                                {groupedEdges["Reinforces"].map((i) => i.node.display_title || i.node.title).join(", ")}
                                            </span>
                                        </div>
                                    )}
                                    {groupedEdges["Practiced In"]?.length > 0 && (
                                        <div>
                                            <span className="text-[9px] uppercase tracking-widest font-mono text-amber-600">Practiced In: </span>
                                            <span className="text-xs text-amber-100/90 font-sans">
                                                {groupedEdges["Practiced In"].map((i) => i.node.display_title || i.node.title).join(", ")}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="prose prose-invert prose-cyan max-w-none">
                            {/* Session Builder Actions */}
                            <div className="flex items-center justify-start gap-3 mb-6">
                                <button
                                    onClick={() => {
                                        if (sessionStack.find(n => n.id === selectedNode.id)) {
                                            setSessionStack(prev => prev.filter(n => n.id !== selectedNode.id));
                                        } else {
                                            setSessionStack(prev => [...prev, selectedNode]);
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-2 border ${
                                        sessionStack.find(n => n.id === selectedNode.id)
                                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                        : 'bg-slate-900/50 text-slate-400 border-slate-700/50 hover:bg-slate-800'
                                    }`}
                                >
                                    {sessionStack.find(n => n.id === selectedNode.id) ? <CheckCircle2 className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                                    {sessionStack.find(n => n.id === selectedNode.id) ? 'In Session Stack' : 'Add to Lesson Plan'}
                                </button>
                            </div>

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

                            {/* Teaching Intelligence Progress Block */}
                            {selectedNode.state && (
                                <div className="mt-4 mb-6 p-5 rounded-xl border border-dashed bg-slate-900/30" 
                                     style={{ borderColor: selectedNode.state.status === 'covered' || selectedNode.state.status === 'mastered' ? '#10b98150' : '#47556950' }}>
                                    
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <LucideIcons.CheckCircle2 className={`w-5 h-5 ${selectedNode.state.status === 'covered' || selectedNode.state.status === 'mastered' ? 'text-emerald-400' : 'text-slate-500'}`}/>
                                            <div>
                                                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">Status</div>
                                                <div className={`text-sm font-bold capitalize leading-none ${selectedNode.state.status === 'covered' || selectedNode.state.status === 'mastered' ? 'text-emerald-300' : 'text-slate-300'}`}>
                                                    {selectedNode.state.status.replace("_", " ")}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">Mastery</div>
                                            <div className="text-lg font-bold text-white leading-none">{(selectedNode.state.mastery_estimate * 100).toFixed(0)}%</div>
                                        </div>
                                    </div>

                                    {/* Advanced Intelligence for Mentors & Builders */}
                                    {viewMode !== 'student' && (
                                        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-700/50">
                                            <div>
                                                <div className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mb-1 flex items-center gap-1">
                                                    <LucideIcons.Calendar className="w-3 h-3" /> Next Review
                                                </div>
                                                <div className="text-xs text-slate-300 font-mono">
                                                    {selectedNode.state.next_review_on || 'Not Scheduled'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mb-1 flex items-center gap-1">
                                                    <LucideIcons.MessageSquare className="w-3 h-3" /> Remarks History
                                                </div>
                                                <div className="text-xs text-slate-300 font-mono">
                                                    {selectedNode.state.remarks?.length || 0} Entries
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mb-1 flex items-center gap-1">
                                                    <LucideIcons.History className="w-3 h-3" /> Last Taught
                                                </div>
                                                <div className="text-xs text-slate-300 font-mono">
                                                    {selectedNode.state.last_taught_on || 'Never'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mb-1 flex items-center gap-1">
                                                    <LucideIcons.Target className="w-3 h-3" /> Coverage Stage
                                                </div>
                                                <div className="text-xs text-emerald-400/80 font-mono uppercase">
                                                    {selectedNode.state.coverage_stage}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}


                            {/* Semantic Edge Relationships (Mentor & Builder Modes) */}
                            {viewMode !== 'student' && groupedEdges && (
                                <div className="mt-8 border-t border-white/10 pt-6 block">
                                    {groupedEdges && Object.entries(groupedEdges).map(([groupName, items]) => {
                                        if (items.length === 0) return null;
                                        
                                        // Builders see everything. Mentors hide "Embedded In" unless viewing W3? 
                                        // Actually let's just show all active semantic groups for Mentor.
                                        return (
                                            <div key={groupName} className="mb-6">
                                                <h3
                                                    style={{ color: getCategoryColor(selectedNode.taxonomy?.wing_code) }}
                                                    className="text-[10px] md:text-xs font-mono tracking-widest uppercase mb-3 opacity-80 flex items-center gap-2"
                                                >
                                                    {groupName} <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded-full">{items.length}</span>
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {items.map(({ node: targetNode, edge, isOutgoing }) => {
                                                        const catColor = getCategoryColor(targetNode.taxonomy?.wing_code);
                                                        return (
                                                            <div key={`${targetNode.id}-${edge.type}-${isOutgoing ? 'out' : 'in'}`} className="relative group/link">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleNodeClick(targetNode);
                                                                    }}
                                                                    style={{ borderColor: catColor }}
                                                                    className="bg-slate-950/40 hover:bg-slate-900/80 border px-3 py-1.5 rounded-md text-[10px] md:text-xs font-mono transition-all opacity-80 hover:opacity-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] text-left flex flex-col gap-1 items-start"
                                                                >
                                                                    <span style={{ color: catColor }} className="font-bold">{targetNode.display_title || targetNode.title}</span>
                                                                    {viewMode === 'builder' && (
                                                                        <span className="text-[8px] text-slate-500 uppercase">{isOutgoing ? 'OUT' : 'IN'} • {edge.type}</span>
                                                                    )}
                                                                </button>
                                                                
                                                                {/* Hover Context Preview */}
                                                                {edge.reason && (
                                                                    <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-slate-900 border border-slate-700 rounded shadow-xl opacity-0 group-hover/link:opacity-100 transition-opacity pointer-events-none z-50 text-[9px] text-slate-300 font-sans leading-relaxed">
                                                                        <span className="text-cyan-400 font-mono uppercase block mb-1">{edge.type.replace('_', ' ')}</span>
                                                                        {edge.reason}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                    ?.filter((n: any) => (n.display_title || n.title)?.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map((node: any) => (
                                        <button
                                            key={node.id}
                                            onClick={() => handleDirectorySelect(node)}
                                            className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-slate-800/50 transition-colors group text-left border border-transparent hover:border-cyan-500/20"
                                        >
                                            <span className="text-sm text-slate-300 group-hover:text-cyan-300 font-mono">
                                                {node.display_title || node.title}
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

            {/* Session Builder HUD (Bottom Drawer) */}
            <AnimatePresence>
                {sessionStack.length > 0 && (
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-[85px] left-2 right-2 md:left-6 md:right-6 md:bottom-[90px] rounded-2xl md:h-32 bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/30 z-[150] p-4 flex flex-col md:flex-row items-center gap-6 shadow-[0_0_50px_rgba(0,0,0,0.8),_inset_0_0_20px_rgba(0,240,255,0.05)] pointer-events-auto max-h-[200px]"
                    >
                        <div className="flex flex-col items-start gap-1 shrink-0 w-full md:w-[250px] border-b md:border-b-0 md:border-r border-slate-800 pb-3 md:pb-0">
                            <h3 className="text-xs text-cyan-400 font-mono uppercase tracking-widest flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]"><Layers className="w-4 h-4"/> Session Stack</h3>
                            <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">{sessionStack.length} Nodes Selected</p>
                            <button
                                onClick={() => {
                                    alert("Lesson Plan Exported! (Mock)");
                                    setSessionStack([]);
                                }}
                                className="mt-2 bg-slate-800 hover:bg-cyan-900 border border-slate-700 hover:border-cyan-500/50 text-cyan-100 text-[10px] uppercase font-mono px-3 py-1.5 rounded transition-all w-full md:w-auto text-left flex justify-between group"
                            >
                                Execute Session <CheckCircle2 className="w-3 h-3 ml-2 group-hover:text-emerald-400 transition-colors"/>
                            </button>
                        </div>
                        
                        <div className="flex-1 flex items-center gap-3 overflow-x-auto overflow-y-hidden w-full custom-scrollbar pb-2 md:pb-0 h-full scroll-smooth">
                            {sessionStack.map((node, i) => (
                                <div key={node.id} className="relative group shrink-0 flex items-center h-full">
                                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col items-start min-w-[140px] h-full justify-between">
                                        <div className="text-[9px] text-slate-500 mb-1 font-mono uppercase">
                                            {i === 0 ? 'Opener' : i === sessionStack.length - 1 ? 'Reflection' : 'Core'}
                                        </div>
                                        <div className="text-xs text-slate-300 font-bold max-w-[120px] truncate" style={{ color: getCategoryColor(node.taxonomy?.wing_code) }}>
                                            {node.display_title || node.title}
                                        </div>
                                    </div>
                                    {i < sessionStack.length - 1 && (
                                        <div className="mx-2 shrink-0 w-4 h-[1px] bg-slate-700"></div>
                                    )}
                                    <button 
                                        onClick={() => setSessionStack(prev => prev.filter(n => n.id !== node.id))}
                                        className="absolute -top-2 -right-2 bg-rose-500/20 text-rose-400 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur hover:bg-rose-500 hover:text-white"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
