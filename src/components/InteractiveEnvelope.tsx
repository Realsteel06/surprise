import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audio';

interface InteractiveEnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  isOpen,
  onOpen,
}) => {
  const handleOpenClick = () => {
    if (isOpen) return;

    romanticAudio.playOpenEnvelopeSound();

    // Trigger gentle romantic heart confetti
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#fda4af', '#f43f5e', '#fb7185', '#ffe4e6', '#f59e0b'],
      shapes: ['circle'],
      scalar: 1.1,
    });

    onOpen();
  };

  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col items-center">
      {/* Outer Glow behind envelope */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial from-rose-500/15 via-rose-900/5 to-transparent blur-3xl" />

      {/* Helper prompt banner when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-5 py-2 text-sm text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.15)] backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-rose-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-serif-cormorant text-base sm:text-lg">
              Тебе пришло важное письмо. Нажми, чтобы открыть
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The 3D Envelope Container */}
      <motion.div
        layout
        onClick={handleOpenClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOpenClick();
          }
        }}
        whileHover={!isOpen ? { scale: 1.02, y: -4 } : {}}
        whileTap={!isOpen ? { scale: 0.98 } : {}}
        className={`perspective-1000 group relative w-full cursor-pointer select-none transition-shadow duration-500 ${
          isOpen ? 'pointer-events-none cursor-default' : 'hover:shadow-[0_20px_50px_rgba(225,29,72,0.25)]'
        }`}
        aria-label={isOpen ? 'Открытый конверт' : 'Нажмите, чтобы распечатать конверт для Сони'}
      >
        <div className="relative h-[250px] w-full rounded-2xl border border-rose-900/40 bg-gradient-to-b from-[#2e121e] via-[#240c16] to-[#1a070f] p-4 shadow-2xl sm:h-[300px] sm:p-6">
          {/* Subtle Paper Texture & Border Lines */}
          <div className="pointer-events-none absolute inset-2 rounded-xl border border-rose-400/15" />
          <div className="pointer-events-none absolute inset-3 rounded-lg border border-dashed border-rose-300/10" />

          {/* Postal Stamps & Markings */}
          <div className="relative z-10 flex h-full flex-col justify-between">
            {/* Top Row: Stamps and Priority Delivery */}
            <div className="flex items-start justify-between">
              {/* Postmark Circle */}
              <div className="flex h-16 w-16 -rotate-12 flex-col items-center justify-center rounded-full border border-rose-400/30 p-1 text-center font-serif-cormorant text-[9px] uppercase tracking-wider text-rose-300/70 sm:h-20 sm:w-20 sm:text-[10px]">
                <span>Экспресс</span>
                <span className="font-semibold text-rose-300">СОНЯ</span>
                <span className="text-[8px] text-rose-400/60">Лично в руки</span>
              </div>

              {/* Romantic Stamp */}
              <div className="relative flex h-16 w-14 flex-col items-center justify-between rounded border-2 border-dashed border-rose-300/40 bg-gradient-to-b from-rose-900/60 to-rose-950/80 p-1.5 shadow-md sm:h-20 sm:w-16">
                <span className="text-[8px] uppercase tracking-widest text-rose-200">Любовь</span>
                <Heart className="h-6 w-6 fill-rose-500 text-rose-400 animate-pulse" />
                <span className="font-serif-cormorant text-[9px] text-rose-300">№ 1</span>
              </div>
            </div>

            {/* Center Area: Addressee Calligraphy */}
            <div className="my-auto text-center">
              <p className="font-sans-body text-xs tracking-widest text-rose-300/60 uppercase">
                Куда: В самое тёплое сердце
              </p>
              <h2 className="mt-1 font-handwriting text-3xl font-medium tracking-wide text-rose-100 sm:text-4xl sm:leading-relaxed">
                Любимой Бусинке
              </h2>
              <p className="mt-1 font-serif-cormorant text-xs italic text-rose-300/80 sm:text-sm">
                От того, кто безумно скучает и ждёт встречи
              </p>
            </div>

            {/* Bottom Row: Post details */}
            <div className="flex items-end justify-between text-[10px] text-rose-400/50 sm:text-xs">
              <span>Серия: Наш сегодняшний вечер</span>
              <span>100% Искренность</span>
            </div>
          </div>

          {/* Envelope Flap Triangles Visual */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            {/* Left triangle fold */}
            <div
              className="absolute top-0 bottom-0 left-0 w-1/2 border-r border-rose-400/10 bg-gradient-to-br from-transparent via-rose-950/20 to-black/30"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
            {/* Right triangle fold */}
            <div
              className="absolute top-0 right-0 bottom-0 w-1/2 border-l border-rose-400/10 bg-gradient-to-bl from-transparent via-rose-950/20 to-black/30"
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
            />
            {/* Bottom triangle fold */}
            <div
              className="absolute right-0 bottom-0 left-0 h-1/2 border-t border-rose-400/10 bg-gradient-to-t from-black/40 to-transparent"
              style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
            />
          </div>

          {/* Wax Seal in the center of the envelope */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={!isOpen ? { scale: [1, 1.05, 1] } : { scale: 0.8, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 via-rose-800 to-rose-950 shadow-[0_4px_25px_rgba(225,29,72,0.6)] ring-2 ring-amber-400/40 sm:h-16 sm:w-16"
            >
              {/* Wax drip details */}
              <div className="pointer-events-none absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-rose-900/80" />
              <div className="pointer-events-none absolute -top-1 -left-0.5 h-3 w-3 rounded-full bg-rose-800/80" />

              {/* Embossed initial "С" (Соня) */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/30 bg-rose-900/50 shadow-inner sm:h-12 sm:w-12">
                <span className="font-serif-cormorant text-2xl font-bold text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  С
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
