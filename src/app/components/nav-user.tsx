"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import { Skeleton } from "./ui/skeleton";
import { signOut, useSession } from "./../lib/auth-client";
import { useRouter } from "next/navigation";
import ProfileInterface from "./profile-dialog";
import { Userboard } from "@/actions/user";
import { useEffect, useState } from "react";

export function NavUser() {
  const { data, isPending, error } = useSession();
  const [loading, setisLoading] = useState(false);
  const [biodata, setBiodata] = useState<any>(null);
  useEffect(() => {
    const getbio = async () => {
      try {
        setisLoading(true);
        const biodata = await Userboard();
        setBiodata(biodata?.bio);
        setisLoading(false);
      } catch (error) {
        console.log(error, "bhai we got error");
      }
    };
    getbio();
  }, []);

  return (
    <SidebarMenu>
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
            {!loading ? (
              <ProfileInterface
                username={data?.user?.name || ""}
                userbio={biodata}
              />
            ) : (
              <div className="flex flex-col items-center justify-start h-[230px] w-[270px] gap-y-5">
                <div className="w-full flex flex-row items-center justify-start gap-x-6">
                  <Skeleton className="rounded-full w-12 h-12 mt-5 ml-5" />
                  <div className="flex flex-col gap-y-2">
                    <Skeleton className="rounded-full w-24 h-3" />
                    <Skeleton className="rounded-full w-20 h-3" />
                  </div>
                </div>
                <span className="p-5 flex items-center justify-center">
                  <Skeleton className="w-[200px] rounded-lg h-24 " />
                </span>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
