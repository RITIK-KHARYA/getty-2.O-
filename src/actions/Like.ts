"use server";

import { headers } from "next/headers";

export async function AddLike(spaceid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/like?spaceid=${spaceid}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    const data = await response.json();
    console.log("LIKED")
    return data;
  } catch (error) {
    console.log("error getting the like");
  }
}
export async function DeleteLike(spaceid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/like?spaceid=${spaceid}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
        method: "DELETE",
      }
    );
  } catch (error) {
    console.log("error getting the like");
  }
}
