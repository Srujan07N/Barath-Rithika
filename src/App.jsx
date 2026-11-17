import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WeddingEntrance from './components/WeddingEntrance';
import Navbar from './components/Navbar';
import InvitationCard from './components/InvitationCard';
import WeddingCountdown from './components/WeddingCountdown';
import WeddingDetails from './components/WeddingDetails';
import BlessingsSection from './components/BlessingsSection';
import BackgroundMusic from './components/BackgroundMusic';
import FloatingPetals from './components/FloatingPetals';
import weddingAudio from './utils/audioSynthesizer';

export function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleOpenComplete = () => {
    setHasEntered(true);
    // Smooth scroll to top of invitation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReopenDoors = () => {
    setHasEntered(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleToggleAudio = (nextState) => {
    setIsAudioActive(nextState);
    if (nextState) {
      weddingAudio.start();
    } else {
      weddingAudio.stop();
    }
  };

  return (
    <div className="relative min-h-screen bg-ivory text-espresso font-serif overflow-x-hidden">
      {/* Floating Canvas Jasmine & Rose Petals */}
      <FloatingPetals count={26} enabled={true} />

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          /* SECTION 2: CINEMATIC 3D ENTRANCE */
          <motion.div
            key="entrance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 w-full h-full"
          >
            <WeddingEntrance
              onOpenComplete={handleOpenComplete}
              isAudioActive={isAudioActive}
              onToggleAudio={handleToggleAudio}
            />
          </motion.div>
        ) : (
          /* MAIN WEDDING INVITATION WEBSITE CONTENT */
          <motion.main
            key="main-invitation"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="relative w-full"
          >
            {/* Top Navigation */}
            <Navbar
              onReopenDoors={handleReopenDoors}
              isAudioActive={isAudioActive}
              onToggleAudio={handleToggleAudio}
            />

            {/* Spacer for fixed navbar */}
            <div className="h-16 sm:h-20" />

            {/* SECTION 3: MAIN WEDDING INVITATION CARD */}
            <InvitationCard />

            {/* SECTION 5: WEDDING COUNTDOWN */}
            <WeddingCountdown />

            {/* SECTION 6: WEDDING DETAILS & VENUE */}
            <WeddingDetails />

            {/* SECTION 9: FINAL BLESSINGS & GUESTBOOK */}
            <BlessingsSection />

            {/* SECTION 8: FLOATING BACKGROUND MUSIC CONTROLLER */}
            <BackgroundMusic
              isPlaying={isAudioActive}
              onToggle={handleToggleAudio}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
