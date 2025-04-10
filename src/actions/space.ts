"use server";

import { z } from "zod";
import { formSchema } from "@/app/components/custom/custom-dialog";
import { headers } from "next/headers";
import { formSchema2 } from "@/app/lib/Validation";
import { revalidatePath } from "next/cache";

export default async function GetSpace() {
  try {
    const response = await fetch("http://localhost:3000/api/space", {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
      method: "GET",
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log("unable to get the space", error);
  }
}

export async function handleEnterSpace(spaceId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/space/${spaceId}`, {
      method: "POST",
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
    });

    const data = await response.json();

    if (response) {
      if (data.data.isNewMember) {
        // console.log(data.data.isNewMember);
      }
    } else {
      return;
    }
    // console.log(data, "wtf");
    return data;
  } catch (error) {
    console.error("Error entering space:", error);
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
    if (result) {
      revalidatePath("/dashboard");
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log("error nigga", error);
  }
}
export async function FindSpaceById(id: string) {
  try {
    const space = await fetch(`http://localhost:3000/api/space/${id}`, {
      method: "GET",
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
    });
    if (!space) {
      return null;
    }
    const data = await space.json();
    console.log(data);
    // console.log(data.membersCount, "memberscount");
    return data;
  } catch (error) {
    console.log(error);
  }
}
