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
      initial="hidden"
      animate="visible"
      transition={{           
        delay: 0.6,
        duration: 0.3,
        ease: "easeInOut", }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
    >
      {children}
    </motion.div>
  );
}