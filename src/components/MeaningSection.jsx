import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { meaningStatements } from '../data/content.js'

export default function MeaningSection() {
  return (
    <section className="relative py-24 min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-navy to-midnight -z-10" />
      
      {/* Background that gets glowy */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-blue/5 via-midnight/0 to-midnight/0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="max-w-3xl w-full">
        <div className="text-center mb-20 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl text-white mb-6 relative inline-block"
          >
            What You Mean To Me
            <motion.div 
              className="absolute -bottom-2 left-0 h-0.5 bg-sky-blue"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.h2>
        </div>

        <div className="space-y-12">
          {meaningStatements.map((statement, index) => {
            const isLastTwo = index >= meaningStatements.length - 2;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <motion.div 
                  initial={isLastTwo ? { opacity: 0, scale: 0.8 } : { opacity: 0, filter: "blur(10px)", y: 20 }}
                  whileInView={isLastTwo ? { opacity: 1, scale: 1 } : { opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="relative group w-full"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-sky-blue/10 group-hover:bg-sky-blue/50 transition-colors duration-500 rounded-full" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-sky-blue shadow-[0_0_10px_rgba(96,165,250,0.8)] group-hover:h-full transition-all duration-700 rounded-full" />
                  
                  <div className="pl-6 py-4 flex items-start gap-4">
                    <span className="text-sky-blue/30 font-mono text-sm pt-2 shrink-0">
                      {"0" + (index + 1) + " / 0" + meaningStatements.length}
                    </span>
                    <p className={"font-body text-xl md:text-2xl text-white/90 leading-relaxed " + (isLastTwo ? "font-display text-2xl md:text-3xl text-sky-blue" : "")}>
                      {statement}
                    </p>
                  </div>
                </motion.div>

                {index < meaningStatements.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="my-8 text-sky-blue/20"
                  >
                    <Heart className="w-4 h-4 animate-pulse" fill="currentColor" />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
