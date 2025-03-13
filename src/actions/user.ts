"use server";

import { getSession } from "./session";

export async function Userboard() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  try {
    const response = await fetch("http://localhost:3000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Error fetching user:", response.status);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}
