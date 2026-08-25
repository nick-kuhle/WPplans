# WolfPit contracts (TEST)

Foundry skeleton for the dealer vault. **Base Sepolia later. Not Ethereum L1. Not funded.**

```
forge test
```

Inventory law (same as the sim):

- `writeCall(size)` reverts if `size > freeEth` (no naked calls)
- `writePut(size, K)` reverts if `K*size > freeUsdc` (no naked puts)
- `openLong` / `openShort` respect α = 40%
- `pause` stops listings

No Uniswap v4 hook. No ERC-1155 series. Those are week 2.

Tokens: MockUSDC, MockWETH. WPIT-TEST is not required to encode cover.
