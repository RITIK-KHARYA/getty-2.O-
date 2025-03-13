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
import { InfoIcon, PlusIcon } from "lucide-react";
import { useWebSocketStore } from "@/app/hooks/use-websocket";
import { useState, FormEvent, useEffect, KeyboardEvent } from "react";
import { useParams } from "next/navigation";
import GetMessage, { SendMessage } from "@/actions/message";
const generateRandomId = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();

type Message = {
  id: string;
  content: string;
};

export default function SpacePage() {
  const { spaceid } = useParams<{ spaceid: string }>();
  const [space, setSpace] = useState<any>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { ConnectSocket, socket } = useWebSocketStore();

  const handleSubmit = async (e?: any) => {
    e.preventDefault();
    socket?.emit("c", input);
    if (!input) return;
    const data = {
      message: input,
      spaceid: spaceid,
    };

     await SendMessage(data);

    setInput("");
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleMessage = async () => {
    const data = await GetMessage(spaceid);

    setMessages(data.messages);
  };
  useEffect(() => {
    handleMessage();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("r", (data: string) => {
      const message = {
        id: generateRandomId(),
        content: data,
      };
      setMessages((prevMessages) => [...prevMessages, message]);
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
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <GridSmallBackgroundDemo />
      </div>

      <header className="relative z-10 flex justify-end">
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
      </header>

      <div className=" relative flex flex-col text-green-200 p-4  ">
        {messages.length > 0 ? (
          messages.map((m) => <span key={m.id}>{m.content.trim()}</span>)
        ) : (
          <p>No messages found.</p>
        )}
      </div>

      <form
        className="fixed bottom-0 lg:right-[30%] md:right-[30%] sm:right-[10%] p-4 w-[500px] inline-flex"
        onSubmit={handleSubmit}
      >
        <div className=" p-4 w-[80%] inline-flex">
          <input
            className="border border-neutral-800 p-2 rounded w-[90%]"
            value={input}
            placeholder="Type something..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="ml-2 bg-neutral-800 text-white flex items-center justify-center h-10 w-10 rounded-full"
            type="submit"
            disabled={!input}
          >
            <PlusIcon className="h-4 w-4 " />
          </button>
        </div>
      </form>
    </div>
  );
}
