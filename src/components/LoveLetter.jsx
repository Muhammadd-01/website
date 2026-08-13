import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Mail, Heart, Pen } from 'lucide-react'
import { letterContent, loveConfig } from '../data/content.js'

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsReading(true);
    }, 1500);
  };

  return (
    <section id="letter" className="relative py-32 px-4 bg-white/10 backdrop-blur-xl backdrop-blur-3xl border-t border-sky-blue/10 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-blue/30 to-transparent" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!isReading ? (
            <motion.div 
              key="envelope"
              className="flex flex-col items-center justify-center min-h-[500px]"
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative cursor-pointer group w-80 h-56 perspective-1000"
                onClick={handleOpen}
                whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                transition={{ duration: 0.5 }}
              >
                {/* Envelope Body */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-lg shadow-2xl border border-sky-blue/20 overflow-hidden">
                  {/* Subtle paper texture */}
                  <div className="absolute inset-0 opacity-5 paper-texture" />
                  
                  {/* Envelope seams */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 320 224" preserveAspectRatio="none">
                    <path d="M0 0 L160 112 L320 0" stroke="#60A5FA" strokeWidth="1" fill="none" />
                    <path d="M0 224 L160 112 L320 224" stroke="#60A5FA" strokeWidth="1" fill="none" />
                  </svg>
                </div>

                {/* Wax Seal */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="wax-seal group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300">
                    <Heart className="w-5 h-5 text-white/90" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Click to open text */}
                <motion.p 
                  className="absolute -bottom-16 left-0 w-full text-center text-sky-blue/60 font-body text-sm tracking-widest uppercase"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {'💌 Click to open 💌'}
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="letter-content"
              className="relative bg-white/10 backdrop-blur-xl backdrop-blur-md rounded-2xl border border-sky-blue/20 shadow-2xl p-8 md:p-12 overflow-hidden"
              initial={{ opacity: 0, y: 50, height: 200 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            >
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-3 paper-texture pointer-events-none" />
              
              {/* Corner ornaments */}
              <div className="corner-ornament top-left" />
              <div className="corner-ornament top-right" />
              <div className="corner-ornament bottom-left" />
              <div className="corner-ornament bottom-right" />

              <div className="relative z-10 text-pale-blue">
                {/* Date */}
                <motion.div 
                  className="text-right mb-8 font-body text-sm text-sky-blue/60 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {'📅 ' + (loveConfig.specialDate || "Today, Forever")}
                </motion.div>

                {/* Salutation */}
                <motion.p 
                  className="font-display text-2xl md:text-3xl text-white mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  {'Meri pyari ' + loveConfig.wifeName + ', 💖'}
                </motion.p>

                {/* Body Paragraphs */}
                <div className="space-y-6 font-body text-base md:text-lg leading-relaxed text-pale-blue/90">
                  {letterContent.paragraphs && letterContent.paragraphs.map((paragraph, index) => (
                    <motion.p 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + (index * 0.4), duration: 0.8 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Sign-off */}
                <motion.div 
                  className="mt-12 text-right relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + ((letterContent.paragraphs ? letterContent.paragraphs.length : 1) * 0.4) + 0.5 }}
                >
                  <p className="font-display text-xl text-sky-blue/80 mb-2">{'Forever yours, 💕'}</p>
                  <div className="flex justify-end items-center gap-2">
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: 1.5 + ((letterContent.paragraphs ? letterContent.paragraphs.length : 1) * 0.4) + 1, 
                        duration: 1.5, 
                        ease: "easeOut" 
                      }}
                    >
                      <p className="font-display text-3xl md:text-4xl text-white text-glow">
                        {loveConfig.myName}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], x: [0, 30], y: [0, -10] }}
                      transition={{ 
                        delay: 1.5 + ((letterContent.paragraphs ? letterContent.paragraphs.length : 1) * 0.4) + 1,
                        duration: 1.5
                      }}
                    >
                      <Pen className="w-5 h-5 text-sky-blue/60" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default LoveLetter
