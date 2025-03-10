"use client";

import { useRouter } from "next/navigation";
import { useWebSocketStore } from "./use-websocket";
import { useEffect } from "react";

export const usePrefetchConnection = (spaceId: string) => {
  const router = useRouter();
  const { Connected, ConnectSocket } = useWebSocketStore();

  useEffect(() => {
    if (Connected) {
      router.push(`/dashboard/${spaceId}`);
    }
  }, [Connected, spaceId, router]);

  useEffect(() => {
    if (!Connected) {
      ConnectSocket();
    }
  }, []);

  return { Connected };
};
