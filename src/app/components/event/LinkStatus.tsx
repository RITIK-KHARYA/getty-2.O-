"use client";

import { Loader2Icon } from "lucide-react";
import { useLinkStatus } from "next/link";

export default function LinkStatus() {
  const { pending } = useLinkStatus();
  return pending ? (
    <div className="flex items-center justify-center">
      <Loader2Icon className="animate-spin w-4 h-4" />
    </div>
  ) : null;
}
