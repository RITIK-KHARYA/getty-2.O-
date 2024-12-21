import { UploadCloud } from "lucide-react";
import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import AttachmentPreview from "../components/preview/previewcard";
import useMediaUpload from "@/actions/cardmediaupload";
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
              <div className="w-10 h-10 border border-blue-700/[0.8] flex items-center justify-center rounded-md bg-sky-600 bg-blend-normal">
                <UploadCloud className="text-gray-200 text-2xl" />
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
                PNG,JPF,PDF(max 800 x 400 px)
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
