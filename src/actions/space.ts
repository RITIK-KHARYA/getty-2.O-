"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema } from "@/app/components/custom/custom-dialog";
import { headers } from "next/headers";
import { formSchema2 } from "@/app/lib/Validation";
import { useToast } from "@/app/hooks/use-toast";
import { Toast } from "@/app/components/ui/toast";

export default async function GetSpace() {
  try {
    const response = await fetch("http://localhost:3000/api/space", {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    console.log("unable to get the space", error);
  }
}

// Frontend code (React example)
// export async function handleEnterSpace (spaceId: string) {
//   try {
//     const response = await fetch(`/api/space/${spaceId}/enter`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.json();

//     if (response.ok) {
//       // Show any success messages if needed
//       if (data.data.isNewMember) {
//         // Use your toast library's specific method
//         Toast({ title: "Welcome to the space!", variant: "default" });
//         // or perhaps:
//         // toast.show({ message: "Welcome to the space!" });
//       }

//       // Redirect to the space page
//       window.location.href = data.data.redirectUrl;
//       // Or if using a router like Next.js:
//       // router.push(data.data.redirectUrl);
//     } else {
//       Toast({
//         title: data.message || "Failed to enter space",
//         variant: "destructive",
//       });
//     }
//   } catch (error) {
//     console.error("Error entering space:", error);
//     Toast({
//       title: "An error occurred while trying to enter the space",
//       variant: "destructive",
//     });
//   }
// };

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
    console.log(result);
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
    return data;
  } catch (error) {
    console.log(error);
  }
}
