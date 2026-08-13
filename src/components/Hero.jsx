import { motion } from 'framer-motion'
import { Heart, ArrowDown, Sparkles } from 'lucide-react'
import { heroContent } from '../data/content.js'

const Hero = () => {
  const words = (heroContent.heading || '').split(' ');

  const handleScroll = () => {
    const el = document.querySelector('#intro');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Background with breathing effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-deep-navy via-midnight to-deep-blue"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 opacity-30 mix-blend-screen"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(96, 165, 250, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.3) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating decorative diamonds */}
      <motion.div
        className="absolute left-10 top-1/4 w-8 h-8 rotate-45 border border-sky-blue/20"
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-12 top-1/3 w-6 h-6 rotate-45 border border-lavender-blue/20"
        animate={{ y: [0, 30, 0], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6 text-center">

        {/* Label */}
        <motion.span
          className="font-body text-sm tracking-widest uppercase text-sky-blue/70 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {'💙 ' + heroContent.label + ' 💙'}
        </motion.span>

        {/* Heart with orbiting particles */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <Heart className="w-14 h-14 text-sky-blue animate-pulse-glow drop-shadow-[0_0_20px_rgba(96,165,250,0.5)]" fill="currentColor" />
          </motion.div>

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-sky-blue rounded-full opacity-40"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'rotate(' + (i * 45) + 'deg) translateY(-28px)',
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Heading with word-by-word reveal */}
        <div className="relative mb-6">
          <Sparkles className="absolute -top-6 -right-6 w-5 h-5 text-sky-blue/30 animate-pulse" />
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light gradient-text tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-3"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subheading */}
        <motion.p
          className="font-body text-lg md:text-xl text-pale-blue/60 max-w-md mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {heroContent.subheading}
        </motion.p>

        {/* CTA Button with shimmer */}
        <motion.button
          className="btn-primary btn-shimmer group flex items-center gap-3 px-10 py-4 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScroll}
        >
          <span className="relative z-10 font-body tracking-wide">{heroContent.cta}</span>
          <ArrowDown className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
        </motion.button>

        <motion.span
          className="text-pale-blue/20 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {'✨ scroll down ✨'}
        </motion.span>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-midnight to-transparent pointer-events-none z-10" />
    </section>
  )
}

export default Hero
