"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  mass: 0.3,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href?.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const textRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.offsetWidth;
      textRef.current.style.setProperty("--width", `${width}px`);
    }
  }, [item]);

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <Link href={href || "#"} onClick={handleClick}>
        <motion.p
          ref={textRef}
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
        >
          {item}
        </motion.p>
      </Link>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div
              className={cn(
                "absolute top-[calc(100%_+_0.3rem)]",
                item === "Projects"
                  ? "left-1/2 transform -translate-x-1/2 pt-4"
                  : "left-0 w-full"
              )}
            >
              <motion.div
                transition={transition}
                layoutId="active"
                className={cn(
                  "bg-white/[0.79] dark:bg-black/[0.75] backdrop-blur-lg overflow-hidden border border-black/[0.1] dark:border-white/[0.2] shadow-xl dark:shadow-[0_8px_32px_rgba(255,255,255,0.1)]",
                  item === "Projects" ? "rounded-2xl" : "rounded-full"
                )}
                style={
                  item !== "Projects" ? { width: "var(--width)" } : undefined
                }
              >
                <motion.div
                  layout
                  className={cn(
                    "backdrop-blur-lg",
                    item === "Projects" ? "p-4 w-max" : "py-1.5"
                  )}
                >
                  {item === "Projects" ? children : null}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-black/[0.1] flex justify-center items-center dark:bg-black/[0.45] dark:border-white/[0.2] bg-white/[0.79] backdrop-blur-md drop-shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.07)] flex justify-center space-x-4 px-8 py-1"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
    >
      {children}
    </Link>
  );
};
