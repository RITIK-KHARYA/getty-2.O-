import prisma from "@/app/lib";
import { getSession } from "./session";

export const createSpace = async () => {
  const session = await getSession();
  const user = session?.user;
  try {
    if (!user) {
      console.log("Not logged in");
      throw new Error("unauthorized");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
