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
  }
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
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold">
                <Avatar className="h-6 w-6 rounded-full">
                  <AvatarFallback>
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </AvatarFallback>
                  <AvatarImage
                    src={
                      spaceadmin.image || "https://github.com/shadcn.png"
                    }
                    alt="Avatar"
                    className="rounded-full h-6 w-6"
                  />
                </Avatar>
              </span>
            </div>
            <span className="text-xs text-gray-200">{spaceadmin.name}</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-white mb-1 truncate">
          {spacename}
        </h3>
        <p className="text-xs text-gray-200 line-clamp-2 truncate ...">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}