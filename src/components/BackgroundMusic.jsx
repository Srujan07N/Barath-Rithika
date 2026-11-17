import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Bell } from 'lucide-react';
import weddingAudio from '../utils/audioSynthesizer';

export const BackgroundMusic = ({ isPlaying, onToggle }) => {
  const [volume, setVolume] = useState(0.45);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    weddingAudio.setVolume(val);
  };

  const handleBellChime = () => {
    weddingAudio.playBell();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Auspicious Temple Bell Chime button */}
      <button
        onClick={handleBellChime}
        title="Ring Auspicious Temple Bell"
        className="p-3 rounded-full bg-ivory/90 backdrop-blur-md border border-gold/60 text-burgundy shadow-lg hover:shadow-gold-glow hover:scale-105 transition-all duration-300"
        aria-label="Ring Temple Bell"
      >
        <Bell className="w-4 h-4 text-copper" />
      </button>

      {/* Floating Music Control Bar */}
      <div
        className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-ivory/95 backdrop-blur-md border-2 border-gold/70 shadow-lg text-burgundy hover:border-gold transition-all duration-300"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Toggle Button */}
        <button
          onClick={() => onToggle(!isPlaying)}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
        >
          {isPlaying ? (
            <div className="flex items-center gap-1">
              <Volume2 className="w-5 h-5 text-burgundy" />
              {/* Animated Sound Equalizer Bars */}
              <div className="flex items-end gap-0.5 h-4 w-4">
                <span className="w-1 bg-burgundy rounded-full sound-bar-1" />
                <span className="w-1 bg-copper rounded-full sound-bar-2" />
                <span className="w-1 bg-gold rounded-full sound-bar-3" />
                <span className="w-1 bg-burgundy rounded-full sound-bar-4" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <VolumeX className="w-5 h-5 text-rose-antique" />
              <span className="font-cinzel text-xs font-bold text-copper hidden sm:inline">
                PLAY MUSIC
              </span>
            </div>
          )}

          {isPlaying && (
            <span className="font-cinzel text-xs font-bold text-burgundy hidden sm:inline">
              SHEHNAI &amp; BANSURI
            </span>
          )}
        </button>

        {/* Volume Slider Popover on Hover */}
        {showVolumeSlider && (
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gold/40">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-champagne-dark rounded-lg appearance-none cursor-pointer accent-burgundy"
              title="Music Volume"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundMusic;
