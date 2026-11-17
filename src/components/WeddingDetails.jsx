import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation, Phone, Utensils, Check, Copy } from 'lucide-react';
import { MandalaDivider, DiyaLamp } from './TraditionalDecor';

export const WeddingDetails = () => {
  const [copied, setCopied] = useState(false);

  const venueAddress = "Panjikola Sri Parthasarathi Seva Mandir, Panayal, Kasaragod, Kerala - 671318";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "Panjikola Sri Parthasarathi Seva Mandir Panayal Kasaragod"
  )}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="details" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-ivory overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-champagne-light border border-gold/50 shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-burgundy font-semibold">
              Sacred Ceremony
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-burgundy tracking-wide mb-3">
            Wedding Details &amp; Venue
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-espresso-light">
            We look forward to welcoming you and your family to celebrate this auspicious union.
          </p>
          <MandalaDivider className="my-4" />
        </div>

        {/* 2-COLUMN LAYOUT: EVENT CARDS & VENUE MAP CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Ceremony Schedule & Highlights (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Main Ceremony Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-2xl bg-champagne-light/60 border-2 border-gold/60 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/20 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-burgundy text-gold shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-burgundy">
                    Wedding Ceremony
                  </h3>
                  <span className="font-sans text-xs text-copper font-medium">
                    Shubh Vivah Muhurtham
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 text-sm font-sans">
                {/* Date */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-ivory border border-gold/30">
                  <Calendar className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-copper font-bold">
                      Date
                    </span>
                    <strong className="text-burgundy font-cinzel text-sm sm:text-base">
                      Sunday, 22nd November 2026
                    </strong>
                  </div>
                </div>

                {/* Muhurtham Time */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-ivory border border-gold/30">
                  <Clock className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-copper font-bold">
                      Auspicious Muhurtham
                    </span>
                    <strong className="text-burgundy font-cinzel text-sm sm:text-base">
                      11:05 AM to 12:23 PM
                    </strong>
                  </div>
                </div>

                {/* Traditional Feast */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-ivory border border-gold/30">
                  <Utensils className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-copper font-bold">
                      Wedding Sadya / Feast
                    </span>
                    <strong className="text-burgundy font-serif text-sm">
                      Traditional Kerala Wedding Sadhya follows Muhurtham
                    </strong>
                  </div>
                </div>

                {/* Family Contact */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-ivory border border-gold/30">
                  <Phone className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-copper font-bold">
                      Family Contact (Groom's Father)
                    </span>
                    <span className="text-espresso font-serif text-sm block">
                      Sri Babu Mailaty
                    </span>
                    <a
                      href="tel:8921753396"
                      className="text-burgundy hover:text-burgundy-light font-bold font-sans text-sm tracking-wider inline-block mt-0.5"
                    >
                      +91 8921753396
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Venue Details & Navigation Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-champagne-light/70 border-2 border-gold/60 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-burgundy text-gold shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-copper font-bold block">
                      The Venue
                    </span>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-burgundy">
                      Panjikola Sri Parthasarathi Seva Mandir
                    </h3>
                  </div>
                </div>
                <DiyaLamp size="sm" className="hidden sm:inline-block" />
              </div>

              <div className="my-4 p-4 rounded-xl bg-ivory border border-gold/40">
                <p className="font-serif text-base sm:text-lg text-espresso mb-1">
                  <strong>Panjikola Sri Parthasarathi Seva Mandir</strong>
                </p>
                <p className="font-sans text-sm text-espresso-light leading-relaxed">
                  Panayal, Kasaragod District, Kerala, India
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-champagne hover:bg-champagne-dark/30 text-xs font-sans font-medium text-burgundy transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Address Copied!' : 'Copy Venue Address'}</span>
                  </button>
                </div>
              </div>

              {/* Visual Map / Venue Illustration Card */}
              <div className="relative rounded-xl overflow-hidden border border-gold/50 bg-[#F5ECE0] h-52 sm:h-64 flex flex-col items-center justify-center text-center p-6 shadow-inner">
                {/* Traditional temple mandap silhouette background */}
                <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full opacity-15 text-burgundy fill-current pointer-events-none">
                  <path d="M200 20 L240 60 L160 60 Z M150 60 L250 60 L260 80 L140 80 Z M130 80 L270 80 L275 110 L125 110 Z M120 110 L280 110 L280 180 L120 180 Z" />
                  <rect x="140" y="110" width="12" height="70" />
                  <rect x="170" y="110" width="12" height="70" />
                  <rect x="218" y="110" width="12" height="70" />
                  <rect x="248" y="110" width="12" height="70" />
                  <path d="M190 140 Q200 130 210 140 L210 180 L190 180 Z" fill="#FFF8EF" />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-burgundy/10 border border-burgundy/30 flex items-center justify-center text-burgundy mb-2">
                    <MapPin className="w-6 h-6 animate-bounce" />
                  </div>
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-burgundy">
                    Panayal, Kasaragod
                  </h4>
                  <p className="font-serif italic text-xs sm:text-sm text-espresso-light max-w-sm mt-1">
                    Nestled in the cultural heart of Kasaragod, near the historic coast of Bekal.
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION: Get Directions Button */}
            <div className="mt-6 pt-4 border-t border-gold/40 flex flex-wrap items-center justify-between gap-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy border border-gold text-[#FFF8EF] font-cinzel text-xs sm:text-sm font-bold tracking-wider hover:shadow-burgundy-glow transition-all"
              >
                <Navigation className="w-4 h-4 text-gold" />
                <span>GET DIRECTIONS ON GOOGLE MAPS</span>
              </a>

              <span className="text-[11px] font-sans text-copper italic">
                Opens GPS navigation directly to the venue
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;
