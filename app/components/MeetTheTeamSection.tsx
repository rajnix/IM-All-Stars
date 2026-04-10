'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
}

export default function MeetTheTeamSection() {
  const team: TeamMember[] = [
    {
      name: 'Educator 1',
      role: 'Mechanics & Kinematics',
      bio: "Expert in foundational Physics. Known for simplifying toughest concepts. Hundreds of JEE aspirants trained.",
      imageSrc: '/team/educator1.png',
    },
    {
      name: 'Educator 2',
      role: 'Electrodynamics',
      bio: "Specialist in Electrodynamics. Focus on exam-oriented strategies. High success rate among students.",
      imageSrc: '/team/educator2.png',
    },
    {
      name: 'Educator 3',
      role: 'Advanced Physics',
      bio: "Advanced Physics mentor. Helps students crack high-level problems. Deep focus on conceptual clarity.",
      imageSrc: '/team/educator3.png',
    },
  ];

  // Container animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Card animation
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      } as const,
    },
  };

  return (
    <section
      id="team"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0B0B10] via-[#020617] to-[#0B0B10] py-16 lg:py-24"
      aria-labelledby="team-heading"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 h-96 w-96 bg-violet-600/10 blur-3xl rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 h-96 w-96 bg-indigo-600/10 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading block */}
        <div className="text-center mb-12 lg:mb-16 space-y-3">
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-wide">
            YOUR MENTORS
          </p>
          <h2
            id="team-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Learn From The Best
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            📊 500+ JEE aspirants taught combined
          </p>
        </div>

        {/* Team cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group rounded-3xl bg-slate-900/60 border border-white/5 shadow-xl backdrop-blur p-6 flex flex-col items-center text-center space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(140,82,255,0.45)] hover:border-[#8C52FF]"
            >
              {/* Avatar image */}
              <div className="relative">
                <div className="h-24 w-24 lg:h-28 lg:w-28 rounded-full overflow-hidden ring-2 ring-[#8C52FF] ring-offset-2 ring-offset-slate-950 transition-all duration-300 group-hover:ring-[#A78BFA] group-hover:ring-4">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Fallback to a gradient placeholder if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.style.background =
                          'linear-gradient(135deg, #8C52FF 0%, #5b21b6 100%)';
                      }
                    }}
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-lg lg:text-xl font-semibold text-slate-50 leading-tight">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-sm text-slate-400 font-medium">{member.role}</p>

              {/* Bio */}
              <p className="text-sm text-slate-300/80 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

