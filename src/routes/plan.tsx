import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Shell } from "@/components/shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plan")({ component: PlanPage });

const TABS = ["Briefing", "Team", "Roadmap", "Business", "Protocol", "Legal"] as const;
type Tab = (typeof TABS)[number];

function PlanPage() {
  const [tab, setTab] = useState<Tab>("Briefing");
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Internal · Nick, CEO</p>
        <h1 className="mt-2 text-2xl font-medium">WolfPit operating plan</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Simulation desk is live. Real funds stay gated until inventory, audits, and counsel clear. Full
          markdown copies live in the repo under docs/ for GitHub.
        </p>
        <div className="mt-6 flex flex-wrap gap-1 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "h-11 px-3 text-sm",
                tab === t ? "border-b border-accent text-fg" : "text-muted",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <article className="prose-wp mt-8 space-y-4 text-sm leading-relaxed text-muted">
          {tab === "Briefing" && <Briefing />}
          {tab === "Team" && <Team />}
          {tab === "Roadmap" && <Roadmap />}
          {tab === "Business" && <Business />}
          {tab === "Protocol" && <Protocol />}
          {tab === "Legal" && <Legal />}
        </article>
      </main>
    </Shell>
  );
}

function H({ children }: { children: ReactNode }) {
  return <h2 className="pt-2 text-base font-medium text-fg">{children}</h2>;
}

function Briefing() {
  return (
    <>
      <p className="text-fg">
        Nick — WolfPit is a dated derivatives pit on crypto: mini futures and mini options with expiry,
        inventory-backed market making, and Uniswap-style pools. This app is the paper desk. It is not a
        mainnet money vault.
      </p>
      <H>What is live now</H>
      <ul className="list-disc space-y-1 pl-5">
        <li>Thinkorswim-style desk: chart, ticket, chain, blotter, vault inventory.</li>
        <li>Spot on ETH-USDC, WOLFPIT-USDC-TEST, WOLFPIT-ETH-TEST.</li>
        <li>Mini futures (0.1 ETH, 5× IM, Friday/month expiry). Hedge 1:1. Size = free inventory × 45%.</li>
        <li>Mini options: you buy; vault sells covered calls / cash-secured puts only. European cash settle.</li>
        <li>LP + WPIT farm + staking at 12% simulated APR.</li>
        <li>Paper account $100,000 USDC. Clock 1× / 10× / 60× to watch expiry.</li>
      </ul>
      <H>What we will not do this week</H>
      <p>
        We will not deploy spendable mainnet contracts until a deployer key, ETH for gas, two independent
        audits, and a CFTC/ counsel memo exist. Test-named tokens on Ethereum mainnet still cost real gas
        and are irreversible. The desk already talks to named test pools; swapping the adapter is a later
        PR, not a product rewrite.
      </p>
      <H>Your next 10 moves</H>
      <ol className="list-decimal space-y-1 pl-5">
        <li>Form the entity (Delaware C-corp or equivalent) and a Cayman/BVI protocol foundation split.</li>
        <li>Retain derivatives counsel (CFTC + securities). Do not tweet “yield” until they bless copy.</li>
        <li>Open a GitHub org. This workspace’s docs/ is the first commit.</li>
        <li>Hire CTO and Head of Quant before anyone else. Spec is in Team.</li>
        <li>Raise a small seed against this sim + the business plan — not against TVL promises.</li>
        <li>Stand up Foundry repo, testnet deploy, then (optional) unfunded TEST ERC-20s on a cheap L2.</li>
        <li>Quant: calibrate IV, inventory bands, liquidation keepers on this desk’s tick log.</li>
        <li>Frontend: keep this layout; replace the zustand engine with a chain adapter behind one interface.</li>
        <li>Audit, bug bounty, then a single ETH-USDC vault with tiny caps.</li>
        <li>Only then flip the desk from SIM to LIVE. Same screens.</li>
      </ol>
    </>
  );
}

function Team() {
  return (
    <>
      <p>Start with five people. Scale after testnet volume is real.</p>
      <H>Core (hire now)</H>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <span className="text-fg">CEO — Nick.</span> Capital, counsel, BD, does not write risk params.
        </li>
        <li>
          <span className="text-fg">CTO / protocol.</span> Solidity + appchain decision, adapter layer, never
          lets governance vote IV.
        </li>
        <li>
          <span className="text-fg">Head of quant / MM.</span> Inventory engine, BS/SABR, liquidation math,
          owns the util cap. This person is the product.
        </li>
        <li>
          <span className="text-fg">Trading UI lead.</span> This desk. Latency, order ticket, chain, mobile.
        </li>
        <li>
          <span className="text-fg">GC / CFTC specialist (fractional OK).</span> Product gating, geo, token.
        </li>
      </ul>
      <H>Next wave</H>
      <ul className="list-disc space-y-1 pl-5">
        <li>Two protocol engineers (keepers, oracles, vaults).</li>
        <li>Security engineer + audit liaison.</li>
        <li>Indexer / subgraph.</li>
        <li>Designer who has shipped a trading UI.</li>
        <li>DevRel. Community after there is a testnet to farm, not before.</li>
      </ul>
      <H>Duties that must not blur</H>
      <p>
        Quant sets bands. CTO implements bands. CEO does not override a utilization cap in a bull tape.
        Legal can halt a listing. Nobody can list a naked call.
      </p>
    </>
  );
}

function Roadmap() {
  return (
    <>
      <H>P0 — now (this desk)</H>
      <p>Paper spot, mini futures, mini options, LP, stake. Inventory engine visible. Clock acceleration.</p>
      <H>P1 — 0–8 weeks</H>
      <ul className="list-disc space-y-1 pl-5">
        <li>Foundry: ERC-20 TEST tokens, v2-style pools, vault, ERC-1155 positions, expiry keeper.</li>
        <li>Sepolia / Base Sepolia. Same symbols: WOLFPIT-USDC-TEST, WOLFPIT-ETH-TEST.</li>
        <li>Adapter: DeskEngine interface. Zustand sim implements it; viem implements it next.</li>
        <li>Quant notebook: tick tape from this app, calibrate spreads.</li>
      </ul>
      <H>P2 — 8–16 weeks</H>
      <ul className="list-disc space-y-1 pl-5">
        <li>Optional unfunded TEST deploy on Base mainnet (cheap gas, still real chain).</li>
        <li>Two audits. Bug bounty. Load test liquidations.</li>
        <li>Geo-fence. ToS. No US leverage until counsel says so.</li>
      </ul>
      <H>P3 — live vault</H>
      <ul className="list-disc space-y-1 pl-5">
        <li>One pool: ETH-USDC. Caps in the hundreds of thousands, not millions.</li>
        <li>Covered options + inventory futures only. 2–3× user leverage.</li>
        <li>WPIT emissions only after insurance fund has a floor.</li>
      </ul>
      <H>P4 — scale</H>
      <p>
        Appchain or Hyperliquid-class blocktime if quoting needs to tighten. Own dated futures as the hedge
        rung. More underlyings only when ETH vault survives a witching Friday.
      </p>
    </>
  );
}

function Business() {
  return (
    <>
      <H>Wedge</H>
      <p>
        Hyperliquid owns perps. Derive owns listed options with a permissioned underlying set. Panoptic owns
        perpetual options on Uni LPs. WolfPit owns dated vanilla that lists when a pool is funded, never
        naked, CME-style expiry. That hole is still empty as of August 2026.
      </p>
      <H>Model</H>
      <ul className="list-disc space-y-1 pl-5">
        <li>Spot 5–30 bps. Derivatives 0.5–3 bps + spread the vault keeps.</li>
        <li>Liquidation penalty → insurance fund.</li>
        <li>WPIT: fee discount, stake as first-loss, governance over circuit breakers only.</li>
        <li>No sub-5-second funding casino. Term structure is the product.</li>
      </ul>
      <H>Seed ask (illustrative)</H>
      <p>
        $4–8M. 18 months. 55% protocol + audit, 20% quant/infra, 15% go-to-market, 10% legal/runway. Raise on
        the sim, the spec, and the team — not on a TVL multiple.
      </p>
      <H>PE / later capital</H>
      <p>
        Private equity cares about take-rate, risk of ruin, and regulation. Show: (1) zero insolvency in sim
        stress, (2) audit letters, (3) a venue theory the CFTC can classify, (4) LP P&L that is vol
        harvesting not directional. Do not sell a token narrative as the business.
      </p>
    </>
  );
}

function Protocol() {
  return (
    <>
      <H>Hard rules (encoded in this desk)</H>
      <ul className="list-disc space-y-1 pl-5">
        <li>Net trader-long futures ≤ free ETH × utilization cap (45%).</li>
        <li>Net trader-short futures ≤ free USDC / spot × cap.</li>
        <li>Every call the vault sells locks ETH. Every put locks strike × size USDC.</li>
        <li>Hedges are 1:1. The house is not levered. Traders may be (v1: 5× IM).</li>
        <li>Mismatched entries on a flat book are paid from crystallized spot hedge P&L, never printed.</li>
        <li>If the hedge cannot complete, the order does not exist.</li>
      </ul>
      <H>Adapter target</H>
      <p className="font-mono text-xs text-fg">
        DeskEngine {"{"} quote, spotSwap, openFuture, closeFuture, buyOption, settle, addLiquidity {"}"}
      </p>
      <p>
        Today: in-memory GBM + AMM. Next: viem on TEST. Then: same methods, LIVE addresses. Frontend never
        imports a vault address except through env.
      </p>
    </>
  );
}

function Legal() {
  return (
    <>
      <p>
        Dated ETH futures and options are CFTC-territory products in the US. This simulation is not an offer
        of those products. Do not take US leveraged flow until counsel structures the venue (offshore
        protocol + geo-blocked UI, or a registered DCM/SEF path).
      </p>
      <p>
        WPIT is not registered. Do not market it as an investment contract. Utility: fees, stake, backstop.
        Emissions after legal memo.
      </p>
      <p>
        Mainnet TEST tokens: still public, still immutable, still a phishing surface. Prefer L2 testnet until
        the adapter is proven. If you deploy TEST on a production chain, publish addresses, disclaimers, and
        a kill-switch that only pauses listings — not a silent mint.
      </p>
    </>
  );
}
