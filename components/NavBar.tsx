"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, MoreHorizontal, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { id: "home", label: "HOME", icon: Home, href: "/" },
    { id: "about", label: "ABOUT", icon: User, href: "#" },
    { id: "more", label: "MORE", icon: MoreHorizontal, href: "#" },
];

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] w-[90%] md:w-[75%] max-w-4xl pointer-events-auto">
            <div className="flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3 rounded-2xl bg-slate-950/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
                {/* Logo / Brand */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-slate-900/80 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] group-hover:border-cyan-400/50 transition-all duration-300">
                        <Compass className="w-4 h-4 md:w-[18px] md:h-[18px] text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" strokeWidth={1.5} />
                    </div>
                    <span className="hidden md:block text-[10px] font-mono tracking-[0.3em] text-slate-300 font-medium">CURIOSITY</span>
                </Link>

                {/* Nav Items */}
                <div className="flex items-center gap-1.5 md:gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border transition-all duration-300",
                                    isActive
                                        ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                                        : "bg-transparent border-white/[0.06] text-slate-500 hover:text-cyan-300 hover:bg-slate-800/50 hover:border-cyan-500/20 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                                )}
                            >
                                <item.icon className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={1.5} />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
