"use client";

import { getSession } from "@/actions/session";
import Editor from "@/components/editor/Editor";
import { useState } from "react";

export default function ChatArea() {
  const user = getSession();
  const [message, setmessage] = useState<string | null>("");
  const [messageList, setmessageList] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);

  if (!user)
    return (
      <div className="w-full h-full backdrop:blur-sm">
        <div className="items-center justify-center flex flex-col h-full">
          <div className="font-bold text-2xl">Please login to chat</div>
        </div>
      </div>
    );

  const handleSubmit = async () => {
    try {
      if (!input.trim()) return;
      setisLoading(true);
      // const result = await SubmitMessage(input);
      // const setmessage(result)
    } catch (error) {
      console.log("unable to submit", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-10" about="header">
        {/* custom header here */}
        {/* <ConversationHeader /> props of frinds user or conversation id user */}
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
        {/* editor here */}
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
