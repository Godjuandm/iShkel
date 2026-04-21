'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const translateMap: Record<string, string> = {
      up:    'translateY(44px)',
      down:  'translateY(-44px)',
      left:  'translateX(44px)',
      right: 'translateX(-44px)',
      none:  'translateY(0)',
    };

    // Hide immediately in JS — SSR renders it visible (no flash on slow connections)
    el.style.opacity = '0';
    el.style.transform = translateMap[direction];
    el.style.transition =
      `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
       transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
    el.style.transitionDelay = `${delay}ms`;
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translate(0, 0)';
          observer.disconnect();
        }
      },
      // rootMargin fires slightly before the section fully enters the viewport
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
