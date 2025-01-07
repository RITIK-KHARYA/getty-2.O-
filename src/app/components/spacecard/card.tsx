"use client";

import { getRandomGradient } from "@/utils/colorconcept";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CircleArrowRight } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface SpaceCardProps {
  banner: string;
  spacename: string;
  description: string;
  spaceadmin: {
    name: string;
    image: string | null;
  };
}

export default function SpaceCard({
  banner,
  spacename,
  description,
  spaceadmin,
}: SpaceCardProps) {
  const [gradient] = useState(getRandomGradient());

  return (
    <Card className="w-[300px] overflow-hidden bg-gray-900 text-white border border-gray-900 shadow-lg group">
      <div className="relative w-full h-32">
        <Image
          src={banner}
          alt="Space image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardContent className={`p-3 bg-gradient-to-br ${gradient}`}>
        <h3 className="text-lg font-light flex items-center justify-between">
          {spacename}
          <div className="flex items-center gap-x-2 text-xs font-bold">
            <Tooltip>
              <TooltipTrigger>
                <TooltipContent>{spaceadmin.name}</TooltipContent>
                <Avatar className="h-7 w-7 rounded-full">
                  <AvatarFallback>
                    <Skeleton className="h-7 w-7 rounded-full" />
                  </AvatarFallback>
                  <AvatarImage
                    src={spaceadmin.image || "https://github.com/shadcn.png"}
                    alt="Avatar"
                    className="rounded-full h-7 w-7 hover:opacity-80"
                  />
                </Avatar>
              </TooltipTrigger>
            </Tooltip>

            <div className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden">
              <CircleArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </h3>
      </CardContent>
    </Card>
  );
}
