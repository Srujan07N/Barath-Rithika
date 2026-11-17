import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Bell, Sparkles } from 'lucide-react';

export const WeddingCountdown = () => {
  // Target: Sunday, 22nd November 2026 at 11:05 AM IST
  const targetDate = new Date('2026-11-22T11:05:00+05:30').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isCompleted: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Google Calendar Link Generator
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Chi. Barath Weds Chi. Sou. Rithika - Wedding Ceremony'
  )}&dates=20261122T053500Z/20261122T065300Z&details=${encodeURIComponent(
    'Auspicious wedding ceremony of Barath & Rithika. Muhurtham: 11:05 AM to 12:23 PM. Venue: Panjikola Sri Parthasarathi Seva Mandir, Panayal, Kasaragod.'
  )}&location=${encodeURIComponent(
    'Panjikola Sri Parthasarathi Seva Mandir, Panayal, Kasaragod, Kerala'
  )}`;

  const units = [
    { label: 'Days', value: timeLeft.days, pad: false },
    { label: 'Hours', value: timeLeft.hours, pad: true },
    { label: 'Minutes', value: timeLeft.minutes, pad: true },
    { label: 'Seconds', value: timeLeft.seconds, pad: true },
  ];

  return (
    <section id="countdown" className="relative py-16 px-4 bg-champagne-light overflow-hidden">
      {/* Decorative floral side motifs */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Subheading */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-ivory border border-gold/50 shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-burgundy font-semibold">
              The Auspicious Moment
            </span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-burgundy tracking-wide mb-2">
            Countdown to the Celebration
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-espresso-light max-w-lg mb-8">
            Counting down every blessed second until Barath &amp; Rithika unite in holy matrimony.
          </p>

          {/* COUNTDOWN TIMER UNITS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl mb-8">
            {units.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group p-4 sm:p-6 rounded-2xl bg-ivory/95 backdrop-blur-md border-2 border-gold/60 shadow-lg hover:shadow-gold-glow transition-all duration-300 flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Subtle Inner Border */}
                <div className="absolute inset-1.5 border border-dashed border-gold/30 rounded-xl pointer-events-none" />

                {/* Shimmer light bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

                {/* Number Value */}
                <div className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-burgundy tracking-tight my-1">
                  {unit.pad && unit.value < 10 ? `0${unit.value}` : unit.value}
                </div>

                {/* Unit Label */}
                <div className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-copper mt-1">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Calendar Reminders */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory font-cinzel text-xs font-semibold tracking-wider transition-all shadow-md hover:shadow-burgundy-glow"
            >
              <Calendar className="w-4 h-4 text-gold" />
              <span>Add to Google Calendar</span>
            </a>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-ivory border border-gold/50 text-espresso text-xs font-sans">
              <Clock className="w-3.5 h-3.5 text-copper" />
              <span>Muhurtham: 11:05 AM – 12:23 PM</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingCountdown;
