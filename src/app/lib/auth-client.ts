import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, signOut, $Infer } = createAuthClient(
  {
    baseURL: "http://localhost:3000",
  }
);

export const signInWithGithub = async () => {
  await signIn.social({
    provider: "github",
    callbackURL: "http://localhost:3002/dashboard",
  });
};
export const signInWithDiscord = async () => {
  await signIn.social({
    provider: "discord",
    callbackURL: "http://localhost:3002/dashboard",
  });
};
export const signInWithGoogle = async () => {
  await signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3002/dashboard",
  });
};

export type Session = typeof $Infer.Session;
