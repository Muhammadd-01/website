import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const SectionTransition = ({ variant = 'glow' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  let content;

  if (variant === 'glow') {
    content = (
      <div className="relative w-full max-w-md mx-auto h-16 flex items-center justify-center py-16">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-sky-blue/30 to-transparent" />
        <div className="absolute w-2 h-2 rounded-full bg-sky-blue animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
      </div>
    );
  } else if (variant === 'hearts') {
    content = (
      <div className="flex items-center justify-center gap-6 py-16">
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Heart className="w-4 h-4 text-sky-blue/20 fill-current" />
        </motion.div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
          <Heart className="w-6 h-6 text-sky-blue/30 fill-current" />
        </motion.div>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <Heart className="w-4 h-4 text-sky-blue/20 fill-current" />
        </motion.div>
      </div>
    );
  } else if (variant === 'stars') {
    content = (
      <div className="flex items-center justify-center gap-4 py-16">
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-sky-blue/30 translate-y-2" />
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-sky-blue/30 translate-y-1" />
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-sky-blue/60 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-sky-blue/30 translate-y-1" />
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-sky-blue/30 translate-y-2" />
      </div>
    );
  } else if (variant === 'wave') {
    content = (
      <div className="flex items-center justify-center py-16">
        <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10" stroke="rgba(96, 165, 250, 0.15)" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full"
    >
      {content}
    </motion.div>
  );
};

export default SectionTransition;
