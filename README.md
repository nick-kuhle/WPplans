# WolfPit

Dated crypto futures and options. Inventory-backed. Never naked.

This repository ships:

1. A thinkorswim-style **paper desk** (spot, mini futures, mini options).
2. Simulated **WOLFPIT-USDC-TEST** and **WOLFPIT-ETH-TEST** pools, farms, staking.
3. Operating docs for Nick (CEO), hiring, PE, protocol, and deployment.

**This build is simulation.** It does not move real funds. Live contracts are a later adapter behind the same UI.

## Run

```bash
npm run dev
```

## Product surfaces

| Route | What |
| --- | --- |
| `/` | Venue |
| `/trade` | Desk |
| `/pools` | LP + farms |
| `/stake` | WPIT stake |
| `/plan` | CEO briefing, team, roadmap, business, protocol, legal |

## Docs (GitHub)

- [docs/README.md](docs/README.md) — index
- [docs/CEO-BRIEFING.md](docs/CEO-BRIEFING.md)
- [docs/TEAM.md](docs/TEAM.md)
- [docs/BUSINESS-PLAN.md](docs/BUSINESS-PLAN.md)
- [docs/ROADMAP.md](docs/ROADMAP.md)
- [docs/PROTOCOL.md](docs/PROTOCOL.md)
- [docs/FRONTEND.md](docs/FRONTEND.md)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Hard rules

- Net longs hedged with ETH. Net shorts hedged with USDC.
- Vault never sells a naked call or put.
- House hedges are 1:1. Traders may use margin.
- If the hedge cannot complete, the order does not exist.
