"use client";
import UserNotFound from "@/app/components/event/Usernotfound";
import { Button } from "@/app/components/ui/button";
import { useSession } from "@/app/lib/auth-client";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font";
import { Rss } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

export default function UserPage() {
  const { userid } = useParams();
  const currentuser = useSession();
  const SearchParams = useSearchParams();
  const search = SearchParams.get("user");

  if (userid != currentuser.data?.user.id) {
    return (
      <div className="w-full h-full bg-black flex justify-center items-center">
        <UserNotFound />
      </div>
    );
  }

  return (
    <main className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-[70%] bg-transparent overflow-hidden h-full ">
        <div className="h-[30%] w-full p-3 mt-3 ">
          <div className=" relative rounded-lg  border border-neutral-950 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 w-full h-full"></div>
          <div className="flex justify-start items-center mt-[-3rem] fixed ml-6 border-black border-4 rounded-lg shadow-lg w-fit  z-50">
            {/* before yeha absolute tha */}
            <Image
              src={
                currentuser.data?.user.image || "https://github.com/shadcn.png" //replace it with the params user one
              }
              alt="profile"
              className="object-cover h-24 w-24 rounded-md border border-black "
              width={100}
              height={100}
            />
          </div>
        </div>
        {/* profile content here */}
        <div className="w-full h-[20%]">
          <div className="grid grid-cols-[6fr_1fr] gap-x-2 pt-20 p-5">
            <div className="text-2xl font-semibold ">
              {currentuser.data?.user.name}
              <p className="text-muted-foreground text-sm ">
                hello
                {currentuser.data?.user.email}
              </p>
            </div>
            <Button className="bg-neutral-800/70 text-white rounded-sm hover:bg-neutral-800">
              <Rss className="h-4 w-4" />
              follow
            </Button>
          </div>
        </div>
        <hr className="border border-neutral-800" />
        {/* space cards here */}
        <div className="w-full h-full ">
          <div className="flex items-center justify-between">
            <p
              className={cn("text-2xl font-semibold p-5", GeistMono.className)}
            >
              Space
            </p>
            <Button className="bg-neutral-800/70 text-white rounded-sm hover:bg-neutral-800"></Button>
          </div>
          <div className="flex flex-col items-center justify-start">
            {/* space cards here map here */}
          </div>
        </div>
      </div>
    </main>
  );
}
