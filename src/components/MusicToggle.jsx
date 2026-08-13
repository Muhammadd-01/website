import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/music/our-song.mp3')
    audioRef.current.loop = true
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error("Audio playback failed:", error)
            setIsPlaying(false)
          })
      }
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMusic}
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 ${
        isPlaying ? 'shadow-[0_0_15px_rgba(37,99,235,0.5)]' : ''
      }`}
      aria-label="Toggle background music"
    >
      {isPlaying ? (
        <div className="relative flex items-center justify-center w-full h-full text-sky-blue">
          <Volume2 size={20} className="absolute opacity-50 animate-pulse" />
          <div className="absolute flex space-x-0.5 ml-4">
            <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }} className="w-0.5 bg-sky-blue rounded-full" />
            <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }} className="w-0.5 bg-sky-blue rounded-full" />
            <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }} className="w-0.5 bg-sky-blue rounded-full" />
          </div>
        </div>
      ) : (
        <VolumeX size={20} className="text-pale-blue/60" />
      )}
    </motion.button>
  )
}
