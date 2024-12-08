"use client";

import { UploadButton } from "@/utils/uploadthing";

export default function Spacebanner() {
  return (
    <main className="flex h-[150px] flex-col items-center justify-between p-10">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
