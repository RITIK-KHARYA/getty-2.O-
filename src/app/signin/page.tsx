import Image from "next/image";
import { SignInForm } from "../components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-1/2 relative">
        <Image src="/meme.png" alt="Sign In" layout="fill" objectFit="cover" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-2/3 max-w-md">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
