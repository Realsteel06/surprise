import React, { useState } from 'react';
import { Volume2, VolumeX, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface RomanticHeaderProps {
  onHeartClick?: () => void;
}

export const RomanticHeader: React.FC<RomanticHeaderProps> = ({ onHeartClick }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleToggleMusic = () => {
    const nextState = romanticAudio.toggleMusic((playing) => {
      setIsPlaying(playing);
    });
    setIsPlaying(nextState);
    romanticAudio.playSparkleSound();
  };

  return (
    <header className="relative z-20 flex items-center justify-between border-b border-rose-900/30 bg-[#140f13]/80 px-4 py-3.5 backdrop-blur-md sm:px-8">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2">
        <button
          onClick={onHeartClick}
          className="group flex items-center gap-2 text-left focus:outline-none"
          title="Нажми на сердечко"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 transition-transform duration-300 group-hover:scale-110">
            <Heart className="h-4 w-4 fill-rose-500/40 text-rose-400" />
          </span>
          <span className="font-serif-cormorant text-xl font-medium tracking-wide text-rose-100 sm:text-2xl">
            Для Сони
          </span>
        </button>
      </div>

      {/* Zone 2: Quiet message indicator */}
      <div className="hidden items-center gap-2 text-xs font-medium text-rose-300/70 sm:flex">
        <span>Особенное послание</span>
        <span aria-hidden="true" className="text-rose-500/40">·</span>
        <span>Только для тебя</span>
        <span aria-hidden="true" className="text-rose-500/40">·</span>
        <span>На сегодняшний вечер</span>
      </div>

      {/* Zone 3: Action - Atmospheric Audio Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleMusic}
          className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
            isPlaying
              ? 'border-rose-400/50 bg-rose-500/20 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
              : 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-rose-800/60 hover:text-rose-200'
          }`}
          aria-label={isPlaying ? 'Выключить фоновую музыку' : 'Включить атмосферную музыку'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="h-3.5 w-3.5 animate-pulse text-rose-300" />
              <span className="whitespace-nowrap">Музыка играет</span>
            </>
          ) : (
            <>
              <VolumeX className="h-3.5 w-3.5 text-stone-400" />
              <span className="whitespace-nowrap">Включить музыку</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
