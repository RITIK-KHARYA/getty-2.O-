import * as React from "react";
import { Circle } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import { UserProfileDialog } from "./event/userdialogcard";
import { cn } from "@/lib/utils";
import { useSession } from "../lib/auth-client";

export default function NavUser() {
  const [open, setOpen] = React.useState(false);
const user = useSession();
const status = user.data?.user.name as keyof typeof statusColors;
  const statusColors = {
    online: "bg-emerald-500",
    idle: "bg-amber-500",
    dnd: "bg-rose-500",
    invisible: "bg-slate-500",
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserProfileDialog open={open} onOpenChange={setOpen}>
          <SidebarMenuButton
            size="lg"
            className="h-auto py-2.5 transition-colors hover:bg-primary/10"
            onClick={() => setOpen(true)}
          >
            <div className="relative">
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarImage
                  src={user.data?.user.image || "https://github.com/shadcn.png"}
                  alt={user.data?.user.name}
                />
                <AvatarFallback className="bg-primary/10 text-primary">
                  AJ
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background">
                <Circle
                  className={cn("h-full w-full", statusColors[status])} 
                />
              </div>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user.data?.user.name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user.data?.user.email}
              </span>
            </div>
          </SidebarMenuButton>
        </UserProfileDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
