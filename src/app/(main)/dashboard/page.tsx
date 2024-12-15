import { ProfileForm } from "@/app/components/custom/custom-dialog";

import GetSpace, { CreateSpace } from "@/actions/space";
import SpaceCard from "@/app/components/spacecard/card";
import FindSpaceDialog from "@/app/components/findspacedialog/findspacedialog";

export default async function Page() {
  const data = await GetSpace();


  return (
    <div className="">
      <div className="ml-2 font-semibold shadow-sm">

        <div className="flex flex-col w-full">
          <div className="border border-neutral-400 rounded-md p-4 flex flex-row gap-y-4">
            <div className=" grid grid-cols-3 gap-4">
              {data?.map((item: any) => (
                <div className="">
                  <div className=" gap-x-2 space-auto ">
                    <SpaceCard spacename={item.title}  />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    
      </div>
    </div>
  );
}
