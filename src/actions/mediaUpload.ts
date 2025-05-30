"use client";
import { useToast } from "@/app/hooks/use-toast";
import { useUploadThing } from "@/utils/uploadthing";
import { set } from "better-auth/*";
import { useState } from "react";
import { UTApi } from "uploadthing/server";
// import deleteAttachment from "./mediadeletion";

export interface attachment {
  mediaId?: string;
  isUploading: boolean;
  file: File;
  url?: string;
}

export default function useMediaUpload() {
  const { toast } = useToast();
  const [uploadProgress, setuploadProgress] = useState<number>();
  const [attachment, setAttachment] = useState<attachment[]>([]);
  console.log("attachment", attachment);
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
           ...renamedfiles.map((file) => ({ file, isUploading: true})
         ),
         ...prev,
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
          variant: "default",
          description: "uploading",
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
    // await deleteAttachment(currentAttachment?.mediaId || "");
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
      setAttachment
    };
  
}
