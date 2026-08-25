# Frontend

Stack: TanStack Start, React 19, Tailwind v4, Zustand persist, canvas chart, resizable panels.

## Layout (desk)

Thinkorswim-inspired, not a copy:

- Top: net liq, open P&L, cash, clock speed, reset
- Left: markets + vault inventory
- Center: ETH candles
- Right: ticket (spot / mini fut / mini opt)
- Bottom: positions + option chain

Mobile: chart | ticket | book tabs. Targets 44px.

## SIM → LIVE

Do not fork the UI. Swap the engine:

1. Keep `useWolf` as a facade or replace with React Query against the adapter
2. Addresses from env (`VITE_VAULT`, `VITE_POOL_ETH_USDC`, …)
3. Banner: `Sim · Base` → `Base Sepolia` → `Base live` (never silent)

## Rules for the desk team

- Tabular nums on every live price
- Reject reasons shown on the ticket (inventory cap, naked, cash)
- No emoji. No “apy maxi” copy on the ticket
- Option chain click-to-buy is 1 mini; ticket for size
