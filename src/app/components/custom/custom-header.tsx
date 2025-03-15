"use client";

import SearchDemo from "./custom-search";
import { ProfileForm } from "./custom-dialog";
import FindSpaceDialog from "../findspacedialog/findspacedialog";
import { useParams, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {}

export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 h-[60px] ">
      <div className="flex items-center h-full justify-end px-4 gap-x-5 ">
        <div className="flex gap-2 ">
          {pathname === "/dashboard" || pathname === "/settings" ? (
            <>
              <div className="flex">
                <SearchDemo />
              </div>
              <ProfileForm />
              <FindSpaceDialog />
            </>
          ) : (
            <>
              <Link href={"/dashboard"}>
                <Button className="rounded-lg bg-neutral-900 hover:bg-neutral-800">
                  <LogOutIcon className="h-6 w-6 text-red-500" />
                </Button>
              </Link>

            </>
          )}
        </div>
      </div>
    </div>
  );
}
