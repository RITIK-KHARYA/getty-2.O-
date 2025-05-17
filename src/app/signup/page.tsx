"use client";

import Image from "next/image";
import { SignUpForm } from "../components/sign-up";
import { Button } from "../components/ui/button";
import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithDiscord,
  signInWithGithub,
  signInWithGoogle,
} from "../lib/auth-client";
import { BsDiscord } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <motion.div
      className="flex min-h-screen bg-[#040809] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Section */}
      <motion.div
        className="hidden md:block w-1/2 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image src="/ganother.png" alt="logo" fill className="object-cover" />
      </motion.div>

      {/* Form Section */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.2 }}
            >
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
            </motion.div>
            <motion.h1
              className="text-3xl font-bold mt-6 mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Create your account
            </motion.h1>
            <motion.p
              className="text-zinc-400"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Join us today and start your journey
            </motion.p>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div
            className="grid grid-cols-3 gap-3 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => signInWithDiscord()}
                variant="outline"
                className="bg-[#5865F2]/10 border-[#5865F2]/30 text-white hover:bg-[#5865F2]/20 w-full rounded-lg transition-all duration-200"
              >
                <BsDiscord className="h-5 w-5 text-[#5865F2]" />
                <span className="sr-only">Discord</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => signInWithGoogle()}
                variant="outline"
                className="bg-green-800/30 border-green-500/30 text-white hover:bg-green-900/30 w-full rounded-lg transition-all duration-200"
              >
                <FcGoogle className="h-5 w-5" />
                <span className="sr-only">Google</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => signInWithGithub()}
                variant="outline"
                className="bg-yellow-800/30 border-yellow-800 text-white hover:bg-yellow-900/30 w-full rounded-lg transition-all duration-200"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gradient-to-r from-zinc-900 to-black px-4 text-zinc-500">
                Or continue with email
              </span>
            </div>
          </motion.div>

          {/* Sign Up Form */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <SignUpForm />
          </motion.div>

          {/* Footer */}
          <motion.p
            className="mt-8 text-center text-sm text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
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
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
