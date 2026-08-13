import { useEffect, useState, useRef, useMemo } from 'react';

const emojis = ['❤️', '💖', '💕', '💗', '💓', '💞', '✨'];

const BackgroundEffects = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heartRefs = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef();

  // Create initial hearts state
  const hearts = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      size: Math.random() * 15 + 12, // 12px to 27px
      speedY: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 1 - 0.5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 2 - 1,
    }));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let lastTime = performance.now();

    const animate = (time) => {
      const dt = (time - lastTime) / 16; // normalize to roughly 60fps
      lastTime = time;

      hearts.forEach((heart, i) => {
        const el = heartRefs.current[i];
        if (!el) return;

        // Normal movement
        heart.y += heart.speedY * dt;
        heart.x += heart.speedX * dt;
        heart.rotation += heart.rotSpeed * dt;

        // Reset if it goes off screen
        if (heart.y > window.innerHeight + 50) {
          heart.y = -50;
          heart.x = Math.random() * window.innerWidth;
        }
        if (heart.x > window.innerWidth + 50) {
          heart.x = -50;
        } else if (heart.x < -50) {
          heart.x = window.innerWidth + 50;
        }

        // Mouse interaction (push away)
        const dx = heart.x - mouse.current.x;
        const dy = heart.y - mouse.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        if (distance < interactionRadius) {
          // Calculate force (stronger when closer)
          const force = (interactionRadius - distance) / interactionRadius;
          
          // Push away
          heart.x += (dx / distance) * force * 10 * dt;
          heart.y += (dy / distance) * force * 10 * dt;
          
          // Add some spin when hit
          heart.rotation += force * 10 * dt;
        }

        // Apply transform via ref for performance
        el.style.transform = 'translate3d(' + heart.x + 'px, ' + heart.y + 'px, 0) rotate(' + heart.rotation + 'deg)';
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [prefersReducedMotion, hearts]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: [
        '@keyframes orb-drift {',
        '  0% { transform: translate(0, 0) scale(1); }',
        '  50% { transform: translate(30px, -30px) scale(1.1); }',
        '  100% { transform: translate(0, 0) scale(1); }',
        '}',
      ].join('\n') }} />

      {/* Ambient Gradient Orbs */}
      <div
        className="absolute top-1/4 left-1/4 rounded-full blur-[100px] opacity-20"
        style={{
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(15,23,42,0) 70%)',
          animation: 'orb-drift 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 rounded-full blur-[120px] opacity-10"
        style={{
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(96,165,250,0.3) 0%, rgba(15,23,42,0) 70%)',
          animation: 'orb-drift 25s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute top-2/3 left-1/2 rounded-full blur-[80px] opacity-[0.08]"
        style={{
          width: '30vw',
          height: '30vw',
          background: 'radial-gradient(circle, rgba(199,210,254,0.3) 0%, rgba(15,23,42,0) 70%)',
          animation: 'orb-drift 18s ease-in-out 3s infinite',
        }}
      />

      {/* Falling Interactive Heart Emojis */}
      {hearts.map((h, i) => (
        <div
          key={h.id}
          ref={(el) => (heartRefs.current[i] = el)}
          className="absolute opacity-40 select-none will-change-transform"
          style={{
            fontSize: h.size + 'px',
            top: 0,
            left: 0,
            transform: 'translate3d(-100px, -100px, 0)' // Initial hidden position
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
};

export default BackgroundEffects;
