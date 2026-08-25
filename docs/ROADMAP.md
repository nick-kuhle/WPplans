# Roadmap

## P0 — shipped

Paper desk. Spot, minis, TEST pool names, farms, stake, `/plan`.

## P1 — v1.0 sim (this pass)

- Chain decision: **Base**
- Quant: LP / farm / MM / risk docs
- Sim: RV→IV, put skew, util-weighted farm, insurance, Δ/Γ panel, IM 25/12.5, α=0.40
- Still paper. Same UI.

## P2 — 0–8 weeks (contracts)

- Foundry, Base Sepolia
- Uni v4 hook spec + dealer vault + ERC-1155
- `DeskEngine` viem adapter
- Tick-log export; fit spreads vs notebook

## P3 — 8–16 weeks

- Unfunded TEST on Base (not ETH L1)
- Two audits, bounty, 20% gap drill
- Geo-fence

## P4 — live vault

- One ETH/USDC vault, tiny caps, 4× max
- Insurance floor before emissions
- Covered options + inventory futures only

## P5

- Hyperliquid ETH perp as hedge rung 2
- MegaETH/Monad only if quotes must go sub-100ms
- More underlyings after a boring Friday
