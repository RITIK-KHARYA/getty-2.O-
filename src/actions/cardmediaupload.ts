"use client";
import { useToast } from "@/app/hooks/use-toast";
import { useUploadThing } from "@/utils/uploadthing";
import { useState } from "react";
import { UTApi } from "uploadthing/server";
import deleteAttachment from "./delete";
// import deleteAttachment from "./delete";

export interface attachment {
  mediaId?: string;
  isUploading: boolean;
  file: File;
  url?: string;
}

export default function useMediaUpload(onChange:(value:string)=> void) {
  const { toast } = useToast();
  const [uploadProgress, setuploadProgress] = useState<number>();
  const [attachment, setAttachment] = useState<attachment[]>([]);
  const { startUpload, isUploading, routeConfig } = useUploadThing(
    "bannerUploader",
    {
      onBeforeUploadBegin: (files) => {
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

        return renamedfiles;
      },
      onUploadProgress: setuploadProgress,
      onClientUploadComplete(res) {
        setAttachment((prev) =>
          prev.map((a) => {
            const uploadResult = res.find((r) => r.name === a.file.name);
            if (!uploadResult) return a;

            console.log(uploadResult);

            return {
              ...a,
              url: uploadResult.url,
              mediaId: uploadResult.serverData.uploadedBy,
              isUploading: false,
            };
          })
        );
        onChange(res.map((r) => r.url).toString());
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
    const currentAttachment = attachment.find((a) => a.file.name === fileName);
    setAttachment((prev) => prev.filter((a) => a.file.name !== fileName));
    await deleteAttachment(currentAttachment.url);
    onChange("");
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
