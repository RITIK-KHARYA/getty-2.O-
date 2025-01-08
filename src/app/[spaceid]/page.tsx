import { GridSmallBackgroundDemo } from "@/components/updatedone/spacebackground";

export default async function Page({
  params,
}: {
  params: { spaceid: string };
}) {
  const space = params.spaceid;
  return (
    <div>
      <GridSmallBackgroundDemo />
    </div>
  );
}
