import type { FutSide, OptType, PoolId } from "./types";
import type { EngineState } from "./types";

/** Sim and chain adapters implement this. No hedgeLater. */
export type DeskEngine = {
  spotSwap: (pool: PoolId, side: "buy" | "sell", amt: number) => EngineState | string;
  openFuture: (side: FutSide, minis: number, expiry: number) => EngineState | string;
  closeFuture: (id: string) => EngineState | string;
  buyOption: (type: OptType, strike: number, expiry: number, minis: number) => EngineState | string;
  addLiquidity: (pool: PoolId, amt: number) => EngineState | string;
};

export type FillOrReject = EngineState | string;

export function isReject(x: FillOrReject): x is string {
  return typeof x === "string";
}
