import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Menu, X } from 'lucide-react'
import { navItems } from '../data/content.js'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
      
      const sections = navItems.map(item => item.id)
      let currentSection = ''
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section
            break
          }
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, id) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-0 w-full z-50 glass-strong"
        >
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
            <div className="flex items-center justify-center">
              <Heart className="w-5 h-5 text-sky-blue animate-pulse-glow" fill="currentColor" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`text-sm tracking-wide transition-all duration-300 ${
                    activeSection === item.id ? 'text-white text-glow' : 'text-pale-blue/70 hover:text-white'
                  }`}
                >
                  <span className="mr-1 opacity-50">♡</span>
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-pale-blue hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden w-full glass-strong overflow-hidden"
              >
                <div className="flex flex-col items-center py-4 space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`text-base tracking-wide transition-all duration-300 w-full text-center py-3 ${
                        activeSection === item.id ? 'text-white text-glow bg-white/5' : 'text-pale-blue/70'
                      }`}
                    >
                      <span className="mr-2 opacity-50">♡</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
