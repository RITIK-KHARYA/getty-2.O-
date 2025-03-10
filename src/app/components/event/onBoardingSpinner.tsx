import { useWebSocketStore } from "@/app/hooks/use-websocket";
import { Loader2 } from "lucide-react";

export default function OnBoardingSpinner() {
  const { Connected } = useWebSocketStore();

  if (!Connected) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Loader2 className="animate-spin size-24" />
        <p className="mt-2 text-neutral-300">Connecting...</p>
      </div>
    );
  }

  return <div className="w-full h-full">ONBOARDING...</div>;
}
