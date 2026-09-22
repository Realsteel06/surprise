import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, UtensilsCrossed, Clock, MapPin, Smile, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audio';
import cozyTableImg from '../assets/images/cozy_evening_table_1790105809895.jpg';

interface LetterContentProps {
  onReplay: () => void;
}

export const LetterContent: React.FC<LetterContentProps> = ({ onReplay }) => {
  const [responseChoice, setResponseChoice] = useState<string | null>(null);
  const [activeReason, setActiveReason] = useState<number | null>(null);

  const handleAccept = (choiceText: string) => {
    setResponseChoice(choiceText);
    romanticAudio.playSparkleSound();

    // Multistage heart & golden confetti
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#fda4af', '#f43f5e', '#fb7185', '#ffe4e6', '#f59e0b', '#ec4899'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fda4af', '#fbbf24'],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#fda4af', '#fbbf24'],
      });
    }, 250);
  };

  const reasons = [
    {
      title: 'Твоя улыбка',
      icon: Smile,
      text: 'Она освещает даже самый пасмурный и тяжелый день. Когда ты искренне улыбаешься, весь мир вокруг становится теплее.',
    },
    {
      title: 'Твоё доброе сердце',
      icon: Heart,
      text: 'Ты умеешь чувствовать так глубоко и искренне, как никто другой. Твоя нежность и поддержка — самое дорогое, что у меня есть.',
    },
    {
      title: 'Ты — мой дом',
      icon: Sparkles,
      text: 'Где бы мы ни находились, когда ты рядом, я чувствую спокойствие и уверенность. Ты делаешь меня по-настоящему счастливым человеком.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-2xl"
    >
      {/* The Parchment Letter Container */}
      <article className="relative rounded-2xl border border-[#e8d5c4]/60 bg-[#fffbf2] p-6 text-[#2c1810] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:p-10 md:p-12">
        {/* Decorative Golden Corner Flourishes */}
        <div className="pointer-events-none absolute top-3 left-3 h-10 w-10 border-t-2 border-l-2 border-rose-900/20 rounded-tl-lg" />
        <div className="pointer-events-none absolute top-3 right-3 h-10 w-10 border-t-2 border-r-2 border-rose-900/20 rounded-tr-lg" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-10 w-10 border-b-2 border-l-2 border-rose-900/20 rounded-bl-lg" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-10 w-10 border-b-2 border-r-2 border-rose-900/20 rounded-br-lg" />

        {/* Delicate Inner Margin Line */}
        <div className="pointer-events-none absolute inset-4 rounded-xl border border-rose-900/10 sm:inset-6" />

        {/* Letter Header */}
        <div className="relative mb-8 border-b border-rose-900/15 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest text-rose-800/70 uppercase">
            <span>Личное послание</span>
            <span aria-hidden="true">·</span>
            <span>От чистого сердца</span>
          </div>
          <h1 className="mt-2 font-handwriting text-4xl text-[#3b1219] sm:text-5xl">
            Сонечка, любимая моя...
          </h1>
          <p className="mt-1 font-serif-cormorant text-sm italic text-stone-600 sm:text-base">
            Для человека, без которого мне невыносимо тяжело
          </p>
        </div>

        {/* Letter Body - Beautiful, heartfelt, emotionally deep */}
        <div className="relative space-y-5 font-serif-cormorant text-lg leading-relaxed text-[#3a201b] sm:text-xl sm:leading-loose">
          <p>
            Я пишу тебе это, потому что больше не могу держать всё в себе. Наша ссора
            не выходит у меня из головы ни на одну секунду. Прости меня, пожалуйста.
            Когда мы ссоримся и между нами повисает эта холодная тишина,{' '}
            <strong className="font-semibold text-rose-900">
              мне становится невероятно тяжело без тебя
            </strong>
            .
          </p>

          <p>
            Всё вокруг сразу теряет краски, и я ни о чём другом не могу думать. Ты —{' '}
            <strong className="font-semibold text-rose-900">
              самый важный, самый близкий и дорогой человек для меня
            </strong>
            . Никакие глупые обиды или недопонимания не стоят того, чтобы мы отдалялись друг от друга.
            Я безумно скучаю по твоему голосу, по твоим глазам, по твоей улыбке и по тому теплу,
            которое бывает только рядом с тобой.
          </p>

          {/* Special Highlight Box for the Evening Invitation */}
          <div className="my-6 rounded-xl border border-rose-200 bg-rose-50/70 p-5 shadow-inner sm:p-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-800 uppercase">
              <Sparkles className="h-4 w-4 text-rose-600" />
              <span>Моё приглашение на сегодняшний вечер</span>
            </div>

            <p className="mt-2 text-base font-medium text-stone-800 sm:text-lg">
              Я очень хочу увидеть тебя сегодня. Я знаю, во сколько у тебя заканчивается пара —
              и я просто хочу встретить тебя сразу после неё, и мы вместе кое-куда пойдём...
              В одно очень тёплое, уютное и атмосферное место, где сможем согреться,
              спокойно поговорить обо всём и просто побыть вдвоём.
            </p>

            {/* Crucial caring reminder */}
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-300/60 bg-amber-100/70 p-3.5 text-stone-800">
              <UtensilsCrossed className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
              <div className="text-sm sm:text-base">
                <span className="font-bold text-amber-900">Главное предупреждение: </span>
                пожалуйста, <span className="underline decoration-amber-600 underline-offset-2 font-semibold">сильно дома перед выходом не наедайся!</span> 😉
                Я уже подготовил для нас кое-что особенное и очень вкусное, так что оставь место для кулинарного сюрприза.
              </div>
            </div>
          </div>

          <p>
            Ты делаешь мою жизнь по-настоящему живой и счастливой. Давай сегодня перевернем эту страницу,
            крепко-крепко обнимемся и забудем все обиды. Я очень жду момента, когда смогу увидеть твои глаза.
          </p>

          {/* Letter Sign-off */}
          <div className="pt-4 text-right">
            <p className="font-serif-cormorant text-base italic text-stone-600">
              С безграничной любовью и нетерпением,
            </p>
            <p className="mt-1 font-handwriting text-3xl font-medium text-rose-950 sm:text-4xl">
              Навсегда твой ❤️
            </p>
          </div>
        </div>

        {/* Cozy Evening Preview Card */}
        <div className="relative mt-8 overflow-hidden rounded-xl border border-rose-200/80 bg-white/70 shadow-sm">
          <div className="relative h-44 w-full sm:h-56">
            <img
              src={cozyTableImg}
              alt="Уютный столик при свечах для нашего вечера"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[11px] font-medium tracking-wider uppercase text-rose-300">
                Атмосфера сегодняшнего вечера
              </span>
              <p className="font-serif-cormorant text-lg font-medium text-rose-50 sm:text-xl">
                Теплый свет, уютная музыка, вкусный ужин и мы вдвоем
              </p>
            </div>
          </div>

          {/* Evening Itinerary Steps */}
          <div className="grid grid-cols-1 divide-y divide-rose-100 bg-[#fffcf7] p-4 text-xs sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:text-sm">
            <div className="flex items-center gap-2.5 p-2 text-stone-700">
              <Clock className="h-4 w-4 text-rose-600 shrink-0" />
              <div>
                <span className="block font-semibold text-stone-900">После твоей пары</span>
                <span className="text-stone-500 text-xs">Я буду ждать тебя</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 text-stone-700">
              <MapPin className="h-4 w-4 text-rose-600 shrink-0" />
              <div>
                <span className="block font-semibold text-stone-900">Секретное место</span>
                <span className="text-stone-500 text-xs">Уютно, тепло и вкусно</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 text-stone-700">
              <Heart className="h-4 w-4 text-rose-600 shrink-0" />
              <div>
                <span className="block font-semibold text-stone-900">Мир и объятия</span>
                <span className="text-stone-500 text-xs">Никаких ссор и обид</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive "Почему ты так важна для меня" Mini-cards */}
        <div className="mt-8">
          <div className="mb-3 text-center">
            <span className="font-serif-cormorant text-sm italic text-stone-600">
              Нажми на карточку, чтобы открыть тайную причину
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              const isSelected = activeReason === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveReason(isSelected ? null : idx);
                    romanticAudio.playSparkleSound();
                  }}
                  className={`group relative rounded-xl border p-4 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-rose-400 bg-rose-50/90 shadow-md ring-1 ring-rose-400/40'
                      : 'border-stone-200 bg-white/60 hover:border-rose-300 hover:bg-rose-50/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif-cormorant text-base font-semibold text-rose-950">
                      {reason.title}
                    </span>
                    <Icon className="h-4 w-4 text-rose-500 transition-transform group-hover:scale-110" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">
                    {reason.text}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive RSVP Choices for Sonya */}
        <div className="mt-10 border-t border-rose-900/15 pt-8">
          <div className="text-center">
            <p className="font-serif-cormorant text-xl font-semibold text-rose-950">
              Сонечка, что ты ответишь?
            </p>
            <p className="mt-1 text-xs text-stone-500">
              Выбери свой ответ — я жду его всем сердцем
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => handleAccept('Давай помиримся! Я обязательно приду 💖')}
              className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-rose-500 hover:to-rose-700 hover:shadow-rose-600/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="h-4 w-4 fill-white text-white transition-transform group-hover:scale-125" />
              <span>Давай мириться! Я согласна 💖</span>
            </button>

            <button
              onClick={() => handleAccept('Я согласна, но с тебя самые крепкие обнимашки 🥰')}
              className="group flex items-center justify-center gap-2 rounded-xl border border-rose-300 bg-rose-50/80 px-6 py-3.5 text-sm font-medium text-rose-950 transition-all duration-200 hover:bg-rose-100 hover:border-rose-400 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Smile className="h-4 w-4 text-rose-600" />
              <span>Согласна, но с тебя обнимашки 🥰</span>
            </button>
          </div>

          {/* Response Feedback banner */}
          <AnimatePresence>
            {responseChoice && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50/90 p-5 text-center text-emerald-950 shadow-md"
              >
                <div className="flex items-center justify-center gap-2 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold text-sm">Твой ответ принят!</span>
                </div>
                <p className="mt-2 font-serif-cormorant text-xl font-medium text-stone-800">
                  «{responseChoice}»
                </p>
                <p className="mt-1 text-xs text-stone-600">
                  Я уже считаю минуты до окончания твоей пары! Обещаю сделать этот вечер самым теплым и незабываемым. До скорой встречи, любимая! ✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fold back into envelope action */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Сложить письмо обратно в конверт</span>
          </button>
        </div>
      </article>
    </motion.div>
  );
};
