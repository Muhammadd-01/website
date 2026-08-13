import { motion } from 'framer-motion'
import { Heart, Lock, Key } from 'lucide-react'
import { useState } from 'react'
import { loveConfig } from '../data/content.js'

export default function WelcomeGate({ onEnter }) {
  const [password, setPassword] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState(false);
  const correctPassword = loveConfig.specialDate ? loveConfig.specialDate.replace(/\D/g, '') : '1234';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'amnaan' || password.toLowerCase() === 'amna' || password.toLowerCase() === 'love' || password === correctPassword || password === '1234' || password.toLowerCase() === loveConfig.wifeName.toLowerCase()) {
      setIsUnlocking(true);
      setTimeout(() => {
        onEnter();
      }, 3000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at center, rgba(37,99,235,0.4) 0%, rgba(2,6,23,1) 100%)',
          animation: 'breathe 8s ease-in-out infinite'
        }}
      />

      {/* Floating background hearts */}
      <style dangerouslySetInnerHTML={{ __html: [
        '@keyframes floatUp {',
        '  0% { transform: translateY(100vh) scale(0.5) rotate(0deg); opacity: 0; }',
        '  20% { opacity: 0.2; }',
        '  80% { opacity: 0.2; }',
        '  100% { transform: translateY(-100px) scale(1.2) rotate(45deg); opacity: 0; }',
        '}'
      ].join('\\n') }} />

      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute text-sky-blue/20"
          style={{
            left: (Math.random() * 100) + '%',
            animation: 'floatUp ' + (10 + Math.random() * 10) + 's linear infinite',
            animationDelay: (Math.random() * 5) + 's',
            fontSize: (1 + Math.random() * 2) + 'rem'
          }}
        >
          {Math.random() > 0.5 ? '❤️' : '💖'}
        </div>
      ))}

      <motion.div 
        className="relative z-10 w-full max-w-md px-6 py-12 flex flex-col items-center bg-white/10 backdrop-blur-xl backdrop-blur-xl rounded-3xl border border-sky-blue/20 shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50, scale: 0.9 },
          visible: {
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: { 
              duration: 1, 
              staggerChildren: 0.2,
              delayChildren: 0.3
            }
          }
        }}
      >
        {isUnlocking ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="relative">
              <Heart className="w-24 h-24 text-sky-blue animate-heartbeat drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]" fill="currentColor" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-4xl text-white font-bold drop-shadow-lg z-10">
                A
              </span>
              <div className="absolute inset-0 rounded-full border-2 border-sky-blue/50 animate-ping" style={{ animationDuration: '2s' }} />
            </div>
            <p className="mt-8 font-display text-2xl text-white text-glow animate-pulse">
              Unlocking...
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="relative mb-6"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              {/* Pulsing rings around heart */}
              <div className="absolute inset-0 border border-sky-blue/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 border border-sky-blue/20 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              
              <div className="bg-sky-blue/10 p-6 rounded-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] relative">
                <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
                <Heart className="w-12 h-12 text-sky-blue animate-pulse-glow" fill="currentColor" />
              </div>
            </motion.div>

            <motion.h1 
              className="font-display text-3xl md:text-4xl font-light gradient-text text-center mb-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {'Welcome, ' + loveConfig.wifeName + ' 🤍'}
            </motion.h1>

            <motion.p 
              className="font-body text-pale-blue/60 text-center mb-8"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {'This space was created just for you. 🔐'}
            </motion.p>

            <motion.form 
              className="w-full"
              onSubmit={handleSubmit}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-sky-blue/50" />
                </div>
                <input
                  type="password"
                  placeholder="Enter password or your name..."
                  className={"w-full bg-white/10 backdrop-blur-xl backdrop-blur-3xl border-t border-sky-blue/10/50 border rounded-xl py-4 pl-12 pr-4 text-white placeholder-pale-blue/40 focus:outline-none focus:border-sky-blue focus:ring-1 focus:ring-sky-blue transition-colors font-body " + (error ? 'border-red-500/50' : 'border-sky-blue/30')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-6 left-0 text-red-400/80 text-xs font-body"
                  >
                    {'Incorrect. Hint: Try your name! 🥺'}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn-primary btn-shimmer py-4 rounded-xl font-body tracking-wide flex items-center justify-center gap-2 group hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                <span>{'Unlock My Heart 🔓'}</span>
                <Heart className="w-4 h-4 group-hover:scale-125 transition-transform text-white" fill="currentColor" />
              </button>
            </motion.form>

            <motion.p 
              className="font-body text-xs text-pale-blue/30 mt-8 italic text-center"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
            >
              {'✨ Made with all my love for you ✨'}
            </motion.p>
          </>
        )}
      </motion.div>
    </div>
  )
}
