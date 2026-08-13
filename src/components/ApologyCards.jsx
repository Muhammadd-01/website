import { motion } from 'framer-motion';
import { MessageCircle, HeartCrack, Ear, Heart } from 'lucide-react';
import { apologyCards } from '../data/content.js';

const iconMap = {
  MessageCircle,
  HeartCrack,
  Ear,
  Heart
};

export default function ApologyCards() {
  return (
    <section id="apology" className="py-32 max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {apologyCards.map((card, index) => {
          const Icon = iconMap[card.icon];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              whileHover={{ 
                y: -4,
                boxShadow: "0 10px 30px -10px rgba(96, 165, 250, 0.3)",
                borderColor: "rgba(96, 165, 250, 0.5)"
              }}
              className="glass-card p-8 rounded-2xl border border-white/10 transition-colors"
            >
              {Icon && <Icon className="w-8 h-8 text-sky-blue mb-4" />}
              <h3 className="font-display text-3xl text-white mb-3">
                {card.title}
              </h3>
              <p className="font-body text-pale-blue/70 text-lg leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
