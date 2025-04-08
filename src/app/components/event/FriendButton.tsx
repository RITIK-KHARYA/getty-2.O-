"use client";

import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import GetFriends from "@/actions/friends";
import { getSession } from "@/actions/session";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";

// export default function FriendButton({
//   friendId,
//   isFriend,
// }: {
//   friendId: string;
//   isFriend: Boolean;
// }) {
//   console.log(friendId);
//   const handleAddFriend = async () => {
//     await AddFriend(friendId);
//   };
//   return (
//     <div>
//       {!isFriend ? (
//         <Tooltip>
//           <TooltipTrigger>
//             <Button
//               className="bg-neutral-900 text-neutral-200 text-sm text-center"
//               onClick={handleAddFriend}
//             >
//               <UserPlus className=" h-4 w-4" />
//             </Button>
//             <TooltipContent className="text-xs text-muted-foreground">
//               Add Friend
//             </TooltipContent>
//           </TooltipTrigger>
//         </Tooltip>
//       ) : (
//         <Tooltip>
//           <TooltipTrigger>
//             <Button className="bg-neutral-900 text-neutral-200 text-sm text-center">
//               <UserCheck className=" h-4 w-4" />
//             </Button>
//             <TooltipContent className="text-xs text-muted-foreground">
//               Remove user
//             </TooltipContent>
//           </TooltipTrigger>
//         </Tooltip>
//       )}
//     </div>
//   );
// }

interface FriendButtonProps {
  friendId: string;
  isFriend: Boolean
}
export default function FriendsSheet({
  friendId,
  isFriend,
}: FriendButtonProps) {
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState<any>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      const user = await getSession();
      if (!user) return;
      const data = await GetFriends(user.user.id);
      setFriends(data);
    };

    if (open) {
      fetchFriends();
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <UserPlus className="w-4 h-4 mr-2" />
          Friends
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Friends</SheetTitle>
        </SheetHeader>

        {!friends ? (
          <div className="p-6 text-center text-muted-foreground">
            Loading...
          </div>
        ) : (
          <div className="py-4 overflow-y-auto max-h-[calc(100vh-6rem)]">
            <Tabs defaultValue="sent" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="sent">
                  Sent Requests
                  {friends.data.sent.length > 0 && (
                    <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                      {friends.data.sent.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="received">
                  Received Requests
                  {friends.data.recieved.length > 0 && (
                    <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                      {friends.data.recieved.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sent" className="space-y-4">
                {friends.data.sent.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    You haven't sent any friend requests
                  </div>
                ) : (
                  friends.data.sent.map((f: any) => (
                    <Card key={f.receiver.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={f.receiver.avatar}
                                alt={f.receiver.name}
                              />
                              <AvatarFallback>
                                {f.receiver.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{f.receiver.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                @{f.receiver.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground mr-2">
                              {f.sentAt}
                            </span>
                            <Button variant="destructive" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="received" className="space-y-4">
                {friends.data.recieved.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    You don't have any friend requests
                  </div>
                ) : (
                  friends.data.recieved.map((f: any) => (
                    <Card key={f.sender.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={f.sender.image}
                                alt={f.sender.name}
                              />
                              <AvatarFallback>
                                {f.sender.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{f.sender.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                @{f.sender.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground mr-2">
                              {f.sender.receivedAt}
                            </span>
                            <div className="flex gap-2">
                              <Button variant="destructive" size="sm">
                                Decline
                              </Button>
                              <Button
                                className="bg-green-600 hover:bg-green-700"
                                size="sm"
                              >
                                Accept
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
