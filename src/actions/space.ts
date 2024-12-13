"use server";
import prisma from "@/app/lib";
import { useSession } from "@/app/lib/auth-client";
import { getSession } from "./session";

export default async function GetSpace(spaceId: string) {
  const session = await getSession();
  const user = session?.user;
  try {
    const space = await prisma.space.findMany({
      where: {
        id: user?.id,
      },
    });
    console.log(space);
    console.log("there you go space");
    if (space.length === 0) {
      console.log(" this specific user does not have any space");
    }
  } catch (error) {
    console.log("error in finding space", error);
  }
}

export async function CreateSpace(spacetitle: string) {
  const session = await getSession();
  const user = session?.user;
  try {
    if (!user) {
      console.log("user not found");
      return;
    }
    const space = await prisma.space.create({
      data: {
        id: user?.id,
        userid: user?.id,
        title: spacetitle,
        updatedAt: new Date(),
        description: spacetitle,
      },
    });
    console.log(space, spacetitle);
    console.log("there you go space");
  } catch (error) {
    console.log("error in creating space", error);
  }
}
