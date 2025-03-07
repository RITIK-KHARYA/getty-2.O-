import { SidebarTrigger } from "./ui/sidebar";
import NavBar from "./custom/custom-header";
export default function Header(){
    return (
      <div className="flex h-16 items-center border-b border-neutral-700 px-4 justify-between ">
        <SidebarTrigger className="h-8 w-8 rounded-sm bg-neutral-600/40" />
        <NavBar />
      </div>
    );
}