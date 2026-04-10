'use client';

import React, { useState } from 'react';

// Types
type FeatureCategory = 'core' | 'support';

interface Feature {
  id: string;
  name: string;
  category: FeatureCategory;
  standardIncluded: boolean;
  eliteIncluded: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  recommended?: boolean;
}

type FilterOption = 'all' | FeatureCategory;

// Check icon component
const CheckIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

// Cross/dash icon component
const CrossIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function PlanComparisonTable() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Plan data
  const plans: Plan[] = [
    {
      id: 'standard',
      name: 'Excel',
      price: 50,
      recommended: false,
    },
    {
      id: 'elite',
      name: 'Conquer',
      price: 70,
      recommended: true,
    },
  ];

  // Feature data
  const features: Feature[] = [
    {
      id: '10-week-program',
      name: '10-week structured program',
      category: 'core',
      standardIncluded: true,
      eliteIncluded: true,
    },
    {
      id: 'offline-classes',
      name: 'Offline classes in Singapore',
      category: 'core',
      standardIncluded: true,
      eliteIncluded: true,
    },
    {
      id: 'practice-material',
      name: 'Weekly practice material',
      category: 'core',
      standardIncluded: true,
      eliteIncluded: true,
    },
    {
      id: 'doubt-resolution',
      name: 'Doubt resolution sessions',
      category: 'support',
      standardIncluded: true,
      eliteIncluded: true,
    },
    {
      id: 'batch-size',
      name: 'Limited batch size',
      category: 'support',
      standardIncluded: true,
      eliteIncluded: true,
    },
    {
      id: 'unlimited-mentor',
      name: 'Unlimited mentor support',
      category: 'support',
      standardIncluded: false,
      eliteIncluded: true,
    },
    {
      id: 'personal-guidance',
      name: '1-on-1 personal guidance sessions',
      category: 'support',
      standardIncluded: false,
      eliteIncluded: true,
    },
    {
      id: 'priority-doubt',
      name: 'Priority doubt resolution',
      category: 'support',
      standardIncluded: false,
      eliteIncluded: true,
    },
    {
      id: 'whatsapp-access',
      name: 'WhatsApp direct access to mentor',
      category: 'support',
      standardIncluded: false,
      eliteIncluded: true,
    },
    {
      id: 'performance-tracking',
      name: 'Performance tracking & feedback',
      category: 'support',
      standardIncluded: false,
      eliteIncluded: true,
    },
    {
      id: 'study-plan',
      name: 'Personalized study plan',
      category: 'support',
      standardIncluded: false,
      eliteIncluded: true,
    },
    {
      id: 'mock-review',
      name: 'Mock test review with mentor',
      category: 'support',
      standardIncluded: false,
      eliteIncluded: true,
    },
  ];

  // Filter features based on active filter
  const filteredFeatures = features.filter((feature) => {
    if (activeFilter === 'all') return true;
    return feature.category === activeFilter;
  });

  // Filter tabs configuration
  const filterTabs = [
    { id: 'all' as FilterOption, label: 'All' },
    { id: 'core' as FilterOption, label: 'Core learning' },
    { id: 'support' as FilterOption, label: 'Mentorship & support' },
  ];

  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0B0B10] via-[#020617] to-[#0B0B10] py-16 sm:py-24"
      aria-labelledby="pricing-comparison-heading"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/3 h-96 w-96 bg-violet-600/10 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 h-96 w-96 bg-indigo-600/10 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main card container */}
        <div className="rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <p className="text-sm font-semibold text-violet-400 uppercase tracking-wide">
              PRICING
            </p>
            <h2
              id="pricing-comparison-heading"
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Simple, Transparent Pricing
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              $50 per session
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#020617] ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                    : 'bg-transparent border border-white/20 text-gray-300 hover:border-white/40 hover:text-white'
                }`}
                aria-pressed={activeFilter === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table container with horizontal scroll on mobile */}
          <div className="overflow-x-auto -mx-6 sm:-mx-8 lg:-mx-10 px-6 sm:px-8 lg:px-10">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    {/* Features column header */}
                    <th
                      scope="col"
                      className="sticky left-0 z-10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/10"
                    >
                      Features
                    </th>

                    {/* Plan headers */}
                    {plans.map((plan, index) => (
                      <th
                        key={plan.id}
                        scope="col"
                        className={`px-4 sm:px-6 py-4 text-center border-b border-white/10 ${
                          plan.recommended
                            ? 'bg-gradient-to-br from-violet-600/10 to-indigo-600/10'
                            : 'bg-transparent'
                        }`}
                      >
                        <div className="space-y-1">
                          {plan.recommended && (
                            <span className="inline-block px-3 py-0.5 text-xs font-semibold text-violet-300 bg-violet-500/20 border border-violet-500/30 rounded-full mb-2">
                              Most Popular
                            </span>
                          )}
                          <div className="text-lg sm:text-xl font-bold text-white">
                            {plan.name}
                          </div>
                          <div className="text-2xl sm:text-3xl font-bold text-white">
                            ${plan.price}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400">
                            per session
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredFeatures.map((feature, featureIndex) => (
                    <tr
                      key={feature.id}
                      className="group hover:bg-white/[0.02] transition-colors duration-150"
                    >
                      {/* Feature name */}
                      <td
                        className={`sticky left-0 z-10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl group-hover:from-white/[0.07] group-hover:to-white/[0.04] px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-200 border-b border-white/5 transition-colors duration-150 ${
                          featureIndex === filteredFeatures.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        {feature.name}
                      </td>

                      {/* Standard plan cell */}
                      <td
                        className={`px-4 sm:px-6 py-4 text-center border-b border-white/5 ${
                          featureIndex === filteredFeatures.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <div className="flex justify-center">
                          {feature.standardIncluded ? (
                            <CheckIcon className="w-6 h-6 text-emerald-400" />
                          ) : (
                            <CrossIcon className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                      </td>

                      {/* Elite plan cell */}
                      <td
                        className={`px-4 sm:px-6 py-4 text-center bg-gradient-to-br from-violet-600/5 to-indigo-600/5 border-b border-white/5 ${
                          featureIndex === filteredFeatures.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <div className="flex justify-center">
                          {feature.eliteIncluded ? (
                            <CheckIcon className="w-6 h-6 text-emerald-400" />
                          ) : (
                            <CrossIcon className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom CTA (optional) */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#020617]"
              >
                Book Your Seat →
              </button>
              <p className="text-xs sm:text-sm text-gray-400">
                ⚡ Limited seats available — batch filling up fast
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

