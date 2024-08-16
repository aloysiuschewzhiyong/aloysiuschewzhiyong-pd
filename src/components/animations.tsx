import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
};

export function FadeInWhenVisible({ children }: Props) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{           
        delay: 0.6,
        duration: 0.3,
        ease: "easeInOut", }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 }
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInUpWhenVisible({ children }: Props) {
  return (
    <motion.div
    initial={{ opacity: 0.0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{           
      delay: 0.3,
      duration: 0.3,
      ease: "easeInOut", }}
    className="relative w-full flex flex-col gap-4 items-center justify-center"
  >
      {children}
    </motion.div>
  );
}