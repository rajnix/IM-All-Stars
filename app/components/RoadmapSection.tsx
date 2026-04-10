'use client';

import React from 'react';
import RoadmapJourney from './RoadmapJourney';

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="relative w-full bg-transparent overflow-hidden"
    >
      {/* Subtle gradient glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Heading and Subheading */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-3">
            WHAT YOU&apos;LL LEARN
          </p>
          <h2
            id="roadmap-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white"
          >
            Your 10-Week Transformation
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-300 font-semibold">
            Confused → Confident → Competitive
          </p>
        </div>

        {/* Journey Stepper */}
        <RoadmapJourney />
      </div>
    </section>
  );
}
