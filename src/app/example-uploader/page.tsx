"use client";
import { UploadCloud } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";

export default function AttachmentButton() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploadedFiles((files) => [...acceptedFiles, ...files]);
    await startUpload(acceptedFiles);
  }, []);
  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: async () => {
      console.log("upload complete laddle");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });
  return (
    <>
      <div
        className="w-full p-6 border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md flex flex-row items-center justify-center cursor-pointer my-1"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <div className="flex flex-col items-center justify-center gap-y-1">
            <div className="w-10 h-10 border border-blue-700/[0.8] flex items-center justify-center rounded-md bg-sky-600 bg-blend-normal">
              <UploadCloud className="text-gray-200 text-2xl" />
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <span className="text-md text-neutral-400">Click to upload </span>
              <span className="text-md text-neutral-600">or drag and drop</span>
            </div>
            <span className="text-md text-neutral-600">
              PNG,JPF,PDF(max 800 x 400 px)
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
