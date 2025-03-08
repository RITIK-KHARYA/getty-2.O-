import { FindSpaceById } from "@/actions/space";
import { GridSmallBackgroundDemo } from "@/components/updatedone/spacebackground";

export default async function Page({
  params,
}: {
  params: Promise<{ spaceid: string }>;
}) {
  const id = (await params).spaceid;
  const data = await FindSpaceById(id);
  if (!data) {
    console.log("bsdk andar kaise aaya tu");
  }
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <GridSmallBackgroundDemo />
      </div>
    </div>
  );
}
