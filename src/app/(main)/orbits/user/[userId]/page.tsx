"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Input } from "@/app/components/ui/input";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useSession } from "@/app/lib/auth-client";
import { Search, Settings2 } from "lucide-react";
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
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatArea from "./ChatArea";
import SearchChat from "./SearchChat";

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
      {" "}
      <div className="w-full sm:w-1/3 md:w-1/4 flex flex-col items-center justify-start p-2 bg-neutral-950 rounded-r-2xl border-neutral-800/80 border space-y-2">
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
              <p className="text-xs text-muted-foreground  w-full">my account</p>
            </span>
            <Link href={"/settings"} prefetch={true} className="ml-auto">
              <Settings2 className="size-5 ml-auto" />
            </Link>
          </>
        </div>
        <hr className="w-full border border-neutral-800" />
        <div className="w-full">
         <SearchChat/>
        </div>
        <div>{/*here will be the users chats list */}</div>
      </div>
      {/* Main chat area - full width on mobile, adjusts on larger screens */}
      <div className="w-full sm:w-2/3 md:w-3/4 lg:w-2/4 flex flex-col items-center justify-start p-2 bg-black">
        {/* chat header containing the chatting user image name username  */}
        <ChatArea />
      </div>
      <div className="hidden lg:flex lg:w-1/4 flex-col items-center justify-start p-2 bg-neutral-950 rounded-r-2xl border-neutral-800/60 border">
      {/* active user right side bar */}
      </div>
    </main>
  );
}
