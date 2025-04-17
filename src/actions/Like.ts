"use server";

import { revalidatePath } from "next/cache";
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
    revalidatePath("/dashboard")
    console.log("LIKED")
    return data;
  } catch (error) {
    console.log("error getting the like");
  }
}
export async function DeleteLike(spaceid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/deleteLike?spaceid=${spaceid}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
        method: "DELETE",
      }
    );
    revalidatePath("/dashboard")
  } catch (error) {
    console.log("error getting the like");
  }
}
