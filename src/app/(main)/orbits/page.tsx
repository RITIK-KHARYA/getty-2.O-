import { MessageCircleCode, MessageCircleMore } from "lucide-react";


export default function Orbits() {
  return (
    <div className="grid grid-cols-[1fr_2fr] h-full">
      <div className="flex flex-col items-center justify-items-start bg-neutral-900 h-full">
        <div className="h-14 rounded-lg bg-neutral-900/70 w-full flex items-center justify-start gap-x-2 p-2">
        <MessageCircleMore/>
        Chats</div>
      </div>
      <div>shit</div>
    </div>
  );
}
