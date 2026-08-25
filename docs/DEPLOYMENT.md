# Deployment

## This preview

`npm run dev` on the App Builder host. Paper only. localStorage key `wolfpit-sim-v1`.

## Testnet (P1)

1. Foundry project (separate package or `contracts/`)
2. Deploy mock USDC, WETH, WPIT-TEST
3. Deploy two pools named WOLFPIT-USDC-TEST and WOLFPIT-ETH-TEST
4. Deploy vault + ERC-1155
5. Wire `VITE_*` addresses
6. Keepers: liquidate, expire, harvest

## “Mainnet TEST” (optional, P2)

Unfunded ERC-20s on Base (not Ethereum L1 unless you enjoy $100 deploys).

Requirements before that PR:

- [ ] Two audits on the vault
- [ ] Pause listing
- [ ] Public addresses + disclaimer
- [ ] No mint authority left in an EOA
- [ ] Geo-block if counsel requires

**Do not** put a funded ETH-USDC vault on any production chain until the sim has been gapped 20% in a recorded drill and LP NAV rules hold.

## GitHub

When the org exists, this directory is the first push. Do not rewrite history to hide sim disclaimers.
