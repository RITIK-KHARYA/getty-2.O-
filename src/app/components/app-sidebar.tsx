"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bell,
  Command,
  GalleryVerticalEnd,
  House,
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
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Platform",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: spaces,
      },
    ],
    projects: [
      {
        name: "Home",
        url: "/dashboard",
        icon: House,
      },
      {
        name: "Notification",
        url: "/notifications",
        icon: Bell,
      },
      {
        name: "Orbits",
        url: "/orbits",
        icon: Bell,
      },
      {
        name: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader className=" ">
        <h1 className="bg-black rounded-full flex items-center justify-center">
          logo
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
        {/* need to make profile dialog box like discord */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
