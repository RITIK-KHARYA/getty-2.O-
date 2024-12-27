"use server";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import prisma from "@/app/lib";

export async function Userboard() {
  const session = await getSession();
  try {
    if (!session) {
      redirect("/signin");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      select: {
        id: true,
        bio: true,
      },
    });
    return user;
  } catch (error) {
    console.log("bhai back laggayi", error);
  }
}
