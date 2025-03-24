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

interface Space {
  space: {
    id: string;
    title: string;
    banner: string;
    description: string;
    _count: { users: number };
    users: [
      id: {
        user: {
          image: string;
          name: string;
        };
      }
    ];
    createdAt: Date;
    likes: number;
  };
  membersCount: number;
}

export default function SpaceCorner() {
  const { spaceid } = useParams<{ spaceid: string }>();
  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    const fetchSpace = async () => {
      const data = await FindSpaceById(spaceid);
      // console.log(data);
      setSpace(data);
    };
    fetchSpace();
  }, [spaceid]);

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
                src={space.space.banner || "https://github.com/shadcn.png"}
                alt={space.space.title}
                width={50}
                height={50}
                className="w-16 h-16 rounded-full border border-neutral-700 object-cover"
              />
              <div>
                <SheetTitle>{space.space.title}</SheetTitle>
                <p className="text-xs text-neutral-500">{spaceid}</p>
              </div>
            </div>
          </SheetHeader>

          {/* Space Description */}
          <SheetDescription className="mt-3 text-sm text-neutral-400">
            {space.space?.description || "No description available."}
          </SheetDescription>

          {/* Members Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-300 mb-3 flex items-center justify-between">
              <span>Members</span>
              <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-400">
                {space.membersCount}
              </span>
            </h3>

            <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 custom-scrollbar">
              {space.space.users && space.space.users.length > 0 ? (
                space.space.users.map((member) => (
                  <div
                    key={member.user.name}
                    className="flex justify-between items-center gap-3 p-2.5 bg-neutral-900  rounded-lg border border-neutral-800 transition-colors"
                  >
                    <div className="flex items-center ">
                      <Image
                        src={
                          member.user.image ||
                          "/placeholder.svg?height=40&width=40"
                        }
                        alt={member.user.name}
                        width={40}
                        height={40}
                        className="rounded-full border border-neutral-700 w-10 h-10 object-cover"
                      />
                      <div className="ml-2">
                        <p className="text-xs text-neutral-300">
                          {member.user.name}
                        </p>
                      </div>
                    </div>
                    <Button className="bg-white hover:bg-neutral-300  text-black w-16 h-7 text-[10px] font-semibold">Add friend</Button>
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
