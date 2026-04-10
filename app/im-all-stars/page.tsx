'use client';

import React from 'react';
import Image from 'next/image';
import CourseHero from '../components/CourseHero';
import ProgramPillars from '../components/ProgramPillars';
import RoadmapSection from '../components/RoadmapSection';
import VerticalDialNav from '../components/VerticalDialNav';
import PlanComparisonTable from '../components/PlanComparisonTable';
import MeetTheTeamSection from '../components/MeetTheTeamSection';

export default function IMAllStarsPage() {
  return (
    <main className="relative min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* Logo - Fixed at top left */}
      <div className="fixed top-4 left-4 z-40 sm:top-6 sm:left-6">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/logo.jpg"
            alt="Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Fixed Apply Now Button - Top Right */}
      <div className="fixed top-4 right-4 z-40 sm:top-6 sm:right-6">
        <button
          onClick={() => {
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
              pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="relative group px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 whitespace-nowrap"
          style={{
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Apply Now
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        </button>
      </div>

      {/* Vertical dial nav (fixed on the right) */}
      <VerticalDialNav />

      {/* Page content */}
      <div>
        <CourseHero />
        <ProgramPillars />
        <RoadmapSection />
        <MeetTheTeamSection />
        <PlanComparisonTable />
      </div>

    </main>
  );
}

