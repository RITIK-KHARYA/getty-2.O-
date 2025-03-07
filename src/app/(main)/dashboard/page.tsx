import GetSpace from "@/actions/space";
import SpaceCard from "@/app/components/spacecard/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { ButtonProps } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Image from "next/image";

export default async function Page() {
  const data = await GetSpace();

  return (
    <div className="w-full p-3">
      <div className=" backdrop-blur rounded-2xl shadow-xl">
        <SpaceList data={data} classname="flex" />
      </div>
    </div>
  );
}

function SpaceList({ data, classname }: { data: any; classname: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.map((item: any) => (
        <Dialog key={item.id}>
          <DialogTrigger className="w-full" asChild>
            <div className={`${classname}  rounded-xl shadow-lg`}>
              <SpaceCard
                spacename={item.title}
                banner={item.banner}
                description={item.description}
                spaceAdmin={item.spaceAdmin[0]}
                memberCount={10}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="h-fit overflow-y-hidden bg-neutral-900/95">
            <ModelContent
              spacename={item.title}
              description={item.description}
              image={item.banner}
              spaceadmin={item.spaceAdmin?.[0]?.name || "Unknown Admin"}
              adminimage={item.spaceAdmin?.[0]?.image || " https://github.com/shadcn.png"}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

interface ModelContentProps {
  spacename: string;
  description: string;
  image?: string;
  adminimage:string
  spaceadmin?: string;
}

function ModelContent({
  spacename,
  description,
  image,
  spaceadmin,
  adminimage
}: ModelContentProps) {
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
        <div className="bg-[#1A1A1A]/50 rounded-2xl p-4">
          <h2 className="font-mono text-white text-xl tracking-wide">
            {spacename}
          </h2>
        </div>

        {description && (
          <div className="bg-[#1A1A1A]/50 rounded-2xl p-4">
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
            <button
              className="p-2.5 hover:bg-[#1A1A1A] rounded-full transition-colors"
              aria-label="Like space"
            >
              <Heart className="w-5 h-5 text-rose-500" />
            </button>
            <button className="px-8 py-2.5 bg-[#1A1A1A] hover:bg-[#252525] rounded-md text-white transition-colors font-mono">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
