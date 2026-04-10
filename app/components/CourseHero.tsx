'use client';

import React from 'react';
import AmbiLightVideo from './AmbiLightVideo';
import CountdownTimer from './CountdownTimer';

export default function CourseHero() {

  return (
    <section 
      id="overview"
      aria-labelledby="hero-heading" 
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0B0B10] via-[#020617] to-[#0B0B10]"
    >

      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 h-96 w-96 bg-violet-600/20 blur-3xl rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 bg-indigo-600/20 blur-3xl rounded-full translate-y-1/2" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-12 lg:pt-16 lg:pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-stretch">
          
          {/* Left Column - Main Content */}
          <div className="space-y-8 lg:flex-1">
            {/* Brand Badge */}
            <div className="inline-flex">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20">
                🔥 Limited Seats — Singapore Cohort 2025
              </span>
            </div>

            {/* Main Heading + Subtitle */}
            <div className="max-w-3xl space-y-6">
              <div className="space-y-2">
                <h1 
                  id="hero-heading"
                  className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-white leading-tight"
                >
                  From Zero to JEE-Level Physics in 10 Weeks
                </h1>
              </div>

              {/* Main Description */}
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                An exclusive offline cohort in Singapore for Indian students — designed to build concepts from scratch and push you to advanced problem-solving.
              </p>
            </div>

            {/* Stat Pills */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-300 border border-white/10">
                📍 Offline · Singapore
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-300 border border-white/10">
                👨‍🏫 3 Star Educators
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-300 border border-white/10">
                📅 10 Weeks
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-300 border border-white/10">
                💵 $50 / Session
              </span>
            </div>

            {/* Countdown Timer */}
            <div className="mt-4">
              <CountdownTimer />
            </div>

            {/* CTA Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="group px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0B0B10]"
              >
                Apply Now →
              </button>
            </div>

            {/* Below CTA small text */}
            <p className="text-xs sm:text-sm text-gray-500">
              Batch starting soon · Limited seats remaining
            </p>
          </div>

          {/* Right Column - AmbiLight Video */}
          <div className="mt-10 flex justify-center lg:mt-0 lg:flex-1 lg:justify-center lg:items-center">
            <AmbiLightVideo
              sourceType="youtube"
              youtubeId="F6ufSaFjZ5Y"
              autoplay={false}
              muted={false}
              loop={false}
              showControls={true}
              blur={80}
              glowScale={1.5}
              intensity={0.95}
              saturation={1.5}
              brightness={1.3}
              borderRadius="rounded-[32px]"
              shadowPreset="xl"
            />
          </div>

        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

