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
                className="relative cursor-pointer group w-80 h-56"
                style={{ perspective: "1500px" }}
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                {/* Back of Envelope */}
                <div className="absolute inset-0 bg-[#0a1128] rounded-lg border border-sky-blue/20" />
                
                {/* The Letter inside the envelope */}
                <motion.div 
                  className="absolute inset-x-2 top-2 bottom-2 bg-gradient-to-b from-[#e2e8f0] to-[#f8fafc] rounded flex flex-col items-center p-4 border border-sky-blue/30"
                  initial={{ y: 0, zIndex: 10 }}
                  animate={isOpen ? { y: -100, zIndex: 25, opacity: 0 } : { y: 0, zIndex: 10, opacity: 1 }}
                  transition={{ delay: isOpen ? 0.4 : 0, duration: 0.8, ease: "easeOut" }}
                >
                  <div className="w-full h-2 bg-sky-blue/20 rounded-full mb-2" />
                  <div className="w-3/4 h-2 bg-sky-blue/20 rounded-full mb-2" />
                  <div className="w-5/6 h-2 bg-sky-blue/20 rounded-full" />
                </motion.div>

                {/* Left Side Flap */}
                <div 
                  className="absolute inset-0 bg-[#0f172a] rounded-lg z-20 border-l border-sky-blue/20"
                  style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
                />
                
                {/* Right Side Flap */}
                <div 
                  className="absolute inset-0 bg-[#0f172a] rounded-lg z-20 border-r border-sky-blue/20"
                  style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }}
                />
                
                {/* Bottom Flap */}
                <div 
                  className="absolute inset-0 bg-[#1e293b] rounded-lg z-20 border-b border-sky-blue/20 drop-shadow-xl"
                  style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
                />

                {/* Top Flap (Hinged) */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-full origin-top z-30"
                  initial={{ rotateX: 0 }}
                  animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div 
                    className="absolute inset-0 bg-[#1e293b] rounded-t-lg border-t border-sky-blue/30"
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%)" }}
                  />
                  
                  {/* Wax Seal placed EXACTLY at the 50% 50% tip of the top flap */}
                  <motion.div 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 wax-seal group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300"
                    animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart className="w-5 h-5 text-white/90" fill="currentColor" />
                  </motion.div>
                </motion.div>

                {/* Click to open text */}
                <motion.p 
                  className="absolute -bottom-16 left-0 w-full text-center text-sky-blue/60 font-body text-sm tracking-widest uppercase pointer-events-none"
                  animate={isOpen ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
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
