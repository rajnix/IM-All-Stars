'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface SectionConfig {
  id: string;
  label: string;
}

const sections: SectionConfig[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'pillars', label: 'Four Pillars' },
  { id: 'roadmap', label: '45-day roadmap' },
  { id: 'team', label: 'Meet the team' },
  { id: 'pricing', label: 'Pricing' },
];

const VerticalDialNav: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let currentSection = sections[0].id;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            currentSection = section.id;
          }
        }
      }
      
      setActiveId(currentSection);
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener with throttling
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    const headerOffset = 80; // Adjust this value based on your fixed header height
    const elementPosition = el.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="pointer-events-none fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      {/* Slim vertical pill */}
      <nav className="pointer-events-auto w-12 rounded-full border border-white/10 bg-black/40 py-5 shadow-xl backdrop-blur-md">
        <div className="relative flex h-full flex-col items-center gap-5">
          {/* vertical rail line behind dots */}
          <span className="pointer-events-none absolute left-1/2 top-3 bottom-3 -z-10 w-px -translate-x-1/2 bg-white/10" />

          {sections.map((section) => {
            const isActive = activeId === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleClick(section.id)}
                className="group relative flex h-8 w-full items-center justify-center focus:outline-none"
              >
                {/* label bubble OUTSIDE the pill (does not affect width) */}
                <span
                  className={`pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-gray-100 shadow-lg backdrop-blur-sm transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {section.label}
                </span>

                {/* dot + active halo */}
                <div className="relative flex items-center justify-center">
                  {isActive && (
                    <motion.div
                      layoutId="vertical-dial-active"
                      className="absolute h-8 w-8 rounded-full bg-violet-500/20 border border-violet-400/60"
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 rounded-full transition-all ${
                      isActive
                        ? 'h-3.5 w-3.5 bg-violet-400'
                        : 'h-2.5 w-2.5 bg-gray-500/70 group-hover:bg-gray-100'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default VerticalDialNav;
