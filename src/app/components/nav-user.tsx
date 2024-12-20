"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

import { Skeleton } from "./ui/skeleton";
import { signOut, useSession } from "./../lib/auth-client";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { getSession } from "@/actions/session";
import ProfileInterface from "./profile-dialog";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { data, isPending, error } = useSession();
  const handleSignout = () => {
    signOut();
    router.push("/signin");
  };

  return (
    <SidebarMenu className="">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-neutral-700/40 rounded-lg"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={data?.user?.image || ""}
                  alt={data?.user?.name || ""}
                />
                <AvatarFallback className="rounded-lg">
                  <Skeleton className="h-8 w-8 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="grid grid-rows-1 text-left text-xs leading-tight">
                {!data?.user ? (
                  <div className="mt-2 gap-y-1 flex flex-col">
                    <Skeleton className="h-2 w-20 " />
                    <Skeleton className="h-2 w-28" />
                  </div>
                ) : (
                  <div className="flex flex-col justify-start">
                    <span className="">{data?.user?.name || ""}</span>
                    <span>{data?.user?.email || ""}</span>
                  </div>
                )}
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" bg-neutral-900 text-white border-neutral-600">
            <ProfileInterface />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
