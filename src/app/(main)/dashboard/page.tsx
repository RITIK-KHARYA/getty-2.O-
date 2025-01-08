import GetSpace from "@/actions/space";
import { Button } from "@/app/components/Button";
import SpaceCard from "@/app/components/spacecard/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

function SpaceList({ data, classname }: { data: any; classname: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
      {data?.map((item: any) => (
        <Dialog key={item.id}>
          <DialogTrigger className="w-full">
            <div
              className={`${classname} p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
            >
              <SpaceCard
                spacename={item.title}
                banner={item.banner}
                description={item.description}
                spaceadmin={item.users}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="h-[300px]">
            <ModelContent
              spacename={item.title}
              description={item.description}
              image={item.banner}
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
    <div className="w-full p-4">
      <div className="ml-2 font-semibold shadow-sm p-5 rounded-md">
        <h2 className="text-xl font-bold mb-4">Spaces</h2>
        <SpaceList data={data} classname="flex" />
      </div>
    </div>
  );
}

const ModelContent = ({ spacename, description, image }: any) => {
  return (
    <div className="grid grid-cols-2 w-full gap-x-2">
      <div className="flex flex-col items-center justify-start gap-y-3">
        <span className="text-2xl font-bold p-2 mt-2">{spacename}</span>
        <span className="text-sm text-neutral-400">{description}</span>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48  ">
          <Image
            src={image}
            alt="Space image"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
};


