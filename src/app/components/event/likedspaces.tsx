"use client";
import { Heart, Star } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import { cn } from "@/lib/utils";



export function LikedSpaces() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center gap-2 px-3 text-xs font-medium text-muted-foreground">
        <Heart className="h-3.5 w-3.5" />
        <span>LIKED SPACES</span>
      </SidebarGroupLabel>
      <SidebarMenu className="my-2">
        <SidebarMenuItem>
          <SidebarMenuButton className="h-9 text-xs text-muted-foreground hover:text-primary px-3">
            <Star className="h-3.5 w-3.5" />
            <span>View all liked spaces</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
