"use client";
import { useToast } from "@/app/hooks/use-toast";
import { useUploadThing } from "@/utils/uploadthing";
import { useState } from "react";
import { UTApi } from "uploadthing/server";
import deleteAttachment from "./delete";

export interface attachment {
  mediaId?: string;
  isUploading: boolean;
  file: File;
}

export default function useMediaUpload() {
  const { toast } = useToast();
  const [uploadProgress, setuploadProgress] = useState<number>();
  const [attachment, setAttachment] = useState<attachment[]>([]);
  console.log(attachment);
  const { startUpload, isUploading, routeConfig } = useUploadThing(
    "imageUploader",
    {
      onBeforeUploadBegin: (files) => {
        console.log("files", files);
        const renamedfiles = files.map((file) => {
          const extension = file.name.split(".").pop();
          return new File(
            [file],
            `attachment_${crypto.randomUUID()}.${extension}`,
            {
              type: file.type,
            }
          );
        });
        setAttachment((prev) => [
          ...prev,
          ...renamedfiles.map((file) => ({ file, isUploading: true })),
        ]);
        console.log(renamedfiles);

        return renamedfiles;
      },
      onUploadProgress: setuploadProgress,
      onClientUploadComplete(res) {
        setAttachment((prev) =>
          prev.map((a) => {
            const uploadResult = res.find((r) => r.name === a.file.name);
           console.log("upload result",uploadResult);
            if (!uploadResult) return a;

            return {
              ...a,
              mediaId: uploadResult.serverData.uploadedBy,
              isUploading: false,
            };
          })
        );
      },
      onUploadError(e) {
        setAttachment((prev) => prev.filter((a) => !a.isUploading)); //this is for the checking so that no file is getting uploaded
        toast({
          variant: "destructive",
          description: e.message,
        });
      },
      onUploadBegin: () => {
        toast({
          variant: "destructive",
          description: "upload has begun",
        });
      },
    }
  );
  function handleStartUpload(files: File[]) {
    if (isUploading) {
      toast({
        variant: "destructive",
        description: "please wait uploading is in process",
      });
      return;
    }
    if (attachment.length + files.length > 5) {
      toast({
        variant: "destructive",
        description: "You can only upload up to 5 attachments per post.",
      });
      return;
    }

    startUpload(files);
  }
  async function removeAttachment(fileName: string) {
    console.log("attachment",attachment);
    setAttachment((prev) => prev.filter((a) => a.file.name !== fileName));
    await deleteAttachment(fileName)
  }
    function reset() {
      setAttachment([]);
      setuploadProgress(undefined);
    }
    return {
      routeConfig,
      startUpload: handleStartUpload,
      attachment,
      isUploading,
      uploadProgress,
      removeAttachment,
      reset,
    };
  
}
