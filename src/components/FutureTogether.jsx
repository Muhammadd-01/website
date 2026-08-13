import { motion } from 'framer-motion'
import { ShieldCheck, Home, Compass, HeartHandshake } from 'lucide-react'
import { futurePlans } from '../data/content.js'

const iconMap = {
  ShieldCheck: ShieldCheck,
  Home: Home,
  Compass: Compass,
  HeartHandshake: HeartHandshake,
}

const FutureTogether = () => {
  return (
    <section id="future" className="py-32 px-4 relative bg-white/10 backdrop-blur-xl backdrop-blur-3xl border-t border-sky-blue/10 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-sky-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-display text-4xl md:text-5xl text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {futurePlans.heading}
          </motion.h2>
          <motion.p 
            className="font-body text-xl text-pale-blue/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {futurePlans.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {futurePlans.plans.map((plan, index) => {
            const IconComponent = iconMap[plan.icon] || HeartHandshake;
            return (
              <motion.div
                key={index}
                className="animated-border relative bg-white/10 backdrop-blur-xl backdrop-blur-md border border-sky-blue/20 rounded-2xl p-8 group overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-6 relative z-10">
                  <div className="flex-shrink-0 bg-sky-blue/10 p-4 rounded-full group-hover:bg-sky-blue/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-sky-blue" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-white mb-3">
                      {plan.title}
                    </h3>
                    <p className="font-body text-pale-blue/80 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                </div>
                {/* Decorative subtle background icon */}
                <div className="absolute -bottom-4 -right-4 opacity-5 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 pointer-events-none">
                  <IconComponent className="w-48 h-48 text-sky-blue" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default FutureTogether
