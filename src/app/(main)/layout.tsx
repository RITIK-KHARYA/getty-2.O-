import type React from "react";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import Headers from "../components/custom/custom-header";
import Header from "../components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
}
