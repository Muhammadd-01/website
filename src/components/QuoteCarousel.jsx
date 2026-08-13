import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { loveQuotes } from '../data/content.js'

export default function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const nextQuote = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % loveQuotes.length);
    setProgress(0);
  }, []);

  const prevQuote = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? loveQuotes.length - 1 : prev - 1));
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextQuote();
          return 0;
        }
        return prev + (100 / 60); // 6 seconds, 10 updates per second
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused, nextQuote]);

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 1.1,
      z: 50,
      x: dir > 0 ? 100 : -100
    }),
    center: {
      opacity: 1,
      scale: 1,
      z: 0,
      x: 0
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.9,
      z: -50,
      x: dir < 0 ? 100 : -100
    })
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-16 px-4" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-10 left-10 w-4 h-4 text-sky-blue/20 animate-pulse-glow" />
        <Star className="absolute bottom-20 right-20 w-6 h-6 text-sky-blue/20 animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <Star className="absolute top-1/2 right-10 w-3 h-3 text-sky-blue/20 animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative p-[2px] rounded-3xl overflow-hidden bg-gradient-to-r from-sky-blue/30 via-lavender-blue/30 to-sky-blue/30 animate-gradient-shift bg-[length:200%_auto]">
        <div className="relative bg-transparent/80 backdrop-blur-xl rounded-[23px] px-8 py-12 md:py-20 md:px-16 min-h-[400px] flex items-center justify-center border border-white/5">
          
          <div className="absolute top-8 left-8 opacity-20 origin-center animate-[spin_30s_linear_infinite]">
            <Quote size={80} className="text-sky-blue" />
          </div>

          <div className="relative w-full overflow-hidden h-[250px] flex items-center justify-center perspective-[1000px]">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                className="absolute w-full text-center px-4"
              >
                <p className="font-display text-3xl md:text-5xl text-white mb-6 leading-relaxed">
                  {'"' + loveQuotes[currentIndex] + '"'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={prevQuote} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-95 group">
            <ChevronLeft size={24} className="group-active:scale-90 transition-transform" />
          </button>
          
          <button onClick={nextQuote} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-95 group">
            <ChevronRight size={24} className="group-active:scale-90 transition-transform" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {loveQuotes.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
                setProgress(0);
              }}
              className={"w-2 h-2 rounded-full transition-all duration-300 " + (i === currentIndex ? "w-6 bg-sky-blue" : "bg-white/20 hover:bg-white/40")}
            />
          ))}
        </div>
        <div className="w-full max-w-xs h-0.5 bg-sky-blue/30 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-sky-blue transition-all duration-100 ease-linear"
            style={{ width: progress + "%" }}
          />
        </div>
      </div>
    </div>
  )
}
