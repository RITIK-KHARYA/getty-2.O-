"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bell,
  Command,
  GalleryVerticalEnd,
  House,
  HouseIcon,
  Settings,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";
import GetSpace from "@/actions/space";
import { isActive } from "@tiptap/react";

async function GetSpacevalue() {
  const data = await GetSpace();
  return data;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [spaces, setSpaces] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchSpaces = async () => {
      const data = await GetSpacevalue();
      setSpaces(data);
    };

    fetchSpaces();
  }, []);

  const data = {
    navMain: [
      {
        title: "Home",
        url: "/dashboard",
        isActive: false,
        icon: House,
      },
      {
        title: "Notification",
        url: "/notifications",
        isActive: false,
        icon: Bell,
      },
      {
        title: "Orbits",
        isActive: false,
        url: "/orbits",
        icon: Bell,
      },
      {
        title: "Settings",
        url: "/settings",
        isActive: false,
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader className=" ">
        <h1 className="text-2xl mt-1">S&B</h1>
      </SidebarHeader>
      <SidebarContent className="mt-8 ">
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
