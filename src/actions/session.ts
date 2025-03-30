"use server";
import { Session } from "@/app/lib/auth-client";
import { betterFetch } from "@better-fetch/fetch";
import { cache } from "react";
import { headers } from "next/headers";

export const getSession = cache(async () => {
  try {
    const { data: session } = await betterFetch<Session>(
      "http://localhost:3000/api/auth/get-session",
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
      }
    );
    console.log("user is herererererere");
    return session;
  } catch (error) {
    return null;
  }
});
