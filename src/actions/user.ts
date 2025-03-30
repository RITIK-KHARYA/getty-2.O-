"use server";

import { headers } from "next/headers";
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

export async function SearchUser(data:any){
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  try {
    const response = await fetch("http://localhost:3000/api/user/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: (await headers()).get("cookie") || "",
      },
      body: JSON.stringify(data),
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