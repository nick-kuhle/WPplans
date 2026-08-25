# WolfPit business plan

Confidential — seed / PE. August 2026. Illustrative figures, not a forecast.

## 1. Problem

Crypto already has:

- Perps (Hyperliquid and peers) — no expiry, funding as the product
- Permissioned dated options (Derive and CEX) — not Uniswap-like listing
- Perpetual options on LP (Panoptic) — no classic assignment/expiry
- Covered-call vaults — yield, not a pit

Nobody runs a **decentralized, inventory-backed pit for dated vanilla** that:

1. Lists when a pool is funded
2. Quotes size from that pool’s depth
3. Never sells unbounded gamma
4. Settles, expires, and delivers like a US futures/options market

Retail went to perps because expiry UX was bad. Institutions still need term structure. WolfPit is term structure with a Uniswap listing mechanic.

## 2. Product

**WolfPit** — dated ETH (then others) futures and options, minis first.

- Spot AMM (ETH-USDC, WPIT pairs)
- Mini futures: 0.1 ETH, weekly/monthly, variation, liquidation
- Mini options: European, cash-settled, covered/cash-secured on the house side
- LP + farms + WPIT stake (fee discount + first-loss)

**v1.0 is paper** on a Base-shaped engine. Live is a single ETH-USDC vault on **Base**, not Ethereum L1.

## 2b. Venue

Hyperliquid owns perps (HIP-3 included). We expire. Listing is Uniswap v4 + a dealer vault, which is an EVM/USDC problem. Base is the 2026 default for that. L1 gas is a hedge-error term we refuse. HL is hedge-rung 2 later. See [CHAIN.md](./CHAIN.md).

## 3. Why now (Aug 2026)

- Perps are systemically large and under a regulatory spotlight.
- IBIT/listed BTC options proved traditional expiry still attracts real size.
- DeFi options TVL remains tiny versus spot AMMs — not because demand is zero, because the pits were either naked, illiquid, or perpetual.
- Appchains make keeper-driven hedging honest enough if you do not pretend to be HFT on L1.

## 4. Market

TAM is global crypto derivatives (CEX + DeFi). SAM is on-chain dated BTC/ETH options + futures. SOM is ETH minis with inventory caps. We do not need Hyperliquid volume to be a company. We need **surviving Fridays** and a take-rate on term premium.

## 5. Competition

| Name | What they are | WolfPit difference |
| --- | --- | --- |
| Hyperliquid | Perp chain | We expire |
| Derive | Dated options AMM | We list off pools; futures + options; covered house |
| Panoptic | Perp options on Uni | We are vanilla with assignment |
| GMX / vAMM perps | Leveraged AMM | Linear perps, not term |
| Uniswap / Sushi | Spot + farms | We add a pit, not another fork |

## 6. Economics

- Spot 5–30 bps
- Derivatives 0.5–3 bps + quoted spread (vault)
- Liquidation penalty → insurance
- WPIT: fees, stake, backstop. Not the business.

House P&L should look like a dealer: spread + vol sold that was covered, minus hedge error. If house P&L looks like a long-ETH fund, the risk engine is broken.

## 7. Go-to-market

1. Desk for quants and pit traders (this UI)
2. Testnet farms with pointless-but-fun WPIT-TEST
3. Market-maker program with **inventory**, not just maker rebates
4. One underlying until a witching Friday is boring
5. Then BTC, then the long tail of Uni pools with vicious size limits

## 8. Raise

**Seed $4–8M, 18 months.** Use: 55% protocol + audits, 20% quant/infra, 15% GTM, 10% legal/runway.

**PE later** buys: take-rate, loss history, regulatory map, LP Sharpe. They do not buy airdrop theater.

## 9. Risks

Insolvency, oracle/expiry MEV, hedge-venue failure, CFTC, copycats, expiry UX losing to perps. Mitigations are in PROTOCOL.md. The product is the mitigations.

## 10. Ask

Partner on a clearinghouse, not a casino. The sim is the term sheet’s exhibit A.
