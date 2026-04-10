'use client';

import React, { useState } from 'react';
import AmbiLightVideo from './AmbiLightVideo';
import CountdownTimer from './CountdownTimer';

export default function CourseHero() {
  const [showContactModal, setShowContactModal] = useState(false);

  const handleCallClick = () => {
    setShowContactModal(true);
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('+918585858585');
    alert('Phone number copied to clipboard!');
  };

  return (
    <section 
      id="overview"
      aria-labelledby="hero-heading" 
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0B0B10] via-[#020617] to-[#0B0B10]"
    >
      {/* Contact Modal */}
      {showContactModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="relative max-w-md w-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#111827] via-[#020617] to-[#020617] border border-violet-500/30 shadow-2xl backdrop-blur-xl p-6 sm:p-8 space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 0 80px rgba(140, 82, 255, 0.3), inset 0 0 80px rgba(140, 82, 255, 0.05)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="flex justify-center">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center ring-4 ring-violet-500/20">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                Our team is always here for you!
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-2">
                Please feel free to call anytime so that your doubts are answered.
              </p>
            </div>

            {/* Phone Number */}
            <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Call us at</p>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-wide break-all">
                +91 8585858585
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+918585858585"
                className="w-full px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50 text-center"
              >
                Call Now
              </a>
              <button
                onClick={handleCopyNumber}
                className="w-full px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                Copy Number
              </button>
            </div>
          </div>
        </div>
      )}
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
              <button 
                onClick={handleCallClick}
                className="px-8 py-4 rounded-full text-base font-semibold text-white bg-transparent border-2 border-violet-500/50 hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0B0B10]"
              >
                Contact on WhatsApp
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

