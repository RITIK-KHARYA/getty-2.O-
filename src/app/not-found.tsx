import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle className="text-center">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-64 h-64 overflow-hidden rounded-lg">
            <img
              src="/error-404.webp"
              alt="Page not found animation"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-muted-foreground">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
