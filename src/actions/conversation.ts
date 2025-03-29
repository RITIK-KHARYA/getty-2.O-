"use server";

import { headers } from "next/headers";
import { getSession } from "./session";

export default async function GetConversation() {

  const response = await fetch("http://localhost:3000/api/conversation", {
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    console.log("nothing to fetch", data);
    return null;
  }

  console.log(data,"conversation here")
  return data;
}

export async function CreateConversation(data: any) {
  const currentUser = await getSession();
  const onBoardinguser = data             //consider the userid2

  const response = await fetch("http://localhost:3000/api/conversation", {
    headers: {
      "Content-Type": "application/json",
      cookie: (await headers()).get("cookie") || "",
    },
    method: "POST",
    body: JSON.stringify({ onBoardinguser, currentUser }),
  });

  if (!response.ok) {
    console.log("error unable to create the conversation");
    return null;
  }

  const value = await response.json();
  console.log("conversation created,", value);
  return value.data;
}


export async function DeleteConversation(ConversationId: string) {
  const response = await fetch(
    `http://localhost:3000/api/conversation/${ConversationId}`,
    {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
      method: "DELETE",
    }
  );
  const data = await response.json();

  if (!response) {
    console.log("there is nothing to delete or either something went wrong");
  }

}
