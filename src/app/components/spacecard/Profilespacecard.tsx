"use client";

import { FindSpaceById } from "@/actions/space";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface ProfilespacecardProps {
  spaceid: string;
  classname: string;
}

export default async function Profilespacecard({
  spaceid,
  classname,
}: ProfilespacecardProps) {
  const [space, setSpace] = useState<any>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSpace = async () => {
      const Space = await FindSpaceById(spaceid);
      setSpace(Space);
    };
    fetchSpace();
  }, [spaceid]);

  return (
    <div className={classname}>
      <div className="grid grid-cols-[3fr_1fr] gap-x-2"></div>
      {space ? (
        <Image
          src={space?.banner || "https://github.com/shadcn.png"}
          alt="space image"
          height={100}
          width={100}
          className="object-cover h-24 w-24 rounded-md border border-black "
        />
      ) : (
        <Skeleton className="h-24 w-24 rounded-md" />
      )}
    </div>
  );
}
