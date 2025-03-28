import { headers } from "next/headers";

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
  return data;
}
