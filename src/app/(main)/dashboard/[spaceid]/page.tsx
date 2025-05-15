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
import Image from "next/image";
import MyEditor from "@/components/editor/Editor";
import { attachment } from "@/actions/mediaUpload";
import { MediaType } from "@prisma/client";



export type Message = {
  id: string;
  content: string;
  createdAt?: Date;
  userId?: string;
  media?: {
    url: string;
    Mediatype: MediaType;
  }[],
  user?: { image?: string; name?: string };
};


export default function SpacePage() {
  const { spaceid } = useParams<{ spaceid: string }>();
  const [space, setSpace] = useState<any>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const { ConnectSocket, socket } = useWebSocketStore();
  const user = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
 //TODO : move the handlesubmit to the editor state
 

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await GetMessage(spaceid);
      console.log(data);
      setMessages(
        data.messages.map((msg: Message) => ({
          ...msg,
          user: {
            image: msg.user?.image,
            name: msg.user?.name,
          },
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
      <div className="flex-col flex relative overflow-y-auto p-4 mb-20 rounded-lg">
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
                    src={m.user.image || "https://github.com/shadcn.png"}
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
                  <div>
                    {m.media && m.media.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {m.media.map((attachment) => {
                          console.log(attachment);
                          return (
                            <div key={attachment.url}>
                              {attachment.Mediatype === MediaType.IMAGE && (
                                <Image
                                  src={attachment.url}
                                  width={200}
                                  height={200}
                                  alt="media"
                                />
                              )}
                              {attachment.Mediatype === "VIDEO" && (
                                <video controls>
                                  <source
                                    src={attachment.url}
                                    type="video/mp4"
                                  />
                                </video>
                              )}
                            </div>
                          );})}
                      </div>
                    )}
                  </div>
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
                    src={m.user.image || "https://github.com/shadcn.png"}
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
      <>
        <MyEditor
        spaceId={spaceid}
        setMessages = {setMessages}
          className="w-full"
        />
      </>
    </div>
  );
}
