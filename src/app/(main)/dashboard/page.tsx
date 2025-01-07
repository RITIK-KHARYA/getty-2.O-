import GetSpace, { CreateSpace } from "@/actions/space";
import SpaceCard from "@/app/components/spacecard/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import Link from "next/link";

// Separate component for the space list
function SpaceList({ data,classname }: { data: any; classname: string }) {
  return (
    <div className="flex flex-col gap-4">
      {data?.map((item: any) => (
        <div key={item.id}>
          <div className={classname}>
            <Dialog>
              <DialogTrigger asChild>
                <SpaceCard
                  spacename={item.title}
                  banner={item.banner}
                  description={item.description}
                  spaceadmin={item.users}
                />
              </DialogTrigger>
              <DialogContent>hello</DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main page component
export default async function Page() {
  const data = await GetSpace();

  return (
    <div className="w-full">
      <div className="ml-2 font-semibold shadow-sm p-5">
        <div className="rounded-md p-4 flex flex-col gap-y-2 ">
          <SpaceList data={data} classname="flex flex-col" />
        </div>
      </div>
    </div>
  );
}
