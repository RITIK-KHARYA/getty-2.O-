import { headers } from "next/headers";

export default async function GetFriends(userId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/user/${userId}/friends`, //there is problem with the endpoint related to the userid and frinedsid how to send the request with whom id at where inorder the id is sended 
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "behenchod");
  }
}

export async function AddFriend(friendId: string) { //same case here id props needed to be managed 
  try {
    const response = await fetch(
      `http://localhost:3000/api/friends?friendId=${friendId}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
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
export async function RemoveFriend(friendId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/friends?friendId=${friendId}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "error deleting the friend");
  }
}
