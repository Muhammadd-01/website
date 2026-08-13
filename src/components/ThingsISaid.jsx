import { thingsISaid } from '../data/content.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ThingsISaid() {
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <section className="py-32 max-w-4xl mx-auto px-6 text-center">
      <h2 className="font-display text-4xl md:text-6xl font-light gradient-text mb-16">
        Things I Should Have Said More Often
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {thingsISaid.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(96, 165, 250, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMessage(item)}
            className="glass-card px-6 py-3 cursor-pointer rounded-full"
          >
            <span className="font-body text-lg text-pale-blue">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
      
      <div className="min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedMessage && (
            <motion.div
              key={selectedMessage}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-glow"
            >
              <h3 className="font-display text-4xl md:text-5xl text-white">
                "{selectedMessage}"
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
