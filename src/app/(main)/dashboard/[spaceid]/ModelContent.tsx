"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ClientModelContentProps {
  spacename: string;
  description: string;
  image?: string;
  adminimage: string;
  spaceadmin?: string;
  spaceid: string;
}

export default function ClientModelContent({
  spacename,
  spaceid,
  description,
  image,
  spaceadmin,
  adminimage,
}: ClientModelContentProps) {


  return (
    <div className="w-full rounded-2xl p-2 space-y-6">
      <div className="w-full h-52 rounded-2xl overflow-hidden bg-[#1A1A1A]">
        {image && (
          <Image
            src={image}
            alt={`${spacename} banner`}
            width={600}
            height={208}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="space-y-4">
        <div className="bg-transparent rounded-2xl p-4">
          <h2 className="font-mono text-white text-xl tracking-wide">
            {spacename}
          </h2>
        </div>

        {description && (
          <div className="bg-[#1A1A1A] rounded-2xl p-4">
            <p className="font-mono text-neutral-300">{description}</p>
          </div>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarImage
                src={adminimage}
                alt={`${spacename} image`}
                className="rounded-full w-8 h-8 object-cover"
              />
              <AvatarFallback>
                <Skeleton className="rounded-full w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-neutral-400 font-mono">
              {spaceadmin}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-[#1A1A1A] rounded-lg focus:ring-0 focus:outline-none">
              <Heart className="w-5 h-5 text-rose-500" />
            </button>
            <Link href={`/dashboard/${spaceid}`}>
              <button
                className="px-8 py-2.5 text-neutral-300 hover:bg-[#252525] rounded-none bg-neutral-950 transition-colors font-mono"
              >
                {"Join"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
