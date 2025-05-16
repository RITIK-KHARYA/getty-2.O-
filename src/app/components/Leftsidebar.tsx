import { GeistMono } from "geist/font";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import GetConversation from "@/actions/conversation";
import { useState } from "react";
import {
  Loader2,
  Loader2Icon,
  LoaderCircleIcon,
  LoaderIcon,
  LoaderPinwheel,
} from "lucide-react";

export default function Leftsidebar() {
  const [conversations, setconversations] = useState<[]>();
  const [loading, setisLoading] = useState<boolean>();
  const getconversations = async () => {
    try {
      setisLoading(true);
      const data = await GetConversation();
      setisLoading(false);
      setconversations(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      {conversations ? (
        conversations.map((user) => (
          <div className="w-full flex items-center justify-start gap-3 p-2 bg-neutral-950 rounded-r-2xl border-neutral-800/80 border space-y-2">
            <div className="border-1 border-neutral-700">
              <Avatar>
                <AvatarFallback>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </AvatarFallback>
                <AvatarImage
                  src={user?.image || "https://github.com/shadcn.png"}
                  alt="user image"
                  className="object-cover h-10 w-10 rounded-full"
                />
              </Avatar>{" "}
            </div>
            <span className={cn(`text-sm text-white`, GeistMono.className)}>
              {/* {conversationname} */}
            </span>
          </div>
        ))
      ) : (
        <div className="p-4">
          <LoaderIcon className="animate-spin w-4 h-4" />
        </div>
      )}
    </div>
  );
}
