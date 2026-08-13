import { motion } from 'framer-motion';
import { useState } from 'react';
import { Camera } from 'lucide-react';
import { memories } from '../data/content.js';

const MemoryGallery = () => {
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="memories" className="py-32 max-w-6xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="font-display text-4xl md:text-6xl font-light gradient-text text-center mb-4"
      >
        Our Moments
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-pale-blue/60 text-center mb-16"
      >
        Every picture tells our story.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            variants={itemVariants}
            whileHover={{ y: -4, rotate: 1 }}
            className="glass-card overflow-hidden rounded-2xl group transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:border-electric-blue/50"
          >
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-deep-navy/50">
              {failedImages[memory.id] ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-deep-navy to-midnight p-4">
                  <Camera className="w-10 h-10 text-pale-blue/20 mb-2" />
                  <span className="text-pale-blue/40 text-sm">Add your photo</span>
                </div>
              ) : (
                <img
                  src={memory.image}
                  alt={memory.caption}
                  loading="lazy"
                  onError={() => handleImageError(memory.id)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-4">
              <p className="font-body text-pale-blue/70 text-sm">
                {memory.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MemoryGallery;
