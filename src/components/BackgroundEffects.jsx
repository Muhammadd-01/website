import { useEffect, useState, useMemo } from 'react';

const emojis = ['❤️', '💖', '💕', '💗', '💓', '💞', '✨'];

const BackgroundEffects = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Generate fixed hearts for rendering
  const hearts = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * -100, // start above screen
      size: Math.random() * 15 + 12, // 12px to 27px
      duration: Math.random() * 10 + 10, // 10s to 20s falling time
      delay: Math.random() * 10, // stagger start
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotationStart: Math.random() * 360,
      rotationEnd: Math.random() * 360 + 360, // spin 1 full rotation
    }));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orb-drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes fall-and-spin {
          0% { transform: translateY(-10vh) rotate(var(--rot-start)); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(110vh) rotate(var(--rot-end)); opacity: 0; }
        }
      `}} />

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

      {/* Falling Continuous Hearts (No user interaction) */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute opacity-0 select-none will-change-transform"
          style={{
            fontSize: h.size + 'px',
            left: h.x + '%',
            top: h.y + '%',
            '--rot-start': h.rotationStart + 'deg',
            '--rot-end': h.rotationEnd + 'deg',
            animation: \`fall-and-spin \${h.duration}s linear \${h.delay}s infinite\`,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
};

export default BackgroundEffects;
