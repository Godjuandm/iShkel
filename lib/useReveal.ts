'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Batch-animates every element matching `selector` (default '.reveal') on the
 * current page using GSAP ScrollTrigger.
 *
 * Usage — call once near the top of any client component or page:
 *
 *   useReveal();           // targets .reveal
 *   useReveal('.card');    // targets .card
 *
 * Then add the class to any JSX element you want to animate:
 *
 *   <section className="reveal">…</section>
 */
export function useReveal(selector = '.reveal') {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // group nearby elements so they stagger together
      ScrollTrigger.batch(selector, {
        start: 'top 82%',
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power2.out',
              stagger: 0.12,
            }
          ),
        // play once only — no reverse on scroll-up
        once: true,
      });
    });

    return () => ctx.revert();
  }, [selector]);
}
