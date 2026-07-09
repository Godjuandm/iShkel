'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  /** Stagger direct children instead of animating this wrapper as one unit. */
  stagger?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: 'div' | 'section';
}

const EASE = [0.22, 1, 0.36, 1] as const;

function offsetFor(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
}

export default function Reveal({
  children,
  direction = 'up',
  distance = 32,
  duration = 0.7,
  delay = 0,
  stagger = 0,
  once = true,
  amount = 0.2,
  className,
  as = 'div',
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = as === 'section' ? motion.section : motion.div;

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const item: Variants = {
    hidden: { opacity: 0, ...offsetFor(direction, distance) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: EASE },
    },
  };

  if (stagger > 0) {
    const container: Variants = {
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren: delay } },
    };

    return (
      <MotionTag
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
        variants={container}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={item}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={item}>{children}</motion.div>}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={item}
    >
      {children}
    </MotionTag>
  );
}
