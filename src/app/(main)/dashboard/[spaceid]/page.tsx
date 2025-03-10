import { FindSpaceById } from "@/actions/space";
import { GridSmallBackgroundDemo } from "@/components/updatedone/spacebackground";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { InfoIcon } from "lucide-react";

export default async function SpacePage({
  params,
}: {
  params: { spaceid: string };
}) {
  const space = await FindSpaceById((await params).spaceid);

  if (!space) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-background p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Space not found</h2>
          <p className="text-muted-foreground mt-1">
            The space you're looking for doesn't exist or was removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <GridSmallBackgroundDemo />
      </div>

      <header className="relative z-10 flex justify-end p-4">
        <div className="flex items-center gap-3 rounded-full bg-black/10 px-4 py-2 backdrop-blur-md">
          {" "}
          <div className="flex gap-2">
            <div className="rounded-xl bg-card px-3 drop-shadow-sm shadow-lg ">
              <span className="text-xs font-medium">Members:</span>
              <span className="text-xs text-muted-foreground ml-1">
                {space.members?.length || 0}
              </span>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-xl"
                >
                  <InfoIcon size={14} />
                  <span className="text-xs">Details</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{space.title} Details</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <h3 className="text-sm font-medium">Description:</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {space.description || "No description available"}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
    </div>
  );
}
