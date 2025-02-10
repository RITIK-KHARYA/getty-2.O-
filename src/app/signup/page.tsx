"use client";

import Image from "next/image";
import { SignUpForm } from "../components/sign-up";
import { Button } from "../components/ui/button";
import { Github } from "lucide-react";
import { signInWithDiscord, signInWithGithub } from "../lib/auth-client";
import { BsDiscord } from "react-icons/bs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-1/2 relative">
        <Image src="/meme.png" alt="Sign Up" layout="fill" objectFit="cover" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-2/3 max-w-md">
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
          <div className="grid grid-cols-2 gap-2 m-5">
            <Button
              onClick={() => signInWithDiscord()}
              variant="outline"
              className="bg-neutral-800/80 border-neutral-700 text-white hover:bg-neutral-700/40 w-full rounded-none"
            >
              <BsDiscord className="mr-2 h-4 w-4" />
              Discord
            </Button>
            <Button
              onClick={() => signInWithGithub()}
              variant="outline"
              className="bg-neutral-800/80 border-neutral-700 text-white hover:bg-neutral-700/40 w-full rounded-none"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
