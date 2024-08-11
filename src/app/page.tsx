"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BorderBeam } from "@/components/ui/border-beam";
import ScrollDrivenScribbles from "@/components/scroll-scribble";
import Image from "next/image";
import Tilt from 'react-parallax-tilt';

// Utility function to detect device type
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobile|Android|iP(hone|od)|IEMobile|WPDesktop|Opera Mini|BlackBerry/.test(ua)) {
    return "Mobile";
  } else if (/Tablet|iPad/.test(ua)) {
    return "Tablet";
  }
  return "Desktop";
}

export default function Home() {
  const [deviceType, setDeviceType] = useState("Desktop");

  useEffect(() => {
    const detectedDeviceType = getDeviceType();
    setDeviceType(detectedDeviceType);
    console.log("Device Type:", detectedDeviceType);
  }, []);

  return (
    <div className="relative">
      <AuroraBackground>
        <div className="relative w-full flex flex-col gap-4 items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative w-full flex flex-col gap-4 items-center justify-center"
          >
            <span className="pointer-events-none whitespace-pre-wrap text-center font-bold leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                Hi
              </span>
              <span>👋</span>
              <span className="bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                , my name is Aloysius
              </span>
            </span>

            <p className="text-neutral-600 dark:text-neutral-200 text-lg mb-3">
              Welcome to my portfolio
            </p>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black/[0.4] bg-white/[0.99] backdrop-blur-md text-black dark:text-white flex items-center space-x-2"
            >
              <span>Get started</span>
            </HoverBorderGradient>
          </motion.div>
        </div>
      </AuroraBackground>

      <FadeInWhenVisible>
        <section className="min-h-[100vh]">
          <div className="relative max-w-6xl mx-auto p-6 -mt-24 z-10">
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
  <div className="w-full rounded-2xl shadow-xl dark:shadow-reactive border bg-white/[0.69] dark:bg-black/[0.19] border-black/[0.1] dark:border-white/[0.2] backdrop-blur-md h-auto">
    {/* Conditionally render BorderBeam only if device type is not Mobile */}
    {deviceType !== "Mobile" && <BorderBeam />}
    <div className="flex justify-start items-center space-x-1.5 p-4">
      <span className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-700"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500"></span>
      <span className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-600"></span>
    </div>

    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-9 gap-0">
        <div className="m-10 col-span-1 sm:col-span-1 md:col-span-4 text-white rounded">
          <ScrollDrivenScribbles imagePath="/IMG_1035.JPG" />
        </div>
        <div className="m-10 my-10 col-span-1 sm:col-span-1 md:col-span-5 text-white rounded">
          <span className="bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400 font-bold leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            About Me
          </span>
        </div>
      </div>
    </div>
  </div>
</Tilt>

          </div>
        </section>
      </FadeInWhenVisible>
    </div>
  );
}
