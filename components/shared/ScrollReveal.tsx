'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
  children: ReactNode;
  /**
   * Seconds before the tween starts after the trigger fires.
   * GSAP uses seconds — e.g. 0.15 = 150 ms.
   */
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance in px to travel. Default 40. */
  distance?: number;
  /** Tween duration in seconds. Default 0.8. */
  duration?: number;
  /**
   * When > 0 each *direct child* staggers by this many seconds instead of
   * the wrapper animating as a single unit.
   */
  stagger?: number;
  /**
   * Viewport threshold at which the animation fires.
   * e.g. 'top 80%' means the top of the element hits 80% down the viewport.
   */
  start?: string;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 0.8,
  stagger = 0,
  start = 'top 80%',
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = ref.current;
    if (!wrapper) return;

    // fromVars: initial hidden state
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    };

    // toVars: revealed state
    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: wrapper,
        start,
        toggleActions: 'play none none none',
      },
    };

    // Scope all GSAP work to this component so cleanup is automatic
    const ctx = gsap.context(() => {
      if (stagger > 0) {
        // Animate each direct child in sequence
        gsap.fromTo(
          Array.from(wrapper.children),
          fromVars,
          { ...toVars, stagger },
        );
      } else {
        gsap.fromTo(wrapper, fromVars, toVars);
      }
    }, wrapper);

    // Reverts all tweens/ScrollTriggers created inside this context on unmount
    return () => ctx.revert();
  }, [delay, direction, distance, duration, stagger, start]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
}
