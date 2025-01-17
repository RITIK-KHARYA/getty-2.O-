"use server";

import prisma from "@/app/lib";
import { getSession } from "./session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema2 } from "@/app/components/findspacedialog/findspacedialog";
import { formSchema } from "@/app/components/custom/custom-dialog";
import { headers } from "next/headers";


export async function GetSpace() {
  try {
    const response = await fetch("http://localhost:3000/api/space", {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("unable to get space");
  }
}

export async function CreateSpace(data: z.infer<typeof formSchema>) {
  try {
    const response = await fetch("http://localhost:3000/api/space", {
      headers: {
        cookies: (await headers()).get("cookie") || "",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("unable to create space");
  }
}

// export async function GetUniqueIdSpace(data: z.infer<typeof formSchema2>) {
//   try {
//     const uniquespace = await prisma.space.findUnique({
//       where: {
//         id: data.spaceId,
//       },
//     });
//     if (!uniquespace) {
//       console.log("There is no space for this space-ID");
//       throw new Error("unable to find space");
//     }
//   } catch (error) {
//     throw new Error("unable to get unique id");
//   }
// }
// export default async function GetSpace() {
//   try {
//     const space = await prisma.space.findMany({
//       where: {
//         banner: {
//           startsWith: "https://utfs.io/",
//         },
//       },
//       include: {
//         users: {
//           where: {
//             role: "ADMIN",
//           },
//           select: {
//             user: {
//               select: {
//                 image: true,
//                 name: true,
//               },
//             },
//             spaceId: true,
//           },
//         },
//       },
//     });
//     // console.log("space", space);
//     const spaceWithAdmin = space.map((s) => {
//       return {
//         ...s,
//         users: { ...s.users[0].user },
//       };
//     });
//     return spaceWithAdmin;
//   } catch (error) {
//     throw new Error("unable to find space");
//     console.log("error in finding space", error);
//   }
// }

// export async function CreateSpace(data: z.infer<typeof formSchema>) {
//   const session = await getSession();
//   const user = session?.user;
//   try {
//     if (!user) {
//       console.log("user not found");
//       return;
//     }
//     const space = await prisma.space.create({
//       data: {
//         userid: user?.id,
//         title: data.spacename,
//         updatedAt: new Date(),
//         description: data.bio,
//         banner: data.banner,
//         createdAt: new Date(),
//       },
//     });
//     if (!space) {
//       throw new Error("unable to create space");
//     }
//     await prisma.spaceUser.create({
//       data: {
//         spaceId: space.id,
//         userId: user?.id,
//         role: "ADMIN",
//       },
//     });
//     revalidatePath("/dashboard");
//   } catch (error) {
//     console.log("error in creating space", error);
//   }
// }
