import GetSpace from "@/actions/space";
import SpaceCard from "@/app/components/spacecard/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import ClientModelContent from "./[spaceid]/ModelContent";

import { useSession } from "@/app/lib/auth-client";
import { getSession } from "@/actions/session";

export default async function Page() {
  const data = await GetSpace();
  const user = await getSession()
  console.log(user)
  console.log(data);
  return (
    <div className="w-full p-3">
      <div className=" backdrop-blur rounded-2xl shadow-xl">
        <SpaceList data={data} classname="flex" user={user.user} />
      </div>
    </div>
  );
}

function SpaceList({ data, classname,user }: { data: any; classname: string;user:any }) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data ? (
        data.map((item: any) => (
          <Dialog key={item.id}>
            <DialogTrigger className="w-full" asChild>
              <div className={`${classname} rounded-xl shadow-lg`}>
                <SpaceCard
                  spacename={item.title}
                  banner={item.banner}
                  description={item.description}
                  spaceAdmin={item.spaceAdmin[0]}
                  memberCount={item.Role}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="h-fit overflow-y-hidden bg-neutral-900/95">
              <DialogTitle className="hidden" />
              <ClientModelContent
                spacename={item.title}
                spaceid={item.id}
                description={item.description}
                image={item.banner}
                userliked={item.likes.some((like:any)=> like.id === user.id)}
                likesCount={item.likes.length}
                spaceadmin={item.spaceAdmin?.[0]?.name || "Unknown Admin"}
                adminimage={
                  item.spaceAdmin?.[0]?.image || "https://github.com/shadcn.png"
                }
              />
            </DialogContent>
          </Dialog>
        ))
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
}
function SkeletonLoader() {
  return (
    <div className="flex flex-row items-center gap-x-3">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="w-full h-52 rounded-sm" />
      ))}
    </div>
  );
}
