import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import Header from "../components/custom/custom-header";
import Breadcrumbdemo from "../components/custom/custom-breadcum";
import Searchdialog from "../components/event/search";

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
        <Searchdialog/>
        {children}
      </main>
    </SidebarProvider>
  );
}
{/* <Breadcrumbdemo
  classname="inline-flex "
  link1="/dashboard"
  link2="/components"
  link3="/components/breadcrumb"
/>; */}