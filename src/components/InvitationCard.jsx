import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Clock, MapPin, Share2, Printer, Check } from 'lucide-react';
import { GaneshaEmblem, OrnateCorner, DiyaLamp, MandalaDivider } from './TraditionalDecor';

export const InvitationCard = () => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Wedding Invitation: Barath & Rithika',
        text: 'Chi. BARATH weds Chi. Sou. RITHIKA on Sunday, 22nd November 2026 at Panjikola Sri Parthasarathi Seva Mandir, Panayal. You are cordially invited!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="invitation" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-ivory">
      {/* Background Watermark Mandala */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <svg viewBox="0 0 1000 1000" className="w-[850px] h-[850px] text-burgundy fill-current">
          <circle cx="500" cy="500" r="450" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="500" cy="500" r="350" stroke="currentColor" strokeWidth="4" strokeDasharray="10 15" fill="none" />
          <circle cx="500" cy="500" r="250" stroke="currentColor" strokeWidth="2" fill="none" />
          {Array.from({ length: 24 }).map((_, i) => (
            <path
              key={i}
              d="M500 150 C480 300 520 300 500 450"
              stroke="currentColor"
              strokeWidth="2"
              transform={`rotate(${i * 15} 500 500)`}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Floating Actions above card */}
        <div className="flex items-center justify-end gap-3 mb-4 print:hidden">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-champagne-light hover:bg-champagne border border-gold/50 text-burgundy font-sans text-xs font-medium tracking-wide transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share Invitation'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-champagne-light hover:bg-champagne border border-gold/50 text-burgundy font-sans text-xs font-medium tracking-wide transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Card</span>
          </button>
        </div>

        {/* The Luxury Wedding Invitation Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="relative paper-texture-warm p-6 sm:p-12 md:p-16 rounded-2xl shadow-card-royal border-2 border-gold/70"
        >
          {/* Inner Golden Zari Double Border Frame */}
          <div className="absolute inset-3 sm:inset-5 border-2 border-gold/60 pointer-events-none rounded-xl" />
          <div className="absolute inset-4 sm:inset-6 border border-dashed border-gold/40 pointer-events-none rounded-lg" />

          {/* Four Antique Gold Corner Filigrees */}
          <OrnateCorner position="top-left" className="absolute top-2 left-2 sm:top-4 sm:left-4 w-12 sm:w-20 h-12 sm:h-20 text-gold" />
          <OrnateCorner position="top-right" className="absolute top-2 right-2 sm:top-4 sm:right-4 w-12 sm:w-20 h-12 sm:h-20 text-gold" />
          <OrnateCorner position="bottom-left" className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-12 sm:w-20 h-12 sm:h-20 text-gold" />
          <OrnateCorner position="bottom-right" className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-12 sm:w-20 h-12 sm:h-20 text-gold" />

          {/* CARD CONTENT */}
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Top Deity Blessing / Header */}
            <div className="mb-4">
              <span className="font-cinzel text-xs sm:text-sm md:text-base font-bold text-burgundy tracking-[0.25em] uppercase">
                || Shree Kuladevatha Prasanna ||
              </span>
            </div>

            {/* Ganesha Emblem with Warm Diya Lamps */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 my-2">
              <DiyaLamp size="sm" className="hidden sm:inline-block" />
              <div className="p-2 sm:p-3 rounded-full bg-champagne-light/70 border border-gold/40 shadow-sm">
                <GaneshaEmblem className="w-14 h-14 sm:w-16 sm:h-16" />
              </div>
              <DiyaLamp size="sm" className="hidden sm:inline-block" />
            </div>

            <MandalaDivider className="my-4 sm:my-6" />

            {/* Groom's Parents Section */}
            <div className="mb-6 max-w-xl">
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-burgundy tracking-wider mb-1">
                Smt. Rejani &amp; Sri Babu Mailaty
              </h3>
              <p className="font-serif text-sm sm:text-base text-espresso-light italic">
                Kotemane Tharavad, Thekkil Village, Kasaragod.
              </p>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-sans text-copper font-medium">
                <Phone className="w-3.5 h-3.5 text-copper" />
                <span>Phone: </span>
                <a
                  href="tel:8921753396"
                  className="hover:underline font-semibold text-burgundy hover:text-burgundy-light tracking-wider"
                >
                  8921753396
                </a>
              </div>
            </div>

            {/* Invitation Message */}
            <div className="my-4 max-w-lg px-4">
              <p className="font-serif text-base sm:text-lg md:text-xl text-espresso italic leading-relaxed">
                Cordially invite you to grace the auspicious occasion of the wedding ceremony of our son.
              </p>
            </div>

            {/* COUPLE NAMES CELEBRATION BLOCK */}
            <div className="my-6 py-6 px-4 sm:px-8 w-full max-w-lg bg-champagne-light/50 border-y border-gold/50 rounded-lg">
              {/* Groom */}
              <div className="mb-2">
                <span className="block font-sans text-xs tracking-widest uppercase text-copper font-semibold mb-0.5">
                  Groom
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-burgundy tracking-wider">
                  Chi. BARATH
                </h2>
              </div>

              {/* Weds Calligraphy with Ornamental Flourish */}
              <div className="my-2 flex items-center justify-center gap-3">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
                <span className="font-script text-3xl sm:text-4xl text-copper font-bold px-2">
                  Weds
                </span>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
              </div>

              {/* Bride */}
              <div className="mt-2">
                <span className="block font-sans text-xs tracking-widest uppercase text-copper font-semibold mb-0.5">
                  Bride
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-burgundy tracking-wider">
                  Chi. Sou. RITHIKA
                </h2>
              </div>

              {/* Bride's Parents */}
              <div className="mt-4 pt-4 border-t border-gold/30">
                <p className="font-serif text-sm sm:text-base text-espresso-light italic">
                  D/o. Smt. Kavitha &amp; Sri. Ramachandra
                </p>
                <p className="font-serif text-xs sm:text-sm text-espresso-light/90">
                  Palakki House, Adol, Panayal, Kasaragod.
                </p>
              </div>
            </div>

            {/* EVENT HIGHLIGHTS SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl my-6">
              {/* Date Card */}
              <div className="p-3.5 rounded-xl bg-ivory/80 border border-gold/40 shadow-xs flex flex-col items-center">
                <Calendar className="w-5 h-5 text-burgundy mb-1" />
                <span className="font-sans text-[10px] tracking-widest uppercase text-copper font-bold">
                  Date
                </span>
                <span className="font-cinzel text-xs sm:text-sm font-bold text-burgundy mt-0.5">
                  Sunday, 22 Nov 2026
                </span>
              </div>

              {/* Muhurtham Card */}
              <div className="p-3.5 rounded-xl bg-ivory/80 border border-gold/40 shadow-xs flex flex-col items-center">
                <Clock className="w-5 h-5 text-burgundy mb-1" />
                <span className="font-sans text-[10px] tracking-widest uppercase text-copper font-bold">
                  Muhurtham
                </span>
                <span className="font-cinzel text-xs sm:text-sm font-bold text-burgundy mt-0.5">
                  11:05 AM to 12:23 PM
                </span>
              </div>

              {/* Venue Card */}
              <div className="p-3.5 rounded-xl bg-ivory/80 border border-gold/40 shadow-xs flex flex-col items-center">
                <MapPin className="w-5 h-5 text-burgundy mb-1" />
                <span className="font-sans text-[10px] tracking-widest uppercase text-copper font-bold">
                  Venue
                </span>
                <span className="font-cinzel text-xs sm:text-xs font-bold text-burgundy mt-0.5 text-center leading-tight">
                  Panjikola Mandir, Panayal
                </span>
              </div>
            </div>

            <MandalaDivider className="my-4 sm:my-6" />

            {/* Footer Compliments & Blessings */}
            <div className="mt-2 text-center">
              <p className="font-serif text-xs sm:text-sm tracking-widest uppercase text-copper font-semibold mb-1">
                With Best Compliments From...
              </p>
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-burgundy">
                Ranjana
              </h4>
              <p className="font-serif text-xs sm:text-sm text-espresso-light italic mt-0.5">
                Family Members &amp; Relatives
              </p>

              {/* Traditional Blessings Note */}
              <div className="mt-6 inline-block py-1.5 px-6 rounded-full bg-champagne-light border border-gold/60">
                <p className="font-cinzel text-xs sm:text-sm font-bold text-burgundy tracking-widest uppercase">
                  Presents in Blessings Only.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvitationCard;
