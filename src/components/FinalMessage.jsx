import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { finalContent, loveConfig } from '../data/content.js'

export default function FinalMessage() {
  const burstParticles = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    angle: (i / 16) * Math.PI * 2,
    distance: 60 + Math.random() * 60,
    size: 3 + Math.random() * 4,
    delay: Math.random() * 0.3,
  }));

  return (
    <section id="final-message" className="py-32 min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Dark cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-navy to-midnight" />

      {/* Breathing radial glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[500px] h-[500px] bg-electric-blue/20 rounded-full blur-[120px]" />
      </motion.div>

      {/* Scattered sparkles */}
      <Sparkles className="absolute top-20 left-1/4 w-4 h-4 text-sky-blue/20 animate-pulse" />
      <Sparkles className="absolute top-40 right-1/3 w-3 h-3 text-lavender-blue/15 animate-pulse" />
      <Sparkles className="absolute bottom-40 left-1/3 w-5 h-5 text-sky-blue/10 animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">

        {/* Opener */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.8 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5 }}
          className="font-display text-3xl md:text-4xl text-pale-blue/60 mb-16"
        >
          {'🤍 ' + finalContent.opener}
        </motion.p>

        {/* Lines revealed dramatically */}
        {finalContent.lines.map((line, index) => {
          var lineClasses = '';
          if (index === 0) lineClasses = 'font-display text-4xl md:text-6xl text-white text-glow';
          else if (index === 1) lineClasses = 'font-display text-5xl md:text-7xl gradient-text-warm text-glow-strong';
          else lineClasses = 'font-display text-3xl md:text-5xl text-pale-blue/90';

          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.7 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, delay: 0.5 + index * 1.5 }}
              className={lineClasses + ' mb-8'}
            >
              {index === 1 ? '❤️ ' + line + ' ❤️' : line}
            </motion.p>
          );
        })}

        {/* Heart with particle burst */}
        <motion.div
          className="relative my-12"
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + finalContent.lines.length * 1.5 + 0.5, type: 'spring', stiffness: 200 }}
        >
          <Heart className="w-16 h-16 text-sky-blue animate-heartbeat drop-shadow-[0_0_30px_rgba(96,165,250,0.6)]" fill="currentColor" />

          {/* Burst particles */}
          {burstParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-sky-blue"
              style={{
                width: p.size + 'px',
                height: p.size + 'px',
                top: '50%',
                left: '50%',
                marginTop: -(p.size / 2) + 'px',
                marginLeft: -(p.size / 2) + 'px',
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              whileInView={{
                x: Math.cos(p.angle) * p.distance,
                y: Math.sin(p.angle) * p.distance,
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                delay: 0.5 + finalContent.lines.length * 1.5 + 0.5 + p.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>

        {/* Closing text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + finalContent.lines.length * 1.5 + 2 }}
          className="font-body text-xl md:text-2xl text-pale-blue/70 max-w-2xl leading-relaxed mt-4 mb-16"
        >
          {'💙 ' + finalContent.closing + ' 💙'}
        </motion.p>

        {/* Start Again button with pulsing ring */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + finalContent.lines.length * 1.5 + 2.5 }}
        >
          <div className="pulse-ring absolute inset-0 rounded-full" style={{ animationDelay: '0s' }} />
          <div className="pulse-ring absolute inset-0 rounded-full" style={{ animationDelay: '0.7s' }} />

          <button
            className="btn-primary btn-shimmer relative z-10 px-10 py-4"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {finalContent.cta}
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 text-pale-blue/30 text-xs flex items-center gap-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 3, duration: 2 }}
      >
        <span>Made with</span>
        <Heart className="w-3 h-3 text-sky-blue/50 inline" fill="currentColor" />
        <span>{'for ' + loveConfig.wifeName}</span>
      </motion.div>
    </section>
  )
}
