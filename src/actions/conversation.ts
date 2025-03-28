import { headers } from "next/headers";

export default async function GetConversation(conservationId: string) {
  //   const { isMember, userId, spaceId, isGroup, name} = data;
  const response = await fetch(
    `http://localhost:3000/api/conversation/${conservationId}`,
    {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
      method: "POST",
      // body: JSON.stringify(data),
    }
  );
  const data = await response.json();
  return data.data;
}
