"use client";

import { FindSpaceById } from "@/actions/space";
import { GridSmallBackgroundDemo } from "@/components/updatedone/spacebackground";
import { Send } from "lucide-react";
import { useWebSocketStore } from "@/app/hooks/use-websocket";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import GetMessage, { SendMessage } from "@/actions/message";
import { useSession } from "@/app/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Textarea } from "@/app/components/ui/textarea";
import Editor from "@/components/editor/Editor";

const generateRandomId = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();

type Message = {
  id: string;
  content: string;
  createdAt?: Date;
  userId?: string;
  image?: string;
  user?: { image?: string; name?: string };
};

export default function SpacePage() {
  const { spaceid } = useParams<{ spaceid: string }>();
  const [space, setSpace] = useState<any>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { ConnectSocket, socket } = useWebSocketStore();
  const user = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const {
  //   startUpload,
  //   attachment,
  //   isUploading,
  //   uploadProgress,
  //   removeAttachment,
  //   reset: resetMedia,
  // } = useMediaUpload();
  //got be using them later gonna make the codebase super ugly hehe

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e?.preventDefault();
    if (!input) return;

    const newMessage: Message = {
      id: generateRandomId(),
      content: input,
      userId: user.data?.user.id,
      image: user.data?.user.image || "https://github.com/shadcn.png",
    };
    setInput("");
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket?.emit("c", newMessage);
    await SendMessage({
      message: input,
      spaceid: spaceid,
      image: user.data?.user.image || "https://github.com/shadcn.png",
      userId: user.data?.user.id ?? "",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await GetMessage(spaceid);
      setMessages(
        data.messages.map((msg: Message) => ({
          ...msg,
          image: msg.user?.image,
        }))
      );
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("r", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    ConnectSocket(spaceid);
    const fetchSpace = async () => {
      const data = await FindSpaceById(spaceid);
      setSpace(data);
    };
    fetchSpace();
  }, [spaceid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!space) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-background p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Space not found</h2>
          <p className="text-muted-foreground mt-1">
            The space you're looking for doesn't exist or was removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0">
        <GridSmallBackgroundDemo />
      </div>{" "}
      <div className="flex-col flex relative   overflow-y-auto p-4 mb-20 rounded-lg">
        {messages.length > 0 ? (
          messages.map((m) => (
            <div
              className={`flex items-start px-2 py-2 gap-3 ${
                m.userId === user.data?.user.id
                  ? "justify-end"
                  : "justify-start"
              }`}
              key={m.id}
            >
              {m.userId !== user.data?.user.id && (
                <Avatar className="h-9 w-9 shadow-md border border-neutral-700 flex-shrink-0 mt-7">
                  <AvatarImage
                    src={m.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    <Skeleton className="w-9 h-9 rounded-full" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col max-w-[70%]">
                <span
                  className={`text-xs text-neutral-500 mb-1 flex truncate px-1 ${
                    m.userId === user.data?.user.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {m.userId === user.data?.user.id
                    ? "You"
                    : m.user?.name || "Member"}
                </span>
                <div
                  className={`${
                    m.userId === user.data?.user.id
                      ? "bg-neutral-800 text-white rounded-br-none"
                      : "bg-neutral-900 text-gray-100 rounded-bl-none"
                  } p-[8px] px-4 rounded-2xl shadow-sm break-words`}
                >
                  <p className="whitespace-pre-wrap"> {m.content}</p>
                  <span
                    className={`text-[10px] flex items-center  text-neutral-500 mt-1 truncate px-0 ${
                      m.userId === user.data?.user.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {new Date(m.createdAt || Date.now()).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </div>
              </div>
              {m.userId === user.data?.user.id && (
                <Avatar className="h-9 w-9 shadow-md border border-neutral-700 flex-shrink-0 mt-7">
                  <AvatarImage
                    src={m.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    <Skeleton className="w-9 h-9 rounded-full" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center p-3 w-full h-full">
            <span className="text-gray-400 text-sm font-medium">
              No messages yet
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 h-52 flex items-end"
        onSubmit={handleSubmit}
      >
        {/* <div className="w-16 -mt-1 h-7 bg-neutral-900  flex items-center justify-center rounded-tl-lg right-0 top-0 fixed rounded-r-lg space-x-2 gap-2">
          <AddAttachment
            onFileSelected={startUpload}
            disabled={!input || isUploading}
          />
        </div> */}
        {/*  here another component using would be placed  */}

        <>
          <Editor
          key={input}
          onChange={()=>{console.log()}}
            handlekeydown={handleKeyDown}
            setInput={setInput}
            input={input}
            className="w-full"
          />
        </>
      </form>
    </div>
  );
}
