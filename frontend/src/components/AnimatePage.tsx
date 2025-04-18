// components/AnimatePage.tsx
'use client';

import { motion } from 'framer-motion';
import React from 'react';

const animation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

export default function AnimatePage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
    >
      {children}
    </motion.div>
  );
}
