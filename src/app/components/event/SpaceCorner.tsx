"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Users, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { FindSpaceById } from "@/actions/space";
import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";

interface Space {
  title: string;
  banner: string;
  description: string;
  createdAt: Date;
  users: {
    id: string;
    name: string;
    image: string;
    isFriend: Boolean;
  }[];
  id: string;
  updatedAt: Date;
  _count: {
    likes: number;
    users: number;
    media: number;
  };
  media: [];
}

export default function SpaceCorner() {
  const { spaceid } = useParams<{ spaceid: string }>();
  const [space, setSpace] = useState<Space | null>(null);
  const user = useSession();

  useEffect(() => {
    const fetchSpace = async () => {
      const data = await FindSpaceById(spaceid);
      setSpace(data.spaces);
    };
    fetchSpace();
  }, [spaceid]);

  console.log(space)

  if (!space) return null;
  return (
    <div className="space-x-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="bg-neutral-900 border border-neutral-600 outline-1 hover:bg-neutral-800 transition-colors"
          >
            <Users className="w-6 h-6 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-black text-white border-neutral-800">
          <SheetHeader>
            <div className="flex items-center gap-4">
              <Image
                src={space.banner || "https://github.com/shadcn.png"}
                alt={space.title}
                width={50}
                height={50}
                className="w-16 h-16 rounded-full border border-neutral-700 object-cover"
              />
              <div>
                <SheetTitle>{space.title}</SheetTitle>
                <p className="text-xs text-neutral-500">{spaceid}</p>
              </div>
            </div>
          </SheetHeader>

          {/* Space Description */}
          <SheetDescription className="mt-3 text-sm text-neutral-400">
            {space.description || "No description available."}
          </SheetDescription>

          {/* Members Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-300 mb-3 flex items-center justify-between">
              <span>Members</span>
              <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-400">
                {space._count.users}
              </span>
            </h3>

            <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 custom-scrollbar">
              {space.users && space.users.length > 0 ? (
                space.users.map((member) => (
                  <div
                    key={member.name}
                    className="flex justify-between items-center gap-3 p-2.5 bg-neutral-900  rounded-lg border border-neutral-800 transition-colors"
                  >
                    <div className="flex items-center ">
                      <Image
                        src={member.image || "https://github.com/shadcn.png"}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="rounded-full border border-neutral-700 w-10 h-10 object-cover"
                      />
                      <div className="ml-2">
                        <p className="text-xs text-neutral-300">
                          {member.name}
                        </p>
                      </div>
                    </div>
                    {/* <FriendButton
                      friendId={member.id}
                      isFriend={member.isFriend}
                    /> */}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-neutral-500 text-sm">
                  No members to display
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white gap-2"
              >
                <LogOutIcon className="text-red-500 w-4 h-4" />
                Leave Space
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/dashboard">
        <Button className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-600 outline-1 transition-colors">
          <LogOutIcon className="text-red-500 w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
}
