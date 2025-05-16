"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  GalleryVerticalEnd,
  Ghost,
  Home,
  Moon,
  Settings,
  Sun,
  UserPlus,
} from "lucide-react";
import { GeistMono } from "geist/font";

import { NavMain } from "./nav-main";
import NavUser from "./nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/app/components/ui/sidebar";
import { Button } from "@/app/components/ui/button";
import { useTheme } from "next-themes";
import GetSpace from "@/actions/space";
import { cn } from "../lib/utils";
import { getSession } from "@/actions/session";
import { useSession } from "../lib/auth-client";
import { title } from "process";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [spaces, setSpaces] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setTheme, theme } = useTheme();
  const user = useSession();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setIsLoading(true);
        const data = await GetSpace();
        setSpaces(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch spaces:", error);
        setError("Failed to load spaces. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  const data = {
    navMain: [
      {
        title: "Home",
        url: "http://localhost:3002/dashboard",
        isActive: false,
        icon: Home,
      },
      {
        title: "Notifications",
        url: "http://localhost:3002/notifications",
        isActive: false,
        icon: Bell,
      },
      {
        title: "Orbits",
        isActive: false,
        url: `http://localhost:3002/orbits/user`,
        icon: GalleryVerticalEnd,
      },
      {
        title: "Settings",
        url: "http://localhost:3002/settings",
        isActive: false,
        icon: Settings,
      },
      // {
      //   title:"Friends",
      //   url:"/friends",
      //   isActive:false,
      //   icon:UserPlus
      // }
    ],
  };

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="border-r border-border/40 bg-gradient-to-b from-background to-background/95"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between :">
          <h1
            className={cn(
              "text-2xl font-bold text-primary group-data-[collapsible=icon]:hidden",
              GeistMono.className
            )}
          >
            Getty
          </h1>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <Ghost className="relative size-10 text-primary transition-all duration-300 ease-in-out" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={data.navMain} />

        <SidebarSeparator className="my-2" />

        {/* {isLoading ? (
          <div className="p-3 text-sm text-muted-foreground">
            Loading spaces...
          </div>
        ) : error ? (
          <div className="p-3 text-sm text-destructive">{error}</div>
        ) : (
          // <LikedSpaces spaces={spaces} />
          <></>
        )} */}

        {/* either render the liked spaces or visited last space */}

        <div className="mt-auto px-2 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full h-11 justify-start gap-3 px-3 rounded-md hover:bg-primary/10"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Light Mode
                </span>
              </>
            ) : (
              <>
                <Moon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Dark Mode
                </span>
              </>
            )}
          </Button>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/40">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
