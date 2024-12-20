import prisma from "@/app/lib";
import { MediaType } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  bannUploader: f({
    image: { maxFileSize: "4MB", minFileCount: 1, maxFileCount: 4 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const spae = await prisma.media.create({
        data: {
          filename: file.name,
          originalurl: file.url,
          type: file.type.startsWith("image")
            ? MediaType.IMAGE
            : MediaType.VIDEO,
          url: file.url.replace("/f/", `/a/${process.env.UPLOADTHING_API_ID}`),

          updatedAt: new Date(),
        },
      });
      console.log("originalurl ", media.originalurl);
      console.log("new media created", media);
      console.log("media id", media.id);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
