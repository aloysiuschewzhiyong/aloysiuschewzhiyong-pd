"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FadeInWhenVisible,
  FadeInUpWhenVisible,
} from "@/components/animations";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BorderBeam } from "@/components/ui/border-beam";
import ScrollDrivenScribbles from "@/components/scroll-scribble";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { Button, buttonVariants } from "@/components/ui/button";
import { Mail, Github, Linkedin, Newspaper, Youtube, Menu } from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { TooltipWrapper } from "@/components/tooltip";
import Link from "next/link";

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

  const targetDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectedDeviceType = getDeviceType();
    setDeviceType(detectedDeviceType);
    console.log("Device Type:", detectedDeviceType);
  }, []);

  const scrollToDiv = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // or "center", "end", etc., depending on your need
      });
    }
  };

  return (
    <div className="relative">
      <AuroraBackground className="h-dvh">
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
              onClick={scrollToDiv} // Add onClick to scroll to the target div
            >
              <span>Get started</span>
            </HoverBorderGradient>
          </motion.div>
        </div>
      </AuroraBackground>

      <FadeInWhenVisible>
        <section className="min-h-[100vh]" ref={targetDivRef}>
          {" "}
          {/* Attach the ref to this section */}
          <div className="relative max-w-6xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12 -mt-28 z-10">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="relative z-90  w-full rounded-2xl h-auto transform-gpu bg-transparent [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu  dark:[box-shadow:0_-10px_100px_-30px_#ffffff1f_inset] sm:dark:[box-shadow:0_-20px_69px_-20px_#ffffff1f_inset] md:[box-shadow:0_-20px_75px_-20px_#ffffff00_inset] lg:[box-shadow:0_-5px_100px_-80px_#ffffff1f_inset] transition-all duration-300 hover:[box-shadow:0_-35px_169px_-20px_#fffff000_inset] hover:dark:[box-shadow:0_-35px_172px_-20px_#ffffff1f_inset]">
                <div className="relative z-40 w-full rounded-2xl bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md h-auto shadow-lg dark:shadow-reactive">
                  {/* Conditionally render BorderBeam only if device type is not Mobile */}
                  {deviceType !== "Mobile" && <BorderBeam />}
                  <div className="flex justify-start items-center space-x-1.5 p-4">
                    <span className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-700"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-600"></span>
                  </div>

                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-9 gap-0 flex items-center mx-2 my-6 md:px-8 md:pb-10 lg:p-2  xl:px-14 xl:pb-16 xl:pt-6 ">
                      <div className="self-center ml-10 sm:mb-14 sm:ml-10  lg:m-20 xl:m-10 col-span-1 sm:col-span-1 md:col-span-4 text-white  z-10">
                        <ScrollDrivenScribbles imagePath="/IMG_1035.JPG" />
                      </div>
                      <div className="mx-10 mt-12 sm:ml-0 col-span-1 sm:col-span-1 md:col-span-5 text-white rounded">
                        <span className="bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400 font-bold leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                          About Me
                        </span>

                        <p className="mt-8 text-sm lg:text-base font-medium text-zinc-500 dark:text-zinc-300">
                          Hi, my name is
                          <span className="font-bold"> Aloysius Chew</span> and
                          I am a year 3 student at Republic Polytechnic studying
                          Digital Design and Development and working towards
                          being a developer. This website will feature some of
                          my works in the projects tab.
                        </p>

                        <div className="flex my-12 justify-between sm:justify-start sm:gap-2 md:gap-5 lg:gap-7 text-zinc-700 dark:text-zinc-300 pb-10 sm:pb-0">
                          <TooltipWrapper
                            name="Email"
                            designation="Send me an email"
                          >
                            <Link
                              href="mailto:aloysiuschewzhiyong@gmail.com"
                              className={buttonVariants({
                                variant: "outline",
                                size: "icon",
                              })}
                            >
                              <Mail />
                            </Link>
                          </TooltipWrapper>

                          <TooltipWrapper
                            name="Github"
                            designation="Check out my repos"
                          >
                            <Link
                              href="https://github.com/aloysiuschewzhiyong"
                              className={buttonVariants({
                                variant: "outline",
                                size: "icon",
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github />
                            </Link>
                          </TooltipWrapper>

                          <TooltipWrapper
                            name="Linkedin"
                            designation="Connect with me"
                          >
                            <Link
                              href="https://www.linkedin.com/in/aloysius-chew-880609244/"
                              className={buttonVariants({
                                variant: "outline",
                                size: "icon",
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin />
                            </Link>
                          </TooltipWrapper>

                          <TooltipWrapper
                            name="Resume"
                            designation="Take a look at my resume"
                          >
                            <Link
                              href="/resume.pdf"
                              className={buttonVariants({
                                variant: "outline",
                                size: "icon",
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Newspaper />
                            </Link>
                          </TooltipWrapper>

                          <TooltipWrapper
                            name="Youtube"
                            designation="Support my hobby"
                          >
                            <Link
                              href="https://www.youtube.com/@chikennuggetcurrysauce"
                              className={buttonVariants({
                                variant: "outline",
                                size: "icon",
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Youtube />
                            </Link>
                          </TooltipWrapper>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* <FadeInUpWhenVisible>
        <section className="min-h-[100dvh]">
          <div className="relative max-w-6xl mx-auto p-6 sm:p-12 z-10">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <BentoGrid className="lg:grid-rows-3">
                {features.map((feature) => (
                  <BentoCard key={feature.name} {...feature} />
                ))}
              </BentoGrid>
            </Tilt>
          </div>
        </section>
      </FadeInUpWhenVisible> */}
    </div>
  );
}
