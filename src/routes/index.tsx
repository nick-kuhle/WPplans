import { createFileRoute, Link } from "@tanstack/react-router";
import { WolfMark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { useWolf } from "@/lib/wolfpit/store";
import { fmtPx } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const eth = useWolf((s) => s.eth);
  const wpit = useWolf((s) => s.wpit);
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="flex h-12 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <WolfMark className="size-7 text-accent" />
          <span className="text-sm font-medium tracking-[0.22em]">WOLFPIT</span>
        </div>
        <nav className="flex items-center gap-1 text-sm">
          <Link to="/trade" className="flex h-11 items-center px-3 text-muted hover:text-fg">
            Desk
          </Link>
          <Link to="/plan" className="flex h-11 items-center px-3 text-muted hover:text-fg">
            Plan
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
          Simulation · dated markets · never naked
        </p>
        <h1 className="max-w-xl text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          The pit for dated crypto futures and options.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          Not perps. Weekly and monthly vanilla, inventory-backed, quoted off pool depth. This build is paper
          trading against WOLFPIT-USDC-TEST and WOLFPIT-ETH-TEST. Same desk later points at live contracts.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/trade">
            <Button>Open the desk</Button>
          </Link>
          <Link to="/plan">
            <Button variant="outline">Operating plan</Button>
          </Link>
        </div>
        <figure className="mt-14 max-w-2xl border border-border bg-panel">
          <img
            src="/brand/lockup-dark.jpg"
            alt="WolfPit lockup — octagon pit and wordmark"
            className="w-full"
            width={1792}
            height={1008}
          />
          <figcaption className="border-t border-border px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-subtle">
            Mark · octagon pit · bone on black
          </figcaption>
        </figure>
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-4">
          <Stat k="ETH mark" v={fmtPx(eth)} />
          <Stat k="WPIT" v={fmtPx(wpit)} />
          <Stat k="Mode" v="SIM" />
          <Stat k="Mini" v="0.1 ETH" />
        </dl>
        <section className="mt-16 grid gap-8 sm:grid-cols-3">
          <Note title="Spot" body="Constant-product pools, 30 bps. ETH-USDC plus the two WPIT test pairs." />
          <Note
            title="Mini futures"
            body="Expiry, variation, 5× IM. Vault hedges 1:1. Size dies when inventory is used up."
          />
          <Note
            title="Mini options"
            body="You buy. Vault sells covered calls and cash-secured puts only. European, cash-settled."
          />
        </section>
      </main>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-surface px-4 py-4">
      <dt className="text-[10px] uppercase tracking-wider text-subtle">{k}</dt>
      <dd className="mt-1 font-mono text-lg tabular-nums">{v}</dd>
    </div>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
