# Build notes

Append-only. **Newest at top.** Do not rewrite history. Daily standup is three bullets. Specs win arguments.

Ritual: [WEEK1.md](./WEEK1.md) W1-10.

---

## 2026-08-25 (Tue) — Week 1 kickoff

- Done:
  - Specs read and locked: CHAIN, LP, FARM, MM, RISK, PROTOCOL.
  - Week 1 work order written (`docs/WEEK1.md`).
  - Prior: paper desk, Base (not L1), RV→IV, put skew, insurance $25k seed, Δ/Γ rail, 4× IM, α=40%, util-weighted farm, GitHub `nick-kuhle/WPplans` @ `d9c683f`.
- Blocked:
  - Seats P/Q/U/L may still be empty. Tickets stay assigned to the **role**. Nick parks or covers.
  - PAT for GitHub: revoke after this push if still live.
- Tape:
  - α = 0.40 signed in spec. Not in production.
  - Sim only. `wolfpit-sim-v3`.
  - RISK limits still **missing** in engine: Γ cash cap, vega cap, OI/expiry, OI/strike, 10% fill band, 5m circuit, +0.5 vol-pt inventory, insurance/NAV halt. That is W1-02.
  - Five drills not recorded. That is W1-03.
  - No Foundry tree. That is W1-05.
- Nick:
  - Initials: _pending_ (read WEEK1, reply in this log).

### Already shipped (same day, before this order)

| Item | Where |
| --- | --- |
| Paper desk (spot, mini fut, mini opt) | `/trade` |
| TEST pool names | ETH-USDC, WPIT-USDC-TEST, WPIT-ETH-TEST |
| Covered / cash-secured only | `engine.ts` |
| Hedge 1:1, reject if no inventory | `engine.ts` |
| Chain decision Base | `docs/CHAIN.md` |
| LP / farm / MM / risk specs | `docs/LP.md` `FARM.md` `MM.md` `RISK.md` |
| Header `Sim · Base` | `shell.tsx` |

### Do not do tomorrow

Deploy anything. Uni v4. Hyperliquid. Raise α.

---

## Template (copy for each day)

```
## YYYY-MM-DD (Day)

- Done:
  -
- Blocked:
  -
- Tape (α, util, drills, forge):
  -
```
