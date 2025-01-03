import GetSpace, { CreateSpace } from "@/actions/space";
import SpaceCard from "@/app/components/spacecard/card";
import Link from "next/link";

export default async function Page() {
  const data = await GetSpace();

  return (
    <div className="">
      <div className="ml-2 font-semibold shadow-sm w-full p-5 ">
        <div className="flex flex-col ">
          <div className="rounded-md p-4 flex flex-row gap-y-4 ">
            <div className=" gap-x-4 gap-y-4 flex flex-wrap grow">
              {data?.map((item) => (
                <div className="">
                  <div className=" gap-x-2 space-auto ">
                    <Link
                    href={`/spaceid/${item.id}`}>
                      <SpaceCard
                        spacename={item.title}
                        banner={item.banner}
                        description={item.description}
                        spaceadmin={item.users}
                      />
                    </Link>
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
