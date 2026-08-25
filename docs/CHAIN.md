# Chain decision — August 2026

**v1 home: Base.** Not Ethereum L1. Hyperliquid is the *later hedge rung*, not the listing venue.

v1 stays simulated. The adapter target is Base Sepolia → Base. Addresses are env. The desk does not care.

## Why Ethereum L1 is the wrong pit

A dealer that hedges 1:1 must rebalance **on the fill**, on the dump, and on witching. L1 gas in 2026 still prints in dollars, not fractions of a cent. One Friday of missed hedges is insolvency, not an optimization problem.

| Move | Needs | L1 | Base |
| --- | --- | --- | --- |
| Spot hedge of 1 mini | swap + settle | dollars | sub-cent |
| Liquidation | oracle + close + inventory | often too late | keeper-viable |
| Expire 40 option series | TWAP + payout | griefable | boring |

MM edge is spread minus hedge error. Gas is hedge error. L1 is disqualified.

## Why Base

1. **Uniswap v4 is live** (mainnet Jan 2025; Base thereafter). Hooks are how we list a pit off a pool without forking an AMM. That *is* the product mechanic.
2. **Canonical Circle USDC.** Collateral is the vault. Do not wrap a second-rate dollar.
3. **OP-stack, 2026 default EVM DeFi home.** Aerodrome / Merkl already teach LPs the farm UX we will copy, not invent.
4. **Distribution.** Base ~$5.5B TVL, ~277k DeFi addresses vs Hyperliquid L1 ~$1.6B / ~26k (DefiLlama, Aug 2026). We need Uni LPs, not only perp degens.
5. **EVM.** This repo, this team, Foundry, viem. Solana is a different company.

## Why not Hyperliquid as home

Hyperliquid is the best on-chain *perp* venue in 2026 (~$432B / 30d at one point, ~70% of on-chain perps, 0 gas on orders, HIP-3 builder perps). HIP-3 is **perps**. It is not dated vanilla, not Uniswap LP listing, not covered-call inventory, not ERC-1155 options with Friday expiry.

Use it later as **hedge rung 2**: when the vault’s spot ETH is not enough delta, buy/sell HL ETH perp to flatten. Never as the place WPIT LPs live in v1.

HIP-3 “dated by recycling assets” is a listing trick for perps. We expire and deliver. Different object.

## Why not Solana / MegaETH / Monad for v1

| Venue | Latency | Why not v1 home |
| --- | --- | --- |
| Solana | ~400ms slots | No Uni v4. Drift/Jupiter are perp/CLOB shops. Wrong VM. |
| MegaETH | 1–10ms L2 (claimed) | Real-time is a v2 quoting problem. Uni+USDC rails are thinner. Watch list. |
| Monad | ~1s | Parallel EVM is interesting. Liquidity and USDC are not our pit yet. |
| Arbitrum | fine EVM | Base wins on Uni+USDC+consumer distribution in 2026. Revisit if that flips. |

## Topology (v1 → v2)

```
v1  Base
    ├─ Uni v4 ETH/USDC     spot hedge + listing
    ├─ Vault (dealer)      covered options + inventory futures
    ├─ WPIT / USDC         token
    └─ Keepers             liq, expiry, inventory band

v2  + Hyperliquid ETH perp adapter   (optional delta when spot util high)
v3  + own dated futures as the hedge  (stop paying HL)
```

## Hard rule

Do not deploy a funded vault on Ethereum L1. Unfunded TEST ERC-20s on Base are allowed after audits. Simulated funds in this app are the only “mainnet” until then.
