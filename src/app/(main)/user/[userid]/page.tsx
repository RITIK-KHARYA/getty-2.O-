"use client";
import UserNotFound from "@/app/components/event/Usernotfound";
import { Button } from "@/app/components/ui/button";
import { useSession } from "@/app/lib/auth-client";
import { useParams, useSearchParams } from "next/navigation";

export default function UserPage() {
  const {userid} = useParams();
  const currentuser = useSession();
  const SearchParams = useSearchParams()
  const search = SearchParams.get('user')

  if(userid != currentuser.data?.user.id){
    return <div className="w-full h-full bg-black flex justify-center items-center">
        <UserNotFound/>
    </div>
  }

  //not found unauthorized page 

  
  return (
    <main>
      <div>
        <div></div>
      </div>
      <div>
        <span className="flex items-center justify-between">
            <p></p>
            <Button></Button>
        </span>
      </div>
    </main>
  );
}
