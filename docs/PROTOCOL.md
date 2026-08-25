# Protocol spec (v1.0 sim)

Home chain target: **Base**. See [CHAIN.md](./CHAIN.md). Economics: [LP.md](./LP.md), [FARM.md](./FARM.md), [MM.md](./MM.md), [RISK.md](./RISK.md).

## Inventory

Let `L` = trader net long futures (ETH). `S_n` = trader net short futures (ETH).
`C` = vault short-call size. `P$` = Σ strike × short-put size.

```
reservedETH  = L + C
reservedUSDC = S_n * S + P$
reservedETH  ≤ 0.40 * vault.ETH
reservedUSDC ≤ 0.40 * vault.USDC
```

If a fill would break this, **reject**. Do not queue. Do not “hedge later.”

## Futures

- Mini = 0.1 ETH
- IM 25%, MM 12.5% (4×). Isolated.
- Mark every tick. Liquidate if equity < MM or at expiry (settle).
- Open long: lock ETH (vault is short). Open short: sell ETH / lock USDC (vault is long).
- Close: unwind the hedge. PnL = ±(mark−entry)×size, paid from hedge MTM.
- Liq penalty 1% of notional (capped at remaining equity) → insurance.

Mismatched entries on a flat book: crystallize spot (sell high / buy low) and pay the winner from that cash. Never from unhedged LP USDC.

## Options

- User **buys** from the vault. Selling to the vault is v1.1 with trader margin.
- Calls: lock ETH (covered). Puts: lock strike×size USDC (cash-secured).
- European, cash-settled (sim: last tick; live: 30–60 min TWAP 20:00 UTC).
- Mid = BS(S,K,T,r=0.03, IV(K)). IV_atm = 1.08×EWMA RV. Skew: OTM puts richer.
- Spread from util + |Δ| + vol. If vega/gamma cap binds, no quote.

## Spot

Constant product in sim, 5–30 bps vol-dynamic (start 30). Live: Uniswap v4 on Base, WolfPit hook, cover never concentrated.

## Farm / stake

Util-weighted gauges. Vault 70 / WPIT-USDC 20 / WPIT-ETH 10. ETH-USDC spot unfarmed. Staked WPIT = insurance junior. See [FARM.md](./FARM.md).

## Adapter

```ts
interface DeskEngine {
  quote(symbol: string): Quote;
  spotSwap(pool: PoolId, side: "buy" | "sell", amt: number): Fill;
  openFuture(side: "long" | "short", minis: number, expiry: number): Fill;
  closeFuture(id: string): Fill;
  buyOption(type: "call" | "put", strike: number, expiry: number, minis: number): Fill;
  addLiquidity(pool: PoolId, amt: number): void;
}
```

Zustand sim implements this (`src/lib/wolfpit/engine.ts`). Chain adapter (viem, Base) must preserve reject rules. No silent weakening.

## Explicitly not v1

HFT. Naked short gamma. Cross-margin. Physical delivery. American. 0-DTE. Ethereum L1. Hyperliquid as home. User-sold options.
