"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  BellRing,
  Heart,
  MessageCircle,
  Repeat,
  AtSign,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NotificationType = "like" | "reply" | "retweet";

interface Notification {
  id: number;
  type: NotificationType;
  user: string;
  username: string;
  time: string;
  content: string;
}

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setNotifications([
        {
          id: 1,
          type: "like",
          user: "Jane Cooper",
          username: "jane_cooper",
          time: "2m",
          content: "liked your post",
        },
        {
          id: 2,
          type: "reply",
          user: "Wade Warren",
          username: "wade_warren",
          time: "15m",
          content: "replied to your post",
        },
        {
          id: 4,
          type: "retweet",
          user: "Cameron Williamson",
          username: "cameron_w",
          time: "3h",
          content: "retweeted your post",
        },
        {
          id: 5,
          type: "like",
          user: "Brooklyn Simmons",
          username: "brooklyn_s",
          time: "5h",
          content: "liked your post",
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Main Content */}
      <div className="flex-1 max-w-2xl mx-auto border-x border-zinc-800">
        <div className="sticky top-0 z-10 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Notifications</h1>
            <Link href="/settings/notifications">
              <Settings
                size={20}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              />
            </Link>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full bg-transparent border-b border-zinc-800 rounded-none h-12 p-0 sticky top-[73px] z-10 backdrop-blur-md bg-zinc-950/80">
            <TabsTrigger
              value="all"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:bg-transparent h-full"
            >
              Notifications
              {notifications.length > 0 && (
                <Badge className="ml-2 bg-purple-500 hover:bg-purple-500">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="all"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            {loading ? (
              // Loading skeleton state
              <div className="divide-y divide-zinc-800">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3 p-4">
                    <Skeleton className="h-10 w-10 rounded-full bg-zinc-800" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                      <Skeleton className="h-3 w-1/2 bg-zinc-800" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-zinc-800/50 p-5 rounded-full mb-4">
                  <BellRing size={32} className="text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No notifications yet</h3>
                <p className="text-zinc-400 max-w-sm">
                  When someone interacts with you or your posts, you'll see it
                  here.
                </p>
              </div>
            ) : (
              // Notifications list
              <div className="divide-y divide-zinc-800">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  // Get the appropriate icon based on notification type
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "like":
        return <Heart size={16} className="text-rose-500" />;
      case "reply":
        return <MessageCircle size={16} className="text-purple-500" />;
      case "retweet":
        return <Repeat size={16} className="text-emerald-500" />; 
      default:
        return <BellRing size={16} className="text-zinc-400" />;
    }
  };

  return (
    <div className="flex gap-3 p-4 hover:bg-zinc-900/50 transition-colors">
      <div className="mt-1">{getIcon(notification.type)}</div>
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={`/placeholder.svg?height=40&width=40`}
            alt={notification.user}
            width={40}
            height={40}
            className="bg-zinc-800"
          />
        </div>
        <div>
          <p className="text-sm">
            <span className="font-bold hover:underline cursor-pointer">
              {notification.user}
            </span>{" "}
            <span className="text-zinc-400">{notification.content}</span>
          </p>
          <p className="text-xs text-zinc-500 mt-1">{notification.time}</p>
        </div>
      </div>
    </div>
  );
}
