"use client";

import React, { useEffect } from "react";
import { getSession } from "../../../actions/session";
import { HomeIcon, House } from "lucide-react";
import { ProfileForm } from "@/app/components/custom/custom-dialog";
import { CreateSpace } from "@/actions/space";
import GetSpace from "@/actions/space"
import { useSession } from "@/app/lib/auth-client";

export default function Page() {
  const session = useSession();
  const user = session?.data?.user;
  
  if (!user) {
    return
  }

  const handleCreateSpace = async () => {
    const spacetitle = "hello world";
    await CreateSpace(spacetitle);
  };


  const handleGetSpace = async () => {
    const spaceId = "hello world"; 
    await GetSpace(spaceId); 
  };

  return (
    <div className="">
      <div className="ml-2 font-semibold shadow-sm">
        <ProfileForm />
        <button onClick={handleGetSpace} className="bg-white text-black">
          Get Space
          
        </button>
        <button onClick={handleCreateSpace}>createspace</button>
        
      </div>
    </div>
  );
}
