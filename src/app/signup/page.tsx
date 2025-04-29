"use client";

import Image from "next/image";
import { SignUpForm } from "../components/sign-up";
import { Button } from "../components/ui/button";
import { Github } from "lucide-react";
import {
  signInWithDiscord,
  signInWithGithub,
  signInWithGoogle,
} from "../lib/auth-client";
import { BsDiscord, BsGoogle } from "react-icons/bs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white">
      {/* Image Section */}
      <div className="hidden md:block w-1/2 relative overflow-hidden">
  
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-12">
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Join our community
            </h2>
            <p className="text-zinc-200 mb-6">
              Create an account to access exclusive features, save your
              preferences, and connect with other members.
            </p>
            <div className="flex items-center space-x-4">
              <div className="h-1 w-1 rounded-full bg-violet-400" />
              <div className="h-1 w-1 rounded-full bg-indigo-400" />
              <div className="h-1 w-1 rounded-full bg-violet-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to home
            </Link>
            <h1 className="text-3xl font-bold mt-6 mb-2">
              Create your account
            </h1>
            <p className="text-zinc-400">
              Join us today and start your journey
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <Button
              onClick={() => signInWithDiscord()}
              variant="outline"
              className="bg-[#5865F2]/10 border-[#5865F2]/30 text-white hover:bg-[#5865F2]/20 w-full rounded-lg transition-all duration-200"
            >
              <BsDiscord className="h-5 w-5 text-[#5865F2]" />
              <span className="sr-only">Discord</span>
            </Button>
            <Button
              onClick={() => signInWithGoogle()}
              variant="outline"
              className="bg-[#EA4335]/10 border-[#EA4335]/30 text-white hover:bg-[#EA4335]/20 w-full rounded-lg transition-all duration-200"
            >
              <BsGoogle className="h-5 w-5 text-[#EA4335]" />
              <span className="sr-only">Google</span>
            </Button>
            <Button
              onClick={() => signInWithGithub()}
              variant="outline"
              className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 w-full rounded-lg transition-all duration-200"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gradient-to-r from-zinc-900 to-black px-4 text-zinc-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Sign Up Form */}
          <SignUpForm />

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-zinc-500">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="text-zinc-400 hover:text-white underline underline-offset-2"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-zinc-400 hover:text-white underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
