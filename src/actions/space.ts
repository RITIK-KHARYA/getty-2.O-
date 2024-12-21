"use server";
import prisma from "@/app/lib";
import { getSession } from "./session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema } from "@/app/components/custom/custom-dialog";

export default async function GetSpace() {
  const session = await getSession();
  const user = session?.user;
  try {
    const space = await prisma.space.findMany({
      where: {
        userid: user?.id,
        banner: { startsWith: "https://utfs.io/f/" },
        
      },
      select: {
        title: true,
        description: true,
        banner: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    console.log("space", space);
    if (space.length === 0) {
      console.log(" this specific user does not have any space");
    }
    return space;
  } catch (error) {
    console.log("error in finding space", error);
  }
}

export async function CreateSpace(data: z.infer<typeof formSchema>) {
  const session = await getSession();
  const user = session?.user;
  try {
    if (!user) {
      console.log("user not found");
      return;
    }
     await prisma.space.create({
      data: {
        userid: user?.id,
        title: data.spacename,
        updatedAt: new Date(),
        description: data.bio,
        banner: data.banner,
        createdAt: new Date(),
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("error in creating space", error);
  }
}

