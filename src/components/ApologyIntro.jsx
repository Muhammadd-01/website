import { motion } from 'framer-motion'
import { introContent } from '../data/content.js'

const ApologyIntro = () => {
  const headingChars = introContent.heading.split('');

  return (
    <section className="relative py-32 px-4 bg-transparent overflow-hidden">
      {/* Subtle radial gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-royal-blue rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Animated line */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-sky-blue to-transparent mb-12"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '100px', opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Decorative Quote */}
        <div className="absolute top-0 left-10 text-[200px] leading-none font-display text-white/[0.02] -z-10 select-none">
          "
        </div>

        {/* Character Reveal Heading */}
        <h2 className="text-4xl md:text-5xl font-display text-white mb-16 text-center">
          {headingChars.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: 'backOut' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h2>

        {/* Paragraphs with blur/fade/slide */}
        <div className="space-y-8 text-lg md:text-xl font-body font-light text-pale-blue/80 text-center leading-relaxed">
          {introContent.paragraphs.map((text, i) => {
            // Apply pulse glow to specific word if needed
            const hasSorry = text.toLowerCase().includes('sorry');
            
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, delay: i * 0.3 }}
              >
                {hasSorry ? (
                  text.split(/(sorry)/i).map((part, idx) => 
                    part.toLowerCase() === 'sorry' ? (
                      <span key={idx} className="inline-block text-sky-blue animate-pulse-glow font-medium">
                        {part}
                      </span>
                    ) : part
                  )
                ) : (
                  text
                )}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default ApologyIntro
