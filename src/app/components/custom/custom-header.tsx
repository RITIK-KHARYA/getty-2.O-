"use client";

import SearchDemo from "./custom-search";
import { SpaceForm } from "./custom-dialog";
import { usePathname } from "next/navigation";
import SpaceCorner from "../event/SpaceCorner";
import FriendsSheet from "../event/FriendButton";
import GetFriends from "@/actions/friends";
import { getSession } from "@/actions/session";
import { useSession } from "@/app/lib/auth-client";

interface HeaderProps {}

export default function NavBar() {
  const pathname = usePathname();
  const CurrentUser = useSession();
  
  const GetAllfriends = async()=>{
    await GetFriends(CurrentUser.data?.user.id);
  }
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
              <FriendsSheet  />
              {/* //get all the member of all space */}
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
