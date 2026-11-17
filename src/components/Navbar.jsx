import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, DoorOpen, Calendar, MapPin, Image as ImageIcon, Heart } from 'lucide-react';
import { GaneshaEmblem } from './TraditionalDecor';

export const Navbar = ({ onReopenDoors, isAudioActive, onToggleAudio }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Invitation', href: '#invitation' },
    { label: 'Muhurtham', href: '#countdown' },
    { label: 'Venue & Details', href: '#details' },
    { label: 'Blessings', href: '#blessings' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 select-none ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-md border-b border-gold/40 py-2.5'
            : 'bg-ivory/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Couple Brand */}
          <a href="#invitation" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-champagne-light border border-gold/60 flex items-center justify-center text-burgundy shadow-xs">
              <GaneshaEmblem className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-script text-xl sm:text-2xl text-burgundy font-bold leading-none">
                Barath &amp; Rithika
              </span>
              <span className="font-cinzel text-[9px] tracking-widest uppercase text-copper font-semibold">
                22 Nov 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-cinzel text-xs font-semibold tracking-wider text-espresso hover:text-burgundy transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reopen 3D Door Experience Button */}
            <button
              onClick={onReopenDoors}
              title="Experience 3D Doors again"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne-light hover:bg-champagne border border-gold/50 text-burgundy text-xs font-cinzel font-semibold tracking-wide transition-colors shadow-xs"
            >
              <DoorOpen className="w-3.5 h-3.5 text-copper" />
              <span className="hidden sm:inline">3D Entrance</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => onToggleAudio(!isAudioActive)}
              className="p-2 rounded-full bg-champagne-light hover:bg-champagne border border-gold/50 text-burgundy transition-colors"
              aria-label={isAudioActive ? 'Mute Music' : 'Play Music'}
            >
              {isAudioActive ? (
                <Volume2 className="w-4 h-4 text-burgundy animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-rose-antique" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg md:hidden text-burgundy hover:bg-champagne"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] z-30 md:hidden bg-ivory/98 border-b-2 border-gold shadow-xl p-6"
          >
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-cinzel text-sm font-bold text-burgundy hover:text-burgundy-light py-2 border-b border-gold/20"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReopenDoors();
                  }}
                  className="w-full py-2.5 rounded-full bg-burgundy text-ivory font-cinzel text-xs font-bold tracking-wider"
                >
                  Re-Open 3D Entrance
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
