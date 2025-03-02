"use client";
import React, { useState, useEffect } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle"; // Adjust the import path as necessary
import { motion, useAnimation } from "framer-motion";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        controls.start({ y: 0 });
      } else if (currentScrollPos === 0) {
        // Scrolled to the top
        controls.start({ y: -100 }); // Adjust this value based on your navbar height
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls, prevScrollPos]);

  return (
    <motion.div
      className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50", className)}
      animate={controls}
      initial={{ y: -100 }}
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      <Menu setActive={setActive}>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Home"
          href="/#home"
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="About me"
          href="/#about"
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="Skills & Experience"
          href="/#skills"
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="Projects"
          href="/#projects"
        >
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Notflix"
              href="https://notflix0.vercel.app/"
              src="/projectCardImg/notflix0.vercel.app_.png"
              description="A free movies and TV shows streaming platform with no ads."
            />
            <ProductItem
              title="Task Manager Pro"
              href="#"
              src="https://assets.aceternity.com/demos/default.webp"
              description="Full-stack task management app with real-time updates and team collaboration."
            />
            <ProductItem
              title="Weather Dashboard"
              href="#"
              src="https://assets.aceternity.com/demos/default.webp"
              description="Real-time weather tracking with interactive maps and forecasts."
            />
            <ProductItem
              title="Portfolio Website"
              href="#"
              src="https://assets.aceternity.com/demos/default.webp"
              description="Modern portfolio built with Next.js, Framer Motion, and TailwindCSS."
            />
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Contact"
          href="/#contact"
        />
        <ModeToggle />
      </Menu>
    </motion.div>
  );
}
