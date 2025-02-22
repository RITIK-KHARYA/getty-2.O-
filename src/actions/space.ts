"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema } from "@/app/components/custom/custom-dialog";
import { headers } from "next/headers";
import { formSchema2 } from "@/app/lib/Validation";

export default async function GetSpace() {
  try {
    const response = await fetch("http://localhost:3000/api/space", {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
      method: "GET",
      cache:"force-cache"
    });
    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    throw new Error("unable to get space");
  }
}

export async function GetSpaceOnSearch(data: z.infer<typeof formSchema2>) {
  try {
    const response = await fetch("http://localhost:3000/api/findspace", {
      headers: {
        cookie: (await headers()).get("cookie") || "",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const value = await response.json();
    console.log(value, "search result");
    return value.data;
  } catch (error) {
    console.log("dude we got a error", error);
    throw Error("unable to get space");
  }
}

export async function CreateSpace(data: z.infer<typeof formSchema>) {
  try {
    const response = await fetch("http://localhost:3000/api/space", {
      method: "POST",
      headers: {
        cookie: (await headers()).get("cookie") || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    if (result) {
      revalidatePath("/dashboard");
    }
    return result;
  } catch (error) {
    throw new Error("unable to create space");
  }
}
