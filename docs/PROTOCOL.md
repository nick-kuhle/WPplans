# Protocol spec (v0 / v1)

## Inventory

Let `L` = trader net long futures (ETH). `S` = trader net short futures (ETH).
`C` = sum of short-call size the vault wrote. `P` = sum of strike×size of short puts.

```
reservedEth  >= L + C
reservedUsdc >= S * spot + P
reservedEth  <= utilCap * vault.eth        # 0.45 in v0
```

If a fill would break this, **reject**. Do not queue. Do not “hedge later.”

## Futures

- Mini = 0.1 ETH
- IM 20%, MM 10% (v0). Production starts 30–50% IM.
- Mark every oracle/tick. Liquidate if equity < MM or at expiry.
- Open long: lock ETH (vault is short). Open short: sell ETH / lock USDC (vault is long).
- Close: unwind the hedge. PnL = ±(mark−entry)×size, paid from hedge MTM.

Mismatched entries on a flat book: crystallize spot (sell high / buy low) and pay the winner from that cash. Never from unhedged LP USDC.

## Options

- User **buys** from the vault in v0. Selling to the vault is v1 with trader margin.
- Calls: lock ETH (covered). Puts: lock strike×size USDC (cash-secured).
- European, cash-settled on a 30–60 min TWAP in production (last tick in sim).
- Premium = Black-Scholes(S,K,T,r,IV) + inventory spread.

## Spot

Constant product. Fee 30 bps. WPIT pairs are TEST names until LIVE addresses are injected.

## What v0 explicitly is not

HFT. Naked short gamma. Cross-margin portfolio magic. Physical delivery. American exercise. 0-DTE.

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

Zustand sim implements this today (`src/lib/wolfpit/engine.ts`). Chain adapter must preserve reject rules.
