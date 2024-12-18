"use server";
import prisma from "@/app/lib";
import { UTApi } from "uploadthing/server";

export default async function deleteAttachment(fileName: string) { 

  const media = await prisma.media.findUnique({
    where: {
      filename: fileName,
    }
  });
  if (!media) {
    throw new Error("Media not found");
  }
  const deleteurl = await prisma.media.delete({
    where: {
      id: media.id
    }
  });
const urlToDelete = deleteurl.originalurl.split("/f/")[1];
 await new UTApi().deleteFiles(urlToDelete);

}





