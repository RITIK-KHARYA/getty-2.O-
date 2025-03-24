import { Image, Upload, UploadCloud } from "lucide-react";
import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import AttachmentPreview from "../components/preview/previewcard";
import useMediaUpload from "@/actions/mediaUpload";
import { cn } from "../lib/utils";
interface Attachmentpreviewsprops {
  onChange: (value: string) => void;
  value: string | undefined;
}
export default function AttachmentButton({
  onChange,
}: Attachmentpreviewsprops) {
  const { startUpload, attachment, routeConfig, removeAttachment } =
    useMediaUpload(onChange);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    startUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  return (
    <>
      <div
        className="w-full p-6 border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md flex flex-row items-center justify-center cursor-pointer my-1 h-[10rem]"
        {...getRootProps()}
      >
        <input {...getInputProps()} disabled={attachment.length > 0} />
        {attachment.length === 0 ? (
          <div>
            <div className="flex flex-col items-center justify-center gap-y-1">
              <div className="w-10 h-10  flex items-center justify-center bg-blend-normal">
                <Upload className="text-white text-3xl  " />
              </div>
              <div className="flex flex-row items-center gap-x-1">
                <span className="text-md text-neutral-400">
                  Click to upload{" "}
                </span>
                <span className="text-md text-neutral-600">
                  or drag and drop
                </span>
              </div>
              <span className="text-md text-neutral-600">
                PNG only(max 800 x 400 px)
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-1 p-10 size-7/12">
            {attachment.map((attachment) => (
              <AttachmentPreview
                key={attachment.file.name}
                Attachment={attachment}
                onRemoveclick={removeAttachment}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export function AttachmentIcon({ onChange, value }: Attachmentpreviewsprops) {
  const { startUpload, attachment, routeConfig, removeAttachment } =
    useMediaUpload(onChange);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    startUpload(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} disabled={attachment.length > 0} />
      <button
        onClick={() => {}}
        disabled={attachment.length > 5}
        className="w-full h-full flex items-center justify-center"
      >
        <Image className="size-2/3 text-white opacity-50" />
      </button>

      <div
        className={cn(
          "flex flex-col items-center justify-center gap-y-1 p-2 size-fit",
          attachment.length > 1 && "sm:grid sm:grid-cols-2"
        )}
      >
        {attachment.map((attachment) => (
          <AttachmentPreview
            key={attachment.file.name}
            Attachment={attachment}
            onRemoveclick={removeAttachment}
          />
        ))}
      </div>
    </div>
  );
}
