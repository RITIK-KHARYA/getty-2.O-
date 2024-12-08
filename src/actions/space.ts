import { getSession } from "./session";


export const createSpace = async () => {
  const session = await getSession();
  try {
    if (!session) {
      console.log("Not logged in");
      throw new Error("mahol pura wavyyy o dede mujhe chcuchi ");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
