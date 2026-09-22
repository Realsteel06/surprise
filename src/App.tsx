/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PetalsCanvas } from './components/PetalsCanvas';
import { RomanticHeader } from './components/RomanticHeader';
import { InteractiveEnvelope } from './components/InteractiveEnvelope';
import { LetterContent } from './components/LetterContent';
import { romanticAudio } from './utils/audio';

interface FloatingHeartItem {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeartItem[]>([]);
  const letterRef = useRef<HTMLDivElement | null>(null);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
  };

  const handleCloseEnvelope = () => {
    setIsOpen(false);
    romanticAudio.playSparkleSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to letter smoothly when envelope opens
  useEffect(() => {
    if (isOpen && letterRef.current) {
      setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [isOpen]);

  // Click anywhere to produce a gentle romantic heart sparkle
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid triggering on buttons and interactive letter elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) {
      return;
    }

    const newHeart: FloatingHeartItem = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      color: ['#f43f5e', '#fb7185', '#fda4af', '#f472b6'][Math.floor(Math.random() * 4)],
    };

    setFloatingHearts((prev) => [...prev.slice(-12), newHeart]);

    // Self cleanup after animation
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  const triggerHeartBurst = () => {
    romanticAudio.playSparkleSound();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.2 },
      colors: ['#f43f5e', '#fda4af', '#fb7185'],
    });
  };

  return (
    <div
      onClick={handlePageClick}
      className="relative min-h-screen bg-[#110c12] text-stone-100 font-sans-body selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden"
    >
      {/* Background Petals Canvas */}
      <PetalsCanvas />

      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-rose-950/20 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[450px] w-[500px] rounded-full bg-rose-900/10 blur-[140px]" />
        <div className="absolute top-1/2 left-0 h-[350px] w-[400px] rounded-full bg-amber-950/15 blur-[120px]" />
      </div>

      {/* Floating Click Hearts */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 1, scale: 0.6, y: 0 }}
          animate={{ opacity: 0, scale: 1.4, y: -60 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
          style={{ left: heart.x, top: heart.y }}
        >
          <Heart className="h-6 w-6 fill-current" style={{ color: heart.color }} />
        </motion.div>
      ))}

      {/* Top Bar Navigation */}
      <RomanticHeader onHeartClick={triggerHeartBurst} />

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Intro Tagline */}
        <div className="mb-8 text-center sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-rose-800/40 bg-rose-950/30 px-4 py-1.5 text-xs text-rose-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-rose-400" />
            <span>Для моей любимой Сони</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-serif-cormorant text-4xl font-normal tracking-wide text-rose-50 sm:text-5xl md:text-6xl text-balance"
          >
            {isOpen ? 'Письмо от всего сердца' : 'У меня есть кое-что важное для тебя'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 font-serif-cormorant text-base italic text-rose-200/70 sm:text-lg max-w-xl mx-auto"
          >
            {isOpen
              ? 'Прочти эти строки не торопясь...'
              : 'Нажми на конверт, чтобы открыть его'}
          </motion.p>
        </div>

        {/* Envelope Interaction View */}
        <div className="mb-12">
          <InteractiveEnvelope
            isOpen={isOpen}
            onOpen={handleOpenEnvelope}
            onClose={handleCloseEnvelope}
          />
        </div>

        {/* Unfolded Letter View */}
        <div ref={letterRef}>
          <AnimatePresence>
            {isOpen && (
              <LetterContent onReplay={handleCloseEnvelope} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Gentle Footer */}
      <footer className="relative z-10 border-t border-rose-900/20 py-8 text-center text-xs text-stone-500">
        <div className="flex items-center justify-center gap-2">
          <span>Сделано с любовью</span>
          <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
          <span>Специально для Сони</span>
        </div>
        <p className="mt-1 font-serif-cormorant text-stone-600 text-sm">
          Никакие ссоры не могут затмить то, как сильно ты мне дорога.
        </p>
      </footer>
    </div>
  );
}
