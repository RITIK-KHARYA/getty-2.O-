import GetSpace, { CreateSpace } from "@/actions/space";
import SpaceCard from "@/app/components/spacecard/card";

export default async function Page() {
  const data = await GetSpace();

  return (
    <div className="">
      <div className="ml-2 font-semibold shadow-sm w-full">
        <div className="flex flex-col ">
          <div className="rounded-md p-4 flex flex-row gap-y-4 ">
            <div className=" gap-x-4 gap-y-4 flex flex-wrap ">
              {data?.map((item: any) => (
                <div className="">
                  <div className=" gap-x-2 space-auto ">
                    <SpaceCard
                      spacename={item.title}
                      banner={item.banner}
                      description={item.description}
                      spaceadmin={item.userid}
                    />
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
