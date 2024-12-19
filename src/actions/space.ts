"use server";
import prisma from "@/app/lib";
import { getSession } from "./session";
import { revalidatePath } from "next/cache";

export default async function GetSpace() {
  const session = await getSession();
  const user = session?.user;
  try {
    const space = await prisma.space.findMany({
      where: {
        userid: user?.id,
      },
      select: {
        title: true,
        description: true,
        media: {
          where: {
            originalurl: { startsWith: "https://utfs.io/f/" },
          },
        },
      },
    });

    console.log(space[0],"only first space");
    if (space.length === 0) {
      console.log(" this specific user does not have any space");
    }
    return space;
  } catch (error) {
    console.log("error in finding space", error);
  }
}

export async function CreateSpace(spacetitle: string, spacebio: string) {
  const session = await getSession();
  const user = session?.user;
  try {
    if (!user) {
      console.log("user not found");
      return;
    }
    const space = await prisma.space.create({
      data: {
        userid: user?.id,
        title: spacetitle,
        updatedAt: new Date(),
        description: spacebio,
        

      }, 
      include: {
        media: true,
      }
    });
    console.log(space, spacetitle);
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("error in creating space", error);
  }
}

