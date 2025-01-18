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
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user details");
  }
}
