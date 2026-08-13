import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Heart, Sparkle } from 'lucide-react';

export default function HeartInteraction() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      angle: (i * 360) / 12 * (Math.PI / 180),
      distance: 60 + Math.random() * 40
    }));
  }, []);

  const dots = [0, 1, 2];

  return (
    <div className="relative flex flex-col items-center justify-center py-24 min-h-[400px]">
      <motion.div
        className="relative z-10 cursor-pointer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setClicked(true)}
        animate={{ scale: clicked ? [1, 1.3, 0.9, 1.1, 1] : hovered ? [1, 1.05, 1] : 1 }}
        transition={{ duration: clicked ? 0.6 : hovered ? 2 : 0, repeat: hovered && !clicked ? Infinity : 0 }}
      >
        <div className="relative">
           <motion.div 
             className="absolute inset-[-30px] rounded-full border border-sky-500/20"
             animate={{ rotate: 360 }}
             transition={{ duration: hovered ? 4 : 10, repeat: Infinity, ease: "linear" }}
           >
              {dots.map((d) => (
                <div 
                  key={d} 
                  className="absolute w-1.5 h-1.5 bg-sky-300 rounded-full shadow-[0_0_8px_#38bdf8]"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotate(" + (d * 120) + "deg) translateY(-45px)"
                  }}
                />
              ))}
           </motion.div>

           <Heart 
             className={"w-24 h-24 transition-all duration-500 " + (hovered ? "text-sky-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]" : "text-sky-600 drop-shadow-[0_0_10px_rgba(2,132,199,0.5)]")} 
             fill={hovered || clicked ? "#0284c7" : "transparent"} 
             fillOpacity={hovered || clicked ? 0.5 : 0}
             strokeWidth={1}
           />

           <AnimatePresence>
             {clicked && (
               <>
                 <motion.div
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: [0, 1, 0], scale: 2 }}
                   transition={{ duration: 0.4 }}
                   className="absolute inset-0 bg-white rounded-full mix-blend-overlay blur-md"
                 />
                 {particles.map((p, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                     animate={{ 
                       opacity: [0, 1, 0],
                       x: Math.cos(p.angle) * p.distance,
                       y: Math.sin(p.angle) * p.distance,
                       scale: [0, 1.5, 0]
                     }}
                     transition={{ duration: 1, ease: "easeOut" }}
                     className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-sky-100 rounded-full -mt-0.5 -ml-0.5"
                   />
                 ))}
               </>
             )}
           </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8, y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute top-full mt-8 flex flex-col items-center"
          >
            <div className="relative">
              <Sparkle className="absolute -left-8 -top-4 w-5 h-5 text-sky-200 animate-pulse" />
              <Sparkle className="absolute -right-8 bottom-4 w-4 h-4 text-sky-300 animate-pulse delay-100" />
              <h3 className="text-3xl md:text-5xl font-display text-sky-100 drop-shadow-[0_0_15px_rgba(224,242,254,0.8)] text-center tracking-wide">
                Still choosing you.
              </h3>
            </div>
            <p className="mt-4 text-xl font-body text-sky-300/80 tracking-widest uppercase">
              Every single day.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
