"use server";

import prisma from "@/app/lib";

export default async function GetUniqueSpace(
    spaceid:string
) {
  try {
    const space = await prisma.space.findUnique({
      where: {
        id: spaceid,
      },
    });
    return space;
  } catch (error) {
    console.log("error in finding space bhari mistake hogaya bhaiya", error);
    }
    
}
