"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { LogOut, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "../lib/auth-client";


export default function ProfileInterface() {
      const { data } = useSession();

  return (
    <div className=" bg-black rounded-lg">
      <Card className="w-full max-w-sm bg-neutral-900 text-white border-neutral-800">
        <div className="p-4 space-y-4">

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Avatar>
                  <AvatarFallback></AvatarFallback>
                  <AvatarImage
                    className="rounded-full"
                    src={data?.user.image || "https://github.com/shadcn.png"}
                  />
                </Avatar>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-900" />
            </div>
            <div>
              <h2 className="font-semibold">ritikdev_dsa</h2>
              <p className="text-sm text-zinc-400">He</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-zinc-300">
            dev songs anime and mostly chill |sleep
          </p>

          {/* URL */}
          <a
            href="http://ritikdev.vercel.app/"
            className="text-sm text-blue-400 hover:underline block"
          >
            http://ritikdev.vercel.app/
          </a>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-zinc-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}