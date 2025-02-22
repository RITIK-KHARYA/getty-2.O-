"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ArrowUpRight, Users } from "lucide-react";
import { Button } from "../ui/button";

interface SpaceCardProps {
  banner: string;
  spacename: string;
  description: string;
  spaceAdmin: {
    name: string | null;
    image: string | null;
  };
  memberCount: number;
}

export default function SpaceCard({
  banner,
  spacename,
  description,
  spaceAdmin,
  memberCount=10,
}: SpaceCardProps) {
  return (
    <Card className="w-[350px] overflow-hidden bg-zinc-900 text-zinc-100 border-zinc-800 shadow-lg group transition-all duration-300 hover:shadow-2xl">
      <div className="relative w-full h-40">
        <Image
          src={banner || "/placeholder.svg"}
          alt={`Banner for ${spacename}`}
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent"></div> */}
      </div>
      <CardContent className="p-4 relative -mt-16">
        <CardTitle className="text-xl font-semibold mb-2 flex items-center justify-between group-hover:text-emerald-400 transition-colors">
          {spacename}
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 mb-2 justify-between">
            <div>
              <Avatar>
                <AvatarImage
                  src={spaceAdmin?.image || "https://github.com/shadcn.png"}
                />
              </Avatar>
              <p className="text-xs text-zinc-400">Created by</p>
            </div>
          </div>

          <div className="mt-4 items-center justify-normal text-zinc-400 text-xs ">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-100 text-xs w-20 h-7 rounded-none "
                    >
                      Join
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Join this space</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center p-1  ">
              <Users className="w-4 h-4 mr-2 " />
              {memberCount} member
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
