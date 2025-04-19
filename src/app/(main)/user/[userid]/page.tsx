"use client";
import { GetUserById } from "@/actions/user";
import UserNotFound from "@/app/components/event/Usernotfound";
import Profilespacecard from "@/app/components/spacecard/Profilespacecard";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useSession } from "@/app/lib/auth-client";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font";
import { Loader2, Loader2Icon, LoaderIcon, Rss } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type fetchedUser = {
  name: string;
  image: string;
  bio: string;
  email: string;
  space: [id: string];
};

export default function UserPage() {
  const { userid } = useParams();
  const currentuser = useSession();
  const SearchParams = useSearchParams();
  const search = SearchParams.get("user");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [searchresult, setSearchresult] = useState<fetchedUser | null>(null);

  console.log(searchresult, "searchresult");

  useEffect(() => {
    const fetchuser = async () => {
      try {
        setisLoading(true);
        const user = await GetUserById((userid as string) || "");
        setSearchresult(user);
        console.log(user, "user");
        setisLoading(false);
      } catch (error) {
        console.log(error, "error bitch");
      }
    };
    fetchuser();
  }, [userid]);

  if (!isLoading) {
    <div className="w-full h-full">
      <LoaderIcon className="animate-spin w-4 h-4" />
    </div>;
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
                searchresult?.image || "https://github.com/shadcn.png" //replace it with the params user one
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
            <div className="text-2xl font-semibold space-y-2">
              {searchresult?.name || (
                <Skeleton className=" w-24 h-4 rounded-full" />
              )}
              <div className="text-muted-foreground text-sm ">
                {searchresult?.email || (
                  <Skeleton className="w-32 h-4 rounded-full" />
                )}
                {/* {!searchresult?.bio ? (
                  <Skeleton className="w-32 h-4 rounded-full" />
                ) : (
                  searchresult?.bio
                )} */}
              </div>
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
            {searchresult?.space?.map((space) => {
              return (
                <div className="w-full h-52 ">
                  <Profilespacecard spaceid={space} />;
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
