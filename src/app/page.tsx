"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FadeInWhenVisible,
  FadeInUpWhenVisible,
} from "@/components/animations";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BorderBeam } from "@/components/ui/border-beam";
import ScrollDrivenScribbles from "@/components/scroll-scribble";
import Tilt from "react-parallax-tilt";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Mail,
  Github,
  Linkedin,
  Newspaper,
  Youtube,
  Code2,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { TooltipWrapper } from "@/components/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster, toast } from "sonner";

// Add TypeScript interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
  delay: number;
}

interface ProjectDialogProps {
  project: Project;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Add projects data
const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Notflix",
    description:
      "A free movies and TV shows streaming platform with no ads. Built with Next.js, featuring a modern UI and responsive design for a seamless viewing experience.",
    image: "/projectCardImg/notflix0.vercel.app_.png",
    githubUrl: "https://github.com/aloysiuschewzhiyong/notflix",
    liveUrl: "https://notflix0.vercel.app/",
    technologies: ["Next.js", "TailwindCSS", "TMDB"],
  },
  {
    id: 2,
    title: "Project Name",
    description:
      "A brief description of the project and its main features. What problems does it solve? Add more details about the project's impact and goals.",
    image: "/project2.jpg",
    githubUrl: "#",
    liveUrl: "#",
    technologies: ["TypeScript", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Project Name",
    description:
      "A brief description of the project and its main features. What problems does it solve? Add more details about the project's impact and goals.",
    image: "/project3.jpg",
    githubUrl: "#",
    liveUrl: "#",
    technologies: ["React Native", "Expo", "Firebase"],
  },
];

// Add more test projects
const allProjects: Project[] = [
  ...featuredProjects,
  {
    id: 4,
    title: "Personal Portfolio",
    description:
      "A modern portfolio website built with Next.js and Framer Motion. Features smooth animations, dark mode, and responsive design.",
    image: "/projectCardImg/portfolio.png",
    githubUrl: "https://github.com/aloysiuschewzhiyong/portfolio",
    liveUrl: "#",
    technologies: ["Next.js", "TailwindCSS", "Framer Motion"],
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description:
      "A weather application that provides real-time weather data and forecasts. Built with Next.js and OpenWeather API.",
    image: "/project2.jpg",
    githubUrl: "#",
    liveUrl: "#",
    technologies: ["Next.js", "TailwindCSS", "OpenWeather API"],
  },
  {
    id: 6,
    title: "Task Manager",
    description:
      "A full-stack task management application with user authentication and real-time updates.",
    image: "/project3.jpg",
    githubUrl: "#",
    liveUrl: "#",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
  },
];

// Update ProjectCard component to include dialog
const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="group relative bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => setIsDialogOpen(true)}
    >
      <div className="aspect-[16/10] relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-2 justify-end">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-1.5 mb-3">
          <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            {project.title}
          </h4>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 line-clamp-3">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className="text-[11px] font-medium bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-2 py-0.5 rounded-lg text-zinc-600 dark:text-zinc-400"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Update AllProjectsDialog component
const AllProjectsDialog: React.FC<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-white dark:bg-white/[0.03] backdrop-blur-xl border border-black/[0.1] dark:border-white/[0.2] shadow-lg dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.15)] dark:[box-shadow:inset_0_-12px_60px_-5px_rgba(255,255,255,0.1)]">
        <div className="flex flex-col h-[85vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                All Projects
              </DialogTitle>
              <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                Browse through all my projects and experiments.
              </DialogDescription>
            </DialogHeader>
          </div>
          <ScrollArea className="flex-1 w-full">
            <div className="h-full">
              <div className="p-6 pt-0 space-y-6">
                {allProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-white/[0.03] border backdrop-blur-md rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:shadow-[0_4px_20px_-12px_rgba(255,255,255,0.1)] dark:[box-shadow:inset_0_-8px_40px_-5px_rgba(255,255,255,0.05),0_4px_20px_-12px_rgba(255,255,255,0.1)] hover:dark:[box-shadow:inset_0_-12px_60px_-5px_rgba(255,255,255,0.08),0_8px_30px_-12px_rgba(255,255,255,0.15)]"
                  >
                    <div className="sm:w-[320px] aspect-[16/10] relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="flex-1 p-6 pt-4 sm:pt-6">
                      <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <div
                            key={index}
                            className="text-xs font-medium bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-2 py-1 rounded-lg text-zinc-600 dark:text-zinc-400"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                          })}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Source
                        </Link>
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonVariants({
                            variant: "default",
                            size: "sm",
                          })}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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

// Update the View All link to use the dialog
const ProjectsSection = () => {
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);

  return (
    <>
      <div className="flex-1 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          Featured Projects
        </h3>
        <button
          onClick={() => setIsAllProjectsOpen(true)}
          className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          View All →
        </button>
      </div>

      <AllProjectsDialog
        isOpen={isAllProjectsOpen}
        onOpenChange={setIsAllProjectsOpen}
      />
    </>
  );
};

export default function Home() {
  const [deviceType, setDeviceType] = useState("Desktop");
  const controls = useAnimationControls();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [skillsCardComplete, setSkillsCardComplete] = useState(false);
  const [educationCardComplete, setEducationCardComplete] = useState(false);
  const [experienceCardComplete, setExperienceCardComplete] = useState(false);
  const [competitionsCardComplete, setCompetitionsCardComplete] =
    useState(false);
  const [projectsCardComplete, setProjectsCardComplete] = useState(false);
  const [connectCardComplete, setConnectCardComplete] = useState(false);
  const [educationInView, setEducationInView] = useState(false);
  const [experienceInView, setExperienceInView] = useState(false);

  useEffect(() => {
    const detectedDeviceType = getDeviceType();
    setDeviceType(detectedDeviceType);
    console.log("Device Type:", detectedDeviceType);
  }, []);

  const scrollToDiv = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Initial animation
  useEffect(() => {
    controls.start({
      rotate: [0, 20, -10, 0],
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1],
      },
    });
  }, [controls]);

  return (
    <div className="relative">
      <AuroraBackground className="h-dvh" id="home">
        <div className="relative w-full flex flex-col gap-4 items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative w-full flex flex-col gap-4 items-center justify-center"
          >
            <span className="pointer-events-none whitespace-pre-wrap text-center font-bold leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                Hi
              </span>
              <motion.span
                animate={controls}
                initial={{ rotate: 0 }}
                whileHover={{
                  rotate: [0, 20, -10, 0],
                  transition: {
                    duration: 0.6,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.7, 1],
                  },
                }}
                className="inline-block cursor-pointer pointer-events-auto"
              >
                👋
              </motion.span>
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
              onClick={scrollToDiv}
            >
              <span>Get started</span>
            </HoverBorderGradient>
          </motion.div>
        </div>
      </AuroraBackground>

      <FadeInWhenVisible>
        <section className="min-h-[100vh]" ref={targetDivRef} id="about">
          {" "}
          {/* Attach the ref to this section */}
          <div className="relative max-w-6xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12 -mt-28 z-10">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="relative z-90  w-full rounded-2xl h-auto transform-gpu bg-transparent [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[box-shadow:0_-20px_100px_-20px_rgba(255,255,255,0.08)_inset] hover:dark:[box-shadow:0_-35px_120px_-20px_rgba(255,255,255,0.12)_inset] transition-all duration-300">
                <div className="relative z-40 w-full rounded-2xl bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md h-auto shadow-lg dark:shadow-reactive">
                  {/* Conditionally render BorderBeam only if device type is not Mobile */}
                  {deviceType !== "Mobile" && <BorderBeam />}
                  <div className="flex justify-start items-center space-x-1.5 p-4">
                    <span className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-700"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-600"></span>
                  </div>

                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-9 gap-0 flex items-center mx-2 my-6 md:px-8 md:pb-10 lg:p-2  xl:px-14 xl:pb-16 xl:pt-6 ">
                      <div className="self-center mx-auto sm:ml-10 sm:mb-14 lg:m-20 xl:m-10 col-span-1 sm:col-span-1 md:col-span-4 text-white  z-10">
                        <ScrollDrivenScribbles imagePath="/IMG_1035.JPG" />
                      </div>
                      <div className="mx-10 mt-12 sm:ml-0 col-span-1 sm:col-span-1 md:col-span-5 text-white rounded">
                        <span className="bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400 font-bold leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
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

      <FadeInUpWhenVisible>
        <section className="py-20" id="skills">
          <div className="relative max-w-6xl mx-auto p-6 sm:p-8 z-10">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400">
              Skills & Experience
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ margin: "-100px" }}
            >
              {/* Skills & Technologies */}
              <motion.div
                initial={{ opacity: 0.2, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    duration: 0.15,
                    delay: 0,
                    ease: "easeOut",
                  },
                }}
                viewport={{ margin: "-50px" }}
                onAnimationComplete={() => setSkillsCardComplete(true)}
                className="md:col-span-2 relative rounded-2xl bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md p-6 transform-gpu shadow-md hover:shadow-lg dark:[box-shadow:inset_0_-8px_40px_-5px_rgba(255,255,255,0.1)] hover:dark:[box-shadow:inset_0_-12px_60px_-5px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                    Skills & Technologies
                  </h3>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: skillsCardComplete ? 1 : 0,
                    y: skillsCardComplete ? 0 : 20,
                  }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                  >
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                      Frontend Development
                    </h4>
                    <div className="flex flex-wrap gap-3 text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-react-original text-[#61DAFB]"></i>
                        <span>React</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-react-original text-[#61DAFB]"></i>
                        <span>React Native</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-nextjs-plain text-black text-lg dark:text-white"></i>
                        <span>Next.js</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-typescript-plain text-[#3178C6]"></i>
                        <span>TypeScript</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-tailwindcss-plain text-[#38B2AC]"></i>
                        <span>TailwindCSS</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-javascript-plain text-[#F7DF1E]"></i>
                        <span>JavaScript</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-html5-plain text-[#E34F26]"></i>
                        <span>HTML/CSS</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                  >
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                      Backend Development
                    </h4>
                    <div className="flex flex-wrap gap-3 text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-nodejs-plain text-[#339933] text-lg"></i>
                        <span>Node.js</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-express-original text-black text-lg dark:text-white"></i>
                        <span>Express.js</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-mongodb-plain text-[#47A248] text-lg"></i>
                        <span>MongoDB</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-mysql-plain text-[#4479A1] text-lg"></i>
                        <span>MySQL</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-microsoftsqlserver-plain text-[#CC2927] text-lg"></i>
                        <span>MS SQL</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-python-plain text-[#3776AB]"></i>
                        <span>Python</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.6 }}
                  >
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                      Development Tools
                    </h4>
                    <div className="flex flex-wrap gap-3 text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-git-plain text-[#F05032]"></i>
                        <span>Git</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-github-plain text-black dark:text-white"></i>
                        <span>GitHub</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <i className="devicon-figma-plain text-[#F24E1E]"></i>
                        <span>Figma</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md px-3 py-1.5 rounded-xl hover:scale-105 hover:shadow-md transition-all duration-200">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 22"
                          fill="currentColor"
                        >
                          <path d="M11.39 8.269c.19-.277.397-.312.565-.312.168 0 .447.035.637.312 1.49 2.03 3.95 6.075 5.765 5.765 9.06 1.184 1.945 2.093 3.44 2.28 3.63.7.714 1.66.269 2.218-.541.549-.797.701-1.357.701-1.954 0-.407-7.958-15.087-8.759-16.309C14.027.98 13.775.683 12.457.683h-.988c-1.315 0-1.505.297-2.276 1.472C8.392 3.377.433 18.057.433 18.463c0 .598.153 1.158.703 1.955.558.81 1.518 1.255 2.218.54.186-.19 1.095-1.684 2.279-3.63 1.815-2.984 4.267-7.029 5.758-9.06z" />
                        </svg>
                        <span>Expo</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Education & Achievements */}
              <motion.div
                initial={{ opacity: 0.2, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  duration: 0.15,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                viewport={{ margin: "-50px", once: false }}
                onViewportEnter={() => setEducationInView(true)}
                onViewportLeave={() => setEducationInView(false)}
                className="md:col-span-1 relative rounded-2xl bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md p-6 transform-gpu shadow-md hover:shadow-lg dark:[box-shadow:inset_0_-8px_40px_-5px_rgba(255,255,255,0.1)] hover:dark:[box-shadow:inset_0_-12px_60px_-5px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                    Education
                  </h3>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: educationInView ? 1 : 0,
                    y: educationInView ? 0 : 20,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-medium text-zinc-800 dark:text-zinc-200 mb-4">
                    Republic Polytechnic
                  </h4>

                  <div className="relative pl-6 mt-4">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: educationInView ? "100%" : 0,
                      }}
                      transition={{ duration: 0.3, delay: 1.2 }}
                      className="absolute left-0 bottom-[-24px] w-[2px] bg-zinc-200 dark:bg-zinc-700"
                      style={{ transformOrigin: "bottom" }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: educationInView ? 1 : 0,
                        y: educationInView ? 0 : 20,
                      }}
                      transition={{ duration: 0.15, delay: 1.5 }}
                      className="absolute left-[-4px] top-[6px] w-[10px] h-[10px] rounded-full bg-emerald-500 ring-4 ring-white dark:ring-black"
                    />
                    <p className="font-medium text-zinc-700 dark:text-zinc-300">
                      Diploma in Digital Design and Development (SOI)
                    </p>
                    <div className="inline-flex items-center gap-1.5 mt-2 text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-lg">
                      <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      Apr 2022 - May 2025
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                          Awards & Achievements
                        </span>
                        <ul className="mt-2 list-disc list-inside pl-2 space-y-1">
                          <li>Director&apos;s List (AY2023 Semester 2)</li>
                          <li>Director&apos;s List (AY2024 Semester 2)</li>
                          <li>GPA: 3.56/4.0</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="relative pl-6 mt-6">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: educationInView ? "100%" : 0,
                      }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="absolute left-0 bottom-[-24px] w-[2px] bg-zinc-200 dark:bg-zinc-700"
                      style={{ transformOrigin: "bottom" }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: educationInView ? 1 : 0,
                        y: educationInView ? 0 : 20,
                      }}
                      transition={{ duration: 0.15, delay: 0.9 }}
                      className="absolute left-[-4px] top-[6px] w-[10px] h-[10px] rounded-full bg-zinc-300 dark:bg-zinc-600 ring-4 ring-white dark:ring-black"
                    />
                    <p className="font-medium text-zinc-700 dark:text-zinc-300">
                      Polytechnic Foundation Programme (CFS)
                    </p>
                    <div className="inline-flex items-center gap-1.5 mt-2 text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-lg text-zinc-600 dark:text-zinc-400">
                      Apr 2021 - Feb 2022
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Career & Experience */}
              <motion.div
                initial={{ opacity: 0.2, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  duration: 0.15,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                viewport={{ margin: "-50px", once: false }}
                onViewportEnter={() => setExperienceInView(true)}
                onViewportLeave={() => setExperienceInView(false)}
                className="md:col-span-1 relative rounded-2xl bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md p-6 transform-gpu shadow-md hover:shadow-lg dark:[box-shadow:inset_0_-8px_40px_-5px_rgba(255,255,255,0.1)] hover:dark:[box-shadow:inset_0_-12px_60px_-5px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                    Career & Experience
                  </h3>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: experienceInView ? 1 : 0,
                    y: experienceInView ? 0 : 20,
                  }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: experienceInView ? 1 : 0,
                      y: experienceInView ? 0 : 20,
                    }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                  >
                    <h4 className="font-medium text-zinc-800 dark:text-zinc-200 mb-4">
                      Absolute Kinetics Consultancy Pte Ltd
                    </h4>

                    <div className="relative pl-6 mt-4">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: experienceInView ? "100%" : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        className="absolute left-0 bottom-[-24px] w-[2px] bg-zinc-200 dark:bg-zinc-700"
                        style={{ transformOrigin: "bottom" }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: experienceInView ? 1 : 0,
                          y: experienceInView ? 0 : 20,
                        }}
                        transition={{ duration: 0.15, delay: 0.9 }}
                        className="absolute left-[-4px] top-[6px] w-[10px] h-[10px] rounded-full bg-zinc-300 dark:bg-zinc-600 ring-4 ring-white dark:ring-black"
                      />
                      <p className="font-medium text-zinc-700 dark:text-zinc-300">
                        Intern IT Programmer
                      </p>
                      <div className="inline-flex items-center gap-1.5 mt-2 text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-lg text-zinc-600 dark:text-zinc-400">
                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
                        Sept 2024 - Jan 2025
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          <ul className="list-disc list-inside pl-2 space-y-1">
                            <li>
                              Developed a Next.js email-blasting
                              solution—similar to paid platforms like
                              &quot;Brevo&quot; but cost-free—cutting errors and
                              saving money.
                            </li>
                            <li>
                              Built a new company website, replacing the older
                              version and enhancing brand identity and user
                              experience.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Competitions & Events */}
              <motion.div
                initial={{ opacity: 0.2, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    duration: 0.15,
                    delay: 0.1,
                    ease: "easeOut",
                  },
                }}
                viewport={{ margin: "-50px" }}
                onAnimationComplete={() => setCompetitionsCardComplete(true)}
                className="md:col-span-2 relative rounded-2xl bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md p-6 transform-gpu shadow-md hover:shadow-lg dark:[box-shadow:inset_0_-8px_40px_-5px_rgba(255,255,255,0.1)] hover:dark:[box-shadow:inset_0_-12px_60px_-5px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                    Competitions & Events
                  </h3>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: competitionsCardComplete ? 1 : 0,
                    y: competitionsCardComplete ? 0 : 20,
                  }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                  >
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-300">
                      Hackathons & Competitions
                    </h4>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md rounded-xl p-4">
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-24 relative mb-3">
                            <Image
                              src="/dsta-logo.png"
                              alt="DSTA Logo"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="text-center space-y-1">
                            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                              DSTA BrainHack CODE_EXP 2024
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                              Defense tech hackathon focused on AI/ML solutions
                            </p>
                            <div className="inline-flex items-center gap-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-lg text-zinc-600 dark:text-zinc-400">
                              March 2024
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md rounded-xl p-4">
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-24 relative mb-3">
                            <Image
                              src="/splash awards.png"
                              alt="SCS Logo"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="text-center space-y-1">
                            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                              SCS Splash Awards 2023
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                              Digital creative competition for innovative tech
                              solutions
                            </p>
                            <div className="inline-flex items-center gap-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-lg text-zinc-600 dark:text-zinc-400">
                              October 2023
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </FadeInUpWhenVisible>

      {/* Move Featured Projects out of the grid and before Let's Connect */}
      <FadeInUpWhenVisible>
        <section className="py-20" id="projects">
          <div className="relative max-w-6xl mx-auto p-6 sm:p-8 z-10">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400">
              Projects
            </h2>
            <motion.div
              initial={{ opacity: 0.2, scale: 0 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  duration: 0.15,
                  delay: 0.1,
                  ease: "easeOut",
                },
              }}
              viewport={{ margin: "-50px" }}
              onAnimationComplete={() => setProjectsCardComplete(true)}
              className="relative rounded-2xl bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md p-6 transform-gpu shadow-md hover:shadow-lg dark:[box-shadow:inset_0_-8px_40px_-5px_rgba(255,255,255,0.1)] hover:dark:[box-shadow:inset_0_-12px_60px_-5px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                </div>
                <ProjectsSection />
              </div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6">
                These are my featured projects showcased here, to take a look a
                my full archive of projects click the &quot;View All&quot;
                button
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: projectsCardComplete ? 1 : 0,
                  y: projectsCardComplete ? 0 : 20,
                }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    delay={0.69 + index * 0.1}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </FadeInUpWhenVisible>

      <FadeInUpWhenVisible>
        <section className="py-20" id="contact">
          <div className="relative max-w-6xl mx-auto p-6 sm:p-8 z-10">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent dark:from-white dark:to-gray-400">
              Let&apos;s Connect
            </h2>
            <motion.div
              initial={{ opacity: 0.2, scale: 0 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  duration: 0.15,
                  delay: 0.1,
                  ease: "easeOut",
                },
              }}
              viewport={{ margin: "-50px" }}
              onAnimationComplete={() => setConnectCardComplete(true)}
              className="relative rounded-2xl bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md p-6 transform-gpu shadow-md hover:shadow-lg dark:[box-shadow:inset_0_-8px_40px_-5px_rgba(255,255,255,0.1)] hover:dark:[box-shadow:inset_0_-12px_60px_-5px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-white/[0.69] dark:bg-white/[0.03] dark:[border:1px_solid_rgba(255,255,255,.1)] border backdrop-blur-md flex items-center justify-center">
                  <Mail className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                  Get in Touch
                </h3>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: connectCardComplete ? 1 : 0,
                  y: connectCardComplete ? 0 : 20,
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6">
                  Have an exciting project in mind? Whether you&apos;re looking
                  to collaborate, discuss opportunities, or just share ideas
                  about tech and development, I&apos;d love to hear from you.
                  Drop me a message below!
                </p>
                <form
                  className="w-full space-y-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const data = {
                      name: formData.get("name"),
                      email: formData.get("email"),
                      subject: formData.get("subject"),
                      message: formData.get("message"),
                    };

                    const submitButton = form.querySelector(
                      'button[type="submit"]'
                    ) as HTMLButtonElement;
                    submitButton.disabled = true;
                    submitButton.innerHTML =
                      '<span class="animate-pulse">Sending...</span>';

                    const textarea = form.querySelector(
                      "textarea"
                    ) as HTMLTextAreaElement;
                    const originalHeight = textarea.style.height;

                    try {
                      const response = await fetch("/api/send", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                      });

                      if (response.ok) {
                        toast("Message sent successfully!", {
                          icon: "🎉 ",
                          description:
                            "I will get back to you as soon as possible.",
                          duration: 5000,
                          style: {
                            background:
                              "var(--background, rgba(255, 255, 255, 0.69))",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                            color: "var(--foreground, rgb(55, 65, 81))",
                            fontSize: "0.95rem",
                            borderRadius: "1.2rem",
                            padding: "1.25rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            transform: "translateZ(0)",
                            transition: "all 0.2s ease-in-out",
                          },
                          classNames: {
                            description:
                              "!text-zinc-500 dark:!text-zinc-400 !font-normal",
                            title: "!font-medium !text-base",
                            icon: "!text-2xl !mr-2",
                            toast:
                              "dark:!bg-black/[0.39] dark:!border-white/[0.1] !border-2 !border-zinc-200/50 dark:!border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.07)] transition-all hover:!border-zinc-300 dark:hover:!border-white/20",
                          },
                        });
                        form.reset();
                        textarea.style.height = originalHeight;
                      } else {
                        toast("Failed to send message", {
                          icon: "❌ ",
                          description: "Please try again.",
                          duration: 5000,
                          style: {
                            background:
                              "var(--background, rgba(255, 255, 255, 0.69))",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                            color: "var(--foreground, rgb(55, 65, 81))",
                            fontSize: "0.95rem",
                            borderRadius: "1.2rem",
                            padding: "1.25rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            transform: "translateZ(0)",
                            transition: "all 0.2s ease-in-out",
                          },
                          classNames: {
                            description:
                              "!text-zinc-500 dark:!text-zinc-400 !font-normal",
                            title: "!font-medium !text-base",
                            icon: "!text-2xl !mr-2",
                            toast:
                              "dark:!bg-black/[0.39] dark:!border-white/[0.1] !border-2 !border-zinc-200/50 dark:!border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.07)] transition-all hover:!border-zinc-300 dark:hover:!border-white/20",
                          },
                        });
                      }
                    } catch (error) {
                      toast("An error occurred", {
                        icon: "⚠️ ",
                        description: "Please try again later.",
                        duration: 5000,
                        style: {
                          background:
                            "var(--background, rgba(255, 255, 255, 0.69))",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                          color: "var(--foreground, rgb(55, 65, 81))",
                          fontSize: "0.95rem",
                          borderRadius: "1.2rem",
                          padding: "1.25rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          transform: "translateZ(0)",
                          transition: "all 0.2s ease-in-out",
                        },
                        classNames: {
                          description:
                            "!text-zinc-500 dark:!text-zinc-400 !font-normal",
                          title: "!font-medium !text-base",
                          icon: "!text-2xl !mr-2",
                          toast:
                            "dark:!bg-black/[0.39] dark:!border-white/[0.1] !border-2 !border-zinc-200/50 dark:!border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.07)] transition-all hover:!border-zinc-300 dark:hover:!border-white/20",
                        },
                      });
                    } finally {
                      submitButton.disabled = false;
                      submitButton.innerHTML = "Send Message";
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                      >
                        Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="w-full bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] backdrop-blur-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                      >
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        className="w-full bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] backdrop-blur-md"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                    >
                      Subject
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      className="w-full bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] backdrop-blur-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={8}
                      placeholder="Your message here..."
                      className="w-full bg-white/[0.69] dark:bg-black/[0.39] dark:[border:1px_solid_rgba(255,255,255,.1)] backdrop-blur-md min-h-[200px] resize-y"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </FadeInUpWhenVisible>
      <Toaster
        position="bottom-right"
        expand={true}
        richColors={false}
        theme={deviceType === "Mobile" ? "light" : "system"}
        className="!font-sans"
        toastOptions={{
          style: {
            background: "var(--background, rgba(255, 255, 255, 0.69))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
            color: "var(--foreground, rgb(55, 65, 81))",
            fontSize: "0.95rem",
            borderRadius: "1.2rem",
            padding: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            transform: "translateZ(0)",
            transition: "all 0.2s ease-in-out",
          },
          classNames: {
            description: "!text-zinc-500 dark:!text-zinc-400 !font-normal",
            title: "!font-medium !text-base",
            icon: "!text-2xl !mr-2",
            toast:
              "dark:!bg-black/[0.39] dark:!border-white/[0.1] !border-2 !border-zinc-200/50 dark:!border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.07)] transition-all hover:!border-zinc-300 dark:hover:!border-white/20",
          },
          duration: 5000,
        }}
      />
    </div>
  );
}
