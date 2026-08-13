import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isPointerDevice, setIsPointerDevice] = useState(false)
  
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const requestRef = useRef(null)
  
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Check if it's a device with a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsPointerDevice(mediaQuery.matches)

    const handleMediaChange = (e) => {
      setIsPointerDevice(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleMediaChange)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (!isPointerDevice) return

    document.body.style.cursor = 'none'

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      
      // Update dot immediately for responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const animateRing = () => {
      // Lerp for smooth ring following
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }

      requestRef.current = requestAnimationFrame(animateRing)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable = 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.dataset.cursor === 'expand'

      if (isClickable) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    requestRef.current = requestAnimationFrame(animateRing)

    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPointerDevice])

  if (!isPointerDevice) return null

  return (
    <>
      <div 
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-sky-blue rounded-full pointer-events-none z-[100] -ml-1 -mt-1 mix-blend-screen"
      />
      <div 
        ref={ringRef}
        className={`cursor-ring fixed top-0 left-0 w-8 h-8 border border-sky-blue/50 rounded-full pointer-events-none z-[99] -ml-4 -mt-4 transition-all duration-200 ease-out ${
          isHovering ? 'scale-150 bg-sky-blue/10 border-transparent' : 'scale-100'
        }`}
      />
    </>
  )
}
