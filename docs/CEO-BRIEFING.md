# CEO briefing — Nick

**WolfPit** is a dated derivatives pit: mini futures and mini options with expiry, inventory-backed dealing, Uniswap-style pools, WPIT for fees/stake/insurance.

August 2026: perps are crowded (Hyperliquid). Dated vanilla that lists off a pool and never goes naked is not.

## Chain (decision)

**Base.** Not Ethereum mainnet. L1 gas turns hedging into a loss function we cannot win. Hyperliquid is the best perp venue in 2026 — we may *hedge* there later. We do not *list* there in v1 (HIP-3 is perps; we expire). Full argument: [CHAIN.md](./CHAIN.md).

## What you can show

Paper desk: spot, minis, vault caps, RV/IV, insurance, util-weighted farm. $100,000 paper USDC. Clock 1×/10×/60×.

It is not a money vault.

## Quant (read these)

| Doc | One line |
| --- | --- |
| [LP.md](./LP.md) | Spot pools ≠ dealer vault. α=0.40. Cover never concentrated. |
| [FARM.md](./FARM.md) | Pay quoting capital. Vault 70%. ETH-USDC unfarmed. |
| [MM.md](./MM.md) | Dealer quotes. IV=1.08×RV. Put skew. No quote without hedge. |
| [RISK.md](./RISK.md) | Hard rejects. 4× IM. Insurance. Five drills before live. |

## Sequence

1. Entity + CFTC counsel  
2. This GitHub  
3. CTO + Head of Quant  
4. Seed on the sim + these specs  
5. Base Sepolia  
6. Audits + gap drills  
7. Tiny Base vault  
8. Flip SIM → LIVE on the same desk  

9. Week 1 **closed**. Q1 workload: [Q1.md](./Q1.md). Log: [BUILD-NOTES.md](./BUILD-NOTES.md).

You do not override α.
