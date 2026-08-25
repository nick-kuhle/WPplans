# Farming + staking — v1.0 (simulated)

Not a 2020 sushi vampire. Pay for **quoting capital**, not idle TVL.

## What earns WPIT

| Gauge | Weight | Why |
| --- | --- | --- |
| Dealer vault shares | 70% | This is the pit |
| WPIT/USDC-TEST | 20% | Token exit |
| WPIT/ETH-TEST | 10% | Thin, needed |
| ETH/USDC spot | 0% | Already paid in swap fees. Do not bribe directional ETH. |

## Emission (v1 sim)

```
E_epoch = 50_000 WPIT / week          # sim. Live: 4-year decay, no infinity
util    = reservedETH / vault.ETH
s_i     = min(TVL_i, cap_i) * (0.30 + 0.70 * util_i)
reward_i = E * w_i * s_i / Σ w_j s_j
```

Idle vault (util → 0) still gets a floor 30% so LPs are not punished for a quiet tape, but they are not paid as if they were the house at 40% util.

10% of gross emissions → insurance fund (USDC bought from WPIT/USDC, sim: credit USDC).  
Harvest: claim accrued. 1% harvest tax → insurance.

## veWPIT (light)

Lock WPIT 1w–52w. Boost vault-gauge only, **max 2.5×**.

```
boost = 1 + 1.5 * (lock_weeks / 52) * (ve_i / ve_total_cap)
boost ≤ 2.5
```

No Curve wars in v1. No vote on IV. veWPIT votes **gauge weights inside the table above**, not new underlyings, not util caps.

## Staking (insurance)

Staked WPIT is **first-loss junior** to the insurance fund, not a savings account.

- Sim APR 12% is a placeholder funded by emissions, not by selling naked vol.
- Slash order on vault hole: insurance USDC → staked WPIT (haircut pro-rata) → pause → LP NAV.
- Unlock: 7-day cool in production. Instant in sim so Nick can click.

## What we will not farm

- 10,000% APR on a TEST token
- Emissions to perpetual-style funding
- Paying people to loop vault shares through a second farm

Build: sim already emits to `farmWpit` (now util-weighted). Production: Merkl or a 20-line gauge on Base. Prefer boring.
