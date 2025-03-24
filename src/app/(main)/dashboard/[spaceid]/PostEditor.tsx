import { Image } from "lucide-react";
import { useRef } from "react";

interface AddAttachmentProps {
  onFileSelected: (file: File[]) => void;
  disabled: boolean;
}

export default function AddAttachment({ onFileSelected, disabled }: AddAttachmentProps) {
  const fileinputref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        accept="image/*,video/*"
        type="file"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length > 0) {
            onFileSelected(files);
            e.target.value = "";
          }
        }}
      />
      <button
        onClick={() => {
          fileinputref.current?.click();
        }}
        disabled={disabled}
        className="bg-blue-800 text-black hover:bg-purple-900 text-bold text-center rounded-md px-4 py-2 transition-all duration-200 shadow-sm"
        about="Add Attachment"
        type="button"
      >
        <Image className="size-1/2 text-white opacity-75 hover:opacity-50" />
      </button>
    </>
  );
}
