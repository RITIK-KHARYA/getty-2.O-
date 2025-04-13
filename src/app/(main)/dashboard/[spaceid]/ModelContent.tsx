"use client";

import type React from "react";

import { AddLike, DeleteLike } from "@/actions/Like";
import { FindSpaceById, handleEnterSpace } from "@/actions/space";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOptimistic, useState } from "react";

interface ClientModelContentProps {
  spacename: string;
  description: string;
  image?: string;
  adminimage: string;
  spaceadmin?: string;
  intialLikes: number;
  spaceid: string;
}

export default function ClientModelContent({
  spacename,
  spaceid,
  description,
  image,
  spaceadmin,
  intialLikes,
  adminimage,
}: ClientModelContentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(intialLikes);
  const router = useRouter();

  const handleJoin = async () => {
    setLoading(true);
    try {
      const data = await handleEnterSpace(spaceid);
      const spacedetail = await FindSpaceById(spaceid);
      if (data) {
        router.push(data.data.redirectUrl);
      }
    } catch (error) {
      console.error("Error joining space:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      setLiked(false);
      setOptimisticLikes((prev): number => prev - 1);
      await DeleteLike(spaceid);
    }

    if (!liked) {
      setLiked(true);
      setOptimisticLikes((prev: number) => prev + 1);

      try {
        await AddLike(spaceid);
      } catch (error) {
        setLiked(false);
        setOptimisticLikes((prev: number) => prev - 1);
        console.error("Error creating like:", error);
      }
    }
  };

  return (
    <div className="w-full  rounded-none overflow-hidden border-none">
      <div className="relative w-full h-56 overflow-hidden bg-zinc-800">
        {image ? (
          <Image
            src={image || "/placeholder.svg"}
            alt={`${spacename} banner`}
            width={600}
            height={300}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <span className="text-zinc-600 font-mono text-xl">No Image</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-white text-2xl font-semibold tracking-tight">
            {spacename}
          </h2>

          <div className="flex items-center gap-2">
            <button
              className={`flex items-center  border-none border-0 transition-all p-2 focus:outline-none focus:ring-0 focus:ring-offset-0  ${
                liked
                  ? "bg-transparent"
                  : "bg-transparent text-zinc-400 hover:bg-transparent/20"
              }`}
              onClick={handleLike}
            >
              <Heart
                className={`w-6 h-6 mx-auto ${
                  liked ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
            
              <span className="text-sm font-medium">{optimisticLikes}</span>
            </button>
          </div>
        </div>

        {description && (
          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
            <p className="text-zinc-300 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 border-2 border-zinc-700">
              <AvatarImage
                src={adminimage}
                alt={`${spaceadmin} avatar`}
                className="object-cover"
              />
              <AvatarFallback>
                <Skeleton className="w-full h-full rounded-full bg-zinc-800" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-zinc-300 text-sm font-medium">
                {spaceadmin || "Space Admin"}
              </span>
              <span className="text-zinc-500 text-xs">Creator</span>
            </div>
          </div>

          <button
            onClick={handleJoin}
            disabled={loading}
            className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors relative overflow-hidden group"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-zinc-500 border-t-white animate-spin"></span>
                Joining...
              </span>
            ) : (
              <>
                <span className="relative z-10">Join Space</span>
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-zinc-700 to-zinc-600 transition-all duration-300 group-hover:w-full"></span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
