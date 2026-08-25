# Market-making architecture — v1.0 (simulated)

The house is a **dealer**, not a vAMM and not an HFT shop on L1. Quotes exist only if the hedge exists.

## Objects

| Book | Mid | What you sell |
| --- | --- | --- |
| Spot | pool price | 5–30 bps, vol-dynamic |
| Mini futures | `F = S e^{(r−q)T}` ≈ `S` (q≈0 in v1) | inventory spread |
| Mini options | Black-Scholes, r=0.03 | IV + skew + inventory |

Contract: mini = 0.1 ETH. Expiries: Friday week-1, week-2, month-end. European cash-settle. User **buys** options in v1; vault writes only covered/cash-secured. User futures both ways, vault 1:1.

## Spot

Constant product in sim. Production: Uni v4.

```
fee_bps = 5 + 80 * max(0, RV − 0.40)     # clamp 5–30
```

## Futures quote

```
s_bps = 8
      + 80 * util
      + 40 * (IV − 0.40)
      + 25 * |Δ_book| / vault.ETH
ask = F * (1 + s_bps / 1e4)
bid = F * (1 − s_bps / 1e4)
size_bid = maxNetShortETH     # vault would go long
size_ask = maxNetLongETH      # vault would go short
```

If `size_* = 0`, that side is blank. Not a 9-figure quote with a 2-tick width.

Reservation (Avellaneda–Stoikov, discrete):

```
r = F − q * γ * σ² * τ
spread ≥ γ * σ² * τ + (2/γ) ln(1 + γ/k)
q  = inventory in ETH (signed, vault)
γ  = 0.1 / vault.ETH     # risk aversion; smaller vault → wider
τ  = 2 minutes           # quote horizon, Base block reality
σ  = RV (annual)
```

v1 sim uses the `s_bps` stack (same spirit, fewer knobs). Do not add a neural net.

## Options quote

ATM IV:

```
RV_t = EWMA(λ=0.94 of |log return| * sqrt(365.25*24*60))   # 1m bars in sim
IV_atm = clamp(1.08 * RV, 0.28, 1.60)                      # 8% vol premium
```

Smile (sticky-delta, 3-point, v1):

```
z     = ln(K/S) / sqrt(max(T, 1/365))
IV(K) = IV_atm * (1 − 0.18 * z)          # OTM puts richer (crypto)
IV(K) = clamp(IV(K), 0.20, 2.00)
```

Skew sign: `z < 0` (K < S) → higher IV. Do not “learn” a 12-parameter SVI in v1. Fit SVI in a notebook; promote only if out-of-sample week beats this.

Premium:

```
mid = BS(S, K, T, r=0.03, IV(K))
ask = mid * (1 + s_bps/1e4) + 0.40 USDC
bid = max(0.05, mid * (1 − s_bps/1e4) − 0.40)
```

Inventory: if vault is already short calls, add `+0.5 vol-pt` to call IV. If short puts, same on puts. If that would exceed vega cap, **do not quote**.

## Hedge (rung 1 only in v1)

On every fill that changes Δ:

```
Δ = −L + S_n − Σ Δ_call * C + −Σ Δ_put * P
# with reserved spot, target Δ ≈ 0
if |Δ_unhedged| > band: trade spot until |Δ| ≤ band/2
band = max(0.05 * vault.ETH, 0.02 * NAV / S)
if estimated slippage > 0.5 * spread_captured: do not quote that size
```

Hedge error (discrete, the only honesty that matters):

```
HE ≈ 0.5 * Γ * (ΔS)²  +  Δ * slip
```

Insurance must cover the 99th percentile 1-hour HE at current Γ under 80% ETH vol. If it does not, cut Γ (stop writing ATM).

## What this is not

HFT colocated on MegaETH. A vAMM that prints against LPs. A perp with hidden funding. American 0-DTE.

Build: `src/lib/wolfpit/engine.ts` already rejects naked, sizes to inventory, and spreads on util. v1.0 sim adds RV→IV, skew, Δ/Γ panel, insurance.
