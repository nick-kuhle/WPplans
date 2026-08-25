import { useEffect } from "react";
import { useWolf } from "@/lib/wolfpit/store";

export function SimLoop() {
  const speed = useWolf((s) => s.simSpeed);
  const step = useWolf((s) => s.step);
  const rehydrate = useWolf((s) => s.rehydrate);
  useEffect(() => {
    rehydrate();
  }, [rehydrate]);
  useEffect(() => {
    const id = window.setInterval(() => step(speed), 1000);
    return () => window.clearInterval(id);
  }, [speed, step]);
  return null;
}
