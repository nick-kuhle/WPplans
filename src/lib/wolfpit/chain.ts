export type ChainMode = "sim" | "base-sepolia" | "base";

function envChain() {
  try {
    return String((import.meta as { env?: { VITE_CHAIN?: string } }).env?.VITE_CHAIN ?? "");
  } catch {
    return "";
  }
}

export function chainMode(raw?: string): ChainMode {
  const v = ((raw ?? envChain()) || "sim").toLowerCase();
  if (v === "base") return "base";
  if (v === "base-sepolia" || v === "sepolia") return "base-sepolia";
  return "sim";
}

export function chainLabel(raw?: string) {
  const m = chainMode(raw);
  if (m === "base") return "Base live";
  if (m === "base-sepolia") return "Base Sepolia";
  return "Sim · Base";
}
