import { motion } from 'framer-motion'
import { timelineItems } from '../data/content.js'

const Timeline = () => {
  const titleWords = "Our Journey".split(' ');

  return (
    <section className="relative py-32 bg-midnight overflow-hidden">
      {/* Background vertical light ray */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-48 bg-gradient-to-b from-transparent via-sky-blue/[0.03] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-display text-white text-center mb-24">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <div className="relative">
          {/* Animated Glowing Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-sky-blue via-electric-blue to-transparent shadow-[0_0_15px_rgba(96,165,250,0.5)] origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ height: '100%' }}
          />

          <div className="space-y-32">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const stepNumber = index < 9 ? '0' + (index + 1) : String(index + 1);

              return (
                <div key={index} className={"relative flex items-center md:justify-between " + (isEven ? "flex-row-reverse md:flex-row" : "flex-row md:flex-row-reverse")}>
                  
                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block md:w-5/12" />

                  {/* Center Dot with expanding ring */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div 
                      className="absolute w-8 h-8 rounded-full border border-sky-blue/30"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1.5, opacity: 0 }}
                      viewport={{ once: false, margin: '-20%' }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-4 h-4 bg-sky-blue rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-20%' }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    />
                    
                    {/* Connecting line to card */}
                    <motion.div 
                      className={"hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] bg-sky-blue/30 w-16 " + (isEven ? "left-full" : "right-full")}
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-20%' }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      style={{ originX: isEven ? 0 : 1 }}
                    />
                  </div>

                  {/* Content Card with subtle parallax and animated gradient border */}
                  <motion.div 
                    className="w-full md:w-5/12 pl-16 md:pl-0 relative group"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {/* Faint Step Number */}
                    <div className="absolute -top-12 -left-4 text-7xl font-display font-bold text-white/[0.03] select-none pointer-events-none z-0">
                      {stepNumber}
                    </div>

                    <div className="relative p-[1px] rounded-2xl bg-deep-navy overflow-hidden z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-blue/20 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-500 animate-gradient-shift" />
                      
                      <div className="relative bg-deep-navy/90 backdrop-blur-sm p-8 rounded-2xl h-full border border-white/5">
                        <span className="text-sky-blue font-body text-sm font-medium tracking-wider uppercase mb-2 block">
                          {item.date}
                        </span>
                        <h3 className="text-2xl text-white font-display mb-4">
                          {item.title}
                        </h3>
                        <p className="text-pale-blue/70 font-body font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
