"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react"; // Adjust the import paths according to your setup

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    icon?: JSX.Element; // Optional icon
    image?: string; // Optional image
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 300, damping: 20 };
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Separate tilt transforms for X and Y axis
  const rotateX = useSpring(
    useTransform(y, [-50, 50], [15, -15]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(x, [-50, 50], [-15, 15]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPos = event.clientX - rect.left - rect.width / 2;
    const yPos = event.clientY - rect.top - rect.height / 2;
    x.set(xPos);
    y.set(yPos);
  };

  return (
    <div className="flex mt-10 justify-between sm:justify-start sm:gap-2 md:gap-7 text-zinc-700 dark:text-zinc-300 pb-10 sm:pb-0">
      {items.map((item) => (
        <div
          className="relative group"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: x,
                  translateY: y,
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transformPerspective: 1000,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2 border border-gray-400 dark:border-gray-600"
              >
                <div className="font-bold text-white text-base">
                  {item.name}
                </div>
                <div className="text-white text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {item.image ? (
            <Image
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
            />
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="group-hover:scale-105 group-hover:z-30 transition duration-500"
            >
              {item.icon}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
