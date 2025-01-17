"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import AppBar from "./components/app-bar";
import Footer from "./components/footer";
import Particles from "./components/ui/particles";
import HeroVideoDialog from "./components/ui/hero-video-dialog";
import { HoverBorderGradient } from "./components/ui/hover-border-gradient";
import { BorderBeam } from "./components/ui/border-beam";

import { Vortex } from "./components/ui/vortex";
import { useSession } from "./lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  // Text content for the hero section
  const headlineText = "Deep dive into getty,";
  const subheadlineText = "Lets get anonymous";

  // Theme-based color state
  const { themes } = useTheme();
  const [particlesColor, setParticlesColor] = useState("light");
  if (session.data?.user) {
    router.push("/dashboard");
  }

  useEffect(() => {
    setParticlesColor(themes.includes("dark") ? "#fafaf9" : "#171717");
  }, [themes]);

  // Split headline into words for animation
  const animatedWords = [
    ...headlineText.split(" "),
    ...subheadlineText.split(" "),
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-center">
        <AppBar />
      </div>

      {/* Hero Section */}
      <div className="h-screen max-w-full relative mt-10">
        <div className="p-2 flex flex-col items-center justify-center">
          {/* CTA Link */}
          <Link href="" className="">
            <span className="relative z-10 text-sm">
              <HoverBorderGradient>🌟 Join Our Community</HoverBorderGradient>
            </span>
          </Link>

          {/* Animated Headline */}
          <div className="leading-loose font-normal z-10 mt-10 ">
            <span className=" flex items-center justify-center font-bold text-white md:text-5xl  mx-auto flex-wrap w-[700px]  gap-x-1">
              {animatedWords.map((word, index) => (
                <motion.span
                  className="px-1 text-6xl "
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

          {/* Subheadline */}
          <span className="text-center mt-10 w-[650px] text-muted-foreground z-10 text-md">
            Getty welcomes you to the world where you forget everything within a
            day. Share the platform—your thoughts are invisible to the world.
          </span>
          <div className="w-full flex items-center justify-center mt-10">
            //there will be button here
          </div>
        </div>

        {/* Video Section */}
        <div className="relative w-[1000px] mx-auto  z-10 mt-20">
          <div className="shadow-[0px_0px_300px_0px_#5b21b6] top-full left-0 bg-black absolute -z-10 flex max-w-screen-lg w-full aspect-video flex-col items-center justify-center overflow-hidden rounded- border bg-background">
            <HeroVideoDialog
              videoSrc="https://www.youtube.com/embed/U14GpQ5K03g"
              thumbnailSrc="/thumbnail.jpg"
              thumbnailAlt="Video Thumbnail"
            />
            <BorderBeam size={250} duration={12} delay={5} />
          </div>
        </div>
      </div>

      {/* Particles Background */}
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={90}
        color={particlesColor}
        refresh
      />

      <div className=" ">
        <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[20rem] overflow-hidden mt-52">
          <Vortex
            backgroundColor="black"
            className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
          >
            <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
              The hell is this?
            </h2>
            <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
              This is chemical burn. It&apos;ll hurt more than you&apos;ve ever
              been burned and you&apos;ll have a scar.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                Order now
              </button>
              <button className="px-4 py-2  text-white ">Watch trailer</button>
            </div>
          </Vortex>
        </div>
        <Footer />
      </div>
    </div>
  );
}
