import type React from "react";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import Headers from "../components/custom/custom-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex h-16 items-center border-b border-neutral-700 px-4  justify-between ">
            <SidebarTrigger className="h-8 w-8 rounded-sm bg-neutral-600/40" />
            <Headers/>
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
