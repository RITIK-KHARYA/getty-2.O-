import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function UserNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">User Not Found</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-64 h-64 overflow-hidden rounded-lg">
            <img
              src="/notfound.webp"
              alt="User not found animation"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-muted-foreground">
            We couldn't find the user you're looking for. They may have been
            deleted or never existed.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/dashboard">Go Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
