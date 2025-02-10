"use server";
import { UTApi } from "uploadthing/server";

export default async function deleteAttachment(fileName: string) {
    try {
     console.log("pussy",fileName)
      await new UTApi().deleteFiles(fileName.split("/f/"));
  } catch (error) {
    throw new Error("unable to delete attachment");
  }
}



