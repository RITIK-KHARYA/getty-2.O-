"use client";

import { usePrefetchConnection } from "@/app/hooks/use-prefetchConnection";

export function PrefetchHandler({ spaceId }: { spaceId: string }) {
  const { Connected } = usePrefetchConnection(spaceId);

  return (
    <button className="px-8 py-2.5 text-neutral-300 hover:bg-[#252525] rounded-none bg-neutral-950 transition-colors font-mono">
      {Connected ? "Enter" : "Join"}
    </button>
  );
}
