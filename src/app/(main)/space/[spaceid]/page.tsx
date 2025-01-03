export default async function Page({ params }: { params: Promise<{ spaceid: string }> }) {
    const space = (await params).spaceid;
    return <div>{space}</div>;
}