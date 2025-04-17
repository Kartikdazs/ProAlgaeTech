import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const ParticleEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const isHovering = useRef(false);

  const createParticle = () => {
    if (!containerRef.current) return null;
    
    const particle = document.createElement('div');
    particle.classList.add('algae-particle');
    
    const size = Math.random() * 20 + 5; // 5-25px
    const x = Math.random() * 100; // 0-100%
    const y = Math.random() * 100; // 0-100%
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.opacity = (Math.random() * 0.5 + 0.1).toString(); // 0.1-0.6
    
    // Base animation
    particle.style.transition = 'transform 0.3s ease-out';
    
    containerRef.current.appendChild(particle);
    
    return {
      element: particle,
      x,
      y,
      size,
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: (Math.random() - 0.5) * 0.1,
      opacity: parseFloat(particle.style.opacity),
    };
  };

  const updateParticles = () => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    particles.current.forEach(particle => {
      // Update position based on speed
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Boundary check and bounce
      if (particle.x < 0 || particle.x > 100) {
        particle.speedX *= -1;
      }
      if (particle.y < 0 || particle.y > 100) {
        particle.speedY *= -1;
      }
      
      // Apply base position
      particle.element.style.left = `${particle.x}%`;
      particle.element.style.top = `${particle.y}%`;
      
      // Interactive effect when hovering
      if (isHovering.current) {
        const particleX = (particle.x / 100) * rect.width;
        const particleY = (particle.y / 100) * rect.height;
        
        const dx = mousePosition.current.x - particleX;
        const dy = mousePosition.current.y - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 10;
          
          const moveX = Math.cos(angle) * force;
          const moveY = Math.sin(angle) * force;
          
          particle.element.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        } else {
          particle.element.style.transform = 'translate(0, 0)';
        }
      }
    });
    
    animationRef.current = requestAnimationFrame(updateParticles);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    mousePosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    
    // Reset all particles
    particles.current.forEach(particle => {
      particle.element.style.transform = 'translate(0, 0)';
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = createParticle();
      if (particle) {
        particles.current.push(particle);
      }
    }
    
    // Start animation
    animationRef.current = requestAnimationFrame(updateParticles);
    
    // Set up event listeners
    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Remove event listeners
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      // Remove particles
      particles.current.forEach(particle => {
        particle.element.remove();
      });
      particles.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="particle-container" 
      style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, overflow: 'hidden', zIndex: 0 }}
    ></div>
  );
};

export default ParticleEffect;
