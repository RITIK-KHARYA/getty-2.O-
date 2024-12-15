"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface SpaceCardProps {
  spacename: string;
}

export default function SpaceCard({ spacename }: SpaceCardProps) {
  return (
    <Card className="w-[300px] overflow-hidden bg-black text-white border border-gray-800">
      <div className="relative w-full h-48">
        <Image
          src="/thumbnail.jpg"
          alt="Space image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-600" />
            <span className="text-sm text-gray-400">{spacename}</span>
          </div>
          <Badge variant="secondary">24 hrs</Badge>
        </div>
        <h3 className="text-lg font-normal text-white">{spacename}</h3>
      </CardContent>
    </Card>
  );
}
