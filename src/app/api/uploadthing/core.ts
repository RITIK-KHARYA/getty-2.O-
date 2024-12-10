import { getSession } from "@/actions/session";
import prisma from "@/app/lib";
import { MediaType } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req: Request) => {
  const session = await getSession();
  const user = session?.user;
  return { user };
};

export const ourFileRouter = {
  media: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      console.log("user", user);
      return { user };
    })
    .onUploadComplete(async ({ file }) => {
      const media = await prisma.media.create({
        data: {
          type: file.type.startsWith("image")
            ? MediaType.IMAGE
            : MediaType.VIDEO,

          url: file.url,
          updatedAt: new Date(),
        },
      });
      console.log("file", media);
      return { file };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
