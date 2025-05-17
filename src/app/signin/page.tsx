import Image from "next/image";
import { SignInForm } from "../components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-1/2 relative">
       <div className="bg-black">
        <Image
          src="/ganother.png"
          alt="logo"
          layout="fill"
          objectFit="cover"
          className="object-cover w-full h-full "
        />
       </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-2/3 max-w-md">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
