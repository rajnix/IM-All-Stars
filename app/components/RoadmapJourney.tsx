'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CurvedRoadmapPath from './CurvedRoadmapPath';

interface RoadmapStep {
  id: number;
  phase: string;
  dateRange: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    phase: 'WEEK 1–2',
    dateRange: 'Week 1–2',
    title: 'Foundations Rebuilt',
    subtitle: '',
    description:
      'Basics from ground up — units, kinematics, vectors, and measurement.',
    bullets: [
      'Building blocks from scratch',
      'No assumed prior knowledge',
      'Clear conceptual understanding',
    ],
  },
  {
    id: 2,
    phase: 'WEEK 3–5',
    dateRange: 'Week 3–5',
    title: 'Core Concepts',
    subtitle: '',
    description:
      'Laws of motion, energy, momentum, and standard problem types.',
    bullets: [
      'Essential Physics principles',
      'Standard JEE problem patterns',
      'Building problem-solving foundation',
    ],
  },
  {
    id: 3,
    phase: 'WEEK 6–8',
    dateRange: 'Week 6–8',
    title: 'Advanced Applications',
    subtitle: '',
    description:
      'JEE-level multi-concept problems and derivations.',
    bullets: [
      'Complex problem solving',
      'Multi-concept integration',
      'Advanced derivations',
    ],
  },
  {
    id: 4,
    phase: 'WEEK 9–10',
    dateRange: 'Week 9–10',
    title: 'Exam Readiness',
    subtitle: '',
    description:
      'Mixed practice, full simulations, and test-taking strategies.',
    bullets: [
      'Full-length mock tests',
      'Exam strategies and techniques',
      'Final preparation and confidence building',
    ],
  },
];

// Reusable Phase Chip Component
interface PhaseChipProps {
  phase: string;
  isActive: boolean;
  onClick: () => void;
}

const PhaseChip: React.FC<PhaseChipProps> = ({ phase, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
      phase.includes('WEEK 9')
        ? 'bg-gradient-to-r from-emerald-500/15 to-emerald-600/15 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400/60 hover:bg-emerald-500/25'
        : isActive
        ? 'bg-gradient-to-r from-violet-500/25 to-indigo-500/25 text-violet-200 border border-violet-400/60 shadow-lg shadow-violet-500/20'
        : 'bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:border-violet-500/40 hover:bg-slate-800/80 hover:text-violet-300'
    }`}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
  >
    {phase}
  </motion.button>
);

export default function RoadmapJourney() {
  const [expandedId, setExpandedId] = useState<number | null>(1); // Default to phase 1 as active

  const toggleExpand = (id: number) => {
    setExpandedId(id);
  };

  const scrollToNode = (id: number) => {
    setExpandedId(id);
    // Optionally add smooth scroll to the node position
  };

  return (
    <div className="w-full mt-12 lg:mt-16">
      {/* Desktop: Premium glassmorphic card */}
      <div className="hidden lg:block">
        {/* Premium gradient card with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] border border-white/5 bg-[#0b0b20]/80 backdrop-blur-xl px-10 py-12 overflow-hidden"
          style={{
            boxShadow: '0 0 80px rgba(139, 92, 246, 0.15), inset 0 0 80px rgba(139, 92, 246, 0.05)',
          }}
        >
          {/* Gradient border overlay */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-violet-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
          
          {/* Inner radial glow */}
          <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none">
            <div 
              className="absolute inset-0" 
              style={{
                background: 'radial-gradient(circle at 50% 40%, rgba(140, 82, 255, 0.15) 0%, transparent 60%)',
              }}
            />
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-20 left-20 h-48 w-48 bg-violet-500/8 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 h-48 w-48 bg-indigo-500/8 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10">
            {/* Start label - Premium status chip */}
            <div className="flex justify-center mb-10">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-violet-500/30 backdrop-blur-sm shadow-lg shadow-violet-500/10"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500 shadow-lg shadow-violet-500/50"></span>
                </span>
                <span className="text-sm font-medium text-slate-100">Start · Week 1</span>
              </motion.div>
            </div>

            {/* Premium curved path */}
            <div className="relative px-6 mb-10">
              <CurvedRoadmapPath 
                stepCount={ROADMAP_STEPS.length} 
                activeStep={expandedId}
                onStepClick={toggleExpand}
              />
            </div>

            {/* Bottom section: Target pill + Phase chips */}
            <div className="space-y-6">
              {/* Target pill */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/15 to-indigo-500/15 border border-violet-500/40 backdrop-blur-sm shadow-xl shadow-violet-500/20"
                >
                  <span className="flex h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
                  <span className="text-sm font-semibold text-violet-100">JEE Ready · Week 10</span>
                </motion.div>
              </div>

              {/* Phase navigation chips */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                {ROADMAP_STEPS.map((step) => (
                  <PhaseChip
                    key={step.id}
                    phase={step.phase}
                    isActive={expandedId === step.id}
                    onClick={() => scrollToNode(step.id)}
                  />
                ))}
              </motion.div>
            </div>

            {/* Expanded details panel */}
            {expandedId && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {ROADMAP_STEPS.map((step) => 
                  step.id === expandedId ? (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="rounded-3xl border border-violet-400/40 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md px-8 py-6 shadow-2xl shadow-violet-500/10"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                              step.phase.includes('WEEK 9')
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-violet-500/20 text-violet-200 border border-violet-500/40'
                            }`}>
                              {step.phase}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">{step.dateRange}</span>
                          </div>
                          <h4 className="text-xl font-semibold text-slate-100 leading-tight">
                            {step.title} {step.subtitle}
                          </h4>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-2.5 text-sm text-slate-300">
                        {step.bullets.map((bullet, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-violet-400 mt-2 shadow-sm shadow-violet-400/50" />
                            <span>{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Mobile: Simplified vertical layout */}
      <div className="block lg:hidden">
        <div className="rounded-[24px] border border-white/5 bg-[#0b0b20]/80 backdrop-blur-xl px-5 py-8 space-y-8">
          {/* Start label */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-800/80 border border-violet-500/30 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-100">Start · Week 1</span>
            </div>
          </div>

          {ROADMAP_STEPS.map((step, index) => {
            const isExpanded = expandedId === step.id;
            const isLast = index === ROADMAP_STEPS.length - 1;

            return (
              <div key={step.id} className="relative">
                  {!isLast && (
                  <div className="absolute left-1/2 top-20 -translate-x-1/2 h-8 w-0.5 bg-gradient-to-b from-violet-400/60 to-violet-400/20" />
                )}

                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                      isExpanded
                        ? 'border-violet-300 bg-gradient-to-b from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/40'
                        : 'border-violet-400 bg-gradient-to-b from-violet-600 to-indigo-700 shadow-lg'
                    } text-xs font-semibold text-white transition-all duration-300`}
                    onClick={() => toggleExpand(step.id)}
                  >
                    {step.id}
                  </motion.div>

                  <button
                    onClick={() => toggleExpand(step.id)}
                    className="text-center max-w-xs"
                  >
                    <div className="mb-2">
                      <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                        step.phase.includes('WEEK 9')
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800/80 text-slate-300 border border-slate-700'
                      }`}>
                        {step.phase}
                      </span>
                    </div>
                    
                    <div className={`font-semibold text-sm transition-colors duration-300 ${
                      isExpanded ? 'text-violet-300' : 'text-slate-100'
                    }`}>
                      {step.title}<br />{step.subtitle}
                  </div>

                    <div className="mt-1.5 text-[11px] text-slate-400/80">
                      {step.dateRange}
                    </div>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="w-full"
                    >
                      <div className="rounded-2xl border border-violet-400/40 bg-slate-900/90 backdrop-blur-sm px-5 py-4 shadow-lg">
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          {step.description}
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {step.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="flex-shrink-0 h-1 w-1 rounded-full bg-violet-400 mt-1.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}

          {/* End label */}
          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-violet-500/15 border border-violet-500/40 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-violet-100">JEE Ready · Week 10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
