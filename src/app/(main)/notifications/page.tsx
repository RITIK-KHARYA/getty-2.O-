"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  BellRing,
  Heart,
  MessageCircle,
  Repeat,
  AtSign,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Simulate loading state
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//       // For demo purposes, we'll set an empty array to show the empty state
//       // You can comment this line to see the notifications list
//       setNotifications([]);

//       // Uncomment this to see notifications instead of empty state
//       /*
//       setNotifications([
//         { id: 1, type: 'like', user: 'Jane Cooper', username: 'jane_cooper', time: '2m', content: 'liked your post' },
//         { id: 2, type: 'reply', user: 'Wade Warren', username: 'wade_warren', time: '15m', content: 'replied to your post' },
//         { id: 3, type: 'mention', user: 'Esther Howard', username: 'esther_howard', time: '1h', content: 'mentioned you in a post' },
//         { id: 4, type: 'retweet', user: 'Cameron Williamson', username: 'cameron_w', time: '3h', content: 'retweeted your post' },
//         { id: 5, type: 'like', user: 'Brooklyn Simmons', username: 'brooklyn_s', time: '5h', content: 'liked your post' },
//       ]);
//       */
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
    
      {/* Main Content */}
      <div className="flex-1 max-w-2xl border-r border-neutral-800">
        <div className="p-4 border-b border-neutral-800">
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full bg-transparent border-b border-neutral-800 rounded-none h-12 p-0">
            <TabsTrigger
              value="all"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent h-full"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="mentions"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent h-full"
            >
              Mentions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {loading ? (
              // Loading skeleton state
              <div className="divide-y divide-neutral-800">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex gap-3 p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-neutral-800 p-5 rounded-full mb-4">
                  <BellRing size={32} className="text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No notifications yet</h3>
                <p className="text-neutral-400 max-w-sm">
                  When someone interacts with you or your posts, you'll see it
                  here.
                </p>
              </div>
            ) : (
              // Notifications list
              <div className="divide-y divide-neutral-800">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="mentions" className="mt-0">
            {loading ? (
              // Loading skeleton state for mentions
              <div className="divide-y divide-neutral-800">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3 p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty mentions state
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-neutral-800 p-5 rounded-full mb-4">
                  <AtSign size={32} className="text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No mentions yet</h3>
                <p className="text-neutral-400 max-w-sm">
                  When someone mentions you, you'll see it here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Right sidebar - can be used for trends or suggestions */}
      <div className="hidden lg:block w-80 p-4">
        <div className="bg-neutral-800 rounded-xl p-4">
          <h3 className="font-bold mb-3">Notification Settings</h3>
          <p className="text-sm text-neutral-400 mb-3">
            Control which notifications you receive and how you're notified.
          </p>
          <Link
            href="/settings"
            className="text-blue-400 text-sm hover:underline"
          >
            Manage notifications
          </Link>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
        active ? "bg-neutral-800" : "hover:bg-neutral-800/50"
      }`}
    >
      <span className={`${active ? "text-white" : "text-neutral-400"}`}>
        {icon}
      </span>
      <span className={`${active ? "text-white" : "text-neutral-400"}`}>
        {label}
      </span>
    </div>
  );
}

function NotificationItem({ notification }: { notification: any }) {
  // Get the appropriate icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart size={16} className="text-rose-500" />;
      case "reply":
        return <MessageCircle size={16} className="text-blue-500" />;
      case "retweet":
        return <Repeat size={16} className="text-green-500" />;
      case "mention":
        return <AtSign size={16} className="text-blue-500" />;
      default:
        return <BellRing size={16} className="text-neutral-400" />;
    }
  };

  return (
    <div className="flex gap-3 p-4 hover:bg-neutral-800/50 transition-colors">
      <div className="mt-1">{getIcon(notification.type)}</div>
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <Image
            src={`/placeholder.svg?height=40&width=40`}
            alt={notification.user}
            width={40}
            height={40}
            className="bg-neutral-800"
          />
        </div>
        <div>
          <p className="text-sm">
            <span className="font-bold hover:underline cursor-pointer">
              {notification.user}
            </span>{" "}
            <span className="text-neutral-400">{notification.content}</span>
          </p>
          <p className="text-xs text-neutral-500 mt-1">{notification.time}</p>
        </div>
      </div>
    </div>
  );
}
