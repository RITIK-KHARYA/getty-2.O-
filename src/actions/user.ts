"use server";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import prisma from "@/app/lib";
import { error } from "console";

export async function Userboard() {
  const session = await getSession();
  if(!session) {
    throw  Error("unauthorized");
  }

  try {
    const user = await fetch("http://localhost:3000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
     return user
  } catch (error) {
    console.log("bhai back laggayi", error);
  }
}
