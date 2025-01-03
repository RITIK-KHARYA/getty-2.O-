"use client";

import { getRandomGradient } from "@/utils/colorconcept";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface spacecardprops {
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
}: spacecardprops) {
  const [gradient] = useState(getRandomGradient());
  return (
    <Card className="w-[300px] overflow-hidden bg-gray-900 text-white border border-gray-700 shadow-lg">
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
        <div className="grid grid-cols-[3fr_1fr] ">
          <h3 className="text-base font-medium mb-1 ">{spacename}</h3>
        </div>
        <div className="grid grid-cols-[3fr_1fr] text-muted-foreground w-full">
          <p className="text-xs text-neutral-300 line-clamp-1 overflow-hidden truncate...">
            {description}
          </p>
          <div className="flex items-center justify-end">
            <span className="text-xs font-bold">
              <Avatar className="h-6 w-6 rounded-full">
                <AvatarFallback>
                  <Skeleton className="h-6 w-6 rounded-full" />
                </AvatarFallback>
                <AvatarImage
                  src={spaceadmin.image || "https://github.com/shadcn.png"}
                  alt="Avatar"
                  className="rounded-full h-6 w-6"
                />
              </Avatar>
            </span>
          </div>
        </div>


      </CardContent>
    </Card>
  );
}
