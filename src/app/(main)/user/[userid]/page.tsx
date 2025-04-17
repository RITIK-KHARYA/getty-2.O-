"use client";
import UserNotFound from "@/app/components/event/Usernotfound";
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
//  if(!currentuser){
//     return <div>Unauthorized</div>
//  }
  return (
    <div>
      <h1>currentuser : {userid} </h1>
    </div>
  );
}
