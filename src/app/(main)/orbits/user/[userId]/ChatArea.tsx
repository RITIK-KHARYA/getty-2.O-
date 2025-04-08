"use client";

import { ConversationMessage, GetConversationMessage } from "@/actions/message";
import { getSession } from "@/actions/session";
import ChatHeader from "@/app/components/ChatHeader";
import { useSession } from "@/app/lib/auth-client";
import { useWebSocketStore } from "@/app/hooks/use-websocket";
import Editor from "@/components/editor/Editor";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatArea() {
  const user = useSession();
  const [message, setmessage] = useState<string | null>("");
  const [messageList, setmessageList] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const { ConnectSocket, socket } = useWebSocketStore();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const SearchParams = useSearchParams();
  const conversationId = SearchParams.get("conversationId");

  if (!user)
    return (
      <div className="w-full h-full backdrop:blur-sm">
        <div className="items-center justify-center flex flex-col h-full">
          <div className="font-bold text-2xl">Please login to chat</div>
        </div>
      </div>
    );
    
  useEffect(() => {}, []);

  const handleMessage = async () => {
    const data = await GetConversationMessage(conversationId ?? "");
    if (!data) return <div>no data</div>;
    setmessageList(data);
    return data; // not sure about this one ?
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!input.trim()) return;
      setisLoading(true);
      const result = await ConversationMessage(
        {
          message: input,
          spaceid: "1",
          image: user.data?.user.image || "https://github.com/shadcn.png",
          userId: user.data?.user.id ?? "",
        },
        {
          conversationId: conversationId,
        }
      );
      socket?.emit("c", input);
      console.log(result);
      if (!result) return;

      setInput("");

      setmessage(input);
    } catch (error) {
      console.log("unable to submit", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-10" about="header">
        {/* <ChatHeader classname="" friendName={FriendName} friendImage={FriendImage} friendId={friendId} /> */}
      </div>
      <div className="w-full h-full flex ">
        {/* chat area */}
        {message.length === 0 && (
          <div className="text-sm text-muted-foreground w-full h-full flex justify-center items-center">
            Start a Conversation
          </div>
        )}
      </div>
      <div className="">
        <Editor
          onchange={(value: string) => setInput(value)}
          className="w-full "
          handleSubmit={() => handleSubmit()}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  );
}
