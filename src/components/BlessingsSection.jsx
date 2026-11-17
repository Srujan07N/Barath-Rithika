import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GaneshaEmblem, DiyaLamp, MandalaDivider, LotusEmblem } from './TraditionalDecor';

const INITIAL_BLESSINGS = [
  {
    name: 'Suresh & Preetha (Mangalore)',
    relation: 'Family',
    message: 'Wishing dear Barath and Rithika a blessed life of eternal joy, companionship, and good health!',
    time: 'Just now',
  },
  {
    name: 'Kavitha & Ramesh Mailaty',
    relation: 'Relatives',
    message: 'May Shree Kuladevatha always shower divine blessings on the beautiful new journey together.',
    time: '1 hour ago',
  },
  {
    name: 'Vinod & Deepa Panayal',
    relation: 'Friends',
    message: 'Heartiest congratulations to Barath and Rithika! Excited to celebrate the big day in Panayal!',
    time: 'Today',
  },
];

export const BlessingsSection = () => {
  const [blessings, setBlessings] = useState(INITIAL_BLESSINGS);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitBlessing = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;

    // Trigger Festive Floral & Gold Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#D6B77A', '#781F35', '#B87950', '#FFF8EF', '#B76E79'],
      });
    } catch (err) {}

    const newBlessing = {
      name: guestName.trim(),
      relation: 'Guest',
      message: guestMessage.trim(),
      time: 'Just now',
    };

    setBlessings([newBlessing, ...blessings]);
    setGuestName('');
    setGuestMessage('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section id="blessings" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-ivory overflow-hidden">
      {/* Decorative floral background orbs */}
      <div className="max-w-4xl mx-auto">
        {/* CLOSING BLESSING CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative paper-texture-warm p-8 sm:p-14 rounded-3xl border-2 border-gold/70 shadow-card-royal text-center mb-16"
        >
          {/* Inner Golden Border */}
          <div className="absolute inset-3 border border-gold/40 rounded-2xl pointer-events-none" />

          {/* Top Diya and Ganesha */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <DiyaLamp size="sm" />
            <div className="p-2.5 rounded-full bg-champagne-light border border-gold/40">
              <GaneshaEmblem className="w-12 h-12" />
            </div>
            <DiyaLamp size="sm" />
          </div>

          {/* EXACT REQUIRED TEXT */}
          <blockquote className="my-6 max-w-xl mx-auto font-serif italic text-xl sm:text-2xl md:text-3xl text-burgundy leading-relaxed">
            &ldquo;Your presence and blessings will make our special day even more memorable.&rdquo;
          </blockquote>

          <MandalaDivider className="my-6" />

          <p className="font-script text-2xl sm:text-3xl text-copper font-bold mb-1">
            With Love &amp; Best Wishes
          </p>

          <h3 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-burgundy tracking-wider mt-2">
            Barath &amp; Rithika
          </h3>

          <p className="font-sans text-xs tracking-widest uppercase text-copper font-semibold mt-3">
            Sunday, 22nd November 2026 • Panayal, Kasaragod
          </p>
        </motion.div>

        {/* INTERACTIVE BLESSINGS WALL / SEND BLESSINGS */}
        <div className="mt-12 p-6 sm:p-10 rounded-2xl bg-champagne-light/70 border-2 border-gold/50 shadow-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory border border-gold/40 text-burgundy text-xs font-cinzel font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>GUEST BOOK</span>
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-burgundy">
              Shower Your Warm Blessings
            </h3>
            <p className="font-serif italic text-sm sm:text-base text-espresso-light mt-1">
              Send your heartfelt wishes and prayers to Barath &amp; Rithika.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitBlessing} className="max-w-xl mx-auto space-y-4 mb-10">
            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-copper font-bold mb-1">
                Your Name &amp; Place
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Anand &amp; Family, Kasaragod"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-ivory border border-gold/50 text-espresso focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy font-serif"
              />
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-copper font-bold mb-1">
                Your Warm Message &amp; Blessings
              </label>
              <textarea
                value={guestMessage}
                onChange={(e) => setGuestMessage(e.target.value)}
                placeholder="Write your wishes and blessings for the lovely couple..."
                rows={3}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-ivory border border-gold/50 text-espresso focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy font-serif resize-none"
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory font-cinzel text-xs font-bold tracking-widest shadow-md hover:shadow-burgundy-glow transition-all"
              >
                <Heart className="w-4 h-4 text-gold fill-gold/40" />
                <span>SEND BLESSINGS &amp; WISHES</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs font-cinzel font-bold text-burgundy mt-2"
              >
                ✨ Thank you! Your blessings have been warmly received.
              </motion.p>
            )}
          </form>

          {/* Recent Blessings Display */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-copper font-bold text-center mb-4">
              Heartfelt Wishes from Family &amp; Friends
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {blessings.map((b, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-ivory border border-gold/40 shadow-xs flex flex-col justify-between"
                >
                  <p className="font-serif italic text-sm text-espresso mb-2 leading-relaxed">
                    &ldquo;{b.message}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-gold/20 text-xs">
                    <strong className="font-cinzel text-burgundy">{b.name}</strong>
                    <span className="font-sans text-[10px] text-copper uppercase">{b.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traditional Website Footer */}
        <footer className="mt-16 pt-8 border-t border-gold/40 text-center text-xs font-sans text-espresso-light">
          <p className="font-cinzel text-sm font-bold text-burgundy mb-1">
            || Shree Kuladevatha Prasanna ||
          </p>
          <p className="italic font-serif">
            With Best Compliments from Ranjana, Family Members &amp; Relatives.
          </p>
          <p className="text-[11px] text-copper mt-3">
            Chi. BARATH Weds Chi. Sou. RITHIKA • 22 November 2026
          </p>
        </footer>
      </div>
    </section>
  );
};

export default BlessingsSection;
