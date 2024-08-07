import React from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
export default function Home() {
  const words = [
    {
      text: "Hi,",
    },
    {
      text: "my",
    },
    {
      text: "name",
    },
    {
      text: "is",
    },

    {
      text: "Aloysius",
    },
  ];
  return (
    <div className="relative">
      <AuroraBackground>
        <div className="relative w-full flex flex-col gap-4 items-center justify-center px-4">
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            <TypewriterEffectSmooth words={words} />
          </div>
          <p className="text-neutral-600 dark:text-neutral-200 text-lg mb-3 ">
            Welcome to my portfolio
          </p>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black/[0.4] bg-white/[0.99] backdrop-blur-md  text-black dark:text-white flex items-center space-x-2"
          >
            <span>Get started</span>
          </HoverBorderGradient>
        </div>
      </AuroraBackground>
      <section className="h-[100vh]">
        <div className="relative max-w-6xl mx-auto p-6 -mt-20 z-10">
          <div className="w-full h-11 rounded-2xl shadow-md border bg-white/[0.69] dark:bg-black/[0.39] border-black/[0.1] dark:border-white/[0.2] backdrop-blur-md h-96">
            <div className="flex justify-start items-center space-x-1.5 p-4 ">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
            </div>

            <div className="h-96">


            </div>
          </div>

          {/* <div className="w-full h-11 rounded-t-2xl shadow-md border flex justify-start items-center space-x-1.5 px-4 bg-white/[0.69] dark:bg-black/[0.39] border-black/[0.1] dark:border-white/[0.2] backdrop-blur-md">
      <span className="w-3 h-3 rounded-full bg-red-400"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
      <span className="w-3 h-3 rounded-full bg-green-400"></span>
    </div>
    <div className="w-full h-96 rounded-b-2xl shadow-md border border-t-0 bg-white/[0.69] dark:bg-black/[0.39] border-black/[0.1] dark:border-white/[0.2] backdrop-blur-md"></div> */}
        </div>
      </section>
    </div>
  );
}
