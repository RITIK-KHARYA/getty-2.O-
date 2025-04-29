"use client";

import { FindSpaceById } from "@/actions/space";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface ProfilespacecardProps {
  spaceid: string;
  classname?: string;
}

export default async function Profilespacecard({
  spaceid,
  classname,
}: ProfilespacecardProps) {
  const [space, setSpace] = useState<any>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSpace = async () => {
      setisLoading(true);
      const Space = await FindSpaceById(spaceid);
      setSpace(Space);
      console.log(Space,"space here si");
      setisLoading(false);
    };
    fetchSpace();
  }, [spaceid]);

  return (
    <div className="rounded-md border border-neutral-600 p-2 bg-neutral-900 w-full h-full">
      <div className="grid grid-cols-[3fr_1fr] gap-x-2">
        <div className="flex flex-col gap-2 space-y-2">
          <span className="text-sm text-muted-foreground text-green-200">
            created at:{" "}
            {space ? (
              space?.createdAt &&
              new Date(space.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            ) : (
              <Skeleton className="h-4 w-24 rounded-md" />
            )}
          </span>
          <p className="font-bold text-lg">{space?.name}</p>
          <p className="text-sm text-neutral-400">{space?.description}</p>
        </div>
        {space ? (
          <Image
            src={space?.image || "https://github.com/shadcn.png"}
            alt="space image"
            height={100}
            width={100}
            className="object-cover h-24 w-24 rounded-md border border-black "
          />
        ) : (
          <Skeleton className="h-24 w-24 rounded-md" />
        )}
      </div>
    </div>
  );
}
