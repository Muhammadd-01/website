import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Heart } from 'lucide-react'
import { forgivenessQuestion } from '../data/content.js'

export default function ForgivenessQuestion() {
  const [accepted, setAccepted] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })

  const handleHoverNo = () => {
    // Generate random coordinates to dodge the cursor
    // Limiting to a reasonable radius so it stays on screen but moves away
    const randomX = (Math.random() - 0.5) * 300
    const randomY = (Math.random() - 0.5) * 300
    setNoPosition({ x: randomX, y: randomY })
  }

  // Create a burst of hearts for the success state
  const heartsArray = Array.from({ length: 20 })

  return (
    <section className="relative py-32 px-4 bg-transparent overflow-hidden min-h-[60vh] flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-sky-blue/30 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question-box"
              className="bg-white/10 backdrop-blur-xl backdrop-blur-xl border border-sky-blue/30 rounded-3xl p-8 md:p-12 shadow-2xl relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
            >
              {/* Crown Decoration */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-transparent p-3 rounded-full border border-sky-blue/30 shadow-[0_0_20px_rgba(96,165,250,0.4)]">
                <Crown className="w-8 h-8 text-sky-blue" fill="currentColor" />
              </div>

              <h2 className="font-display text-2xl text-pale-blue/70 mb-4 mt-4">
                {forgivenessQuestion.heading}
              </h2>
              <p className="font-display text-3xl md:text-5xl text-white leading-tight mb-12">
                {forgivenessQuestion.question}
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative min-h-[60px]">
                {/* YES Button */}
                <motion.button
                  onClick={() => {
                    setAccepted(true);
                    setTimeout(() => {
                      window.open('https://wa.me/923160212457?text=I%20forgive%20you%20%E2%9D%A4%EF%B8%8F', '_blank');
                    }, 1500);
                  }}
                  className="btn-primary btn-shimmer px-8 py-4 rounded-full font-body text-lg flex items-center gap-2 group relative z-20 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{forgivenessQuestion.yesButton}</span>
                </motion.button>

                {/* NO Button (Runs away!) */}
                <motion.button
                  onMouseEnter={handleHoverNo}
                  onClick={handleHoverNo} // Also run on tap for mobile
                  className="px-8 py-4 rounded-full border border-red-500/30 text-red-400 font-body text-lg bg-red-500/10 backdrop-blur-sm relative z-10"
                  animate={{
                    x: noPosition.x,
                    y: noPosition.y,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {forgivenessQuestion.noButton}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
              className="text-center relative"
            >
              {/* Heart burst animation */}
              {heartsArray.map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 0, 
                    scale: Math.random() * 2 + 1,
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400 - 100,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
                </motion.div>
              ))}

              <div className="bg-gradient-to-br from-sky-blue/20 to-transparent p-12 rounded-3xl border border-sky-blue/40 shadow-[0_0_40px_rgba(96,165,250,0.5)]">
                <Crown className="w-16 h-16 text-sky-blue mx-auto mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]" fill="currentColor" />
                <h3 className="font-display text-4xl md:text-5xl text-white text-glow mb-4">
                  {forgivenessQuestion.successMessage}
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
