import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const stableOnComplete = useCallback(onComplete, [onComplete]);

  const statusText = progress < 40 ? "Fetching modules..." : progress < 80 ? "Initializing AI Neural Link..." : "Ready.";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 45);
    const timeout = setTimeout(stableOnComplete, 5000);
    return () => { clearInterval(timer); clearTimeout(timeout); };
  }, [stableOnComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="w-72 space-y-4">
        <div className="flex justify-between text-xs font-mono text-muted-foreground">
          <span>{statusText}</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
        <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.05 }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground/50 font-mono">RORR_SYSTEM v2.0</p>
      </div>
    </motion.div>
  );
}
