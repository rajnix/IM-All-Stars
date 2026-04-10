'use client';

import React from 'react';
import TiltCardGrid, { PillarCard } from './TiltCardGrid';

const PROGRAM_PILLARS: PillarCard[] = [
  {
    id: 'conceptual-foundations',
    title: 'Conceptual Foundations',
    description: "Built from scratch. No assumed knowledge.",
    iconType: 'target',
  },
  {
    id: 'problem-solving-speed',
    title: 'Problem Solving Speed',
    description: "JEE tempo drills and timed practice.",
    iconType: 'lightbulb',
  },
  {
    id: 'jee-level-questions',
    title: 'JEE-Level Questions',
    description: "Real exam patterns, real difficulty.",
    iconType: 'graduation',
  },
  {
    id: 'top-performer-mindset',
    title: 'Top Performer Mindset',
    description: "Think, approach, and solve like rankers.",
    iconType: 'chart',
  },
];

export default function ProgramPillars() {
  return (
    <section
      id="pillars"
      aria-labelledby="pillars-heading"
      className="relative w-full bg-transparent overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-violet-600/8 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-indigo-600/8 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-3">
            THE PROGRAM
          </p>
          <h2
            id="pillars-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3"
          >
            This Is Not Just Another Coaching Class
          </h2>
          <p className="text-base sm:text-lg text-slate-300/80 leading-relaxed max-w-2xl mx-auto">
            We&apos;ve designed a 10-week intensive Physics cohort specifically for Indian students preparing for JEE, currently based in Singapore. Whether you&apos;re struggling with basics or aiming for top ranks, this program will get you there.
          </p>
        </div>

        {/* 4-Card Tilt Grid */}
        <TiltCardGrid cards={PROGRAM_PILLARS} />
      </div>
    </section>
  );
}
