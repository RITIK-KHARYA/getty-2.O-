"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Particles from "./components/ui/particles";
import HeroVideoDialog from "./components/ui/hero-video-dialog";
import { HoverBorderGradient } from "./components/ui/hover-border-gradient";
import { BorderBeam } from "./components/ui/border-beam";
import { useSession } from "./lib/auth-client";
import { useRouter } from "next/navigation";
import Footer from "./components/footer";
import Image from "next/image";
import Header from "./components/custom/custom-header";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const headlineText = "Deep dive into getty,";
  const subheadlineText = "Lets get anonymous";

  const { theme, setTheme } = useTheme();
  const [particlesColor, setParticlesColor] = useState("#fafaf9");

  if (session.data?.user) {
    router.push("/dashboard");
  }

  useEffect(() => {
    setParticlesColor(theme === "dark" ? "#fafaf9" : "#171717");
  }, [theme]);

  const animatedWords = [
    ...headlineText.split(" "),
    ...subheadlineText.split(" "),
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground bg-black">
      <main className="flex-grow">
        <div className="h-full max-w-full relative mt-10 pb-20">
          
          <div className="p-2 flex flex-col items-center justify-center">
            <Link href="" className="">
              <span className="relative z-10 text-sm">
                <HoverBorderGradient>🌟 Join Our Community</HoverBorderGradient>
              </span>
            </Link>
            <div className="leading-loose font-normal z-10 mt-10">
              <span className="flex items-center justify-center font-bold text-white md:text-5xl mx-auto flex-wrap w-[700px] gap-x-1">
                {animatedWords.map((word, index) => (
                  <motion.span
                    className="px-1 text-6xl dark:text-white text-black"
                    key={index}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </div>

            <span className="text-center mt-10 w-[650px] text-muted-foreground z-10 text-md">
              Getty welcomes you to the world where you forget everything within
              a day. Share the platform—your thoughts are invisible to the
              world.
            </span>
            <div className="w-full flex items-center justify-center mt-10">
            </div>
          </div>

          <div className="w-full items-center justify-center flex z-10 p-2 ">
            <div className="rounded-lg border border-neutral-300/30 overflow-hidden">
              <Image
                src={"/meme.png"}
                alt="landing page image"
                className="object-cover "
                width={800}
                height={400}
              />
            </div>
          </div>
        </div>

        <Particles
          className="absolute inset-0 pointer-events-none"
          quantity={150}
          ease={90}
          color={particlesColor}
          refresh
        />
      </main>
      <Footer />
    </div>
  );
}
