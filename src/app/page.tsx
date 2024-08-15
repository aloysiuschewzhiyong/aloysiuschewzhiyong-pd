"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BorderBeam } from "@/components/ui/border-beam";
import ScrollDrivenScribbles from "@/components/scroll-scribble";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { TooltipWrapper } from "@/components/tooltip";

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
 
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
 
const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

// Utility function to detect device type
function getDeviceType() {
  const ua = navigator.userAgent;
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|WPDesktop|Opera Mini|BlackBerry/.test(
      ua
    )
  ) {
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

            <p className="text-zinc-600 dark:text-zinc-200 text-lg mb-3">
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
          <div className="relative max-w-6xl mx-auto p-6 sm:p-12 -mt-24 z-10">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="w-full rounded-2xl shadow-xl dark:shadow-reactive border bg-white/[0.69] dark:bg-black/[0.19] border-black/[0.1] dark:border-white/[0.2] backdrop-blur-md h-auto transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                {/* Conditionally render BorderBeam only if device type is not Mobile */}
                {deviceType !== "Mobile" && <BorderBeam />}
                <div className="flex justify-start items-center space-x-1.5 p-4">
                  <span className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-700"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-600"></span>
                </div>

                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-9 gap-0 items-center p-2">
                    <div className="mx-10 mt-6 col-span-1 sm:col-span-1 md:col-span-4 text-white rounded">
                      <ScrollDrivenScribbles imagePath="/IMG_1035.JPG" />
                    </div>
                    <div className="mx-10 col-span-1 sm:col-span-1 md:col-span-5 text-white rounded">
                      <span className="bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400 font-bold leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        About Me
                      </span>

                      <p className="mt-10 font-medium text-zinc-500 dark:text-zinc-300">
                        Hi, my name is{" "}
                        <span className="font-bold">Aloysius Chew</span> and I
                        am a year 3 student at Republic Polytechnic studying
                        Digital Design and Development and working towards being
                        a developer. This website will feature some of my works
                        in the projects tab.
                      </p>

                      <div className="flex mt-10 justify-between sm:justify-start sm:gap-2 md:gap-7 text-zinc-700 dark:text-zinc-300 pb-10 sm:pb-0">
                        <TooltipWrapper
                          name="Email"
                          designation="Send me an email"
                        >
                          <Button variant={"outline"} size={"icon"}>
                            <Mail />
                          </Button>
                        </TooltipWrapper>

                        <TooltipWrapper
                          name="Github"
                          designation="Check out my repos"
                        >
                          <Button variant={"outline"} size={"icon"}>
                            <Github />
                          </Button>
                        </TooltipWrapper>

                        <TooltipWrapper
                          name="Linkedin"
                          designation="Connect with me"
                        >
                          <Button variant={"outline"} size={"icon"}>
                            <Linkedin />
                          </Button>
                        </TooltipWrapper>

                        <TooltipWrapper
                          name="Email"
                          designation="Drop me an email"
                        >
                          <Button variant={"outline"} size={"icon"}>
                            <Mail />
                          </Button>
                        </TooltipWrapper>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </section>
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <section className="min-h-[100vh]">
          <div className="relative max-w-6xl mx-auto p-6 sm:p-12 -mt-24 z-10">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
            <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
            </Tilt>
          </div>
        </section>
      </FadeInWhenVisible>
    </div>
  );
}
