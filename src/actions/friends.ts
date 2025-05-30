"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export default async function GetFriends(currentUserId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${currentUserId}/friends`, //there is problem with the endpoint related to the userid and frinedsid how to send the request with whom id at where inorder the id is sended
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
        method: "GET",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return null;
    }
    console.log(data.data);
    return data
  } catch (error) {
    console.log(error, "behenchod");
  }
}

export async function AddFriendRequest(friendId: string) {
  //same case here id props needed to be managed
  try {
    const response = await fetch(
      `http://localhost:3000/api/friends/request?friendId=${friendId}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
        method: "POST",
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error, "behenchod");
  }
}
export async function AcceptFriendRequest(friendId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/friends/accept?friendId=${friendId}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "behenchod");
  }
}
export async function RemovePendingRequest(friendId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/friends/delete?friendId=${friendId}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
        method: "DELETE", 
      }
    );
    console.log("DELETED")
    
  } catch (error) {
    console.log(error, "error deleting the friend");
  }
}
