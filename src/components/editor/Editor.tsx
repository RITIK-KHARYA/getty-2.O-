import useMediaUpload from "@/actions/mediaUpload";
import { Textarea } from "@/app/components/ui/textarea";
import { useDropzone } from "@uploadthing/react";
import { Bold, Italic, Send } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useCallback } from "react";
import { Placeholder } from "@tiptap/extension-placeholder";
import { ClipboardEvent, useEffect, useRef } from "react";
import Focus from '@tiptap/extension-focus'
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import Tiptap from "./TipTap";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import AttachmentPreview from "@/app/components/preview/previewcard";

interface EditorProps {
  input: string;
  setInput: (value: string) => void;
  className: string;
  handlekeydown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function Editor({
  input,
  setInput,
  className,
  handlekeydown: handleKeyDown,
  onChange,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        italic: false,
        bold: false,
      }),
      Focus.configure({
        mode: "deepest",
      }),
      Placeholder.configure({
        placeholder: "What's on your mind...",
      }),
    ],
  });

  const Input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

    // using the props passing the useffect handlekeydown for the handlesubmit function in page[spaceid].tsx

  const {
    startUpload,
    attachment,
    routeConfig,
    removeAttachment,
    isUploading,
  } = useMediaUpload(onChange);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    startUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

//   const handleSubmit = () => {
//     editor?.commands.submit();
//   };

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const files = Array.from(e.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile()) as File[];
    startUpload(files);
  }

  const { onClick, ...rootProps } = getRootProps();

  return (
    <div className={className} {...rootProps}>
      <div className="flex items-center bg-neutral-900 p-3 rounded-lg shadow-lg w-full">
        {/* <Textarea
          className="flex-1 bg-transparent border-none text-white focus:ring-0 outline-none h-min-[40px] resize-none"
          value={input}
          placeholder="Type something..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        /> */}
        <div>
          {!!attachment.length && (
            <AttachmentPreview
              Attachment={attachment}
              key={attachment[0].file.name}
              onRemoveclick={removeAttachment}
            />
          )}
        </div>
        <div className={className}>
          <EditorContent
            editor={editor}
            className={cn(
              "text-white w-full rounded-md border border-neutral-800/80 h-16 resize-none flex-1 bg-transparent",
              isDragActive ? "border-violet-600" : "border-neutral-800/80"
            )}
            onPaste={onPaste}
          />
          <input {...getInputProps()} />
        </div>

        <button
          className="ml-2 bg-violet-800/40 text-white flex items-center justify-center h-10 w-10 rounded-full"
          type="submit"
          disabled={!input || isUploading}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
