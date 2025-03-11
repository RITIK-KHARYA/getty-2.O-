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
                  memberCount={10}
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
        <Skeleton key={i} className="w-full h-52 rounded-lg" />
      ))}
    </div>
  );
}



