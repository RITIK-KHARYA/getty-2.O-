import useMediaUpload from "@/actions/mediaUpload";
import { useDropzone } from "@uploadthing/react";
import { File, Icon, Send, Smile } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useCallback, ClipboardEvent, useState } from "react";
import { Placeholder } from "@tiptap/extension-placeholder";
import Focus from "@tiptap/extension-focus";

import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { cn } from "@/lib/utils";
import AttachmentPreview, {
  AttachmentPreviews,
} from "@/app/components/preview/previewcard";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import StarterKit from "@tiptap/starter-kit";
import EmojiPicker from "../EmojiPicker";

interface EditorProps {
  input: string;
  setInput: (value: string) => void;
  className: string;
  onchange: (value: string) => void;
  handleSubmit: () => void;
}

export default function Editor({
  className,
  input,
  setInput,
  onchange,
  handleSubmit,
}: EditorProps) {
  const editor = useEditor({
    immediatelyRender: false, //hydration mismatches
    autofocus: true,
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "is-editor-empty",
          },
        },
      }),
      Focus.configure({ mode: "shallowest" }),
      Placeholder.configure({
        placeholder: "Write something...",
        showOnlyWhenEditable: true,
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "h-16 text-sm outline-none ring-0 ring-offset-0 focus:ring-0 focus:outline-none",
      },
    },
    content: input,

    onUpdate: ({ editor }) => {
      setInput(editor.getText());
    },
  });
  const [open, setOpen] = useState(false);
  const {
    startUpload,
    attachment,
    routeConfig,
    removeAttachment,
    isUploading,
  } = useMediaUpload(onchange);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      startUpload(acceptedFiles);
    },
    [startUpload]
  );

  //the image is being upload now but preview is not working

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const files = Array.from(e.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile()) as File[];
    startUpload(files);
  }
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editor) return;
    handleSubmit();
    editor.commands.clearContent();
  };
  const { onClick, ...rootProps } = getRootProps();

  return (
    <form
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md p-2 mb-2 h-52 flex items-end"
      onSubmit={handleFormSubmit}
    >
      <div className={className} {...rootProps}>
        <div
          {...getInputProps}
          className="fixed right-2 space-x-2 bg-neutral-800/90 p-1 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-none top-[4.9rem] flex items-center justify-center"
        >
          <File className="opacity-90" size={20} />

          <EmojiPicker
            onChange={(e) => {
              if (!editor) return;
              editor.chain().focus().insertContent(e).run();
            }}
          />
        </div>
        <div className="flex items-center gap-x-2">
          {!!attachment.length &&
            attachment.map((a) => (
              <div className="flex flex-row h-16 w-16 rounded-none">
                <AttachmentPreviews
                  key={a.file.name}
                  attachments={[a]}
                  onremoveclick={removeAttachment}
                />
              </div>
            ))}
        </div>

        <div className="flex items-center bg-neutral-900 p-3 rounded-2xl shadow-lg w-full space-x-2">
          <div className="flex-1 overflow-hidden">
            <EditorContent
              editor={editor}
              data-placeholder="Write something..."
              className={cn(
                "text-white w-full rounded-none border-none focus-outline-none focus:ring-0 max-h-[400px] overflow-y-auto",
                isDragActive ? "border-violet-600" : ""
              )}
              onPaste={onPaste}
            />
          </div>

          <button
            className={cn(
              ` bg-blue-800 text-white flex items-center justify-center h-8 w-8 rounded-full`,
              isUploading && "opacity-50 cursor-not-allowed"
            )}
            type="submit"
            // onClick={(e) => e.stopPropagation()}

            disabled={!editor?.getText().trim() || !!isUploading}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
