import GetSpace from "@/actions/space";
import { Button } from "@/app/components/Button";
import SpaceCard from "@/app/components/spacecard/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { ButtonProps } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import Image from "next/image";

function SpaceList({ data, classname }: { data: any; classname: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.map((item: any) => (
        <Dialog key={item.id}>
          <DialogTrigger className="w-full">
            <div className={`${classname}  rounded-xl shadow-lg`}>
              <SpaceCard
                spacename={item.title}
                banner={item.banner}
                description={item.description}
                spaceadmin={item.users}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto bg-neutral-900/95 backdrop-blur-lg">
            <ModelContent
              spacename={item.title}
              description={item.description}
              image={item.banner}
              spaceadmin={item.users}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

export default async function Page() {
  const data = await GetSpace();

  return (
    <div className="w-full p-3">
      <div className=" backdrop-blur rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-neutral-100">Spaces 🚀</h2>
        <SpaceList data={data} classname="flex" />
      </div>
    </div>
  );
}

const ModelContent = ({ spacename, description, image, spaceadmin }: any) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          <span className="text-2xl font-bold p-3 bg-neutral-800/60 rounded-xl text-neutral-100">
            {spacename}
          </span>
          <span className="text-sm text-neutral-300 bg-neutral-800/60 p-4 rounded-xl leading-relaxed">
            {description}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-56 h-56">
            <Image
              src={image}
              alt="Space image"
              fill
              className="object-cover rounded-xl shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 pt-4 border-t border-neutral-700">
        <Tooltip>
          <Avatar className="h-10 w-10 ring-2 ring-neutral-700">
            <AvatarFallback>
              <Skeleton className="h-10 w-10 rounded-full" />
            </AvatarFallback>
            <AvatarImage src={spaceadmin.image} />
          </Avatar>

          <TooltipContent className="bg-neutral-800 text-neutral-100">
            {spaceadmin}
          </TooltipContent>
        </Tooltip>
        <CustomButton className="hover:bg-neutral-700 transition-colors  duration-200 font-thin">
          Connect
        </CustomButton>
      </div>
    </div>
  );
};

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const CustomButton = ({
  isLoading,
  children,
  className,
  disabled,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-neutral-800/80 text-sm text-neutral-100 rounded-lg px-6 py-2 font-medium",
        "hover:bg-neutral-700/80 transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading || disabled}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
