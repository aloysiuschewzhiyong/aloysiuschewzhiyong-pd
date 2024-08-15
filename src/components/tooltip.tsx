"use client";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface TooltipWrapperProps {
  children: React.ReactNode;
  name: string;
  designation: string;
  className?: string;
}

export const TooltipWrapper = ({
  children,
  name,
  designation,
  className = "",
}: TooltipWrapperProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const springConfig = { stiffness: 100, damping: 5 };

  const x = useMotionValue(0);

  // Even more sensitive rotation effect
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-30, 30]), // Increased rotation range for higher sensitivity
    springConfig
  );

  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-30, 30]), // Adjusted translation for sensitivity
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <div
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute -top-16 -left-[30%] -translate-x-[40%] flex text-xs flex-col items-center justify-center rounded-md dark:bg-black/[0.95] dark:border-white/[0.2] bg-white/[0.89] backdrop-blur-md drop-shadow-lg dark:shadow-reactive z-50  px-4 py-2 border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]
            // dark styles
            transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_40px_-20px_#ffffff1f_inset]"
          >
            <div className="font-bold relative z-30 text-base">
              {name}
            </div>
            <div className="text-xs">{designation}</div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
