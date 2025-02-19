import GetSpace from "@/actions/space";
import { GridSmallBackgroundDemo } from "@/components/updatedone/spacebackground";

export default async function Page({
  params,
}: {
  params: Promise<{ spaceid: string }>;
}) {
  const id = (await params).spaceid;
  const data = GetSpace();
  try {
    
  } catch (error) {
    throw new Error("unable to get space");
  }
  return (
    <div>
      <GridSmallBackgroundDemo />
    </div>
  );
}
