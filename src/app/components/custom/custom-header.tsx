"use client";

import SearchDemo from "./custom-search";
import { SpaceForm } from "./custom-dialog";
import { usePathname } from "next/navigation";
import SpaceCorner from "../event/SpaceCorner";
import FriendsSheet from "../event/FriendButton";

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
              <SpaceForm />
              {/* add log out button here */}
              <FriendsSheet/>
            </>
          ) : (
            <>
              <SpaceCorner />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
