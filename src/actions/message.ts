"use server";
import { headers } from "next/headers";
import { z } from "zod";

const MessageSchema3 = z.object({
  message: z.string().min(1, {
    message: "atleast one character",
  }),
  spaceid: z.string(),
});

export default async function GetMessage(spaceid: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/space/${spaceid}/message`, {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
      method: "GET",
    });
    if (!response.ok) {
      return null;
    }
    const value = await response.json();
    console.log(value);
    return value;
  } catch (error) {
    console.log(error, "ERROR BHENCHOD");
  }
}

export async function SendMessage(data: z.infer<typeof MessageSchema3>) {
  try {
    if (!data) {
      console.log("no data write something");
      return;
    }
    if (!data.spaceid) {
      console.log("no spaceid there");
      return;
    }

    const response = await fetch("http://localhost:3000/api/message", {
      headers: {
        cookie: (await headers()).get("cookie") || "",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response) {
      return;
    }
    const value = await response.json();
    return value;
  } catch (error) {
    console.log("bitch error", error);
  }
}
