import { useEffect, useRef } from "react";

interface Bubble {
  element: HTMLDivElement;
  posX: number;
  size: number;
  duration: number;
  delay: number;
}

const BubbleEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbles = useRef<Bubble[]>([]);

  const createBubbles = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      
      const size = Math.random() * 60 + 20; // 20-80px
      const posX = Math.random() * 100; // 0-100%
      const duration = Math.random() * 20 + 10; // 10-30s
      const delay = Math.random() * 15; // 0-15s
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${posX}%`;
      bubble.style.position = 'absolute';
      bubble.style.borderRadius = '50%';
      bubble.style.background = 'linear-gradient(to bottom right, rgba(128, 222, 234, 0.5), rgba(128, 222, 234, 0.1))';
      bubble.style.bottom = '-20px';
      bubble.style.zIndex = '1';
      
      // Animation
      bubble.style.animation = `bubble ${duration}s linear ${delay}s infinite`;
      
      container.appendChild(bubble);
      
      bubbles.current.push({
        element: bubble,
        posX,
        size,
        duration,
        delay
      });
    }
  };

  useEffect(() => {
    createBubbles();
    
    return () => {
      bubbles.current.forEach(bubble => {
        bubble.element.remove();
      });
      bubbles.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bubble-container" 
      style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, overflow: 'hidden', zIndex: 0 }}
    >
      <style jsx>{`
        @keyframes bubble {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BubbleEffect;
