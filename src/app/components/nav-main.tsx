"use client";

import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { Collapsible } from "@/app/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1.5">
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Collapsible key={item.title} asChild defaultOpen={true}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isActive}
                  className={cn(
                    "h-11 gap-3 font-medium transition-all duration-200 ease-in-out px-3",
                    "hover:bg-primary/10 hover:text-primary",
                    "data-[active=true]:bg-primary/15 data-[active=true]:text-primary",
                    "group relative overflow-hidden rounded-md"
                  )}
                >
                  <a href={item.url}>
                    {/* Animated background on hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                    {item.icon && (
                      <item.icon
                        className={cn(
                          "size-5 transition-transform duration-200",
                          "group-hover:scale-110",
                          isActive && "text-primary"
                        )}
                      />
                    )}

                    <span
                      className={cn(
                        "text-base font-normal",
                        isActive && "font-medium text-primary"
                      )}
                    >
                      {item.title}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-primary" />
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
