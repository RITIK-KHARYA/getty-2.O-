"use server";
import { headers } from "next/headers";
import { z } from "zod";

const MessageSchema3 = z.object({
  message: z.string().min(1, {
    message: "atleast one character",
  }),
  spaceid: z.string(),
  image: z.string(),
  userId: z.string(),
});

export default async function GetMessage(spaceid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/space/${spaceid}/message`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
        method: "GET",
      }
    );
    if (!response.ok) {
      return null;
    }
    const value = await response.json();
    // console.log(value);
    return value;
  } catch (error) {
    console.log(error, "ERROR BHENCHOD");
  }
}

export async function SendMessage(data: z.infer<typeof MessageSchema3>) {
  try {
    if (!data?.message || !data.spaceid) {
      console.log("Invalid data");
      return;
    }

    const response = await fetch("http://localhost:3000/api/message", {
      headers: {
        cookie: (await headers()).get("cookie") || "",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        message: data.message,
        spaceid: data.spaceid,
        image: data.image,
        userId: data.userId,
      }),
    });

    if (!response.ok) {
      console.log("Failed to send message");
      return;
    }

    return await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
}
export async function ConversationMessage(
  data: z.infer<typeof MessageSchema3>,
  conversationId: string
) {
  const response = await fetch(
    `http://localhost:3000/api/conversation${conversationId}`,
    {
      headers: {
        cookie: (await headers()).get("cookie") || "",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    console.log("unable to send the message");
    return null;
  }
  const value = await response.json();
  console.log(value);
  return value.data;
}
//here since we sending the message to the conversationid we need to mention it
