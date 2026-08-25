import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { WolfMark } from "@/components/mark";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/trade", label: "Desk" },
  { to: "/pools", label: "Pools" },
  { to: "/stake", label: "Stake" },
  { to: "/plan", label: "Plan" },
];

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-3 sm:px-4">
        <Link to="/" className="flex items-center gap-2 text-fg">
          <WolfMark className="size-6 text-accent" />
          <span className="font-medium tracking-[0.18em]">WOLFPIT</span>
        </Link>
        <span className="hidden rounded-[var(--radius-xs)] border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-warn sm:inline">
          Sim · Base
        </span>
        <nav className="ml-auto flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "flex h-11 items-center px-3 text-sm text-muted hover:text-fg",
                pathname === n.to && "text-fg",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
