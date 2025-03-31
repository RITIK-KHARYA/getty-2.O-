"use cilent";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/app/components/ui/input";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useSession } from "@/app/lib/auth-client";
import { Keyboard, LoaderIcon, MessageCircle, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { SearchUser } from "@/actions/user";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

interface SearchUserProps {
  name: string;
  userid: string;
  image?: string;
}

export default function SearchChat() {
  const user = useSession();
  const [search, setSearch] = useState<string>("");
  const [SearchResult, setSearchResult] = useState<SearchUserProps[]>([]);
  const [isloading, setisLoading] = useState<boolean>(false);

  if (!user) {
    console.log("unauthenticated");
    return;
  }

  const handleSubmit = (e?: React.ChangeEvent<HTMLInputElement>) => {
    console.log(search);
    // SearchResult();
    if (!search.trim()) {
      console.log("empty search");
      return;
    }
    try {
      setisLoading(true);
      handleSearch(search);
    } catch (error) {
      console.log(error, "hehe error");
    } finally {
      setisLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    console.log(value);
    try {
      setisLoading(true);

      const result = await SearchUser(value);
      setSearchResult(result);
      console.log(result, "result");

      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover>
      <div className="flex items-center gap-2">
        <div className="relative w-full ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <PopoverTrigger asChild>
          <Button
            disabled={!search.trim()}
            onClick={() => handleSubmit()}
            type="button"
            className="bg-neutral-300 text-black font-extrabold w-10 h-8 text-center hover:neutral-700"
          >
            {isloading ? (
              <LoaderIcon className="animate-spin mx-auto h-5 w-5 text-black" />
            ) : (
              <Search className="size-5" />
            )}
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent className="p-5 border border-neutral-700  rounded-lg">
        {SearchResult.length === 0 && <p>No results found</p>}
        {SearchResult.map((result) => (
          <div
            className="flex items-center justify-between space-y-3 rounded-lg "
            key={result.userid}
          >
            <div className="w-full flex items-center gap-2 justify-start">
              <Avatar>
                <AvatarImage
                  src={result?.image || "https://github.com/shadcn.png"}
                  className="rounded-full object-cover h-10 w-10"
                />
                <AvatarFallback>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground text-sm">{result?.name}</p>
            </div>
            <Link href={`/orbits/user/${result.userid}`}>
              {/* conversation id goes here and replace this inorder to open the conversationid chat */}
              <Button className="bg-neutral-800 text-white font-extrabold  rounded-full w-10 h-10 hover:bg-neutral-800/80 text-center">
                <MessageCircle className="size-5 mx-auto text-center" />
              </Button>
            </Link>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

//   useEffect(() => {
//     const keydown = (e?: KeyboardEvent) => {
//       if (!e) return;
//       e.preventDefault();
//       if (e.key === "Enter") {
//         handleSubmit();
//       }
//     };
//   }, []);
//debounce value
