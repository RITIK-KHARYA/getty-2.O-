import GetFriends from "@/actions/friends";
import { getSession } from "@/actions/session";
import { useSession } from "../lib/auth-client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

interface ChatHeaderProps {
  classname: string;
  friendId:string;
  friendName:string;
  friendImage:string;
}

export default function ChatHeader({ classname,friendId,friendName,friendImage }: ChatHeaderProps) {
  const currentuser = useSession();
  const [friends, setfriends] = useState([]);
  // const handleFriend = async () => {
  //   const data = await GetFriends(currentuser.data?.user.id);
  //   setfriends(data);
  //   return data;
  // };

  // useEffect(() => {
  //   handleFriend();
  // }, [currentuser.data?.user.id]);

  console.log(friends, "friends");

  return (
    <div className="w-full">
      <div className={`flex items-center gap-2 justify-start ${classname}`}>
        <Avatar>
          <AvatarImage
            src={friendImage || "https://github.com/shadcn.png"} 
            className="rounded-full object-cover h-10 w-10 ring-0 ring-offset-0 focus:ring-0 focus:outline-none"
          />
          <AvatarFallback>
            <Skeleton className="h-10 w-10 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <p className="text-neutral-200/80 font-semibold text-sm text-center whitespace-pre-line">
          {friendName || "Shadcn"} 
          {/* friends[0]?.image from handlefrineds */}
        </p>
      </div>
    </div>
  );
}
