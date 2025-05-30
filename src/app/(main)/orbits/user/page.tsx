"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useSession } from "@/app/lib/auth-client";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ChatArea from "./ChatArea";
import SearchChat from "./SearchChat";
import { SidebarTrigger } from "@/app/components/ui/sidebar";
import Leftsidebar from "@/app/components/Leftsidebar";

export default function Orbits() {
  const user = useSession();
  const formSchema = z.object({
    name: z.string().min(2).max(10),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <main className="flex flex-col sm:flex-row w-full h-full">
      {/* Left sidebar - full width on mobile, adjusts on larger screens */}
      <div className="w-full sm:w-1/3 md:w-1/3 flex flex-col items-center justify-start p-2 bg-neutral-950 rounded-r-2xl border-neutral-800/80 border space-y-2">
        <div className="w-full border border-neutral-800/80 rounded-lg p-2 bg-neutral-900 flex items-center justify-start">
          <>
            <Avatar>
              <AvatarImage
                className="rounded-full object-cover"
                src={user.data?.user.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>
                <Skeleton className="h-10 w-10 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm ml-3 flex flex-col items-center">
              {user.data?.user.name}
              <p className="text-xs text-muted-foreground w-full">my account</p>
            </span>

            <Link href={"/settings"} prefetch={true} className="ml-auto">
              <Settings2 className="size-5 ml-auto" />
            </Link>
            <div className="ml-1 ">
              <SidebarTrigger />
            </div>
          </>
        </div>
        <hr className="w-full border border-neutral-800" />
        <div className="w-full">
          <SearchChat />
        </div>
        <div>{/*here will be the users chats list */}
          <Leftsidebar />
        </div>
      </div>

      {/* Main chat area - full width on mobile, adjusts on larger screens */}
      <div className="sm:w-2/3 md:w-3/4 flex flex-col items-center justify-start bg-black">
        <ChatArea />
      </div>

      {/* Right sidebar - hidden on small/medium screens, visible on large screens */}
      <div className="hidden lg:flex lg:w-1/3 flex-col items-center justify-start p-2 bg-neutral-950 rounded-r-2xl border-neutral-800/60 border">
        {/* active user right side bar */}
        {/* <ActiveRightSidebar /> */}
      </div>
    </main>
  );
}
