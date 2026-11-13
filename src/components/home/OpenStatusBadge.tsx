"use client";

import { useEffect, useState } from "react";
import type { OpenStatus } from "@/types";
import { getOpenStatus } from "@/utils/hours";

export default function OpenStatusBadge({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Reserve space before hydration so nothing shifts.
  if (!status) {
    return <span className={`inline-block h-8 w-44 rounded-full bg-ink-800 ${className}`} aria-hidden />;
  }

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium ${
        status.isOpen
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
          : "border-red-500/40 bg-red-500/10 text-red-300"
      } ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${status.isOpen ? "bg-emerald-400" : "bg-red-400"}`}
        aria-hidden
      />
      {status.label}
      <span className="text-stone-400">· {status.detail}</span>
    </span>
  );
}
