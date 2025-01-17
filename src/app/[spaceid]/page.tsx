import { GridSmallBackgroundDemo } from "@/components/updatedone/spacebackground";

export default async function Page({
  params,
}:{
  params: Promise<{ spaceid: string }>
}) {
  const id = (await params).spaceid
  return (
    <div>
      <GridSmallBackgroundDemo />
    </div>
  );
}
