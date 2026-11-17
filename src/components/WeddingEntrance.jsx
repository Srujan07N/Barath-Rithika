import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import ThreeDDoor from './ThreeDDoor';
import { DiyaLamp, GaneshaEmblem } from './TraditionalDecor';
import weddingAudio from '../utils/audioSynthesizer';

export const WeddingEntrance = ({ onOpenComplete, isAudioActive, onToggleAudio }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpenClick = () => {
    if (isOpening || hasOpened) return;
    setIsOpening(true);

    // Play auspicious temple bell chime & start serene wedding raag
    weddingAudio.playBell();
    if (!isAudioActive) {
      weddingAudio.start();
      onToggleAudio(true);
    }
  };

  const handleDoorsOpened = () => {
    setHasOpened(true);
    setTimeout(() => {
      onOpenComplete();
    }, 600);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#180E0A] select-none">
      {/* 3D WebGL Door Scene in Background */}
      <ThreeDDoor isOpen={isOpening} onOpened={handleDoorsOpened} />

      {/* Atmospheric Vignette & Soft Gradient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#180E0A]/40 to-[#120805]/90" />

      {/* Sound Toggle Button (Top Right) */}
      <div className="absolute top-6 right-6 z-40">
        <button
          onClick={() => onToggleAudio(!isAudioActive)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#2A1812]/80 backdrop-blur-md border border-gold/40 text-[#FFF8EF] hover:border-gold hover:text-gold transition-all duration-300 shadow-lg text-xs tracking-wider"
          aria-label={isAudioActive ? 'Mute Music' : 'Play Music'}
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-4 h-4 text-gold animate-pulse" />
              <span className="font-sans font-medium hidden sm:inline">MUSIC ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-rose-antique" />
              <span className="font-sans font-medium hidden sm:inline">MUSIC OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Left & Right Decorative Diyas on Entrance Pillars */}
      <div className="absolute bottom-10 left-6 sm:left-14 z-20 flex flex-col items-center">
        <DiyaLamp size="lg" />
        <span className="text-[10px] tracking-widest uppercase font-sans text-gold/60 mt-1">Shubh</span>
      </div>
      <div className="absolute bottom-10 right-6 sm:right-14 z-20 flex flex-col items-center">
        <DiyaLamp size="lg" />
        <span className="text-[10px] tracking-widest uppercase font-sans text-gold/60 mt-1">Laabh</span>
      </div>

      {/* Main Interactive Entrance Content Overlay */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8, ease: 'easeInOut' } }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col items-center justify-between py-12 px-4 z-30 pointer-events-none"
          >
            {/* Header: Auspicious Kuladevatha Blessing */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A1812]/85 backdrop-blur-md border border-[#D6B77A]/50 shadow-burgundy-glow mb-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="font-cinzel text-xs sm:text-sm tracking-widest text-gold font-semibold uppercase">
                  || Shree Kuladevatha Prasanna ||
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              </motion.div>
            </div>

            {/* Center Content: Couple & Open Invitation Action */}
            <div className="flex flex-col items-center text-center max-w-lg px-4 pointer-events-auto">
              {/* Auspicious Ganesha Emblem */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="mb-4 p-3 rounded-full bg-[#2E1A14]/80 backdrop-blur-md border border-gold/40 shadow-gold-glow"
              >
                <GaneshaEmblem className="w-14 h-14" />
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="font-cinzel text-sm sm:text-base uppercase tracking-[0.3em] text-[#E8D4B4] mb-2 font-medium"
              >
                A Celebration of Love
              </motion.p>

              {/* Couple Names */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9 }}
                className="font-script text-4xl sm:text-6xl text-gold-gradient drop-shadow-lg mb-1 leading-tight"
              >
                Barath &amp; Rithika
              </motion.h1>

              {/* Wedding Date Pill */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="font-sans text-xs sm:text-sm tracking-widest text-[#E3CAA5] uppercase mb-8 opacity-90"
              >
                Sunday, 22nd November 2026 • Panayal, Kasaragod
              </motion.p>

              {/* Call-to-Action: OPEN THE INVITATION Button */}
              <motion.button
                onClick={handleOpenClick}
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(214, 183, 122, 0.7)' }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-[#781F35] via-[#962A45] to-[#781F35] border-2 border-gold text-[#FFF8EF] font-cinzel font-bold text-sm sm:text-base tracking-[0.2em] shadow-card-royal hover:text-gold transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Button Shimmer Ray */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <Sparkles className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform duration-300" />
                <span>OPEN THE INVITATION</span>
                <Heart className="w-4 h-4 text-gold fill-gold/40 group-hover:scale-110 transition-transform duration-300" />
              </motion.button>

              <p className="mt-4 text-[11px] font-sans tracking-wider text-gold/70 italic">
                Tap to enter our traditional wedding celebration
              </p>
            </div>

            {/* Bottom Indicator */}
            <div className="text-center opacity-70">
              <span className="font-sans text-[11px] tracking-widest text-[#D6B77A] uppercase">
                Traditional Kasaragod Wedding Celebration
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light Burst Golden Rays Overlay when doors swing open */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 1], scale: [0.95, 1.05, 1.1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-t from-[#FFF3D6]/70 via-[#D6B77A]/40 to-transparent mix-blend-screen"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeddingEntrance;
