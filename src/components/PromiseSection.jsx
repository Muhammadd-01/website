import { motion } from 'framer-motion';
import { Shield, Heart, Ear, MessageSquare, RefreshCw, Users, Check } from 'lucide-react';
import { promiseCards } from '../data/content.js';

export default function PromiseSection() {
  const icons = [Ear, MessageSquare, Heart, RefreshCw, Users];

  return (
    <div className="relative py-24 bg-transparent overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
           <Shield className="w-12 h-12 text-sky-900/30 mb-6" strokeWidth={1} />
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             className="text-4xl md:text-5xl font-display text-sky-200 text-center"
           >
             My Promises to You
           </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promiseCards.map((card, index) => {
            const IconComponent = icons[index % icons.length];
            const numStr = "0" + (index + 1);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative bg-white/10 backdrop-blur-xl backdrop-blur-3xl border-t border-sky-blue/10/40 backdrop-blur-md rounded-2xl p-8 border border-sky-900/30 hover:border-sky-400/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-6xl font-display text-sky-900/10 font-bold pointer-events-none transition-all duration-500 group-hover:text-sky-800/20">
                  {numStr}
                </div>
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
                  className="absolute top-6 left-6"
                >
                  <Check className="w-4 h-4 text-emerald-400/50" />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-transparent to-royal-blue/0 group-hover:from-sky-500/5 group-hover:to-royal-blue/10 transition-all duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center text-center pt-8">
                  <div className="w-16 h-16 rounded-full bg-deep-blue/50 flex items-center justify-center mb-6 border border-sky-800/50 group-hover:border-sky-400/50 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-500">
                    <IconComponent className="w-8 h-8 text-sky-300 group-hover:text-sky-200 transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-display text-sky-100 mb-4 tracking-wide group-hover:text-white transition-colors duration-300">
                    {card.title}
                  </h3>
                  
                  <p className="text-sky-200/70 font-body leading-relaxed group-hover:text-sky-100/90 transition-colors duration-300">
                    {card.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
