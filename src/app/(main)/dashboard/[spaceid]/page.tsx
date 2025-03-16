"use client";

import { FindSpaceById } from "@/actions/space";
import { GridSmallBackgroundDemo } from "@/components/updatedone/spacebackground";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { InfoIcon, PlusIcon, Send } from "lucide-react";
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      </div>

      {/* <header className="relative z-10 flex justify-end p-4">
        <div className="flex items-center gap-3 rounded-full bg-black/10 px-4 py-2 backdrop-blur-md">
          <h1 className="text-xl font-bold text-primary">{space.name}</h1>

          <div className="flex gap-2">
            <div className="rounded-xl bg-card px-3 drop-shadow-sm shadow-lg">
              <span className="text-xs font-medium">Members:</span>
              <span className="text-xs text-muted-foreground ml-1">
                {space.members?.length || 0}
              </span>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-xl"
                >
                  <InfoIcon size={14} />
                  <span className="text-xs">Details</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{space.name} Details</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <h3 className="text-sm font-medium">Description:</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {space.description || "No description available"}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header> */}

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
                <span className={`text-xs text-neutral-500 mb-1 flex truncate px-1 ${m.userId === user.data?.user.id ? "justify-end" : "justify-start"}`}>
                  {m.userId === user.data?.user.id ? "You" : m.user?.name || "Member"}
                </span>
                <div
                  className={`${
                    m.userId === user.data?.user.id
                      ? "bg-neutral-800 text-white rounded-br-none"
                      : "bg-neutral-900 text-gray-100 rounded-bl-none"
                  } p-[8px] px-4 rounded-2xl shadow-sm break-words`}
                >
                  <p className="whitespace-pre-wrap"> {m.content}</p>
                  <span className={`text-[10px] flex items-center  text-neutral-500 mt-1 truncate px-0 ${m.userId === user.data?.user.id ? "justify-end" : "justify-start"}`}>
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
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center bg-neutral-900 p-3 rounded-lg shadow-lg w-full">
          <input
            className="flex-1 bg-transparent border-none text-white focus:ring-0 outline-none"
            value={input}
            placeholder="Type something..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="ml-2 bg-violet-800/40 text-white flex items-center justify-center h-10 w-10 rounded-full"
            type="submit"
            disabled={!input}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
