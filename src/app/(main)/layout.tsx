import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import Header from "../components/custom/custom-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-hidden ">
        <div className="flex w-full justify-between">
          <div className="gap-x-2">
            <SidebarTrigger className="mt-3 ml-5 bg-neutral-700/40 rounded-lg" />
          </div>
          <Header />
        </div>
   
        {children}
      </main>
    </SidebarProvider>
  );
}