"use server";

import prisma from "@/app/lib";
import { getSession } from "./session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema2 } from "@/app/components/findspacedialog/findspacedialog";
import { formSchema } from "@/app/components/custom/custom-dialog";
import { headers } from "next/headers";


export default async function GetSpace() {
  try {
    const response = await fetch("http://localhost:3000/api/space", {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
      method: "GET",
    });
    const data = await response.json();
    console.log(data)
    return data.data;
  } catch (error) {
    throw new Error("unable to get space");
  }
}

export async function CreateSpace(data: z.infer<typeof formSchema>) {
  try {
    const response = await fetch("http://localhost:3000/api/space", {
      method: "POST",
      headers: {
        cookie: (await headers()).get("cookie") || "",
      "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error("unable to create space");
  }
}

