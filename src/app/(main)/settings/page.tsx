import type React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  BellRing,
  User,
  Shield,
  Moon,
  SettingsIcon,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Preview Section */}
        <div className="bg-neutral-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Preview</h2>
          <div className="h-24 flex items-center justify-center border border-neutral-700 rounded-lg">
            <p className="text-neutral-400">
              Your current settings preview will appear here
            </p>
          </div>
        </div>

        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="bg-neutral-800 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* Slider Setting */}
            <div className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Display Brightness</h3>
                <p className="text-sm text-neutral-400">
                  Adjust the brightness level
                </p>
              </div>
              <div className="w-1/3">
                <Slider
                  defaultValue={[75]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Toggle Setting */}
            <div className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-neutral-400">
                  Enable system-wide dark mode
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Input Setting */}
            <div className="bg-neutral-800 rounded-lg p-4 space-y-3">
              <div>
                <h3 className="font-medium">Username</h3>
                <p className="text-sm text-neutral-400">
                  Change your display name
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  className="bg-neutral-700 border-neutral-600"
                  defaultValue="user123"
                />
                <Button variant="outline" className="shrink-0">
                  Save
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-neutral-400">
                  Receive email for important updates
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-neutral-400">
                  Receive push notifications on your device
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <div className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Profile Visibility</h3>
                <p className="text-sm text-neutral-400">
                  Control who can see your profile
                </p>
              </div>
              <div className="w-1/3">
                <select className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-sm">
                  <option>Everyone</option>
                  <option>Friends Only</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button className="bg-neutral-800 hover:bg-neutral-700">
            Save Changes
          </Button>
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
