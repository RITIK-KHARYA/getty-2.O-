import useMediaUpload, { attachment } from "@/actions/mediaUpload";
import { useDropzone } from "@uploadthing/react";
import { ArrowUp, File, PlusCircle, Send } from "lucide-react";
import {
  useEditor,
  EditorContent,
  useEditorState,
  Editor,
} from "@tiptap/react";
import {
  useCallback,
  ClipboardEvent,
  useState,
  useRef,
  SetStateAction,
  Dispatch,
} from "react";
import { Placeholder } from "@tiptap/extension-placeholder";
import Focus from "@tiptap/extension-focus";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { cn } from "@/lib/utils";
import { AttachmentPreviews } from "@/app/components/preview/previewcard";
import StarterKit from "@tiptap/starter-kit";
import EmojiPicker from "../EmojiPicker";
import { useWebSocketStore } from "@/app/hooks/use-websocket";
import { Message } from "@/app/(main)/dashboard/[spaceid]/page";
import { useSession } from "@/app/lib/auth-client";
import { SendMessage } from "@/actions/message";
import { MediaType } from "@prisma/client";
const generateRandomId = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();
interface EditorProps {
  className?: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  spaceId: string;
}

export default function MyEditor({
  className,
  setMessages,
  spaceId,
}: EditorProps) {
  const [input, setInput] = useState("");
  const { ConnectSocket, socket } = useWebSocketStore();
  const user = useSession();
  const editor = useEditor({
    immediatelyRender: false,
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

    onContentError: (err) => console.log(err),

    onUpdate: ({ editor }) => {
      setInput(editor.getText());
      console.log("clicked", editor.getText());
    },
  });

  const fileinputref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    startUpload,
    attachment,
    routeConfig,
    removeAttachment,
    uploadProgress,
    isUploading,
    setAttachment,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      startUpload(acceptedFiles);
    },
    [startUpload]
  );

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

  const handleMediaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("clicked");
    return fileinputref.current?.click();
  };
  const handleSubmit = async () => {
    if (!input) return;

    const newMessage: Message = {
      id: generateRandomId(),
      content: input,
      userId: user.data?.user.id,
      media: attachment.map((item) => {
        return {
          Mediatype: item.file.type.startsWith("image")
            ? MediaType.IMAGE
            : MediaType.VIDEO,
          url: item.url,
          filename: item.file.name,
          originalurl: item.url,
        };
      }),
      user: {
        image: user.data?.user.image || "https://github.com/shadcn.png",
        name: user.data?.user.name,
      },
    };
    setInput("");
    setAttachment([]);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket?.emit("c", newMessage);
    const message = {
      message: input,
      spaceid: spaceId,
      media: attachment.map((item) => {
        return {
          Mediatype: item.file.type.startsWith("image")
            ? MediaType.IMAGE
            : MediaType.VIDEO,
          url: item.url,
          filename: item.file.name,
          originalurl: item.url,
        };
      }),
      user: {
        name: user.data?.user.name,
        image: user.data?.user.image,
      },
    };
    console.log("befre", message);
    await SendMessage(message);
  };

  return (
    <form
      className={cn(`mt-auto mb-3 mx-auto h-52 flex items-end`, { className })}
      onSubmit={handleFormSubmit}
    >
      <div className={className} {...rootProps}>
        <div
          {...getInputProps}
          className=" p-2 z-10 flex items-center bg-transparent shadow-lg rounded-xl"
        ></div>

        <input
          ref={fileinputref}
          onChange={(e) => {
            e.preventDefault();
            const files = Array.from(e.target.files || []);
            if (files.length > 0) {
              setSelectedFiles(files);
              startUpload(files);
              e.target.value = "";
            }
          }}
          disabled={isUploading}
          style={{ display: "none" }}
          type="file"
          accept="image/*,video/*"
        />

        <div className="flex items-stretch justify-end bg-neutral-800 p-3 h-full rounded-2xl shadow-lg w-full space-x-2">
          <div className="h-full flex items-center">
            <button onClick={handleMediaClick} className="flex items-center ">
              {" "}
              <PlusCircle className="w-6 h-6 font-bold opacity-80 text-neutral-400" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <EditorContent
              editor={editor}
              onError={(e) => console.log(e)}
              data-placeholder="Write something..."
              className={cn(
                "relative text-white w-full rounded-none border-none focus-outline-none focus:ring-0 overflow-y-auto",
                onerror ? "border-red-600" : "",
                isDragActive ? "border-violet-600" : ""
              )}
              onPaste={onPaste}
            />
            <div className="flex items-center gap-x-2">
              <>
                {isUploading
                  ? attachment.map((a) => (
                      <div className="flex-row ">
                        <div className=" flex h-16 w-16 items-center justify-center">
                          <AttachmentPreviews
                            key={a.file.name}
                            attachments={[a]}
                            onremoveclick={removeAttachment}
                          />
                        </div>
                      </div>
                    ))
                  : attachment.length > 0 &&
                    attachment.map((a) => (
                      <div className=" flex-row ">
                        <div className=" flex items-center justify-center h-16 w-16">
                          <AttachmentPreviews
                            key={a.file.name}
                            attachments={[a]}
                            onremoveclick={removeAttachment}
                          />
                        </div>
                      </div>
                    ))}
              </>
            </div>
          </div>
          <div className="flex flex-col space-y-2 ">
            <button className="bg-neutral-700 h-8 rounded-lg shadow-lg "> 
              <EmojiPicker
                onChange={(emoji) => {
                  editor?.commands.insertContent(emoji);
                }}
              />
            </button>

            <button
              className={cn(
                `flex bg-neutral-700/90 text-white items-center justify-center h-8 w-8 rounded-full`,
                isUploading && "opacity-50 cursor-not-allowed"
              )}
              type="submit"
              disabled={!editor?.getText().trim() || isUploading}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
