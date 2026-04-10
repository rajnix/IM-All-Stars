"use client";

import React, { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

export default function CountdownTimer() {
  const TARGET_DATE = new Date("2025-12-01T23:59:59+05:30");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const distance = TARGET_DATE.getTime() - now;

      if (distance <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        };
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      return {
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      };
    };

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Clear interval if expired
      if (newTimeLeft.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [TARGET_DATE]);

  // Expired state - return null to hide the component
  if (timeLeft.isExpired) {
    return null;
  }

  // Active countdown - compact pill style
  const timeUnits: Array<{ value: number; label: string }> = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  const padValue = (value: number, padDays: boolean = false): string => {
    // Days don't need padding, but hours/minutes/seconds do
    return padDays ? String(value) : String(value).padStart(2, "0");
  };

  return (
    <div className="inline-flex flex-col rounded-2xl border border-violet-500/40 bg-slate-900/70 px-3 py-2 shadow-lg shadow-black/30 backdrop-blur-sm">
      <span className="mb-1 text-[10px] font-medium uppercase tracking-wide text-violet-200">
        Enrollments close in
      </span>
      <div className="flex items-center gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center rounded-xl bg-slate-950/80 px-2 py-1 sm:px-2.5 sm:py-1.5 min-w-[38px] sm:min-w-[44px]"
          >
            <span className="tabular-nums text-sm sm:text-base font-semibold text-white">
              {padValue(unit.value, index === 0)}
            </span>
            <span className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-400">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

